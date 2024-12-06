import React, { useState, useEffect, useRef } from 'react';
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
    List
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
    DeleteOutlined
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
const { Option } = Select;

// 环节选项
const SECTIONS = [
    { value: 'warmup', label: '暖场破冰' },
    { value: 'saaReminder', label: 'SAA会前提醒' },
    { value: 'chairmanSpeech', label: '主席致辞-头马+俱乐部介绍' },
    { value: 'hostIntro', label: '主持人发言-今日议程介绍' },
    { value: 'evaluationTeam', label: '总评团队介绍' },
    { value: 'timerIntro', label: '时间官介绍' },
    { value: 'ahCounter', label: '哼哈官介绍' },
    { value: 'grammarian', label: '语法官介绍' },
    { value: 'guestShare', label: '嘉宾分享' },
    { value: 'tableTopics', label: '即兴演讲' },
    { value: 'guestIntro', label: '来宾介绍' },
    { value: 'break', label: '茶歇' },
    { value: 'prepared', label: '备稿' },
    { value: 'topicsEval', label: '即兴评估' },
    { value: 'preparedEval', label: '备稿评估' },
    { value: 'meetingEval', label: '会议评估' },
    { value: 'voteAndSummary', label: '投票&会议小结' },
    { value: 'announcement', label: '通告' },
    { value: 'awards', label: '颁奖&总结' },
];

// 环节默认时间范围（分钟）
const DEFAULT_DURATIONS = {
    warmup: { min: 3, max: 5 },
    saaReminder: { min: 2, max: 3 },
    chairmanSpeech: { min: 3, max: 5 },
    hostIntro: { min: 2, max: 3 },
    evaluationTeam: { min: 2, max: 3 },
    timerIntro: { min: 1, max: 2 },
    ahCounter: { min: 1, max: 2 },
    grammarian: { min: 2, max: 3 },
    guestShare: { min: 3, max: 5 }, // 默认值，但允许手动修改
    tableTopics: { min: 1.5, max: 2.5 },
    guestIntro: { min: 2, max: 3 },
    break: { min: 10, max: 15 },
    prepared: { min: 5, max: 7 },
    topicsEval: { min: 2, max: 3 },
    preparedEval: { min: 2.5, max: 3.5 },
    meetingEval: { min: 3, max: 5 },
    voteAndSummary: { min: 3, max: 5 },
    announcement: { min: 2, max: 3 },
    awards: { min: 5, max: 7 },
};


// 数据接口定义
interface TimerRecord {
    id: string;
    section: string;
    roleName: string;
    roleNickname: string;
    startTime: string;
    endTime: string;
    plannedDurationMin: number;
    plannedDurationMax: number;
    actualMinutes?: number;
    status: string;
    isRunning: boolean;
    isPaused?: boolean; // 新增暂停状态
    pausedTime?: string; // 新增暂停时间点
    totalPausedTime?: number; // 新增累计暂停时间（分钟）
    timerStatus?: 'green' | 'yellow' | 'red' | 'bell' | null;
    countdown?: string;
    elapsedTime?: string; // 新增已用时间显示
    overtimeReason?: string; // 新增超时原因字段
    improvement?: string; // 新增改进建议字段
}


interface Statistics {
    plannedTotal: string;
    actualTotal: string;
    overtime: Array<{ section: string; duration: string }>;
    undertime: Array<{ section: string; duration: string }>;
}

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
    });  const [stats, setStats] = useState<Statistics>({
        plannedTotal: '0:00:00',
        actualTotal: '0:00:00',
        overtime: [],
        undertime: [],
    });
    const [tableTopicsTotal, setTableTopicsTotal] = useState<number>(0);
    // 在组件顶部添加新的状态
    const [deletedRecords, setDeletedRecords] = useState<TimerRecord[]>([]);

    const timerRefs = useRef<{ [key: string]: NodeJS.Timeout }>({});

    const sensor = useSensor(PointerSensor, {
        activationConstraint: {
            distance: 8, // 增加激活距离
        },
    });
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

// 获取指示牌状态图标
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

    const parseTimeInput = (input: string = ''): number => {
        if (!input) return 0;

        console.log('input', input);
        // 处理小数点格式（如 2.5）
        if (input.includes('.')) {
            return parseFloat(input);
        }

        // 处理分:秒格式（如 2:30）
        if (input.includes(':')) {
            const [mins, secs] = input.split(':').map(Number);
            return mins + (secs / 60);
        }

        // 处理纯数字
        return parseInt(input, 10);
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


    const onDragEnd = ({ active, over }: any) => {
        if (active.id !== over?.id) {
            setRecords((prev) => {
                const activeIndex = prev.findIndex((i) => i.id === active.id);
                const overIndex = prev.findIndex((i) => i.id === over?.id);
                return arrayMove(prev, activeIndex, overIndex);
            });
        }
    };


// 在 ToastmastersTimer 组件内添加导出函数
    const exportToExcel = () => {
        const timerStatusColorDesc = {
            green: '绿色正常',
            yellow: '黄色警告',
            red: '红色超时',
            bell: '铃声结束',
        };
        // 准备导出数据
        const exportData = records.map(record => ({
            '环节': SECTIONS.find(s => s.value === record.section)?.label || '',
            '角色名称': record.roleName,
            '角色昵称': record.roleNickname,
            '计划最短时间(分钟)': record.plannedDurationMin,
            '计划最长时间(分钟)': record.plannedDurationMax,
            '开始时间': record.startTime,
            '结束时间': record.endTime,
            '已用时间': record.elapsedTime || '',
            '用时情况': record.status,
            '超时原因': record.overtimeReason || '',
            '改进建议': record.improvement || '',
            '提示牌': timerStatusColorDesc[record.timerStatus] || '',
        }));

        // 准备统计数据
        const summaryData = [
            {
                '统计项': '计划总时长',
                '数值': stats.plannedTotal,
            },
            {
                '统计项': '实际总时长',
                '数值': stats.actualTotal,
            },
            {
                '统计项': '超时环节数',
                '数值': stats.overtime.length,
            },
            {
                '统计项': '不足环节数',
                '数值': stats.undertime.length,
            },
        ];

        // 超时详情
        const overtimeData = stats.overtime.map(item => ({
            '环节': item.section,
            '超时时长': item.duration,
        }));

        // 不足详情
        const undertimeData = stats.undertime.map(item => ({
            '环节': item.section,
            '不足时长': item.duration,
        }));

        // 创建工作簿
        const wb = XLSX.utils.book_new();

        // 添加主数据表
        const ws = XLSX.utils.json_to_sheet(exportData);
        XLSX.utils.book_append_sheet(wb, ws, '会议记录');

        // 添加统计数据表
        const summaryWs = XLSX.utils.json_to_sheet(summaryData);
        XLSX.utils.book_append_sheet(wb, summaryWs, '统计概要');

        // 添加超时详情表（如果有数据）
        if (overtimeData.length > 0) {
            const overtimeWs = XLSX.utils.json_to_sheet(overtimeData);
            XLSX.utils.book_append_sheet(wb, overtimeWs, '超时详情');
        }

        // 添加不足详情表（如果有数据）
        if (undertimeData.length > 0) {
            const undertimeWs = XLSX.utils.json_to_sheet(undertimeData);
            XLSX.utils.book_append_sheet(wb, undertimeWs, '不足详情');
        }

        // 生成文件名
        const now = new Date();
        const fileName = `记录_${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}.xlsx`;

        // 导出文件
        XLSX.writeFile(wb, fileName);
    };


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
    剩余人数：${Math.floor(tableTopicsRemaining / 2)}`;
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
                3 // 3秒后自动关闭
            );
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
                        updateRecord(record.id, 'section', value);

                        // 如果不是嘉宾分享环节，设置默认时间范围
                        if (value !== 'guestShare') {
                            const defaultDuration = DEFAULT_DURATIONS[value];
                            if (defaultDuration) {
                                updateRecord(record.id, 'plannedDurationMin', defaultDuration.min);
                                updateRecord(record.id, 'plannedDurationMax', defaultDuration.max);
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
                    onChange={(e) => updateRecord(record.id, 'roleName', e.target.value)}
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
                    onChange={(e) => updateRecord(record.id, 'roleNickname', e.target.value)}
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
                                updateRecord(record.id, 'plannedDurationMin', value);
                                updateStatus(record);
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
                                updateRecord(record.id, 'plannedDurationMax', value);
                                updateStatus(record);
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
            width: 100,
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
                            onClick={() => startTimer(record.id)}
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

                                updateRecord(record.id, 'isRunning', true);
                                updateRecord(record.id, 'isPaused', false);
                                updateRecord(record.id, 'totalPausedTime', (record.totalPausedTime || 0) + additionalPausedTime);

                                startTimerUpdates(record.id, record.plannedDurationMax, true, record.startTime);
                            }}
                        >
                            继续
                        </Button>
                    )}
                    {record.isRunning && (
                        <Button
                            type="primary"
                            danger
                            onClick={() => endTimer(record.id)}
                        >
                            结束
                        </Button>
                    )}
                    <Button
                        icon={<ReloadOutlined />}
                        onClick={() => resetTimer(record.id)}
                    >
                        重置
                    </Button>
                    <Popconfirm
                        title="删除确认"
                        description="确定要删除这条记录吗？"
                        onConfirm={() => deleteRecord(record.id)}
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
            shouldCellUpdate: (record, prevRecord) => record.overtimeReason !== prevRecord.overtimeReason,
            render: (_: any, record: TimerRecord) => (
                <Input.TextArea
                    value={record.overtimeReason}
                    onChange={(e) => updateRecord(record.id, 'overtimeReason', e.target.value)}
                    placeholder="请输入超时原因..."
                    autoSize={{ minRows: 1, maxRows: 3 }}
                />
            ),
        },
        {
            title: '改进建议',
            dataIndex: 'improvement',
            width: 200,
            shouldCellUpdate: (record, prevRecord) => false,
            render: (_: any, record: TimerRecord) => (
                <Input.TextArea
                    value={record.improvement}
                    onChange={(e) => updateRecord(record.id, 'improvement', e.target.value)}
                    placeholder="请输入改进建议..."
                    autoSize={{ minRows: 1, maxRows: 3 }}
                />
            ),
        },
    ];



// 统计图表数据处理
    const getTableTopicsChartData = () => {
        return records
            .filter(record => record.section === 'tableTopics' && record.elapsedTime)
            .map(record => ({
                name: record.roleNickname || record.roleName,
                elapsedTime: record.elapsedTime,
                actualMinutes: record.actualMinutes,
            }))
            .sort((a, b) => b.actualMinutes - a.actualMinutes);
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
                                </Button>
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

            <Row gutter={[16, 16]}>
                <Col span={8}>
                    <Card title="即兴演讲时间设置">
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <InputNumber
                                style={{ width: '100%' }}
                                min={0}
                                value={tableTopicsTotal}
                                onChange={value => setTableTopicsTotal(value || 0)}
                                addonBefore="总时长（分钟）"
                            />
                            <Statistic
                                title="可用演讲人数（每人2.5分钟）"
                                value={calculateAvailableSpeakers()}
                                suffix="人"
                            />
                        </Space>
                    </Card>
                </Col>

                <Col span={16}>
                    <Card title="会议统计">
                        <Row gutter={16}>
                            <Col span={8}>
                                <Statistic title="计划总时长" value={stats.plannedTotal} />
                            </Col>
                            <Col span={8}>
                                <Statistic title="实际总时长" value={stats.actualTotal} />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>

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
            </Card>

            {records.some(r => r.section === 'tableTopics' && r.elapsedTime) && (
                <Card title="统计" style={{ marginTop: 16 }}>
                    <Column
                        data={getTableTopicsChartData()}
                        xField="name"
                        yField="elapsedTime"
                        label={{
                            position: 'top',
                            style: {
                                fill: '#000000',
                                opacity: 0.6,
                            },
                        }}
                    />
                </Card>
            )}
        </div>
    );
};

export default ToastmastersTimer;