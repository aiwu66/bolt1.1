export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

export const formatPercent = (value: number) => {
  return new Intl.NumberFormat('zh-CN', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(value / 100);
};

export const calculateVehicleTax = (
  basePrice: number,
  includesVAT: boolean,
  additionalCosts: number,
  isNewEnergy: boolean
): TaxResult => {
  // 增值税税率
  const VAT_RATE = 0.13;
  
  // 计算不含税价格和增值税
  let priceWithoutVAT = basePrice;
  let vat = 0;
  
  if (includesVAT) {
    // 如果价格包含增值税，需要倒推不含税价格
    priceWithoutVAT = basePrice / (1 + VAT_RATE);
    vat = basePrice - priceWithoutVAT;
  } else {
    // 如果价格不包含增值税，直接计算增值税
    vat = basePrice * VAT_RATE;
  }

  // 计算应税价格（不含税价格 + 其他费用）
  const taxablePrice = priceWithoutVAT + additionalCosts;

  // 确定购置税税率（新能源车免税）
  const taxRate = isNewEnergy ? 0 : 10;

  // 计算购置税
  const taxAmount = isNewEnergy ? 0 : (taxablePrice * (taxRate / 100));

  // 计算总价（含税价格 + 其他费用 + 购置税）
  const totalPrice = (includesVAT ? basePrice : basePrice + vat) + additionalCosts + taxAmount;

  return {
    taxablePrice,
    taxRate,
    taxAmount,
    totalPrice,
    priceBreakdown: {
      basePrice: priceWithoutVAT,
      vat,
      additionalCosts
    }
  };
};