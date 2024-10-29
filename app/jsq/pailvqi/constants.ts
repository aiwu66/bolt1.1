export const defaultOvulationParams = {
  lastPeriodDate: '',
  cycleLength: '28',
  periodLength: '5'
};

export const cyclePhases = [
  {
    name: '月经期',
    description: '子宫内膜脱落，出现月经',
    duration: '3-7天',
    tips: [
      '注意个人卫生',
      '适当休息',
      '避免剧烈运动',
      '保持心情愉悦'
    ]
  },
  {
    name: '卵泡期',
    description: '卵泡发育，子宫内膜增厚',
    duration: '7-14天',
    tips: [
      '补充叶酸',
      '均衡饮食',
      '规律作息',
      '适量运动'
    ]
  },
  {
    name: '排卵期',
    description: '卵子排出，最易受孕时期',
    duration: '24-36小时',
    tips: [
      '把握备孕时机',
      '保持良好心态',
      '规律同房',
      '避免过度疲劳'
    ]
  },
  {
    name: '黄体期',
    description: '为受精卵着床做准备',
    duration: '14天',
    tips: [
      '保持作息规律',
      '避免剧烈运动',
      '注意保暖',
      '心态平和'
    ]
  }
];

export const cycleTypes = {
  short: {
    length: '21-25天',
    description: '周期偏短，可能影响卵子质量',
    recommendation: '建议就医检查是否有内分泌问题'
  },
  normal: {
    length: '26-32天',
    description: '正常月经周期',
    recommendation: '继续保持规律作息和健康饮食'
  },
  long: {
    length: '33-35天',
    description: '周期偏长，可能影响排卵',
    recommendation: '建议就医检查是否有多囊卵巢等问题'
  },
  irregular: {
    length: '不规律',
    description: '周期不规律，影响备孕',
    recommendation: '建议就医检查内分泌和卵巢功能'
  }
};