
import { useState } from 'react';
import { RecurringItem, RecurringCategory } from '@/types/recurring';
import { calculateSummaries, generateUpcomingPayments } from '@/utils/recurring/recurringCalculations';
import { mockRecurringItems } from '@/utils/mockData/mockRecurring';

export const useRecurringItems = () => {
  const [recurringItems, setRecurringItems] = useState<RecurringItem[]>([]);
  
  // Toggle tracking for a recurring item
  const toggleItemTracking = (itemId: string, tracked: boolean) => {
    setRecurringItems(prev => {
      const updatedItems = prev.map(item => 
        item.id === itemId ? { ...item, isTracked: tracked } : item
      );
      
      return updatedItems;
    });
  };

  // Update category for a recurring item
  const updateItemCategory = (itemId: string, category: RecurringCategory) => {
    setRecurringItems(prev => {
      const updatedItems = prev.map(item => 
        item.id === itemId ? { ...item, category } : item
      );
      
      return updatedItems;
    });
  };
  
  // Load initial data
  const loadRecurringItems = () => {
    setRecurringItems(mockRecurringItems);
  };

  return {
    recurringItems,
    toggleItemTracking,
    updateItemCategory,
    loadRecurringItems
  };
};
