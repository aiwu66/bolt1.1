import { Card } from "@/components/ui/card";
import { contraceptiveMethods, reliabilityFactors } from '../constants';
import { AlertTriangle } from 'lucide-react';

export default function RiskGuide() {
  return (
    <Card className="p-6">
      <div className="flex items-center space-x-2 mb-6">
        <AlertTriangle className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">避孕方法指南</h2>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-4">科学避孕方法</h3>
          <div className="space-y-4">
            {contraceptiveMethods.map((method, index) => (
              <div key={index} className="group">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{method.name}</span>
                  <span className="text-sm text-muted-foreground">可靠性：{method.reliability}</span>
                </div>
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground">
                    <span className="text-primary">优点：</span>
                    {method.advantages.join('、')}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <span className="text-destructive">缺点：</span>
                    {method.disadvantages.join('、')}
                  </div>
                </div>
                {index < contraceptiveMethods.length - 1 && <div className="border-t my-3" />}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-4">影响因素</h3>
          <div className="space-y-4">
            {Object.entries(reliabilityFactors).map(([key, factor]) => (
              <div key={key} className="group">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{factor.name}</span>
                  <span className="text-sm text-muted-foreground">{factor.impact}</span>
                </div>
                <p className="text-xs text-muted-foreground">{factor.description}</p>
                {key !== 'age' && <div className="border-t my-3" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 text-sm text-muted-foreground">
        <p>* 安全期避孕法不可靠，建议选择其他避孕方式</p>
        <p>* 避孕方式的选择应在医生指导下进行</p>
      </div>
    </Card>
  );
}