
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Legend, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from 'recharts';
import { ChartTooltipContent } from './ChartTooltipContent';

interface BarChartComponentProps {
  chartData: any[];
}

const BarChartComponent = ({ chartData }: BarChartComponentProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 20, right: 5, left: 0, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
        <XAxis 
          dataKey="date"
          tick={{ fontSize: 10 }}
          tickMargin={10}
          stroke="hsl(var(--muted-foreground))"
        />
        <YAxis 
          tickFormatter={(value) => `$${value}`}
          tick={{ fontSize: 10 }}
          tickMargin={10}
          stroke="hsl(var(--muted-foreground))"
        />
        <Tooltip content={ChartTooltipContent} />
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
};

export default BarChartComponent;
