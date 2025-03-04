
import { useState } from 'react';
import { PageHeader } from '@/components/goals/PageHeader';
import { GoalsSummary } from '@/components/goals/GoalsSummary';
import { GoalsList } from '@/components/goals/GoalsList';
import { GoalsInsights } from '@/components/goals/GoalsInsights';
import { GoalCreationForm } from '@/components/goals/GoalCreationForm';
import { useGoalsData } from '@/hooks/useGoalsData';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FinancialGoal } from '@/types/goals';

const GoalsPage = () => {
  const { goalsData, isLoading, addGoal, updateGoal } = useGoalsData();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleCreateGoal = (newGoal: Omit<FinancialGoal, 'id'>) => {
    addGoal(newGoal);
    setIsCreateDialogOpen(false);
  };

  return (
    <div className="w-full max-w-full space-y-6 py-6 pb-10 animate-fade-in overflow-hidden">
      <PageHeader onCreateGoal={() => setIsCreateDialogOpen(true)} />
      
      {isLoading ? (
        // Loading state
        <div className="grid gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-full h-32 rounded-lg bg-muted animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          <GoalsSummary data={goalsData} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <GoalsList 
                goals={goalsData?.goals || []} 
                onUpdateGoal={updateGoal}
              />
            </div>
            <div>
              <GoalsInsights insights={goalsData?.insights || []} />
            </div>
          </div>
        </>
      )}
      
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Financial Goal</DialogTitle>
          </DialogHeader>
          <GoalCreationForm onSubmit={handleCreateGoal} onCancel={() => setIsCreateDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GoalsPage;
