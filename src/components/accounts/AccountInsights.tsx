import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  AlertCircle, 
  CreditCard, 
  DollarSign, 
  Link, 
  Search, 
  PiggyBank, 
  TrendingUp, 
  TrendingDown 
} from 'lucide-react';
import TransactionList from './TransactionList';
import { Account, Transaction } from '@/types/accounts';
import { mockAccountInsights } from '@/utils/mockAccountsData';

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
  const [searchTerm, setSearchTerm] = useState('');
  
  const selectedAccount = accounts.find(acc => acc.id === selectedAccountId);
  
  // Filter transactions based on selected account and search term
  const filteredTransactions = transactions.filter(transaction => {
    if (selectedAccountId && transaction.accountId !== selectedAccountId) {
      return false;
    }
    
    if (searchTerm) {
      return transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (transaction.merchant && transaction.merchant.toLowerCase().includes(searchTerm.toLowerCase())) ||
        transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    }
    
    return true;
  });
  
  // Get insights specific to the selected account
  const accountInsights = mockAccountInsights.filter(insight => 
    !selectedAccountId || insight.accountIds.includes(selectedAccountId)
  );
  
  if (isLoading) {
    return (
      <Card className="border border-border/50 card-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg skeleton-pulse">Loading account data...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!selectedAccountId) {
    return (
      <Card className="border border-border/50 card-shadow">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center text-center h-[400px] max-w-md mx-auto">
            <Link className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Select an account</h3>
            <p className="text-muted-foreground mt-1">
              Choose an account from the list to view transactions and insights.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <>
      {/* Account Overview Card */}
      <Card className="border border-border/50 card-shadow">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{selectedAccount?.name} Overview</CardTitle>
            <div className="text-sm text-muted-foreground">
              Last updated: {new Date(selectedAccount?.lastUpdated || '').toLocaleString()}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Current Balance</div>
              <div className={`text-2xl font-bold ${selectedAccount?.balance || 0 < 0 ? "text-destructive" : ""}`}>
                {selectedAccount?.balance.toLocaleString('en-US', {
                  style: 'currency',
                  currency: selectedAccount?.currency || 'USD'
                })}
              </div>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Account Type</div>
              <div className="text-lg font-medium flex items-center gap-2">
                <CreditCardIcon type={selectedAccount?.type || 'other'} />
                {formatAccountType(selectedAccount?.type || 'other')}
              </div>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Monthly Activity</div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-budget-green">
                  <TrendingUp className="h-4 w-4" />
                  <span className="font-medium">
                    {calculateMonthlyInflow(filteredTransactions).toLocaleString('en-US', {
                      style: 'currency',
                      currency: selectedAccount?.currency || 'USD'
                    })}
                  </span>
                </div>
                <div className="text-muted-foreground">|</div>
                <div className="flex items-center gap-1 text-destructive">
                  <TrendingDown className="h-4 w-4" />
                  <span className="font-medium">
                    {calculateMonthlyOutflow(filteredTransactions).toLocaleString('en-US', {
                      style: 'currency',
                      currency: selectedAccount?.currency || 'USD'
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Tabs for Transactions and Insights */}
      <Tabs defaultValue="transactions">
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
        
        <TabsContent value="transactions" className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search transactions..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm">Filter</Button>
          </div>
          
          <TransactionList 
            transactions={filteredTransactions}
            currency={selectedAccount?.currency || 'USD'}
          />
        </TabsContent>
        
        <TabsContent value="insights">
          <Card className="border border-border/50 card-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg">AI-Powered Insights</CardTitle>
                <div className="flex items-center justify-center rounded-full bg-budget-blue/10 p-1.5">
                  <PiggyBank className="h-4 w-4 text-budget-blue" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {accountInsights.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-8">
                  <div className="bg-muted/30 p-4 rounded-full mb-4">
                    <DollarSign className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">No insights available</h3>
                  <p className="text-muted-foreground mt-1 max-w-md">
                    We'll analyze your transactions and provide personalized insights 
                    as we learn more about your financial habits.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 mt-2">
                  {accountInsights.map((insight) => {
                    let Icon = DollarSign;
                    let bgColor = "bg-budget-blue/10";
                    let textColor = "text-budget-blue";
                    
                    if (insight.type === 'fee') {
                      Icon = AlertCircle;
                      bgColor = "bg-destructive/10";
                      textColor = "text-destructive";
                    } else if (insight.type === 'balance') {
                      Icon = TrendingDown;
                      bgColor = "bg-destructive/10";
                      textColor = "text-destructive";
                    } else if (insight.type === 'savings') {
                      Icon = PiggyBank;
                      bgColor = "bg-budget-green/10";
                      textColor = "text-budget-green";
                    }
                    
                    return (
                      <div 
                        key={insight.id}
                        className="border rounded-lg p-4 animate-fade-in"
                      >
                        <div className="flex gap-3">
                          <div className={`${bgColor} h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0`}>
                            <Icon className={`h-4 w-4 ${textColor}`} />
                          </div>
                          
                          <div className="space-y-1">
                            <h3 className="font-medium">{insight.title}</h3>
                            <p className="text-sm text-muted-foreground">{insight.description}</p>
                            
                            {insight.action && (
                              <Button variant="link" size="sm" className="h-auto p-0 text-sm">
                                {insight.action}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

// Helper component for account type icons
const CreditCardIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'savings':
      return <PiggyBank className="h-4 w-4 text-budget-green" />;
    case 'credit':
      return <CreditCard className="h-4 w-4 text-budget-purple" />;
    case 'investment':
      return <TrendingUp className="h-4 w-4 text-budget-blue" />;
    case 'loan':
      return <DollarSign className="h-4 w-4 text-destructive" />;
    default:
      return <CreditCard className="h-4 w-4" />;
  }
};

// Helper function to format account type
const formatAccountType = (type: string): string => {
  return type.charAt(0).toUpperCase() + type.slice(1);
};

// Helper function to calculate monthly inflow
const calculateMonthlyInflow = (transactions: Transaction[]): number => {
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  
  return transactions
    .filter(t => new Date(t.date) >= firstDayOfMonth && t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
};

// Helper function to calculate monthly outflow
const calculateMonthlyOutflow = (transactions: Transaction[]): number => {
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  
  return Math.abs(transactions
    .filter(t => new Date(t.date) >= firstDayOfMonth && t.amount < 0)
    .reduce((sum, t) => sum + t.amount, 0));
};

export default AccountInsights;
