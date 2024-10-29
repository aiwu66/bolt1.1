export interface InsuranceBase {
  min: number;
  max: number;
  pension: number;
  medical: number;
  unemployment: number;
  workInjury: number;
  maternity: number;
  housingFund: number;
  medicalExtra?: number;
}

export interface InsuranceRates {
  personal: InsuranceBase;
  company: InsuranceBase;
}

export interface InsuranceDeductions {
  pension: number;
  medical: number;
  unemployment: number;
  workInjury: number;
  maternity: number;
  housingFund: number;
  total: number;
}

export interface InsuranceResult {
  baseSalary: number;
  insuranceBase: number;
  housingFundBase: number;
  personal: InsuranceDeductions;
  company: InsuranceDeductions;
  totalDeductions: number;
  netSalary: number;
  cityType: string;
  monthlyAnalysis: {
    grossSalary: number;
    personalTotal: number;
    companyTotal: number;
    netSalary: number;
  };
  yearlyProjection: {
    grossSalary: number;
    personalTotal: number;
    companyTotal: number;
    netSalary: number;
  };
}