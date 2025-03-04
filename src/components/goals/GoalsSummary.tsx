
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { GoalsData } from '@/types/goals';
import { formatCurrency } from '@/utils/transactions';
import { Goal, TrendingUp, Clock, PiggyBank } from 'lucide-react';

interface GoalsSummaryProps {
  data: GoalsData | null;
}

export const GoalsSummary = ({ data }: GoalsSummaryProps) => {
  if (!data) return null;
  
  const { summary } = data;
  const totalProgress = summary.totalTargetAmount > 0 
    ? Math.round((summary.totalCurrentAmount / summary.totalTargetAmount) * 100) 
    : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <SummaryCard 
        title="Total Progress" 
        value={`${totalProgress}%`}
        subtitle={`${formatCurrency(summary.totalCurrentAmount)} of ${formatCurrency(summary.totalTargetAmount)}`}
        icon={Goal}
        color="text-budget-blue"
        bgColor="bg-budget-blue/10"
      >
        <Progress 
          value={totalProgress} 
          className="h-2 mt-3"
          style={{ '--progress-background': 'var(--budget-blue)' } as React.CSSProperties}
        />
      </SummaryCard>
      
      <SummaryCard 
        title="Monthly Contribution" 
        value={formatCurrency(summary.totalContributionsMonthly)}
        subtitle="Total monthly savings"
        icon={PiggyBank}
        color="text-budget-green"
        bgColor="bg-budget-green/10"
      />
      
      <SummaryCard 
        title="Top Priority" 
        value={summary.highestPriorityGoal?.name || "None set"}
        subtitle={summary.highestPriorityGoal 
          ? `${Math.round((summary.highestPriorityGoal.currentAmount / summary.highestPriorityGoal.targetAmount) * 100)}% complete` 
          : "Set a high priority goal"}
        icon={TrendingUp}
        color="text-budget-purple"
        bgColor="bg-budget-purple/10"
      />
      
      <SummaryCard 
        title="Next Milestone" 
        value={summary.nextMilestoneGoal?.name || "No upcoming"}
        subtitle={summary.nextMilestoneGoal?.targetDate 
          ? `Target: ${new Date(summary.nextMilestoneGoal.targetDate).toLocaleDateString()}` 
          : "Set a goal with a target date"}
        icon={Clock}
        color="text-budget-orange"
        bgColor="bg-budget-orange/10"
      />
    </div>
  );
};

interface SummaryCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  children?: React.ReactNode;
}

const SummaryCard = ({ title, value, subtitle, icon: Icon, color, bgColor, children }: SummaryCardProps) => (
  <Card className="border border-border/50 card-shadow">
    <CardContent className="p-4">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-xl font-semibold mt-1">{value}</h3>
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          {children}
        </div>
        <div className={`${bgColor} h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0`}>
          <Icon className={`h-5 w-5 ${color}`} />
        </div>
      </div>
    </CardContent>
  </Card>
);
