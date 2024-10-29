"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { InsuranceResult } from '../types';
import { formatCurrency } from '../utils';

interface InsuranceChartProps {
  result: InsuranceResult;
}

const COLORS = ['#2563eb', '#16a34a', '#dc2626', '#8b5cf6', '#f59e0b', '#0891b2'];

export default function InsuranceChart({ result }: InsuranceChartProps) {
  const { personal, company } = result;

  const personalData = [
    { name: '养老保险', value: personal.pension },
    { name: '医疗保险', value: personal.medical },
    { name: '失业保险', value: personal.unemployment },
    { name: '工伤保险', value: personal.workInjury },
    { name: '生育保险', value: personal.maternity },
    { name: '住房公积金', value: personal.housingFund }
  ].filter(item => item.value > 0);

  const companyData = [
    { name: '养老保险', value: company.pension },
    { name: '医疗保险', value: company.medical },
    { name: '失业保险', value: company.unemployment },
    { name: '工伤保险', value: company.workInjury },
    { name: '生育保险', value: company.maternity },
    { name: '住房公积金', value: company.housingFund }
  ].filter(item => item.value > 0);

  return (
    <div className="space-y-8">
      <div className="h-[400px]">
        <h3 className="text-sm font-medium mb-4">个人缴纳构成</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={personalData}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={({ name, value }) => `${name}: ${formatCurrency(value)}`}
              outerRadius={160}
              fill="#8884d8"
              dataKey="value"
            >
              {personalData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="h-[400px]">
        <h3 className="text-sm font-medium mb-4">单位缴纳构成</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={companyData}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={({ name, value }) => `${name}: ${formatCurrency(value)}`}
              outerRadius={160}
              fill="#8884d8"
              dataKey="value"
            >
              {companyData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}