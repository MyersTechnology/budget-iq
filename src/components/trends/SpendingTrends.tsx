
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
    <div className="w-full max-w-full mx-auto space-y-4 sm:space-y-6 py-4 sm:py-6 pb-10 animate-fade-in overflow-hidden">
      <div className="flex flex-col gap-3 mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Trends & AI Insights</h1>
        
        <Tabs 
          value={selectedTimeframe} 
          onValueChange={(value) => setSelectedTimeframe(value as any)} 
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 w-full">
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
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
