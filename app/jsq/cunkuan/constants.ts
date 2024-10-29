export const defaultDepositParams = {
  amount: '100000',
  rate: '2.75',
  term: '12',
  type: 'regular' as const
};

export const depositTypes = {
  regular: {
    name: '定期存款',
    description: '存期固定，利率较高，到期还本付息',
    baseRate: 2.75
  },
  current: {
    name: '活期存款',
    description: '随存随取，利率较低，按日计息',
    baseRate: 0.35
  },
  agreement: {
    name: '协议存款',
    description: '协议约定存期，利率灵活，按月付息',
    baseRate: 2.1
  }
};

export const depositTerms = [
  { value: '3', label: '3个月' },
  { value: '6', label: '6个月' },
  { value: '12', label: '1年' },
  { value: '24', label: '2年' },
  { value: '36', label: '3年' },
  { value: '60', label: '5年' }
];