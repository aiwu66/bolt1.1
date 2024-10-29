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
    question: "公积金贷款有什么优势？",
    answer: `公积金贷款的主要优势：
1. 利率低：目前执行3.1%的基准利率
2. 还款压力小：月供相对商业贷款更低
3. 使用自己的公积金：充分利用个人账户资金
4. 可以提前还款：一般无违约金
5. 贷款成本低：手续费较少`
  },
  {
    question: "如何申请公积金贷款？",
    answer: `申请公积金贷款的基本步骤：
1. 准备材料：
   - 身份证、户口本
   - 购房合同、发票
   - 公积金缴存证明
2. 确认资格：
   - 连续缴存时间要求
   - 月缴存额度要求
3. 提交申请：
   - 到公积金中心或线上申请
   - 等待审批结果
4. 签订合同：
   - 确认贷款金额和期限
   - 签署相关文件`
  },
  {
    question: "公积金贷款额度如何计算？",
    answer: `贷款额度计算因素：
1. 个人月收入
2. 公积金账户余额
3. 月缴存额度
4. 家庭总收入
5. 房屋总价
6. 地区政策限制

一般计算方式：
- 最高额度=月缴存额×贷款倍数
- 具体额度还需考虑房价限制`
  },
  {
    question: "公积金贷款期限如何选择？",
    answer: `贷款期限选择建议：
1. 考虑因素：
   - 年龄限制（贷款期限+年龄≤65岁）
   - 还款能力
   - 总利息支出
   - 月供压力

2. 常见期限：
   - 短期：5-10年
   - 中期：15-20年
   - 长期：25-30年`
  },
  {
    question: "提前还款注意事项",
    answer: `提前还款需要注意：
1. 提前还款时间：
   - 一般在还款日前办理
   - 提前预约办理时间

2. 还款方式：
   - 部分提前还款
   - 一次性结清
   - 缩短还款期限
   - 降低月供金额

3. 办理材料：
   - 身份证件
   - 公积金联名卡
   - 贷款合同`
  },
  {
    question: "公积金贷款政策变化",
    answer: `2024年主要政策变化：
1. 首套房认定标准放宽
2. 部分城市提高贷款额度上限
3. 异地公积金贷款便利化
4. 提取政策优化
5. 部分城市实施差异化政策

建议及时关注当地公积金中心政策更新`
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