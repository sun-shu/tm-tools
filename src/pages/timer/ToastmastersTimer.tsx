import React, { useState } from 'react';
import { Typography, Card, Space, Button } from 'antd';
import { PlusOutlined, DownloadOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTimer } from './hooks/useTimer';
import { useDeleteHistory } from './hooks/useDeleteHistory';
import { StatisticsCards } from './StatisticsCards';
import { TimerTable } from './TimerTable';
import { DeleteHistoryModal } from './DeleteHistoryModal';
import { generateDefaultRecord } from '../utils/recordGenerator';
import { useExportToExcel } from '../hooks/useExportToExcel';
import { arrayMove } from '@dnd-kit/sortable';

const { Title } = Typography;

const ToastmastersTimer: React.FC = () => {
  const [tableTopicsTotal, setTableTopicsTotal] = useState<number>(0);
  const { records, setRecords, stats, startTimer, endTimer, resetTimer, updateRecord } = useTimer();
  const { deletedRecords, deleteRecord } = useDeleteHistory();
  const { exportToExcel } = useExportToExcel();

  const handleDragEnd = ({ active, over }: any) => {
    if (active.id !== over?.id) {
      setRecords((prev) => {
        const activeIndex = prev.findIndex((i) => i.id === active.id);
        const overIndex = prev.findIndex((i) => i.id === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  const calculateAvailableSpeakers = () => {
    if (!tableTopicsTotal) return 0;
    const tableTopicsUsed = records
      .filter(record => record.section === 'tableTopics')
      .reduce((acc, cur) => acc + (cur.actualMinutes || 0), 0);
    const tableTopicsRemaining = tableTopicsTotal - tableTopicsUsed;

    return `已用时长：${formatTimeInput(tableTopicsUsed)}; 
    剩余时长：${formatTimeInput(tableTopicsRemaining)};
    剩余人数：${Math.floor(tableTopicsRemaining / 2)}`;
  };

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>头马计时器</Title>

      <StatisticsCards
        stats={stats}
        tableTopicsTotal={tableTopicsTotal}
        onTableTopicsTotalChange={setTableTopicsTotal}
        calculateAvailableSpeakers={calculateAvailableSpeakers}
      />

      <Card style={{ marginTop: 16 }}>
        <Space style={{ marginBottom: 16 }}>
          // ... 续接上文
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              const newRecord = generateDefaultRecord('');
              setRecords([...records, newRecord]);
            }}
          >
            添加环节
          </Button>
          <Button
            icon={<DownloadOutlined />}
            onClick={() => exportToExcel(records, stats)}
            disabled={records.length === 0}
          >
            导出数据
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => DeleteHistoryModal.show(deletedRecords)}
            disabled={deletedRecords.length === 0}
          >
            删除历史
          </Button>
        </Space>

        <TimerTable
          records={records}
          onDragEnd={handleDragEnd}
          onUpdateRecord={updateRecord}
          onStartTimer={startTimer}
          onEndTimer={endTimer}
          onResetTimer={resetTimer}
          onDeleteRecord={deleteRecord(records, setRecords)}
        />
      </Card>

      {records.some(r => r.section === 'tableTopics' && r.elapsedTime) && (
        <StatisticsChart records={records} />
      )}
    </div>
  );
};

export default ToastmastersTimer;
