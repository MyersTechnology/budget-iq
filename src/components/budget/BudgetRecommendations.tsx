
import { useState } from 'react';
import { useBudgetData, BudgetCategory } from '@/hooks/useBudgetData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PiggyBank, DollarSign, TrendingUp, TrendingDown, Sparkles, Wallet, BarChart, Calendar, Filter } from 'lucide-react';
import BudgetInsights from './BudgetInsights';
import BudgetCategoryList from './BudgetCategoryList';
import BudgetSummary from './BudgetSummary';
import { useToast } from '@/hooks/use-toast';

const BudgetRecommendations = () => {
  const { budgetData, isLoading } = useBudgetData();
  const [activeView, setActiveView] = useState<'monthly' | 'weekly'>('monthly');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleAdjustBudget = (category: BudgetCategory) => {
    toast({
      title: "Budget Adjustment",
      description: `Adjusting budget for ${category.label}`,
    });
  };
  
  const handleOptimizeBudget = () => {
    toast({
      title: "Budget Optimized",
      description: "AI has optimized your budget based on your spending patterns",
    });
  };
  
  if (isLoading || !budgetData) {
    return (
      <div className="py-6 animate-fade-in overflow-hidden">
        <h1 className="text-2xl font-bold mb-6">AI Budget</h1>
        <div className="grid gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border border-border/50 shadow-sm overflow-hidden">
              <CardContent className="p-6">
                <div className="h-20 w-full rounded bg-muted animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6 py-6 pb-10 animate-fade-in overflow-hidden">
      <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">AI Budget</h1>
        
        <div className="flex flex-wrap items-center gap-2">
          <Tabs defaultValue="monthly" className="w-full sm:w-[280px]">
            <TabsList>
              <TabsTrigger value="monthly" onClick={() => setActiveView('monthly')}>
                Monthly
              </TabsTrigger>
              <TabsTrigger value="weekly" onClick={() => setActiveView('weekly')}>
                Weekly
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button variant="outline" size="sm" className="gap-1.5">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <BudgetSummary 
          title="Total Budget" 
          amount={budgetData.totalBudget} 
          icon={Wallet} 
          iconColor="text-budget-blue"
          iconBgColor="bg-budget-blue/10"
          subtitle={activeView === 'monthly' ? 'Monthly allocation' : 'Weekly allocation'}
        />
        
        <BudgetSummary 
          title="Total Spent" 
          amount={budgetData.totalSpent} 
          icon={DollarSign} 
          iconColor="text-budget-orange"
          iconBgColor="bg-budget-orange/10"
          subtitle={`${budgetData.percentUsed}% of budget used`}
        />
        
        <BudgetSummary 
          title="Remaining" 
          amount={budgetData.remainingBudget} 
          icon={PiggyBank} 
          iconColor="text-budget-green"
          iconBgColor="bg-budget-green/10"
          subtitle={activeView === 'monthly' ? 'This month' : 'This week'}
        />
        
        <BudgetSummary 
          title="Projected Savings" 
          amount={budgetData.remainingBudget * 0.8} 
          icon={TrendingUp} 
          iconColor="text-budget-purple"
          iconBgColor="bg-budget-purple/10"
          subtitle="Based on current trends"
        />
      </div>
      
      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="border border-border/50 card-shadow">
            <CardHeader className="pb-2">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-xl font-semibold">AI Budget Recommendations</CardTitle>
                  <div className="flex items-center justify-center rounded-full bg-budget-purple/10 p-1.5">
                    <Sparkles className="h-4 w-4 text-budget-purple" />
                  </div>
                </div>
                
                <Button variant="outline" size="sm" onClick={handleOptimizeBudget}>
                  <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                  Optimize Budget
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-muted-foreground">
                  Overall Budget Progress
                </div>
                <div className="text-sm font-medium">
                  {budgetData.percentUsed}% Used
                </div>
              </div>
              
              <Progress 
                value={budgetData.percentUsed} 
                className="h-2.5 mb-6"
              />
              
              <BudgetCategoryList 
                categories={budgetData.categories} 
                onAdjustBudget={handleAdjustBudget}
                timeframe={activeView}
              />
            </CardContent>
          </Card>
        </div>
        
        <div>
          <BudgetInsights insights={budgetData.insights} />
        </div>
      </div>
    </div>
  );
};

export default BudgetRecommendations;
