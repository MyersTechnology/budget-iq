
import { useState, useEffect } from 'react';
import { mockData, BudgetRecommendation, getCategoryInfo } from '@/utils/mockData';

export interface BudgetCategory {
  category: string;
  recommended: number;
  current: number;
  percentUsed: number;
  remaining: number;
  isOverBudget: boolean;
  percentChange: number;
  color: string;
  label: string;
}

export interface BudgetInsight {
  id: string;
  title: string;
  description: string;
  type: 'savings' | 'warning' | 'info';
  action?: string;
}

export interface BudgetData {
  totalBudget: number;
  totalSpent: number;
  remainingBudget: number;
  percentUsed: number;
  categories: BudgetCategory[];
  insights: BudgetInsight[];
}

export const useBudgetData = () => {
  const [budgetData, setBudgetData] = useState<BudgetData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Process budget recommendations from mock data
      const categories = mockData.budgetRecommendations.map((rec: BudgetRecommendation) => {
        const { color, label } = getCategoryInfo(rec.category);
        const percentUsed = Math.round((rec.currentSpending / rec.recommendedBudget) * 100);
        const remaining = rec.recommendedBudget - rec.currentSpending;
        
        return {
          category: rec.category,
          recommended: rec.recommendedBudget,
          current: rec.currentSpending,
          percentUsed,
          remaining,
          isOverBudget: percentUsed > 100,
          percentChange: rec.percentChange,
          color,
          label
        };
      });
      
      // Calculate totals
      const totalBudget = categories.reduce((sum, cat) => sum + cat.recommended, 0);
      const totalSpent = categories.reduce((sum, cat) => sum + cat.current, 0);
      const remainingBudget = totalBudget - totalSpent;
      const percentUsed = Math.round((totalSpent / totalBudget) * 100);
      
      // Generate AI budget insights
      const insights: BudgetInsight[] = [
        {
          id: 'budget-ins1',
          title: 'Optimize your dining budget',
          description: 'You\'ve consistently spent more on dining than recommended. Consider reducing by $70 to meet your savings goals.',
          type: 'warning',
          action: 'Adjust Budget'
        },
        {
          id: 'budget-ins2',
          title: 'Grocery spending is on target',
          description: 'Your grocery spending is well-aligned with your budget. Keep up the good work!',
          type: 'info'
        },
        {
          id: 'budget-ins3',
          title: 'Potential subscription savings',
          description: 'We found $30 in unused subscriptions that could be redirected to your savings goals.',
          type: 'savings',
          action: 'Review Subscriptions'
        }
      ];
      
      setBudgetData({
        totalBudget,
        totalSpent,
        remainingBudget,
        percentUsed,
        categories,
        insights
      });
      
      setIsLoading(false);
    }, 800);
  }, []);
  
  return { budgetData, isLoading };
};
