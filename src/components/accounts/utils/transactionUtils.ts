
import { Transaction } from "@/types/accounts";

// Helper function to calculate monthly inflow
export const calculateMonthlyInflow = (transactions: Transaction[]): number => {
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  
  return transactions
    .filter(t => new Date(t.date) >= firstDayOfMonth && t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
};

// Helper function to calculate monthly outflow
export const calculateMonthlyOutflow = (transactions: Transaction[]): number => {
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  
  return Math.abs(transactions
    .filter(t => new Date(t.date) >= firstDayOfMonth && t.amount < 0)
    .reduce((sum, t) => sum + t.amount, 0));
};
