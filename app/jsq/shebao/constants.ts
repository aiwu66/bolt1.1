export const insuranceRates = {
  'first-tier': {
    personal: {
      min: 7000,
      max: 34188,
      pension: 8,
      medical: 2,
      unemployment: 0.5,
      workInjury: 0,
      maternity: 0,
      housingFund: 12,
      medicalExtra: 3
    },
    company: {
      min: 7000,
      max: 34188,
      pension: 16,
      medical: 9.5,
      unemployment: 0.5,
      workInjury: 0.5,
      maternity: 0.8,
      housingFund: 12
    }
  },
  'new-first-tier': {
    personal: {
      min: 5500,
      max: 28000,
      pension: 8,
      medical: 2,
      unemployment: 0.5,
      workInjury: 0,
      maternity: 0,
      housingFund: 12,
      medicalExtra: 3
    },
    company: {
      min: 5500,
      max: 28000,
      pension: 16,
      medical: 8.5,
      unemployment: 0.5,
      workInjury: 0.4,
      maternity: 0.7,
      housingFund: 12
    }
  },
  'second-tier': {
    personal: {
      min: 4000,
      max: 25000,
      pension: 8,
      medical: 2,
      unemployment: 0.5,
      workInjury: 0,
      maternity: 0,
      housingFund: 12,
      medicalExtra: 3
    },
    company: {
      min: 4000,
      max: 25000,
      pension: 16,
      medical: 7.5,
      unemployment: 0.5,
      workInjury: 0.3,
      maternity: 0.6,
      housingFund: 12
    }
  },
  'other': {
    personal: {
      min: 3000,
      max: 22000,
      pension: 8,
      medical: 2,
      unemployment: 0.5,
      workInjury: 0,
      maternity: 0,
      housingFund: 12,
      medicalExtra: 3
    },
    company: {
      min: 3000,
      max: 22000,
      pension: 16,
      medical: 6.5,
      unemployment: 0.5,
      workInjury: 0.2,
      maternity: 0.5,
      housingFund: 12
    }
  }
};

export const defaultInsuranceParams = {
  baseSalary: '10000',
  cityType: 'first-tier',
  insuranceBase: '10000',
  housingFundBase: '10000',
  housingFundRatio: '12'
};