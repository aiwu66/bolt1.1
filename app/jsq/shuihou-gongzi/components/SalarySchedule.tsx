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
import { SalaryResult } from '../types';
import { salaryComponentTypes } from '../constants';

interface SalaryScheduleProps {
  result: SalaryResult;
}

export default function SalarySchedule({ result }: SalaryScheduleProps) {
  const { breakdown } = result;
  const { components } = breakdown;

  return (
    <div className="space-y-8">
      {Object.entries(salaryComponentTypes).map(([type, { name, description }]) => {
        const typeComponents = components.filter(c => c.type === type);
        if (typeComponents.length === 0) return null;

        return (
          <div key={type} className="space-y-4">
            <div>
              <h3 className="text-sm font-medium">{name}</h3>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>项目</TableHead>
                    <TableHead className="text-right">金额（元）</TableHead>
                    <TableHead className="text-right">占比</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {typeComponents.map((component, index) => (
                    <TableRow key={index}>
                      <TableCell>{component.name}</TableCell>
                      <TableCell className={`text-right ${component.type === 'deduction' ? 'text-destructive' : ''}`}>
                        {component.type === 'deduction' ? '-' : ''}{formatCurrency(component.amount)}
                      </TableCell>
                      <TableCell className="text-right">
                        {((component.amount / breakdown.grossSalary) * 100).toFixed(1)}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        );
      })}

      <div className="rounded-md border">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>税前收入</TableCell>
              <TableCell className="text-right">{formatCurrency(breakdown.grossSalary)}</TableCell>
              <TableCell className="text-right">100%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>五险一金</TableCell>
              <TableCell className="text-right text-destructive">-{formatCurrency(breakdown.insurance.total)}</TableCell>
              <TableCell className="text-right">{((breakdown.insurance.total / breakdown.grossSalary) * 100).toFixed(1)}%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>个人所得税</TableCell>
              <TableCell className="text-right text-destructive">-{formatCurrency(breakdown.tax)}</TableCell>
              <TableCell className="text-right">{((breakdown.tax / breakdown.grossSalary) * 100).toFixed(1)}%</TableCell>
            </TableRow>
            <TableRow className="font-medium">
              <TableCell>实发工资</TableCell>
              <TableCell className="text-right text-primary">{formatCurrency(breakdown.netSalary)}</TableCell>
              <TableCell className="text-right">{((breakdown.netSalary / breakdown.grossSalary) * 100).toFixed(1)}%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}