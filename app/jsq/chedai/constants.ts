import { CarLoanParams } from './components/CalculatorForm';

export const defaultCarLoanParams: CarLoanParams = {
  carPrice: '200000',
  loanTerm: '3',
  interestRate: '5.6',
  paymentMethod: 'equal-payment',
  downPaymentRatio: '30',
  loanType: 'bank',
};

export const examples = [
  {
    title: '经济型轿车贷款',
    params: {
      carPrice: '150000',
      downPaymentRatio: '30',
      loanTerm: '3',
      interestRate: '5.6',
      paymentMethod: 'equal-payment',
      loanType: 'bank',
    },
    price: '15万',
    down: '30%（4.5万）',
    loan: '10.5万',
    term: '3年',
    rate: '5.6%',
    monthly: '约3,189元'
  },
  {
    title: '中高端SUV贷款',
    params: {
      carPrice: '300000',
      downPaymentRatio: '40',
      loanTerm: '5',
      interestRate: '5.8',
      paymentMethod: 'equal-payment',
      loanType: 'bank',
    },
    price: '30万',
    down: '40%（12万）',
    loan: '18万',
    term: '5年',
    rate: '5.8%',
    monthly: '约3,472元'
  },
  {
    title: '豪华品牌贷款',
    params: {
      carPrice: '500000',
      downPaymentRatio: '50',
      loanTerm: '3',
      interestRate: '4.8',
      paymentMethod: 'equal-payment',
      loanType: 'dealer',
    },
    price: '50万',
    down: '50%（25万）',
    loan: '25万',
    term: '3年',
    rate: '4.8%',
    monthly: '约7,489元'
  }
];