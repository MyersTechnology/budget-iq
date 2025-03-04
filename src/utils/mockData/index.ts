
// Export all mock data from a central location
export { mockLinkedAccounts } from './mockAccounts';
export { mockTransactions } from './mockTransactions';
export { mockAccountInsights } from './mockInsights';

// Re-export the types from the main utils/mockData.ts for backward compatibility
export type { CategorySpending, BudgetRecommendation, Insight } from '../mockData';
