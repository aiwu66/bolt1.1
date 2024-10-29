import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowDownToLine } from 'lucide-react';
import { CommercialLoanParams } from './CalculatorForm';

interface ExamplesSectionProps {
  onImport: (params: CommercialLoanParams) => void;
}

const examples: Array<{
  title: string;
  description: string;
  params: CommercialLoanParams;
}> = [
  {
    title: '首套房商贷',
    description: '30年期等额本息还款',
    params: {
      loanAmount: '1000000',
      loanTerm: '30',
      interestRate: '4.2',
      paymentMethod: 'equal-payment'
    }
  },
  {
    title: '短期商贷',
    description: '10年期等额本金还款',
    params: {
      loanAmount: '500000',
      loanTerm: '10',
      interestRate: '4.0',
      paymentMethod: 'equal-principal'
    }
  },
  {
    title: '中期商贷',
    description: '20年期等额本息还款',
    params: {
      loanAmount: '800000',
      loanTerm: '20',
      interestRate: '4.1',
      paymentMethod: 'equal-payment'
    }
  }
];

export default function ExamplesSection({ onImport }: ExamplesSectionProps) {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">计算案例</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {examples.map((example, index) => (
          <Card
            key={index}
            className="p-4 hover:shadow-md transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">{example.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {example.description}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onImport(example.params)}
              >
                <ArrowDownToLine className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-1 text-sm">
              <p>贷款金额：{parseInt(example.params.loanAmount).toLocaleString()}元</p>
              <p>贷款期限：{example.params.loanTerm}年</p>
              <p>贷款利率：{example.params.interestRate}%</p>
              <p>还款方式：{example.params.paymentMethod === 'equal-payment' ? '等额本息' : '等额本金'}</p>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
}