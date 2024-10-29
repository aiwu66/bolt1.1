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
    question: "五险一金包括哪些项目？",
    answer: `五险一金包括：
1. 养老保险：个人缴纳8%
2. 医疗保险：个人缴纳2%+3元
3. 失业保险：个人缴纳0.5%
4. 工伤保险：由企业承担
5. 生育保险：由企业承担
6. 住房公积金：一般12%，具体比例各地不同`
  },
  {
    question: "专项附加扣除如何计算？",
    answer: `主要专项附加扣除项目：
1. 子女教育：每个子女1000元/月
2. 继续教育：学历教育400元/月
3. 住房贷款利息：1000元/月
4. 住房租金：根据城市不同1000-1500元/月
5. 赡养老人：独生子女2000元/月
6. 3岁以下婴幼儿照护：每个婴幼儿1000元/月`
  },
  {
    question: "社保基数如何确定？",
    answer: `社保基数确定方法：
1. 一般以上年度月平均工资为基数
2. 有上下限要求：
   - 下限：当地最低工资标准
   - 上限：当地平均工资的3倍
3. 新入职员工第一年一般以签订劳动合同时约定的工资为基数`
  },
  {
    question: "年终奖如何计税？",
    answer: `年终奖计税方式：
1. 单独计税法：年终奖÷12=月平均收入
2. 按月平均收入找对应税率和速算扣除数
3. 年终奖×适用税率-速算扣除数=应纳税额
4. 2024年起部分地区可以选择并入综合所得计税`
  },
  {
    question: "工资条各项明细代表什么？",
    answer: `工资条主要组成：
1. 应发工资：基本工资+岗位工资+绩效+补贴等
2. 应扣项目：
   - 个人所得税
   - 养老保险
   - 医疗保险
   - 失业保险
   - 住房公积金
3. 实发工资：应发工资-应扣项目`
  },
  {
    question: "如何优化税后收入？",
    answer: `优化建议：
1. 合理使用专项附加扣除
2. 了解公积金缴存比例政策
3. 合理安排年终奖发放
4. 利用税收优惠政策
5. 商业保险抵扣政策
6. 企业福利的税收筹划`
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