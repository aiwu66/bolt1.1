import { Card } from "@/components/ui/card";
import { TaxResult } from '../types';
import { formatCurrency } from '../utils';
import { additionalCostTypes } from '../constants';

interface TaxBreakdownProps {
  result: TaxResult;
}

export default function TaxBreakdown({ result }: TaxBreakdownProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-sm font-medium mb-4">费用明细</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">车辆售价（含税）</span>
              <span>{formatCurrency(result.priceBreakdown.basePrice * 1.13)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">增值税（13%）</span>
              <span className="text-destructive">-{formatCurrency(result.priceBreakdown.vat)}</span>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t">
              <span className="text-muted-foreground">不含税价格</span>
              <span>{formatCurrency(result.priceBreakdown.basePrice)}</span>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">其他费用</span>
              <span>{formatCurrency(result.priceBreakdown.additionalCosts)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">应税价格</span>
              <span>{formatCurrency(result.taxablePrice)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">购置税（{result.taxRate}%）</span>
              <span className="text-destructive">{formatCurrency(result.taxAmount)}</span>
            </div>
          </div>

          <div className="flex justify-between text-base font-medium pt-4 border-t">
            <span>最终总价</span>
            <span className="text-primary">{formatCurrency(result.totalPrice)}</span>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-sm font-medium mb-4">其他费用明细</h3>
        <div className="space-y-3">
          {additionalCostTypes.map((cost, index) => (
            <div key={index} className="group">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">{cost.label}</span>
                <span className="text-sm font-medium">{formatCurrency(cost.amount)}</span>
              </div>
              <p className="text-xs text-muted-foreground">{cost.description}</p>
              {index < additionalCostTypes.length - 1 && (
                <div className="border-t my-3" />
              )}
            </div>
          ))}
          <div className="flex justify-between items-center pt-3 border-t font-medium">
            <span>合计</span>
            <span className="text-primary">
              {formatCurrency(additionalCostTypes.reduce((sum, cost) => sum + cost.amount, 0))}
            </span>
          </div>
        </div>
      </Card>

      <div className="text-sm text-muted-foreground space-y-2">
        <h4 className="font-medium text-foreground">计算说明：</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>车辆购置税 = 应税价格 × 税率（10%）</li>
          <li>应税价格 = 不含税价格 + 其他费用</li>
          <li>不含税价格 = 含税价格 ÷ (1 + 13%)</li>
          <li>其他费用包含上牌费、保险费等支出</li>
          <li>新能源汽车免征购置税</li>
        </ul>
      </div>
    </div>
  );
}