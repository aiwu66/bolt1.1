import { Card } from "@/components/ui/card";
import { SafePeriodResult } from '../types';
import { formatDate } from '../utils';
import { phaseDescriptions } from '../constants';

interface PeriodCalendarProps {
  result: SafePeriodResult;
}

export default function PeriodCalendar({ result }: PeriodCalendarProps) {
  const phases = [
    {
      ...phaseDescriptions.menstruation,
      start: result.periodPhases.menstruation.start,
      end: result.periodPhases.menstruation.end,
      color: 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300'
    },
    {
      ...phaseDescriptions.follicular,
      start: result.periodPhases.follicular.start,
      end: result.periodPhases.follicular.end,
      color: 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
    },
    {
      ...phaseDescriptions.ovulation,
      start: result.periodPhases.ovulation.start,
      end: result.periodPhases.ovulation.end,
      color: 'bg-destructive/10 text-destructive'
    },
    {
      ...phaseDescriptions.luteal,
      start: result.periodPhases.luteal.start,
      end: result.periodPhases.luteal.end,
      color: 'bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {phases.map((phase) => (
          <Card key={phase.name} className={`p-4 ${phase.color}`}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{phase.name}</h3>
                <p className="text-sm opacity-80">
                  {formatDate(phase.start)} - {formatDate(phase.end)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{phase.risk}</p>
                <p className="text-xs opacity-80">持续{phase.duration}</p>
              </div>
            </div>
            <p className="text-sm mt-2 opacity-80">{phase.description}</p>
          </Card>
        ))}
      </div>

      <div className="text-sm text-muted-foreground">
        <p>* 日期显示基于您提供的月经周期信息</p>
        <p>* 实际周期可能会有所变化</p>
        <p>* 不建议将此计算结果作为避孕依据</p>
      </div>
    </div>
  );
}