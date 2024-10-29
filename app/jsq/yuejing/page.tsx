"use client";

import { useState } from 'react';
import { CalendarDays, Calculator } from 'lucide-react';
import CalculatorForm from './components/CalculatorForm';
import ResultTabs from './components/ResultTabs';
import GuideSection from './components/GuideSection';
import CycleGuide from './components/CycleGuide';
import { calculateMenstrual } from './utils';
import { MenstrualResult } from './types';
import { defaultMenstrualParams } from './constants';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function MenstrualCalculatorPage() {
  const [result, setResult] = useState<MenstrualResult | null>(null);

  const handleCalculate = (values: typeof defaultMenstrualParams) => {
    const date = new Date(values.lastPeriodDate);
    const cycleLength = parseInt(values.cycleLength);
    const periodLength = parseInt(values.periodLength);
    
    const newResult = calculateMenstrual(date, cycleLength, periodLength);
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
              <h1 className="text-2xl sm:text-3xl font-bold">月经计算器</h1>
              <p className="text-muted-foreground mt-1">科学计算月经周期，预测下次月经日期</p>
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
                initialParams={defaultMenstrualParams}
                onCalculate={handleCalculate}
              />
              <CycleGuide />
            </div>
          </div>
          
          {/* Right Column - Results and Other Sections */}
          <div className="lg:col-span-2 space-y-6">
            {result ? (
              <ResultTabs result={result} />
            ) : (
              <Card className="p-8 text-center">
                <div className="flex flex-col items-center space-y-4">
                  <div className="rounded-full p-3 bg-primary/10">
                    <Calculator className="h-8 w-8 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">开始计算月经周期</h3>
                    <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                      请在左侧输入您的末次月经日期和月经周期信息，我们将为您预测下次月经日期和分析周期规律。
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    立即计算
                  </Button>
                </div>
              </Card>
            )}

            {/* Additional Information Cards */}
            <div className="grid gap-6 sm:grid-cols-2">
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">健康建议</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>• 保持规律作息，避免熬夜</li>
                  <li>• 注意经期保暖，避免着凉</li>
                  <li>• 适量运动，保持心情愉悦</li>
                  <li>• 饮食均衡，补充铁质</li>
                  <li>• 经期注意个人卫生</li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">异常情况</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>• 月经周期不规律</li>
                  <li>• 经期过长或过短</li>
                  <li>• 经量异常增多或减少</li>
                  <li>• 经期出现剧烈疼痛</li>
                  <li>• 出现不规则出血</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-4">
                  如出现以上情况请及时就医
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}