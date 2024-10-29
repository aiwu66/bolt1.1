"use client";

import { useState } from 'react';
import { CalendarCheck, Calculator } from 'lucide-react';
import CalculatorForm from './components/CalculatorForm';
import ResultTabs from './components/ResultTabs';
import GuideSection from './components/GuideSection';
import CycleGuide from './components/CycleGuide';
import { calculateOvulation } from './utils';
import { OvulationResult } from './types';
import { defaultOvulationParams } from './constants';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function OvulationCalculatorPage() {
  const [result, setResult] = useState<OvulationResult | null>(null);

  const handleCalculate = (values: typeof defaultOvulationParams) => {
    const date = new Date(values.lastPeriodDate);
    const cycleLength = parseInt(values.cycleLength);
    const periodLength = parseInt(values.periodLength);
    
    const newResult = calculateOvulation(date, cycleLength, periodLength);
    setResult(newResult);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8 animate-in fade-in slide-in-from-top duration-500">
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative">
              <CalendarCheck className="h-8 w-8 text-primary relative z-10" />
              <div className="absolute inset-0 bg-primary/20 blur-xl" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">排卵期计算器</h1>
              <p className="text-muted-foreground mt-1">科学计算排卵期，合理安排备孕时间</p>
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
                initialParams={defaultOvulationParams}
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
                    <h3 className="text-lg font-medium">开始计算排卵期</h3>
                    <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                      请在左侧输入您的末次月经日期和月经周期信息，我们将为您计算排卵期和易孕期时间。
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
                <h3 className="text-lg font-medium mb-4">备孕小贴士</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>• 规律作息，保持良好心态</li>
                  <li>• 均衡饮食，适量运动</li>
                  <li>• 戒烟限酒，远离有害物质</li>
                  <li>• 提前3个月补充叶酸</li>
                  <li>• 定期进行妇科检查</li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">注意事项</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>• 计算结果仅供参考</li>
                  <li>• 每个人的排卵时间可能不同</li>
                  <li>• 压力、疾病等因素会影响排卵</li>
                  <li>• 建议结合体温、试纸等方法</li>
                  <li>• 如有异常及时就医</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}