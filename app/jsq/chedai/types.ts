export interface CarLoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  loanAmount: number;
  downPayment: number;
  carPrice: number;
  paymentSchedule: CarPaymentScheduleItem[];
}

export interface CarPaymentScheduleItem {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}