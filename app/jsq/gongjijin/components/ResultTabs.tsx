"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save, Calculator, Table, LineChart } from 'lucide-react';
import ResultSummary from './ResultSummary';
import PaymentSchedule from './PaymentSchedule';
import PaymentChart from './PaymentChart';
import { HousingFundLoanResult } from '../types';

interface ResultTabsProps {
  result: HousingFundLoanResult;
  onSavePlan: () => void;
  canSavePlan: boolean;
}

export default function ResultTabs({ result, onSavePlan, canSavePlan }: ResultTabsProps) {
  return (
    <Card className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-lg font-semibold">计算结果</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={onSavePlan}
          disabled={!canSavePlan}
          className="w-full sm:w-auto"
        >
          <Save className="h-4 w-4 mr-2" />
          {canSavePlan ? '保存到方案对比' : '对比方案已满'}
        </Button>
      </div>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="summary" className="text-sm sm:text-base">
            <Calculator className="h-4 w-4 mr-2" />
            计算结果
          </TabsTrigger>
          <TabsTrigger value="schedule" className="text-sm sm:text-base">
            <Table className="h-4 w-4 mr-2" />
            还款计划
          </TabsTrigger>
          <TabsTrigger value="chart" className="text-sm sm:text-base">
            <LineChart className="h-4 w-4 mr-2" />
            趋势图表
          </TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="mt-0">
          <ResultSummary result={result} />
        </TabsContent>

        <TabsContent value="schedule" className="mt-0">
          <div className="rounded-lg border">
            <PaymentSchedule schedule={result.paymentSchedule} />
          </div>
        </TabsContent>

        <TabsContent value="chart" className="mt-0">
          <div className="rounded-lg border p-4">
            <PaymentChart schedule={result.paymentSchedule} />
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}