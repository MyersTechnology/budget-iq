
import { useState, useEffect } from 'react';
import { GoalsData, FinancialGoal, GoalInsight } from '@/types/goals';
import { useToast } from '@/hooks/use-toast';

export const useGoalsData = () => {
  const [goalsData, setGoalsData] = useState<GoalsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Mock data for goals
  const mockGoals: FinancialGoal[] = [
    {
      id: '1',
      name: 'Emergency Fund',
      category: 'emergency_fund',
      targetAmount: 10000,
      currentAmount: 2500,
      createdAt: '2023-01-15T00:00:00Z',
      targetDate: null,
      priority: 'high',
      status: 'active',
      contributionFrequency: 'monthly',
      contributionAmount: 400,
      autoAdjust: true
    },
    {
      id: '2',
      name: 'House Down Payment',
      category: 'house_down_payment',
      targetAmount: 50000,
      currentAmount: 15000,
      createdAt: '2023-02-10T00:00:00Z',
      targetDate: '2025-12-31T00:00:00Z',
      priority: 'medium',
      status: 'active',
      contributionFrequency: 'monthly',
      contributionAmount: 800,
      autoAdjust: false,
      notes: 'For a 3-bedroom house in the suburbs'
    },
    {
      id: '3',
      name: 'Debt Payoff - Credit Card',
      category: 'debt_payoff',
      targetAmount: 4000,
      currentAmount: 3200,
      createdAt: '2023-03-05T00:00:00Z',
      targetDate: '2023-07-15T00:00:00Z',
      priority: 'high',
      status: 'active',
      contributionFrequency: 'biweekly',
      contributionAmount: 350,
      autoAdjust: true
    },
    {
      id: '4',
      name: 'Europe Vacation',
      category: 'vacation',
      targetAmount: 6000,
      currentAmount: 1500,
      createdAt: '2023-05-20T00:00:00Z',
      targetDate: '2024-06-01T00:00:00Z',
      priority: 'low',
      status: 'active',
      contributionFrequency: 'monthly',
      contributionAmount: 300,
      autoAdjust: true,
      notes: 'Two-week trip to France, Italy, and Spain'
    }
  ];

  // Mock insights
  const mockInsights: GoalInsight[] = [
    {
      id: 'insight1',
      title: 'Debt payoff ahead of schedule',
      description: 'You\'re on track to pay off your credit card 2 months ahead of your target date.',
      type: 'success',
      goalId: '3'
    },
    {
      id: 'insight2',
      title: 'Increase emergency fund contribution',
      description: 'Based on your income and spending patterns, you could increase your monthly contribution by $100.',
      type: 'info',
      action: 'Optimize Contribution',
      goalId: '1'
    },
    {
      id: 'insight3',
      title: 'Vacation fund at risk',
      description: 'Your current contribution rate won\'t meet your Europe vacation goal by the target date.',
      type: 'warning',
      action: 'View Options',
      goalId: '4'
    },
    {
      id: 'insight4',
      title: 'Smart transfer opportunity',
      description: 'You have $240 in potential savings from last month\'s spending that could go to your goals.',
      type: 'info',
      action: 'Transfer Funds'
    }
  ];

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      try {
        // Calculate summary data
        const totalTargetAmount = mockGoals.reduce((sum, goal) => sum + goal.targetAmount, 0);
        const totalCurrentAmount = mockGoals.reduce((sum, goal) => sum + goal.currentAmount, 0);
        
        // Calculate monthly contributions
        const calculateMonthlyContribution = (goal: FinancialGoal): number => {
          if (goal.contributionFrequency === 'weekly') {
            return goal.contributionAmount * 4.33; // Average weeks in a month
          } else if (goal.contributionFrequency === 'biweekly') {
            return goal.contributionAmount * 2.17; // Average bi-weeks in a month
          }
          return goal.contributionAmount;
        };
        
        const totalContributionsMonthly = mockGoals
          .filter(goal => goal.status === 'active')
          .reduce((sum, goal) => sum + calculateMonthlyContribution(goal), 0);
        
        // Find highest priority goal
        const highPriorityGoals = mockGoals
          .filter(goal => goal.priority === 'high' && goal.status === 'active')
          .sort((a, b) => (b.currentAmount / b.targetAmount) - (a.currentAmount / a.targetAmount));
          
        const highestPriorityGoal = highPriorityGoals.length > 0 ? highPriorityGoals[0] : null;
        
        // Find next milestone goal (goal with closest target date)
        const goalsWithDates = mockGoals
          .filter(goal => goal.targetDate && goal.status === 'active')
          .sort((a, b) => {
            if (!a.targetDate || !b.targetDate) return 0;
            return new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime();
          });
          
        const nextMilestoneGoal = goalsWithDates.length > 0 ? goalsWithDates[0] : null;
        
        // Calculate average completion percentage
        const averageCompletion = mockGoals.length > 0
          ? mockGoals.reduce((sum, goal) => 
              sum + (goal.currentAmount / goal.targetAmount) * 100, 0) / mockGoals.length
          : 0;
        
        setGoalsData({
          goals: mockGoals,
          insights: mockInsights,
          summary: {
            totalTargetAmount,
            totalCurrentAmount,
            totalContributionsMonthly,
            highestPriorityGoal,
            nextMilestoneGoal,
            averageCompletion
          }
        });
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading goals data:', error);
        setIsLoading(false);
      }
    }, 1000);
  }, []);

  // Add a new goal
  const addGoal = (newGoal: Omit<FinancialGoal, 'id'>) => {
    if (!goalsData) return;
    
    const goal: FinancialGoal = {
      ...newGoal,
      id: `goal-${Date.now()}` // Generate a temporary ID
    };
    
    // Update goals
    const updatedGoals = [...goalsData.goals, goal];
    
    // Recalculate summary
    const totalTargetAmount = updatedGoals.reduce((sum, g) => sum + g.targetAmount, 0);
    const totalCurrentAmount = updatedGoals.reduce((sum, g) => sum + g.currentAmount, 0);
    
    // Update state
    setGoalsData({
      ...goalsData,
      goals: updatedGoals,
      summary: {
        ...goalsData.summary,
        totalTargetAmount,
        totalCurrentAmount
      }
    });
    
    toast({
      title: "Goal Created",
      description: `"${newGoal.name}" has been added to your financial goals.`
    });
  };

  // Update an existing goal
  const updateGoal = (id: string, updates: Partial<FinancialGoal>) => {
    if (!goalsData) return;
    
    const updatedGoals = goalsData.goals.map(goal => 
      goal.id === id ? { ...goal, ...updates } : goal
    );
    
    // Recalculate summary if needed
    const totalTargetAmount = updatedGoals.reduce((sum, goal) => sum + goal.targetAmount, 0);
    const totalCurrentAmount = updatedGoals.reduce((sum, goal) => sum + goal.currentAmount, 0);
    
    setGoalsData({
      ...goalsData,
      goals: updatedGoals,
      summary: {
        ...goalsData.summary,
        totalTargetAmount,
        totalCurrentAmount
      }
    });
    
    toast({
      title: "Goal Updated",
      description: "Your goal has been updated successfully."
    });
  };

  // Delete a goal
  const deleteGoal = (id: string) => {
    if (!goalsData) return;
    
    const updatedGoals = goalsData.goals.filter(goal => goal.id !== id);
    
    // Recalculate summary
    const totalTargetAmount = updatedGoals.reduce((sum, goal) => sum + goal.targetAmount, 0);
    const totalCurrentAmount = updatedGoals.reduce((sum, goal) => sum + goal.currentAmount, 0);
    
    setGoalsData({
      ...goalsData,
      goals: updatedGoals,
      summary: {
        ...goalsData.summary,
        totalTargetAmount,
        totalCurrentAmount
      }
    });
    
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
