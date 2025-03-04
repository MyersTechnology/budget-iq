import { useEffect, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ConnectedAccountsHeader from '@/components/accounts/ConnectedAccountsHeader';
import AccountsList from '@/components/accounts/AccountsList';
import AccountInsights from '@/components/accounts/AccountInsights';
import AddAccountSection from '@/components/accounts/AddAccountSection';
import ManualTransactionForm from '@/components/accounts/ManualTransactionForm';
import { useToast } from "@/components/ui/use-toast";
import { mockLinkedAccounts, mockTransactions } from '@/utils/mockData/index';
import { Account, Transaction } from '@/types/accounts';

const ConnectedAccountsPage = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingManualTransaction, setIsAddingManualTransaction] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      setTimeout(() => {
        setAccounts(mockLinkedAccounts);
        setTransactions(mockTransactions);
        setIsLoading(false);
        
        if (mockLinkedAccounts.length > 0) {
          setSelectedAccountId(mockLinkedAccounts[0].id);
        }
      }, 1000);
    };
    
    loadData();
  }, []);

  const handleAccountSelect = (accountId: string) => {
    setSelectedAccountId(accountId);
  };

  const handleAddAccount = () => {
    toast({
      title: "Connecting to Plaid",
      description: "This would open the Plaid integration in a real implementation.",
    });
  };

  const handleDisconnectAccount = (accountId: string) => {
    setAccounts(accounts.filter(account => account.id !== accountId));
    toast({
      title: "Account disconnected",
      description: "Your account has been successfully disconnected.",
    });
    
    if (selectedAccountId === accountId) {
      setSelectedAccountId(accounts.length > 1 ? accounts[0].id : null);
    }
  };

  const handleSyncAccount = (accountId: string) => {
    toast({
      title: "Account synced",
      description: "Your account transactions have been updated.",
    });
  };

  const handleAddManualTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: `manual-${Date.now()}`,
      date: new Date().toISOString(),
      aiCategorized: true,
    };
    
    setTransactions([newTransaction, ...transactions]);
    setIsAddingManualTransaction(false);
    
    toast({
      title: "Transaction added",
      description: `${transaction.description} has been added to your account.`,
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6 py-6 pb-10 animate-fade-in max-h-screen overflow-hidden">
        <ConnectedAccountsHeader 
          totalAccounts={accounts.length}
          onAddManualTransaction={() => setIsAddingManualTransaction(true)}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-170px)] overflow-hidden">
          <div className="md:col-span-1 flex flex-col overflow-hidden">
            <div className="flex-grow overflow-hidden">
              <AccountsList 
                accounts={accounts}
                selectedAccountId={selectedAccountId}
                isLoading={isLoading}
                onSelectAccount={handleAccountSelect}
                onDisconnectAccount={handleDisconnectAccount}
                onSyncAccount={handleSyncAccount}
              />
            </div>
            
            <div className="mt-6">
              <AddAccountSection onAddAccount={handleAddAccount} />
            </div>
          </div>
          
          <div className="md:col-span-2 overflow-hidden">
            {isAddingManualTransaction ? (
              <div className="p-4 bg-card rounded-lg border border-border/50 card-shadow overflow-auto max-h-[calc(100vh-170px)]">
                <ManualTransactionForm
                  accounts={accounts}
                  onAdd={handleAddManualTransaction}
                  onCancel={() => setIsAddingManualTransaction(false)}
                />
              </div>
            ) : (
              <div className="p-4 bg-card rounded-lg border border-border/50 card-shadow overflow-hidden max-h-[calc(100vh-170px)]">
                <AccountInsights 
                  accounts={accounts}
                  selectedAccountId={selectedAccountId}
                  transactions={transactions}
                  isLoading={isLoading}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ConnectedAccountsPage;
