import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BMIResult } from '../types';
import { bmiCategories } from '../constants';

interface ResultChartProps {
  result: BMIResult;
}

export default function ResultChart({ result }: ResultChartProps) {
  // 创建BMI范围数据
  const data = bmiCategories.map(category => {
    const [min, max] = category.range.replace('≥', '').replace('<', '').split('-').map(Number);
    return {
      category: category.category,
      min: min || 0,
      max: max || 35,
      current: result.bmi >= (min || 0) && result.bmi <= (max || 35) ? result.bmi : null
    };
  });

  return (
    <div className="space-y-6">
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis domain={[0, 35]} />
            <Tooltip />
            <Bar dataKey="max" fill="#e5e7eb" name="BMI范围" />
            <Bar dataKey="current" fill="#2563eb" name="当前BMI" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">BMI分布</h4>
          <div className="text-sm text-muted-foreground">
            <p>偏瘦：{'<'} 18.5</p>
            <p>正常：18.5 - 23.9</p>
            <p>超重：24.0 - 27.9</p>
            <p>肥胖：≥ 28.0</p>
          </div>
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-medium">您的BMI</h4>
          <div className="text-sm">
            <p className="text-primary font-medium">{result.bmi}</p>
            <p className="text-muted-foreground mt-1">
              属于{result.category}范围
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}