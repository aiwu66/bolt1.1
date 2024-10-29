import { insuranceRates } from './constants';
import { InsuranceResult, InsuranceDeductions } from './types';

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

export const calculateInsurance = (params: any): InsuranceResult => {
  const baseSalary = parseFloat(params.baseSalary);
  const cityRates = insuranceRates[params.cityType as keyof typeof insuranceRates];
  
  // Calculate insurance base
  const insuranceBase = Math.min(
    Math.max(parseFloat(params.insuranceBase), cityRates.personal.min),
    cityRates.personal.max
  );

  // Calculate housing fund base
  const housingFundBase = Math.min(
    Math.max(parseFloat(params.housingFundBase), cityRates.personal.min),
    cityRates.personal.max
  );

  const housingFundRatio = parseFloat(params.housingFundRatio) / 100;

  // Calculate personal deductions
  const personal: InsuranceDeductions = {
    pension: insuranceBase * (cityRates.personal.pension / 100),
    medical: insuranceBase * (cityRates.personal.medical / 100) + (cityRates.personal.medicalExtra || 0),
    unemployment: insuranceBase * (cityRates.personal.unemployment / 100),
    workInjury: insuranceBase * (cityRates.personal.workInjury / 100),
    maternity: insuranceBase * (cityRates.personal.maternity / 100),
    housingFund: housingFundBase * housingFundRatio,
    total: 0
  };
  personal.total = Object.values(personal).reduce((sum, value) => sum + value, 0) - personal.total;

  // Calculate company contributions
  const company: InsuranceDeductions = {
    pension: insuranceBase * (cityRates.company.pension / 100),
    medical: insuranceBase * (cityRates.company.medical / 100),
    unemployment: insuranceBase * (cityRates.company.unemployment / 100),
    workInjury: insuranceBase * (cityRates.company.workInjury / 100),
    maternity: insuranceBase * (cityRates.company.maternity / 100),
    housingFund: housingFundBase * housingFundRatio,
    total: 0
  };
  company.total = Object.values(company).reduce((sum, value) => sum + value, 0) - company.total;

  const totalDeductions = personal.total + company.total;
  const netSalary = baseSalary - personal.total;

  return {
    baseSalary,
    insuranceBase,
    housingFundBase,
    personal,
    company,
    totalDeductions,
    netSalary,
    cityType: params.cityType,
    monthlyAnalysis: {
      grossSalary: baseSalary,
      personalTotal: personal.total,
      companyTotal: company.total,
      netSalary
    },
    yearlyProjection: {
      grossSalary: baseSalary * 12,
      personalTotal: personal.total * 12,
      companyTotal: company.total * 12,
      netSalary: netSalary * 12
    }
  };
};