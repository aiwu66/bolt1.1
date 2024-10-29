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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { insuranceLimits, deductionExplanations } from '../constants';

const formSchema = z.object({
  calculationType: z.enum(["monthly", "annual"]),
  monthlySalary: z.string().min(1, "请输入月收入").optional(),
  cityType: z.enum(["first-tier", "new-first-tier", "second-tier", "other"]),
  insuranceBase: z.string().min(1, "请输入社保基数"),
  annualIncome: z.string().optional(),
  paidTax: z.string().optional(),
  otherIncome: z.string().optional(),
  deductions: z.record(z.boolean()),
  deductionAmounts: z.record(z.string())
});

export type TaxParams = z.infer<typeof formSchema>;

interface CalculatorFormProps {
  initialParams: TaxParams;
  onCalculate: (values: TaxParams) => void;
}

export default function CalculatorForm({ initialParams, onCalculate }: CalculatorFormProps) {
  const form = useForm<TaxParams>({
    resolver: zodResolver(formSchema),
    defaultValues: initialParams,
  });

  const calculationType = form.watch("calculationType");
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
          <Tabs 
            defaultValue={calculationType}
            value={calculationType}
            onValueChange={(value) => form.setValue("calculationType", value as "monthly" | "annual")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="monthly">月度计算</TabsTrigger>
              <TabsTrigger value="annual">年度汇算</TabsTrigger>
            </TabsList>

            <TabsContent value="monthly" className="space-y-4 mt-4">
              <FormField
                control={form.control}
                name="monthlySalary"
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
                    <FormDescription>
                      包含工资、奖金等应税收入
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>

            <TabsContent value="annual" className="space-y-4 mt-4">
              <FormField
                control={form.control}
                name="annualIncome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>年度收入总额（元）</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="请输入年度工资薪金收入总额" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      包括全年工资、薪金、奖金等收入
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paidTax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>已预缴税额（元）</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="请输入已预缴的个人所得税" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      全年各月已预缴的个人所得税总和
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="otherIncome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>其他综合所得（元）</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="请输入其他综合所得收入" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      劳务报酬、稿酬、特许权使用费等收入
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
          </Tabs>

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
                  当前城市社保基数范围：{cityLimits.min}～{cityLimits.max}元
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <FormLabel>专项附加扣除</FormLabel>
            {Object.entries(deductionExplanations).map(([key, item]) => (
              <div key={key} className="flex flex-col space-y-2">
                <FormField
                  control={form.control}
                  name={`deductions.${key}` as any}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                            if (!checked) {
                              form.setValue(`deductionAmounts.${key}`, "0");
                            } else {
                              form.setValue(`deductionAmounts.${key}`, item.amount.toString());
                            }
                          }}
                        />
                      </FormControl>
                      <div className="space-y-1">
                        <FormLabel className="font-normal">
                          {item.title}
                        </FormLabel>
                        <FormDescription>
                          {item.description}
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                {form.watch(`deductions.${key}`) && (
                  <FormField
                    control={form.control}
                    name={`deductionAmounts.${key}` as any}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="输入扣除金额"
                            {...field}
                            className="w-full md:w-1/2"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          <Alert>
            <AlertDescription>
              专项附加扣除需要在单位进行专项附加扣除信息采集，并提供相关证明材料
            </AlertDescription>
          </Alert>

          <Button type="submit" className="w-full">
            <Calculator className="mr-2 h-4 w-4" />
            {calculationType === "monthly" ? "计算个税" : "年度汇算"}
          </Button>
        </form>
      </Form>
    </Card>
  );
}