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
import { defaultFetalParams, measurementRanges } from '../constants';

const formSchema = z.object({
  gestationalAge: z.string()
    .min(1, "请输入孕周")
    .refine(val => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= 12 && num <= 42;
    }, "孕周必须在12-42周之间"),
  bpd: z.string().optional(),
  hc: z.string().optional(),
  ac: z.string().optional(),
  fl: z.string().optional(),
}).refine((data) => {
  // 至少需要填写AC和FL，或者BPD和AC
  return (data.ac && data.fl) || (data.bpd && data.ac);
}, {
  message: "请至少填写AC和FL，或者BPD和AC",
});

interface CalculatorFormProps {
  initialParams: typeof defaultFetalParams;
  onCalculate: (values: typeof defaultFetalParams) => void;
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
            name="gestationalAge"
            render={({ field }) => (
              <FormItem>
                <FormLabel>孕周（周）</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="请输入当前孕周" 
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  请输入12-42周之间的孕周
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <h3 className="text-sm font-medium">B超测量数据（mm）</h3>
            
            <FormField
              control={form.control}
              name="bpd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>双顶径（BPD）</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="请输入双顶径" 
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    正常范围：{measurementRanges.bpd.min}-{measurementRanges.bpd.max}mm
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ac"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>腹围（AC）</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="请输入腹围" 
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    正常范围：{measurementRanges.ac.min}-{measurementRanges.ac.max}mm
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>股骨长度（FL）</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="请输入股骨长度" 
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    正常范围：{measurementRanges.fl.min}-{measurementRanges.fl.max}mm
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full">
            <Calculator className="mr-2 h-4 w-4" />
            计算胎儿体重
          </Button>
        </form>
      </Form>
    </Card>
  );
}