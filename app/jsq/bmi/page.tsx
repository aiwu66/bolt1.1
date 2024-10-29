"use client";

import { useState } from 'react';
import { Weight } from 'lucide-react';
import CalculatorForm from './components/CalculatorForm';
import ResultTabs from './components/ResultTabs';
import GuideSection from './components/GuideSection';
import CategoryTable from './components/CategoryTable';
import HealthTips from './components/HealthTips';
import { calculateBMI } from './utils';
import { BMIResult } from './types';
import { defaultBMIParams } from './constants';

export default function BMICalculatorPage() {
  const [result, setResult] = useState<BMIResult>(() => 
    calculateBMI(
      parseFloat(defaultBMIParams.weight),
      parseFloat(defaultBMIParams.height)
    )
  );

  const handleCalculate = (height: string, weight: string) => {
    const newResult = calculateBMI(
      parseFloat(weight),
      parseFloat(height)
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
              <Weight className="h-8 w-8 text-primary relative z-10" />
              <div className="absolute inset-0 bg-primary/20 blur-xl" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">BMI计算器</h1>
              <p className="text-muted-foreground mt-1">快速计算身体质量指数，评估健康状况</p>
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
                initialHeight={defaultBMIParams.height}
                initialWeight={defaultBMIParams.weight}
                onCalculate={handleCalculate}
              />
              <CategoryTable />
            </div>
          </div>
          
          {/* Right Column - Results and Other Sections */}
          <div className="lg:col-span-2 space-y-6">
            <ResultTabs result={result} />
            <HealthTips />
          </div>
        </div>
      </div>
    </div>
  );
}