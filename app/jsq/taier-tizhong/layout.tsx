import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '胎儿体重计算器 - 胎儿发育评估_B超数据分析',
  description: '专业的胎儿体重计算工具，支持多种计算方法，提供胎儿发育评估和建议。基于B超数据进行精确计算，帮助孕妈妈了解胎儿发育情况。',
  keywords: '胎儿体重计算器,胎儿发育评估,B超数据分析,孕期监测,胎儿生长曲线',
};

export default function FetalWeightCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}