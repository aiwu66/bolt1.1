"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatCurrency } from '../utils';
import { InsuranceResult } from '../types';

interface InsuranceScheduleProps {
  result: InsuranceResult;
}

export default function InsuranceSchedule({ result }: InsuranceScheduleProps) {
  const { personal, company } = result;

  return (
    <div className="space-y-8">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>项目</TableHead>
              <TableHead className="text-right">个人缴纳</TableHead>
              <TableHead className="text-right">单位缴纳</TableHead>
              <TableHead className="text-right">合计</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>养老保险</TableCell>
              <TableCell className="text-right">{formatCurrency(personal.pension)}</TableCell>
              <TableCell className="text-right">{formatCurrency(company.pension)}</TableCell>
              <TableCell className="text-right">{formatCurrency(personal.pension + company.pension)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>医疗保险</TableCell>
              <TableCell className="text-right">{formatCurrency(personal.medical)}</TableCell>
              <TableCell className="text-right">{formatCurrency(company.medical)}</TableCell>
              <TableCell className="text-right">{formatCurrency(personal.medical + company.medical)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>失业保险</TableCell>
              <TableCell className="text-right">{formatCurrency(personal.unemployment)}</TableCell>
              <TableCell className="text-right">{formatCurrency(company.unemployment)}</TableCell>
              <TableCell className="text-right">{formatCurrency(personal.unemployment + company.unemployment)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>工伤保险</TableCell>
              <TableCell className="text-right">{formatCurrency(personal.workInjury)}</TableCell>
              <TableCell className="text-right">{formatCurrency(company.workInjury)}</TableCell>
              <TableCell className="text-right">{formatCurrency(personal.workInjury + company.workInjury)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>生育保险</TableCell>
              <TableCell className="text-right">{formatCurrency(personal.maternity)}</TableCell>
              <TableCell className="text-right">{formatCurrency(company.maternity)}</TableCell>
              <TableCell className="text-right">{formatCurrency(personal.maternity + company.maternity)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>住房公积金</TableCell>
              <TableCell className="text-right">{formatCurrency(personal.housingFund)}</TableCell>
              <TableCell className="text-right">{formatCurrency(company.housingFund)}</TableCell>
              <TableCell className="text-right">{formatCurrency(personal.housingFund + company.housingFund)}</TableCell>
            </TableRow>
            <TableRow className="font-medium">
              <TableCell>合计</TableCell>
              <TableCell className="text-right">{formatCurrency(personal.total)}</TableCell>
              <TableCell className="text-right">{formatCurrency(company.total)}</TableCell>
              <TableCell className="text-right">{formatCurrency(personal.total + company.total)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}