export interface DeductionItem {
  type: string;
  amount: number;
  description?: string;
}

export interface InsuranceDetails {
  pension: number;
  medical: number;
  unemployment: number;
  housingFund: number;
  total: number;
}

export interface MonthlyTaxDetail {
  month: number;
  salary: number;
  taxableIncome: number;
  tax: number;
  afterTax: number;
  socialInsurance: InsuranceDetails;
  deductions: DeductionItem[];
  taxRate: number;
  quickDeduction: number;
  grossIncome?: number;
  netIncome?: number;
  taxAmount?: number;
  specialDeductions?: {
    total: number;
    [key: string]: number;
  };
}

export interface AnnualTaxDetail {
  totalIncome: number;
  totalDeductions: number;
  taxableIncome: number;
  calculatedTax: number;
  paidTax: number;
  taxDifference: number;
  monthlyDetails: MonthlyTaxDetail[];
}

export interface TaxResult {
  type: "monthly" | "annual";
  monthlyDetails?: MonthlyTaxDetail;
  annualDetails?: AnnualTaxDetail;
  effectiveTaxRate: number;
  cityType: string;
  insuranceBase: number;
  totalDeductions: number;
  deductionItems: DeductionItem[];
  insuranceDetails: InsuranceDetails;
  taxBreakdown?: {
    [key: string]: number;
  };
}