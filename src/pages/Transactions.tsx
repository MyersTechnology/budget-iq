
import { useState } from 'react';
import { Check, Filter, Search, Sparkles } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TransactionItem from '@/components/transactions/TransactionItem';
import { mockData, getCategoryInfo } from '@/utils/mockData';

const Transactions = () => {
  const [filter, setFilter] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState('all');
  
  // Get unique categories from transactions
  const categories = Array.from(new Set(mockData.transactions.map(tx => tx.category)));
  
  // Filter transactions based on selected categories and search query
  const filteredTransactions = mockData.transactions.filter(tx => {
    // Filter by category if any are selected
    const categoryMatch = filter.length === 0 || filter.includes(tx.category);
    
    // Filter by search query
    const searchMatch = !searchQuery || 
      tx.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by view (all, income, expenses)
    let viewMatch = true;
    if (view === 'income') viewMatch = tx.amount > 0;
    if (view === 'expenses') viewMatch = tx.amount < 0;
    
    return categoryMatch && searchMatch && viewMatch;
  });
  
  const handleFilterChange = (categoryName: string) => {
    setFilter((prev) => 
      prev.includes(categoryName) 
        ? prev.filter(item => item !== categoryName)
        : [...prev, categoryName]
    );
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleClearFilters = () => {
    setFilter([]);
    setSearchQuery('');
    setView('all');
  };
  
  return (
    <AppLayout>
      <div className="space-y-6 pb-10 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold">Transactions</h1>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-1">
              <Sparkles className="h-4 w-4" />
              <span>Auto Categorize</span>
            </Button>
            
            <Button variant="default" size="sm" className="gap-1">
              <Check className="h-4 w-4" />
              <span>Add Transaction</span>
            </Button>
          </div>
        </div>
        
        <Card className="border border-border/50 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-xl font-semibold">Transaction History</CardTitle>
              
              <Tabs defaultValue="all" value={view} onValueChange={setView} className="w-full sm:w-auto">
                <TabsList className="grid grid-cols-3 w-full sm:w-[300px]">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="income">Income</TabsTrigger>
                  <TabsTrigger value="expenses">Expenses</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 mt-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  type="search"
                  placeholder="Search transactions..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              
              <div className="flex items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Filter className="h-4 w-4" /> 
                      <span>Filter</span>
                      {filter.length > 0 && (
                        <span className="ml-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                          {filter.length}
                        </span>
                      )}
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
                
                {(filter.length > 0 || searchQuery || view !== 'all') && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={handleClearFilters}
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
            
            <div className="space-y-1">
              {filteredTransactions.map((transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} />
              ))}
              
              {filteredTransactions.length === 0 && (
                <div className="py-20 text-center">
                  <p className="text-muted-foreground">No transactions match your filters</p>
                  <Button variant="link" onClick={handleClearFilters}>Clear all filters</Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Transactions;
