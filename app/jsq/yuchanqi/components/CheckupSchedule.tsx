import { Card } from "@/components/ui/card";
import { CalendarCheck } from "lucide-react";

const checkups = [
  {
    week: "6-8周",
    items: [
      "确认妊娠",
      "建立孕妇保健手册",
      "首次产前检查"
    ]
  },
  {
    week: "11-13周",
    items: [
      "唐氏筛查",
      "NT超声检查",
      "抽血化验"
    ]
  },
  {
    week: "16-20周",
    items: [
      "四维彩超",
      "血常规检查",
      "尿常规检查"
    ]
  },
  {
    week: "24-28周",
    items: [
      "糖耐量测试",
      "乙肝检查",
      "血压监测"
    ]
  },
  {
    week: "32周后",
    items: [
      "每两周产检一次",
      "胎心监护",
      "宫高、腹围测量"
    ]
  },
  {
    week: "37周后",
    items: [
      "每周产检一次",
      "评估分娩方式",
      "待产准备指导"
    ]
  }
];

export default function CheckupSchedule() {
  return (
    <Card className="p-6">
      <div className="flex items-center space-x-2 mb-6">
        <CalendarCheck className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">产检时间表</h2>
      </div>

      <div className="space-y-6">
        {checkups.map((checkup, index) => (
          <div key={index} className="space-y-2">
            <h3 className="font-medium text-primary">{checkup.week}</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {checkup.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6 text-sm text-muted-foreground">
        <p>* 以上产检时间安排仅供参考，具体请遵医嘱</p>
        <p>* 如有特殊情况，需按医生建议调整检查频率</p>
      </div>
    </Card>
  );
}