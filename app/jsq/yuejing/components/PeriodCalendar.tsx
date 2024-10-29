"use client";

import { Card } from "@/components/ui/card";
import { MenstrualResult } from '../types';
import { formatDate } from '../utils';

interface PeriodCalendarProps {
  result: MenstrualResult;
}

export default function PeriodCalendar({ result }: PeriodCalendarProps) {
  const phases = [
    {
      name: '月经期',
      start: result.lastPeriodDate,
      end: new Date(result.lastPeriodDate.getTime() + result.periodLength * 24 * 60 * 60 * 1000),
      color: 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300'
    },
    {
      name: '卵泡期',
      start: new Date(result.lastPeriodDate.getTime() + result.periodLength * 24 * 60 * 60 * 1000),
      end: new Date(result.lastPeriodDate.getTime() + 14 * 24 * 60 * 60 * 1000),
      color: 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
    },
    {
      name: '排卵期',
      start: new Date(result.lastPeriodDate.getTime() + 14 * 24 * 60 * 60 * 1000),
      end: new Date(result.lastPeriodDate.getTime() + 16 * 24 * 60 * 60 * 1000),
      color: 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300'
    },
    {
      name: '黄体期',
      start: new Date(result.lastPeriodDate.getTime() + 16 * 24 * 60 * 60 * 1000),
      end: result.nextPeriodDate,
      color: 'bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {phases.map((phase) => (
          <Card key={phase.name} className={`p-4 ${phase.color}`}>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{phase.name}</h3>
                <p className="text-sm opacity-80">
                  {formatDate(phase.start)} - {formatDate(phase.end)}
                </p>
              </div>
              {result.currentPhase === phase.name && (
                <span className="px-2 py-1 rounded-full text-xs bg-white/20">
                  当前阶段
                </span>
              )}
            </div>
          </Card>
        ))}
      </div>

      <div className="text-sm text-muted-foreground">
        <p>* 日期显示基于您提供的月经周期信息</p>
        <p>* 实际周期可能会有所变化</p>
      </div>
    </div>
  );
}