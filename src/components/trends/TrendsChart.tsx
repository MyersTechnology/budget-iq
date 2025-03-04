
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LineChartComponent from './charts/LineChartComponent';
import AreaChartComponent from './charts/AreaChartComponent';
import BarChartComponent from './charts/BarChartComponent';
import ChartTypeSelector from './charts/ChartTypeSelector';

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
  
  const topCategories = data?.categorySpending?.slice(0, 5).map((cat: any) => cat.category) || [];
  
  const renderChart = () => {
    if (isLoading) {
      return (
        <div className="h-[400px] w-full flex items-center justify-center bg-secondary/30 rounded-lg animate-pulse" />
      );
    }
    
    if (chartType === 'line') {
      return <LineChartComponent chartData={chartData} topCategories={topCategories} />;
    } else if (chartType === 'area') {
      return <AreaChartComponent chartData={chartData} />;
    } else {
      return <BarChartComponent chartData={chartData} />;
    }
  };
  
  return (
    <Card className="border border-border/50 card-shadow h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>{chartTitle}</CardTitle>
        <ChartTypeSelector chartType={chartType} setChartType={setChartType} />
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
