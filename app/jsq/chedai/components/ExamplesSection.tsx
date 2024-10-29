"use client";

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileDown, FileText, ArrowRight } from 'lucide-react';
import { examples } from '../constants';
import { CarLoanParams } from './CalculatorForm';
import { cn } from '@/lib/utils';

interface ExamplesSectionProps {
  onImport: (params: CarLoanParams) => void;
}

export default function ExamplesSection({ onImport }: ExamplesSectionProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">计算案例</h2>
        </div>
        <p className="text-sm text-muted-foreground">点击"导入案例"快速填充计算器参数</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {examples.map((example, index) => (
          <Card 
            key={index}
            className={cn(
              "relative p-4 hover:shadow-md transition-all duration-300",
              "before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity",
              "group"
            )}
          >
            <div className="relative">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-medium text-lg group-hover:text-primary transition-colors">
                  {example.title}
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onImport(example.params)}
                  className="shrink-0 group-hover:border-primary group-hover:text-primary transition-colors"
                >
                  <FileDown className="h-4 w-4 mr-2" />
                  导入案例
                </Button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">车辆价格</span>
                  <span className="font-medium">{example.price}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">首付比例</span>
                  <span className="font-medium">{example.down}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">贷款金额</span>
                  <span className="font-medium">{example.loan}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">贷款期限</span>
                  <span className="font-medium">{example.term}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">贷款利率</span>
                  <span className="font-medium">{example.rate}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm pt-2 border-t">
                  <span className="text-muted-foreground">参考月供</span>
                  <span className="font-medium text-primary flex items-center gap-1">
                    {example.monthly}
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
}