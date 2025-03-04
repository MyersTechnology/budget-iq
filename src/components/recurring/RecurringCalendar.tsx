
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency } from '@/utils/transactions';
import { Calendar as CalendarIcon, CreditCard, FileClock } from 'lucide-react';
import { UpcomingPayment, RecurringCategory } from '@/types/recurring';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';

interface RecurringCalendarProps {
  upcomingPayments: UpcomingPayment[];
  isLoading: boolean;
}

const RecurringCalendar = ({
  upcomingPayments,
  isLoading
}: RecurringCalendarProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Get payments for the selected date
  const getPaymentsForDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return [];
    
    // Convert to start of day in local timezone
    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);
    
    // Convert to end of day in local timezone
    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);
    
    return upcomingPayments.filter(payment => {
      const paymentDate = new Date(payment.date);
      return paymentDate >= startOfDay && paymentDate <= endOfDay;
    });
  };
  
  // Get dates with payments
  const getDatesWithPayments = () => {
    const dates = new Set<string>();
    upcomingPayments.forEach(payment => {
      const date = new Date(payment.date);
      dates.add(date.toISOString().split('T')[0]);
    });
    return Array.from(dates).map(dateStr => new Date(dateStr));
  };
  
  // Get payments for the selected date
  const paymentsForSelectedDate = getPaymentsForDate(date);
  
  // Calculate total for the selected date
  const totalForDate = paymentsForSelectedDate.reduce((total, payment) => total + payment.amount, 0);
  
  // Format date for display
  const formatSelectedDate = (date: Date | undefined) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  return (
    <Card className="border border-border/50 card-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Payment Calendar</CardTitle>
          <div className="flex items-center justify-center rounded-full bg-budget-purple/10 p-1.5">
            <CalendarIcon className="h-4 w-4 text-budget-purple" />
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-[300px] w-full rounded-md" />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="border rounded-md p-3"
                  modifiers={{ withPayments: getDatesWithPayments() }}
                  modifiersClassNames={{
                    withPayments: "bg-budget-blue/20 font-bold text-budget-blue"
                  }}
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{formatSelectedDate(date)}</h3>
                  {paymentsForSelectedDate.length > 0 && (
                    <Badge className="bg-budget-blue">
                      {formatCurrency(totalForDate)}
                    </Badge>
                  )}
                </div>
                
                <div className="border rounded-md p-3 max-h-[280px] overflow-auto">
                  {paymentsForSelectedDate.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <FileClock className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">No payments scheduled for this date</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {paymentsForSelectedDate.map((payment) => (
                        <div 
                          key={payment.id}
                          className="flex items-start gap-3 p-2 rounded-md hover:bg-muted/50"
                        >
                          <div className={`p-2 rounded-md ${getCategoryColor(payment.category)}`}>
                            <CreditCard className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-sm">{payment.name}</h4>
                              <span className="font-medium">{formatCurrency(payment.amount)}</span>
                            </div>
                            {payment.isPaid ? (
                              <Badge variant="outline" className="mt-1 bg-budget-green/10 text-budget-green border-budget-green/20">
                                Paid
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="mt-1 bg-budget-orange/10 text-budget-orange border-budget-orange/20">
                                Upcoming
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 gap-2">
                  <Button variant="outline" size="sm" disabled={paymentsForSelectedDate.length === 0}>
                    Set Reminder
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-3 mt-2">
              <h3 className="font-medium mb-2">Payment Forecast</h3>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="border rounded-md p-2">
                  <p className="text-xs text-muted-foreground">This Month</p>
                  <p className="font-bold">{formatCurrency(calculateMonthTotal(upcomingPayments, 0))}</p>
                </div>
                <div className="border rounded-md p-2">
                  <p className="text-xs text-muted-foreground">Next Month</p>
                  <p className="font-bold">{formatCurrency(calculateMonthTotal(upcomingPayments, 1))}</p>
                </div>
                <div className="border rounded-md p-2">
                  <p className="text-xs text-muted-foreground">In 2 Months</p>
                  <p className="font-bold">{formatCurrency(calculateMonthTotal(upcomingPayments, 2))}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Helper function to calculate total payments for a month
const calculateMonthTotal = (payments: UpcomingPayment[], monthsFromNow: number): number => {
  const now = new Date();
  const targetMonth = new Date(now.getFullYear(), now.getMonth() + monthsFromNow, 1);
  const nextMonth = new Date(targetMonth.getFullYear(), targetMonth.getMonth() + 1, 1);
  
  return payments.reduce((total, payment) => {
    const paymentDate = new Date(payment.date);
    if (paymentDate >= targetMonth && paymentDate < nextMonth) {
      return total + payment.amount;
    }
    return total;
  }, 0);
};

// Helper function to get category color
const getCategoryColor = (category: RecurringCategory): string => {
  const colors: Record<RecurringCategory, string> = {
    streaming: 'bg-budget-purple',
    utilities: 'bg-budget-blue',
    insurance: 'bg-budget-green',
    loans: 'bg-budget-red',
    memberships: 'bg-budget-orange',
    software: 'bg-budget-blue',
    education: 'bg-budget-green',
    entertainment: 'bg-budget-purple',
    food_delivery: 'bg-budget-orange',
    health: 'bg-budget-green',
    other: 'bg-muted-foreground'
  };
  
  return colors[category] || 'bg-muted-foreground';
};

export default RecurringCalendar;
