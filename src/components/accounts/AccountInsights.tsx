
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Account, Transaction } from '@/types/accounts';
import { mockAccountInsights } from '@/utils/mockData/index';

// Import our component files
import AccountOverview from './insights/AccountOverview';
import TransactionsTab from './insights/TransactionsTab';
import InsightsTab from './insights/InsightsTab';
import LoadingState from './insights/LoadingState';
import EmptyState from './insights/EmptyState';

interface AccountInsightsProps {
  accounts: Account[];
  selectedAccountId: string | null;
  transactions: Transaction[];
  isLoading: boolean;
}

const AccountInsights = ({
  accounts,
  selectedAccountId,
  transactions,
  isLoading
}: AccountInsightsProps) => {
  const selectedAccount = accounts.find(acc => acc.id === selectedAccountId);
  
  // Filter transactions for the selected account
  const filteredTransactions = transactions.filter(transaction => {
    if (selectedAccountId && transaction.accountId !== selectedAccountId) {
      return false;
    }
    return true;
  });
  
  // Get insights specific to the selected account
  const accountInsights = mockAccountInsights.filter(insight => 
    !selectedAccountId || insight.accountIds.includes(selectedAccountId)
  );
  
  if (isLoading) {
    return <LoadingState />;
  }
  
  if (!selectedAccountId) {
    return <EmptyState />;
  }
  
  return (
    <div className="overflow-hidden h-full">
      <AccountOverview 
        selectedAccount={selectedAccount} 
        filteredTransactions={filteredTransactions} 
      />
      
      <Tabs defaultValue="transactions" className="mt-6">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="insights">
            AI Insights
            {accountInsights.length > 0 && (
              <span className="ml-2 bg-primary/20 text-primary rounded-full px-2 py-0.5 text-xs">
                {accountInsights.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
        
        <div className="overflow-hidden">
          <TabsContent value="transactions" className="mt-0 overflow-auto max-h-[calc(100vh-360px)]">
            <TransactionsTab 
              transactions={filteredTransactions}
              selectedAccountId={selectedAccountId}
              currency={selectedAccount?.currency || 'USD'}
            />
          </TabsContent>
          
          <TabsContent value="insights" className="mt-0 overflow-auto max-h-[calc(100vh-360px)]">
            <InsightsTab accountInsights={accountInsights} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default AccountInsights;
