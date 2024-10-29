import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '月经计算器 - 在线月经周期计算_经期预测',
  description: '专业的月经计算工具，帮助您科学计算月经周期，预测下次月经日期。支持月经周期分析和经期提醒。',
  keywords: '月经计算器,月经周期计算,经期计算,月经预测,经期跟踪',
};

export default function MenstrualCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}