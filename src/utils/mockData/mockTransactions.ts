
import { Transaction } from '@/utils/transactions';

export const mockTransactions: Transaction[] = [
  {
    id: 'trx1',
    accountId: 'acc1',
    date: '2023-09-15T10:23:00Z',
    description: 'Whole Foods Market',
    merchant: 'Whole Foods',
    amount: -87.32,
    currency: 'USD',
    category: 'Groceries',
    pending: false,
    aiCategorized: true
  },
  {
    id: 'trx2',
    accountId: 'acc1',
    date: '2023-09-14T08:12:00Z',
    description: 'Monthly Salary',
    merchant: 'ACME Corp',
    amount: 3200.00,
    currency: 'USD',
    category: 'Income',
    pending: false
  },
  {
    id: 'trx3',
    accountId: 'acc1',
    date: '2023-09-13T19:45:00Z',
    description: 'Netflix Subscription',
    merchant: 'Netflix',
    amount: -15.99,
    currency: 'USD',
    category: 'Entertainment',
    pending: false,
    aiCategorized: true,
    isRecurring: true
  },
  {
    id: 'trx4',
    accountId: 'acc3',
    date: '2023-09-12T12:34:00Z',
    description: 'Amazon.com',
    merchant: 'Amazon',
    amount: -64.37,
    currency: 'USD',
    category: 'Shopping',
    pending: false,
    aiCategorized: true
  },
  {
    id: 'trx5',
    accountId: 'acc3',
    date: '2023-09-11T20:15:00Z',
    description: 'Uber Ride',
    merchant: 'Uber',
    amount: -24.50,
    currency: 'USD',
    category: 'Transportation',
    pending: false,
    aiCategorized: true
  },
  {
    id: 'trx6',
    accountId: 'acc1',
    date: '2023-09-10T18:20:00Z',
    description: 'Chevron Gas Station',
    merchant: 'Chevron',
    amount: -42.15,
    currency: 'USD',
    category: 'Transportation',
    pending: false,
    aiCategorized: true
  },
  {
    id: 'trx7',
    accountId: 'acc2',
    date: '2023-09-10T09:00:00Z',
    description: 'Transfer to Savings',
    amount: 500.00,
    currency: 'USD',
    category: 'Transfer',
    pending: false
  },
  {
    id: 'trx8',
    accountId: 'acc1',
    date: '2023-09-09T13:45:00Z',
    description: 'Starbucks Coffee',
    merchant: 'Starbucks',
    amount: -5.75,
    currency: 'USD',
    category: 'Food & Drink',
    pending: false,
    aiCategorized: true
  }
];
