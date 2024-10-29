import { Card } from '@/components/ui/card';
import { 
  Calculator, 
  Building2, 
  Receipt, 
  PiggyBank,
  ChevronRight
} from 'lucide-react';

export default function GuideSection() {
  const steps = [
    {
      icon: Calculator,
      title: '填写月收入',
      description: '输入税前月收入金额'
    },
    {
      icon: Building2,
      title: '选择城市',
      description: '选择工作所在城市类型'
    },
    {
      icon: Receipt,
      title: '设置基数',
      description: '确认社保公积金缴费基数'
    },
    {
      icon: PiggyBank,
      title: '查看结果',
      description: '了解缴费明细和实际到手'
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