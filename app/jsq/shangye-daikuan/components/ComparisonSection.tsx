"use client";

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, ArrowDownToLine } from 'lucide-react';
import { formatCurrency } from '../utils';
import { CommercialLoanParams } from './CalculatorForm';
import { CommercialLoanResult } from '../types';

interface ComparisonSectionProps {
  plans: Array<{params: CommercialLoanParams; result: CommercialLoanResult}>;
  onRemovePlan: (index: number) => void;
  onImport: (params: CommercialLoanParams) => void;
}

export default function ComparisonSection({ 
  plans, 
  onRemovePlan,
  onImport 
}: ComparisonSectionProps) {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">方案对比</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 px-4">对比项目</th>
              {plans.map((plan, index) => (
                <th key={index} className="text-left py-2 px-4">
                  <div className="flex items-center justify-between">
                    <span>方案 {index + 1}</span>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onImport(plan.params)}
                      >
                        <ArrowDownToLine className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemovePlan(index)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2 px-4">贷款金额</td>
              {plans.map((plan, index) => (
                <td key={index} className="py-2 px-4">
                  {formatCurrency(plan.result.loanAmount)}
                </td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="py-2 px-4">贷款期限</td>
              {plans.map((plan, index) => (
                <td key={index} className="py-2 px-4">
                  {plan.params.loanTerm}年
                </td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="py-2 px-4">年利率</td>
              {plans.map((plan, index) => (
                <td key={index} className="py-2 px-4">
                  {plan.params.interestRate}%
                </td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="py-2 px-4">还款方式</td>
              {plans.map((plan, index) => (
                <td key={index} className="py-2 px-4">
                  {plan.params.paymentMethod === 'equal-payment' ? '等额本息' : '等额本金'}
                </td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="py-2 px-4">月供</td>
              {plans.map((plan, index) => (
                <td key={index} className="py-2 px-4 font-medium text-primary">
                  {formatCurrency(plan.result.monthlyPayment)}
                </td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="py-2 px-4">支付利息</td>
              {plans.map((plan, index) => (
                <td key={index} className="py-2 px-4">
                  {formatCurrency(plan.result.totalInterest)}
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-2 px-4">还款总额</td>
              {plans.map((plan, index) => (
                <td key={index} className="py-2 px-4 font-medium">
                  {formatCurrency(plan.result.totalPayment)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 text-sm text-muted-foreground">
        <p>* 点击方案右侧的导入按钮可以快速切换到该方案进行修改</p>
        <p>* 最多可以保存3个方案进行对比</p>
      </div>
    </Card>
  );
}