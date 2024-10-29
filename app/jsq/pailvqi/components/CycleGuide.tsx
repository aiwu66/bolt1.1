import { Card } from "@/components/ui/card";
import { cyclePhases, cycleTypes } from '../constants';
import { Clock } from 'lucide-react';

export default function CycleGuide() {
  return (
    <Card className="p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Clock className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">月经周期指南</h2>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-4">周期类型参考</h3>
          <div className="space-y-4">
            {Object.entries(cycleTypes).map(([key, type]) => (
              <div key={key} className="group">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{type.length}</span>
                  <span className="text-sm text-muted-foreground">{type.description}</span>
                </div>
                <p className="text-xs text-muted-foreground">{type.recommendation}</p>
                {key !== 'irregular' && <div className="border-t my-3" />}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-4">周期阶段说明</h3>
          <div className="space-y-4">
            {cyclePhases.map((phase, index) => (
              <div key={index} className="group">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{phase.name}</span>
                  <span className="text-sm text-muted-foreground">{phase.duration}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{phase.description}</p>
                <ul className="text-xs text-muted-foreground list-disc list-inside">
                  {phase.tips.map((tip, tipIndex) => (
                    <li key={tipIndex}>{tip}</li>
                  ))}
                </ul>
                {index < cyclePhases.length - 1 && <div className="border-t my-3" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 text-sm text-muted-foreground">
        <p>* 以上信息仅供参考，具体情况请咨询医生</p>
        <p>* 每个人的月经周期可能存在差异</p>
      </div>
    </Card>
  );
}