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
    question: "定期存款和活期存款有什么区别？",
    answer: `主要区别：
1. 存期限制：
   - 定期存款有固定期限，提前支取会降低利率
   - 活期存款可随存随取，无期限限制
2. 利率水平：
   - 定期存款利率较高
   - 活期存款利率较低
3. 计息方式：
   - 定期存款到期还本付息
   - 活期存款按日计息`
  },
  {
    question: "协议存款是什么？",
    answer: `协议存款特点：
1. 存款期限由存款人与银行协商确定
2. 存款利率在基准利率基础上浮动
3. 通常金额较大
4. 可以约定提前支取条件
5. 一般按月付息`
  },
  {
    question: "存款利息如何计算？",
    answer: `计算方法：
1. 活期存款：本金×日利率×天数
2. 定期存款：本金×年利率×存期
3. 协议存款：本金×约定利率×存期

注意：
- 活期按日计息
- 定期到期还本付息
- 协议存款可按月付息`
  },
  {
    question: "提前支取定期存款怎么办？",
    answer: `提前支取说明：
1. 按照活期利率计算已存天数利息
2. 可能损失部分利息收益
3. 建议：
   - 合理安排存款期限
   - 预留部分活期资金
   - 考虑分散存放`
  },
  {
    question: "存款利息要交税吗？",
    answer: `存款利息税收规定：
1. 目前执行20%的利息税率
2. 由银行代扣代缴
3. 计算公式：应缴税额 = 利息收入×20%
4. 特殊情况：
   - 某些特殊存款产品可能免税
   - 具体以银行规定为准`
  },
  {
    question: "如何获得更高的存款收益？",
    answer: `提高收益建议：
1. 合理搭配不同期限存款
2. 关注银行优惠活动
3. 考虑协议存款等高息产品
4. 利用定期存款阶梯式安排
5. 合理利用通知存款
6. 注意把握市场利率变化`
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