"use client";

import { Card } from "@/components/ui/card";
import { SalaryResult } from '../types';
import { formatCurrency, formatPercent } from '../utils';
import { 
  Calculator, 
  Wallet, 
  PiggyBank, 
  ArrowDownToLine,
  Building2,
  PieChart,
  TrendingUp
} from 'lucide-react';

interface ResultSummaryProps {
  result: SalaryResult;
}

export default function ResultSummary({ result }: ResultSummaryProps) {
  const { breakdown, analysis } = result;
  
  const summaryCards = [
    {
      title: "税前收入",
      value: breakdown.grossSalary,
      icon: Wallet,
      description: "月度总收入"
    },
    {
      title: "五险一金",
      value: breakdown.insurance.total,
      icon: Building2,
      description: "社保公积金总额"
    },
    {
      title: "个人所得税",
      value: breakdown.tax,
      icon: Calculator,
      description: "当月应缴个税"
    },
    {
      title: "税后收入",
      value: breakdown.netSalary,
      icon: PiggyBank,
      description: "实际到手收入"
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
            <PieChart className="h-4 w-4 text-primary" />
            <h3 className="font-medium">工资构成分析</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">基本工资占比</span>
              <span>{formatPercent(analysis.basicRatio)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">绩效工资占比</span>
              <span>{formatPercent(analysis.performanceRatio)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">补贴占比</span>
              <span>{formatPercent(analysis.allowanceRatio)}</span>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-2 mb-3">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h3 className="font-medium">扣除分析</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">五险一金比例</span>
              <span>{formatPercent(analysis.insuranceRatio)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">个税比例</span>
              <span>{formatPercent(analysis.taxRatio)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">实发工资比例</span>
              <span className="font-medium text-primary">{formatPercent(analysis.takeHomeRatio)}</span>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <div className="flex items-center space-x-2 mb-3">
          <ArrowDownToLine className="h-4 w-4 text-primary" />
          <h3 className="font-medium">工资明细</h3>
        </div>
        <div className="space-y-4">
          {['basic', 'extra', 'allowance', 'deduction'].map(type => {
            const components = breakdown.components.filter(c => c.type === type);
            if (components.length === 0) return null;
            
            return (
              <div key={type} className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">
                  {type === 'basic' ? '基本工资构成' :
                   type === 'extra' ? '额外收入' :
                   type === 'allowance' ? '福利补贴' : '扣除项目'}
                </h4>
                {components.map((component, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{component.name}</span>
                    <span className={component.type === 'deduction' ? 'text-destructive' : ''}>
                      {component.type === 'deduction' ? '-' : ''}{formatCurrency(component.amount)}
                    </span>
                  </div>
                ))}
                {type === 'deduction' && (
                  <div className="flex justify-between font-medium pt-2 border-t">
                    <span>实发工资</span>
                    <span className="text-primary">{formatCurrency(breakdown.netSalary)}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}