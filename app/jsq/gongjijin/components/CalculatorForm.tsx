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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calculator, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { defaultHousingFundLoanParams } from '../constants';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const formSchema = z.object({
  loanType: z.enum(["pure", "combined"]),
  totalPrice: z.string().min(1, "请输入房屋总价"),
  downPaymentRatio: z.string().min(1, "请选择首付比例"),
  loanAmount: z.string().min(1, "请输入贷款金额"),
  loanTerm: z.string().min(1, "请选择贷款期限"),
  interestRate: z.string().min(1, "请输入贷款利率"),
  paymentMethod: z.enum(["equal-payment", "equal-principal"]),
  monthlyIncome: z.string().optional(),
  monthlyDeposit: z.string().optional(),
  // 组合贷款特有字段
  commercialLoanAmount: z.string().optional(),
  commercialLoanRate: z.string().optional(),
});

export type HousingFundLoanParams = z.infer<typeof formSchema>;

interface CalculatorFormProps {
  initialParams: HousingFundLoanParams;
  onCalculate: (values: HousingFundLoanParams) => void;
}

export default function CalculatorForm({ 
  initialParams,
  onCalculate 
}: CalculatorFormProps) {
  const form = useForm<HousingFundLoanParams>({
    resolver: zodResolver(formSchema),
    defaultValues: initialParams || defaultHousingFundLoanParams,
  });

  const loanType = form.watch("loanType");
  const totalPrice = parseFloat(form.watch("totalPrice") || "0");
  const downPaymentRatio = parseFloat(form.watch("downPaymentRatio") || "0");
  const monthlyIncome = parseFloat(form.watch("monthlyIncome") || "0");
  const monthlyDeposit = parseFloat(form.watch("monthlyDeposit") || "0");

  // 计算贷款金额
  const calculateLoanAmount = () => {
    const maxLoan = totalPrice * (1 - downPaymentRatio / 100);
    form.setValue("loanAmount", maxLoan.toString());
  };

  // 计算月供压力
  const calculatePaymentStress = () => {
    if (monthlyIncome > 0) {
      const paymentRatio = (monthlyIncome * 0.5).toLocaleString();
      return `建议月供不超过${paymentRatio}元（月收入的50%）`;
    }
    return null;
  };

  // 计算可贷额度
  const calculateMaxLoan = () => {
    if (monthlyDeposit > 0) {
      const maxLoan = (monthlyDeposit * 12 * 15).toLocaleString();
      return `参考可贷额度约${maxLoan}元（月缴存额15倍）`;
    }
    return null;
  };

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onCalculate)} className="space-y-6">
          <FormField
            control={form.control}
            name="loanType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>贷款类型</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="选择贷款类型" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="pure">纯公积金贷款</SelectItem>
                    <SelectItem value="combined">组合贷款</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  {field.value === "pure" ? 
                    "利率低，额度受限，需要连续缴存记录" : 
                    "公积金贷款和商业贷款组合使用，提高可贷额度"}
                </FormDescription>
              </FormItem>
            )}
          />

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="totalPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>房屋总价（元）</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="请输入房屋总价" 
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        calculateLoanAmount();
                      }}
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
                    onValueChange={(value) => {
                      field.onChange(value);
                      calculateLoanAmount();
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="选择首付比例" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="30">30%（首套）</SelectItem>
                      <SelectItem value="40">40%（二套）</SelectItem>
                      <SelectItem value="50">50%</SelectItem>
                      <SelectItem value="60">60%</SelectItem>
                      <SelectItem value="70">70%</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {loanType === "combined" ? (
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="loanAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>公积金贷款金额（元）</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="请输入公积金贷款金额" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="commercialLoanAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>商业贷款金额（元）</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="请输入商业贷款金额" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="interestRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>公积金贷款利率（%）</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01"
                          placeholder="请输入公积金贷款利率" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>当前基准利率：3.1%</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="commercialLoanRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>商业贷款利率（%）</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01"
                          placeholder="请输入商业贷款利率" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>当前基准利率：4.2%</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
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
                    <FormDescription>当前公积金贷款基准利率：3.1%</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

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
                    {[5, 10, 15, 20, 25, 30].map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}年
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  贷款期限与年龄之和不超过65岁
                </FormDescription>
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
                <FormDescription>
                  等额本息月供固定，等额本金月供递减
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <h3 className="text-sm font-medium">贷款能力评估（选填）</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="monthlyIncome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>月收入（元）</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="请输入月收入" 
                        {...field} 
                      />
                    </FormControl>
                    {calculatePaymentStress() && (
                      <FormDescription>{calculatePaymentStress()}</FormDescription>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="monthlyDeposit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>月缴存额（元）</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="请输入月缴存额" 
                        {...field} 
                      />
                    </FormControl>
                    {calculateMaxLoan() && (
                      <FormDescription>{calculateMaxLoan()}</FormDescription>
                    )}
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              实际贷款额度、利率及放款时间以公积金中心审批为准
            </AlertDescription>
          </Alert>

          <Button type="submit" className="w-full">
            <Calculator className="mr-2 h-4 w-4" />
            计算
          </Button>
        </form>
      </Form>
    </Card>
  );
}