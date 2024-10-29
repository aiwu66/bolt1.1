export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

export const calculateHousingFundLoan = (
  loanAmount: number,
  years: number,
  annualRate: number,
  isEqualPayment: boolean,
  commercialLoanAmount?: number,
  commercialLoanRate?: number
) => {
  const calculateLoanPayments = (
    principal: number,
    rate: number,
    years: number,
    isEqualPayment: boolean
  ) => {
    const monthlyRate = rate / 100 / 12;
    const months = years * 12;
    
    let monthlyPayment: number;
    let totalPayment: number;
    let schedule: any[] = [];
    
    if (isEqualPayment) {
      monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                       (Math.pow(1 + monthlyRate, months) - 1);
      totalPayment = monthlyPayment * months;
      
      let remainingBalance = principal;
      for (let month = 1; month <= months; month++) {
        const interest = remainingBalance * monthlyRate;
        const principalPart = monthlyPayment - interest;
        remainingBalance -= principalPart;
        
        schedule.push({
          month,
          payment: monthlyPayment,
          principal: principalPart,
          interest,
          remainingBalance: Math.max(0, remainingBalance)
        });
      }
    } else {
      const monthlyPrincipal = principal / months;
      let remainingBalance = principal;
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
      totalInterest: totalPayment - principal,
      schedule
    };
  };

  // 计算公积金贷款部分
  const housingFundResult = calculateLoanPayments(loanAmount, annualRate, years, isEqualPayment);
  
  // 如果有商业贷款部分，计算组合贷款
  if (commercialLoanAmount && commercialLoanRate) {
    const commercialResult = calculateLoanPayments(
      commercialLoanAmount,
      commercialLoanRate,
      years,
      isEqualPayment
    );

    // 合并两种贷款的结果
    const combinedSchedule = housingFundResult.schedule.map((item, index) => ({
      month: item.month,
      payment: item.payment + commercialResult.schedule[index].payment,
      principal: item.principal + commercialResult.schedule[index].principal,
      interest: item.interest + commercialResult.schedule[index].interest,
      remainingBalance: item.remainingBalance + commercialResult.schedule[index].remainingBalance,
      // 分开显示两种贷款的详情
      housingFund: {
        payment: item.payment,
        principal: item.principal,
        interest: item.interest,
        remainingBalance: item.remainingBalance
      },
      commercial: {
        payment: commercialResult.schedule[index].payment,
        principal: commercialResult.schedule[index].principal,
        interest: commercialResult.schedule[index].interest,
        remainingBalance: commercialResult.schedule[index].remainingBalance
      }
    }));

    return {
      monthlyPayment: housingFundResult.monthlyPayment + commercialResult.monthlyPayment,
      totalPayment: housingFundResult.totalPayment + commercialResult.totalPayment,
      totalInterest: housingFundResult.totalInterest + commercialResult.totalInterest,
      loanAmount: loanAmount + commercialLoanAmount,
      paymentSchedule: combinedSchedule,
      // 分开显示两种贷款的汇总信息
      housingFundSummary: {
        monthlyPayment: housingFundResult.monthlyPayment,
        totalPayment: housingFundResult.totalPayment,
        totalInterest: housingFundResult.totalInterest,
        loanAmount: loanAmount
      },
      commercialSummary: {
        monthlyPayment: commercialResult.monthlyPayment,
        totalPayment: commercialResult.totalPayment,
        totalInterest: commercialResult.totalInterest,
        loanAmount: commercialLoanAmount
      }
    };
  }

  // 只有公积金贷款的情况
  return {
    monthlyPayment: housingFundResult.monthlyPayment,
    totalPayment: housingFundResult.totalPayment,
    totalInterest: housingFundResult.totalInterest,
    loanAmount,
    paymentSchedule: housingFundResult.schedule
  };
};