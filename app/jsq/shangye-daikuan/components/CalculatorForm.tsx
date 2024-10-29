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
import { defaultCommercialLoanParams } from '../constants';

const formSchema = z.object({
  loanAmount: z.string().min(1, "请输入贷款金额"),
  loanTerm: z.string().min(1, "请选择贷款期限"),
  interestRate: z.string().min(1, "请输入贷款利率"),
  paymentMethod: z.enum(["equal-payment", "equal-principal"]),
});

export type CommercialLoanParams = z.infer<typeof formSchema>;

interface CalculatorFormProps {
  initialParams: CommercialLoanParams;
  onCalculate: (values: CommercialLoanParams) => void;
}

export default function CalculatorForm({ 
  initialParams,
  onCalculate 
}: CalculatorFormProps) {
  const form = useForm<CommercialLoanParams>({
    resolver: zodResolver(formSchema),
    defaultValues: initialParams || defaultCommercialLoanParams,
  });

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onCalculate)} className="space-y-6">
          <FormField
            control={form.control}
            name="loanAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>贷款金额（元）</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="请输入贷款金额" 
                    {...field} 
                  />
                </FormControl>
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
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30].map((year) => (
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
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="选择还款方式" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="equal-payment">等额本息</SelectItem>
                    <SelectItem value="equal-principal">等额本金</SelectItem>
                  </SelectContent>
                </Select>
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