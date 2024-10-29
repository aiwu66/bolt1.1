"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calculator } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface LoanParams {
  loanAmount: string;
  loanTerm: string;
  interestRate: string;
  paymentMethod: string;
  downPaymentRatio: string;
  loanType: string;
}

interface CalculatorFormProps {
  initialParams: LoanParams;
  onCalculate: (params: LoanParams) => void;
}

const LOAN_TYPES = {
  'commercial': {
    name: '商业贷款',
    rate: '4.2',
    description: '利率较高，额度更大，审批更灵活'
  },
  'housing-fund': {
    name: '公积金贷款',
    rate: '3.1',
    description: '利率优惠，额度受限，需要缴存记录'
  },
  'combined': {
    name: '组合贷款',
    rate: '3.65',
    description: '商业贷款和公积金贷款的组合'
  }
};

export default function CalculatorForm({ initialParams, onCalculate }: CalculatorFormProps) {
  const [params, setParams] = useState<LoanParams>(initialParams);

  useEffect(() => {
    setParams(initialParams);
  }, [initialParams]);

  const handleParamChange = (key: keyof LoanParams, value: string) => {
    const newParams = { ...params, [key]: value };
    if (key === 'loanType') {
      newParams.interestRate = LOAN_TYPES[value as keyof typeof LOAN_TYPES].rate;
    }
    setParams(newParams);
    onCalculate(newParams);
  };

  const loanTermOptions = [
    { value: '30', label: '30年' },
    { value: '25', label: '25年' },
    { value: '20', label: '20年' },
    { value: '15', label: '15年' },
    { value: '10', label: '10年' },
  ];

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>贷款类型</Label>
          <Tabs
            value={params.loanType}
            onValueChange={(value) => handleParamChange('loanType', value)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              {Object.entries(LOAN_TYPES).map(([key, { name }]) => (
                <TabsTrigger key={key} value={key} className="text-sm">
                  {name}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="mt-2 text-xs text-muted-foreground">
              {LOAN_TYPES[params.loanType as keyof typeof LOAN_TYPES]?.description}
            </div>
          </Tabs>
        </div>

        <div className="space-y-2">
          <Label htmlFor="loanAmount">房屋总价（元）</Label>
          <Input
            id="loanAmount"
            type="number"
            value={params.loanAmount}
            onChange={(e) => handleParamChange('loanAmount', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="downPaymentRatio">首付比例（%）</Label>
          <Select
            value={params.downPaymentRatio}
            onValueChange={(value) => handleParamChange('downPaymentRatio', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">30%（首套）</SelectItem>
              <SelectItem value="40">40%（二套）</SelectItem>
              <SelectItem value="50">50%</SelectItem>
              <SelectItem value="60">60%</SelectItem>
              <SelectItem value="70">70%</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="loanTerm">贷款年限</Label>
          <Select
            value={params.loanTerm}
            onValueChange={(value) => handleParamChange('loanTerm', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {loanTermOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="interestRate">年利率（%）</Label>
          <Input
            id="interestRate"
            type="number"
            step="0.01"
            value={params.interestRate}
            onChange={(e) => handleParamChange('interestRate', e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            {params.loanType === 'commercial' && '当前商贷基准利率：4.2%'}
            {params.loanType === 'housing-fund' && '当前公积金利率：3.1%'}
            {params.loanType === 'combined' && '组合贷款利率可分别设置'}
          </p>
        </div>

        <div className="space-y-2">
          <Label>还款方式</Label>
          <RadioGroup
            value={params.paymentMethod}
            onValueChange={(value) => handleParamChange('paymentMethod', value)}
            className="grid grid-cols-1 gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="equal-payment" id="equal-payment" />
              <Label htmlFor="equal-payment">等额本息</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="equal-principal" id="equal-principal" />
              <Label htmlFor="equal-principal">等额本金</Label>
            </div>
          </RadioGroup>
        </div>

        <Button 
          className="w-full" 
          onClick={() => onCalculate(params)}
          variant="default"
        >
          <Calculator className="mr-2 h-4 w-4" />
          更新计算结果
        </Button>
      </div>
    </Card>
  );
}