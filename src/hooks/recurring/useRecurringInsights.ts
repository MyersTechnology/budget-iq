
import { useState } from 'react';
import { RecurringInsight } from '@/types/recurring';
import { mockRecurringInsights } from '@/utils/mockData/mockRecurring';

export const useRecurringInsights = () => {
  const [insights, setInsights] = useState<RecurringInsight[]>([]);
  
  // Dismiss an insight
  const dismissInsight = (insightId: string) => {
    setInsights(prev => 
      prev.filter(insight => insight.id !== insightId)
    );
  };
  
  // Load initial insights
  const loadInsights = () => {
    // Filter out dismissed insights
    setInsights(mockRecurringInsights.filter(insight => !insight.dismissed));
  };

  return {
    insights,
    dismissInsight,
    loadInsights
  };
};
