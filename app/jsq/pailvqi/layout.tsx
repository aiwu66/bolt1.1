import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '排卵期计算器 - 在线排卵期计算_备孕助手',
  description: '专业的排卵期计算工具，帮助您科学计算排卵期和易孕期，合理安排备孕时间。支持月经周期分析和生理期提醒。',
  keywords: '排卵期计算器,排卵期计算,易孕期计算,备孕计算器,月经周期计算',
};

export default function OvulationCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}