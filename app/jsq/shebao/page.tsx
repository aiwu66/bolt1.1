"use client";

import { useState } from 'react';
import { Shield } from 'lucide-react';
import CalculatorForm, { InsuranceParams } from './components/CalculatorForm';
import ResultTabs from './components/ResultTabs';
import GuideSection from './components/GuideSection';
import RatesTable from './components/RatesTable';
import FAQSection from './components/FAQSection';
import { calculateInsurance } from './utils';
import { InsuranceResult } from './types';
import { defaultInsuranceParams } from './constants';
import { toast } from "sonner";

export default function SocialInsuranceCalculatorPage() {
  const [params, setParams] = useState<InsuranceParams>(defaultInsuranceParams);
  const [result, setResult] = useState<InsuranceResult>(() => 
    calculateInsurance(defaultInsuranceParams)
  );

  const handleCalculate = (newParams: InsuranceParams) => {
    setParams(newParams);
    const newResult = calculateInsurance(newParams);
    setResult(newResult);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8 animate-in fade-in slide-in-from-top duration-500">
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative">
              <Shield className="h-8 w-8 text-primary relative z-10" />
              <div className="absolute inset-0 bg-primary/20 blur-xl" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">社保公积金计算器</h1>
              <p className="text-muted-foreground mt-1">快速计算五险一金缴纳金额，支持全国主要城市</p>
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
              <RatesTable />
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