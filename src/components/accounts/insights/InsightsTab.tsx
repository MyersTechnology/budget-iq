
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, PiggyBank, AlertCircle, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AccountInsight } from "@/types/accounts";

interface InsightsTabProps {
  accountInsights: AccountInsight[];
}

const InsightsTab = ({ accountInsights }: InsightsTabProps) => {
  return (
    <Card className="border border-border/50 card-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg">AI-Powered Insights</CardTitle>
          <div className="flex items-center justify-center rounded-full bg-budget-blue/10 p-1.5">
            <PiggyBank className="h-4 w-4 text-budget-blue" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {accountInsights.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-8">
            <div className="bg-muted/30 p-4 rounded-full mb-4">
              <DollarSign className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No insights available</h3>
            <p className="text-muted-foreground mt-1 max-w-md">
              We'll analyze your transactions and provide personalized insights 
              as we learn more about your financial habits.
            </p>
          </div>
        ) : (
          <div className="space-y-4 mt-2">
            {accountInsights.map((insight) => {
              let Icon = DollarSign;
              let bgColor = "bg-budget-blue/10";
              let textColor = "text-budget-blue";
              
              if (insight.type === 'fee') {
                Icon = AlertCircle;
                bgColor = "bg-destructive/10";
                textColor = "text-destructive";
              } else if (insight.type === 'balance') {
                Icon = TrendingDown;
                bgColor = "bg-destructive/10";
                textColor = "text-destructive";
              } else if (insight.type === 'savings') {
                Icon = PiggyBank;
                bgColor = "bg-budget-green/10";
                textColor = "text-budget-green";
              }
              
              return (
                <div 
                  key={insight.id}
                  className="border rounded-lg p-4 animate-fade-in"
                >
                  <div className="flex gap-3">
                    <div className={`${bgColor} h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`h-4 w-4 ${textColor}`} />
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className="font-medium">{insight.title}</h3>
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                      
                      {insight.action && (
                        <Button variant="link" size="sm" className="h-auto p-0 text-sm">
                          {insight.action}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InsightsTab;
