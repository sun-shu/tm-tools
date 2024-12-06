import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DndContext, PointerSensor, useSensor } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Statistics } from '../interface/Statistics';
import { TimerRecord } from '../interface/TimerRecord';
import { SECTIONS, DEFAULT_DURATIONS } from '../consts/index';

import {
  Table,
  Button,
  Input,
  Select,
  Typography,
  Card,
  Row,
  Col,
  Statistic,
  InputNumber,
  Space,
  Tooltip,
  Popconfirm,
  Modal,
  message,
  List,
} from 'antd';
import {
  PlayCircleOutlined,
  StopOutlined,
  PlusOutlined,
  HolderOutlined,
  ReloadOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  BellOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import { formatTimeInput, parseTimeInput } from '@/utils/timeFormat';

import React, { useCallback, useRef } from 'react';
import debounce from 'lodash/debounce';

const { Title } = Typography;
const { Option } = Select;

interface InputCellProps {
  value: string;
  onChange: (value: string) => void;
  field: keyof TimerRecord;
  multiline?: boolean;
  placeholder?: string;
}

interface TimerTableProps {
  records: TimerRecord[];
  onDragEnd: (result: any) => void;
  onUpdateRecord: (id: string, field: keyof TimerRecord, value: any) => void;
  onStartTimer: (id: string) => void;
  onEndTimer: (id: string) => void;
  onResetTimer: (id: string) => void;
  onDeleteRecord: (id: string) => void;
  onUpdateStatus: (record: TimerRecord) => void;
  onStartTimerUpdates: (id: string, plannedDurationMax: number, isPaused: boolean, startTime: string) => void;
}

// 独立的输入框组件
const EditableCell = React.memo(React.forwardRef<HTMLTextAreaElement, {
  id: string;
  value: string;
  field: 'overtimeReason' | 'improvement';
  onUpdate: (id: string, field: string, value: string) => void;
}>(({ id, value: initialValue, field, onUpdate }, ref) => {
  // 使用本地 state 管理输入值
  const [value, setValue] = React.useState(initialValue);

  // 创建一个防抖的更新函数
  const debouncedUpdate = useRef(
    debounce((value: string) => {
      onUpdate(id, field, value);
    }, 300),
  ).current;

  // 当外部 value 改变且不在输入状态时更新本地 state
  React.useEffect(() => {
    if (document.activeElement !== ref?.current) {
      setValue(initialValue);
    }
  }, [initialValue]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedUpdate(newValue);
  }, [debouncedUpdate]);

  return (
    <Input.TextArea
      ref={ref}
      value={value}
      onChange={handleChange}
      placeholder={field === 'overtimeReason' ? '请输入超时原因...' : '请输入改进建议...'}
      autoSize={{ minRows: 1, maxRows: 3 }}
    />
  );
}));

export const TimerTable: React.FC<TimerTableProps> = ({
                                                        records,
                                                        onDragEnd,
                                                        onUpdateRecord,
                                                        onStartTimer,
                                                        onEndTimer,
                                                        onResetTimer,
                                                        onDeleteRecord,
                                                        onUpdateStatus,
                                                        onStartTimerUpdates,
                                                      }) => {

  // 添加本地状态来管理输入
  const [editingText, setEditingText] = React.useState<{
    id: string;
    field: 'overtimeReason' | 'improvement';
    value: string;
  } | null>(null);

  const sensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 8, // 增加激活距离
    },
  });

  const DraggableRow = ({ children, ...props }: any) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: props['data-row-key'],
    });

    const style = {
      ...props.style,
      transform: CSS.Transform.toString(transform),
      transition,
      ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
    };

    return (
      <tr {...props} ref={setNodeRef} style={style}>
        {React.Children.map(children, (child) => {
          if ((child as any).key === 'sort') {
            return (
              <td {...(child as any).props} {...attributes} {...listeners}>
                <HolderOutlined style={{ cursor: 'move', fontSize: '16px' }} />
              </td>
            );
          }
          return child;
        })}
      </tr>
    );
  };

  const getTimerStatusIcon = (status: TimerRecord['timerStatus']) => {
    switch (status) {
      case 'green':
        return <CheckCircleOutlined style={{ color: '#52c41a', fontSize: 24 }} />;
      case 'yellow':
        return <ClockCircleOutlined style={{ color: '#faad14', fontSize: 24 }} />;
      case 'red':
        return <CloseCircleOutlined style={{ color: '#f5222d', fontSize: 24 }} />;
      case 'bell':
        return <BellOutlined style={{ color: '#f5222d', fontSize: 24 }} />;
      default:
        return null;
    }
  };


  // 表格列定义
  const columns = [
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort', // 添加 key
      width: 50,
      className: 'drag-handle', // 修改类名
      render: () => null,
    },


    // 在 columns 数组中修改 section 列的 render 函数
    {
      title: '环节',
      dataIndex: 'section',
      width: 150,
      render: (_: any, record: TimerRecord) => (
        <Select
          style={{ width: '100%' }}
          value={record.section}
          onChange={(value) => {
            // 更新环节
            onUpdateRecord(record.id, 'section', value);

            // 如果不是嘉宾分享环节，设置默认时间范围
            if (value !== 'guestShare') {
              const defaultDuration = DEFAULT_DURATIONS[value];
              if (defaultDuration) {
                onUpdateRecord(record.id, 'plannedDurationMin', defaultDuration.min);
                onUpdateRecord(record.id, 'plannedDurationMax', defaultDuration.max);
              }
            }
          }}
        >
          {SECTIONS.map(option => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      ),
    },

    {
      title: '角色名称',
      dataIndex: 'roleName',
      width: 150,
      render: (_: any, record: TimerRecord) => (
        <Input
          value={record.roleName}
          onChange={(e) => onUpdateRecord(record.id, 'roleName', e.target.value)}
        />
      ),
    },
    {
      title: '角色昵称',
      dataIndex: 'roleNickname',
      width: 150,
      render: (_: any, record: TimerRecord) => (
        <Input
          value={record.roleNickname}
          onChange={(e) => onUpdateRecord(record.id, 'roleNickname', e.target.value)}
        />
      ),
    },
    {
      title: '计划用时(分钟)',
      dataIndex: 'plannedDuration',
      width: 200,
      render: (_: any, record: TimerRecord) => (
        <Tooltip title="支持格式：2.5、2:30、3">
          <Input.Group compact>
            <InputNumber
              style={{ width: 65 }}
              value={formatTimeInput(record.plannedDurationMin)}
              onChange={(newValue) => {
                const value = parseTimeInput(String(newValue));
                onUpdateRecord(record.id, 'plannedDurationMin', value);
                onUpdateStatus(record);
              }}
              placeholder="0:00"
              step={0.5}
              min={0}

            />
            <Input
              style={{ width: 30, borderLeft: 0, borderRight: 0, pointerEvents: 'none', textAlign: 'center' }}
              placeholder="~"
              disabled
            />
            <InputNumber
              style={{ width: 65 }}
              value={formatTimeInput(record.plannedDurationMax)}
              onChange={(newValue) => {
                const value = parseTimeInput(String(newValue));
                onUpdateRecord(record.id, 'plannedDurationMax', value);
                onUpdateStatus(record);
              }}
              placeholder="0:00"
              step={0.5}  // 添加 0.5 分钟（30秒）的步进
              min={0}     // 防止负数输入
              precision={1}  // 允许一位小数，以支持0.5分钟的输入

            />
          </Input.Group>
        </Tooltip>
      ),
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      width: 180,
    },
    {
      title: '倒计时',
      dataIndex: 'countdown',
      width: 50,
      render: (_: any, record: TimerRecord) => (
        <span style={{
          color: record.timerStatus === 'red' || record.timerStatus === 'bell' ? '#f5222d' :
            record.timerStatus === 'yellow' ? '#faad14' :
              record.timerStatus === 'green' ? '#52c41a' : 'inherit',
          fontWeight: 'bold',
          fontSize: '16px',
        }}>
          {record.countdown || '--:--'}
        </span>
      ),
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      width: 180,
    },
    {
      title: '已用时间',
      dataIndex: 'elapsedTime',
      width: 100,
      render: (_: any, record: TimerRecord) => (
        <span style={{ fontSize: '16px' }}>
          {record.elapsedTime || '--:--:--'}
        </span>
      ),
    },
    {
      title: '用时情况',
      dataIndex: 'status',
      width: 120,
    },
    {
      title: '指示牌',
      dataIndex: 'timerStatus',
      width: 80,
      render: (_: any, record: TimerRecord) => getTimerStatusIcon(record.timerStatus),
    },
    {
      title: '操作',
      width: 300,
      render: (_: any, record: TimerRecord) => (
        <Space>
          {!record.isRunning && !record.isPaused && !record.endTime && (
            <Button
              type="primary"
              icon={<PlayCircleOutlined />}
              onClick={() => onStartTimer(record.id)}
            >
              开始
            </Button>
          )}
          {!record.isRunning && record.isPaused && (
            <Button
              type="primary"
              icon={<PlayCircleOutlined />}
              onClick={() => {
                const now = new Date();
                const pausedTime = new Date(record.pausedTime!);
                const additionalPausedTime = (now.getTime() - pausedTime.getTime()) / (1000 * 60);

                onUpdateRecord(record.id, 'isRunning', true);
                onUpdateRecord(record.id, 'isPaused', false);
                onUpdateRecord(record.id, 'totalPausedTime', (record.totalPausedTime || 0) + additionalPausedTime);

                onStartTimerUpdates(record.id, record.plannedDurationMax, true, record.startTime);
              }}
            >
              继续
            </Button>
          )}
          {record.isRunning && (
            <Button
              type="primary"
              danger
              onClick={() => onEndTimer(record.id)}
            >
              结束
            </Button>
          )}
          <Button
            icon={<ReloadOutlined />}
            onClick={() => onResetTimer(record.id)}
          >
            重置
          </Button>
          <Popconfirm
            title="删除确认"
            description="确定要删除这条记录吗？"
            onConfirm={() => onDeleteRecord(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              disabled={record.isRunning}  // 运行中的记录不能删除
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
    {
      title: '超时原因',
      dataIndex: 'overtimeReason',
      width: 200,
      shouldCellUpdate: (record, prevRecord) => {
        return record.overtimeReason !== prevRecord.overtimeReason;
      },
      render: (_: any, record: TimerRecord) => (
        <EditableCell
          key={`overtime-${record.id}`}
          id={record.id}
          value={record.overtimeReason || ''}
          field="overtimeReason"
          onUpdate={onUpdateRecord}
        />
      ),
    },
    {
      title: '改进建议',
      dataIndex: 'improvement',
      width: 200,
      render: (_: any, record: TimerRecord) => (
        <Input.TextArea
          value={
            editingText?.id === record.id && editingText?.field === 'improvement'
              ? editingText.value
              : record.improvement || ''
          }
          onChange={(e) => {
            setEditingText({
              id: record.id,
              field: 'improvement',
              value: e.target.value,
            });
          }}
          onBlur={() => {
            if (editingText?.id === record.id && editingText?.field === 'improvement') {
              onUpdateRecord(record.id, 'improvement', editingText.value);
              setEditingText(null);
            }
          }}
          placeholder="请输入改进建议..."
          autoSize={{ minRows: 1, maxRows: 3 }}
        />
      ),
    },
  ];


  return (
    <DndContext
      sensors={[sensor]}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={onDragEnd}
    >
      <SortableContext
        items={records.map(r => r.id)}
        strategy={verticalListSortingStrategy}
      >
        <Table
          components={{
            body: {
              row: DraggableRow,
            },
          }}
          rowKey="id"
          columns={columns}
          dataSource={records}
          pagination={false}
          onRow={(record) => ({
            'data-row-key': record.id,
            index: records.findIndex(x => x.id === record.id),
          })}
        />
      </SortableContext>
    </DndContext>
  );
};

