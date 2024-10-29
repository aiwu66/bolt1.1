export const defaultBMIParams = {
  height: '170',
  weight: '65',
};

export const bmiCategories = [
  {
    range: '< 18.5',
    category: '偏瘦',
    risk: '营养不良风险',
    description: '体重过轻可能导致免疫力下降、骨质疏松等问题'
  },
  {
    range: '18.5 - 23.9',
    category: '正常',
    risk: '健康',
    description: '体重正常，继续保持健康的生活方式'
  },
  {
    range: '24.0 - 27.9',
    category: '超重',
    risk: '较高患病风险',
    description: '超重可能增加心血管疾病、糖尿病等风险'
  },
  {
    range: '≥ 28.0',
    category: '肥胖',
    risk: '高患病风险',
    description: '肥胖会显著增加多种慢性病的风险'
  }
];

export const healthyTips = [
  {
    title: '均衡饮食',
    tips: [
      '每天摄入充足的蔬菜和水果',
      '选择全谷物食品',
      '适量摄入优质蛋白',
      '控制油盐糖的摄入'
    ]
  },
  {
    title: '规律运动',
    tips: [
      '每周进行150分钟中等强度运动',
      '包含有氧运动和力量训练',
      '循序渐进增加运动量',
      '选择适合自己的运动方式'
    ]
  },
  {
    title: '生活习惯',
    tips: [
      '保持充足的睡眠',
      '管理压力',
      '戒烟限酒',
      '定期体检'
    ]
  }
];