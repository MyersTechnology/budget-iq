
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  Lightbulb, 
  DollarSign, 
  ArrowRight, 
  X,
  TrendingUp
} from "lucide-react";
import { RecurringInsight } from "@/types/recurring";
import { formatCurrency } from "@/utils/transactions";
import { Skeleton } from "@/components/ui/skeleton";

interface RecurringInsightsProps {
  insights: RecurringInsight[];
  onDismiss: (insightId: string) => void;
  isLoading: boolean;
}

const RecurringInsights = ({ 
  insights,
  onDismiss,
  isLoading
}: RecurringInsightsProps) => {
  // Only show non-dismissed insights
  const activeInsights = insights.filter(insight => !insight.dismissed);
  
  const getTotalPotentialSavings = () => {
    return activeInsights.reduce((total, insight) => {
      return total + (insight.potentialSavings || 0);
    }, 0);
  };
  
  return (
    <Card className="border border-border/50 card-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">AI Insights</CardTitle>
          <div className="flex items-center justify-center rounded-full bg-budget-blue/10 p-1.5">
            <Lightbulb className="h-4 w-4 text-budget-blue" />
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            ))}
          </div>
        ) : (
          activeInsights.length > 0 ? (
            <div className="space-y-4">
              {getTotalPotentialSavings() > 0 && (
                <div className="bg-budget-green/10 rounded-md p-3 mb-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-budget-green" />
                    <div>
                      <h3 className="font-medium text-sm">Potential savings found</h3>
                      <p className="text-sm">
                        You could save up to <span className="font-bold">{formatCurrency(getTotalPotentialSavings())}/year</span> by following our recommendations.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {activeInsights.map((insight) => {
                let Icon = Lightbulb;
                let iconColor = "text-budget-blue";
                let bgColor = "bg-budget-blue/10";
                
                if (insight.type === 'price_increase' || insight.type === 'alert') {
                  Icon = AlertTriangle;
                  iconColor = "text-budget-orange";
                  bgColor = "bg-budget-orange/10";
                } else if (insight.type === 'unused' || insight.type === 'duplicate') {
                  Icon = AlertTriangle;
                  iconColor = "text-destructive";
                  bgColor = "bg-destructive/10";
                } else if (insight.type === 'savings') {
                  Icon = TrendingUp;
                  iconColor = "text-budget-green";
                  bgColor = "bg-budget-green/10";
                }
                
                return (
                  <div 
                    key={insight.id}
                    className="border rounded-lg p-4 relative"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 absolute top-2 right-2 text-muted-foreground"
                      onClick={() => onDismiss(insight.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                    
                    <div className="flex gap-3">
                      <div className={`${bgColor} h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`h-4 w-4 ${iconColor}`} />
                      </div>
                      
                      <div className="space-y-1">
                        <h3 className="font-medium text-sm">{insight.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {insight.description}
                        </p>
                        
                        {insight.potentialSavings && (
                          <p className="text-xs text-budget-green font-medium">
                            Save up to {formatCurrency(insight.potentialSavings)}/year
                          </p>
                        )}
                        
                        {insight.action && (
                          <Button 
                            variant="link" 
                            size="sm" 
                            className="h-auto p-0 text-sm"
                            asChild
                          >
                            {insight.actionUrl ? (
                              <a href={insight.actionUrl} target="_blank" rel="noopener noreferrer">
                                {insight.action}
                                <ArrowRight className="ml-1 h-3.5 w-3.5" />
                              </a>
                            ) : (
                              <span>{insight.action}<ArrowRight className="ml-1 h-3.5 w-3.5" /></span>
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-6">
              <Lightbulb className="mx-auto h-10 w-10 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-medium">No insights available</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                We'll analyze your subscriptions and provide suggestions soon
              </p>
            </div>
          )
        )}
      </CardContent>
    </Card>
  );
};

export default RecurringInsights;
