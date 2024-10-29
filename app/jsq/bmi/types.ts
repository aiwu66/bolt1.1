export interface BMIResult {
  bmi: number;
  category: string;
  healthRisk: string;
  idealWeight: {
    min: number;
    max: number;
  };
  recommendations: string[];
}

export interface BMIHistoryEntry {
  date: string;
  height: number;
  weight: number;
  bmi: number;
  category: string;
}