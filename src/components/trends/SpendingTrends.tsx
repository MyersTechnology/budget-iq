
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TrendsSummary from './TrendsSummary';
import TrendsChart from './TrendsChart';
import CategoryBreakdown from './CategoryBreakdown';
import TrendsInsights from './TrendsInsights';
import TrendsFilters from './TrendsFilters';
import { mockData } from '@/utils/mockData';
import { useTrendsData } from '@/hooks/useTrendsData';

const SpendingTrends = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { trendsData, isLoading } = useTrendsData(selectedTimeframe);
  
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const filteredData = selectedCategories.length > 0
    ? {
        ...trendsData,
        categorySpending: trendsData?.categorySpending?.filter(cat => 
          selectedCategories.includes(cat.category)
        ) || []
      }
    : trendsData;

  return (
    <div className="container mx-auto space-y-6 py-6 pb-10 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Spending Trends & Insights</h1>
        
        <Tabs 
          value={selectedTimeframe} 
          onValueChange={(value) => setSelectedTimeframe(value as any)} 
          className="w-full md:w-auto"
        >
          <TabsList className="grid grid-cols-4 w-full md:w-[400px]">
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="quarter">Quarter</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Summary Cards */}
      <TrendsSummary 
        data={filteredData} 
        timeframe={selectedTimeframe} 
        isLoading={isLoading} 
      />
      
      {/* Filters */}
      <TrendsFilters 
        categories={mockData.categorySpending.map(cat => cat.category)}
        selectedCategories={selectedCategories}
        onToggleCategory={handleCategoryToggle}
      />
      
      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TrendsChart 
            data={filteredData} 
            timeframe={selectedTimeframe} 
            isLoading={isLoading}
          />
        </div>
        <div>
          <CategoryBreakdown 
            categorySpending={filteredData?.categorySpending || []} 
            isLoading={isLoading}
          />
        </div>
      </div>
      
      {/* AI Insights */}
      <TrendsInsights insights={mockData.insights} />
    </div>
  );
};

export default SpendingTrends;
