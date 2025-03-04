
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GoalInsight } from '@/types/goals';
import { Sparkles, AlertCircle, CheckCircle2, TrendingUp, ArrowRight } from 'lucide-react';

interface GoalsInsightsProps {
  insights: GoalInsight[];
}

export const GoalsInsights = ({ insights }: GoalsInsightsProps) => {
  return (
    <Card className="border border-border/50 card-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-xl font-semibold">AI Insights</CardTitle>
          <div className="flex items-center justify-center rounded-full bg-budget-blue/10 p-1.5">
            <Sparkles className="h-4 w-4 text-budget-blue" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.length === 0 ? (
            <div className="text-center py-6">
              <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">
                Create goals to get AI insights and recommendations
              </p>
            </div>
          ) : (
            insights.map((insight, index) => {
              // Determine icon based on insight type
              let Icon = TrendingUp;
              let iconColor = "text-budget-blue";
              let bgColor = "bg-budget-blue/10";
              
              if (insight.type === 'warning') {
                Icon = AlertCircle;
                iconColor = "text-budget-orange";
                bgColor = "bg-budget-orange/10";
              } else if (insight.type === 'success') {
                Icon = CheckCircle2;
                iconColor = "text-budget-green";
                bgColor = "bg-budget-green/10";
              }
              
              return (
                <div 
                  key={insight.id} 
                  className="rounded-lg border p-4 animate-fade-in" 
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex gap-3">
                    <div className={`${bgColor} h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`h-4 w-4 ${iconColor}`} />
                    </div>
                    
                    <div className="space-y-1.5">
                      <h3 className="font-medium text-sm">{insight.title}</h3>
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                      
                      {insight.action && (
                        <Button variant="link" size="sm" className="h-auto p-0 text-sm">
                          {insight.action}
                          <ArrowRight className="ml-1 h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};
