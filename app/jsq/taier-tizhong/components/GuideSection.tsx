import { Card } from '@/components/ui/card';
import { 
  CalendarDays, 
  Ruler, 
  Calculator, 
  ListChecks,
  ChevronRight
} from 'lucide-react';

export default function GuideSection() {
  const steps = [
    {
      icon: CalendarDays,
      title: '输入孕周',
      description: '填写当前孕周数'
    },
    {
      icon: Ruler,
      title: '填写B超数据',
      description: '输入B超测量结果'
    },
    {
      icon: Calculator,
      title: '计算体重',
      description: '获取胎儿估重结果'
    },
    {
      icon: ListChecks,
      title: '查看建议',
      description: '获取医生建议'
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