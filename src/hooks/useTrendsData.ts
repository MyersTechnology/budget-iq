
import { useState, useEffect } from 'react';
import { mockData, CategorySpending } from '@/utils/mockData';

interface TrendsDataPoint {
  date: string;
  spending: number;
  categories?: {
    [key: string]: number;
  };
}

interface TrendsData {
  totalSpent: number;
  previousTotal: number;
  percentChange: number;
  categorySpending: CategorySpending[];
  chartData: TrendsDataPoint[];
}

export const useTrendsData = (timeframe: 'week' | 'month' | 'quarter' | 'year') => {
  const [trendsData, setTrendsData] = useState<TrendsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const days = timeframe === 'week' ? 7 : 
                  timeframe === 'month' ? 30 : 
                  timeframe === 'quarter' ? 90 : 365;
                  
      const chartData = generateChartData(days);
      const totalSpent = chartData.reduce((sum, item) => sum + item.spending, 0);
      
      // Calculate different previous totals based on timeframe for realistic data
      const previousMultiplier = 
        timeframe === 'week' ? 0.92 : 
        timeframe === 'month' ? 0.95 : 
        timeframe === 'quarter' ? 0.88 : 0.82;
      
      const previousTotal = totalSpent * previousMultiplier;
      const percentChange = ((totalSpent - previousTotal) / previousTotal) * 100;
      
      // Adjust category spending based on timeframe
      const categoryMultiplier = 
        timeframe === 'week' ? 0.25 : 
        timeframe === 'month' ? 1 : 
        timeframe === 'quarter' ? 3 : 12;
      
      const categorySpending = mockData.categorySpending.map(category => ({
        ...category,
        amount: Math.round(category.amount * categoryMultiplier)
      }));
      
      setTrendsData({
        totalSpent,
        previousTotal,
        percentChange,
        categorySpending,
        chartData
      });
      
      setIsLoading(false);
    }, 800);
  }, [timeframe]);
  
  return { trendsData, isLoading };
};

// Helper function to generate mock chart data
const generateChartData = (days: number = 30): TrendsDataPoint[] => {
  const data: TrendsDataPoint[] = [];
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
    
    // Create categories breakdown for each data point
    const categories: {[key: string]: number} = {};
    mockData.categorySpending.forEach(cat => {
      categories[cat.category] = Math.round(amount * (cat.percentage / 100) * (0.8 + Math.random() * 0.4));
    });
    
    data.push({
      date: formatDate(date, days),
      spending: Math.round(amount),
      categories
    });
  }
  
  return data;
};

// Helper function to format dates based on timeframe
const formatDate = (date: Date, totalDays: number): string => {
  if (totalDays <= 31) {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } else if (totalDays <= 90) {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
  }
};
