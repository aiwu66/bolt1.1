"use client";

import { Card } from '@/components/ui/card';
import { insuranceRates } from '../constants';
import { formatPercent } from '../utils';

export default function RatesTable() {
  const cityType = 'first-tier'; // Using first-tier city as example
  const rates = insuranceRates[cityType];

  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium mb-4">五险一金缴费比例参考</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">项目</th>
              <th className="text-right py-2">个人缴费</th>
              <th className="text-right py-2">单位缴费</th>
              <th className="text-right py-2">合计</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">养老保险</td>
              <td className="text-right">{formatPercent(rates.personal.pension)}</td>
              <td className="text-right">{formatPercent(rates.company.pension)}</td>
              <td className="text-right">{formatPercent(rates.personal.pension + rates.company.pension)}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">医疗保险</td>
              <td className="text-right">{formatPercent(rates.personal.medical)}</td>
              <td className="text-right">{formatPercent(rates.company.medical)}</td>
              <td className="text-right">{formatPercent(rates.personal.medical + rates.company.medical)}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">失业保险</td>
              <td className="text-right">{formatPercent(rates.personal.unemployment)}</td>
              <td className="text-right">{formatPercent(rates.company.unemployment)}</td>
              <td className="text-right">{formatPercent(rates.personal.unemployment + rates.company.unemployment)}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">工伤保险</td>
              <td className="text-right">{formatPercent(rates.personal.workInjury)}</td>
              <td className="text-right">{formatPercent(rates.company.workInjury)}</td>
              <td className="text-right">{formatPercent(rates.personal.workInjury + rates.company.workInjury)}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">生育保险</td>
              <td className="text-right">{formatPercent(rates.personal.maternity)}</td>
              <td className="text-right">{formatPercent(rates.company.maternity)}</td>
              <td className="text-right">{formatPercent(rates.personal.maternity + rates.company.maternity)}</td>
            </tr>
            <tr>
              <td className="py-2">住房公积金</td>
              <td className="text-right">{formatPercent(rates.personal.housingFund)}</td>
              <td className="text-right">{formatPercent(rates.company.housingFund)}</td>
              <td className="text-right">{formatPercent(rates.personal.housingFund + rates.company.housingFund)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground mt-4">
        * 以上比例仅供参考，实际缴费比例以当地政策为准
      </p>
    </Card>
  );
}