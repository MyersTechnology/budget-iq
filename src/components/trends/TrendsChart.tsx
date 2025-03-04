
import { useState } from 'react';
import { 
  Area, 
  AreaChart, 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Legend, 
  Line, 
  LineChart,
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { BarChart3, LineChart as LineChartIcon, AreaChart as AreaChartIcon, ChevronDown } from 'lucide-react';
import { getCategoryInfo } from '@/utils/mockData';

interface TrendsChartProps {
  data: any;
  timeframe: 'week' | 'month' | 'quarter' | 'year';
  isLoading: boolean;
}

const TrendsChart = ({ data, timeframe, isLoading }: TrendsChartProps) => {
  const [chartType, setChartType] = useState<'line' | 'area' | 'bar'>('area');
  const chartData = data?.chartData || [];
  
  const chartTitle = 
    timeframe === 'week' ? 'Weekly Spending Trends' : 
    timeframe === 'month' ? 'Monthly Spending Trends' : 
    timeframe === 'quarter' ? 'Quarterly Spending Trends' : 'Yearly Spending Trends';
  
  // Extract top 5 categories for the chart
  const topCategories = data?.categorySpending?.slice(0, 5).map((cat: any) => cat.category) || [];
  
  // Create colors array for the stacked charts
  const categoryColors = topCategories.map((category: string) => {
    const { color } = getCategoryInfo(category);
    return color.replace('bg-', '');
  });
  
  const renderChart = () => {
    if (isLoading) {
      return (
        <div className="h-[400px] w-full flex items-center justify-center bg-secondary/30 rounded-lg animate-pulse" />
      );
    }
    
    const renderTooltipContent = ({ active, payload, label }: any) => {
      if (active && payload && payload.length) {
        return (
          <div className="bg-background border border-border shadow-md rounded-lg p-3 animate-fade-in">
            <p className="text-sm font-medium">{label}</p>
            {payload.map((entry: any, index: number) => (
              <p key={`item-${index}`} className="text-sm">
                {entry.name}: {entry.value?.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </p>
            ))}
          </div>
        );
      }
      return null;
    };
    
    if (chartType === 'line') {
      return (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date"
              tick={{ fontSize: 12 }}
              tickMargin={10}
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis 
              tickFormatter={(value) => `$${value}`}
              tick={{ fontSize: 12 }}
              tickMargin={10}
              stroke="hsl(var(--muted-foreground))"
            />
            <Tooltip content={renderTooltipContent} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="spending" 
              name="Total" 
              stroke="hsl(var(--budget-blue))" 
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
            
            {/* Add lines for top categories if available */}
            {topCategories.map((category: string, index: number) => {
              const { color } = getCategoryInfo(category);
              // Convert Tailwind class to CSS variable for Recharts
              const strokeColor = `hsl(var(--${color.replace('bg-', '')}))`;
              
              return (
                <Line
                  key={category}
                  type="monotone"
                  dataKey={`categories.${category}`}
                  name={category}
                  stroke={strokeColor}
                  strokeWidth={1.5}
                  dot={false}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      );
    } else if (chartType === 'area') {
      return (
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <defs>
              <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--budget-blue))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--budget-blue))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date"
              tick={{ fontSize: 12 }}
              tickMargin={10}
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis 
              tickFormatter={(value) => `$${value}`}
              tick={{ fontSize: 12 }}
              tickMargin={10}
              stroke="hsl(var(--muted-foreground))"
            />
            <Tooltip content={renderTooltipContent} />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="spending" 
              name="Total" 
              stroke="hsl(var(--budget-blue))" 
              fillOpacity={1}
              fill="url(#colorSpending)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      );
    } else {
      return (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date"
              tick={{ fontSize: 12 }}
              tickMargin={10}
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis 
              tickFormatter={(value) => `$${value}`}
              tick={{ fontSize: 12 }}
              tickMargin={10}
              stroke="hsl(var(--muted-foreground))"
            />
            <Tooltip content={renderTooltipContent} />
            <Legend />
            <Bar 
              dataKey="spending" 
              name="Total Spending" 
              fill="hsl(var(--budget-blue))" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      );
    }
  };
  
  return (
    <Card className="border border-border/50 card-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>{chartTitle}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              {chartType === 'line' ? <LineChartIcon className="h-4 w-4" /> : 
               chartType === 'area' ? <AreaChartIcon className="h-4 w-4" /> : 
               <BarChart3 className="h-4 w-4" />}
              <span>Chart Type</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setChartType('line')} className="gap-2">
              <LineChartIcon className="h-4 w-4" />
              <span>Line Chart</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setChartType('area')} className="gap-2">
              <AreaChartIcon className="h-4 w-4" />
              <span>Area Chart</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setChartType('bar')} className="gap-2">
              <BarChart3 className="h-4 w-4" />
              <span>Bar Chart</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          {renderChart()}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendsChart;
