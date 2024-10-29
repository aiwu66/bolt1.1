import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '社保公积金计算器 - 五险一金计算_社保基数计算_公积金缴存计算',
  description: '提供准确的社保公积金计算服务，支持养老保险、医疗保险、失业保险、工伤保险、生育保险和住房公积金的计算，适用于全国各主要城市。',
  keywords: '社保计算器,公积金计算器,五险一金计算器,社保基数计算,公积金缴存计算',
};

export default function SocialInsuranceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}