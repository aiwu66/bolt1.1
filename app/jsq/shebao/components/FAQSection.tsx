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
1. 养老保险：个人缴纳8%，单位缴纳16%
2. 医疗保险：个人缴纳2%+3元，单位缴纳6.5%-9.5%
3. 失业保险：个人缴纳0.5%，单位缴纳0.5%
4. 工伤保险：单位缴纳0.2%-0.5%
5. 生育保险：单位缴纳0.5%-0.8%
6. 住房公积金：个人和单位各缴纳5%-12%`
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
    question: "公积金比例如何选择？",
    answer: `公积金缴存比例选择建议：
1. 一般范围：5%-12%
2. 建议选择最高比例12%，因为：
   - 可以减少个人所得税
   - 提高公积金账户余额
   - 增加未来可贷款额度
3. 具体比例需要遵循当地政策`
  },
  {
    question: "五险一金可以自己缴纳吗？",
    answer: `五险一金缴纳规定：
1. 养老保险：可以个人缴纳
2. 医疗保险：可以个人缴纳
3. 失业保险：需要单位参与
4. 工伤保险：需要单位参与
5. 生育保险：需要单位参与
6. 住房公积金：需要单位参与`
  },
  {
    question: "五险一金的好处有哪些？",
    answer: `主要好处包括：
1. 养老保障：退休后可以领取养老金
2. 医疗保障：报销医疗费用
3. 失业保障：失业期间可以领取失业金
4. 住房保障：可以申请住房公积金贷款
5. 税收优惠：五险一金可以在个税前扣除
6. 其他福利：工伤保险和生育保险保障`
  },
  {
    question: "漏缴五险一金怎么办？",
    answer: `处理方法：
1. 及时与单位沟通补缴事宜
2. 查看本地社保部门的补缴政策
3. 注意补缴的时效性限制
4. 必要时可以：
   - 向劳动监察部门投诉
   - 申请劳动仲裁
   - 收集相关证据`
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