export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const calculateOvulation = (
  lastPeriodDate: Date,
  cycleLength: number,
  periodLength: number
) => {
  // 计算下次月经日期
  const nextPeriodDate = new Date(lastPeriodDate);
  nextPeriodDate.setDate(lastPeriodDate.getDate() + cycleLength);

  // 计算排卵日（一般在下次月经前14天）
  const ovulationDate = new Date(nextPeriodDate);
  ovulationDate.setDate(nextPeriodDate.getDate() - 14);

  // 计算易孕期（排卵日前5天到后1天）
  const fertileWindowStart = new Date(ovulationDate);
  fertileWindowStart.setDate(ovulationDate.getDate() - 5);
  const fertileWindowEnd = new Date(ovulationDate);
  fertileWindowEnd.setDate(ovulationDate.getDate() + 1);

  // 计算安全期
  const safeWindowBeforeStart = new Date(lastPeriodDate);
  const safeWindowBeforeEnd = new Date(fertileWindowStart);
  safeWindowBeforeEnd.setDate(fertileWindowStart.getDate() - 1);

  const safeWindowAfterStart = new Date(fertileWindowEnd);
  safeWindowAfterStart.setDate(fertileWindowEnd.getDate() + 1);
  const safeWindowAfterEnd = new Date(nextPeriodDate);

  // 计算周期各阶段
  const follicularPhaseStart = new Date(lastPeriodDate);
  follicularPhaseStart.setDate(lastPeriodDate.getDate() + periodLength);
  const follicularPhaseEnd = new Date(fertileWindowStart);
  follicularPhaseEnd.setDate(fertileWindowStart.getDate() - 1);

  const ovulatoryPhaseStart = new Date(fertileWindowStart);
  const ovulatoryPhaseEnd = new Date(fertileWindowEnd);

  const lutealPhaseStart = new Date(fertileWindowEnd);
  lutealPhaseStart.setDate(fertileWindowEnd.getDate() + 1);
  const lutealPhaseEnd = new Date(nextPeriodDate);

  // 计算当前所处阶段
  const today = new Date();
  let currentPhase = '';
  if (today >= lastPeriodDate && today <= follicularPhaseStart) {
    currentPhase = '月经期';
  } else if (today > follicularPhaseStart && today < fertileWindowStart) {
    currentPhase = '卵泡期';
  } else if (today >= fertileWindowStart && today <= fertileWindowEnd) {
    currentPhase = '排卵期';
  } else if (today > fertileWindowEnd && today < nextPeriodDate) {
    currentPhase = '黄体期';
  }

  // 计算距离下次月经的天数
  const daysUntilNextPeriod = Math.ceil(
    (nextPeriodDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  return {
    lastPeriodDate,
    nextPeriodDate,
    ovulationDate,
    fertileWindow: {
      start: fertileWindowStart,
      end: fertileWindowEnd
    },
    safeWindow: {
      beforeStart: safeWindowBeforeStart,
      beforeEnd: safeWindowBeforeEnd,
      afterStart: safeWindowAfterStart,
      afterEnd: safeWindowAfterEnd
    },
    cyclePhases: {
      follicularPhase: {
        start: follicularPhaseStart,
        end: follicularPhaseEnd
      },
      ovulatoryPhase: {
        start: ovulatoryPhaseStart,
        end: ovulatoryPhaseEnd
      },
      lutealPhase: {
        start: lutealPhaseStart,
        end: lutealPhaseEnd
      }
    },
    cycleLength,
    periodLength,
    currentPhase,
    daysUntilNextPeriod
  };
};