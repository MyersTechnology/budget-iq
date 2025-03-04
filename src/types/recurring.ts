
// Types for recurring expenses and subscriptions
export interface RecurringItem {
  id: string;
  name: string;
  description?: string;
  amount: number;
  currency: string;
  category: RecurringCategory;
  frequency: 'monthly' | 'weekly' | 'yearly' | 'quarterly' | 'biweekly';
  nextPaymentDate: string;
  isTracked: boolean;
  isAutoDetected: boolean;
  provider?: string;
  cancellationUrl?: string;
  isNewlyDetected?: boolean;
  priceIncreased?: boolean;
  lastPaymentDate?: string;
  paymentMethod?: string;
  accountId?: string;
  tags?: string[];
  notes?: string;
  hasDuplicate?: boolean;
  usageLevel?: 'high' | 'medium' | 'low' | 'unused';
  startDate?: string;
}

export type RecurringCategory = 
  | 'streaming' 
  | 'utilities' 
  | 'insurance' 
  | 'loans' 
  | 'memberships' 
  | 'software' 
  | 'education' 
  | 'entertainment'
  | 'food_delivery'
  | 'health'
  | 'other';

export interface CategorySummary {
  category: RecurringCategory;
  displayName: string;
  totalMonthly: number;
  totalYearly: number;
  count: number;
  color: string;
  icon?: string;
}

export interface RecurringInsight {
  id: string;
  type: 'price_increase' | 'unused' | 'duplicate' | 'savings' | 'alert';
  title: string;
  description: string;
  itemIds: string[];
  severity: 'low' | 'medium' | 'high';
  action?: string;
  actionUrl?: string;
  potentialSavings?: number;
  dismissed?: boolean;
}

export interface UpcomingPayment {
  id: string;
  itemId: string;
  name: string;
  amount: number;
  currency: string;
  date: string;
  category: RecurringCategory;
  isPaid?: boolean;
  reminderSet?: boolean;
}
