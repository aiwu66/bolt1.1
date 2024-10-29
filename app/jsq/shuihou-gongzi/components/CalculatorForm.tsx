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
import { insuranceLimits } from '../../geshui/constants';

const formSchema = z.object({
  baseSalary: z.string().min(1, "请输入基本工资"),
  position: z.string().min(1, "请输入岗位工资"),
  performance: z.string().min(1, "请输入绩效工资"),
  allowance: z.string().min(1, "请输入各项补贴"),
  cityType: z.enum(["first-tier", "new-first-tier", "second-tier", "other"]),
  insuranceBase: z.string().min(1, "请输入社保基数"),
  housingFundRatio: z.string().min(1, "请选择公积金比例"),
  bonus: z.string().optional(),
  overtimePay: z.string().optional(),
  mealAllowance: z.string().optional(),
  transportAllowance: z.string().optional(),
  communicationAllowance: z.string().optional(),
});

export type SalaryParams = z.infer<typeof formSchema>;

interface CalculatorFormProps {
  initialParams: SalaryParams;
  onCalculate: (values: SalaryParams) => void;
}

export default function CalculatorForm({ initialParams, onCalculate }: CalculatorFormProps) {
  const form = useForm<SalaryParams>({
    resolver: zodResolver(formSchema),
    defaultValues: initialParams,
  });

  const cityType = form.watch("cityType");
  const cityLimits = insuranceLimits[cityType as keyof typeof insuranceLimits];

  const validateInsuranceBase = (value: string) => {
    const base = parseFloat(value);
    if (isNaN(base)) return "请输入有效的社保基数";
    if (base < cityLimits.min) return `社保基数不能低于${cityLimits.min}元`;
    if (base > cityLimits.max) return `社保基数不能超过${cityLimits.max}元`;
    return true;
  };

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onCalculate)} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">基本工资构成</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="baseSalary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>基本工资（元）</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="请输入基本工资" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>岗位工资（元）</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="请输入岗位工资" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="performance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>绩效工资（元）</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="请输入绩效工资" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="allowance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>各项补贴（元）</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="请输入各项补贴" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">额外收入（选填）</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="bonus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>奖金（元）</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="请输入奖金" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="overtimePay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>加班费（元）</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="请输入加班费" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">福利补贴（选填）</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <FormField
                control={form.control}
                name="mealAllowance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>餐补（元）</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="请输入餐补" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="transportAllowance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>交通补贴（元）</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="请输入交通补贴" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="communicationAllowance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>通讯补贴（元）</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="请输入通讯补贴" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">社保公积金设置</h3>
            <div className="grid gap-4 md:grid-cols-3">
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
                        <SelectItem value="first-tier">一线城市</SelectItem>
                        <SelectItem value="new-first-tier">新一线城市</SelectItem>
                        <SelectItem value="second-tier">二线城市</SelectItem>
                        <SelectItem value="other">其他城市</SelectItem>
                      </SelectContent>
                    </Select>
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
                        placeholder="请输入社保基数" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      范围：{cityLimits.min}～{cityLimits.max}
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
                    <FormLabel>公积金比例</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="选择公积金比例" />
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
            </div>
          </div>

          <Button type="submit" className="w-full">
            <Calculator className="mr-2 h-4 w-4" />
            计算工资明细
          </Button>
        </form>
      </Form>
    </Card>
  );
}