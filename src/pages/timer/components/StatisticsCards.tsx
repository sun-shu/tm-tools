import React from 'react';
import { Card, Row, Col, Statistic, Space, InputNumber } from 'antd';
import { Statistics } from '../interface/Statistics';

interface StatisticsCardsProps {
  stats: Statistics;
  tableTopicsTotal: number;
  onTableTopicsTotalChange: (value: number) => void;
  calculateAvailableSpeakers: () => string;
}

export const StatisticsCards: React.FC<StatisticsCardsProps> = ({
                                                                  stats,
                                                                  tableTopicsTotal,
                                                                  onTableTopicsTotalChange,
                                                                  calculateAvailableSpeakers,
                                                                }) => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={8}>
        <Card title="即兴演讲时间设置">
          <Space direction="vertical" style={{ width: '100%' }}>
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              value={tableTopicsTotal}
              onChange={value => onTableTopicsTotalChange(value || 0)}
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
  );
};
