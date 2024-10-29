import { Card } from "@/components/ui/card";
import { TaxResult } from '../types';
import { formatCurrency, formatPercent } from '../utils';
import { 
  Calculator, 
  Car,
  Receipt,
  ArrowDownToLine,
  AlertCircle
} from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ResultSummaryProps {
  result: TaxResult;
}

export default function ResultSummary({ result }: ResultSummaryProps) {
  const summaryCards = [
    {
      title: "应税价格",
      value: result.taxablePrice,
      icon: Car,
      description: "计税依据金额",
      tooltip: "不含增值税价格与其他费用之和"
    },
    {
      title: "购置税税率",
      value: result.taxRate,
      icon: Calculator,
      description: "适用税率",
      isPercent: true,
      tooltip: "新能源汽车免征购置税"
    },
    {
      title: "应缴购置税",
      value: result.taxAmount,
      icon: Receipt,
      description: "应缴纳税额",
      tooltip: "应税价格×购置税税率"
    },
    {
      title: "总费用",
      value: result.totalPrice,
      icon: ArrowDownToLine,
      description: "含税总费用",
      tooltip: "包含车价、税费及其他费用"
    }
  ];

  const showTaxExemption = result.taxRate === 0;

  return (
    <div className="space-y-6">
      {showTaxExemption && (
        <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-900">
          <AlertCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertDescription className="text-green-600 dark:text-green-400">
            该车型为新能源汽车，免征车辆购置税
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card 
              key={card.title} 
              className="p-4 hover:shadow-md transition-all duration-300 group relative"
            >
              <div className="flex items-start space-x-3">
                <div className="rounded-lg p-2 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground group-hover:text-muted-foreground/80">
                    {card.title}
                  </div>
                  <div className="text-lg font-bold text-primary group-hover:text-primary/90">
                    {card.isPercent ? formatPercent(card.value) : formatCurrency(card.value)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 group-hover:text-muted-foreground/80">
                    {card.description}
                  </div>
                </div>
              </div>
              {card.tooltip && (
                <div className="absolute inset-0 bg-background/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-sm text-center">
                  {card.tooltip}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      <div className="text-sm text-muted-foreground space-y-1 p-4 bg-muted/50 rounded-lg">
        <p>* 以上结果仅供参考，实际金额以税务机关核定为准</p>
        <p>* 新能源汽车免征购置税，具体以工信部《免征车辆购置税的新能源汽车车型目录》为准</p>
        <p>* 计算结果已考虑13%增值税，其他费用包含上牌费、保险费等支出</p>
      </div>
    </div>
  );
}