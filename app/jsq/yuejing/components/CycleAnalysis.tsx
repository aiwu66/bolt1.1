import { Card } from "@/components/ui/card";
import { MenstrualResult } from '../types';
import { cycleTypes, commonSymptoms } from '../constants';

interface CycleAnalysisProps {
  result: MenstrualResult;
}

export default function CycleAnalysis({ result }: CycleAnalysisProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">周期分析</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium">周期规律性</p>
              <p className="text-sm text-muted-foreground mt-1">
                {result.cycleAnalysis.regularity}
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium">{result.cycleLength}天</p>
              <p className="text-sm text-muted-foreground mt-1">周期长度</p>
            </div>
          </div>
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              {result.cycleAnalysis.recommendation}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">健康建议</h3>
        <div className="space-y-4">
          <div className="rounded-lg bg-primary/5 p-4">
            <h4 className="font-medium mb-2">经期注意事项</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• 注意个人卫生，勤换卫生用品</li>
              <li>• 避免剧烈运动和游泳</li>
              <li>• 注意保暖，避免着凉</li>
              <li>• 适当休息，避免熬夜</li>
            </ul>
          </div>

          <div className="rounded-lg bg-primary/5 p-4">
            <h4 className="font-medium mb-2">日常保健建议</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• 保持规律作息，避免熬夜</li>
              <li>• 均衡饮食，补充铁质和蛋白质</li>
              <li>• 适量运动，保持心情愉悦</li>
              <li>• 定期进行妇科检查</li>
            </ul>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">异常情况警示</h3>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            如果出现以下情况，建议及时就医：
          </p>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• 月经周期紊乱或不规则</li>
            <li>• 经期出血量异常（过多或过少）</li>
            <li>• 经期持续时间异常（过长或过短）</li>
            <li>• 剧烈痛经或其他异常症状</li>
            <li>• 非经期出血或点滴出血</li>
          </ul>
        </div>
      </Card>

      <div className="text-sm text-muted-foreground space-y-1 p-4 bg-muted/50 rounded-lg">
        <p>* 以上分析和建议仅供参考</p>
        <p>* 每个人的情况可能不同，建议根据自身情况调整</p>
        <p>* 如有疑问或不适，请及时就医咨询</p>
      </div>
    </div>
  );
}