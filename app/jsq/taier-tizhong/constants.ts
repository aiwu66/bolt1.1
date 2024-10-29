export const defaultFetalParams = {
  gestationalAge: '28',
  bpd: '',
  hc: '',
  ac: '',
  fl: ''
};

export const measurementRanges = {
  bpd: { min: 20, max: 100, normal: '正常范围：20-100mm' },
  hc: { min: 80, max: 350, normal: '正常范围：80-350mm' },
  ac: { min: 50, max: 400, normal: '正常范围：50-400mm' },
  fl: { min: 10, max: 80, normal: '正常范围：10-80mm' }
};

export const weightCategories = [
  {
    category: '偏小',
    range: '< 10%',
    description: '胎儿体重低于同孕周正常范围',
    risk: '需要关注胎儿生长受限风险',
    color: 'text-red-500'
  },
  {
    category: '正常',
    range: '10-90%',
    description: '胎儿体重在正常范围内',
    risk: '继续保持良好的孕期保健',
    color: 'text-green-500'
  },
  {
    category: '偏大',
    range: '> 90%',
    description: '胎儿体重高于同孕周正常范围',
    risk: '需要关注妊娠糖尿病风险',
    color: 'text-yellow-500'
  }
];

export const measurementDescriptions = {
  bpd: {
    name: '双顶径',
    description: '胎儿头部两侧顶骨之间的最大距离',
    importance: '反映胎儿头部发育情况',
    icon: '🧠'
  },
  hc: {
    name: '头围',
    description: '胎儿头部最大周长',
    importance: '评估胎儿大脑发育',
    icon: '👶'
  },
  ac: {
    name: '腹围',
    description: '胎儿腹部最大周长',
    importance: '反映胎儿营养状况',
    icon: '🤰'
  },
  fl: {
    name: '股骨长度',
    description: '胎儿大腿骨的长度',
    importance: '评估胎儿骨骼发育',
    icon: '🦴'
  }
};

export const calculationMethods = [
  {
    name: 'Hadlock四参数公式',
    params: ['bpd', 'hc', 'ac', 'fl'],
    accuracy: '最准确',
    description: '使用所有四个参数，提供最准确的估算'
  },
  {
    name: 'Hadlock AC-FL公式',
    params: ['ac', 'fl'],
    accuracy: '较准确',
    description: '使用腹围和股骨长度进行估算'
  },
  {
    name: 'Hadlock BPD-AC公式',
    params: ['bpd', 'ac'],
    accuracy: '一般准确',
    description: '使用双顶径和腹围进行估算'
  }
];