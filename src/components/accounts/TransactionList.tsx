
import { Transaction } from '@/utils/transactions';
import TransactionItem from '@/components/transactions/TransactionItem';
import { Card, CardContent } from '@/components/ui/card';

interface TransactionListProps {
  transactions: Transaction[];
  currency: string;
}

const TransactionList = ({ transactions, currency }: TransactionListProps) => {
  if (transactions.length === 0) {
    return (
      <Card className="border border-border/50 card-shadow">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No transactions found</p>
        </CardContent>
      </Card>
    );
  }
  
  // Group transactions by date
  const groupedTransactions: Record<string, Transaction[]> = {};
  
  transactions.forEach(transaction => {
    const date = new Date(transaction.date);
    const dateKey = date.toISOString().split('T')[0];
    
    if (!groupedTransactions[dateKey]) {
      groupedTransactions[dateKey] = [];
    }
    
    groupedTransactions[dateKey].push(transaction);
  });
  
  return (
    <Card className="border border-border/50 card-shadow">
      <CardContent className="p-0">
        {Object.keys(groupedTransactions)
          .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
          .map(dateKey => {
            const date = new Date(dateKey);
            const formattedDate = date.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric'
            });
            
            return (
              <div key={dateKey}>
                <div className="px-4 py-2 bg-muted/30 border-y border-border/50 sticky top-0">
                  <h3 className="text-sm font-medium">{formattedDate}</h3>
                </div>
                <div className="p-4">
                  {groupedTransactions[dateKey].map(transaction => (
                    <TransactionItem
                      key={transaction.id}
                      transaction={transaction}
                    />
                  ))}
                </div>
              </div>
            );
          })}
      </CardContent>
    </Card>
  );
};

export default TransactionList;
