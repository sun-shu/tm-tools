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

export { SECTIONS, DEFAULT_DURATIONS };
