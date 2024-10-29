"use client";

import { useState } from 'react';
import { Baby } from 'lucide-react';
import CalculatorForm from './components/CalculatorForm';
import ResultTabs from './components/ResultTabs';
import GuideSection from './components/GuideSection';
import CategoryTable from './components/CategoryTable';
import MeasurementGuide from './components/MeasurementGuide';
import { calculateFetalWeight } from './utils';
import { FetalWeightResult } from './types';
import { defaultFetalParams } from './constants';

export default function FetalWeightCalculatorPage() {
  const [result, setResult] = useState<FetalWeightResult | null>(null);

  const handleCalculate = (values: typeof defaultFetalParams) => {
    const measurements = {
      bpd: values.bpd ? parseFloat(values.bpd) : undefined,
      hc: values.hc ? parseFloat(values.hc) : undefined,
      ac: values.ac ? parseFloat(values.ac) : undefined,
      fl: values.fl ? parseFloat(values.fl) : undefined,
    };

    const newResult = calculateFetalWeight(
      measurements,
      parseFloat(values.gestationalAge)
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
              <Baby className="h-8 w-8 text-primary relative z-10" />
              <div className="absolute inset-0 bg-primary/20 blur-xl" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">胎儿体重计算器</h1>
              <p className="text-muted-foreground mt-1">基于B超数据评估胎儿发育情况</p>
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
                initialParams={defaultFetalParams}
                onCalculate={handleCalculate}
              />
              <CategoryTable />
            </div>
          </div>
          
          {/* Right Column - Results and Other Sections */}
          <div className="lg:col-span-2 space-y-6">
            {result && <ResultTabs result={result} />}
            <MeasurementGuide />
          </div>
        </div>
      </div>
    </div>
  );
}