import { Card } from "@/components/ui/card";
import { DepositResult } from '../types';
import { formatCurrency, formatPercent } from '../utils';
import { 
  Calculator, 
  Wallet, 
  PiggyBank, 
  ArrowDownToLine,
  Percent
} from 'lucide-react';

interface ResultSummaryProps {
  result: DepositResult;
}

export default function ResultSummary({ result }: ResultSummaryProps) {
  const summaryCards = [
    {
      title: "本金",
      value: result.principal,
      icon: Wallet,
      description: "存入金额"
    },
    {
      title: "利息收入",
      value: result.interest,
      icon: Calculator,
      description: "税前利息"
    },
    {
      title: "实际收益",
      value: result.afterTaxInterest,
      icon: PiggyBank,
      description: "税后利息"
    },
    {
      title: "到期本息",
      value: result.afterTaxTotal,
      icon: ArrowDownToLine,
      description: "本金和税后利息"
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

      <Card className="p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Percent className="h-4 w-4 text-primary" />
          <h3 className="font-medium">收益分析</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">年化收益率</span>
              <span>{formatPercent(result.effectiveRate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">利息税金</span>
              <span>{formatCurrency(result.taxAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">税后收益率</span>
              <span>{formatPercent(result.effectiveRate * 0.8)}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">月均利息</span>
              <span>{formatCurrency(result.interest / result.monthlyInterest.length)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">总收益率</span>
              <span>{formatPercent((result.afterTaxTotal - result.principal) / result.principal * 100)}</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="text-sm text-muted-foreground space-y-1 p-4 bg-muted/50 rounded-lg">
        <p>* 以上结果仅供参考，实际收益以银行结算为准</p>
        <p>* 计算结果已考虑20%利息税</p>
        <p>* 实际利率可能因银行具体政策有所调整</p>
      </div>
    </div>
  );
}