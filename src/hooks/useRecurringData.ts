
import { useState, useEffect } from 'react';
import { 
  RecurringItem, 
  RecurringCategory, 
  CategorySummary, 
  RecurringInsight,
  UpcomingPayment
} from '@/types/recurring';
import { mockRecurringItems, mockRecurringInsights } from '@/utils/mockData/mockRecurring';

export const useRecurringData = () => {
  const [recurringItems, setRecurringItems] = useState<RecurringItem[]>([]);
  const [insights, setInsights] = useState<RecurringInsight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<CategorySummary[]>([]);
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [yearlyTotal, setYearlyTotal] = useState(0);
  const [budgetPercentage, setBudgetPercentage] = useState(0);
  const [upcomingPayments, setUpcomingPayments] = useState<UpcomingPayment[]>([]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        // Load mock data
        setRecurringItems(mockRecurringItems);
        
        // Filter out dismissed insights
        setInsights(mockRecurringInsights.filter(insight => !insight.dismissed));
        
        // Calculate totals and categories
        calculateSummaries(mockRecurringItems);
        
        // Generate upcoming payments
        generateUpcomingPayments(mockRecurringItems);
        
        setIsLoading(false);
      }, 1000);
    };
    
    loadData();
  }, []);

  // Calculate monthly and yearly totals, budget percentage, and category summaries
  const calculateSummaries = (items: RecurringItem[]) => {
    const trackedItems = items.filter(item => item.isTracked);
    
    // Calculate monthly total
    const monthly = trackedItems.reduce((sum, item) => {
      if (item.frequency === 'monthly') return sum + item.amount;
      if (item.frequency === 'yearly') return sum + (item.amount / 12);
      if (item.frequency === 'quarterly') return sum + (item.amount / 3);
      if (item.frequency === 'weekly') return sum + (item.amount * 4.33);
      if (item.frequency === 'biweekly') return sum + (item.amount * 2.17);
      return sum;
    }, 0);
    
    // Calculate yearly total
    const yearly = trackedItems.reduce((sum, item) => {
      if (item.frequency === 'monthly') return sum + (item.amount * 12);
      if (item.frequency === 'yearly') return sum + item.amount;
      if (item.frequency === 'quarterly') return sum + (item.amount * 4);
      if (item.frequency === 'weekly') return sum + (item.amount * 52);
      if (item.frequency === 'biweekly') return sum + (item.amount * 26);
      return sum;
    }, 0);
    
    // Assume a mock monthly budget of $5000
    const mockMonthlyBudget = 5000;
    const percentage = (monthly / mockMonthlyBudget) * 100;
    
    setMonthlyTotal(monthly);
    setYearlyTotal(yearly);
    setBudgetPercentage(percentage);
    
    // Calculate category summaries
    const categoryMap = new Map<RecurringCategory, CategorySummary>();
    
    // Define display names and colors for categories
    const categoryDefaults: Record<RecurringCategory, { name: string, color: string }> = {
      streaming: { name: 'Streaming', color: 'bg-budget-purple' },
      utilities: { name: 'Utilities', color: 'bg-budget-blue' },
      insurance: { name: 'Insurance', color: 'bg-budget-green' },
      loans: { name: 'Loans', color: 'bg-budget-red' },
      memberships: { name: 'Memberships', color: 'bg-budget-orange' },
      software: { name: 'Software', color: 'bg-budget-blue' },
      education: { name: 'Education', color: 'bg-budget-green' },
      entertainment: { name: 'Entertainment', color: 'bg-budget-purple' },
      food_delivery: { name: 'Food Delivery', color: 'bg-budget-orange' },
      health: { name: 'Health', color: 'bg-budget-green' },
      other: { name: 'Other', color: 'bg-muted-foreground' }
    };
    
    trackedItems.forEach(item => {
      const existingSummary = categoryMap.get(item.category);
      
      // Calculate monthly and yearly amounts for this item
      let itemMonthly = 0;
      let itemYearly = 0;
      
      if (item.frequency === 'monthly') {
        itemMonthly = item.amount;
        itemYearly = item.amount * 12;
      } else if (item.frequency === 'yearly') {
        itemMonthly = item.amount / 12;
        itemYearly = item.amount;
      } else if (item.frequency === 'quarterly') {
        itemMonthly = item.amount / 3;
        itemYearly = item.amount * 4;
      } else if (item.frequency === 'weekly') {
        itemMonthly = item.amount * 4.33;
        itemYearly = item.amount * 52;
      } else if (item.frequency === 'biweekly') {
        itemMonthly = item.amount * 2.17;
        itemYearly = item.amount * 26;
      }
      
      if (existingSummary) {
        categoryMap.set(item.category, {
          ...existingSummary,
          totalMonthly: existingSummary.totalMonthly + itemMonthly,
          totalYearly: existingSummary.totalYearly + itemYearly,
          count: existingSummary.count + 1
        });
      } else {
        const defaults = categoryDefaults[item.category];
        categoryMap.set(item.category, {
          category: item.category,
          displayName: defaults.name,
          totalMonthly: itemMonthly,
          totalYearly: itemYearly,
          count: 1,
          color: defaults.color
        });
      }
    });
    
    setCategories(Array.from(categoryMap.values()).sort((a, b) => b.totalMonthly - a.totalMonthly));
  };

  // Generate upcoming payments for the next 3 months
  const generateUpcomingPayments = (items: RecurringItem[]) => {
    const now = new Date();
    const threeMonthsLater = new Date(now);
    threeMonthsLater.setMonth(now.getMonth() + 3);
    
    const payments: UpcomingPayment[] = [];
    
    items.filter(item => item.isTracked).forEach(item => {
      const nextPaymentDate = new Date(item.nextPaymentDate);
      
      // Generate payments based on frequency
      while (nextPaymentDate < threeMonthsLater) {
        payments.push({
          id: `payment-${item.id}-${nextPaymentDate.toISOString()}`,
          itemId: item.id,
          name: item.name,
          amount: item.amount,
          currency: item.currency,
          date: nextPaymentDate.toISOString(),
          category: item.category,
          isPaid: nextPaymentDate < now
        });
        
        // Advance to next payment date
        if (item.frequency === 'monthly') {
          nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
        } else if (item.frequency === 'yearly') {
          nextPaymentDate.setFullYear(nextPaymentDate.getFullYear() + 1);
        } else if (item.frequency === 'quarterly') {
          nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 3);
        } else if (item.frequency === 'weekly') {
          nextPaymentDate.setDate(nextPaymentDate.getDate() + 7);
        } else if (item.frequency === 'biweekly') {
          nextPaymentDate.setDate(nextPaymentDate.getDate() + 14);
        }
      }
    });
    
    // Sort by date
    payments.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    setUpcomingPayments(payments);
  };

  // Toggle tracking for a recurring item
  const toggleItemTracking = (itemId: string, tracked: boolean) => {
    setRecurringItems(prev => {
      const updatedItems = prev.map(item => 
        item.id === itemId ? { ...item, isTracked: tracked } : item
      );
      
      // Recalculate summaries with updated items
      calculateSummaries(updatedItems);
      generateUpcomingPayments(updatedItems);
      
      return updatedItems;
    });
  };

  // Update category for a recurring item
  const updateItemCategory = (itemId: string, category: RecurringCategory) => {
    setRecurringItems(prev => {
      const updatedItems = prev.map(item => 
        item.id === itemId ? { ...item, category: category as RecurringCategory } : item
      );
      
      // Recalculate summaries with updated items
      calculateSummaries(updatedItems);
      
      return updatedItems;
    });
  };

  // Dismiss an insight
  const dismissInsight = (insightId: string) => {
    setInsights(prev => 
      prev.filter(insight => insight.id !== insightId)
    );
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
