export interface OvulationResult {
  lastPeriodDate: Date;
  nextPeriodDate: Date;
  ovulationDate: Date;
  fertileWindow: {
    start: Date;
    end: Date;
  };
  safeWindow: {
    beforeStart: Date;
    beforeEnd: Date;
    afterStart: Date;
    afterEnd: Date;
  };
  cyclePhases: {
    follicularPhase: {
      start: Date;
      end: Date;
    };
    ovulatoryPhase: {
      start: Date;
      end: Date;
    };
    lutealPhase: {
      start: Date;
      end: Date;
    };
  };
  cycleLength: number;
  periodLength: number;
  currentPhase: string;
  daysUntilNextPeriod: number;
}