
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CategorySpending, formatCurrency } from '@/utils/mockData';
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';

interface CategoryBreakdownProps {
  categorySpending: CategorySpending[];
  isLoading: boolean;
}

const CategoryBreakdown = ({ categorySpending, isLoading }: CategoryBreakdownProps) => {
  if (isLoading) {
    return (
      <Card className="border border-border/50 card-shadow h-full">
        <CardHeader>
          <CardTitle>Category Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full flex items-center justify-center bg-secondary/30 rounded-lg animate-pulse" />
        </CardContent>
      </Card>
    );
  }
  
  // Format data for the pie chart
  const data = categorySpending.map((category) => ({
    name: category.category,
    value: category.amount,
    color: category.color,
    percentage: category.percentage,
    trend: category.trend,
    previousAmount: category.previousAmount
  }));
  
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-xs font-semibold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  
  return (
    <Card className="border border-border/50 card-shadow h-full">
      <CardHeader>
        <CardTitle>Category Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col h-[calc(100%-64px)]">
        <div className="h-[45%] min-h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={`hsl(var(--${entry.color?.replace('bg-', '')}))`} 
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 overflow-y-auto" style={{ maxHeight: "50%" }}>
          {data.map((category, index) => (
            <div key={index} className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${category.color}`} />
                <span className="text-sm font-medium">{category.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">{formatCurrency(category.value)}</span>
                <div className="flex items-center">
                  {category.trend === 'up' ? (
                    <ArrowUpRight className="h-4 w-4 text-destructive" />
                  ) : category.trend === 'down' ? (
                    <ArrowDownRight className="h-4 w-4 text-budget-green" />
                  ) : (
                    <Minus className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryBreakdown;
