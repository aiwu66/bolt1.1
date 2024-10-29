import { Card } from '@/components/ui/card';
import { 
  Calculator, 
  Car, 
  Receipt, 
  PiggyBank,
  ChevronRight
} from 'lucide-react';

export default function GuideSection() {
  const steps = [
    {
      icon: Car,
      title: '选择车型',
      description: '选择车辆类型和价格'
    },
    {
      icon: Calculator,
      title: '填写价格',
      description: '输入车辆实际价格'
    },
    {
      icon: Receipt,
      title: '确认费用',
      description: '添加其他相关费用'
    },
    {
      icon: PiggyBank,
      title: '查看结果',
      description: '了解各项税费明细'
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-4 mb-8">
      {steps.map((step, index) => {
        const Icon = step.icon;
        return (
          <Card 
            key={index}
            className="p-4 relative group hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-lg p-2 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-medium mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <ChevronRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            )}
          </Card>
        );
      })}
    </div>
  );
}