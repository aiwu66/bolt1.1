export interface PaymentScheduleItem {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
  housingFund?: {
    payment: number;
    principal: number;
    interest: number;
    remainingBalance: number;
  };
  commercial?: {
    payment: number;
    principal: number;
    interest: number;
    remainingBalance: number;
  };
}

export interface LoanSummary {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  loanAmount: number;
}

export interface HousingFundLoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  loanAmount: number;
  paymentSchedule: PaymentScheduleItem[];
  housingFundSummary?: LoanSummary;
  commercialSummary?: LoanSummary;
}