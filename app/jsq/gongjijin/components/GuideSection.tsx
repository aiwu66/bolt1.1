import { Card } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export default function GuideSection() {
  const guides = [
    {
      title: '填写基本信息',
      content: '输入贷款金额、选择贷款期限等基本信息。'
    },
    {
      title: '确认贷款利率',
      content: '公积金贷款利率为3.1%，可根据实际情况调整。'
    },
    {
      title: '选择还款方式',
      content: '可选择等额本息或等额本金两种还款方式。'
    },
    {
      title: '查看计算结果',
      content: '系统会自动计算月供、总利息等详细信息。'
    }
  ];

  return (
    <Card className="p-6 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <FileText className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">使用指南</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {guides.map((guide, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors"
          >
            <div className="flex items-center space-x-2 mb-2">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">
                {index + 1}
              </span>
              <h3 className="font-medium">{guide.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{guide.content}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}