import { useEffect, useState } from 'react';
import { 
  Area, 
  AreaChart, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from 'recharts';
import { ArrowDownRight, ArrowUpRight, Percent } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CategorySpending } from '@/utils/mockData';
import AnimatedNumber from '../ui/AnimatedNumber';

const generateChartData = (days: number = 30) => {
  const data = [];
  const now = new Date();
  const baseAmount = 2000;
  const variance = 1000;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    const randomFactor = Math.random() * variance * (isWeekend ? 1.5 : 1);
    const amount = baseAmount + randomFactor;
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      spending: Math.round(amount)
    });
  }
  
  return data;
};

interface SpendingOverviewProps {
  categorySpending: CategorySpending[];
}

const SpendingOverview = ({ categorySpending }: SpendingOverviewProps) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>('month');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const days = selectedTab === 'week' ? 7 : selectedTab === 'month' ? 30 : 90;
      setChartData(generateChartData(days));
      setIsLoading(false);
    }, 600);
  }, [selectedTab]);
  
  const totalSpent = chartData.reduce((sum, item) => sum + item.spending, 0);
  const previousTotal = totalSpent * 0.92;
  const percentChange = ((totalSpent - previousTotal) / previousTotal) * 100;
  const isIncrease = percentChange > 0;
  
  return (
    <Card className="border border-border/50 card-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">Spending Overview</CardTitle>
          <Tabs defaultValue="month" className="w-[240px]" onValueChange={setSelectedTab}>
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="quarter">Quarter</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Total Spent</p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-3xl font-bold tracking-tight">
                  {isLoading ? (
                    <span className="inline-block w-28 h-9 rounded bg-muted animate-pulse" />
                  ) : (
                    <AnimatedNumber value={totalSpent} />
                  )}
                </h2>
                
                {!isLoading && (
                  <div className={`flex items-center text-sm font-medium ${isIncrease ? 'text-destructive' : 'text-budget-green'}`}>
                    {isIncrease ? (
                      <ArrowUpRight className="mr-1 h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="mr-1 h-4 w-4" />
                    )}
                    {Math.abs(percentChange).toFixed(1)}%
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">Compared to last {selectedTab}</p>
            </div>
            
            <div className="flex flex-wrap gap-2 items-center md:justify-end">
              {categorySpending.slice(0, 5).map((category, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-full"
                >
                  <div className={`h-3 w-3 rounded-full ${category.color}`} />
                  <span className="text-xs font-medium">{category.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            {isLoading ? (
              <div className="h-full w-full flex items-center justify-center bg-secondary/30 rounded-lg animate-pulse" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--budget-blue))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--budget-blue))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12 }} 
                    tickMargin={10}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12 }} 
                    tickMargin={10}
                    tickFormatter={(value) => `$${value}`}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background border border-border shadow-md rounded-lg p-3 animate-fade-in">
                            <p className="text-sm font-medium">{label}</p>
                            <p className="text-sm font-semibold text-primary">
                              {payload[0].value?.toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD'
                              })}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="spending" 
                    stroke="hsl(var(--budget-blue))" 
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorSpending)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpendingOverview;
