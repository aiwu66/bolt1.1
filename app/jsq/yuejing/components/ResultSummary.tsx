import { Card } from "@/components/ui/card";
import { MenstrualResult } from '../types';
import { formatDate } from '../utils';
import { 
  Calendar, 
  CalendarCheck,
  CalendarDays,
  AlertCircle
} from 'lucide-react';

interface ResultSummaryProps {
  result: MenstrualResult;
}

export default function ResultSummary({ result }: ResultSummaryProps) {
  const summaryCards = [
    {
      title: "下次月经",
      value: formatDate(result.nextPeriodDate),
      icon: Calendar,
      description: `${result.daysUntilNextPeriod}天后`
    },
    {
      title: "月经周期",
      value: `${result.cycleLength}天`,
      icon: CalendarCheck,
      description: result.cycleAnalysis.regularity
    },
    {
      title: "经期长度",
      value: `${result.periodLength}天`,
      icon: CalendarDays,
      description: "月经持续天数"
    },
    {
      title: "当前阶段",
      value: result.currentPhase,
      icon: AlertCircle,
      description: "目前所处周期阶段"
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

      <Card className="p-4">
        <h3 className="text-sm font-medium mb-3">未来三个月预测</h3>
        <div className="space-y-2">
          {result.periodSchedule.map((period, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-muted-foreground">第{index + 1}次月经</span>
              <span>{formatDate(period.startDate)} - {formatDate(period.endDate)}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="text-sm text-muted-foreground space-y-1 p-4 bg-muted/50 rounded-lg">
        <p>* 计算结果仅供参考，实际情况可能因人而异</p>
        <p>* 如有不适症状请及时就医</p>
        <p>* 建议记录月经情况，有助于发现异常</p>
      </div>
    </div>
  );
}