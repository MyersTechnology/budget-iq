
import { RecurringCategory } from '@/types/recurring';

/**
 * Category-related utility functions
 */

// Map of categories to their display colors
const categoryColorMap: Record<RecurringCategory, string> = {
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

/**
 * Get the background color CSS class for a given category
 */
export const getCategoryColor = (category: RecurringCategory): string => {
  return categoryColorMap[category] || 'bg-muted-foreground';
};

/**
 * Get all available categories with their display names
 */
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

/**
 * String utility functions
 */

/**
 * Capitalize the first letter of a string
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
