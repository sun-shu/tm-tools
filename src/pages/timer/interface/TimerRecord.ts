// 数据接口定义
export interface TimerRecord {
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

