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
    question: "如何计算个人所得税？",
    answer: `个人所得税计算步骤：
1. 计算应纳税所得额 = 工资收入 - 社保公积金 - 起征点(5000元) - 专项附加扣除
2. 查找适用税率和速算扣除数
3. 计算应纳税额 = 应纳税所得额 × 适用税率 - 速算扣除数`
  },
  {
    question: "专项附加扣除包括哪些项目？",
    answer: `目前的专项附加扣除项目：
1. 子女教育：每个子女1000元/月
2. 继续教育：学历教育400元/月
3. 住房贷款利息：1000元/月
4. 住房租金：根据城市不同1000-1500元/月
5. 赡养老人：独生子女2000元/月
6. 3岁以下婴幼儿照护：每个婴幼儿1000元/月`
  },
  {
    question: "社保公积金如何缴纳？",
    answer: `社保公积金缴纳说明：
1. 缴费基数：一般以上年度月平均工资为基数
2. 缴费比例：
   - 养老保险：个人8%
   - 医疗保险：个人2%+3元
   - 失业保险：个人0.5%
   - 住房公积金：一般12%
3. 缴费基数有上下限，具体标准各地不同`
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
    question: "如何办理专项附加扣除？",
    answer: `办理步骤：
1. 在单位财务部门填报相关信息
2. 通过个人所得税APP填报
3. 通过网上税务局填报
4. 到税务局现场办理
注意：首次填报后次月生效，信息发生变化要及时更新`
  },
  {
    question: "年度汇算清缴是什么？",
    answer: `年度汇算清缴说明：
1. 时间：次年3月1日至6月30日
2. 情形：
   - 年度内任职受雇从两处以上取得工资薪金
   - 有需要补充扣除的项目
   - 年度中间就业或离职
3. 方式：可通过个人所得税APP、网上税务局办理`
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