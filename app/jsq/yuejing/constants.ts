export const defaultMenstrualParams = {
  lastPeriodDate: '',
  cycleLength: '28',
  periodLength: '5',
  symptoms: [] as string[]
};

export const cycleTypes = {
  short: {
    range: '21-25天',
    description: '周期偏短',
    recommendation: '建议就医检查是否有内分泌问题'
  },
  normal: {
    range: '26-32天',
    description: '周期正常',
    recommendation: '继续保持规律作息和健康饮食'
  },
  long: {
    range: '33-35天',
    description: '周期偏长',
    recommendation: '建议就医检查是否有内分泌失调'
  },
  irregular: {
    range: '不规律',
    description: '周期不规律',
    recommendation: '建议就医检查是否有妇科疾病'
  }
};

export const commonSymptoms = [
  {
    type: '痛经',
    levels: ['轻微', '中度', '严重'],
    suggestions: [
      '可以适当热敷缓解',
      '建议服用止痛药',
      '建议就医检查'
    ]
  },
  {
    type: '乳房胀痛',
    levels: ['轻微', '明显'],
    suggestions: [
      '属于正常现象',
      '可以适当按摩缓解'
    ]
  },
  {
    type: '情绪波动',
    levels: ['轻微', '明显'],
    suggestions: [
      '保持心情愉悦',
      '适当运动放松'
    ]
  },
  {
    type: '食欲变化',
    levels: ['食欲减退', '食欲增加'],
    suggestions: [
      '注意营养均衡',
      '控制饮食量'
    ]
  }
];