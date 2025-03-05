
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FinancialGoal, GoalCategory, GoalPriority, ContributionFrequency } from '@/types/goals';
import { getGoalCategories } from '@/utils/goals/goalHelpers';

const formSchema = z.object({
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

type FormValues = z.infer<typeof formSchema>;

interface GoalCreationFormProps {
  onSubmit: (data: Omit<FinancialGoal, 'id'>) => void;
  onCancel: () => void;
}

export const GoalCreationForm = ({ onSubmit, onCancel }: GoalCreationFormProps) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      category: 'emergency_fund',
      priority: 'medium',
      contributionFrequency: 'monthly',
      autoAdjust: true,
      notes: '',
    },
  });
  
  const handleSubmit = (values: FormValues) => {
    // Transform to FinancialGoal type
    const newGoal: Omit<FinancialGoal, 'id'> = {
      name: values.name,
      category: values.category,
      targetAmount: values.targetAmount,
      currentAmount: 0,
      createdAt: new Date().toISOString(),
      targetDate: values.targetDate || null,
      priority: values.priority,
      status: 'active',
      contributionFrequency: values.contributionFrequency,
      contributionAmount: values.contributionAmount,
      autoAdjust: values.autoAdjust,
      notes: values.notes,
    };
    
    onSubmit(newGoal);
  };
  
  const categories = getGoalCategories();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Goal Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Emergency Fund" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem 
                        key={category.value} 
                        value={category.value}
                      >
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <FormControl>
                  <RadioGroup 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    className="flex space-x-2"
                  >
                    <FormItem className="flex items-center space-x-1 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="low" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">Low</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-1 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="medium" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">Medium</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-1 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="high" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">High</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="targetAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Amount</FormLabel>
                <FormControl>
                  <Input type="number" min="0" step="0.01" placeholder="0.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="targetDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Date (Optional)</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormDescription>
                  Leave blank for ongoing goals
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="contributionFrequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contribution Frequency</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="biweekly">Every 2 Weeks</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="contributionAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contribution Amount</FormLabel>
                <FormControl>
                  <Input type="number" min="0" step="0.01" placeholder="0.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="autoAdjust"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <FormLabel className="text-base">AI Smart Adjustments</FormLabel>
                <FormDescription>
                  Allow AI to suggest adjustments to your contribution amount based on your spending patterns
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Additional details about your goal"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-3 pt-3">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            Create Goal
          </Button>
        </div>
      </form>
    </Form>
  );
};
