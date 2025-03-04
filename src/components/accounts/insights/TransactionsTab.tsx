
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TransactionList from "../TransactionList";
import { Transaction } from "@/types/accounts";

interface TransactionsTabProps {
  transactions: Transaction[];
  selectedAccountId: string | null;
  currency: string;
}

const TransactionsTab = ({ 
  transactions, 
  selectedAccountId,
  currency 
}: TransactionsTabProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  
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
  
  return (
    <div className="space-y-4">
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
        currency={currency}
      />
    </div>
  );
};

export default TransactionsTab;
