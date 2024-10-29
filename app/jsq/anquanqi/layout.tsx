import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '安全期计算器 - 在线安全期计算_月经周期分析',
  description: '提供安全期计算功能，但请注意安全期避孕法并不可靠。建议在医生指导下选择科学的避孕方式。包含月经周期分析和避孕方法介绍。',
  keywords: '安全期计算器,安全期计算,月经周期计算,避孕方法,月经期计算',
};

export default function SafePeriodCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}