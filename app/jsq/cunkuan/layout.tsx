import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '存款计算器 - 定期活期利息计算_存款利率计算器',
  description: '提供准确的存款利息计算服务，支持定期存款、活期存款、协议存款等多种存款方式，帮助您合理规划资金收益。',
  keywords: '存款计算器,定期存款计算器,活期存款计算器,存款利息计算,利率计算器',
};

export default function DepositCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}