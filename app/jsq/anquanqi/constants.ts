export const defaultSafePeriodParams = {
  lastPeriodDate: '',
  cycleLength: '28',
  periodLength: '5'
};

export const phaseDescriptions = {
  menstruation: {
    name: '月经期',
    description: '月经出血期间',
    risk: '不建议同房',
    duration: '3-7天'
  },
  follicular: {
    name: '卵泡期',
    description: '月经结束后到排卵前',
    risk: '相对安全期',
    duration: '7-14天'
  },
  ovulation: {
    name: '排卵期',
    description: '最容易受孕的时期',
    risk: '高危期',
    duration: '24-36小时'
  },
  luteal: {
    name: '黄体期',
    description: '排卵后到下次月经前',
    risk: '相对安全期',
    duration: '14天'
  }
};

export const reliabilityFactors = {
  cycleRegularity: {
    name: '月经规律性',
    impact: '极大影响',
    description: '月经不规律会导致排卵时间不确定'
  },
  cycleLength: {
    name: '周期长度',
    impact: '重要影响',
    description: '过长或过短的周期会影响计算准确性'
  },
  lifestyle: {
    name: '生活方式',
    impact: '中等影响',
    description: '压力、作息、饮食等因素会影响排卵'
  },
  age: {
    name: '年龄因素',
    impact: '一定影响',
    description: '年龄会影响月经规律性和排卵'
  }
};

export const contraceptiveMethods = [
  {
    name: '避孕套',
    reliability: '82-98%',
    advantages: ['使用方便', '无激素影响', '可预防性病'],
    disadvantages: ['使用不当可能失败', '可能影响感觉']
  },
  {
    name: '口服避孕药',
    reliability: '91-99%',
    advantages: ['高效可靠', '可调节月经'],
    disadvantages: ['需按时服用', '可能有副作用']
  },
  {
    name: '宫内节育器',
    reliability: '99%',
    advantages: ['长效避孕', '无需记忆'],
    disadvantages: ['需医生操作', '可能有不适']
  },
  {
    name: '皮下埋植剂',
    reliability: '99%',
    advantages: ['长效避孕', '无需记忆'],
    disadvantages: ['需医生操作', '可能影响月经']
  }
];