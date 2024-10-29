import { SalaryParams } from './components/CalculatorForm';

export const defaultSalaryParams: SalaryParams = {
  baseSalary: '6000',
  position: '3000',
  performance: '2000',
  allowance: '1000',
  cityType: 'first-tier',
  insuranceBase: '10000',
  housingFundRatio: '12',
  bonus: '',
  overtimePay: '',
  mealAllowance: '',
  transportAllowance: '',
  communicationAllowance: ''
};

export const salaryComponentTypes = {
  basic: {
    name: '基本工资构成',
    description: '工资中的固定部分',
    items: ['基本工资', '岗位工资', '绩效工资', '各项补贴']
  },
  extra: {
    name: '额外收入',
    description: '非固定的额外收入',
    items: ['奖金', '加班费']
  },
  allowance: {
    name: '福利补贴',
    description: '公司提供的各项补贴',
    items: ['餐补', '交通补贴', '通讯补贴']
  },
  deduction: {
    name: '扣除项目',
    description: '各项强制性扣除',
    items: ['养老保险', '医疗保险', '失业保险', '住房公积金', '个人所得税']
  }
};