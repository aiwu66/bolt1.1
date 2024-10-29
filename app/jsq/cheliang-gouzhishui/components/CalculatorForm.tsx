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
import { Switch } from "@/components/ui/switch";
import { Calculator } from "lucide-react";
import { defaultTaxParams, vehicleTypes } from '../constants';
import VehicleTypeCard from './VehicleTypeCard';
import PriceInput from './PriceInput';
import AdditionalCostsCard from './AdditionalCostsCard';

const formSchema = z.object({
  vehicleType: z.string().min(1, "请选择车型"),
  basePrice: z.string().min(1, "请输入车辆价格"),
  includesVAT: z.boolean(),
  additionalCosts: z.string(),
  isNewEnergy: z.boolean(),
});

export type TaxParams = z.infer<typeof formSchema>;

interface CalculatorFormProps {
  initialParams: TaxParams;
  onCalculate: (values: TaxParams) => void;
}

export default function CalculatorForm({ 
  initialParams,
  onCalculate 
}: CalculatorFormProps) {
  const form = useForm<TaxParams>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultTaxParams,
      vehicleType: 'sedan',
    },
  });

  const handleVehicleTypeChange = (type: string) => {
    const selectedType = vehicleTypes.find(t => t.label === type);
    if (selectedType) {
      form.setValue('vehicleType', type);
      form.setValue('isNewEnergy', !!selectedType.isNewEnergy);
    }
  };

  const handleSubmit = (values: TaxParams) => {
    onCalculate(values);
  };

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="vehicleType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>选择车型</FormLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  {vehicleTypes.map((type) => (
                    <VehicleTypeCard
                      key={type.label}
                      type={type}
                      isSelected={field.value === type.label}
                      onClick={() => handleVehicleTypeChange(type.label)}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="basePrice"
            render={({ field }) => (
              <FormItem>
                <PriceInput
                  value={field.value}
                  onChange={field.onChange}
                  onCalculate={() => form.handleSubmit(handleSubmit)()}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="includesVAT"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">含增值税价格</FormLabel>
                  <div className="text-[0.8rem] text-muted-foreground">
                    价格是否已包含13%增值税
                  </div>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="additionalCosts"
            render={({ field }) => (
              <FormItem>
                <AdditionalCostsCard
                  value={field.value}
                  onChange={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isNewEnergy"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">新能源车型</FormLabel>
                  <div className="text-[0.8rem] text-muted-foreground">
                    新能源汽车免征购置税
                  </div>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={vehicleTypes.find(type => type.label === form.watch('vehicleType'))?.isNewEnergy}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            <Calculator className="mr-2 h-4 w-4" />
            计算购置税
          </Button>
        </form>
      </Form>
    </Card>
  );
}