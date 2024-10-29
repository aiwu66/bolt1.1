// Hadlock公式计算胎儿体重
export const calculateFetalWeight = (measurements: {
  bpd?: number; // 双顶径 (mm)
  hc?: number;  // 头围 (mm)
  ac?: number;  // 腹围 (mm)
  fl?: number;  // 股骨长度 (mm)
}, gestationalAge: number): FetalWeightResult => {
  let weight = 0;
  let formula = '';
  
  // 将毫米转换为厘米进行计算
  const measurementsInCm = {
    bpd: measurements.bpd ? measurements.bpd / 10 : undefined,
    hc: measurements.hc ? measurements.hc / 10 : undefined,
    ac: measurements.ac ? measurements.ac / 10 : undefined,
    fl: measurements.fl ? measurements.fl / 10 : undefined,
  };
  
  // 使用最准确的Hadlock公式计算
  if (measurementsInCm.ac && measurementsInCm.fl && measurementsInCm.bpd && measurementsInCm.hc) {
    // Hadlock四参数公式 (BPD, HC, AC, FL) - 最准确
    weight = Math.exp(1.5662 + 
      0.0108 * measurementsInCm.hc + 
      0.0468 * measurementsInCm.ac + 
      0.171 * measurementsInCm.fl + 
      0.00034 * measurementsInCm.hc * measurementsInCm.hc - 
      0.003685 * measurementsInCm.ac * measurementsInCm.fl);
    formula = 'Hadlock四参数公式';
  } else if (measurementsInCm.ac && measurementsInCm.fl) {
    // Hadlock AC-FL公式 - 第二准确
    weight = Math.exp(1.304 + 
      0.05281 * measurementsInCm.ac + 
      0.1938 * measurementsInCm.fl - 
      0.004 * measurementsInCm.fl * measurementsInCm.ac);
    formula = 'Hadlock AC-FL公式';
  } else if (measurementsInCm.bpd && measurementsInCm.ac) {
    // Hadlock BPD-AC公式 - 第三准确
    weight = Math.exp(1.1134 + 
      0.05845 * measurementsInCm.ac - 
      0.000604 * measurementsInCm.ac * measurementsInCm.ac + 
      0.05162 * measurementsInCm.bpd);
    formula = 'Hadlock BPD-AC公式';
  }

  weight = weight * 1000; // 转换为克

  // 根据孕周获取正常范围
  const weightRange = getWeightRange(gestationalAge);
  const percentile = calculatePercentile(weight, gestationalAge);
  const category = getWeightCategory(percentile);
  const recommendations = getRecommendations(category, gestationalAge);

  return {
    weight: Math.round(weight),
    gestationalAge,
    percentile,
    weightRange,
    category,
    recommendations,
    measurements,
    formula, // 添加使用的公式信息
    accuracy: getFormulaAccuracy(formula) // 添加公式准确度信息
  };
};

// 获取公式准确度信息
const getFormulaAccuracy = (formula: string): string => {
  switch (formula) {
    case 'Hadlock四参数公式':
      return '误差范围±7%';
    case 'Hadlock AC-FL公式':
      return '误差范围±10%';
    case 'Hadlock BPD-AC公式':
      return '误差范围±12%';
    default:
      return '未知';
  }
};

// 获取胎儿体重范围
const getWeightRange = (gestationalAge: number) => {
  // 使用更准确的Hadlock生长曲线公式
  const baseWeight = getBaseWeight(gestationalAge);
  const sd = baseWeight * 0.15; // 标准差约为平均值的15%
  
  return {
    min: Math.round(baseWeight - 2 * sd), // 第3百分位
    max: Math.round(baseWeight + 2 * sd)  // 第97百分位
  };
};

// 计算体重百分位数
const calculatePercentile = (weight: number, gestationalAge: number) => {
  const expectedWeight = getBaseWeight(gestationalAge);
  const sd = expectedWeight * 0.15;
  const zScore = (weight - expectedWeight) / sd;
  
  // 将z分数转换为百分位数
  const percentile = Math.round(normalCDF(zScore) * 100);
  return Math.min(Math.max(percentile, 1), 99); // 限制在1-99之间
};

// 标准正态分布累积分布函数
const normalCDF = (x: number) => {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989423 * Math.exp(-x * x / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return x > 0 ? 1 - p : p;
};

// 基准体重计算 (更新的Hadlock生长曲线)
const getBaseWeight = (gestationalAge: number) => {
  // 更准确的Hadlock生长曲线公式
  const ga = Math.max(Math.min(gestationalAge, 42), 12); // 限制在12-42周
  return Math.exp(0.578 + 0.332 * ga - 0.00354 * ga * ga) * 1000;
};

// 获取体重分类
const getWeightCategory = (percentile: number): string => {
  if (percentile < 10) return '偏小';
  if (percentile > 90) return '偏大';
  return '正常';
};

// 获取建议
const getRecommendations = (category: string, gestationalAge: number): string[] => {
  const baseRecommendations = [
    '定期产检，监测胎儿发育',
    '保持均衡饮食，适量运动',
    '保持良好心情，避免压力'
  ];

  if (category === '偏小') {
    return [
      '增加优质蛋白质和营养素摄入',
      '适当补充叶酸、铁剂等营养素',
      '建议增加产检频率',
      '注意休息，避免剧烈运动',
      ...baseRecommendations
    ];
  } else if (category === '偏大') {
    return [
      '控制碳水化合物摄入',
      '注意血糖监测',
      '进行适度运动',
      '建议增加产检频率',
      ...baseRecommendations
    ];
  }

  return baseRecommendations;
};

export const formatNumber = (value: number, decimals: number = 0): string => {
  return value.toFixed(decimals);
};