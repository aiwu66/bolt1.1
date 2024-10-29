import { Card } from '@/components/ui/card';
import { 
  Calculator, 
  Clock, 
  Percent, 
  ArrowDownUp,
  ChevronRight
} from 'lucide-react';

export default function GuideSection() {
  const steps = [
    {
      icon: Calculator,
      title: '输入贷款金额',
      description: '填写您需要的商业贷款金额'
    },
    {
      icon: Clock,
      title: '选择贷款期限',
      description: '选择适合您的还款年限'
    },
    {
      icon: Percent,
      title: '确认贷款利率',
      description: '根据银行最新政策设置利率'
    },
    {
      icon: ArrowDownUp,
      title: '选择还款方式',
      description: '等额本息或等额本金'
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