
import { useEffect, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ConnectedAccountsHeader from '@/components/accounts/ConnectedAccountsHeader';
import AccountsList from '@/components/accounts/AccountsList';
import AccountInsights from '@/components/accounts/AccountInsights';
import AddAccountSection from '@/components/accounts/AddAccountSection';
import ManualTransactionForm from '@/components/accounts/ManualTransactionForm';
import { useToast } from "@/components/ui/use-toast";
// Updated import path - using the index.ts re-export
import { mockLinkedAccounts, mockTransactions } from '@/utils/mockData';
import { Account, Transaction } from '@/types/accounts';

const ConnectedAccountsPage = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingManualTransaction, setIsAddingManualTransaction] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API fetch
    const loadData = async () => {
      // In a real implementation, this would be an API call to fetch accounts
      setTimeout(() => {
        setAccounts(mockLinkedAccounts);
        setTransactions(mockTransactions);
        setIsLoading(false);
        
        // Select the first account by default if available
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
    // In a real implementation, this would open the Plaid Link dialog
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
      <div className="space-y-6 py-6 pb-10 animate-fade-in">
        <ConnectedAccountsHeader 
          totalAccounts={accounts.length}
          onAddManualTransaction={() => setIsAddingManualTransaction(true)}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <AccountsList 
              accounts={accounts}
              selectedAccountId={selectedAccountId}
              isLoading={isLoading}
              onSelectAccount={handleAccountSelect}
              onDisconnectAccount={handleDisconnectAccount}
              onSyncAccount={handleSyncAccount}
            />
            
            <div className="mt-6">
              <AddAccountSection onAddAccount={handleAddAccount} />
            </div>
          </div>
          
          <div className="md:col-span-2 space-y-6">
            {isAddingManualTransaction ? (
              <ManualTransactionForm
                accounts={accounts}
                onAdd={handleAddManualTransaction}
                onCancel={() => setIsAddingManualTransaction(false)}
              />
            ) : (
              <>
                <AccountInsights 
                  accounts={accounts}
                  selectedAccountId={selectedAccountId}
                  transactions={transactions}
                  isLoading={isLoading}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ConnectedAccountsPage;
