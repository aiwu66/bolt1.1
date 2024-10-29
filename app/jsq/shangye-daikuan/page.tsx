"use client";

import { useState } from 'react';
import { Briefcase } from 'lucide-react';
import CalculatorForm, { CommercialLoanParams } from './components/CalculatorForm';
import ResultTabs from './components/ResultTabs';
import GuideSection from './components/GuideSection';
import ExamplesSection from './components/ExamplesSection';
import ComparisonSection from './components/ComparisonSection';
import FAQSection from './components/FAQSection';
import { calculateCommercialLoan } from './utils';
import { CommercialLoanResult } from './types';
import { defaultCommercialLoanParams } from './constants';
import { toast } from "sonner";

export default function CommercialLoanCalculatorPage() {
  const [params, setParams] = useState<CommercialLoanParams>(defaultCommercialLoanParams);
  const [result, setResult] = useState<CommercialLoanResult>(() => 
    calculateCommercialLoan(
      parseFloat(defaultCommercialLoanParams.loanAmount),
      parseFloat(defaultCommercialLoanParams.loanTerm),
      parseFloat(defaultCommercialLoanParams.interestRate),
      defaultCommercialLoanParams.paymentMethod === 'equal-payment'
    )
  );
  const [savedPlans, setSavedPlans] = useState<Array<{params: CommercialLoanParams; result: CommercialLoanResult}>>([]);

  const handleCalculate = (newParams: CommercialLoanParams) => {
    setParams(newParams);
    const loanAmount = parseFloat(newParams.loanAmount);
    const years = parseFloat(newParams.loanTerm);
    const rate = parseFloat(newParams.interestRate);
    
    const newResult = calculateCommercialLoan(
      loanAmount,
      years,
      rate,
      newParams.paymentMethod === 'equal-payment'
    );
    
    setResult(newResult);
  };

  const handleSavePlan = () => {
    if (savedPlans.length >= 3) {
      toast.error("最多只能保存3个对比方案");
      return;
    }
    setSavedPlans(prev => [...prev, { params, result }]);
    toast.success("方案已保存到对比区域");
  };

  const handleRemovePlan = (index: number) => {
    setSavedPlans(prev => prev.filter((_, i) => i !== index));
    toast.success("已移除对比方案");
  };

  const handleImportExample = (exampleParams: CommercialLoanParams) => {
    setParams(exampleParams);
    handleCalculate(exampleParams);
    toast.success("已导入案例参数");
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8 animate-in fade-in slide-in-from-top duration-500">
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative">
              <Briefcase className="h-8 w-8 text-primary relative z-10" />
              <div className="absolute inset-0 bg-primary/20 blur-xl" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">商业贷款计算器</h1>
              <p className="text-muted-foreground mt-1">专业的商业贷款计算工具，助您做出明智的贷款决策</p>
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
            <ResultTabs 
              result={result}
              onSavePlan={handleSavePlan}
              canSavePlan={savedPlans.length < 3}
            />

            {/* Examples Section */}
            <ExamplesSection onImport={handleImportExample} />

            {/* Comparison Section */}
            {savedPlans.length > 0 && (
              <ComparisonSection
                plans={savedPlans}
                onRemovePlan={handleRemovePlan}
                onImport={(params) => {
                  setParams(params);
                  handleCalculate(params);
                  toast.success("已导入对比方案");
                }}
              />
            )}

            {/* FAQ Section */}
            <FAQSection />
          </div>
        </div>
      </div>
    </div>
  );
}