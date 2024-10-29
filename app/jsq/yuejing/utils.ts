export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const calculateMenstrual = (
  lastPeriodDate: Date,
  cycleLength: number,
  periodLength: number
) => {
  // 计算下次月经日期
  const nextPeriodDate = new Date(lastPeriodDate);
  nextPeriodDate.setDate(lastPeriodDate.getDate() + cycleLength);

  // 计算当前所处阶段
  const today = new Date();
  const daysSinceLastPeriod = Math.floor(
    (today.getTime() - lastPeriodDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  let currentPhase = '';
  if (daysSinceLastPeriod <= periodLength) {
    currentPhase = '月经期';
  } else if (daysSinceLastPeriod <= 14) {
    currentPhase = '卵泡期';
  } else if (daysSinceLastPeriod <= 16) {
    currentPhase = '排卵期';
  } else {
    currentPhase = '黄体期';
  }

  // 计算距离下次月经的天数
  const daysUntilNextPeriod = Math.ceil(
    (nextPeriodDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  // 分析月经周期规律
  let cycleAnalysis = {
    regularity: '',
    recommendation: ''
  };

  if (cycleLength < 21) {
    cycleAnalysis = {
      regularity: '周期过短',
      recommendation: '建议就医检查是否有内分泌问题'
    };
  } else if (cycleLength > 35) {
    cycleAnalysis = {
      regularity: '周期过长',
      recommendation: '建议就医检查是否有内分泌失调'
    };
  } else if (cycleLength >= 26 && cycleLength <= 32) {
    cycleAnalysis = {
      regularity: '周期正常',
      recommendation: '继续保持规律作息和健康饮食'
    };
  } else {
    cycleAnalysis = {
      regularity: '周期异常',
      recommendation: '建议就医检查'
    };
  }

  // 生成未来3个月的月经日期
  const periodSchedule = [];
  let currentDate = new Date(nextPeriodDate);
  
  for (let i = 0; i < 3; i++) {
    const startDate = new Date(currentDate);
    const endDate = new Date(currentDate);
    endDate.setDate(startDate.getDate() + periodLength - 1);
    
    periodSchedule.push({
      startDate,
      endDate
    });
    
    currentDate.setDate(currentDate.getDate() + cycleLength);
  }

  return {
    lastPeriodDate,
    nextPeriodDate,
    periodLength,
    cycleLength,
    currentPhase,
    daysUntilNextPeriod,
    cycleAnalysis,
    periodSchedule
  };
};