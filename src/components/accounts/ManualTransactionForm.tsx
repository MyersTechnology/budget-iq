
import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Account, Transaction } from '@/types/accounts';

interface ManualTransactionFormProps {
  accounts: Account[];
  onAdd: (transaction: Omit<Transaction, 'id'>) => void;
  onCancel: () => void;
}

const ManualTransactionForm = ({ accounts, onAdd, onCancel }: ManualTransactionFormProps) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [accountId, setAccountId] = useState(accounts.length > 0 ? accounts[0].id : '');
  const [notes, setNotes] = useState('');
  
  const selectedAccount = accounts.find(acc => acc.id === accountId);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description || !amount || !category || !accountId) {
      // Show an error message
      return;
    }
    
    // Create a new transaction object
    const newTransaction: Omit<Transaction, 'id'> = {
      accountId,
      date: new Date().toISOString(),
      description,
      amount: parseFloat(amount),
      currency: selectedAccount?.currency || 'USD',
      category,
      pending: false,
      notes: notes || undefined
    };
    
    onAdd(newTransaction);
  };
  
  return (
    <Card className="border border-border/50 card-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Add Manual Transaction</CardTitle>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="account" className="text-sm font-medium">
                Account
              </label>
              <select
                id="account"
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              >
                {accounts.map(account => (
                  <option key={account.id} value={account.id}>
                    {account.name} ({account.accountNumber})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="amount" className="text-sm font-medium">
                Amount
              </label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Use negative value for expenses (e.g., -25.50)
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Input
              id="description"
              placeholder="E.g., Coffee Shop, Grocery Store"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Category
            </label>
            <Input
              id="category"
              placeholder="E.g., Food & Drink, Shopping"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="notes" className="text-sm font-medium">
              Notes (optional)
            </label>
            <Input
              id="notes"
              placeholder="Add any additional details"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            <Check className="h-4 w-4 mr-2" />
            Add Transaction
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ManualTransactionForm;
