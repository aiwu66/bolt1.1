import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '个人所得税计算器 - 专业的个税计算工具_年度汇算_专项附加扣除',
  description: '提供专业的个人所得税计算服务，支持工资薪金所得计算、年终奖计算、专项附加扣除、年度汇算等功能，帮助您准确计算个人所得税。',
  keywords: '个人所得税计算器,个税计算器,工资计算器,年终奖计算,专项附加扣除,个税计算',
};

export default function IncomeTaxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}