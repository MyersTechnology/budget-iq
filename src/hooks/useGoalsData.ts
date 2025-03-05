
import { useState, useEffect } from 'react';
import { GoalsData, FinancialGoal } from '@/types/goals';
import { useToast } from '@/hooks/use-toast';
import { fetchGoalsData, addGoal as addGoalService, updateGoal as updateGoalService, deleteGoal as deleteGoalService } from '@/services/goalsService';

export const useGoalsData = () => {
  const [goalsData, setGoalsData] = useState<GoalsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setIsLoading(true);
    
    fetchGoalsData()
      .then((data) => {
        setGoalsData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error loading goals data:', error);
        setIsLoading(false);
      });
  }, []);

  // Add a new goal
  const addGoal = (newGoal: Omit<FinancialGoal, 'id'>) => {
    if (!goalsData) return;
    
    const updatedGoalsData = addGoalService(goalsData, newGoal);
    setGoalsData(updatedGoalsData);
    
    toast({
      title: "Goal Created",
      description: `"${newGoal.name}" has been added to your financial goals.`
    });
  };

  // Update an existing goal
  const updateGoal = (id: string, updates: Partial<FinancialGoal>) => {
    if (!goalsData) return;
    
    const updatedGoalsData = updateGoalService(goalsData, id, updates);
    setGoalsData(updatedGoalsData);
    
    toast({
      title: "Goal Updated",
      description: "Your goal has been updated successfully."
    });
  };

  // Delete a goal
  const deleteGoal = (id: string) => {
    if (!goalsData) return;
    
    const updatedGoalsData = deleteGoalService(goalsData, id);
    setGoalsData(updatedGoalsData);
    
    toast({
      title: "Goal Deleted",
      description: "Your goal has been removed."
    });
  };

  return { 
    goalsData, 
    isLoading,
    addGoal,
    updateGoal,
    deleteGoal
  };
};
