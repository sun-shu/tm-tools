import { Card, Table, Typography, Badge,Tag } from 'antd';
import { TimerRecord } from '../interface/TimerRecord';
import { SECTIONS } from '../consts';
import { ClockCircleOutlined, ArrowUpOutlined, ArrowDownOutlined, CheckOutlined } from '@ant-design/icons';

interface TimerSummaryProps {
  records: TimerRecord[];
}

interface SectionSummary {
  section: string;
  sectionName: string;
  plannedDuration: number;
  plannedDurationMin: number;
  plannedDurationMax: number;
  actualDuration: number;
  deviation: number;
  records: number;
}

const TimerSummary: React.FC<TimerSummaryProps> = ({ records }) => {
  // 计算总体延迟/超前时间
  const calculateTotalDeviation = () => {
    return records.reduce((total, record) => {
      if (record.actualMinutes) {
        const planned = (record.plannedDurationMin + record.plannedDurationMax) / 2;
        return total + (record.actualMinutes - planned);
      }
      return total;
    }, 0);
  };

  // 按环节汇总数据
  const calculateSectionSummaries = (): SectionSummary[] => {
    const summaries: { [key: string]: SectionSummary } = {};

    records.forEach(record => {
      if (!summaries[record.section]) {
        const sectionInfo = SECTIONS.find(s => s.value === record.section);
        summaries[record.section] = {
          section: record.section,
          sectionName: sectionInfo?.label || record.section,
          plannedDuration: 0,
          plannedDurationMin: 0,
          plannedDurationMax: 0,
          actualDuration: 0,
          deviation: 0,
          records: 0,
        };
      }

      const planned = (record.plannedDurationMin + record.plannedDurationMax) / 2;
      summaries[record.section].plannedDuration += planned;
      summaries[record.section].plannedDurationMin += record.plannedDurationMin;
      summaries[record.section].plannedDurationMax += record.plannedDurationMax;
      if (record.actualMinutes) {
        summaries[record.section].actualDuration += record.actualMinutes;
        summaries[record.section].deviation += (record.actualMinutes - planned);
      }
      summaries[record.section].records += 1;
    });

    return Object.values(summaries).sort((a, b) => Math.abs(b.deviation) - Math.abs(a.deviation));
  };

  const totalDeviation = calculateTotalDeviation();
  const sectionSummaries = calculateSectionSummaries();

  // 将分钟数转换为 HH:MM:SS 格式
  const formatTimeHMS = (minutes: number, showSign: boolean = false): string => {
    const sign = showSign ? (minutes < 0 ? '-' : '+') : '';
    const absMinutes = Math.abs(minutes);
    const hours = Math.floor(absMinutes / 60);
    const mins = Math.floor(absMinutes % 60);
    const secs = Math.round((absMinutes * 60) % 60);
    return `${sign}${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 判断时间状态
  const getTimeStatus = (actual: number, min: number, max: number) => {
    if (actual < min) {
      return { type: 'insufficient', color: 'blue', icon: <ArrowDownOutlined />, text: '不足' };
    } else if (actual > max) {
      return { type: 'overtime', color: 'red', icon: <ArrowUpOutlined />, text: '超时' };
    }
    return { type: 'normal', color: 'success', icon: <CheckOutlined />, text: '合理' };
  };

  // 渲染偏差标签和时间
  const renderDeviationWithBadge = (deviation: number, actual: number, min: number, max: number) => {
    const formattedTime = formatTimeHMS(deviation, true);
    const status = getTimeStatus(actual, min, max);

    return (
      <div className="flex items-center gap-2">
        <Tag color={status.color}>
          {status.icon}
          {status.text}
        </Tag>
        <span style={{ color: status.color === 'red' ? '#ff4d4f' : status.color === 'blue' ? '#1890ff' : '#52c41a' }}>
          {formattedTime}
        </span>
      </div>
    );
  };

  const columns = [
    {
      title: '环节',
      dataIndex: 'sectionName',
      key: 'sectionName',
    },
    {
      title: '计划时长',
      dataIndex: 'plannedDuration',
      key: 'plannedDuration',
      render: (_: number, record: SectionSummary) => (
        <div className="flex items-center gap-2">
          <ClockCircleOutlined />
          {formatTimeHMS(record.plannedDurationMin)} ~ {formatTimeHMS(record.plannedDurationMax)}
        </div>
      ),
    },
    {
      title: '实际时长',
      dataIndex: 'actualDuration',
      key: 'actualDuration',
      render: (value: number) => (
        <div className="flex items-center gap-2">
          <ClockCircleOutlined />
          {formatTimeHMS(value)}
        </div>
      ),
    },
    {
      title: '偏差',
      dataIndex: 'deviation',
      key: 'deviation',
      render: (value: number, record: SectionSummary) =>
        renderDeviationWithBadge(
          value,
          record.actualDuration,
          record.plannedDurationMin,
          record.plannedDurationMax
        ),
      sorter: (a: SectionSummary, b: SectionSummary) => Math.abs(b.deviation) - Math.abs(a.deviation),
    },
    {
      title: '记录数',
      dataIndex: 'records',
      key: 'records',
      render: (value: number) => (
        <Tag>{value}</Tag>
      ),
    },
  ];

  return (
    <Card className="mt-4">
      <div className="flex items-center justify-between mb-4">
        <Typography.Title level={3} className="mb-0">数据汇总</Typography.Title>
        <div className="flex items-center gap-2">
          <Typography.Text strong>整体时间偏差：</Typography.Text>
          {renderDeviationWithBadge(
            totalDeviation,
            sectionSummaries.reduce((sum, section) => sum + section.actualDuration, 0),
            sectionSummaries.reduce((sum, section) => sum + section.plannedDurationMin, 0),
            sectionSummaries.reduce((sum, section) => sum + section.plannedDurationMax, 0)
          )}
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={sectionSummaries}
        rowKey="section"
        pagination={false}
      />
    </Card>
  );
};

export default TimerSummary;
