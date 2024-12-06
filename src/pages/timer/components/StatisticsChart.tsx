import React from 'react';
import { Card } from 'antd';
import { Column } from '@ant-design/plots';
import { TimerRecord } from '../interface/TimerRecord';

interface StatisticsChartProps {
  records: TimerRecord[];
  type: string;
  title: string;
}

export const StatisticsChart: React.FC<StatisticsChartProps> = ({ records, type, title }) => {
  const getChartData = () => {
    return records
      .filter(record => record.section === type && record.elapsedTime)
      .map(record => ({
        name: record.roleNickname || record.roleName,
        elapsedTime: record.elapsedTime,
        actualMinutes: record.actualMinutes,
      }))
      .sort((a, b) => b.actualMinutes - a.actualMinutes);
  };

  const config = {
    data: getChartData(),
    xField: 'name',
    yField: 'elapsedTime',
    label: {
      position: 'top',
      style: {
        fill: '#000000',
        opacity: 1,
      },
    },
    style: {
      // 圆角样式
      radiusTopLeft: 10,
      radiusTopRight: 10,
      maxWidth: 100,

    },
  };

  return (
    <Card title={title} style={{ marginTop: 16 }}>
      <Column
        {...config}
      />
    </Card>
  );
};
