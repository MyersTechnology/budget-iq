
import { Account } from '@/types/accounts';

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
