import { Card } from "@/components/ui/card";
import { FetalWeightResult } from '../types';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface RecommendationsProps {
  result: FetalWeightResult;
}

export default function Recommendations({ result }: RecommendationsProps) {
  const needsAttention = result.category !== '正常';

  return (
    <div className="space-y-6">
      {needsAttention && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            胎儿体重{result.category}，建议遵医嘱进行更频繁的产检监测
          </AlertDescription>
        </Alert>
      )}

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">医生建议</h3>
        <div className="space-y-4">
          {result.recommendations.map((recommendation, index) => (
            <div key={index} className="flex items-start items-start space-x-3">
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
          <p>1. B超测量存在一定误差，实际体重可能有所偏差</p>
          <p>2. 胎儿体重受多种因素影响，需要定期监测变化趋势</p>
          <p>3. 不同B超仪器和操作者可能得出不同的测量结果</p>
          <p>4. 如有异常情况，请及时就医咨询</p>
        </div>
      </Card>

      <div className="text-sm text-muted-foreground space-y-1 p-4 bg-muted/50 rounded-lg">
        <p>* 以上建议仅供参考，不构成医疗建议</p>
        <p>* 建议遵医嘱进行规律产检</p>
      </div>
    </div>
  );
}