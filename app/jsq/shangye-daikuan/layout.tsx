import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '商业贷款计算器 - 专业的商贷计算工具_利率计算方式_还款方案对比',
  description: '提供专业的商业贷款计算服务，支持等额本息、等额本金两种还款方式，可查看详细还款计划，支持多种贷款方案对比，帮助您选择最优惠的商贷方案。',
  keywords: '商业贷款计算器,商贷计算器,房贷计算器,贷款利率计算,还款计划,等额本息,等额本金',
};

export default function CommercialLoanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}