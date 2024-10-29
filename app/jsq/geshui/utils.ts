import { insuranceLimits, taxBrackets, deductionExplanations } from './constants';
import { TaxResult, InsuranceDetails, DeductionItem } from './types';

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
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value / 100);
};

export const calculateTax = (params: any): TaxResult => {
  const cityLimits = insuranceLimits[params.cityType];
  const insuranceBase = parseFloat(params.insuranceBase);
  const actualBase = Math.min(Math.max(insuranceBase, cityLimits.min), cityLimits.max);

  // 计算社保公积金
  const insuranceDetails: InsuranceDetails = {
    pension: actualBase * cityLimits.pension,
    medical: actualBase * cityLimits.medical + cityLimits.medicalExtra,
    unemployment: actualBase * cityLimits.unemployment,
    housingFund: actualBase * cityLimits.housingFund,
    total: 0
  };
  insuranceDetails.total = Object.values(insuranceDetails).reduce((sum, value) => sum + value, 0) - insuranceDetails.total;

  // 计算专项附加扣除
  const deductionItems: DeductionItem[] = [];
  let totalDeductions = 0;

  Object.entries(params.deductions).forEach(([key, value]) => {
    if (value && key in deductionExplanations) {
      const deduction = deductionExplanations[key as keyof typeof deductionExplanations];
      const amount = parseFloat(params.deductionAmounts[key as keyof typeof params.deductionAmounts]);
      if (!isNaN(amount)) {
        deductionItems.push({
          type: deduction.title,
          amount: amount,
          description: deduction.description
        });
        totalDeductions += amount;
      }
    }
  });

  if (params.calculationType === "monthly") {
    const monthlySalary = parseFloat(params.monthlySalary);
    const taxableIncome = Math.max(monthlySalary - insuranceDetails.total - 5000 - totalDeductions, 0);
    
    // 计算适用税率和速算扣除数
    let taxRate = 0;
    let quickDeduction = 0;
    
    for (let i = taxBrackets.length - 1; i >= 0; i--) {
      if (taxableIncome > taxBrackets[i].income) {
        taxRate = taxBrackets[i].rate;
        quickDeduction = taxBrackets[i].deduction;
        break;
      }
    }

    const tax = taxableIncome * taxRate - quickDeduction;
    const afterTax = monthlySalary - insuranceDetails.total - tax;
    const effectiveTaxRate = (tax / monthlySalary) * 100;

    return {
      type: "monthly",
      monthlyDetails: {
        month: 1,
        salary: monthlySalary,
        taxableIncome,
        tax,
        afterTax,
        socialInsurance: insuranceDetails,
        deductions: deductionItems,
        taxRate,
        quickDeduction,
        grossIncome: monthlySalary,
        netIncome: afterTax,
        taxAmount: tax,
        specialDeductions: {
          total: totalDeductions
        }
      },
      effectiveTaxRate,
      cityType: params.cityType,
      insuranceBase,
      totalDeductions,
      deductionItems,
      insuranceDetails,
      taxBreakdown: {
        salary: monthlySalary,
        insurance: insuranceDetails.total,
        deductions: totalDeductions,
        tax: tax
      }
    };
  } else {
    const annualIncome = parseFloat(params.annualIncome);
    const paidTax = parseFloat(params.paidTax) || 0;
    const otherIncome = parseFloat(params.otherIncome) || 0;
    
    const yearlyInsurance = {
      pension: insuranceDetails.pension * 12,
      medical: insuranceDetails.medical * 12,
      unemployment: insuranceDetails.unemployment * 12,
      housingFund: insuranceDetails.housingFund * 12,
      total: insuranceDetails.total * 12
    };

    const yearlyDeductions = totalDeductions * 12;
    const taxableIncome = Math.max(annualIncome + otherIncome - yearlyInsurance.total - 60000 - yearlyDeductions, 0);
    
    let taxRate = 0;
    let quickDeduction = 0;
    
    for (let i = taxBrackets.length - 1; i >= 0; i--) {
      if (taxableIncome > taxBrackets[i].income * 12) {
        taxRate = taxBrackets[i].rate;
        quickDeduction = taxBrackets[i].deduction * 12;
        break;
      }
    }

    const calculatedTax = taxableIncome * taxRate - quickDeduction;
    const taxDifference = calculatedTax - paidTax;
    const effectiveTaxRate = (calculatedTax / annualIncome) * 100;

    // 生成月度明细
    const monthlyDetails = Array(12).fill(null).map((_, index) => ({
      month: index + 1,
      salary: annualIncome / 12,
      taxableIncome: taxableIncome / 12,
      tax: calculatedTax / 12,
      afterTax: (annualIncome - calculatedTax - yearlyInsurance.total) / 12,
      socialInsurance: insuranceDetails,
      deductions: deductionItems,
      taxRate,
      quickDeduction: quickDeduction / 12,
      grossIncome: annualIncome / 12,
      netIncome: (annualIncome - calculatedTax - yearlyInsurance.total) / 12,
      taxAmount: calculatedTax / 12,
      specialDeductions: {
        total: yearlyDeductions / 12
      }
    }));

    return {
      type: "annual",
      annualDetails: {
        totalIncome: annualIncome + otherIncome,
        totalDeductions: yearlyDeductions + yearlyInsurance.total + 60000,
        taxableIncome,
        calculatedTax,
        paidTax,
        taxDifference,
        monthlyDetails
      },
      effectiveTaxRate,
      cityType: params.cityType,
      insuranceBase,
      totalDeductions: yearlyDeductions,
      deductionItems,
      insuranceDetails: yearlyInsurance,
      taxBreakdown: {
        income: annualIncome + otherIncome,
        insurance: yearlyInsurance.total,
        deductions: yearlyDeductions,
        tax: calculatedTax,
        difference: taxDifference
      }
    };
  }
};