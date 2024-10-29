export const defaultTaxParams = {
  basePrice: '200000',
  includesVAT: true,
  additionalCosts: '0',
  isNewEnergy: false,
  vehicleType: 'sedan'
};

export const vehicleTypes = [
  { 
    label: '轿车', 
    price: '150,000-300,000元',
    description: '家用轿车，适合城市代步'
  },
  { 
    label: 'SUV', 
    price: '200,000-500,000元',
    description: '运动型多用途车，空间更大'
  },
  { 
    label: 'MPV', 
    price: '150,000-400,000元',
    description: '多功能商务车，适合家庭使用'
  },
  { 
    label: '新能源车', 
    price: '200,000-400,000元',
    description: '纯电动或插电混动车型',
    isNewEnergy: true 
  },
  { 
    label: '豪华车', 
    price: '500,000元以上',
    description: '高端品牌豪华车型'
  },
  { 
    label: '跑车', 
    price: '800,000元以上',
    description: '性能型运动跑车'
  }
];

export const additionalCostTypes = [
  { 
    label: '上牌费', 
    amount: 500,
    description: '包含号牌工本费、拓号费等'
  },
  { 
    label: '车船税', 
    amount: 300,
    description: '按排量收取的年度税费'
  },
  { 
    label: '交强险', 
    amount: 950,
    description: '机动车交通事故责任强制保险'
  },
  { 
    label: '车辆保险', 
    amount: 3000,
    description: '包含第三者责任险、车损险等'
  },
  { 
    label: '临时牌照', 
    amount: 100,
    description: '新车上路临时号牌费用'
  },
  { 
    label: '环保检测', 
    amount: 200,
    description: '车辆环保达标检测费用'
  }
];