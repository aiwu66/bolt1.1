import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FetalWeightResult } from '../types';

interface GrowthChartProps {
  result: FetalWeightResult;
}

export default function GrowthChart({ result }: GrowthChartProps) {
  // 生成生长曲线数据
  const generateGrowthData = () => {
    const data = [];
    for (let week = 12; week <= 42; week++) {
      const baseWeight = Math.pow(week - 12, 2) * 15;
      data.push({
        week,
        p3: baseWeight * 0.85,
        p50: baseWeight,
        p97: baseWeight * 1.15,
        current: week === result.gestationalAge ? result.weight : null
      });
    }
    return data;
  };

  const data = generateGrowthData();

  return (
    <div className="space-y-6">
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="week" 
              label={{ value: '孕周', position: 'bottom' }}
            />
            <YAxis 
              label={{ value: '体重 (g)', angle: -90, position: 'left' }}
            />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="p3" 
              name="3百分位" 
              stroke="#dc2626" 
              strokeDasharray="3 3"
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="p50" 
              name="50百分位" 
              stroke="#2563eb" 
              strokeWidth={2}
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="p97" 
              name="97百分位" 
              stroke="#16a34a" 
              strokeDasharray="3 3"
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="current" 
              name="当前体重" 
              stroke="#8b5cf6" 
              strokeWidth={2}
              dot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">生长曲线说明</h4>
          <div className="text-sm text-muted-foreground">
            <p>3百分位：体重偏小警戒线</p>
            <p>50百分位：体重标准参考线</p>
            <p>97百分位：体重偏大警戒线</p>
          </div>
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-medium">当前状态</h4>
          <div className="text-sm">
            <p className="text-primary font-medium">{result.weight}g</p>
            <p className="text-muted-foreground mt-1">
              位于{result.percentile}百分位
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}