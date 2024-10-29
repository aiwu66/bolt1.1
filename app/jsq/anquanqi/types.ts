export interface SafePeriodResult {
  lastPeriodDate: Date;
  nextPeriodDate: Date;
  ovulationDate: Date;
  safePeriods: {
    beforeOvulation: {
      start: Date;
      end: Date;
    };
    afterOvulation: {
      start: Date;
      end: Date;
    };
  };
  dangerPeriod: {
    start: Date;
    end: Date;
  };
  periodPhases: {
    menstruation: {
      start: Date;
      end: Date;
    };
    follicular: {
      start: Date;
      end: Date;
    };
    ovulation: {
      start: Date;
      end: Date;
    };
    luteal: {
      start: Date;
      end: Date;
    };
  };
  cycleLength: number;
  periodLength: number;
  currentPhase: string;
  reliability: {
    score: number;
    factors: string[];
    recommendations: string[];
  };
}