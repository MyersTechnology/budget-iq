
export type GoalCategory = 
  | 'emergency_fund' 
  | 'house_down_payment' 
  | 'debt_payoff' 
  | 'vacation' 
  | 'retirement' 
  | 'education' 
  | 'car' 
  | 'wedding' 
  | 'other';

export type GoalStatus = 'active' | 'achieved' | 'paused';

export type GoalPriority = 'high' | 'medium' | 'low';

export type ContributionFrequency = 'weekly' | 'biweekly' | 'monthly';

export interface FinancialGoal {
  id: string;
  name: string;
  category: GoalCategory;
  targetAmount: number;
  currentAmount: number;
  createdAt: string;
  targetDate: string | null;
  priority: GoalPriority;
  status: GoalStatus;
  contributionFrequency: ContributionFrequency;
  contributionAmount: number;
  autoAdjust: boolean;
  notes?: string;
}

export interface GoalInsight {
  id: string;
  title: string;
  description: string;
  type: 'info' | 'warning' | 'success';
  action?: string;
  goalId?: string;
}

export interface GoalsDataSummary {
  totalTargetAmount: number;
  totalCurrentAmount: number;
  totalContributionsMonthly: number;
  highestPriorityGoal: FinancialGoal | null;
  nextMilestoneGoal: FinancialGoal | null;
  averageCompletion: number; // percentage
}

export interface GoalsData {
  goals: FinancialGoal[];
  insights: GoalInsight[];
  summary: GoalsDataSummary;
}
