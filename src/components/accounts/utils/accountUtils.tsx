
import { PiggyBank, CreditCard, TrendingUp, DollarSign } from "lucide-react";

// Helper component for account type icons
export const CreditCardIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'savings':
      return <PiggyBank className="h-4 w-4 text-budget-green" />;
    case 'credit':
      return <CreditCard className="h-4 w-4 text-budget-purple" />;
    case 'investment':
      return <TrendingUp className="h-4 w-4 text-budget-blue" />;
    case 'loan':
      return <DollarSign className="h-4 w-4 text-destructive" />;
    default:
      return <CreditCard className="h-4 w-4" />;
  }
};

// Helper function to format account type
export const formatAccountType = (type: string): string => {
  return type.charAt(0).toUpperCase() + type.slice(1);
};
