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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calculator } from "lucide-react";
import { depositTypes, depositTerms, defaultDepositParams } from '../constants';

const formSchema = z.object({
  amount: z.string().min(1, "请输入存款金额"),
  type: z.enum(["regular", "current", "agreement"]),
  term: z.string().min(1, "请选择存款期限"),
  rate: z.string().min(1, "请输入存款利率"),
});

export type DepositParams = z.infer<typeof formSchema>;

interface CalculatorFormProps {
  initialParams: DepositParams;
  onCalculate: (values: DepositParams) => void;
}

export default function CalculatorForm({ 
  initialParams,
  onCalculate 
}: CalculatorFormProps) {
  const form = useForm<DepositParams>({
    resolver: zodResolver(formSchema),
    defaultValues: initialParams || defaultDepositParams,
  });

  // 当存款类型改变时，更新利率
  const handleTypeChange = (value: string) => {
    const newRate = depositTypes[value as keyof typeof depositTypes].baseRate;
    form.setValue('type', value as "regular" | "current" | "agreement");
    form.setValue('rate', newRate.toString());
    
    // 触发重新计算
    const formValues = form.getValues();
    onCalculate({
      ...formValues,
      type: value as "regular" | "current" | "agreement",
      rate: newRate.toString()
    });
  };

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onCalculate)} className="space-y-6">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>存款金额（元）</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="请输入存款金额" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>存款类型</FormLabel>
                <Select 
                  onValueChange={handleTypeChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="选择存款类型" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(depositTypes).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  {depositTypes[field.value as keyof typeof depositTypes]?.description}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="term"
            render={({ field }) => (
              <FormItem>
                <FormLabel>存款期限</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="选择存款期限" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {depositTerms.map((term) => (
                      <SelectItem key={term.value} value={term.value}>
                        {term.label}
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
            name="rate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>年利率（%）</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    step="0.01"
                    placeholder="请输入年利率" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  {field.value && `当前${depositTypes[form.getValues('type') as keyof typeof depositTypes]?.name}基准利率：${field.value}%`}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            <Calculator className="mr-2 h-4 w-4" />
            计算收益
          </Button>
        </form>
      </Form>
    </Card>
  );
}