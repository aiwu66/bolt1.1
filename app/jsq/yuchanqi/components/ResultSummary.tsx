import { Card } from "@/components/ui/card";
import { DueDateResult } from '../types';
import { 
  Calendar,
  Baby,
  Clock,
  CalendarDays
} from 'lucide-react';

interface ResultSummaryProps {
  result: DueDateResult;
}

export default function ResultSummary({ result }: ResultSummaryProps) {
  const summaryCards = [
    {
      title: "预产期",
      value: result.dueDate,
      icon: Calendar,
      description: "预计分娩日期"
    },
    {
      title: "当前孕周",
      value: `${result.currentWeek}周`,
      icon: Clock,
      description: "目前所处孕期"
    },
    {
      title: "剩余天数",
      value: `${result.daysRemaining}天`,
      icon: CalendarDays,
      description: "距离预产期"
    },
    {
      title: "胎儿发育",
      value: result.currentTrimester,
      icon: Baby,
      description: "当前发育阶段"
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
        <p>* 预产期计算结果仅供参考，实际分娩日期可能会有1-2周的误差</p>
        <p>* 建议定期进行产检，遵医嘱进行孕期保健</p>
        <p>* 如有异常情况请及时就医</p>
      </div>
    </div>
  );
}