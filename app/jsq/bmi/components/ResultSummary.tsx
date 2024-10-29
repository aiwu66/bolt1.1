import { Card } from "@/components/ui/card";
import { BMIResult } from '../types';
import { formatNumber } from '../utils';
import { 
  Calculator, 
  Scale,
  AlertTriangle,
  Target
} from 'lucide-react';

interface ResultSummaryProps {
  result: BMIResult;
}

export default function ResultSummary({ result }: ResultSummaryProps) {
  const summaryCards = [
    {
      title: "BMI指数",
      value: formatNumber(result.bmi),
      icon: Calculator,
      description: "身体质量指数"
    },
    {
      title: "体重状态",
      value: result.category,
      icon: Scale,
      description: "当前体重分类"
    },
    {
      title: "健康风险",
      value: result.healthRisk,
      icon: AlertTriangle,
      description: "潜在健康风险"
    },
    {
      title: "理想体重",
      value: `${result.idealWeight.min}-${result.idealWeight.max}kg`,
      icon: Target,
      description: "健康体重范围"
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

      <div className="text-sm text-muted-foreground space-y-1 p-4 bg-muted/50 rounded-lg">
        <p>* BMI计算公式：体重(kg) / 身高(m)²</p>
        <p>* BMI仅作为体重评估的参考指标之一</p>
        <p>* 建议结合其他指标综合评估健康状况</p>
      </div>
    </div>
  );
}