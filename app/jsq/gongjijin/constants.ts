import { HousingFundLoanParams } from './components/CalculatorForm';

export const defaultHousingFundLoanParams: HousingFundLoanParams = {
  loanType: 'pure',
  totalPrice: '1000000',
  downPaymentRatio: '30',
  loanAmount: '700000',
  loanTerm: '30',
  interestRate: '3.1',
  paymentMethod: 'equal-payment',
  monthlyIncome: '',
  monthlyDeposit: '',
  commercialLoanAmount: '',
  commercialLoanRate: '',
};

export const examples = [
  {
    title: '首套房公积金贷款',
    params: {
      loanType: 'pure',
      totalPrice: '1000000',
      downPaymentRatio: '30',
      loanAmount: '700000',
      loanTerm: '30',
      interestRate: '3.1',
      paymentMethod: 'equal-payment',
      monthlyIncome: '20000',
      monthlyDeposit: '2000',
    },
    loan: '70万',
    term: '30年',
    rate: '3.1%',
    monthly: '约2,995元'
  },
  {
    title: '组合贷款方案',
    params: {
      loanType: 'combined',
      totalPrice: '2000000',
      downPaymentRatio: '30',
      loanAmount: '600000',
      commercialLoanAmount: '800000',
      loanTerm: '30',
      interestRate: '3.1',
      commercialLoanRate: '4.2',
      paymentMethod: 'equal-payment',
      monthlyIncome: '35000',
      monthlyDeposit: '3000',
    },
    loan: '140万(公积金60万+商贷80万)',
    term: '30年',
    rate: '公积金3.1%+商贷4.2%',
    monthly: '约6,827元'
  },
  {
    title: '短期公积金贷款',
    params: {
      loanType: 'pure',
      totalPrice: '800000',
      downPaymentRatio: '40',
      loanAmount: '480000',
      loanTerm: '10',
      interestRate: '3.1',
      paymentMethod: 'equal-payment',
      monthlyIncome: '25000',
      monthlyDeposit: '2500',
    },
    loan: '48万',
    term: '10年',
    rate: '3.1%',
    monthly: '约4,672元'
  }
];