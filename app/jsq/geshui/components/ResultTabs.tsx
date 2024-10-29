"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Calculator, Table, LineChart } from 'lucide-react';
import ResultSummary from './ResultSummary';
import TaxSchedule from './TaxSchedule';
import TaxChart from './TaxChart';
import { TaxResult } from '../types';

interface ResultTabsProps {
  result?: TaxResult;
}

export default function ResultTabs({ result }: ResultTabsProps) {
  if (!result) {
    return (
      <Card className="p-4 sm:p-6">
        <div className="text-center text-muted-foreground py-8">
          请输入相关信息并点击计算按钮
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-lg font-semibold">计算结果</h2>
      </div>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="summary" className="text-sm sm:text-base">
            <Calculator className="h-4 w-4 mr-2" />
            计算结果
          </TabsTrigger>
          <TabsTrigger value="schedule" className="text-sm sm:text-base">
            <Table className="h-4 w-4 mr-2" />
            {result.type === "monthly" ? "月度明细" : "年度明细"}
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
            <TaxSchedule 
              type={result.type}
              monthlyDetails={result.monthlyDetails}
              annualDetails={result.annualDetails}
              taxBreakdown={result.taxBreakdown}
            />
          </div>
        </TabsContent>

        <TabsContent value="chart" className="mt-0">
          <div className="rounded-lg border p-4">
            <TaxChart 
              type={result.type}
              monthlyDetails={result.monthlyDetails}
              annualDetails={result.annualDetails}
            />
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}