
import { RecurringCategory } from '@/types/recurring';

// Get color for a category
export const getCategoryColor = (category: RecurringCategory): string => {
  const colors: Record<RecurringCategory, string> = {
    streaming: 'bg-budget-purple',
    utilities: 'bg-budget-blue',
    insurance: 'bg-budget-green',
    loans: 'bg-budget-red',
    memberships: 'bg-budget-orange',
    software: 'bg-budget-blue',
    education: 'bg-budget-green',
    entertainment: 'bg-budget-purple',
    food_delivery: 'bg-budget-orange',
    health: 'bg-budget-green',
    other: 'bg-muted-foreground'
  };
  
  return colors[category] || 'bg-muted-foreground';
};

// Get available category options
export const getAvailableCategories = () => [
  { value: 'streaming' as RecurringCategory, label: 'Streaming' },
  { value: 'utilities' as RecurringCategory, label: 'Utilities' },
  { value: 'insurance' as RecurringCategory, label: 'Insurance' },
  { value: 'loans' as RecurringCategory, label: 'Loans' },
  { value: 'memberships' as RecurringCategory, label: 'Memberships' },
  { value: 'software' as RecurringCategory, label: 'Software' },
  { value: 'education' as RecurringCategory, label: 'Education' },
  { value: 'entertainment' as RecurringCategory, label: 'Entertainment' },
  { value: 'food_delivery' as RecurringCategory, label: 'Food Delivery' },
  { value: 'health' as RecurringCategory, label: 'Health' },
  { value: 'other' as RecurringCategory, label: 'Other' }
];

// Capitalize first letter of a string
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
