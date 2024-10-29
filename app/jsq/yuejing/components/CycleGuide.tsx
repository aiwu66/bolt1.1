import { Card } from "@/components/ui/card";
import { cycleTypes, commonSymptoms } from '../constants';
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
                  <span className="text-sm font-medium">{type.range}</span>
                  <span className="text-sm text-muted-foreground">{type.description}</span>
                </div>
                <p className="text-xs text-muted-foreground">{type.recommendation}</p>
                {key !== 'irregular' && <div className="border-t my-3" />}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-4">常见症状</h3>
          <div className="space-y-4">
            {commonSymptoms.map((symptom, index) => (
              <div key={index} className="group">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{symptom.type}</span>
                  <span className="text-sm text-muted-foreground">
                    {symptom.levels.join('/')}
                  </span>
                </div>
                <ul className="text-xs text-muted-foreground list-disc list-inside">
                  {symptom.suggestions.map((suggestion, suggestionIndex) => (
                    <li key={suggestionIndex}>{suggestion}</li>
                  ))}
                </ul>
                {index < commonSymptoms.length - 1 && <div className="border-t my-3" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 text-sm text-muted-foreground">
        <p>* 以上信息仅供参考，具体情况请咨询医生</p>
        <p>* 如有异常症状请及时就医</p>
      </div>
    </Card>
  );
}