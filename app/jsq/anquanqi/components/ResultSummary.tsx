import { Card } from "@/components/ui/card";
import { SafePeriodResult } from '../types';
import { formatDate } from '../utils';
import { 
  Calendar, 
  CalendarRange,
  AlertTriangle,
  ShieldAlert
} from 'lucide-react';

interface ResultSummaryProps {
  result: SafePeriodResult;
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
      title: "危险期",
      value: `${formatDate(result.dangerPeriod.start)} - ${formatDate(result.dangerPeriod.end)}`,
      icon: AlertTriangle,
      description: "避孕重点关注期",
      alert: true
    },
    {
      title: "当前阶段",
      value: result.currentPhase,
      icon: CalendarRange,
      description: "目前所处周期阶段"
    },
    {
      title: "可靠性评分",
      value: `${result.reliability.score}%`,
      icon: ShieldAlert,
      description: result.reliability.factors[0],
      alert: result.reliability.score < 70
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
                <div className={`rounded-lg p-2 ${card.alert ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{card.title}</div>
                  <div className={`text-lg font-bold ${card.alert ? 'text-destructive' : 'text-primary'}`}>
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
        <h3 className="text-sm font-medium mb-3">周期阶段</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">月经期</span>
            <span>{formatDate(result.periodPhases.menstruation.start)} - {formatDate(result.periodPhases.menstruation.end)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">卵泡期</span>
            <span>{formatDate(result.periodPhases.follicular.start)} - {formatDate(result.periodPhases.follicular.end)}</span>
          </div>
          <div className="flex justify-between text-sm text-destructive font-medium">
            <span>排卵期</span>
            <span>{formatDate(result.periodPhases.ovulation.start)} - {formatDate(result.periodPhases.ovulation.end)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">黄体期</span>
            <span>{formatDate(result.periodPhases.luteal.start)} - {formatDate(result.periodPhases.luteal.end)}</span>
          </div>
        </div>
      </Card>

      <div className="text-sm text-destructive space-y-1 p-4 bg-destructive/5 rounded-lg">
        <p>* 安全期避孕法不可靠！</p>
        <p>* 计算结果仅供参考，不建议作为避孕的唯一依据</p>
        <p>* 建议在医生指导下选择科学的避孕方式</p>
      </div>
    </div>
  );
}