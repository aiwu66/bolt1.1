export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const calculateSafePeriod = (
  lastPeriodDate: Date,
  cycleLength: number,
  periodLength: number
) => {
  // 计算下次月经日期
  const nextPeriodDate = new Date(lastPeriodDate);
  nextPeriodDate.setDate(lastPeriodDate.getDate() + cycleLength);

  // 计算排卵日（下次月经前14天）
  const ovulationDate = new Date(nextPeriodDate);
  ovulationDate.setDate(nextPeriodDate.getDate() - 14);

  // 计算危险期（排卵日前5天到后4天）
  const dangerStart = new Date(ovulationDate);
  dangerStart.setDate(ovulationDate.getDate() - 5);
  const dangerEnd = new Date(ovulationDate);
  dangerEnd.setDate(ovulationDate.getDate() + 4);

  // 计算安全期
  const safeBeforeStart = new Date(lastPeriodDate);
  safeBeforeStart.setDate(lastPeriodDate.getDate() + periodLength);
  const safeBeforeEnd = new Date(dangerStart);
  safeBeforeEnd.setDate(dangerStart.getDate() - 1);

  const safeAfterStart = new Date(dangerEnd);
  safeAfterStart.setDate(dangerEnd.getDate() + 1);
  const safeAfterEnd = new Date(nextPeriodDate);

  // 计算各个周期阶段
  const menstruationEnd = new Date(lastPeriodDate);
  menstruationEnd.setDate(lastPeriodDate.getDate() + periodLength - 1);

  const follicularStart = new Date(menstruationEnd);
  follicularStart.setDate(menstruationEnd.getDate() + 1);
  const follicularEnd = new Date(dangerStart);
  follicularEnd.setDate(dangerStart.getDate() - 1);

  const ovulationStart = new Date(dangerStart);
  const ovulationEnd = new Date(dangerEnd);

  const lutealStart = new Date(dangerEnd);
  lutealStart.setDate(dangerEnd.getDate() + 1);
  const lutealEnd = new Date(nextPeriodDate);
  lutealEnd.setDate(nextPeriodDate.getDate() - 1);

  // 计算当前所处阶段
  const today = new Date();
  let currentPhase = '';
  if (today >= lastPeriodDate && today <= menstruationEnd) {
    currentPhase = '月经期';
  } else if (today > menstruationEnd && today < dangerStart) {
    currentPhase = '卵泡期';
  } else if (today >= dangerStart && today <= dangerEnd) {
    currentPhase = '排卵期';
  } else if (today > dangerEnd && today < nextPeriodDate) {
    currentPhase = '黄体期';
  }

  // 计算可靠性评分和影响因素
  let reliabilityScore = 100;
  const factors = [];
  const recommendations = [];

  if (cycleLength < 26 || cycleLength > 32) {
    reliabilityScore -= 30;
    factors.push('月经周期不规律');
    recommendations.push('建议选择其他避孕方式');
  }

  if (periodLength < 3 || periodLength > 7) {
    reliabilityScore -= 20;
    factors.push('月经持续时间异常');
    recommendations.push('建议就医检查');
  }

  factors.push('安全期避孕法本身存在不确定性');
  recommendations.push('建议采用更可靠的避孕方式');

  return {
    lastPeriodDate,
    nextPeriodDate,
    ovulationDate,
    safePeriods: {
      beforeOvulation: {
        start: safeBeforeStart,
        end: safeBeforeEnd
      },
      afterOvulation: {
        start: safeAfterStart,
        end: safeAfterEnd
      }
    },
    dangerPeriod: {
      start: dangerStart,
      end: dangerEnd
    },
    periodPhases: {
      menstruation: {
        start: lastPeriodDate,
        end: menstruationEnd
      },
      follicular: {
        start: follicularStart,
        end: follicularEnd
      },
      ovulation: {
        start: ovulationStart,
        end: ovulationEnd
      },
      luteal: {
        start: lutealStart,
        end: lutealEnd
      }
    },
    cycleLength,
    periodLength,
    currentPhase,
    reliability: {
      score: reliabilityScore,
      factors,
      recommendations
    }
  };
};