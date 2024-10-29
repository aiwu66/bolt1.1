import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '车辆购置税计算器 - 汽车购置税计算_新车购置税计算器',
  description: '提供准确的车辆购置税计算服务，支持新能源汽车免税政策，包含增值税计算，帮助您了解购车各项税费。',
  keywords: '车辆购置税计算器,汽车购置税计算器,购置税计算,新能源汽车购置税',
};

export default function VehicleTaxCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}