import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from '@/components/ui/card';

const faqs = [
  {
    question: '商业贷款利率是如何确定的？',
    answer: '商业贷款利率主要参考人民银行公布的贷款市场报价利率(LPR)。目前执行"LPR+基点"的定价方式，具体利率会根据借款人的信用状况、抵押物情况等因素进行适当调整。'
  },
  {
    question: '等额本息和等额本金有什么区别？',
    answer: '等额本息是每月还款金额固定，前期支付的利息较多；等额本金是每月本金固定，利息逐月递减，总支付利息较等额本息少，但前期月供较高。'
  },
  {
    question: '商业贷款需要哪些条件？',
    answer: '一般需要：1. 具有稳定收入来源；2. 良好的个人信用记录；3. 符合年龄要求（一般22-65岁）；4. 具有合法有效的抵押物；5. 收入与月供比例适当。'
  },
  {
    question: '提前还款有什么影响？',
    answer: '提前还款可以减少利息支出，但可能需要支付违约金（一般是提前还款金额的一定比例）。建议在签订贷款合同时详细了解提前还款的相关条款。'
  },
  {
    question: '贷款年限如何选择？',
    answer: '贷款年限的选择需要考虑：1. 月供承受能力；2. 总利息支出；3. 个人职业发展规划；4. 年龄限制。一般来说，年限越长月供越低，但总利息越高。'
  },
  {
    question: '最新的商业贷款政策有哪些？',
    answer: '2024年主要政策：1. 继续执行"认房认贷"政策；2. 差别化住房信贷政策；3. 优化首套房贷款政策；4. 支持改善性住房需求。具体政策可能因地区不同有所调整。'
  }
];

export default function FAQSection() {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">常见问题</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
}