
import { z } from "zod";
import { GoalCategory, GoalPriority, ContributionFrequency } from "@/types/goals";

export const formSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }).max(50),
  category: z.enum([
    'emergency_fund', 
    'house_down_payment', 
    'debt_payoff', 
    'vacation', 
    'retirement', 
    'education', 
    'car', 
    'wedding', 
    'other'
  ] as const),
  targetAmount: z.coerce.number().positive({ message: "Amount must be positive" }),
  targetDate: z.string().optional(),
  priority: z.enum(['high', 'medium', 'low'] as const),
  contributionFrequency: z.enum(['weekly', 'biweekly', 'monthly'] as const),
  contributionAmount: z.coerce.number().positive({ message: "Amount must be positive" }),
  autoAdjust: z.boolean().default(false),
  notes: z.string().optional(),
});

export type FormValues = z.infer<typeof formSchema>;
