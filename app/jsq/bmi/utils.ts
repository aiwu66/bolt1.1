export const calculateBMI = (weight: number, height: number): BMIResult => {
  // Convert height to meters
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  // Determine BMI category and health risk
  let category: string;
  let healthRisk: string;
  let recommendations: string[] = [];

  if (bmi < 18.5) {
    category = '偏瘦';
    healthRisk = '营养不良风险';
    recommendations = [
      '适当增加热量摄入',
      '注意补充蛋白质',
      '进行适度的力量训练',
      '保持规律作息'
    ];
  } else if (bmi < 24) {
    category = '正常';
    healthRisk = '健康';
    recommendations = [
      '保持健康的生活方式',
      '规律运动',
      '均衡饮食',
      '定期体检'
    ];
  } else if (bmi < 28) {
    category = '超重';
    healthRisk = '较高患病风险';
    recommendations = [
      '控制热量摄入',
      '增加有氧运动',
      '减少高脂肪食物',
      '规律作息'
    ];
  } else {
    category = '肥胖';
    healthRisk = '高患病风险';
    recommendations = [
      '严格控制饮食',
      '每周至少150分钟有氧运动',
      '寻求专业医生建议',
      '定期监测身体指标'
    ];
  }

  // Calculate ideal weight range (BMI 18.5-24)
  const idealWeight = {
    min: Math.round(18.5 * heightInMeters * heightInMeters),
    max: Math.round(24 * heightInMeters * heightInMeters)
  };

  return {
    bmi: Math.round(bmi * 10) / 10,
    category,
    healthRisk,
    idealWeight,
    recommendations
  };
};

export const formatNumber = (value: number, decimals: number = 1): string => {
  return value.toFixed(decimals);
};