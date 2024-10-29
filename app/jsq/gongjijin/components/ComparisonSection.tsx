"use client";

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Scale } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '../utils';
import { HousingFundLoanParams } from './CalculatorForm';
import { HousingFundLoanResult } from '../types';

interface ComparisonSectionProps {
  plans: Array<{ params: HousingFundLoanParams; result: HousingFundLoanResult }>;
  onRemovePlan: (index: number) => void;
  onImport: (params: HousingFundLoanParams) => void;
}

export default function ComparisonSection({ plans, onRemovePlan, onImport }: ComparisonSectionProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Scale className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">方案对比</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          最多可对比3个方案，第一个方案为基准方案
        </p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">总览对比</TabsTrigger>
          <TabsTrigger value="details">详细对比</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={cn(
                  "p-4 relative",
                  index === 0 && "border-primary"
                )}
              >
                {index === 0 && (
                  <div className="absolute -top-2 -right-2">
                    <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                      基准方案
                    </span>
                  </div>
                )}
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">方案 {index + 1}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemovePlan(index)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      删除
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">贷款金额</span>
                      <span>{formatCurrency(parseFloat(plan.params.loanAmount))}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">贷款期限</span>
                      <span>{plan.params.loanTerm}年</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">贷款利率</span>
                      <span>{plan.params.interestRate}%</span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t">
                      <span className="text-muted-foreground">月供</span>
                      <span className="font-medium text-primary">
                        {formatCurrency(plan.result.monthlyPayment)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">总利息</span>
                      <span className="font-medium text-primary">
                        {formatCurrency(plan.result.totalInterest)}
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => onImport(plan.params)}
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    导入此方案
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="details" className="mt-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4">对比项目</th>
                  {plans.map((_, index) => (
                    <th key={index} className="text-right py-2 px-4">
                      方案 {index + 1}
                      {index === 0 && " (基准)"}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-4 text-muted-foreground">贷款金额</td>
                  {plans.map((plan, index) => (
                    <td key={index} className="text-right py-2 px-4">
                      {formatCurrency(parseFloat(plan.params.loanAmount))}
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 text-muted-foreground">贷款期限</td>
                  {plans.map((plan, index) => (
                    <td key={index} className="text-right py-2 px-4">
                      {plan.params.loanTerm}年
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 text-muted-foreground">贷款利率</td>
                  {plans.map((plan, index) => (
                    <td key={index} className="text-right py-2 px-4">
                      {plan.params.interestRate}%
                    </td>
                  ))}
                </tr>
                <tr className="border-b bg-muted/50">
                  <td className="py-2 px-4 font-medium">月供</td>
                  {plans.map((plan, index) => (
                    <td key={index} className="text-right py-2 px-4 font-medium text-primary">
                      {formatCurrency(plan.result.monthlyPayment)}
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 text-muted-foreground">总还款额</td>
                  {plans.map((plan, index) => (
                    <td key={index} className="text-right py-2 px-4">
                      {formatCurrency(plan.result.totalPayment)}
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 text-muted-foreground">总利息</td>
                  {plans.map((plan, index) => (
                    <td key={index} className="text-right py-2 px-4">
                      {formatCurrency(plan.result.totalInterest)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}