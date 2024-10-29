import { Card } from "@/components/ui/card";
import { measurementDescriptions, calculationMethods } from '../constants';
import { Ruler } from 'lucide-react';

export default function MeasurementGuide() {
  return (
    <Card className="p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Ruler className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">B超测量指标说明</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {Object.entries(measurementDescriptions).map(([key, item]) => (
          <div
            key={key}
            className="p-4 rounded-lg border hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium group-hover:text-primary transition-colors">
                {item.name}（{key.toUpperCase()}）
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              {item.description}
            </p>
            <p className="text-sm text-primary">
              {item.importance}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">计算方法说明</h3>
        <div className="space-y-4">
          {calculationMethods.map((method, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <h4 className="font-medium text-primary mb-2">{method.name}</h4>
              <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-muted-foreground">准确度：</span>
                <span className="font-medium">{method.accuracy}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm mt-1">
                <span className="text-muted-foreground">所需参数：</span>
                <span className="font-medium">{method.params.join('、')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 text-sm text-muted-foreground space-y-2">
        <p>* B超测量数据单位为毫米(mm)</p>
        <p>* 测量需要由专业医生进行</p>
        <p>* 测量结果会受到胎位、羊水等因素影响</p>
        <p>* 建议在同一家医院进行定期检查，保证数据连续性</p>
      </div>
    </Card>
  );
}