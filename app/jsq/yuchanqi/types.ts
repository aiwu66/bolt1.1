export interface DueDateResult {
  dueDate: Date;
  gestationalAge: {
    weeks: number;
    days: number;
  };
  trimester: string;
  milestones: Milestone[];
  nextCheckup?: Date;
}

export interface Milestone {
  date: Date;
  week: number;
  title: string;
  description: string;
  category: 'development' | 'checkup' | 'preparation';
}