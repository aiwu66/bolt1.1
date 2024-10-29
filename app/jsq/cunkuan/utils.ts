export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

export const formatPercent = (value: number) => {
  return new Intl.NumberFormat('zh-CN', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value / 100);
};

export const calculateDeposit = (
  principal: number,
  rate: number,
  months: number,
  type: 'regular' | 'current' | 'agreement'
): DepositResult => {
  const monthlyRate = rate / 12 / 100;
  const monthlyInterest: number[] = [];
  let totalInterest = 0;

  if (type === 'current') {
    // 活期存款按日计息
    const dailyRate = rate / 365 / 100;
    totalInterest = principal * dailyRate * months * 30;
    for (let i = 0; i < months; i++) {
      monthlyInterest.push(principal * dailyRate * 30);
    }
  } else if (type === 'regular') {
    // 定期存款到期还本付息
    totalInterest = principal * rate * (months / 12) / 100;
    for (let i = 0; i < months; i++) {
      monthlyInterest.push(0);
    }
    monthlyInterest[months - 1] = totalInterest;
  } else {
    // 协议存款按月计息
    for (let i = 0; i < months; i++) {
      const interest = principal * monthlyRate;
      monthlyInterest.push(interest);
      totalInterest += interest;
    }
  }

  const effectiveRate = (totalInterest / principal) * (12 / months) * 100;
  const taxRate = 0.2; // 20%利息税率
  const taxAmount = totalInterest * taxRate;
  const afterTaxInterest = totalInterest - taxAmount;

  return {
    principal,
    interest: totalInterest,
    total: principal + totalInterest,
    monthlyInterest,
    effectiveRate,
    taxAmount,
    afterTaxInterest,
    afterTaxTotal: principal + afterTaxInterest
  };
};