
import { useState } from 'react';
import { ArrowRight, ChevronRight, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Transaction, getCategoryInfo } from '@/utils/transactions';
import TransactionItem from '../transactions/TransactionItem';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions = ({ transactions }: RecentTransactionsProps) => {
  const [filter, setFilter] = useState<string[]>([]);
  
  const handleFilterChange = (categoryName: string) => {
    setFilter((prev) => 
      prev.includes(categoryName) 
        ? prev.filter(item => item !== categoryName)
        : [...prev, categoryName]
    );
  };
  
  const categories = Array.from(new Set(transactions.map(tx => tx.category)));
  
  const filteredTransactions = filter.length > 0
    ? transactions.filter(tx => filter.includes(tx.category))
    : transactions;
  
  return (
    <Card className="border border-border/50 card-shadow">
      <CardHeader className="pb-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-xl font-semibold">Recent Transactions</CardTitle>
          
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="h-4 w-4" /> 
                  <span>Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 animate-fade-in">
                {categories.map(category => {
                  const { label } = getCategoryInfo(category);
                  return (
                    <DropdownMenuCheckboxItem
                      key={category}
                      checked={filter.includes(category)}
                      onCheckedChange={() => handleFilterChange(category)}
                    >
                      {label}
                    </DropdownMenuCheckboxItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="ghost" size="sm" asChild>
              <a href="/transactions" className="flex items-center gap-1">
                View All
                <ChevronRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-2 space-y-1">
          {filteredTransactions.slice(0, 5).map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
          
          {filteredTransactions.length === 0 && (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">No transactions match your filter</p>
              <Button variant="link" onClick={() => setFilter([])}>Clear filters</Button>
            </div>
          )}
          
          {filteredTransactions.length > 5 && (
            <Button variant="link" className="w-full mt-2" asChild>
              <a href="/transactions" className="flex items-center justify-center gap-1">
                View more transactions
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
