export const calculateDueDate = (
  date: Date,
  method: 'lmp' | 'ultrasound',
  ultrasoundWeeks?: number
): DueDateResult => {
  let dueDate: Date;
  
  if (method === 'lmp') {
    // Naegele's rule: LMP + 280 days (40 weeks)
    dueDate = new Date(date);
    dueDate.setDate(date.getDate() + 280);
  } else {
    // Calculate from ultrasound date and gestational age
    dueDate = new Date(date);
    const remainingWeeks = 40 - (ultrasoundWeeks || 0);
    dueDate.setDate(date.getDate() + (remainingWeeks * 7));
  }

  // Calculate current gestational age
  const today = new Date();
  const gestationalDays = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  const gestationalWeeks = Math.floor(gestationalDays / 7);
  const remainingDays = gestationalDays % 7;

  // Determine trimester
  let trimester: string;
  if (gestationalWeeks < 13) {
    trimester = '第一孕期';
  } else if (gestationalWeeks < 27) {
    trimester = '第二孕期';
  } else {
    trimester = '第三孕期';
  }

  // Generate milestones
  const milestones = generateMilestones(date, method);

  // Calculate next checkup date
  const nextCheckup = calculateNextCheckup(gestationalWeeks);

  return {
    dueDate,
    gestationalAge: {
      weeks: gestationalWeeks,
      days: remainingDays
    },
    trimester,
    milestones,
    nextCheckup
  };
};

const generateMilestones = (startDate: Date, method: 'lmp' | 'ultrasound'): Milestone[] => {
  const milestones: Milestone[] = [
    {
      week: 6,
      title: '首次产检',
      description: '建议进行首次产检，确认妊娠',
      category: 'checkup'
    },
    {
      week: 11,
      title: '唐筛检查',
      description: '进行唐氏综合征筛查',
      category: 'checkup'
    },
    {
      week: 20,
      title: '大排畸B超',
      description: '进行系统性胎儿畸形筛查',
      category: 'checkup'
    },
    {
      week: 24,
      title: '糖耐量检查',
      description: '进行妊娠糖尿病筛查',
      category: 'checkup'
    },
    {
      week: 28,
      title: '第三孕期开始',
      description: '增加产检频率，关注胎动',
      category: 'development'
    },
    {
      week: 32,
      title: '准备待产包',
      description: '开始准备待产物品',
      category: 'preparation'
    },
    {
      week: 36,
      title: '胎位检查',
      description: '确认胎位，评估分娩方式',
      category: 'checkup'
    }
  ].map(milestone => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + milestone.week * 7);
    return { ...milestone, date };
  });

  return milestones;
};

const calculateNextCheckup = (currentWeek: number): Date => {
  const today = new Date();
  let daysToAdd: number;

  if (currentWeek < 28) {
    daysToAdd = 28; // 每4周
  } else if (currentWeek < 36) {
    daysToAdd = 14; // 每2周
  } else {
    daysToAdd = 7; // 每周
  }

  const nextCheckup = new Date(today);
  nextCheckup.setDate(today.getDate() + daysToAdd);
  return nextCheckup;
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};