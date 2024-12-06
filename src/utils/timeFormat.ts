export const formatDateTime = (date: Date): string => {
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

export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = Math.floor(minutes % 60);
  const secs = Math.round((minutes * 60) % 60);
  return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const formatTimeInput = (minutes: number): string => {
  if (!minutes) return '';
  const mins = Math.floor(minutes);
  const secs = Math.round((minutes - mins) * 60);
  return secs ? `${mins}:${secs.toString().padStart(2, '0')}` : mins.toString();
};

export const parseTimeInput = (input: string = ''): number => {
  if (!input) return 0;

  if (input.includes('.')) {
    return parseFloat(input);
  }

  if (input.includes(':')) {
    const [mins, secs] = input.split(':').map(Number);
    return mins + (secs / 60);
  }

  return parseInt(input, 10);
};
