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
      title: '填写工资构成',
      description: '输入基本工资、岗位工资等'
    },
    {
      icon: Building2,
      title: '设置社保公积金',
      description: '选择城市和缴费基数'
    },
    {
      icon: Receipt,
      title: '补充额外收入',
      description: '填写奖金、补贴等收入'
    },
    {
      icon: PiggyBank,
      title: '查看工资明细',
      description: '了解工资构成和分析'
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