
import { LucideIcon } from 'lucide-react';

// Types for our mock data
export interface Transaction {
  id: string;
  date: string;
  amount: number;
  description: string;
  category: string;
  isRecurring: boolean;
  pending?: boolean;
  aiCategorized?: boolean;
}

export interface CategorySpending {
  category: string;
  amount: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
  previousAmount: number;
  color?: string; // Add color property used in SpendingOverview
}

export interface BudgetRecommendation {
  category: string;
  recommendedBudget: number; // Renamed from 'recommended'
  currentSpending: number;   // Renamed from 'current'
  percentChange: number;
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  type: 'savings' | 'warning' | 'info'; // Restrict to only these types
  action?: string;
}

// Helper functions for UI
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const getCategoryInfo = (category: string) => {
  const categories: Record<string, { color: string; icon?: LucideIcon; label: string }> = {
    'Groceries': { color: 'bg-budget-green', label: 'Groceries' },
    'Dining': { color: 'bg-budget-orange', label: 'Dining' },
    'Entertainment': { color: 'bg-budget-purple', label: 'Entertainment' },
    'Shopping': { color: 'bg-budget-blue', label: 'Shopping' },
    'Housing': { color: 'bg-budget-red', label: 'Housing' },
    'Transportation': { color: 'bg-budget-blue', label: 'Transportation' },
    'Travel': { color: 'bg-budget-purple', label: 'Travel' },
    'Utilities': { color: 'bg-budget-orange', label: 'Utilities' },
    'Healthcare': { color: 'bg-budget-red', label: 'Healthcare' },
    'Subscriptions': { color: 'bg-budget-blue', label: 'Subscriptions' },
    'Personal': { color: 'bg-budget-green', label: 'Personal' },
    'Miscellaneous': { color: 'bg-muted-foreground', label: 'Miscellaneous' },
  };
  
  return categories[category] || { color: 'bg-muted-foreground', label: category };
};

// Mock data for our application
export const mockData = {
  // User financial overview
  totalBalance: 8750,
  monthlyIncome: 5200,
  monthlyExpenses: 3450,
  
  // Spending by category
  categorySpending: [
    { category: 'Housing', amount: 1400, percentage: 40.6, trend: 'stable' as const, previousAmount: 1400, color: 'bg-budget-red' },
    { category: 'Groceries', amount: 650, percentage: 18.8, trend: 'up' as const, previousAmount: 580, color: 'bg-budget-green' },
    { category: 'Dining', amount: 420, percentage: 12.2, trend: 'up' as const, previousAmount: 350, color: 'bg-budget-orange' },
    { category: 'Transportation', amount: 280, percentage: 8.1, trend: 'down' as const, previousAmount: 310, color: 'bg-budget-blue' },
    { category: 'Entertainment', amount: 250, percentage: 7.2, trend: 'down' as const, previousAmount: 290, color: 'bg-budget-purple' },
    { category: 'Utilities', amount: 180, percentage: 5.2, trend: 'stable' as const, previousAmount: 175, color: 'bg-budget-orange' },
    { category: 'Subscriptions', amount: 150, percentage: 4.3, trend: 'up' as const, previousAmount: 130, color: 'bg-budget-blue' },
    { category: 'Miscellaneous', amount: 120, percentage: 3.5, trend: 'stable' as const, previousAmount: 125, color: 'bg-muted-foreground' },
  ],
  
  // Budget recommendations
  budgetRecommendations: [
    { category: 'Dining', recommendedBudget: 350, currentSpending: 420, percentChange: 20 },
    { category: 'Groceries', recommendedBudget: 600, currentSpending: 650, percentChange: 8 },
    { category: 'Entertainment', recommendedBudget: 250, currentSpending: 250, percentChange: 0 },
    { category: 'Subscriptions', recommendedBudget: 120, currentSpending: 150, percentChange: 25 },
  ],
  
  // Recent transactions
  transactions: [
    { id: 't1', date: '2023-05-01', amount: 42.50, description: 'Whole Foods Market', category: 'Groceries', isRecurring: false, aiCategorized: true },
    { id: 't2', date: '2023-05-01', amount: 9.99, description: 'Netflix Subscription', category: 'Subscriptions', isRecurring: true },
    { id: 't3', date: '2023-04-30', amount: 35.00, description: 'Local Restaurant', category: 'Dining', isRecurring: false },
    { id: 't4', date: '2023-04-29', amount: 65.20, description: 'Gas Station', category: 'Transportation', isRecurring: false, pending: true },
    { id: 't5', date: '2023-04-28', amount: 1400.00, description: 'Rent Payment', category: 'Housing', isRecurring: true },
    { id: 't6', date: '2023-04-27', amount: 15.49, description: 'Spotify Premium', category: 'Subscriptions', isRecurring: true },
    { id: 't7', date: '2023-04-26', amount: 55.30, description: 'Grocery Store', category: 'Groceries', isRecurring: false },
  ],
  
  // AI insights
  insights: [
    { 
      id: 'ins1', 
      title: 'Grocery spending increased', 
      description: 'Your grocery spending is 12% higher than last month. Would you like to see where the increase is coming from?', 
      type: 'warning' as const,
      action: 'View Details'
    },
    { 
      id: 'ins2', 
      title: 'Potential savings on subscriptions', 
      description: 'We\'ve identified $23.97 in subscriptions you haven\'t used in the last 30 days.', 
      type: 'savings' as const,
      action: 'Review Subscriptions'
    },
    { 
      id: 'ins3', 
      title: 'Dining out budget optimized', 
      description: 'Based on your habits, we\'ve adjusted your recommended dining budget from $380 to $350.', 
      type: 'info' as const
    }
  ],
};
