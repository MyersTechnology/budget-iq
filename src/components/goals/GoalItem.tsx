
import { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FinancialGoal, GoalPriority } from '@/types/goals';
import { formatCurrency } from '@/utils/transactions';
import { getGoalCategoryInfo } from '@/utils/goals/goalHelpers';
import { 
  ChevronDown, 
  ChevronUp, 
  Edit2, 
  Trash2, 
  PauseCircle, 
  PlayCircle,
  AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface GoalItemProps {
  goal: FinancialGoal;
  onUpdateGoal: (id: string, updates: Partial<FinancialGoal>) => void;
}

export const GoalItem = ({ goal, onUpdateGoal }: GoalItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const { icon: Icon, color } = getGoalCategoryInfo(goal.category);
  
  const progressPercentage = Math.round((goal.currentAmount / goal.targetAmount) * 100);
  const isOverdue = goal.targetDate && new Date(goal.targetDate) < new Date() && progressPercentage < 100;
  
  // Calculate time remaining if target date exists
  const getTimeRemaining = () => {
    if (!goal.targetDate) return null;
    
    const targetDate = new Date(goal.targetDate);
    const today = new Date();
    
    if (targetDate < today && progressPercentage < 100) {
      return "Overdue";
    }
    
    const diffInMs = targetDate.getTime() - today.getTime();
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays <= 30) return `${diffInDays} days left`;
    if (diffInDays <= 60) return "About 1 month left";
    if (diffInDays <= 365) return `${Math.ceil(diffInDays / 30)} months left`;
    return `${Math.ceil(diffInDays / 365)} years left`;
  };
  
  const getPriorityLabel = (priority: GoalPriority) => {
    switch (priority) {
      case 'high': return { label: 'High Priority', color: 'bg-red-100 text-red-700 border-red-200' };
      case 'medium': return { label: 'Medium', color: 'bg-orange-100 text-orange-700 border-orange-200' };
      case 'low': return { label: 'Low', color: 'bg-green-100 text-green-700 border-green-200' };
    }
  };
  
  const priorityInfo = getPriorityLabel(goal.priority);
  const timeRemaining = getTimeRemaining();

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`rounded-full p-2 ${color.bg}`}>
              <Icon className={`h-5 w-5 ${color.text}`} />
            </div>
            
            <div>
              <h3 className="font-medium text-base leading-tight">{goal.name}</h3>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <Badge variant="outline" className={priorityInfo.color}>
                  {priorityInfo.label}
                </Badge>
                
                {goal.status === 'paused' && (
                  <Badge variant="outline" className="bg-zinc-100 text-zinc-800 border-zinc-200">
                    Paused
                  </Badge>
                )}
                
                {goal.status === 'achieved' && (
                  <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                    Achieved
                  </Badge>
                )}
                
                {isOverdue && (
                  <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200 gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    Overdue
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </Button>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <div className="text-sm font-medium">
              {formatCurrency(goal.currentAmount)} of {formatCurrency(goal.targetAmount)}
            </div>
            <div className="text-sm text-muted-foreground">
              {progressPercentage}%
            </div>
          </div>
          
          <Progress 
            value={progressPercentage} 
            className="h-2.5"
            style={{ '--progress-background': `var(${color.cssVar})` } as React.CSSProperties}
          />
          
          <div className="flex items-center justify-between mt-3 text-sm">
            <div className="text-muted-foreground">
              {goal.contributionFrequency === 'weekly' && `${formatCurrency(goal.contributionAmount)}/week`}
              {goal.contributionFrequency === 'biweekly' && `${formatCurrency(goal.contributionAmount)}/2 weeks`}
              {goal.contributionFrequency === 'monthly' && `${formatCurrency(goal.contributionAmount)}/month`}
            </div>
            {timeRemaining && (
              <div className={cn(
                "text-muted-foreground",
                isOverdue && "text-red-600 font-medium"
              )}>
                {timeRemaining}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {expanded && (
        <div className="px-4 pb-4 pt-1 bg-muted/30 border-t">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Created</div>
              <div className="font-medium">{new Date(goal.createdAt).toLocaleDateString()}</div>
            </div>
            {goal.targetDate && (
              <div>
                <div className="text-sm text-muted-foreground mb-1">Target Date</div>
                <div className="font-medium">{new Date(goal.targetDate).toLocaleDateString()}</div>
              </div>
            )}
            {goal.notes && (
              <div className="sm:col-span-2">
                <div className="text-sm text-muted-foreground mb-1">Notes</div>
                <div className="text-sm">{goal.notes}</div>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-border/60">
            {goal.status === 'paused' ? (
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1.5"
                onClick={() => onUpdateGoal(goal.id, { status: 'active' })}
              >
                <PlayCircle className="h-4 w-4" />
                Resume
              </Button>
            ) : goal.status === 'active' && (
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1.5"
                onClick={() => onUpdateGoal(goal.id, { status: 'paused' })}
              >
                <PauseCircle className="h-4 w-4" />
                Pause
              </Button>
            )}
            
            <Button variant="outline" size="sm" className="gap-1.5">
              <Edit2 className="h-4 w-4" />
              Edit
            </Button>
            
            <Button variant="outline" size="sm" className="gap-1.5 text-destructive hover:text-destructive">
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
