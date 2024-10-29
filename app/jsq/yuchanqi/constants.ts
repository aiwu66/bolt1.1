export const defaultDueDateParams = {
  method: 'lmp' as const,
  date: '',
  ultrasoundWeeks: ''
};

export const checkupSchedule = [
  { week: '6-8', frequency: '首次产检', description: '确认妊娠、建立母子健康手册' },
  { week: '9-12', frequency: '每4周', description: '唐筛、NT检查' },
  { week: '13-27', frequency: '每4周', description: '常规产检、大排畸' },
  { week: '28-35', frequency: '每2周', description: '关注胎动、胎心监护' },
  { week: '36-40', frequency: '每周', description: '评估胎位、准备分娩' }
];

export const pregnancyMilestones = {
  firstTrimester: [
    { week: 4, event: '胚胎着床' },
    { week: 6, event: '可见胎心' },
    { week: 8, event: '主要器官形成' },
    { week: 12, event: '完成早期发育' }
  ],
  secondTrimester: [
    { week: 16, event: '开始有胎动' },
    { week: 20, event: '确定胎儿性别' },
    { week: 24, event: '听力发育' },
    { week: 26, event: '睁眼、眨眼' }
  ],
  thirdTrimester: [
    { week: 28, event: '快速增重期' },
    { week: 32, event: '胎位固定' },
    { week: 36, event: '肺部成熟' },
    { week: 40, event: '预产期' }
  ]
};