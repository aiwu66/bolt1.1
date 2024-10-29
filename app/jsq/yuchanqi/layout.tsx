import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '预产期计算器 - 孕期计算_产检时间安排',
  description: '专业的预产期计算工具，支持末次月经和B超检查两种计算方式，提供详细的孕期时间表和产检建议。帮助准妈妈科学安排孕期检查。',
  keywords: '预产期计算器,孕期计算,产检时间,孕周计算,末次月经计算',
};

export default function DueDateCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}