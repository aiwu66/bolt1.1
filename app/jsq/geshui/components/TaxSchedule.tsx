"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatCurrency, formatPercent } from '../utils';
import { MonthlyTaxDetail } from '../types';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TaxScheduleProps {
  type: "monthly" | "annual";
  monthlyDetails?: MonthlyTaxDetail;
  annualDetails?: any;
  taxBreakdown?: any;
}

export default function TaxSchedule({ type, monthlyDetails, annualDetails }: TaxScheduleProps) {
  const data = type === "annual" ? 
    annualDetails?.monthlyDetails : 
    monthlyDetails ? [monthlyDetails] : [];

  if (!data || data.length === 0) return null;

  return (
    <Tabs defaultValue="monthly" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="monthly">月度明细</TabsTrigger>
        <TabsTrigger value="deductions">扣除明细</TabsTrigger>
      </TabsList>

      <TabsContent value="monthly" className="mt-4">
        <Card>
          <div className="relative overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>期数</TableHead>
                  <TableHead className="text-right">税前收入</TableHead>
                  <TableHead className="text-right">应纳税所得额</TableHead>
                  <TableHead className="text-right">适用税率</TableHead>
                  <TableHead className="text-right">速算扣除数</TableHead>
                  <TableHead className="text-right">应纳税额</TableHead>
                  <TableHead className="text-right">税后收入</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((detail: MonthlyTaxDetail) => (
                  <TableRow key={detail.month}>
                    <TableCell>{detail.month}月</TableCell>
                    <TableCell className="text-right">{formatCurrency(detail.salary)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(detail.taxableIncome)}</TableCell>
                    <TableCell className="text-right">{formatPercent(detail.taxRate * 100)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(detail.quickDeduction)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(detail.tax)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(detail.afterTax)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="deductions" className="mt-4">
        <Card>
          <div className="relative overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>期数</TableHead>
                  <TableHead className="text-right">养老保险</TableHead>
                  <TableHead className="text-right">医疗保险</TableHead>
                  <TableHead className="text-right">失业保险</TableHead>
                  <TableHead className="text-right">住房公积金</TableHead>
                  <TableHead className="text-right">专项附加扣除</TableHead>
                  <TableHead className="text-right">扣除总额</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((detail: MonthlyTaxDetail) => {
                  const deductionsTotal = detail.deductions.reduce((sum, d) => sum + d.amount, 0);
                  return (
                    <TableRow key={detail.month}>
                      <TableCell>{detail.month}月</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(detail.socialInsurance.pension)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(detail.socialInsurance.medical)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(detail.socialInsurance.unemployment)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(detail.socialInsurance.housingFund)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(deductionsTotal)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(detail.socialInsurance.total + deductionsTotal)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
}