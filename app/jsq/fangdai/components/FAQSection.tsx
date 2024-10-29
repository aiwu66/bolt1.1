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
    question: "最新房贷政策有哪些变化？",
    answer: `2024年主要政策变化：
1. 首套房贷款利率下调：首套房贷款利率维持在4.2%左右
2. 认定标准放宽：部分城市已将无房但有贷款记录的购房者认定为首套
3. 首付比例：一线城市首套最低30%，二套最低40%
4. 公积金政策：多地放宽公积金贷款条件，提高贷款额度上限
5. 差别化政策：各地可根据实际情况实施差别化住房信贷政策`
  },
  {
    question: "如何选择最适合的贷款方式？",
    answer: `贷款方式的选择建议：
1. 商业贷款：额度高，审批灵活，适合收入稳定、公积金缴存不足的购房者
2. 公积金贷款：利率低（3.1%），但额度受限，适合公积金缴存充足的购房者
3. 组合贷款：结合两种贷款优势，可以降低整体利息支出
4. 使用建议：优先使用公积金贷款额度，不足部分再申请商业贷款`
  },
  {
    question: "等额本息和等额本金有什么区别？",
    answer: `两种还款方式的主要区别：
1. 等额本息：
- 每月还款金额固定
- 前期利息占比大，后期本金占比大
- 适合预算固定、现金流稳定的购房者
- 总利息支出较高

2. 等额本金：
- 每月还款金额递减
- 每月归还等额本金和剩余本金利息
- 前期还款压力大，后期压力逐渐减小
- 总利息支出较少`
  },
  {
    question: "房贷审批需要满足哪些条件？",
    answer: `主要审批条件包括：
1. 个人条件：
- 年龄要求：贷款期限+年龄一般不超过70岁
- 收入要求：月供一般不超过月收入的50%
- 信用记录：征信记录良好，无严重违约

2. 房屋条件：
- 产权清晰，符合抵押条件
- 房龄一般不超过30年
- 需有合法的商品房买卖合同

3. 材料准备：
- 身份证、户口本、婚姻证明
- 收入证明、银行流水
- 房产相关证件和合同`
  },
  {
    question: "提前还款需要注意什么？",
    answer: `提前还款注意事项：
1. 违约金规定：
- 一般在提前还款金额的1%-3%
- 部分银行有免违约金期限限制

2. 还款选择：
- 缩短贷款期限：月供不变，提前结清贷款
- 减少月供：保持还款期限不变，降低月供金额
- 全部结清：一次性结清所有贷款

3. 办理时间：
- 建议在还款日前提前预约
- 准备好足够的还款资金
- 了解银行具体手续和要求`
  },
  {
    question: "如何降低房贷成本？",
    answer: `降低房贷成本的方法：
1. 合理选择贷款方式：
- 充分利用公积金贷款的低利率优势
- 考虑组合贷款降低整体利率

2. 优化还款策略：
- 适当增加首付比例
- 选择等额本金还款方式
- 在经济条件允许时提前还款

3. 把握政策机遇：
- 关注利率调整政策
- 适时申请利率转换
- 把握降息时机办理贷款`
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