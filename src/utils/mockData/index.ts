
// Export all mock data from a central location
export { mockLinkedAccounts } from './mockAccounts';
export { mockTransactions } from './mockTransactions';
export { mockAccountInsights } from './mockInsights';
export { mockRecurringItems, mockRecurringInsights } from './mockRecurring';

// Re-export the types from the main utils/mockData.ts for backward compatibility
export type { CategorySpending, BudgetRecommendation, Insight } from '../mockData';
