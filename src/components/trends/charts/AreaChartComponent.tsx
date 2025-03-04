
import { 
  Area, 
  AreaChart, 
  CartesianGrid, 
  Legend, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from 'recharts';
import { ChartTooltipContent } from './ChartTooltipContent';

interface AreaChartComponentProps {
  chartData: any[];
}

const AreaChartComponent = ({ chartData }: AreaChartComponentProps) => {
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
        <Tooltip content={ChartTooltipContent} />
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
};

export default AreaChartComponent;
