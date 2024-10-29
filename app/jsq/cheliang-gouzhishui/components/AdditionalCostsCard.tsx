import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { additionalCostTypes } from '../constants';
import { formatCurrency } from '../utils';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

interface AdditionalCostsCardProps {
  value: string;
  onChange: (value: string) => void;
}

export default function AdditionalCostsCard({ value, onChange }: AdditionalCostsCardProps) {
  const [customCosts, setCustomCosts] = useState<Array<{ label: string; amount: number }>>([]);
  
  const defaultTotal = additionalCostTypes.reduce((sum, cost) => sum + cost.amount, 0);
  const customTotal = customCosts.reduce((sum, cost) => sum + cost.amount, 0);
  const total = defaultTotal + customTotal;

  const handleAddCustomCost = () => {
    setCustomCosts([...customCosts, { label: '', amount: 0 }]);
  };

  const handleRemoveCustomCost = (index: number) => {
    const newCosts = customCosts.filter((_, i) => i !== index);
    setCustomCosts(newCosts);
    updateTotal(newCosts);
  };

  const handleCustomCostChange = (index: number, field: 'label' | 'amount', value: string) => {
    const newCosts = [...customCosts];
    if (field === 'amount') {
      newCosts[index].amount = parseInt(value) || 0;
    } else {
      newCosts[index].label = value;
    }
    setCustomCosts(newCosts);
    updateTotal(newCosts);
  };

  const updateTotal = (costs: typeof customCosts) => {
    const newTotal = defaultTotal + costs.reduce((sum, cost) => sum + cost.amount, 0);
    onChange(newTotal.toString());
  };

  return (
    <Card className="p-4">
      <Label>其他费用明细</Label>
      <div className="mt-4 space-y-4">
        {additionalCostTypes.map((cost, index) => (
          <div key={index} className="group">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm">{cost.label}</span>
              <span className="text-sm font-medium">{formatCurrency(cost.amount)}</span>
            </div>
            <p className="text-xs text-muted-foreground">{cost.description}</p>
            {index < additionalCostTypes.length - 1 && <div className="border-t my-3" />}
          </div>
        ))}

        {customCosts.map((cost, index) => (
          <div key={index} className="pt-3 border-t">
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="费用名称"
                value={cost.label}
                onChange={(e) => handleCustomCostChange(index, 'label', e.target.value)}
                className="flex-1"
              />
              <Input
                type="number"
                placeholder="金额"
                value={cost.amount || ''}
                onChange={(e) => handleCustomCostChange(index, 'amount', e.target.value)}
                className="w-32"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveCustomCost(index)}
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        <div className="pt-3 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddCustomCost}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            添加其他费用
          </Button>
        </div>

        <div className="flex justify-between items-center pt-3 border-t font-medium">
          <span>费用合计</span>
          <span className="text-primary">{formatCurrency(total)}</span>
        </div>
      </div>
    </Card>
  );
}