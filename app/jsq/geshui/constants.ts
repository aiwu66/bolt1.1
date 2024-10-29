import { TaxParams } from './components/CalculatorForm';

export const defaultTaxParams: TaxParams = {
  monthlySalary: '20000',
  bonusAmount: '',
  calculationType: 'monthly',
  cityType: 'first-tier',
  insuranceBase: '10000',
  // 专项附加扣除
  deductions: {
    mortgage: false,
    rent: false,
    education: false,
    continuing_education: false,
    medical: false,
    elderly_care: false,
    children_education: false
  },
  // 具体扣除金额
  deductionAmounts: {
    mortgage: '1000',
    rent: '1500',
    education: '400',
    continuing_education: '400',
    medical: '0',
    elderly_care: '2000',
    children_education: '1000'
  }
};

// 2024年最新社保公积金基数上下限
export const insuranceLimits = {
  'first-tier': { // 一线城市（北上广深）
    min: 7000,
    max: 34188,
    pension: 0.08,
    medical: 0.02,
    unemployment: 0.005,
    housingFund: 0.12,
    cities: ['北京', '上海', '广州', '深圳'],
    medicalExtra: 3, // 医保个人账户附加费
  },
  'new-first-tier': { // 新一线城市
    min: 5500,
    max: 28000,
    pension: 0.08,
    medical: 0.02,
    unemployment: 0.005,
    housingFund: 0.12,
    cities: ['成都', '杭州', '重庆', '西安', '苏州', '武汉', '南京', '天津', '郑州', '长沙', '东莞', '宁波', '佛山', '合肥', '青岛'],
    medicalExtra: 3,
  },
  'second-tier': { // 二线城市
    min: 4000,
    max: 25000,
    pension: 0.08,
    medical: 0.02,
    unemployment: 0.005,
    housingFund: 0.12,
    cities: ['昆明', '福州', '哈尔滨', '济南', '大连', '贵阳', '南宁', '南昌', '石家庄', '太原', '沈阳', '长春', '兰州', '厦门', '无锡'],
    medicalExtra: 3,
  },
  'other': { // 其他城市
    min: 3000,
    max: 22000,
    pension: 0.08,
    medical: 0.02,
    unemployment: 0.005,
    housingFund: 0.12,
    medicalExtra: 3,
  }
};

// 个税税率表
export const taxBrackets = [
  { income: 0, rate: 0.03, deduction: 0 },
  { income: 3000, rate: 0.1, deduction: 210 },
  { income: 12000, rate: 0.2, deduction: 1410 },
  { income: 25000, rate: 0.25, deduction: 2660 },
  { income: 35000, rate: 0.3, deduction: 4410 },
  { income: 55000, rate: 0.35, deduction: 7160 },
  { income: 80000, rate: 0.45, deduction: 15160 }
];

// 专项附加扣除说明
export const deductionExplanations = {
  mortgage: {
    title: '住房贷款利息',
    amount: 1000,
    description: '首套住房贷款利息支出，每月1000元'
  },
  rent: {
    title: '住房租金',
    amount: 1500,
    description: '一线城市每月1500元，其他城市金额不同'
  },
  education: {
    title: '子女教育',
    amount: 1000,
    description: '每个子女每月1000元'
  },
  continuing_education: {
    title: '继续教育',
    amount: 400,
    description: '学历继续教育每月400元'
  },
  medical: {
    title: '大病医疗',
    amount: 0,
    description: '年度医疗支出超过15000元的部分，据实扣除'
  },
  elderly_care: {
    title: '赡养老人',
    amount: 2000,
    description: '独生子女每月2000元'
  },
  children_education: {
    title: '3岁以下婴幼儿照护',
    amount: 1000,
    description: '每个3岁以下婴幼儿每月1000元'
  }
};