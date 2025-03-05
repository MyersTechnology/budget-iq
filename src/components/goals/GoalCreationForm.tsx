
import { useState } from 'react';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FinancialGoal } from '@/types/goals';
import { formSchema, FormValues } from './form/types';
import { GoalNameField } from './form/GoalNameField';
import { GoalCategoryField } from './form/GoalCategoryField';
import { GoalPriorityField } from './form/GoalPriorityField';
import { AmountFields } from './form/AmountFields';
import { ContributionFields } from './form/ContributionFields';
import { AIAdjustmentField } from './form/AIAdjustmentField';
import { NotesField } from './form/NotesField';
import { FormActions } from './form/FormActions';

interface GoalCreationFormProps {
  onSubmit: (data: Omit<FinancialGoal, 'id'>) => void;
  onCancel: () => void;
}

export const GoalCreationForm = ({ onSubmit, onCancel }: GoalCreationFormProps) => {
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
        <GoalNameField control={form.control} />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <GoalCategoryField control={form.control} />
          <GoalPriorityField control={form.control} />
        </div>
        
        <AmountFields control={form.control} />
        <ContributionFields control={form.control} />
        <AIAdjustmentField control={form.control} />
        <NotesField control={form.control} />
        
        <FormActions onCancel={onCancel} />
      </form>
    </Form>
  );
};
