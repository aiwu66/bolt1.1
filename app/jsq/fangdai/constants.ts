import { LoanParams } from './components/CalculatorForm';

export const defaultLoanParams: LoanParams = {
  loanAmount: '1000000',
  loanTerm: '30',
  interestRate: '4.2',
  paymentMethod: 'equal-payment',
  downPaymentRatio: '30',
  loanType: 'commercial',
};

export const examples = [
  {
    title: '首套房商贷案例',
    params: {
      loanAmount: '3000000',
      downPaymentRatio: '30',
      loanTerm: '30',
      interestRate: '4.2',
      paymentMethod: 'equal-payment',
      loanType: 'commercial',
    },
    price: '300万',
    down: '30%（90万）',
    loan: '210万',
    term: '30年',
    rate: '4.2%',
    monthly: '约10289元'
  },
  {
    title: '公积金贷款案例',
    params: {
      loanAmount: '2000000',
      downPaymentRatio: '30',
      loanTerm: '30',
      interestRate: '3.1',
      paymentMethod: 'equal-payment',
      loanType: 'housing-fund',
    },
    price: '200万',
    down: '30%（60万）',
    loan: '140万',
    term: '30年',
    rate: '3.1%',
    monthly: '约5972元'
  },
  {
    title: '组合贷款案例',
    params: {
      loanAmount: '5000000',
      downPaymentRatio: '40',
      loanTerm: '25',
      interestRate: '3.65',
      paymentMethod: 'equal-payment',
      loanType: 'combined',
    },
    price: '500万',
    down: '40%（200万）',
    loan: '300万',
    term: '25年',
    rate: '3.65%',
    monthly: '约15247元'
  }
];