
import { ArrowDownRight, ArrowUpRight, TrendingDown, TrendingUp, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import AnimatedNumber from '@/components/ui/AnimatedNumber';
import { formatCurrency } from '@/utils/mockData';

interface TrendsSummaryProps {
  data: any;
  timeframe: 'week' | 'month' | 'quarter' | 'year';
  isLoading: boolean;
}

const TrendsSummary = ({ data, timeframe, isLoading }: TrendsSummaryProps) => {
  // If data is null or still loading, use placeholder values
  const totalSpent = data?.totalSpent || 0;
  const percentChange = data?.percentChange || 0;
  const isIncrease = percentChange > 0;
  
  // Calculate average values
  const days = 
    timeframe === 'week' ? 7 : 
    timeframe === 'month' ? 30 : 
    timeframe === 'quarter' ? 90 : 365;
  
  const dailyAverage = totalSpent / days;
  
  // Calculate time period for comparison text
  const comparisonText = 
    timeframe === 'week' ? 'last week' : 
    timeframe === 'month' ? 'last month' : 
    timeframe === 'quarter' ? 'last quarter' : 'last year';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      <Card className="border border-border/50 card-shadow">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total Spent</p>
              <h2 className="text-xl sm:text-3xl font-bold mt-1 sm:mt-2">
                {isLoading ? (
                  <span className="inline-block w-24 sm:w-40 h-6 sm:h-9 rounded bg-muted animate-pulse" />
                ) : (
                  <AnimatedNumber value={totalSpent} />
                )}
              </h2>
              <div className="flex items-center mt-1">
                {!isLoading && (
                  <div className={`flex items-center text-xs sm:text-sm font-medium ${isIncrease ? 'text-destructive' : 'text-budget-green'}`}>
                    {isIncrease ? (
                      <ArrowUpRight className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                    ) : (
                      <ArrowDownRight className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                    )}
                    {Math.abs(percentChange).toFixed(1)}%
                  </div>
                )}
                <p className="text-xs sm:text-sm text-muted-foreground ml-1">vs {comparisonText}</p>
              </div>
            </div>
            <div className={`${isIncrease ? 'bg-destructive/10' : 'bg-budget-green/10'} p-2 sm:p-3 rounded-full`}>
              {isIncrease ? (
                <TrendingUp className={`h-4 w-4 sm:h-6 sm:w-6 ${isIncrease ? 'text-destructive' : 'text-budget-green'}`} />
              ) : (
                <TrendingDown className={`h-4 w-4 sm:h-6 sm:w-6 ${isIncrease ? 'text-destructive' : 'text-budget-green'}`} />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border/50 card-shadow">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">Daily Average</p>
              <h2 className="text-xl sm:text-3xl font-bold mt-1 sm:mt-2">
                {isLoading ? (
                  <span className="inline-block w-24 sm:w-40 h-6 sm:h-9 rounded bg-muted animate-pulse" />
                ) : (
                  <AnimatedNumber value={dailyAverage} />
                )}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Average daily spending</p>
            </div>
            <div className="bg-budget-blue/10 p-2 sm:p-3 rounded-full">
              <Calendar className="h-4 w-4 sm:h-6 sm:w-6 text-budget-blue" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border/50 card-shadow">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">Top Category</p>
              <h2 className="text-lg sm:text-2xl font-bold mt-1 sm:mt-2">
                {isLoading ? (
                  <span className="inline-block w-24 sm:w-40 h-6 sm:h-9 rounded bg-muted animate-pulse" />
                ) : (
                  data?.categorySpending?.[0]?.category || 'Housing'
                )}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                {isLoading ? (
                  <span className="inline-block w-16 sm:w-24 h-3 sm:h-4 rounded bg-muted animate-pulse" />
                ) : (
                  `${formatCurrency(data?.categorySpending?.[0]?.amount || 0)} (${data?.categorySpending?.[0]?.percentage || 0}%)`
                )}
              </p>
            </div>
            {!isLoading && data?.categorySpending?.[0] && (
              <div className={`${data.categorySpending[0].color} bg-opacity-10 p-2 sm:p-3 rounded-full`}>
                <div className={`h-4 w-4 sm:h-6 sm:w-6 rounded-full ${data.categorySpending[0].color}`}></div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrendsSummary;
