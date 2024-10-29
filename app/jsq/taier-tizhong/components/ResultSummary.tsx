import { Card } from "@/components/ui/card";
import { FetalWeightResult } from '../types';
import { formatNumber } from '../utils';
import { 
  Calculator, 
  Scale,
  AlertTriangle,
  CalendarDays,
  Info
} from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ResultSummaryProps {
  result: FetalWeightResult;
}

export default function ResultSummary({ result }: ResultSummaryProps) {
  const summaryCards = [
    {
      title: "估计体重",
      value: `${formatNumber(result.weight)}g`,
      icon: Calculator,
      description: "当前胎儿估计体重"
    },
    {
      title: "孕周",
      value: `${result.gestationalAge}周`,
      icon: CalendarDays,
      description: "当前孕周"
    },
    {
      title: "体重分类",
      value: result.category,
      icon: Scale,
      description: "体重发育评估"
    },
    {
      title: "百分位数",
      value: `${result.percentile}%`,
      icon: AlertTriangle,
      description: "同龄胎儿体重分布"
    }
  ];

  return (
    <div className="space-y-6">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          使用{result.formula}计算，{result.accuracy}
        </AlertDescription>
      </Alert>

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
                    {card.value}
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
        <h3 className="text-sm font-medium mb-3">正常体重范围</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">最小值</span>
            <span>{formatNumber(result.weightRange.min)}g</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">最大值</span>
            <span>{formatNumber(result.weightRange.max)}g</span>
          </div>
        </div>
      </Card>

      <div className="text-sm text-muted-foreground space-y-1 p-4 bg-muted/50 rounded-lg">
        <p>* 胎儿体重为B超估算值，仅供参考</p>
        <p>* 使用{result.formula}计算，{result.accuracy}</p>
        <p>* 建议结合其他指标综合评估胎儿发育情况</p>
      </div>
    </div>
  );
}