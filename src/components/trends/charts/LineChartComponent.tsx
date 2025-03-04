
import { 
  CartesianGrid, 
  Legend, 
  Line, 
  LineChart,
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from 'recharts';
import { getCategoryInfo } from '@/utils/mockData';
import { ChartTooltipContent } from './ChartTooltipContent';

interface LineChartComponentProps {
  chartData: any[];
  topCategories: string[];
}

const LineChartComponent = ({ chartData, topCategories }: LineChartComponentProps) => {
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
        <Tooltip content={ChartTooltipContent} />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="spending" 
          name="Total" 
          stroke="hsl(var(--budget-blue))" 
          activeDot={{ r: 8 }}
          strokeWidth={2}
        />
        
        {topCategories.map((category, index) => {
          const { color } = getCategoryInfo(category);
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
};

export default LineChartComponent;
