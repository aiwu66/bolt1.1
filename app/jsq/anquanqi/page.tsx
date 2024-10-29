"use client";

import { useState } from 'react';
import { CalendarRange, Calculator } from 'lucide-react';
import CalculatorForm from './components/CalculatorForm';
import ResultTabs from './components/ResultTabs';
import GuideSection from './components/GuideSection';
import RiskGuide from './components/RiskGuide';
import { calculateSafePeriod } from './utils';
import { SafePeriodResult } from './types';
import { defaultSafePeriodParams } from './constants';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function SafePeriodCalculatorPage() {
  const [result, setResult] = useState<SafePeriodResult | null>(null);

  const handleCalculate = (values: typeof defaultSafePeriodParams) => {
    const date = new Date(values.lastPeriodDate);
    const cycleLength = parseInt(values.cycleLength);
    const periodLength = parseInt(values.periodLength);
    
    const newResult = calculateSafePeriod(date, cycleLength, periodLength);
    setResult(newResult);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8 animate-in fade-in slide-in-from-top duration-500">
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative">
              <CalendarRange className="h-8 w-8 text-primary relative z-10" />
              <div className="absolute inset-0 bg-primary/20 blur-xl" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">安全期计算器</h1>
              <p className="text-muted-foreground mt-1">计算月经周期安全期，但请注意安全期避孕法并不可靠</p>
            </div>
          </div>
        </header>

        <Alert variant="destructive" className="mb-8">
          <AlertDescription>
            安全期避孕法不可靠！此计算器仅供参考，不建议作为避孕的唯一方法。建议在医生指导下选择科学的避孕方式。
          </AlertDescription>
        </Alert>

        {/* Guide Section */}
        <GuideSection />

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Left Column - Calculator Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <CalculatorForm 
                initialParams={defaultSafePeriodParams}
                onCalculate={handleCalculate}
              />
              <RiskGuide />
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
                    <h3 className="text-lg font-medium">开始计算安全期</h3>
                    <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                      请在左侧输入您的末次月经日期和月经周期信息，我们将为您计算月经周期中的各个时期。
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
                <h3 className="text-lg font-medium mb-4">科学避孕方法</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>• 短效口服避孕药</li>
                  <li>• 避孕套</li>
                  <li>• 宫内节育器</li>
                  <li>• 皮下埋植剂</li>
                  <li>• 紧急避孕药（非常规使用）</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-4">
                  建议在医生指导下选择合适的避孕方式
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">安全期避孕的局限性</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>• 月经不规则时完全不可靠</li>
                  <li>• 排卵时间可能发生变化</li>
                  <li>• 精子存活时间较长</li>
                  <li>• 容易受外界因素影响</li>
                  <li>• 计算结果仅供参考</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}