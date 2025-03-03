import { TrendingDown, TrendingUp, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BudgetRecommendation, getCategoryInfo } from '@/utils/mockData';
import { cn } from '@/lib/utils';

interface BudgetRecommendationsProps {
  recommendations: BudgetRecommendation[];
}

const BudgetRecommendations = ({ recommendations }: BudgetRecommendationsProps) => {
  return (
    <Card className="border border-border/50 card-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-xl font-semibold">AI Budget Recommendations</CardTitle>
            <div className="flex items-center justify-center rounded-full bg-budget-purple/10 p-1.5">
              <Sparkles className="h-4 w-4 text-budget-purple" />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-2 space-y-4">
          {recommendations.map((rec, index) => {
            const { label, color } = getCategoryInfo(rec.category);
            const percentage = Math.round((rec.currentSpending / rec.recommendedBudget) * 100);
            const isOverBudget = percentage > 100;
            
            return (
              <div key={index} className="space-y-2 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${color}`} />
                    <span className="font-medium">{label}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {rec.percentChange > 0 ? (
                      <TrendingUp className="h-4 w-4 text-destructive" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-budget-green" />
                    )}
                    <span className={`text-sm ${rec.percentChange > 0 ? 'text-destructive' : 'text-budget-green'}`}>
                      {Math.abs(rec.percentChange)}%
                    </span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Progress 
                    value={percentage > 100 ? 100 : percentage} 
                    className={cn("h-2", isOverBudget ? "bg-secondary" : "bg-secondary")}
                    style={{ 
                      "--progress-background": isOverBudget ? "hsl(var(--destructive))" : `var(--${color.replace('bg-', '')})`
                    } as React.CSSProperties}
                  />
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-muted-foreground">
                      <span className="font-medium text-foreground">
                        ${rec.currentSpending.toLocaleString()}
                      </span> of ${rec.recommendedBudget.toLocaleString()}
                    </div>
                    <div className={isOverBudget ? 'text-destructive font-medium' : 'text-muted-foreground'}>
                      {isOverBudget ? 'Over budget' : `${100 - percentage}% remaining`}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetRecommendations;
