"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Calculator, Calendar, ListChecks } from 'lucide-react';
import ResultSummary from './ResultSummary';
import PeriodCalendar from './PeriodCalendar';
import CycleAnalysis from './CycleAnalysis';
import { MenstrualResult } from '../types';

interface ResultTabsProps {
  result: MenstrualResult;
}

export default function ResultTabs({ result }: ResultTabsProps) {
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
          <TabsTrigger value="calendar" className="text-sm sm:text-base">
            <Calendar className="h-4 w-4 mr-2" />
            月经日历
          </TabsTrigger>
          <TabsTrigger value="analysis" className="text-sm sm:text-base">
            <ListChecks className="h-4 w-4 mr-2" />
            周期分析
          </TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="mt-0">
          <ResultSummary result={result} />
        </TabsContent>

        <TabsContent value="calendar" className="mt-0">
          <div className="rounded-lg border p-4">
            <PeriodCalendar result={result} />
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="mt-0">
          <CycleAnalysis result={result} />
        </TabsContent>
      </Tabs>
    </Card>
  );
}