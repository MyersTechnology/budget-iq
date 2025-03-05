
import { FinancialGoal, GoalsData } from '@/types/goals';
import { mockGoals, mockInsights } from '@/data/mockGoalsData';
import { calculateGoalsSummary } from '@/utils/goals/goalCalculations';

/**
 * Fetch goals data with a simulated API delay
 */
export const fetchGoalsData = (): Promise<GoalsData> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const summary = calculateGoalsSummary(mockGoals);
        
        resolve({
          goals: mockGoals,
          insights: mockInsights,
          summary
        });
      } catch (error) {
        reject(error);
      }
    }, 1000);
  });
};

/**
 * Add a new goal
 */
export const addGoal = (
  goalsData: GoalsData,
  newGoal: Omit<FinancialGoal, 'id'>
): GoalsData => {
  const goal: FinancialGoal = {
    ...newGoal,
    id: `goal-${Date.now()}` // Generate a temporary ID
  };
  
  // Update goals
  const updatedGoals = [...goalsData.goals, goal];
  
  // Recalculate summary
  const summary = calculateGoalsSummary(updatedGoals);
  
  // Return updated goals data
  return {
    ...goalsData,
    goals: updatedGoals,
    summary
  };
};

/**
 * Update an existing goal
 */
export const updateGoal = (
  goalsData: GoalsData,
  id: string, 
  updates: Partial<FinancialGoal>
): GoalsData => {
  const updatedGoals = goalsData.goals.map(goal => 
    goal.id === id ? { ...goal, ...updates } : goal
  );
  
  // Recalculate summary
  const summary = calculateGoalsSummary(updatedGoals);
  
  return {
    ...goalsData,
    goals: updatedGoals,
    summary
  };
};

/**
 * Delete a goal
 */
export const deleteGoal = (
  goalsData: GoalsData,
  id: string
): GoalsData => {
  const updatedGoals = goalsData.goals.filter(goal => goal.id !== id);
  
  // Recalculate summary
  const summary = calculateGoalsSummary(updatedGoals);
  
  return {
    ...goalsData,
    goals: updatedGoals,
    summary
  };
};
