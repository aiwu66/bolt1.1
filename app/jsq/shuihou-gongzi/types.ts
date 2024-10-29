export interface InsuranceDetails {
  pension: number;
  medical: number;
  unemployment: number;
  housingFund: number;
  total: number;
}

export interface SalaryComponent {
  name: string;
  amount: number;
  type: 'basic' | 'extra' | 'allowance' | 'deduction';
  taxable: boolean;
}

export interface SalaryBreakdown {
  components: SalaryComponent[];
  grossSalary: number;
  insurance: InsuranceDetails;
  tax: number;
  netSalary: number;
  taxableIncome: number;
  taxRate: number;
  quickDeduction: number;
}

export interface SalaryAnalysis {
  basicRatio: number;
  performanceRatio: number;
  allowanceRatio: number;
  taxRatio: number;
  insuranceRatio: number;
  takeHomeRatio: number;
}

export interface SalaryResult {
  breakdown: SalaryBreakdown;
  analysis: SalaryAnalysis;
  monthlyDetails: {
    [key: string]: number;
  };
  yearlyProjection: {
    grossIncome: number;
    totalDeductions: number;
    totalTax: number;
    netIncome: number;
  };
}