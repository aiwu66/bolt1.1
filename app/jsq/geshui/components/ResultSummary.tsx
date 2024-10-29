"use client";

import { Card } from "@/components/ui/card";
import { TaxResult } from '../types';
import { formatCurrency } from '../utils';
import { 
  Calculator, 
  Wallet, 
  PiggyBank, 
  ArrowDownToLine,
  Building2
} from 'lucide-react';

interface ResultSummaryProps {
  result: TaxResult;
}

export default function ResultSummary({ result }: ResultSummaryProps) {
  if (!result) {
    return null;
  }

  if (result.type === "monthly" && result.monthlyDetails) {
    const { grossIncome, socialInsurance, specialDeductions, taxAmount, netIncome } = result.monthlyDetails;
    
    if (!grossIncome || !socialInsurance || !taxAmount || !netIncome) {
      return null;
    }

    const summaryCards = [
      {
        title: "税前收入",
        value: grossIncome,
        icon: Wallet,
        description: "月度总收入"
      },
      {
        title: "应纳税额",
        value: taxAmount,
        icon: Calculator,
        description: "当月应缴个税"
      },
      {
        title: "税后收入",
        value: netIncome,
        icon: PiggyBank,
        description: "实际到手收入"
      }
    ];

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {summaryCards.map((card) => {
            const Icon = card.icon;
            return (
              <Card key={card.title} className="p-4 hover:shadow-md transition-all duration-300">
                <div className="flex items-start space-x-3">
                  <div className="rounded-lg p-2 bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{card.title}</div>
                    <div className="text-lg font-bold text-primary">
                      {formatCurrency(card.value)}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {card.description}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {socialInsurance && (
          <Card className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Building2 className="h-4 w-4 text-primary" />
              <h3 className="font-medium">社保公积金缴纳明细</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">养老保险</span>
                <span>{formatCurrency(socialInsurance.pension)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">医疗保险</span>
                <span>{formatCurrency(socialInsurance.medical)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">失业保险</span>
                <span>{formatCurrency(socialInsurance.unemployment)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">住房公积金</span>
                <span>{formatCurrency(socialInsurance.housingFund)}</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t">
                <span>合计</span>
                <span>{formatCurrency(socialInsurance.total)}</span>
              </div>
            </div>
          </Card>
        )}

        {specialDeductions && specialDeductions.total > 0 && (
          <Card className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <ArrowDownToLine className="h-4 w-4 text-primary" />
              <h3 className="font-medium">专项附加扣除</h3>
            </div>
            <div className="space-y-2">
              {Object.entries(specialDeductions).map(([key, value]) => {
                if (key !== 'total' && value > 0) {
                  return (
                    <div key={key} className="flex justify-between">
                      <span className="text-muted-foreground">{key}</span>
                      <span>{formatCurrency(value)}</span>
                    </div>
                  );
                }
                return null;
              })}
              <div className="flex justify-between font-medium pt-2 border-t">
                <span>合计</span>
                <span>{formatCurrency(specialDeductions.total)}</span>
              </div>
            </div>
          </Card>
        )}
      </div>
    );
  }

  if (result.type === "annual" && result.annualDetails) {
    const { totalIncome, totalDeductions, calculatedTax, paidTax, taxDifference } = result.annualDetails;
    
    if (!totalIncome || !calculatedTax || typeof taxDifference === 'undefined') {
      return null;
    }

    const summaryCards = [
      {
        title: "年度收入总额",
        value: totalIncome,
        icon: Wallet,
        description: "全年总收入"
      },
      {
        title: "年度应纳税额",
        value: calculatedTax,
        icon: Calculator,
        description: "全年应缴个税"
      },
      {
        title: taxDifference > 0 ? "需补缴税额" : "应退税额",
        value: Math.abs(taxDifference),
        icon: PiggyBank,
        description: taxDifference > 0 ? "汇算需补缴金额" : "汇算应退还金额"
      }
    ];

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {summaryCards.map((card) => {
            const Icon = card.icon;
            return (
              <Card key={card.title} className="p-4 hover:shadow-md transition-all duration-300">
                <div className="flex items-start space-x-3">
                  <div className="rounded-lg p-2 bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{card.title}</div>
                    <div className="text-lg font-bold text-primary">
                      {formatCurrency(card.value)}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {card.description}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Calculator className="h-4 w-4 text-primary" />
            <h3 className="font-medium">年度税收相关明细</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">已预缴税额</span>
              <span>{formatCurrency(paidTax || 0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">总扣除金额</span>
              <span>{formatCurrency(totalDeductions || 0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">应纳税所得额</span>
              <span>{formatCurrency((totalIncome || 0) - (totalDeductions || 0))}</span>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return null;
}