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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { insuranceRates } from '../constants';

const formSchema = z.object({
  baseSalary: z.string().min(1, "请输入月收入"),
  cityType: z.enum(["first-tier", "new-first-tier", "second-tier", "other"]),
  insuranceBase: z.string().min(1, "请输入社保基数"),
  housingFundBase: z.string().min(1, "请输入公积金基数"),
  housingFundRatio: z.string().min(1, "请选择公积金比例"),
});

export type InsuranceParams = z.infer<typeof formSchema>;

interface CalculatorFormProps {
  initialParams: InsuranceParams;
  onCalculate: (values: InsuranceParams) => void;
}

export default function CalculatorForm({ initialParams, onCalculate }: CalculatorFormProps) {
  const form = useForm<InsuranceParams>({
    resolver: zodResolver(formSchema),
    defaultValues: initialParams,
  });

  const cityType = form.watch("cityType");
  const cityRates = insuranceRates[cityType as keyof typeof insuranceRates];

  const validateInsuranceBase = (value: string) => {
    const base = parseFloat(value);
    if (isNaN(base)) return "请输入有效的社保基数";
    if (base < cityRates.personal.min) return `社保基数不能低于${cityRates.personal.min}元`;
    if (base > cityRates.personal.max) return `社保基数不能超过${cityRates.personal.max}元`;
    return true;
  };

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onCalculate)} className="space-y-6">
          <FormField
            control={form.control}
            name="baseSalary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>月收入（元）</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="请输入税前月收入" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cityType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>城市类型</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="选择城市类型" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="first-tier">一线城市（北上广深）</SelectItem>
                    <SelectItem value="new-first-tier">新一线城市</SelectItem>
                    <SelectItem value="second-tier">二线城市</SelectItem>
                    <SelectItem value="other">其他城市</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  不同城市的社保公积金基数上下限不同
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="insuranceBase"
            rules={{
              validate: validateInsuranceBase
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>社保基数（元）</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="请输入社保缴费基数" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  当前城市社保基数范围：{cityRates.personal.min}～{cityRates.personal.max}元
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="housingFundBase"
            render={({ field }) => (
              <FormItem>
                <FormLabel>公积金基数（元）</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="请输入公积金缴费基数" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  公积金基数范围与社保基数相同
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="housingFundRatio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>公积金缴存比例</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="选择公积金缴存比例" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="5">5%</SelectItem>
                    <SelectItem value="7">7%</SelectItem>
                    <SelectItem value="8">8%</SelectItem>
                    <SelectItem value="10">10%</SelectItem>
                    <SelectItem value="12">12%</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Alert>
            <AlertDescription>
              实际缴费基数和比例可能因企业政策有所不同，请以实际情况为准
            </AlertDescription>
          </Alert>

          <Button type="submit" className="w-full">
            <Calculator className="mr-2 h-4 w-4" />
            计算五险一金
          </Button>
        </form>
      </Form>
    </Card>
  );
}