"use client";

import { useState } from 'react';
import { CalendarDays } from 'lucide-react';
import CalculatorForm from './components/CalculatorForm';
import ResultTabs from './components/ResultTabs';
import GuideSection from './components/GuideSection';
import CheckupSchedule from './components/CheckupSchedule';
import MilestoneGuide from './components/MilestoneGuide';
import { calculateDueDate } from './utils';
import { DueDateResult } from './types';
import { defaultDueDateParams } from './constants';

export default function DueDateCalculatorPage() {
  const [result, setResult] = useState<DueDateResult | null>(null);

  const handleCalculate = (values: typeof defaultDueDateParams) => {
    const date = new Date(values.date);
    const newResult = calculateDueDate(
      date,
      values.method,
      values.ultrasoundWeeks ? parseInt(values.ultrasoundWeeks) : undefined
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
              <CalendarDays className="h-8 w-8 text-primary relative z-10" />
              <div className="absolute inset-0 bg-primary/20 blur-xl" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">预产期计算器</h1>
              <p className="text-muted-foreground mt-1">科学计算预产期，合理安排产检时间</p>
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
                initialParams={defaultDueDateParams}
                onCalculate={handleCalculate}
              />
              <CheckupSchedule />
            </div>
          </div>
          
          {/* Right Column - Results and Other Sections */}
          <div className="lg:col-span-2 space-y-6">
            {result && <ResultTabs result={result} />}
            <MilestoneGuide />
          </div>
        </div>
      </div>
    </div>
  );
}