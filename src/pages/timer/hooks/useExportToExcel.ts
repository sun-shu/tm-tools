import { SECTIONS } from '@/pages/timer/consts';
import * as XLSX from 'xlsx';

const useExportToExcel = (records, stats) => {
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
      '提示牌': timerStatusColorDesc[record.timerStatus] || '',
      '超时原因': record.overtimeReason || '',
      '改进建议': record.improvement || '',
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

  return {
    exportToExcel,
  }
}

export {
  useExportToExcel
}
