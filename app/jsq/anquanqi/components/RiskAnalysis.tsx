import { Card } from "@/components/ui/card";
import { SafePeriodResult } from '../types';
import { contraceptiveMethods } from '../constants';
import { AlertTriangle, ShieldAlert, Info } from 'lucide-react';

interface RiskAnalysisProps {
  result: SafePeriodResult;
}

export default function RiskAnalysis({ result }: RiskAnalysisProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <h3 className="text-lg font-medium">可靠性分析</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">可靠性评分</span>
            <span className={`text-lg font-bold ${
              result.reliability.score < 70 ? 'text-destructive' : 'text-primary'
            }`}>
              {result.reliability.score}%
            </span>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium">影响因素：</h4>
            <ul className="space-y-2">
              {result.reliability.factors.map((factor, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-center space-x-2">
                  <ShieldAlert className="h-4 w-4 text-destructive shrink-0" />
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Info className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">建议避孕方式</h3>
        </div>
        <div className="space-y-4">
          {contraceptiveMethods.map((method, index) => (
            <div key={index} className="group">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{method.name}</span>
                <span className="text-sm text-primary">{method.reliability}</span>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>
                  <span className="text-primary">优点：</span>
                  {method.advantages.join('、')}
                </div>
                <div>
                  <span className="text-destructive">缺点：</span>
                  {method.disadvantages.join('、')}
                </div>
              </div>
              {index < contraceptiveMethods.length - 1 && <div className="border-t my-4" />}
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <h3 className="text-lg font-medium">专家建议</h3>
        </div>
        <div className="space-y-4">
          {result.reliability.recommendations.map((recommendation, index) => (
            <p key={index} className="text-sm text-muted-foreground">
              {recommendation}
            </p>
          ))}
        </div>
      </Card>

      <div className="text-sm text-destructive space-y-1 p-4 bg-destructive/5 rounded-lg">
        <p>* 安全期避孕法的失败率高达20-25%</p>
        <p>* 建议在医生指导下选择科学的避孕方式</p>
        <p>* 如有任何疑问，请及时咨询医生</p>
      </div>
    </div>
  );
}