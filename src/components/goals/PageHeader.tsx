
import { Button } from '@/components/ui/button';
import { PlusCircle, Goal, Filter } from 'lucide-react';

interface PageHeaderProps {
  onCreateGoal: () => void;
}

export const PageHeader = ({ onCreateGoal }: PageHeaderProps) => {
  return (
    <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <Goal className="h-6 w-6 text-budget-blue" />
        <h1 className="text-2xl font-bold">Financial Goals</h1>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="gap-1.5">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </Button>
        
        <Button onClick={onCreateGoal} className="gap-1.5">
          <PlusCircle className="h-4 w-4" />
          <span>New Goal</span>
        </Button>
      </div>
    </div>
  );
};
