export interface FetalWeightResult {
  weight: number;
  gestationalAge: number;
  percentile: number;
  weightRange: {
    min: number;
    max: number;
  };
  category: string;
  recommendations: string[];
  measurements?: {
    bpd?: number; // 双顶径 (mm)
    hc?: number;  // 头围 (mm)
    ac?: number;  // 腹围 (mm)
    fl?: number;  // 股骨长度 (mm)
  };
  formula: string; // 使用的计算公式
  accuracy: string; // 公式准确度
}

export interface WeightPercentile {
  week: number;
  p3: number;
  p10: number;
  p50: number;
  p90: number;
  p97: number;
}