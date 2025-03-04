
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CategorySummary } from '@/types/recurring';
import { formatCurrency } from '@/utils/transactions';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, CreditCard, PiggyBank } from 'lucide-react';

interface RecurringSummaryProps {
  monthlyTotal: number;
  yearlyTotal: number;
  budgetPercentage: number;
  categories: CategorySummary[];
  isLoading: boolean;
}

const RecurringSummary = ({
  monthlyTotal,
  yearlyTotal,
  budgetPercentage,
  categories,
  isLoading
}: RecurringSummaryProps) => {
  const chartData = categories.map(cat => ({
    name: cat.displayName,
    value: cat.totalMonthly,
    color: cat.color
  }));
  
  // Colors for the pie chart
  const COLORS = ['bg-budget-blue', 'bg-budget-green', 'bg-budget-purple', 'bg-budget-orange', 'bg-budget-red'].map(color => 
    color.replace('bg-', '')
  );
  
  const getTailwindColor = (colorClass: string) => {
    const mapping: Record<string, string> = {
      'budget-blue': '#3b82f6',
      'budget-green': '#22c55e',
      'budget-purple': '#a855f7',
      'budget-orange': '#f59e0b',
      'budget-red': '#ef4444',
      'muted-foreground': '#9ca3af'
    };
    return mapping[colorClass] || '#9ca3af';
  };
  
  return (
    <Card className="border border-border/50 card-shadow h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Subscription Breakdown</CardTitle>
          <div className="flex items-center justify-center rounded-full bg-budget-green/10 p-1.5">
            <PiggyBank className="h-4 w-4 text-budget-green" />
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-[180px] w-full rounded-md" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[220px]" />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center mb-2">
              <div className="text-3xl font-bold">
                {formatCurrency(monthlyTotal)}<span className="text-sm font-normal text-muted-foreground">/mo</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {formatCurrency(yearlyTotal)}/year · {budgetPercentage.toFixed(0)}% of budget
              </div>
            </div>
            
            {categories.length > 0 && (
              <div className="h-[180px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={getTailwindColor(entry.color.replace('bg-', ''))}
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => formatCurrency(value)}
                      labelFormatter={(name) => `${name}`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
            
            <div className="space-y-2 mt-2 max-h-[200px] overflow-y-auto">
              {categories.map((category) => (
                <div key={category.category} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${category.color}`} />
                    <span className="text-sm">{category.displayName} ({category.count})</span>
                  </div>
                  <span className="text-sm font-medium">
                    {formatCurrency(category.totalMonthly)}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="pt-2 border-t border-border mt-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1.5">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span>Total Subscriptions:</span>
                </div>
                <span className="font-medium">{categories.reduce((acc, cat) => acc + cat.count, 0)}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Most payments due:</span>
                </div>
                <span className="font-medium">First week of month</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecurringSummary;
