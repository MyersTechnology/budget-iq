
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, TrendingUp, TrendingDown } from "lucide-react";
import { Account, Transaction } from "@/types/accounts";
import { formatAccountType, CreditCardIcon } from "../utils/accountUtils";
import { calculateMonthlyInflow, calculateMonthlyOutflow } from "../utils/transactionUtils";

interface AccountOverviewProps {
  selectedAccount: Account | undefined;
  filteredTransactions: Transaction[];
}

const AccountOverview = ({ selectedAccount, filteredTransactions }: AccountOverviewProps) => {
  if (!selectedAccount) return null;
  
  return (
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
  );
};

export default AccountOverview;
