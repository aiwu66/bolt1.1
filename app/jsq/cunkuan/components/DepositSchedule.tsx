import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatCurrency } from '../utils';
import { DepositResult } from '../types';

interface DepositScheduleProps {
  result: DepositResult;
}

export default function DepositSchedule({ result }: DepositScheduleProps) {
  const schedule = result.monthlyInterest.map((interest, index) => ({
    month: index + 1,
    principal: result.principal,
    interest,
    total: result.principal + interest
  }));

  return (
    <div className="relative overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>月份</TableHead>
            <TableHead>本金</TableHead>
            <TableHead>当月利息</TableHead>
            <TableHead>累计利息</TableHead>
            <TableHead>本息合计</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schedule.map((item, index) => {
            const cumulativeInterest = result.monthlyInterest
              .slice(0, index + 1)
              .reduce((sum, interest) => sum + interest, 0);
            
            return (
              <TableRow key={index}>
                <TableCell>{item.month}</TableCell>
                <TableCell>{formatCurrency(item.principal)}</TableCell>
                <TableCell>{formatCurrency(item.interest)}</TableCell>
                <TableCell>{formatCurrency(cumulativeInterest)}</TableCell>
                <TableCell>{formatCurrency(item.principal + cumulativeInterest)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}