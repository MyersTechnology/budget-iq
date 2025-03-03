
import { useEffect, useState } from 'react';
import { PiggyBank, Wallet } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import SpendingOverview from './SpendingOverview';
import RecentTransactions from './RecentTransactions';
import BudgetRecommendations from './BudgetRecommendations';
import InsightCard from './InsightCard';
import AnimatedNumber from '../ui/AnimatedNumber';
import { mockData } from '@/utils/mockData';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="container mx-auto space-y-6 py-6 pb-10 animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">Financial Dashboard</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border border-border/50 shadow-sm overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Balance</p>
                <h2 className="text-3xl font-bold mt-2">
                  {loading ? (
                    <span className="inline-block w-40 h-9 rounded bg-muted animate-pulse" />
                  ) : (
                    <AnimatedNumber value={mockData.totalBalance} />
                  )}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">Across all linked accounts</p>
              </div>
              <div className="bg-budget-blue/10 p-3 rounded-full">
                <Wallet className="h-6 w-6 text-budget-blue" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-border/50 shadow-sm overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Savings</p>
                <h2 className="text-3xl font-bold mt-2">
                  {loading ? (
                    <span className="inline-block w-40 h-9 rounded bg-muted animate-pulse" />
                  ) : (
                    <AnimatedNumber value={mockData.monthlyIncome - mockData.monthlyExpenses} />
                  )}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">Income vs. Expenses</p>
              </div>
              <div className="bg-budget-green/10 p-3 rounded-full">
                <PiggyBank className="h-6 w-6 text-budget-green" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* AI Insights */}
      <div className="grid grid-cols-1 gap-4">
        <h2 className="text-xl font-semibold mb-2">AI Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockData.insights.map((insight, index) => (
            <InsightCard 
              key={insight.id} 
              insight={insight} 
              delay={index * 200}
            />
          ))}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6">
        <SpendingOverview categorySpending={mockData.categorySpending} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BudgetRecommendations recommendations={mockData.budgetRecommendations} />
          <RecentTransactions transactions={mockData.transactions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
