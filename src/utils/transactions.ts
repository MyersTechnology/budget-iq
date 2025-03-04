
import { LucideIcon } from 'lucide-react';

// Core transaction type that will be used across the application
export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  currency: string;
  category: string;
  pending: boolean;
  
  // Optional fields
  accountId?: string;       // Only required for linked account transactions
  merchant?: string;        // Optional merchant information
  isRecurring?: boolean;    // Indicates if this is a recurring transaction
  aiCategorized?: boolean;  // Whether AI categorized this transaction
  notes?: string;           // User notes
}

// Category management
export interface CategoryInfo {
  color: string;
  icon?: LucideIcon;
  label: string;
}

// Helper function to get category information
export const getCategoryInfo = (category: string): CategoryInfo => {
  const categories: Record<string, CategoryInfo> = {
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
    'Income': { color: 'bg-budget-green', label: 'Income' },
    'Transfer': { color: 'bg-muted-foreground', label: 'Transfer' },
    'Miscellaneous': { color: 'bg-muted-foreground', label: 'Miscellaneous' },
  };
  
  return categories[category] || { color: 'bg-muted-foreground', label: category };
};

// Helper for formatting currency amounts
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
