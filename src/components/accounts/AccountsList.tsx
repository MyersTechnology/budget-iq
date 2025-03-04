
import { useState } from 'react';
import { 
  CreditCard, 
  RefreshCw, 
  Shield, 
  ChevronRight, 
  UserX,
  AlertCircle
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Account } from '@/types/accounts';
import { cn } from '@/lib/utils';

interface AccountsListProps {
  accounts: Account[];
  selectedAccountId: string | null;
  isLoading: boolean;
  onSelectAccount: (accountId: string) => void;
  onDisconnectAccount: (accountId: string) => void;
  onSyncAccount: (accountId: string) => void;
}

const AccountsList = ({
  accounts,
  selectedAccountId,
  isLoading,
  onSelectAccount,
  onDisconnectAccount,
  onSyncAccount
}: AccountsListProps) => {
  const [disconnectConfirmId, setDisconnectConfirmId] = useState<string | null>(null);
  
  const handleDisconnectClick = (accountId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDisconnectConfirmId(accountId);
  };
  
  const handleConfirmDisconnect = (accountId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onDisconnectAccount(accountId);
    setDisconnectConfirmId(null);
  };
  
  const handleCancelDisconnect = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDisconnectConfirmId(null);
  };
  
  const handleSyncClick = (accountId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onSyncAccount(accountId);
  };
  
  if (isLoading) {
    return (
      <Card className="border border-border/50 card-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Your Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse flex items-center gap-4 p-3 rounded-lg">
                <div className="h-10 w-10 rounded-full bg-muted"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-24 bg-muted rounded"></div>
                  <div className="h-3 w-16 bg-muted rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="border border-border/50 card-shadow h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Your Accounts</CardTitle>
          <div className="flex items-center justify-center rounded-full bg-budget-blue/10 p-1.5">
            <Shield className="h-4 w-4 text-budget-blue" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <div className="space-y-1 overflow-y-auto pr-1 scrollbar-none h-full max-h-[calc(100vh-240px)]">
          {accounts.map((account) => (
            <div
              key={account.id}
              className={cn(
                "flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all",
                selectedAccountId === account.id
                  ? "bg-primary/10"
                  : "hover:bg-muted"
              )}
              onClick={() => onSelectAccount(account.id)}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-10 w-10 rounded-full bg-white border border-border/50 flex items-center justify-center overflow-hidden flex-shrink-0">
                  {account.institutionLogo ? (
                    <img 
                      src={account.institutionLogo} 
                      alt={account.institutionName}
                      className="h-8 w-8 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://placehold.co/100x100?text=' + account.institutionName.charAt(0);
                      }}
                    />
                  ) : (
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                
                <div className="min-w-0 overflow-hidden">
                  <h3 className="font-medium text-sm truncate">{account.name}</h3>
                  <p className="text-xs text-muted-foreground truncate">
                    {account.institutionName} • {account.accountNumber}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center flex-shrink-0">
                {disconnectConfirmId === account.id ? (
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="destructive" 
                      size="sm"
                      className="h-7 text-xs"
                      onClick={(e) => handleConfirmDisconnect(account.id, e)}
                    >
                      Confirm
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-7 text-xs"
                      onClick={handleCancelDisconnect}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <>
                    <p className={cn(
                      "text-sm font-semibold mr-3 whitespace-nowrap",
                      account.balance < 0 ? "text-destructive" : "text-foreground"
                    )}>
                      {account.balance.toLocaleString('en-US', {
                        style: 'currency',
                        currency: account.currency
                      })}
                    </p>
                    
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => handleSyncClick(account.id, e)}
                        title="Sync account"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={(e) => handleDisconnectClick(account.id, e)}
                        title="Disconnect account"
                      >
                        <UserX className="h-4 w-4" />
                      </Button>
                      
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountsList;
