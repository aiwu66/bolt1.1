"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Calculator, Calendar, List } from 'lucide-react';
import { DueDateResult } from '../types';
import { formatDate } from '../utils';

interface ResultTabsProps {
  result: DueDateResult;
}

export default function ResultTabs({ result }: ResultTabsProps) {
  return (
    <Card className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-lg font-semibold">计算结果</h2>
      </div>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="summary" className="text-sm sm:text-base">
            <Calculator className="h-4 w-4 mr-2" />
            预产期
          </TabsTrigger>
          <TabsTrigger value="schedule" className="text-sm sm:text-base">
            <Calendar className="h-4 w-4 mr-2" />
            重要日期
          </TabsTrigger>
          <TabsTrigger value="milestones" className="text-sm sm:text-base">
            <List className="h-4 w-4 mr-2" />
            孕期里程碑
          </TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="mt-0">
          <div className="rounded-lg border">
            <div className="p-4">
              <h3 className="text-lg font-medium mb-4">预产期信息</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>预产期</span>
                  <span className="font-medium text-primary">{formatDate(result.dueDate)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>当前孕周</span>
                  <span className="font-medium">{result.gestationalAge.weeks}周{result.gestationalAge.days}天</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>所处孕期</span>
                  <span className="font-medium">{result.trimester}</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="mt-0">
          <div className="rounded-lg border">
            <div className="p-4">
              <h3 className="text-lg font-medium mb-4">重要日期安排</h3>
              <div className="space-y-4">
                {result.milestones.map((milestone, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{milestone.title}</span>
                    <span className="font-medium">{formatDate(milestone.date)}</span>
                  </div>
                ))}
                {result.nextCheckup && (
                  <div className="flex justify-between items-center pt-4 border-t">
                    <span>下次产检日期</span>
                    <span className="font-medium text-primary">{formatDate(result.nextCheckup)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="milestones" className="mt-0">
          <div className="rounded-lg border">
            <div className="p-4">
              <h3 className="text-lg font-medium mb-4">孕期发育里程碑</h3>
              <div className="space-y-6">
                {result.milestones.map((milestone, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">第{milestone.week}周</span>
                      <span className="text-sm text-muted-foreground">{formatDate(milestone.date)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{milestone.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}