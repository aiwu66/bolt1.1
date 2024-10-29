import { Card } from "@/components/ui/card";
import { OvulationResult } from '../types';
import { formatDate } from '../utils';
import { 
  Calendar, 
  CalendarCheck,
  CalendarDays,
  CalendarRange
} from 'lucide-react';

interface ResultSummaryProps {
  result: OvulationResult;
}

export default function ResultSummary({ result }: ResultSummaryProps) {
  const summaryCards = [
    {
      title: "排卵日期",
      value: formatDate(result.ovulationDate),
      icon: Calendar,
      description: "预计排卵日期"
    },
    {
      title: "易孕期",
      value: `${formatDate(result.fertileWindow.start)} - ${formatDate(result.fertileWindow.end)}`,
      icon: CalendarRange,
      description: "最佳受孕时间"
    },
    {
      title: "下次月经",
      value: formatDate(result.nextPeriodDate),
      icon: CalendarCheck,
      description: `${result.daysUntilNextPeriod}天后`
    },
    {
      title: "当前阶段",
      value: result.currentPhase,
      icon: CalendarDays,
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
        <h3 className="text-sm font-medium mb-3">安全期参考</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">月经期后安全期</span>
            <span>{formatDate(result.safeWindow.beforeStart)} - {formatDate(result.safeWindow.beforeEnd)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">月经期前安全期</span>
            <span>{formatDate(result.safeWindow.afterStart)} - {formatDate(result.safeWindow.afterEnd)}</span>
          </div>
        </div>
      </Card>

      <div className="text-sm text-muted-foreground space-y-1 p-4 bg-muted/50 rounded-lg">
        <p>* 计算结果仅供参考，实际情况可能因人而异</p>
        <p>* 安全期计算不能作为避孕的唯一依据</p>
        <p>* 如有特殊情况请咨询医生</p>
      </div>
    </div>
  );
}