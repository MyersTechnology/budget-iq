
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatCurrency } from '@/utils/transactions';
import { CalendarDays, CreditCard } from 'lucide-react';

interface RecurringHeaderProps {
  monthlyTotal: number;
  yearlyTotal: number;
  budgetPercentage: number;
  activeTab: 'list' | 'calendar';
  onTabChange: (tab: 'list' | 'calendar') => void;
}

const RecurringHeader = ({ 
  monthlyTotal, 
  yearlyTotal, 
  budgetPercentage,
  activeTab,
  onTabChange
}: RecurringHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Recurring Expenses</h1>
        <p className="text-muted-foreground mt-1">
          Manage your subscriptions and recurring payments
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Monthly Total:</span>
            <span className="text-xl font-bold">
              {formatCurrency(monthlyTotal)}
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            {formatCurrency(yearlyTotal)}/year · {budgetPercentage.toFixed(0)}% of budget
          </div>
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={(value) => onTabChange(value as 'list' | 'calendar')}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span>List</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>Calendar</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default RecurringHeader;
