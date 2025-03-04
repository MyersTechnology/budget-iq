
import { AccountInsight } from '@/types/accounts';

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
