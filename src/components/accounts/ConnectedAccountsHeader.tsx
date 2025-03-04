
import { PlusCircle, Link, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConnectedAccountsHeaderProps {
  totalAccounts: number;
  onAddManualTransaction: () => void;
}

const ConnectedAccountsHeader = ({ 
  totalAccounts,
  onAddManualTransaction 
}: ConnectedAccountsHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Link className="h-6 w-6 text-budget-blue" />
          Connected Accounts
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your {totalAccounts} connected financial account{totalAccounts !== 1 ? 's' : ''}
        </p>
      </div>
      
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          onClick={onAddManualTransaction}
          className="flex gap-2 items-center"
        >
          <PlusCircle className="h-4 w-4" />
          Add Transaction
        </Button>
      </div>
    </div>
  );
};

export default ConnectedAccountsHeader;
