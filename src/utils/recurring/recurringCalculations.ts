
import { RecurringItem, CategorySummary, RecurringCategory, UpcomingPayment } from '@/types/recurring';

// Define display names and colors for categories
export const categoryDefaults: Record<RecurringCategory, { name: string, color: string }> = {
  streaming: { name: 'Streaming', color: 'bg-budget-purple' },
  utilities: { name: 'Utilities', color: 'bg-budget-blue' },
  insurance: { name: 'Insurance', color: 'bg-budget-green' },
  loans: { name: 'Loans', color: 'bg-budget-red' },
  memberships: { name: 'Memberships', color: 'bg-budget-orange' },
  software: { name: 'Software', color: 'bg-budget-blue' },
  education: { name: 'Education', color: 'bg-budget-green' },
  entertainment: { name: 'Entertainment', color: 'bg-budget-purple' },
  food_delivery: { name: 'Food Delivery', color: 'bg-budget-orange' },
  health: { name: 'Health', color: 'bg-budget-green' },
  other: { name: 'Other', color: 'bg-muted-foreground' }
};

// Calculate monthly and yearly totals, budget percentage, and category summaries
export const calculateSummaries = (items: RecurringItem[]) => {
  const trackedItems = items.filter(item => item.isTracked);
  
  // Calculate monthly total
  const monthly = trackedItems.reduce((sum, item) => {
    if (item.frequency === 'monthly') return sum + item.amount;
    if (item.frequency === 'yearly') return sum + (item.amount / 12);
    if (item.frequency === 'quarterly') return sum + (item.amount / 3);
    if (item.frequency === 'weekly') return sum + (item.amount * 4.33);
    if (item.frequency === 'biweekly') return sum + (item.amount * 2.17);
    return sum;
  }, 0);
  
  // Calculate yearly total
  const yearly = trackedItems.reduce((sum, item) => {
    if (item.frequency === 'monthly') return sum + (item.amount * 12);
    if (item.frequency === 'yearly') return sum + item.amount;
    if (item.frequency === 'quarterly') return sum + (item.amount * 4);
    if (item.frequency === 'weekly') return sum + (item.amount * 52);
    if (item.frequency === 'biweekly') return sum + (item.amount * 26);
    return sum;
  }, 0);
  
  // Assume a mock monthly budget of $5000
  const mockMonthlyBudget = 5000;
  const percentage = (monthly / mockMonthlyBudget) * 100;
  
  // Calculate category summaries
  const categoryMap = new Map<RecurringCategory, CategorySummary>();
  
  trackedItems.forEach(item => {
    const existingSummary = categoryMap.get(item.category);
    
    // Calculate monthly and yearly amounts for this item
    let itemMonthly = 0;
    let itemYearly = 0;
    
    if (item.frequency === 'monthly') {
      itemMonthly = item.amount;
      itemYearly = item.amount * 12;
    } else if (item.frequency === 'yearly') {
      itemMonthly = item.amount / 12;
      itemYearly = item.amount;
    } else if (item.frequency === 'quarterly') {
      itemMonthly = item.amount / 3;
      itemYearly = item.amount * 4;
    } else if (item.frequency === 'weekly') {
      itemMonthly = item.amount * 4.33;
      itemYearly = item.amount * 52;
    } else if (item.frequency === 'biweekly') {
      itemMonthly = item.amount * 2.17;
      itemYearly = item.amount * 26;
    }
    
    if (existingSummary) {
      categoryMap.set(item.category, {
        ...existingSummary,
        totalMonthly: existingSummary.totalMonthly + itemMonthly,
        totalYearly: existingSummary.totalYearly + itemYearly,
        count: existingSummary.count + 1
      });
    } else {
      const defaults = categoryDefaults[item.category];
      categoryMap.set(item.category, {
        category: item.category,
        displayName: defaults.name,
        totalMonthly: itemMonthly,
        totalYearly: itemYearly,
        count: 1,
        color: defaults.color
      });
    }
  });
  
  const categories = Array.from(categoryMap.values()).sort((a, b) => b.totalMonthly - a.totalMonthly);
  
  return {
    monthlyTotal: monthly,
    yearlyTotal: yearly,
    budgetPercentage: percentage,
    categories
  };
};

// Generate upcoming payments for the next 3 months
export const generateUpcomingPayments = (items: RecurringItem[]): UpcomingPayment[] => {
  const now = new Date();
  const threeMonthsLater = new Date(now);
  threeMonthsLater.setMonth(now.getMonth() + 3);
  
  const payments: UpcomingPayment[] = [];
  
  items.filter(item => item.isTracked).forEach(item => {
    const nextPaymentDate = new Date(item.nextPaymentDate);
    
    // Generate payments based on frequency
    while (nextPaymentDate < threeMonthsLater) {
      payments.push({
        id: `payment-${item.id}-${nextPaymentDate.toISOString()}`,
        itemId: item.id,
        name: item.name,
        amount: item.amount,
        currency: item.currency,
        date: nextPaymentDate.toISOString(),
        category: item.category,
        isPaid: nextPaymentDate < now
      });
      
      // Advance to next payment date
      if (item.frequency === 'monthly') {
        nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
      } else if (item.frequency === 'yearly') {
        nextPaymentDate.setFullYear(nextPaymentDate.getFullYear() + 1);
      } else if (item.frequency === 'quarterly') {
        nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 3);
      } else if (item.frequency === 'weekly') {
        nextPaymentDate.setDate(nextPaymentDate.getDate() + 7);
      } else if (item.frequency === 'biweekly') {
        nextPaymentDate.setDate(nextPaymentDate.getDate() + 14);
      }
    }
  });
  
  // Sort by date
  return payments.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};
