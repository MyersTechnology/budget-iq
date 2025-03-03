
// Mock data for development

// Transaction Types
export type TransactionType = 'expense' | 'income' | 'transfer';

// Transaction Categories
export type Category = 
  | 'groceries'
  | 'dining'
  | 'transportation'
  | 'shopping'
  | 'entertainment'
  | 'utilities'
  | 'housing'
  | 'healthcare'
  | 'travel'
  | 'personal'
  | 'education'
  | 'subscriptions'
  | 'income'
  | 'transfer'
  | 'other';

// Transaction Interface
export interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: TransactionType;
  category: Category;
  pending: boolean;
  aiCategorized?: boolean;
}

// Budget Recommendation Interface
export interface BudgetRecommendation {
  category: Category;
  currentSpending: number;
  recommendedBudget: number;
  previousSpending: number;
  percentChange: number;
}

// Spending by Category Interface
export interface CategorySpending {
  category: Category;
  amount: number;
  percentage: number;
  color: string;
}

// Insight Interface
export interface Insight {
  id: string;
  type: 'info' | 'warning' | 'success';
  title: string;
  description: string;
  actionText?: string;
  actionUrl?: string;
}

// Get category icon and color
export const getCategoryInfo = (category: Category) => {
  const categoryMap: Record<Category, { color: string, label: string }> = {
    groceries: { color: 'bg-budget-green', label: 'Groceries' },
    dining: { color: 'bg-budget-orange', label: 'Dining' },
    transportation: { color: 'bg-budget-blue', label: 'Transport' },
    shopping: { color: 'bg-purple-400', label: 'Shopping' },
    entertainment: { color: 'bg-pink-400', label: 'Entertainment' },
    utilities: { color: 'bg-blue-400', label: 'Utilities' },
    housing: { color: 'bg-indigo-400', label: 'Housing' },
    healthcare: { color: 'bg-red-400', label: 'Healthcare' },
    travel: { color: 'bg-teal-400', label: 'Travel' },
    personal: { color: 'bg-amber-400', label: 'Personal' },
    education: { color: 'bg-cyan-400', label: 'Education' },
    subscriptions: { color: 'bg-budget-purple', label: 'Subscriptions' },
    income: { color: 'bg-emerald-400', label: 'Income' },
    transfer: { color: 'bg-gray-400', label: 'Transfer' },
    other: { color: 'bg-gray-400', label: 'Other' }
  };

  return categoryMap[category] || { color: 'bg-gray-400', label: 'Unknown' };
};

// Generate random transactions
export const generateTransactions = (count: number): Transaction[] => {
  const transactions: Transaction[] = [];
  
  const descriptions = {
    groceries: ['Whole Foods', 'Trader Joe\'s', 'Safeway', 'Kroger', 'Costco'],
    dining: ['Starbucks', 'Chipotle', 'Local Restaurant', 'DoorDash', 'Uber Eats'],
    transportation: ['Uber', 'Lyft', 'Gas Station', 'Parking', 'Public Transit'],
    shopping: ['Amazon', 'Target', 'Walmart', 'Best Buy', 'Apple Store'],
    entertainment: ['Netflix', 'Movie Theater', 'Spotify', 'Concert Tickets', 'Steam Games'],
    utilities: ['Electric Bill', 'Water Bill', 'Internet Provider', 'Phone Bill', 'Gas Bill'],
    housing: ['Rent Payment', 'Mortgage', 'HOA Fees', 'Home Insurance', 'Home Repairs'],
    healthcare: ['Pharmacy', 'Doctor Visit', 'Health Insurance', 'Dental Care', 'Glasses'],
    travel: ['Airline Tickets', 'Hotel Stay', 'Airbnb', 'Car Rental', 'Travel Insurance'],
    personal: ['Haircut', 'Gym Membership', 'Clothing Store', 'Spa', 'Personal Care'],
    education: ['Tuition', 'Books', 'Course Fee', 'Student Loan', 'Education Software'],
    subscriptions: ['Adobe CC', 'NY Times', 'Patreon', 'YouTube Premium', 'Apple One'],
    income: ['Payroll Deposit', 'Freelance Payment', 'Refund', 'Interest', 'Dividend'],
    transfer: ['Transfer to Savings', 'External Transfer', 'Venmo', 'PayPal', 'Zelle'],
    other: ['Miscellaneous', 'Unknown Vendor', 'ATM Withdrawal', 'Check Deposit', 'Adjustment']
  };

  const categories = Object.keys(descriptions) as Category[];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const categoryDescriptions = descriptions[category];
    const description = categoryDescriptions[Math.floor(Math.random() * categoryDescriptions.length)];
    
    // Generate transaction date within the last 30 days
    const date = new Date(now);
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    // Determine transaction type based on category
    let type: TransactionType = 'expense';
    if (category === 'income') type = 'income';
    if (category === 'transfer') type = 'transfer';
    
    // Generate amount
    const minAmount = type === 'income' ? 500 : 5;
    const maxAmount = type === 'income' ? 5000 : 200;
    const amount = type === 'income' 
      ? Math.round((Math.random() * (maxAmount - minAmount) + minAmount) * 100) / 100
      : -Math.round((Math.random() * (maxAmount - minAmount) + minAmount) * 100) / 100;
    
    // Create transaction
    transactions.push({
      id: `tx-${i + 1}`,
      date,
      description,
      amount,
      type,
      category,
      pending: Math.random() > 0.9,
      aiCategorized: Math.random() > 0.3
    });
  }
  
  // Sort by date (most recent first)
  return transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
};

// Generate mock budget recommendations
export const generateBudgetRecommendations = (): BudgetRecommendation[] => {
  const categories: Category[] = ['groceries', 'dining', 'transportation', 'shopping', 'entertainment'];
  
  return categories.map(category => {
    const currentSpending = Math.round(Math.random() * 500 + 100);
    const previousSpending = Math.round(Math.random() * 500 + 100);
    const percentChange = Math.round(((currentSpending - previousSpending) / previousSpending) * 100);
    const recommendedBudget = percentChange > 15 
      ? Math.round(currentSpending * 0.9) 
      : Math.round(currentSpending * 1.05);
      
    return {
      category,
      currentSpending,
      recommendedBudget,
      previousSpending,
      percentChange
    };
  });
};

// Generate mock spending by category
export const generateCategorySpending = (): CategorySpending[] => {
  const categories: Category[] = ['groceries', 'dining', 'transportation', 'shopping', 'entertainment', 'utilities', 'subscriptions'];
  let total = 0;
  const spending = categories.map(category => {
    const amount = Math.round(Math.random() * 500 + 100);
    total += amount;
    return { category, amount, percentage: 0, color: getCategoryInfo(category).color };
  });
  
  // Calculate percentages
  return spending.map(item => ({
    ...item,
    percentage: Math.round((item.amount / total) * 100)
  }));
};

// Generate mock insights
export const generateInsights = (): Insight[] => {
  return [
    {
      id: 'insight-1',
      type: 'warning',
      title: 'Unusual spending detected',
      description: 'Your dining expenses are 35% higher than usual this month.'
    },
    {
      id: 'insight-2',
      type: 'success',
      title: 'You're on track with your budget',
      description: 'You've spent 45% of your monthly budget and you're halfway through the month.'
    },
    {
      id: 'insight-3',
      type: 'info',
      title: 'Subscription increase detected',
      description: 'Your Netflix subscription increased from $13.99 to $15.49 this month.',
      actionText: 'Review subscriptions',
      actionUrl: '/subscriptions'
    }
  ];
};

// Mock data export
export const mockData = {
  transactions: generateTransactions(50),
  budgetRecommendations: generateBudgetRecommendations(),
  categorySpending: generateCategorySpending(),
  insights: generateInsights(),
  totalBalance: 12467.89,
  monthlyIncome: 5842.32,
  monthlyExpenses: 3216.47
};
