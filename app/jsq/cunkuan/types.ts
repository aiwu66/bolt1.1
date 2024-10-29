export interface DepositResult {
  principal: number;
  interest: number;
  total: number;
  monthlyInterest: number[];
  effectiveRate: number;
  taxAmount: number;
  afterTaxInterest: number;
  afterTaxTotal: number;
}

export interface DepositScheduleItem {
  month: number;
  principal: number;
  interest: number;
  total: number;
}