export interface TaxResult {
  taxablePrice: number;
  taxRate: number;
  taxAmount: number;
  totalPrice: number;
  vehicleType?: string;
  isNewEnergy?: boolean;
  priceBreakdown: {
    basePrice: number;
    vat: number;
    additionalCosts: number;
  };
}