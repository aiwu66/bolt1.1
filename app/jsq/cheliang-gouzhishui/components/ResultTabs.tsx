"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Calculator, Receipt } from 'lucide-react';
import ResultSummary from './ResultSummary';
import TaxBreakdown from './TaxBreakdown';
import { TaxResult } from '../types';

interface ResultTabsProps {
  result: TaxResult;
}

export default function ResultTabs({ result }: ResultTabsProps) {
  return (
    <Card className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-lg font-semibold">计算结果</h2>
      </div>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="summary" className="text-sm sm:text-base">
            <Calculator className="h-4 w-4 mr-2" />
            计算结果
          </TabsTrigger>
          <TabsTrigger value="breakdown" className="text-sm sm:text-base">
            <Receipt className="h-4 w-4 mr-2" />
            费用明细
          </TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="mt-0">
          <ResultSummary result={result} />
        </TabsContent>

        <TabsContent value="breakdown" className="mt-0">
          <TaxBreakdown result={result} />
        </TabsContent>
      </Tabs>
    </Card>
  );
}