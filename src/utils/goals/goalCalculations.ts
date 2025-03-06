
import { FinancialGoal, GoalsData, GoalsDataSummary } from '@/types/goals';

/**
 * Calculate monthly contribution for a goal based on its frequency
 */
export const calculateMonthlyContribution = (goal: FinancialGoal): number => {
  if (goal.contributionFrequency === 'weekly') {
    return goal.contributionAmount * 4.33; // Average weeks in a month
  } else if (goal.contributionFrequency === 'biweekly') {
    return goal.contributionAmount * 2.17; // Average bi-weeks in a month
  }
  return goal.contributionAmount;
};

/**
 * Calculate summary data for goals
 */
export const calculateGoalsSummary = (goals: FinancialGoal[]): GoalsDataSummary => {
  const totalTargetAmount = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalCurrentAmount = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  
  // Calculate monthly contributions
  const totalContributionsMonthly = goals
    .filter(goal => goal.status === 'active')
    .reduce((sum, goal) => sum + calculateMonthlyContribution(goal), 0);
  
  // Find highest priority goal
  const highPriorityGoals = goals
    .filter(goal => goal.priority === 'high' && goal.status === 'active')
    .sort((a, b) => (b.currentAmount / b.targetAmount) - (a.currentAmount / a.targetAmount));
    
  const highestPriorityGoal = highPriorityGoals.length > 0 ? highPriorityGoals[0] : null;
  
  // Find next milestone goal (goal with closest target date)
  const goalsWithDates = goals
    .filter(goal => goal.targetDate && goal.status === 'active')
    .sort((a, b) => {
      if (!a.targetDate || !b.targetDate) return 0;
      return new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime();
    });
    
  const nextMilestoneGoal = goalsWithDates.length > 0 ? goalsWithDates[0] : null;
  
  // Calculate average completion percentage
  const averageCompletion = goals.length > 0
    ? goals.reduce((sum, goal) => 
        sum + (goal.currentAmount / goal.targetAmount) * 100, 0) / goals.length
    : 0;
    
  return {
    totalTargetAmount,
    totalCurrentAmount,
    totalContributionsMonthly,
    highestPriorityGoal,
    nextMilestoneGoal,
    averageCompletion
  };
};
