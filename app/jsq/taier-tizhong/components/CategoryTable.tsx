import { Card } from "@/components/ui/card";
import { weightCategories } from '../constants';

export default function CategoryTable() {
  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium mb-4">胎儿体重分类标准</h3>
      <div className="space-y-4">
        {weightCategories.map((category, index) => (
          <div key={index} className="group">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">{category.category}</span>
              <span className="text-sm text-muted-foreground">{category.range}</span>
            </div>
            <p className="text-xs text-muted-foreground">{category.description}</p>
            <p className="text-xs text-muted-foreground mt-1">{category.risk}</p>
            {index < weightCategories.length - 1 && <div className="border-t my-3" />}
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-4">
        * 参考WHO胎儿生长标准
      </p>
    </Card>
  );
}