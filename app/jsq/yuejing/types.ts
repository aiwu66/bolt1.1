export interface MenstrualResult {
  lastPeriodDate: Date;
  nextPeriodDate: Date;
  periodLength: number;
  cycleLength: number;
  currentPhase: string;
  daysUntilNextPeriod: number;
  cycleAnalysis: {
    regularity: string;
    recommendation: string;
  };
  periodSchedule: Array<{
    startDate: Date;
    endDate: Date;
  }>;
  symptoms?: Array<{
    type: string;
    severity: string;
    date: Date;
  }>;
}