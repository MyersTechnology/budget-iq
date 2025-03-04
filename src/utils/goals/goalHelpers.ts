
import { GoalCategory } from '@/types/goals';
import { 
  Shield, 
  Home, 
  CreditCard, 
  Plane, 
  Coins, 
  GraduationCap, 
  Car, 
  HeartHandshake,
  Goal,
  LucideIcon
} from 'lucide-react';

interface CategoryInfo {
  label: string;
  icon: LucideIcon;
  color: {
    bg: string;
    text: string;
    cssVar: string;
  };
}

// Map of goal categories to their display information
const categoryInfoMap: Record<GoalCategory, CategoryInfo> = {
  emergency_fund: {
    label: 'Emergency Fund',
    icon: Shield,
    color: {
      bg: 'bg-budget-blue/10',
      text: 'text-budget-blue',
      cssVar: '--budget-blue'
    }
  },
  house_down_payment: {
    label: 'House Down Payment',
    icon: Home,
    color: {
      bg: 'bg-budget-green/10',
      text: 'text-budget-green',
      cssVar: '--budget-green'
    }
  },
  debt_payoff: {
    label: 'Debt Payoff',
    icon: CreditCard,
    color: {
      bg: 'bg-budget-red/10',
      text: 'text-budget-red',
      cssVar: '--budget-red'
    }
  },
  vacation: {
    label: 'Vacation',
    icon: Plane,
    color: {
      bg: 'bg-budget-purple/10',
      text: 'text-budget-purple',
      cssVar: '--budget-purple'
    }
  },
  retirement: {
    label: 'Retirement',
    icon: Coins,
    color: {
      bg: 'bg-budget-orange/10',
      text: 'text-budget-orange',
      cssVar: '--budget-orange'
    }
  },
  education: {
    label: 'Education',
    icon: GraduationCap,
    color: {
      bg: 'bg-budget-blue/10',
      text: 'text-budget-blue',
      cssVar: '--budget-blue'
    }
  },
  car: {
    label: 'Car',
    icon: Car,
    color: {
      bg: 'bg-budget-green/10',
      text: 'text-budget-green',
      cssVar: '--budget-green'
    }
  },
  wedding: {
    label: 'Wedding',
    icon: HeartHandshake,
    color: {
      bg: 'bg-budget-purple/10',
      text: 'text-budget-purple',
      cssVar: '--budget-purple'
    }
  },
  other: {
    label: 'Other',
    icon: Goal,
    color: {
      bg: 'bg-muted-foreground/10',
      text: 'text-muted-foreground',
      cssVar: '--muted-foreground'
    }
  }
};

/**
 * Get display information for a goal category
 */
export const getGoalCategoryInfo = (category: GoalCategory): CategoryInfo => {
  return categoryInfoMap[category] || categoryInfoMap.other;
};

/**
 * Get all available goal categories with their display names
 */
export const getGoalCategories = () => Object.entries(categoryInfoMap).map(([value, info]) => ({
  value: value as GoalCategory,
  label: info.label
}));

/**
 * Calculate the estimated completion date based on current progress and contribution rate
 */
export const calculateEstimatedCompletion = (
  targetAmount: number, 
  currentAmount: number, 
  contributionAmount: number,
  contributionFrequency: 'weekly' | 'biweekly' | 'monthly'
): Date | null => {
  if (contributionAmount <= 0) return null;
  
  const remaining = targetAmount - currentAmount;
  if (remaining <= 0) return new Date(); // Already completed
  
  // Convert all to monthly rate for easier calculation
  let monthlyContribution = contributionAmount;
  if (contributionFrequency === 'weekly') {
    monthlyContribution = contributionAmount * 4.33; // Average weeks in a month
  } else if (contributionFrequency === 'biweekly') {
    monthlyContribution = contributionAmount * 2.17; // Average bi-weeks in a month
  }
  
  const monthsToCompletion = remaining / monthlyContribution;
  const today = new Date();
  const completionDate = new Date(today);
  completionDate.setMonth(today.getMonth() + Math.ceil(monthsToCompletion));
  
  return completionDate;
};

/**
 * Format a completion date in a human-readable format
 */
export const formatCompletionTime = (completionDate: Date | null): string => {
  if (!completionDate) return 'Unknown';
  
  const today = new Date();
  const diffInMs = completionDate.getTime() - today.getTime();
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays <= 0) return 'Complete';
  if (diffInDays === 1) return 'Tomorrow';
  if (diffInDays <= 7) return `${diffInDays} days`;
  if (diffInDays <= 30) return `${Math.ceil(diffInDays / 7)} weeks`;
  if (diffInDays <= 365) return `${Math.ceil(diffInDays / 30)} months`;
  return `${Math.round(diffInDays / 365)} years`;
};
