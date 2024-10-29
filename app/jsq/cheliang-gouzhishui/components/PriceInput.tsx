import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";
import { useState } from "react";

interface PriceInputProps {
  value: string;
  onChange: (value: string) => void;
  onCalculate: () => void;
  className?: string;
}

export default function PriceInput({ value, onChange, onCalculate, className }: PriceInputProps) {
  const [focused, setFocused] = useState(false);

  const formatPrice = (price: string) => {
    const num = price.replace(/[^\d]/g, '');
    if (!num) return '';
    return new Intl.NumberFormat('zh-CN').format(parseInt(num));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^\d]/g, '');
    onChange(rawValue);
  };

  return (
    <div className={className}>
      <Label htmlFor="price">车辆价格</Label>
      <div className="relative mt-1.5">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <span className="text-muted-foreground">¥</span>
        </div>
        <Input
          id="price"
          type="text"
          className="pl-7 pr-20"
          value={focused ? value : formatPrice(value)}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="请输入车辆价格"
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-full px-3 text-primary hover:text-primary/80"
            onClick={onCalculate}
          >
            <Calculator className="h-4 w-4 mr-1" />
            计算
          </Button>
        </div>
      </div>
    </div>
  );
}