import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DepositResult } from '../types';
import { formatCurrency } from '../utils';

interface DepositChartProps {
  result: DepositResult;
}

export default function DepositChart({ result }: DepositChartProps) {
  const data = result.monthlyInterest.map((interest, index) => {
    const cumulativeInterest = result.monthlyInterest
      .slice(0, index + 1)
      .reduce((sum, i) => sum + i, 0);
    
    return {
      month: index + 1,
      monthlyInterest: interest,
      cumulativeInterest: cumulativeInterest,
      total: result.principal + cumulativeInterest
    };
  });

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="month" 
            tickFormatter={(value) => `${value}月`}
          />
          <YAxis 
            tickFormatter={(value) => formatCurrency(value)}
          />
          <Tooltip 
            formatter={(value: number) => formatCurrency(value)}
            labelFormatter={(label) => `${label}月`}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="monthlyInterest" 
            name="月度利息" 
            stroke="#2563eb" 
            strokeWidth={2}
          />
          <Line 
            type="monotone" 
            dataKey="cumulativeInterest" 
            name="累计利息" 
            stroke="#16a34a" 
            strokeWidth={2}
          />
          <Line 
            type="monotone" 
            dataKey="total" 
            name="本息总额" 
            stroke="#dc2626" 
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}