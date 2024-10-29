import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BMI计算器 - 身体质量指数计算_健康评估工具',
  description: '专业的BMI计算器，提供准确的身体质量指数计算，包含健康评估、体重管理建议和健康指导。适用于成人体重评估和健康管理。',
  keywords: 'BMI计算器,身体质量指数,体重计算器,健康评估,体重管理',
};

export default function BMICalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}