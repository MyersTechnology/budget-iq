
export type AccountType = 'checking' | 'savings' | 'credit' | 'investment' | 'loan' | 'other';
export type AccountCategory = 'primary' | 'savings' | 'credit' | 'investment' | 'business' | 'other';

export interface Account {
  id: string;
  name: string;
  institutionName: string;
  institutionLogo: string;
  type: AccountType;
  category: AccountCategory;
  balance: number;
  currency: string;
  lastUpdated: string;
  isVisible: boolean;
  accountNumber: string; // Masked, e.g. "••••1234"
}

export interface Transaction {
  id: string;
  accountId: string;
  date: string;
  description: string;
  merchant?: string;
  amount: number;
  currency: string;
  category: string;
  pending: boolean;
  aiCategorized?: boolean;
  notes?: string;
}

export interface AccountInsight {
  id: string;
  type: 'fee' | 'duplicate' | 'inactive' | 'balance' | 'savings';
  title: string;
  description: string;
  accountIds: string[];
  severity: 'low' | 'medium' | 'high';
  action?: string;
}
