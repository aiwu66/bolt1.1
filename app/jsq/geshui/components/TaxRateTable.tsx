"use client";

import { Card } from '@/components/ui/card';
import { taxBrackets } from '../constants';

export default function TaxRateTable() {
  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium mb-4">个人所得税税率表</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">级数</th>
              <th className="text-right py-2">全月应纳税所得额</th>
              <th className="text-right py-2">税率</th>
              <th className="text-right py-2">速算扣除数</th>
            </tr>
          </thead>
          <tbody>
            {taxBrackets.map((bracket, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">{index + 1}</td>
                <td className="text-right">
                  {index === taxBrackets.length - 1 
                    ? `${bracket.income.toLocaleString()}元以上`
                    : `${bracket.income.toLocaleString()}-${(taxBrackets[index + 1].income - 1).toLocaleString()}元`
                  }
                </td>
                <td className="text-right">{(bracket.rate * 100).toFixed(0)}%</td>
                <td className="text-right">{bracket.deduction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}