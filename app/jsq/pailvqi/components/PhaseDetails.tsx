import { Card } from "@/components/ui/card";
import { OvulationResult } from '../types';
import { cyclePhases } from '../constants';
import { formatDate } from '../utils';

interface PhaseDetailsProps {
  result: OvulationResult;
}

export default function PhaseDetails({ result }: PhaseDetailsProps) {
  return (
    <div className="space-y-6">
      {cyclePhases.map((phase, index) => (
        <Card 
          key={index}
          className={`p-6 ${result.currentPhase === phase.name ? 'border-primary' : ''}`}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-medium text-lg">{phase.name}</h3>
              <p className="text-sm text-muted-foreground">持续时间：{phase.duration}</p>
            </div>
            {result.currentPhase === phase.name && (
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                当前阶段
              </span>
            )}
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            {phase.description}
          </p>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">注意事项</h4>
              <ul className="list-disc list-inside space-y-1">
                {phase.tips.map((tip, tipIndex) => (
                  <li key={tipIndex} className="text-sm text-muted-foreground">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      ))}

      <div className="text-sm text-muted-foreground space-y-1 p-4 bg-muted/50 rounded-lg">
        <p>* 每个阶段的持续时间可能因人而异</p>
        <p>* 如有不适症状请及时就医</p>
        <p>* 保持规律作息有助于月经周期稳定</p>
      </div>
    </div>
  );
}