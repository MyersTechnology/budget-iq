
// This file is now a simple re-export to maintain backward compatibility
import { Account, AccountInsight } from '@/types/accounts';
import { Transaction } from '@/utils/transactions';

// Re-export the mock data from the new location
export { 
  mockLinkedAccounts,
  mockTransactions,
  mockAccountInsights
} from './mockData/index';
