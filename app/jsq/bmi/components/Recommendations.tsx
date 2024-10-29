import { Card } from "@/components/ui/card";
import { BMIResult } from '../types';
import { CheckCircle2 } from 'lucide-react';

interface RecommendationsProps {
  result: BMIResult;
}

export default function Recommendations({ result }: RecommendationsProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">健康建议</h3>
        <div className="space-y-4">
          {result.recommendations.map((recommendation, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="rounded-full p-1 bg-primary/10">
                <CheckCircle2 className="h-4 w-4 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">{recommendation}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">注意事项</h3>
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>1. BMI是一个参考指标，不能完全反映身体健康状况</p>
          <p>2. 建议结合体脂率、腰围等其他指标综合评估</p>
          <p>3. 运动员等特殊人群的BMI可能会偏高</p>
          <p>4. 如有健康问题，请咨询专业医生</p>
        </div>
      </Card>

      <div className="text-sm text-muted-foreground space-y-1 p-4 bg-muted/50 rounded-lg">
        <p>* 以上建议仅供参考，不构成医疗建议</p>
        <p>* 建议定期进行体检，关注身体健康</p>
      </div>
    </div>
  );
}