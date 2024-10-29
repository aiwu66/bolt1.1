import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CarPaymentScheduleItem } from '../types';

interface PaymentChartProps {
  schedule: CarPaymentScheduleItem[];
}

export default function PaymentChart({ schedule }: PaymentChartProps) {
  // 每年取一个点，减少数据量
  const yearlyData = schedule.filter((_, index) => index % 12 === 0);

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={yearlyData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="month" 
            tickFormatter={(value) => `${Math.floor(value/12)}年`}
          />
          <YAxis />
          <Tooltip 
            formatter={(value: number) => 
              new Intl.NumberFormat('zh-CN', {
                style: 'currency',
                currency: 'CNY'
              }).format(value)
            }
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="payment" 
            name="月供" 
            stroke="#2563eb" 
            strokeWidth={2}
          />
          <Line 
            type="monotone" 
            dataKey="principal" 
            name="本金" 
            stroke="#16a34a" 
            strokeWidth={2}
          />
          <Line 
            type="monotone" 
            dataKey="interest" 
            name="利息" 
            stroke="#dc2626" 
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}