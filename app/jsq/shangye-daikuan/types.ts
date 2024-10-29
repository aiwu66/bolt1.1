export interface CommercialLoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  loanAmount: number;
  paymentSchedule: CommercialPaymentScheduleItem[];
}

export interface CommercialPaymentScheduleItem {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}