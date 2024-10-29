import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '税后工资计算器 - 五险一金及个税计算_实发工资计算器',
  description: '提供准确的税后工资计算服务，包含五险一金计算、个人所得税计算、专项附加扣除等功能，帮助您了解实际到手工资。',
  keywords: '税后工资计算器,五险一金计算器,实发工资计算,个税计算器,工资计算器',
};

export default function AfterTaxSalaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}