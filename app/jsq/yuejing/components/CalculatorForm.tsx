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
import { Calculator } from "lucide-react";
import { defaultMenstrualParams } from '../constants';

const formSchema = z.object({
  lastPeriodDate: z.string().min(1, "请选择末次月经日期"),
  cycleLength: z.string()
    .min(1, "请输入月经周期")
    .refine(val => {
      const num = parseInt(val);
      return !isNaN(num) && num >= 21 && num <= 35;
    }, "月经周期必须在21-35天之间"),
  periodLength: z.string()
    .min(1, "请输入月经持续天数")
    .refine(val => {
      const num = parseInt(val);
      return !isNaN(num) && num >= 3 && num <= 7;
    }, "月经持续天数必须在3-7天之间"),
});

interface CalculatorFormProps {
  initialParams: typeof defaultMenstrualParams;
  onCalculate: (values: typeof defaultMenstrualParams) => void;
}

export default function CalculatorForm({
  initialParams,
  onCalculate
}: CalculatorFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialParams,
  });

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onCalculate)} className="space-y-6">
          <FormField
            control={form.control}
            name="lastPeriodDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>末次月经日期</FormLabel>
                <FormControl>
                  <Input 
                    type="date" 
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  请选择最近一次月经的第一天
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cycleLength"
            render={({ field }) => (
              <FormItem>
                <FormLabel>月经周期（天）</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="请输入月经周期" 
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  正常月经周期为21-35天
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="periodLength"
            render={({ field }) => (
              <FormItem>
                <FormLabel>月经持续天数</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="请输入月经持续天数" 
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  正常月经持续3-7天
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            <Calculator className="mr-2 h-4 w-4" />
            计算月经周期
          </Button>
        </form>
      </Form>
    </Card>
  );
}