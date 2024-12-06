import React, { useState, useEffect, useRef } from 'react';
import {
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
import { Column } from '@ant-design/plots';
import { DndContext, PointerSensor, useSensor } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { DownloadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';

const { Title } = Typography;

import { TimerRecord } from './interface/TimerRecord';
import { Statistics } from './interface/Statistics';
import { SECTIONS, DEFAULT_DURATIONS } from './consts/index';


import { StatisticsCards } from './components/StatisticsCards';
import { TimerTable } from './components/TimerTable';
import { StatisticsChart } from '@/pages/timer/components/StatisticsChart';

import { useExportToExcel } from './hooks/useExportToExcel';
import TimerSummary from '@/pages/timer/components/TimerSummary';
// 生成默认记录
const generateDefaultRecord = (section: string, index: number = 0): TimerRecord => {
  const defaultDuration = DEFAULT_DURATIONS[section];
  return {
    id: `${section}-${Date.now()}-${index}`,
    section,
    roleName: section === 'tableTopics' ? `即兴演讲者${index + 1}` :
      section === 'prepared' ? `备稿演讲者${index + 1}` :
        SECTIONS.find(s => s.value === section)?.label || '',
    roleNickname: '',
    startTime: '',
    endTime: '',
    plannedDurationMin: defaultDuration?.min || 0,
    plannedDurationMax: defaultDuration?.max || 0,
    status: '',
    isRunning: false,
    overtimeReason: '',
    improvement: '',
  };
};

// 生成初始记录列表
const generateInitialRecords = (): TimerRecord[] => {
  const records: TimerRecord[] = [];

  // 为每个环节创建一条记录
  SECTIONS.forEach(section => {
    if (section.value === 'tableTopics' || section.value === 'prepared') {
      // 即兴演讲和备稿演讲各创建5条记录
      for (let i = 0; i < 5; i++) {
        records.push(generateDefaultRecord(section.value, i));
      }
    } else {
      // 其他环节各创建1条记录
      records.push(generateDefaultRecord(section.value));
    }
  });

  return records;
};


const ToastmastersTimer: React.FC = () => {
  const [records, setRecords] = useState<TimerRecord[]>(() => {
    const savedData = localStorage.getItem('timerRecords');
    return savedData ? JSON.parse(savedData) : generateInitialRecords();
  });
  const [stats, setStats] = useState<Statistics>({
    plannedTotal: '0:00:00',
    actualTotal: '0:00:00',
    overtime: [],
    undertime: [],
  });
  const [tableTopicsTotal, setTableTopicsTotal] = useState<number>(0);
  // 在组件顶部添加新的状态
  const [deletedRecords, setDeletedRecords] = useState<TimerRecord[]>([]);

  const timerRefs = useRef<{ [key: string]: NodeJS.Timeout }>({});

  // 格式化时长
  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    const secs = Math.round((minutes * 60) % 60);
    return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 更新统计信息
  const updateStatistics = () => {
    let plannedTotal = 0;
    let actualTotal = 0;
    const overtime: Statistics['overtime'] = [];
    const undertime: Statistics['undertime'] = [];

    records.forEach(record => {
      plannedTotal += (record.plannedDurationMin + record.plannedDurationMax) / 2;


      if (record.actualMinutes) {
        actualTotal += record.actualMinutes;

        if (record.actualMinutes > record.plannedDurationMax) {
          overtime.push({
            section: SECTIONS.find(s => s.value === record.section)?.label || record.section,
            duration: formatDuration(record.actualMinutes - record.plannedDurationMax),
          });
        } else if (record.actualMinutes < record.plannedDurationMin) {
          undertime.push({
            section: SECTIONS.find(s => s.value === record.section)?.label || record.section,
            duration: formatDuration(record.plannedDurationMin - record.actualMinutes),
          });
        }
      }
    });

    console.log('actualTotal', actualTotal, formatDuration(actualTotal));

    setStats({
      plannedTotal: formatDuration(plannedTotal),
      actualTotal: formatDuration(actualTotal),
      overtime,
      undertime,
    });
  };

  // 本地存储相关
  useEffect(() => {
    const savedData = localStorage.getItem('timerRecords');
    if (savedData) {
      setRecords(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('timerRecords', JSON.stringify(records));
    updateStatistics();
  }, [records]);

  // 在组件初始化时加载删除历史
  useEffect(() => {
    const savedDeletedRecords = localStorage.getItem('deletedTimerRecords');
    if (savedDeletedRecords) {
      setDeletedRecords(JSON.parse(savedDeletedRecords));
    }
  }, []);

// 当删除历史改变时保存
  useEffect(() => {
    localStorage.setItem('deletedTimerRecords', JSON.stringify(deletedRecords));
  }, [deletedRecords]);

  // 格式化日期时间
  const formatDateTime = (date: Date): string => {
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).replace(/\//g, '-');
  };

  // 更新记录
  const updateRecord = (id: string, field: keyof TimerRecord, value: any) => {
    console.log('updateRecord', id, field, value);
    setRecords(prev => prev.map(record => {
      if (record.id === id) {
        return { ...record, [field]: value };
      }
      return record;
    }));
  };


// 继续下一部分代码...
// 更新状态
  const updateStatus = (record: TimerRecord) => {
    if (!record.actualMinutes) return;

    let status = '';
    if (record.actualMinutes < record.plannedDurationMin) {
      const diff = record.plannedDurationMin - record.actualMinutes;
      status = `不足 ${formatDuration(diff)}`;
    } else if (record.actualMinutes > record.plannedDurationMax) {
      const diff = record.actualMinutes - record.plannedDurationMax;
      status = `超时 ${formatDuration(diff)}`;
    } else {
      status = '正常';
    }

    updateRecord(record.id, 'status', status);
  };

// 开始定时器更新
  // 修改 startTimerUpdates 函数，添加倒计时更新
  const startTimerUpdates = (id: string, maxDuration: number, isPaused: boolean = false, startTimeStr) => {
    const record = records.find(r => r.id === id);
    if (!record) return;

    const startTime = new Date(startTimeStr);
    const initialPausedTime = record.totalPausedTime || 0;

    timerRefs.current[id] = setInterval(() => {
      const now = new Date();
      const totalElapsed = (now.getTime() - startTime.getTime()) / (1000 * 60);
      const elapsedMinutes = totalElapsed - initialPausedTime;
      const remainingMinutes = maxDuration - elapsedMinutes;

      // 创建更新对象，只包含需要更新的字段
      const updates: Partial<TimerRecord> = {
        actualMinutes: elapsedMinutes,

      };

      // 更新已用时间显示
      const elapsedHours = Math.floor(elapsedMinutes / 60);
      const elapsedMins = Math.floor(elapsedMinutes % 60);
      const elapsedSecs = Math.floor((elapsedMinutes * 60) % 60);
      updates.elapsedTime = `${elapsedHours}:${elapsedMins.toString().padStart(2, '0')}:${elapsedSecs.toString().padStart(2, '0')}`;

      // 更新倒计时显示
      const remainingMins = Math.floor(Math.abs(remainingMinutes));
      const remainingSecs = Math.floor((Math.abs(remainingMinutes) % 1) * 60);
      updates.countdown = remainingMinutes >= 0
        ? `${remainingMins}:${remainingSecs.toString().padStart(2, '0')}`
        : `-${remainingMins}:${remainingSecs.toString().padStart(2, '0')}`;

      // 更新用时情况
      if (elapsedMinutes < record.plannedDurationMin) {
        const diff = record.plannedDurationMin - elapsedMinutes;
        updates.status = `不足 ${record.plannedDurationMin}分钟 还差${formatDuration(diff)}`;
      } else if (elapsedMinutes > record.plannedDurationMax) {
        const diff = elapsedMinutes - record.plannedDurationMax;
        updates.status = `超时 ${formatDuration(diff)}`;
      } else {
        updates.status = '正常';
      }

      // 更新指示牌状态
      const isLongDuration = maxDuration > 3;
      if (isLongDuration) {
        if (remainingMinutes <= 2 && remainingMinutes > 1) {
          updates.timerStatus = 'green';
        } else if (remainingMinutes <= 1 && remainingMinutes > 0) {
          updates.timerStatus = 'yellow';
        } else if (remainingMinutes <= 0 && remainingMinutes > -0.5) {
          updates.timerStatus = 'red';
        } else if (remainingMinutes <= -0.5) {
          updates.timerStatus = 'bell';
        }
      } else {
        if (remainingMinutes <= 1 && remainingMinutes > 0.5) {
          updates.timerStatus = 'green';
        } else if (remainingMinutes <= 0.5 && remainingMinutes > 0) {
          updates.timerStatus = 'yellow';
        } else if (remainingMinutes <= 0 && remainingMinutes > -0.5) {
          updates.timerStatus = 'red';
        } else if (remainingMinutes <= -0.5) {
          updates.timerStatus = 'bell';
        }
      }

      // 批量更新记录
      setRecords(prev => prev.map(r => {
        if (r.id === id) {
          return { ...r, ...updates };
        }
        return r;
      }));
    }, 1000);
  };

  // 添加辅助函数
  const formatTimeInput = (minutes: number): string => {
    if (!minutes) return '';
    const mins = Math.floor(minutes);
    const secs = Math.round((minutes - mins) * 60);
    return secs ? `${mins}:${secs.toString().padStart(2, '0')}` : mins.toString();
  };


  // 创建一个单独的开始计时函数
  const startTimer = (id: string) => {
    const now = new Date();
    const startTimeStr = formatDateTime(now);

    setRecords(prevRecords => {
      const newRecords = prevRecords.map(record => {
        if (record.id === id) {
          return {
            ...record,
            startTime: startTimeStr,
            isRunning: true,
            isPaused: false,
            totalPausedTime: 0,
            endTime: '', // 清除可能存在的结束时间
          };
        }
        return record;
      });

      const record = newRecords.find(r => r.id === id);
      if (record) {
        startTimerUpdates(id, record.plannedDurationMax, false, startTimeStr);
      }

      return newRecords;
    });
  };

  // 修改结束计时器函数
  // 修改结束计时器函数
  const endTimer = (id: string) => {
    const record = records.find(r => r.id === id);
    if (!record) return;

    const now = new Date();
    const endTimeStr = formatDateTime(now);

    // 计算最终的实际用时
    const startTime = new Date(record.startTime);
    const totalElapsed = (now.getTime() - startTime.getTime()) / (1000 * 60);
    const finalActualMinutes = totalElapsed - (record.totalPausedTime || 0);

    setRecords(prev => prev.map(r => {
      if (r.id === id) {
        return {
          ...r,
          isRunning: false,
          isPaused: true,
          pausedTime: endTimeStr,
          endTime: endTimeStr,
          actualMinutes: finalActualMinutes, // 保存最终的实际用时
        };
      }
      return r;
    }));

    if (timerRefs.current[id]) {
      clearInterval(timerRefs.current[id]);
      delete timerRefs.current[id];
    }
  };


// 重置计时器
  // 修改 resetTimer 函数，重置倒计时
  // 修改重置计时器函数
  const resetTimer = (id: string) => {
    setRecords(prev => prev.map(record => {
      if (record.id === id) {
        return {
          ...record,
          startTime: '',
          endTime: '',
          pausedTime: '',
          totalPausedTime: 0,
          actualMinutes: undefined,
          elapsedTime: '',
          status: '',
          isRunning: false,
          isPaused: false,
          timerStatus: null,
          countdown: undefined,
          overtimeReason: '',
          improvement: '',
        };
      }
      return record;
    }));

    if (timerRefs.current[id]) {
      clearInterval(timerRefs.current[id]);
      delete timerRefs.current[id];
    }
  };
// 拖拽排序相关


  const onDragEnd = ({ active, over }: any) => {
    if (active.id !== over?.id) {
      setRecords((prev) => {
        const activeIndex = prev.findIndex((i) => i.id === active.id);
        const overIndex = prev.findIndex((i) => i.id === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };


  const { exportToExcel } = useExportToExcel(records, stats);


// 计算即兴演讲可用人数
  const calculateAvailableSpeakers = () => {
    if (!tableTopicsTotal) return 0;
    // 统计records数据中即兴演讲环节的已用时间
    const tableTopicsUsed = records
      .filter(record => record.section === 'tableTopics')
      .reduce((acc, cur) => acc + (cur.actualMinutes || 0), 0);
    // 计算即兴演讲环节剩余时间

    console.log('tableTopicsUsed', tableTopicsUsed);

    const tableTopicsRemaining = tableTopicsTotal - tableTopicsUsed;

    return `已用时长：${formatTimeInput(tableTopicsUsed)}; 
    剩余时长：${formatTimeInput(tableTopicsRemaining)};
    剩余人数：${Math.floor(tableTopicsRemaining / 2.5)}`;
  };

// 修改删除函数
  const deleteRecord = (id: string) => {
    const recordToDelete = records.find(record => record.id === id);
    if (recordToDelete) {
      // 删除记录
      setRecords(prev => prev.filter(record => record.id !== id));
      // 保存到删除历史
      setDeletedRecords(prev => [recordToDelete, ...prev].slice(0, 50)); // 只保留最近10条删除记录

      // 显示可撤销消息
      message.info(
        <span>
        已删除记录
        <Button
          type="link"
          size="small"
          onClick={() => undoDelete(recordToDelete)}
          style={{ marginLeft: 8 }}
        >
          撤销
        </Button>
      </span>,
        3, // 3秒后自动关闭
      );
    }
  };


// 添加撤销删除函数
  const undoDelete = (record: TimerRecord) => {
    // 恢复记录
    setRecords(prev => [...prev, record]);
    // 从删除历史中移除
    setDeletedRecords(prev => prev.filter(r => r.id !== record.id));
    message.success('已恢复删除的记录');
  };

// 添加查看删除历史函数
  const showDeleteHistory = () => {
    Modal.info({
      title: '删除历史记录',
      width: 600,
      content: (
        <List
          dataSource={deletedRecords}
          renderItem={(record: TimerRecord) => (
            <List.Item
              actions={[
                <Button
                  type="link"
                  onClick={() => {
                    undoDelete(record);
                    Modal.destroyAll();
                  }}
                >
                  恢复
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={`${SECTIONS.find(s => s.value === record.section)?.label || ''} - ${record.roleName}`}
                description={`删除时间: ${record.endTime || '未完成'}`}
              />
            </List.Item>
          )}
          locale={{ emptyText: '暂无删除记录' }}
        />
      ),
      okText: '关闭',
    });
  };

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>标题</Title>

      <StatisticsCards
        stats={stats}
        tableTopicsTotal={tableTopicsTotal}
        onTableTopicsTotalChange={setTableTopicsTotal}
        calculateAvailableSpeakers={calculateAvailableSpeakers}
      />


      <Card style={{ marginTop: 16 }}>
        <Space style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              const newRecord = generateDefaultRecord('');  // 空环节
              setRecords([...records, newRecord]);
            }}
          >
            添加环节
          </Button>
          <Button
            icon={<DownloadOutlined />}
            onClick={exportToExcel}
            disabled={records.length === 0}
          >
            导出数据
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={showDeleteHistory}
            disabled={deletedRecords.length === 0}
          >
            删除历史
          </Button>
        </Space>

        <TimerTable
          records={records}
          onDragEnd={onDragEnd}
          onUpdateRecord={updateRecord}
          onStartTimer={startTimer}
          onEndTimer={endTimer}
          onResetTimer={resetTimer}
          onDeleteRecord={deleteRecord}
          onUpdateStatus={updateStatus}
          onStartTimerUpdates={startTimerUpdates}
        />
      </Card>

      <TimerSummary records={records} />
      {records.some(r => r.section === 'tableTopics' && r.elapsedTime) && (
        <StatisticsChart records={records} type="tableTopics" title="测试1"/>
      )}

      {records.some(r => r.section === 'prepared' && r.elapsedTime) && (
        <StatisticsChart records={records} type={'prepared'} title="测试2"/>
      )}


    </div>
  );
};

export default ToastmastersTimer;
