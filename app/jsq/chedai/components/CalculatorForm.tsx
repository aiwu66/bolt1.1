"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { defaultCarLoanParams } from '../constants';

const formSchema = z.object({
  carPrice: z.string().min(1, "请输入车辆价格"),
  downPaymentRatio: z.string().min(1, "请选择首付比例"),
  loanTerm: z.string().min(1, "请选择贷款期限"),
  interestRate: z.string().min(1, "请输入贷款利率"),
  paymentMethod: z.enum(["equal-payment", "equal-principal"]),
  loanType: z.enum(["bank", "dealer", "other"]),
});

export type CarLoanParams = z.infer<typeof formSchema>;

interface CalculatorFormProps {
  initialParams: CarLoanParams;
  onCalculate: (values: CarLoanParams) => void;
}

const LOAN_TYPE_RATES = {
  bank: {
    name: '银行贷款',
    baseRate: 5.6,
    description: '利率相对较高，审批较严格'
  },
  dealer: {
    name: '厂商金融',
    baseRate: 4.8,
    description: '利率优惠，审批快速'
  },
  other: {
    name: '其他金融机构',
    baseRate: 6.2,
    description: '门槛较低，利率较高'
  }
};

export default function CalculatorForm({ 
  initialParams,
  onCalculate 
}: CalculatorFormProps) {
  const form = useForm<CarLoanParams>({
    resolver: zodResolver(formSchema),
    defaultValues: initialParams || defaultCarLoanParams,
  });

  // 当贷款类型改变时，更新利率
  const handleLoanTypeChange = (value: string) => {
    const newRate = LOAN_TYPE_RATES[value as keyof typeof LOAN_TYPE_RATES].baseRate;
    form.setValue('loanType', value);
    form.setValue('interestRate', newRate.toString());
    
    // 触发重新计算
    const formValues = form.getValues();
    onCalculate({
      ...formValues,
      loanType: value,
      interestRate: newRate.toString()
    });
  };

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onCalculate)} className="space-y-6">
          <FormField
            control={form.control}
            name="carPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>车辆价格（元）</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="请输入车辆价格" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="downPaymentRatio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>首付比例</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="选择首付比例" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="20">20%</SelectItem>
                    <SelectItem value="30">30%</SelectItem>
                    <SelectItem value="40">40%</SelectItem>
                    <SelectItem value="50">50%</SelectItem>
                    <SelectItem value="60">60%</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="loanType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>贷款类型</FormLabel>
                <Select 
                  onValueChange={handleLoanTypeChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="选择贷款类型" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(LOAN_TYPE_RATES).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  {LOAN_TYPE_RATES[field.value as keyof typeof LOAN_TYPE_RATES]?.description}
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="loanTerm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>贷款期限（年）</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="选择贷款期限" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}年
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="interestRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>贷款年利率（%）</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    step="0.01"
                    placeholder="请输入贷款年利率" 
                    {...field} 
                  />
                </FormControl>
                <p className="text-xs text-muted-foreground mt-1">
                  {field.value && `当前${LOAN_TYPE_RATES[form.getValues('loanType') as keyof typeof LOAN_TYPE_RATES]?.name}基准利率：${field.value}%`}
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>还款方式</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="equal-payment" id="equal-payment" />
                      <FormLabel htmlFor="equal-payment" className="font-normal">
                        等额本息
                      </FormLabel>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="equal-principal" id="equal-principal" />
                      <FormLabel htmlFor="equal-principal" className="font-normal">
                        等额本金
                      </FormLabel>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            计算
          </Button>
        </form>
      </Form>
    </Card>
  );
}