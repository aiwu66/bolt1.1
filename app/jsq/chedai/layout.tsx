import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '车贷计算器 - 专业汽车贷款计算工具_月供计算_还款方案对比',
  description: '提供专业的汽车贷款计算服务，支持等额本息、等额本金两种还款方式，可查看详细还款计划，支持多种贷款方案对比，帮助您选择最优惠的车贷方案。',
  keywords: '车贷计算器,汽车贷款计算器,车贷月供计算,汽车金融,贷款利率计算,还款计划,等额本息,等额本金',
};

export default function CarLoanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}