export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

export const calculateCommercialLoan = (
  loanAmount: number,
  years: number,
  annualRate: number,
  isEqualPayment: boolean
) => {
  const monthlyRate = annualRate / 100 / 12;
  const months = years * 12;
  
  let monthlyPayment: number;
  let totalPayment: number;
  let schedule: any[] = [];
  
  if (isEqualPayment) {
    monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                     (Math.pow(1 + monthlyRate, months) - 1);
    totalPayment = monthlyPayment * months;
    
    let remainingBalance = loanAmount;
    for (let month = 1; month <= months; month++) {
      const interest = remainingBalance * monthlyRate;
      const principal = monthlyPayment - interest;
      remainingBalance -= principal;
      
      schedule.push({
        month,
        payment: monthlyPayment,
        principal,
        interest,
        remainingBalance: Math.max(0, remainingBalance)
      });
    }
  } else {
    const monthlyPrincipal = loanAmount / months;
    let remainingBalance = loanAmount;
    totalPayment = 0;
    
    for (let month = 1; month <= months; month++) {
      const interest = remainingBalance * monthlyRate;
      const payment = monthlyPrincipal + interest;
      remainingBalance -= monthlyPrincipal;
      totalPayment += payment;
      
      schedule.push({
        month,
        payment,
        principal: monthlyPrincipal,
        interest,
        remainingBalance: Math.max(0, remainingBalance)
      });
    }
    monthlyPayment = schedule[0].payment;
  }
  
  return {
    monthlyPayment,
    totalPayment,
    totalInterest: totalPayment - loanAmount,
    loanAmount,
    paymentSchedule: schedule
  };
};