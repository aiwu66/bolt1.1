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
import { Calculator } from "lucide-react";

const formSchema = z.object({
  height: z.string()
    .min(1, "请输入身高")
    .refine(val => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= 100 && num <= 250;
    }, "身高必须在100-250厘米之间"),
  weight: z.string()
    .min(1, "请输入体重")
    .refine(val => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= 30 && num <= 200;
    }, "体重必须在30-200公斤之间"),
});

interface CalculatorFormProps {
  initialHeight: string;
  initialWeight: string;
  onCalculate: (height: string, weight: string) => void;
}

export default function CalculatorForm({
  initialHeight,
  initialWeight,
  onCalculate
}: CalculatorFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      height: initialHeight,
      weight: initialWeight,
    },
  });

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit((values) => onCalculate(values.height, values.weight))} className="space-y-6">
          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>身高（厘米）</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="请输入身高" 
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>体重（公斤）</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="请输入体重" 
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            <Calculator className="mr-2 h-4 w-4" />
            计算BMI
          </Button>
        </form>
      </Form>
    </Card>
  );
}