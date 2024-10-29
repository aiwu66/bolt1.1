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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calculator } from "lucide-react";
import { defaultDueDateParams } from '../constants';

const formSchema = z.object({
  method: z.enum(['lmp', 'ultrasound']),
  date: z.string().min(1, "请选择日期"),
  ultrasoundWeeks: z.string().optional()
}).refine((data) => {
  if (data.method === 'ultrasound' && !data.ultrasoundWeeks) {
    return false;
  }
  return true;
}, {
  message: "请输入B超检查时的孕周",
  path: ["ultrasoundWeeks"]
});

interface CalculatorFormProps {
  initialParams: typeof defaultDueDateParams;
  onCalculate: (values: typeof defaultDueDateParams) => void;
}

export default function CalculatorForm({
  initialParams,
  onCalculate
}: CalculatorFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialParams,
  });

  const method = form.watch('method');

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onCalculate)} className="space-y-6">
          <FormField
            control={form.control}
            name="method"
            render={({ field }) => (
              <FormItem>
                <FormLabel>计算方式</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="lmp" id="lmp" />
                      <FormLabel htmlFor="lmp" className="font-normal">
                        末次月经
                      </FormLabel>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ultrasound" id="ultrasound" />
                      <FormLabel htmlFor="ultrasound" className="font-normal">
                        B超检查
                      </FormLabel>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {method === 'lmp' ? '末次月经日期' : 'B超检查日期'}
                </FormLabel>
                <FormControl>
                  <Input 
                    type="date" 
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {method === 'lmp' ? 
                    '请选择末次月经第一天的日期' : 
                    '请选择进行B超检查的日期'
                  }
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {method === 'ultrasound' && (
            <FormField
              control={form.control}
              name="ultrasoundWeeks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>B超孕周</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="请输入B超检查时的孕周" 
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    请输入B超检查时医生告知的孕周数
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button type="submit" className="w-full">
            <Calculator className="mr-2 h-4 w-4" />
            计算预产期
          </Button>
        </form>
      </Form>
    </Card>
  );
}