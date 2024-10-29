import { formatCurrency } from '../utils';
import { LoanResult } from '../types';
import { Card } from '@/components/ui/card';
import { ArrowDown, ArrowRight, Wallet, PiggyBank, Calculator } from 'lucide-react';

interface ResultSummaryProps {
  result: LoanResult;
}

export default function ResultSummary({ result }: ResultSummaryProps) {
  const summaryItems = [
    { 
      label: '月供',
      value: result.monthlyPayment,
      icon: Calculator,
      description: '每月需要支付的金额'
    },
    { 
      label: '贷款总额',
      value: result.loanAmount,
      icon: Wallet,
      description: '银行实际贷款金额'
    },
    { 
      label: '支付利息',
      value: result.totalInterest,
      icon: ArrowRight,
      description: '贷款期限内支付的总利息'
    },
    { 
      label: '还款总额',
      value: result.totalPayment,
      icon: ArrowDown,
      description: '本金和利息总和'
    },
    { 
      label: '首付金额',
      value: result.downPayment,
      icon: PiggyBank,
      description: '购房时需要支付的首付款'
    },
    { 
      label: '房屋总价',
      value: result.totalPrice,
      icon: Wallet,
      description: '房屋实际售价'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {summaryItems.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.label}
              className="p-4 hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex items-start space-x-3">
                <div className="rounded-lg p-2 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">{item.label}</div>
                  <div className="text-lg font-bold text-primary group-hover:text-primary/90">
                    {formatCurrency(item.value)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {item.description}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      
      <div className="text-sm text-muted-foreground space-y-1 p-4 bg-muted/50 rounded-lg">
        <p>* 以上结果仅供参考，实际金额以银行审批为准</p>
        <p>* 未包含房屋保险、税费等其他支出</p>
        <p>* 实际月供可能会因银行具体政策略有差异</p>
      </div>
    </div>
  );
}