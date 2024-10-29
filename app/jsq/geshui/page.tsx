"use client";

import { useState } from 'react';
import { Receipt } from 'lucide-react';
import CalculatorForm, { TaxParams } from './components/CalculatorForm';
import ResultTabs from './components/ResultTabs';
import GuideSection from './components/GuideSection';
import TaxRateTable from './components/TaxRateTable';
import DeductionGuide from './components/DeductionGuide';
import FAQSection from './components/FAQSection';
import { calculateTax } from './utils';
import { TaxResult } from './types';
import { defaultTaxParams } from './constants';
import { toast } from "sonner";

export default function IncomeTaxCalculatorPage() {
  const [params, setParams] = useState<TaxParams>(defaultTaxParams);
  const [result, setResult] = useState<TaxResult>(() => 
    calculateTax(defaultTaxParams)
  );

  const handleCalculate = (newParams: TaxParams) => {
    setParams(newParams);
    const newResult = calculateTax(newParams);
    setResult(newResult);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8 animate-in fade-in slide-in-from-top duration-500">
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative">
              <Receipt className="h-8 w-8 text-primary relative z-10" />
              <div className="absolute inset-0 bg-primary/20 blur-xl" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">个人所得税计算器</h1>
              <p className="text-muted-foreground mt-1">专业的个税计算工具，支持多种收入类型和专项附加扣除</p>
            </div>
          </div>
        </header>

        {/* Guide Section */}
        <GuideSection />

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Left Column - Calculator Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <CalculatorForm 
                initialParams={params}
                onCalculate={handleCalculate} 
              />
              <TaxRateTable />
            </div>
          </div>
          
          {/* Right Column - Results and Other Sections */}
          <div className="lg:col-span-2 space-y-6">
            <ResultTabs result={result} />
            <DeductionGuide />
            <FAQSection />
          </div>
        </div>
      </div>
    </div>
  );
}