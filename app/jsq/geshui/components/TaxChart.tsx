"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../utils';
import { MonthlyTaxDetail } from '../types';

interface TaxChartProps {
  type: "monthly" | "annual";
  monthlyDetails?: MonthlyTaxDetail;
  annualDetails?: any;
}

export default function TaxChart({ type, monthlyDetails, annualDetails }: TaxChartProps) {
  const data = type === "annual" ? 
    annualDetails?.monthlyDetails : 
    monthlyDetails ? [monthlyDetails] : [];

  if (!data || data.length === 0) return null;

  return (
    <div className="space-y-8">
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
              dataKey="salary" 
              name="税前收入" 
              stroke="#2563eb" 
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="afterTax" 
              name="税后收入" 
              stroke="#16a34a" 
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="tax" 
              name="应纳税额" 
              stroke="#dc2626" 
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {type === "annual" && (
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
                dataKey="socialInsurance.total" 
                name="社保公积金" 
                stroke="#8b5cf6" 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey={(data) => data.deductions.reduce((sum: number, d: any) => sum + d.amount, 0)} 
                name="专项附加扣除" 
                stroke="#f59e0b" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}