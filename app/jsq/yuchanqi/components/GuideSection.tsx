import { Card } from '@/components/ui/card';
import { 
  Calendar, 
  CalendarDays, 
  CalendarCheck, 
  Baby,
  ChevronRight
} from 'lucide-react';

export default function GuideSection() {
  const steps = [
    {
      icon: Calendar,
      title: '选择日期',
      description: '输入末次月经日期'
    },
    {
      icon: CalendarDays,
      title: '月经周期',
      description: '填写月经周期天数'
    },
    {
      icon: CalendarCheck,
      title: '计算结果',
      description: '查看预产期信息'
    },
    {
      icon: Baby,
      title: '孕期指导',
      description: '了解发育里程碑'
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