import { Card } from '@/components/ui/card';
import { 
  Calculator, 
  PiggyBank, 
  Percent, 
  LineChart,
  ChevronRight
} from 'lucide-react';

export default function GuideSection() {
  const steps = [
    {
      icon: Calculator,
      title: '输入存款金额',
      description: '填写您要存入的金额'
    },
    {
      icon: PiggyBank,
      title: '选择存款方式',
      description: '定期、活期或协议存款'
    },
    {
      icon: Percent,
      title: '确认存款利率',
      description: '根据银行最新利率设置'
    },
    {
      icon: LineChart,
      title: '查看收益分析',
      description: '了解存款收益明细'
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