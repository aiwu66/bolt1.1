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
    question: "车辆购置税如何计算？",
    answer: `计算方法：
1. 计税价格 = 不含增值税价格 + 其他费用
2. 购置税 = 计税价格 × 税率（10%）
3. 特殊情况：
   - 新能源汽车免征购置税
   - 部分特殊用途车辆可能享受优惠政策`
  },
  {
    question: "哪些费用计入购置税计税价格？",
    answer: `计入购置税计税价格的费用：
1. 车辆基础价格（不含增值税）
2. 随车工具和配件价格
3. 运输费用
4. 保险费用不计入
5. 上牌费用不计入
6. 其他不计入项目：
   - 加装设备费用
   - 延保服务费用`
  },
  {
    question: "新能源汽车是否需要缴纳购置税？",
    answer: `新能源汽车购置税政策：
1. 纯电动汽车免征购置税
2. 插电式混合动力汽车免征购置税
3. 燃料电池汽车免征购置税
4. 需要满足工信部《免征车辆购置税的新能源汽车车型目录》要求
5. 政策有效期可能会调整，请关注最新政策`
  },
  {
    question: "购车时还需要缴纳哪些费用？",
    answer: `购车相关费用：
1. 必缴费用：
   - 车辆购置税
   - 上牌费用
   - 交强险
   - 车船税
2. 可选费用：
   - 商业保险
   - 延保服务
   - 加装配件
3. 其他费用：
   - 临时牌照费
   - 环保检测费`
  },
  {
    question: "购置税可以退还吗？",
    answer: `购置税退还规定：
1. 符合退税条件：
   - 车辆退车
   - 车辆质量问题换车
   - 车辆未上牌注册
2. 退税流程：
   - 准备相关证明材料
   - 向税务机关申请
   - 审核通过后退还
3. 注意事项：
   - 需要在规定时间内申请
   - 保管好相关单据`
  },
  {
    question: "增值税发票如何识别？",
    answer: `增值税发票识别要点：
1. 发票类型：
   - 增值税专用发票
   - 增值税普通发票
2. 税率标识：
   - 一般为13%
   - 明确标注税额
3. 注意事项：
   - 检查发票真伪
   - 核对金额准确性
   - 保存好原件`
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