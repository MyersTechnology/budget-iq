
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GoalItem } from '@/components/goals/GoalItem';
import { FinancialGoal } from '@/types/goals';
import { Goal } from 'lucide-react';

interface GoalsListProps {
  goals: FinancialGoal[];
  onUpdateGoal: (id: string, updates: Partial<FinancialGoal>) => void;
}

export const GoalsList = ({ goals, onUpdateGoal }: GoalsListProps) => {
  return (
    <Card className="border border-border/50 card-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Goal className="h-5 w-5 text-budget-blue" />
          <CardTitle>Your Financial Goals</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {goals.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Goal className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No goals yet</h3>
            <p className="text-muted-foreground mt-1">
              Create your first financial goal to start tracking your progress
            </p>
          </div>
        ) : (
          <div className="space-y-4 mt-2">
            {goals.map(goal => (
              <GoalItem key={goal.id} goal={goal} onUpdateGoal={onUpdateGoal} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
