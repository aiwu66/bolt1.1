"use client";

import { Card } from "@/components/ui/card";
import { InsuranceResult } from '../types';
import { formatCurrency } from '../utils';
import { 
  Calculator, 
  Wallet, 
  Building2, 
  ArrowDownToLine,
  PiggyBank
} from 'lucide-react';

interface ResultSummaryProps {
  result: InsuranceResult;
}

export default function ResultSummary({ result }: ResultSummaryProps) {
  const summaryCards = [
    {
      title: "税前收入",
      value: result.baseSalary,
      icon: Wallet,
      description: "月度总收入"
    },
    {
      title: "个人缴纳",
      value: result.personal.total,
      icon: Calculator,
      description: "个人承担部分"
    },
    {
      title: "单位缴纳",
      value: result.company.total,
      icon: Building2,
      description: "单位承担部分"
    },
    {
      title: "实发工资",
      value: result.netSalary,
      icon: PiggyBank,
      description: "扣除五险一金后收入"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title} className="p-4 hover:shadow-md transition-all duration-300">
              <div className="flex items-start space-x-3">
                <div className="rounded-lg p-2 bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{card.title}</div>
                  <div className="text-lg font-bold text-primary">
                    {formatCurrency(card.value)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {card.description}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Calculator className="h-4 w-4 text-primary" />
            <h3 className="font-medium">个人缴纳明细</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">养老保险</span>
              <span>{formatCurrency(result.personal.pension)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">医疗保险</span>
              <span>{formatCurrency(result.personal.medical)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">失业保险</span>
              <span>{formatCurrency(result.personal.unemployment)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">住房公积金</span>
              <span>{formatCurrency(result.personal.housingFund)}</span>
            </div>
            <div className="flex justify-between font-medium pt-2 border-t">
              <span>合计</span>
              <span>{formatCurrency(result.personal.total)}</span>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Building2 className="h-4 w-4 text-primary" />
            <h3 className="font-medium">单位缴纳明细</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">养老保险</span>
              <span>{formatCurrency(result.company.pension)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">医疗保险</span>
              <span>{formatCurrency(result.company.medical)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">失业保险</span>
              <span>{formatCurrency(result.company.unemployment)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">工伤保险</span>
              <span>{formatCurrency(result.company.workInjury)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">生育保险</span>
              <span>{formatCurrency(result.company.maternity)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">住房公积金</span>
              <span>{formatCurrency(result.company.housingFund)}</span>
            </div>
            <div className="flex justify-between font-medium pt-2 border-t">
              <span>合计</span>
              <span>{formatCurrency(result.company.total)}</span>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <div className="flex items-center space-x-2 mb-3">
          <ArrowDownToLine className="h-4 w-4 text-primary" />
          <h3 className="font-medium">年度预估</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">年度总收入</span>
              <span>{formatCurrency(result.yearlyProjection.grossSalary)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">个人年度缴纳</span>
              <span>{formatCurrency(result.yearlyProjection.personalTotal)}</span>
            </div>
            <div className="flex justify-between font-medium pt-2 border-t">
              <span>年度实发工资</span>
              <span>{formatCurrency(result.yearlyProjection.netSalary)}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">单位年度缴纳</span>
              <span>{formatCurrency(result.yearlyProjection.companyTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">年度总缴纳</span>
              <span>{formatCurrency(result.yearlyProjection.personalTotal + result.yearlyProjection.companyTotal)}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}