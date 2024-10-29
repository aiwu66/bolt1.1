import { Card } from "@/components/ui/card";
import { Baby } from "lucide-react";

const milestones = [
  {
    stage: "第一孕期（1-13周）",
    description: "胚胎基本器官形成阶段",
    highlights: [
      "8周：心跳可被检测到",
      "12周：胎儿开始有吞咽动作",
      "13周：胎儿指纹开始形成"
    ]
  },
  {
    stage: "第二孕期（14-27周）",
    description: "胎儿快速生长发育阶段",
    highlights: [
      "16周：可能感受到胎动",
      "20周：四维彩超最佳时期",
      "24周：听力开始发育"
    ]
  },
  {
    stage: "第三孕期（28-40周）",
    description: "胎儿完善各器官功能阶段",
    highlights: [
      "28周：眼睛可以睁开",
      "32周：肺部基本发育成熟",
      "37周：胎儿达到足月标准"
    ]
  }
];

export default function MilestoneGuide() {
  return (
    <Card className="p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Baby className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">发育里程碑</h2>
      </div>

      <div className="space-y-8">
        {milestones.map((milestone, index) => (
          <div key={index} className="space-y-3">
            <div>
              <h3 className="font-medium text-primary">{milestone.stage}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {milestone.description}
              </p>
            </div>
            <ul className="list-disc list-inside space-y-2 text-sm">
              {milestone.highlights.map((highlight, highlightIndex) => (
                <li key={highlightIndex}>{highlight}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6 text-sm text-muted-foreground">
        <p>* 每个胎儿的发育进度可能略有不同</p>
        <p>* 如发现异常情况请及时就医</p>
      </div>
    </Card>
  );
}