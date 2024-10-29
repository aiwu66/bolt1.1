"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "车贷利率是如何确定的？",
    answer: `车贷利率主要由以下因素决定：
1. 贷款类型：银行贷款、厂商金融、其他金融机构
2. 贷款期限：一般期限越长，利率越高
3. 首付比例：首付比例越高，利率可能更优惠
4. 个人信用：良好的信用记录可获得更优惠利率
5. 车辆类型：新车、二手车利率会有所不同`
  },
  {
    question: "首付比例如何选择？",
    answer: `首付比例的选择建议：
1. 最低要求：一般不低于20%
2. 建议比例：30%-40%较为合适
3. 考虑因素：
   - 个人资金状况
   - 月供承受能力
   - 贷款利率差异
   - 车辆折旧情况`
  },
  {
    question: "车贷期限怎么定？",
    answer: `车贷期限选择的关键点：
1. 一般选择：12-60个月不等
2. 建议原则：
   - 新车建议不超过5年
   - 二手车建议不超过3年
   - 要考虑车辆折旧速度
   - 结合个人收入情况`
  },
  {
    question: "车贷需要什么条件？",
    answer: `申请车贷的基本条件：
1. 年龄要求：一般22-55岁
2. 收入要求：月收入通常要求为月供的2-3倍
3. 信用记录：良好的个人征信记录
4. 工作要求：稳定工作，一般要求工作满6个月以上
5. 材料准备：
   - 身份证、户口本
   - 收入证明、银行流水
   - 购车合同、车辆发票`
  },
  {
    question: "如何降低车贷成本？",
    answer: `降低车贷成本的方法：
1. 提高首付比例
2. 选择合适的贷款期限
3. 货比三家，寻找最优利率
4. 考虑厂商金融优惠政策
5. 合理选择还款方式
6. 适时考虑提前还款
7. 注意各项手续费用`
  },
  {
    question: "提前还款注意事项",
    answer: `提前还款需要注意：
1. 违约金规定：一般为提前还款金额的一定比例
2. 提前还款时间：建议在还款日前办理
3. 还款方式：
   - 一次性结清
   - 部分提前还款
   - 缩短还款期限
   - 降低月供金额
4. 办理流程：提前与银行沟通具体要求`
  }
];

export default function FAQSection() {
  return (
    <Card className="p-6">
      <div className="flex items-center space-x-2 mb-6">
        <HelpCircle className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">常见问题</h2>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground whitespace-pre-line">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
}