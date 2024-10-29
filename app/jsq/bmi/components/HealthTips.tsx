import { Card } from "@/components/ui/card";
import { healthyTips } from '../constants';
import { Salad, Dumbbell, Heart } from 'lucide-react';

const icons = {
  '均衡饮食': Salad,
  '规律运动': Dumbbell,
  '生活习惯': Heart
};

export default function HealthTips() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-6">健康生活指南</h3>
      <div className="grid gap-6 md:grid-cols-3">
        {healthyTips.map((section) => {
          const Icon = icons[section.title as keyof typeof icons];
          return (
            <div key={section.title} className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="rounded-lg p-2 bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h4 className="font-medium">{section.title}</h4>
              </div>
              <ul className="space-y-2">
                {section.tips.map((tip, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    • {tip}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Card>
  );
}