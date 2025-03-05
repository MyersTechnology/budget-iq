
import { FinancialGoal, GoalInsight } from '@/types/goals';

// Mock data for goals
export const mockGoals: FinancialGoal[] = [
  {
    id: '1',
    name: 'Emergency Fund',
    category: 'emergency_fund',
    targetAmount: 10000,
    currentAmount: 2500,
    createdAt: '2023-01-15T00:00:00Z',
    targetDate: null,
    priority: 'high',
    status: 'active',
    contributionFrequency: 'monthly',
    contributionAmount: 400,
    autoAdjust: true
  },
  {
    id: '2',
    name: 'House Down Payment',
    category: 'house_down_payment',
    targetAmount: 50000,
    currentAmount: 15000,
    createdAt: '2023-02-10T00:00:00Z',
    targetDate: '2025-12-31T00:00:00Z',
    priority: 'medium',
    status: 'active',
    contributionFrequency: 'monthly',
    contributionAmount: 800,
    autoAdjust: false,
    notes: 'For a 3-bedroom house in the suburbs'
  },
  {
    id: '3',
    name: 'Debt Payoff - Credit Card',
    category: 'debt_payoff',
    targetAmount: 4000,
    currentAmount: 3200,
    createdAt: '2023-03-05T00:00:00Z',
    targetDate: '2023-07-15T00:00:00Z',
    priority: 'high',
    status: 'active',
    contributionFrequency: 'biweekly',
    contributionAmount: 350,
    autoAdjust: true
  },
  {
    id: '4',
    name: 'Europe Vacation',
    category: 'vacation',
    targetAmount: 6000,
    currentAmount: 1500,
    createdAt: '2023-05-20T00:00:00Z',
    targetDate: '2024-06-01T00:00:00Z',
    priority: 'low',
    status: 'active',
    contributionFrequency: 'monthly',
    contributionAmount: 300,
    autoAdjust: true,
    notes: 'Two-week trip to France, Italy, and Spain'
  }
];

// Mock insights
export const mockInsights: GoalInsight[] = [
  {
    id: 'insight1',
    title: 'Debt payoff ahead of schedule',
    description: 'You\'re on track to pay off your credit card 2 months ahead of your target date.',
    type: 'success',
    goalId: '3'
  },
  {
    id: 'insight2',
    title: 'Increase emergency fund contribution',
    description: 'Based on your income and spending patterns, you could increase your monthly contribution by $100.',
    type: 'info',
    action: 'Optimize Contribution',
    goalId: '1'
  },
  {
    id: 'insight3',
    title: 'Vacation fund at risk',
    description: 'Your current contribution rate won\'t meet your Europe vacation goal by the target date.',
    type: 'warning',
    action: 'View Options',
    goalId: '4'
  },
  {
    id: 'insight4',
    title: 'Smart transfer opportunity',
    description: 'You have $240 in potential savings from last month\'s spending that could go to your goals.',
    type: 'info',
    action: 'Transfer Funds'
  }
];
