
import { Account, Transaction, AccountInsight } from '@/types/accounts';

export const mockLinkedAccounts: Account[] = [
  {
    id: 'acc1',
    name: 'Everyday Checking',
    institutionName: 'Chase Bank',
    institutionLogo: 'https://logo.clearbit.com/chase.com',
    type: 'checking',
    category: 'primary',
    balance: 4378.42,
    currency: 'USD',
    lastUpdated: '2023-09-15T16:30:00Z',
    isVisible: true,
    accountNumber: '••••4321'
  },
  {
    id: 'acc2',
    name: 'Premium Savings',
    institutionName: 'Chase Bank',
    institutionLogo: 'https://logo.clearbit.com/chase.com',
    type: 'savings',
    category: 'savings',
    balance: 15629.84,
    currency: 'USD',
    lastUpdated: '2023-09-15T16:30:00Z',
    isVisible: true,
    accountNumber: '••••8765'
  },
  {
    id: 'acc3',
    name: 'Rewards Credit Card',
    institutionName: 'American Express',
    institutionLogo: 'https://logo.clearbit.com/americanexpress.com',
    type: 'credit',
    category: 'credit',
    balance: -1245.67,
    currency: 'USD',
    lastUpdated: '2023-09-14T12:15:00Z',
    isVisible: true,
    accountNumber: '••••2468'
  },
  {
    id: 'acc4',
    name: 'Student Loan',
    institutionName: 'Navient',
    institutionLogo: 'https://logo.clearbit.com/navient.com',
    type: 'loan',
    category: 'other',
    balance: -24830.19,
    currency: 'USD',
    lastUpdated: '2023-09-10T09:45:00Z',
    isVisible: true,
    accountNumber: '••••1357'
  },
  {
    id: 'acc5',
    name: 'Investment Portfolio',
    institutionName: 'Fidelity',
    institutionLogo: 'https://logo.clearbit.com/fidelity.com',
    type: 'investment',
    category: 'investment',
    balance: 78452.31,
    currency: 'USD',
    lastUpdated: '2023-09-15T08:00:00Z',
    isVisible: true,
    accountNumber: '••••9753'
  }
];

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
    aiCategorized: true
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

export const mockAccountInsights: AccountInsight[] = [
  {
    id: 'insight1',
    type: 'fee',
    title: 'Unusual bank fee detected',
    description: 'Your checking account was charged a $35 overdraft fee on September 8th.',
    accountIds: ['acc1'],
    severity: 'high',
    action: 'Review Fee'
  },
  {
    id: 'insight2',
    type: 'balance',
    title: 'Low balance alert',
    description: 'Your checking account balance is below $500. Consider transferring funds to avoid overdraft fees.',
    accountIds: ['acc1'],
    severity: 'medium',
    action: 'Transfer Funds'
  },
  {
    id: 'insight3',
    type: 'savings',
    title: 'Savings opportunity',
    description: 'Based on your cash flow, you could safely move $1,500 from checking to your savings account this month.',
    accountIds: ['acc1', 'acc2'],
    severity: 'low',
    action: 'Set Up Transfer'
  },
  {
    id: 'insight4',
    type: 'duplicate',
    title: 'Potential duplicate transaction',
    description: 'We detected two similar payments to "Amazon.com" within 24 hours.',
    accountIds: ['acc3'],
    severity: 'medium',
    action: 'Review Transactions'
  }
];
