"use client";

import { useState } from 'react';
import { CarTaxiFront } from 'lucide-react';
import CalculatorForm, { TaxParams } from './components/CalculatorForm';
import ResultTabs from './components/ResultTabs';
import GuideSection from './components/GuideSection';
import FAQSection from './components/FAQSection';
import { calculateVehicleTax } from './utils';
import { TaxResult } from './types';
import { defaultTaxParams } from './constants';

export default function VehicleTaxCalculatorPage() {
  const [params, setParams] = useState<TaxParams>(defaultTaxParams);
  const [result, setResult] = useState<TaxResult>(() => 
    calculateVehicleTax(
      parseFloat(defaultTaxParams.basePrice),
      defaultTaxParams.includesVAT,
      parseFloat(defaultTaxParams.additionalCosts),
      defaultTaxParams.isNewEnergy
    )
  );

  const handleCalculate = (newParams: TaxParams) => {
    setParams(newParams);
    const newResult = calculateVehicleTax(
      parseFloat(newParams.basePrice),
      newParams.includesVAT,
      parseFloat(newParams.additionalCosts),
      newParams.isNewEnergy
    );
    setResult(newResult);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8 animate-in fade-in slide-in-from-top duration-500">
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative">
              <CarTaxiFront className="h-8 w-8 text-primary relative z-10" />
              <div className="absolute inset-0 bg-primary/20 blur-xl" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">车辆购置税计算器</h1>
              <p className="text-muted-foreground mt-1">快速计算车辆购置税，支持新能源车型</p>
            </div>
          </div>
        </header>

        {/* Guide Section */}
        <GuideSection />

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Left Column - Calculator Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <CalculatorForm 
                initialParams={params}
                onCalculate={handleCalculate} 
              />
            </div>
          </div>
          
          {/* Right Column - Results and Other Sections */}
          <div className="lg:col-span-2 space-y-6">
            <ResultTabs result={result} />
            <FAQSection />
          </div>
        </div>
      </div>
    </div>
  );
}