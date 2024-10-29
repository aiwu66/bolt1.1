import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatCurrency } from '../utils';
import { PaymentScheduleItem } from '../types';

interface PaymentScheduleProps {
  schedule: PaymentScheduleItem[];
}

export default function PaymentSchedule({ schedule }: PaymentScheduleProps) {
  return (
    <div className="relative overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>期数</TableHead>
            <TableHead>月供</TableHead>
            <TableHead>本金</TableHead>
            <TableHead>利息</TableHead>
            <TableHead>剩余本金</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schedule.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.month}</TableCell>
              <TableCell>{formatCurrency(item.payment)}</TableCell>
              <TableCell>{formatCurrency(item.principal)}</TableCell>
              <TableCell>{formatCurrency(item.interest)}</TableCell>
              <TableCell>{formatCurrency(item.remainingBalance)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}