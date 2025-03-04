
import { useState, useEffect } from 'react';
import { CategorySummary, UpcomingPayment } from '@/types/recurring';
import { useRecurringItems } from '@/hooks/recurring/useRecurringItems';
import { useRecurringInsights } from '@/hooks/recurring/useRecurringInsights';
import { calculateSummaries, generateUpcomingPayments } from '@/utils/recurring/recurringCalculations';

export const useRecurringData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<CategorySummary[]>([]);
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [yearlyTotal, setYearlyTotal] = useState(0);
  const [budgetPercentage, setBudgetPercentage] = useState(0);
  const [upcomingPayments, setUpcomingPayments] = useState<UpcomingPayment[]>([]);
  
  const { 
    recurringItems, 
    toggleItemTracking: toggleItemTrackingBase, 
    updateItemCategory: updateItemCategoryBase,
    loadRecurringItems 
  } = useRecurringItems();
  
  const { insights, dismissInsight, loadInsights } = useRecurringInsights();

  // Recalculate summaries when items change
  useEffect(() => {
    if (recurringItems.length > 0) {
      const results = calculateSummaries(recurringItems);
      setMonthlyTotal(results.monthlyTotal);
      setYearlyTotal(results.yearlyTotal);
      setBudgetPercentage(results.budgetPercentage);
      setCategories(results.categories);
      
      const payments = generateUpcomingPayments(recurringItems);
      setUpcomingPayments(payments);
    }
  }, [recurringItems]);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        loadRecurringItems();
        loadInsights();
        setIsLoading(false);
      }, 1000);
    };
    
    loadData();
  }, []);

  // Toggle tracking with recalculation
  const toggleItemTracking = (itemId: string, tracked: boolean) => {
    toggleItemTrackingBase(itemId, tracked);
  };

  // Update category with recalculation
  const updateItemCategory = (itemId: string, category: string) => {
    updateItemCategoryBase(itemId, category as any);
  };

  return {
    recurringItems,
    categories,
    insights,
    isLoading,
    monthlyTotal,
    yearlyTotal,
    budgetPercentage,
    upcomingPayments,
    toggleItemTracking,
    updateItemCategory,
    dismissInsight
  };
};
