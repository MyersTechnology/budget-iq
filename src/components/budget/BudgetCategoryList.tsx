
import { TrendingDown, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { BudgetCategory } from '@/hooks/useBudgetData';
import { cn } from '@/lib/utils';

interface BudgetCategoryListProps {
  categories: BudgetCategory[];
  onAdjustBudget: (category: BudgetCategory) => void;
  timeframe: 'monthly' | 'weekly';
}

const BudgetCategoryList = ({ categories, onAdjustBudget, timeframe }: BudgetCategoryListProps) => {
  return (
    <div className="mt-2 space-y-4">
      {categories.map((category, index) => {
        const percentUsed = Math.round((category.current / category.recommended) * 100);
        const isOverBudget = percentUsed > 100;
        
        // Apply discount for weekly view
        const multiplier = timeframe === 'weekly' ? 0.25 : 1;
        const displayRecommended = Math.round(category.recommended * multiplier);
        const displayCurrent = Math.round(category.current * multiplier);
        
        return (
          <div key={category.category} className="space-y-2 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${category.color}`} />
                <span className="font-medium">{category.label}</span>
              </div>
              <div className="flex items-center gap-1">
                {category.percentChange > 0 ? (
                  <TrendingUp className="h-4 w-4 text-destructive" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-budget-green" />
                )}
                <span className={`text-sm ${category.percentChange > 0 ? 'text-destructive' : 'text-budget-green'}`}>
                  {Math.abs(category.percentChange)}%
                </span>
              </div>
            </div>
            
            <div className="space-y-1">
              <Progress 
                value={percentUsed > 100 ? 100 : percentUsed} 
                className={cn("h-2", isOverBudget ? "bg-secondary" : "bg-secondary")}
                style={{ 
                  "--progress-background": isOverBudget ? "hsl(var(--destructive))" : `var(--${category.color.replace('bg-', '')})`
                } as React.CSSProperties}
              />
              
              <div className="flex items-center justify-between text-sm">
                <div className="text-muted-foreground">
                  <span className="font-medium text-foreground">
                    ${displayCurrent.toLocaleString()}
                  </span> of ${displayRecommended.toLocaleString()}
                </div>
                <div className={isOverBudget ? 'text-destructive font-medium' : 'text-muted-foreground'}>
                  {isOverBudget ? 'Over budget' : `${100 - percentUsed}% remaining`}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs h-7 px-2.5"
                onClick={() => onAdjustBudget(category)}
              >
                Adjust
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BudgetCategoryList;
