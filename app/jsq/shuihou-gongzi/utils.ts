import { insuranceLimits, taxBrackets } from '../geshui/constants';
import { SalaryResult, InsuranceDetails, SalaryComponent } from './types';

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

export const formatPercent = (value: number) => {
  return new Intl.NumberFormat('zh-CN', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(value / 100);
};

export const calculateAfterTaxSalary = (params: any): SalaryResult => {
  // 计算工资组成部分
  const components: SalaryComponent[] = [];
  let grossSalary = 0;

  // 基本工资构成
  ['baseSalary', 'position', 'performance', 'allowance'].forEach(key => {
    const amount = parseFloat(params[key]) || 0;
    grossSalary += amount;
    components.push({
      name: key === 'baseSalary' ? '基本工资' :
            key === 'position' ? '岗位工资' :
            key === 'performance' ? '绩效工资' : '各项补贴',
      amount,
      type: 'basic',
      taxable: true
    });
  });

  // 额外收入
  ['bonus', 'overtimePay'].forEach(key => {
    const amount = parseFloat(params[key]) || 0;
    if (amount > 0) {
      grossSalary += amount;
      components.push({
        name: key === 'bonus' ? '奖金' : '加班费',
        amount,
        type: 'extra',
        taxable: true
      });
    }
  });

  // 福利补贴
  ['mealAllowance', 'transportAllowance', 'communicationAllowance'].forEach(key => {
    const amount = parseFloat(params[key]) || 0;
    if (amount > 0) {
      grossSalary += amount;
      components.push({
        name: key === 'mealAllowance' ? '餐补' :
              key === 'transportAllowance' ? '交通补贴' : '通讯补贴',
        amount,
        type: 'allowance',
        taxable: false
      });
    }
  });

  // 计算社保公积金
  const cityLimits = insuranceLimits[params.cityType];
  const insuranceBase = Math.min(
    Math.max(parseFloat(params.insuranceBase), cityLimits.min),
    cityLimits.max
  );
  const housingFundRatio = parseFloat(params.housingFundRatio) / 100;

  const insurance: InsuranceDetails = {
    pension: insuranceBase * cityLimits.pension,
    medical: insuranceBase * cityLimits.medical + cityLimits.medicalExtra,
    unemployment: insuranceBase * cityLimits.unemployment,
    housingFund: insuranceBase * housingFundRatio,
    total: 0
  };
  insurance.total = Object.values(insurance).reduce((sum, value) => sum + value, 0) - insurance.total;

  // 添加社保公积金到组件列表
  Object.entries(insurance).forEach(([key, amount]) => {
    if (key !== 'total') {
      components.push({
        name: key === 'pension' ? '养老保险' :
              key === 'medical' ? '医疗保险' :
              key === 'unemployment' ? '失业保险' : '住房公积金',
        amount,
        type: 'deduction',
        taxable: false
      });
    }
  });

  // 计算应纳税所得额
  const taxableIncome = components
    .filter(c => c.taxable)
    .reduce((sum, c) => sum + c.amount, 0) - insurance.total - 5000;

  // 计算个税
  let taxRate = 0;
  let quickDeduction = 0;
  for (let i = taxBrackets.length - 1; i >= 0; i--) {
    if (taxableIncome > taxBrackets[i].income) {
      taxRate = taxBrackets[i].rate;
      quickDeduction = taxBrackets[i].deduction;
      break;
    }
  }

  const tax = Math.max(taxableIncome * taxRate - quickDeduction, 0);
  components.push({
    name: '个人所得税',
    amount: tax,
    type: 'deduction',
    taxable: false
  });

  // 计算税后工资
  const netSalary = grossSalary - insurance.total - tax;

  // 计算工资分析
  const basicTotal = components.filter(c => c.type === 'basic').reduce((sum, c) => sum + c.amount, 0);
  const analysis = {
    basicRatio: (basicTotal / grossSalary) * 100,
    performanceRatio: ((parseFloat(params.performance) || 0) / grossSalary) * 100,
    allowanceRatio: (components.filter(c => c.type === 'allowance').reduce((sum, c) => sum + c.amount, 0) / grossSalary) * 100,
    taxRatio: (tax / grossSalary) * 100,
    insuranceRatio: (insurance.total / grossSalary) * 100,
    takeHomeRatio: (netSalary / grossSalary) * 100
  };

  // 年度预测
  const yearlyProjection = {
    grossIncome: grossSalary * 12,
    totalDeductions: (insurance.total + tax) * 12,
    totalTax: tax * 12,
    netIncome: netSalary * 12
  };

  return {
    breakdown: {
      components,
      grossSalary,
      insurance,
      tax,
      netSalary,
      taxableIncome,
      taxRate,
      quickDeduction
    },
    analysis,
    monthlyDetails: {
      grossSalary,
      insurance: insurance.total,
      tax,
      netSalary
    },
    yearlyProjection
  };
};