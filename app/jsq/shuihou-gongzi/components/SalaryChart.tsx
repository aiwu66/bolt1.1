"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { SalaryResult } from '../types';
import { formatCurrency, formatPercent } from '../utils';

interface SalaryChartProps {
  result: SalaryResult;
}

const COLORS = ['#2563eb', '#16a34a', '#dc2626', '#8b5cf6', '#f59e0b'];

export default function SalaryChart({ result }: SalaryChartProps) {
  const { breakdown, analysis } = result;

  // 工资构成数据
  const compositionData = [
    { name: '基本工资', value: analysis.basicRatio },
    { name: '绩效工资', value: analysis.performanceRatio },
    { name: '补贴', value: analysis.allowanceRatio },
    { name: '五险一金', value: analysis.insuranceRatio },
    { name: '个人所得税', value: analysis.taxRatio }
  ].filter(item => item.value > 0);

  // 月度趋势数据
  const monthlyData = Array.from({ length: 12 }, (_, month) => ({
    month: month + 1,
    grossSalary: breakdown.grossSalary,
    netSalary: breakdown.netSalary,
    insurance: breakdown.insurance.total,
    tax: breakdown.tax
  }));

  return (
    <div className="space-y-8">
      <div className="h-[400px]">
        <h3 className="text-sm font-medium mb-4">月度工资趋势</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={monthlyData}
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
              dataKey="grossSalary" 
              name="税前收入" 
              stroke="#2563eb" 
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="netSalary" 
              name="税后收入" 
              stroke="#16a34a" 
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="insurance" 
              name="五险一金" 
              stroke="#8b5cf6" 
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="tax" 
              name="个人所得税" 
              stroke="#dc2626" 
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="h-[400px]">
        <h3 className="text-sm font-medium mb-4">工资构成分析</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={compositionData}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={({ name, value }) => `${name}: ${formatPercent(value)}`}
              outerRadius={160}
              fill="#8884d8"
              dataKey="value"
            >
              {compositionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => formatPercent(value)}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}