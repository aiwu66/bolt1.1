import { Card } from '@/components/ui/card';
import { deductionExplanations } from '../constants';
import { Info } from 'lucide-react';

export default function DeductionGuide() {
  return (
    <Card className="p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Info className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">专项附加扣除说明</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {Object.entries(deductionExplanations).map(([key, item]) => (
          <div
            key={key}
            className="p-4 rounded-lg border hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <span className="text-sm font-medium text-primary">
                {item.amount > 0 ? `${item.amount}元/月` : '据实扣除'}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 text-sm text-muted-foreground space-y-2">
        <p>* 专项附加扣除需要在单位进行专项附加扣除信息采集</p>
        <p>* 部分扣除项目可能需要提供相关证明材料</p>
        <p>* 扣除标准可能会根据国家政策调整</p>
      </div>
    </Card>
  );
}