
import { CreditCard, Clock } from 'lucide-react';
import { RecurringCategory } from '@/types/recurring';
import { formatCurrency } from '@/utils/transactions';
import { getCategoryColor } from '@/utils/recurring/recurringHelpers';
import { formatDate, getDaysUntil, capitalize } from '@/utils/recurring/dateFormatters';
import { RecurringStatusBadge } from '../badges/RecurringStatusBadge';
import { PaymentDueBadge } from '../badges/PaymentDueBadge';

interface RecurringItemDetailsProps {
  name: string;
  amount: number;
  category: RecurringCategory;
  frequency: string;
  provider?: string;
  nextPaymentDate: string;
  isTracked: boolean;
  isNewlyDetected?: boolean;
  priceIncreased?: boolean;
  hasDuplicate?: boolean;
  usageLevel?: string;
}

export const RecurringItemDetails = ({
  name,
  amount,
  category,
  frequency,
  provider,
  nextPaymentDate,
  isTracked,
  isNewlyDetected,
  priceIncreased,
  hasDuplicate,
  usageLevel
}: RecurringItemDetailsProps) => {
  const daysUntil = getDaysUntil(nextPaymentDate);
  
  return (
    <div className="flex items-start gap-3 flex-grow">
      <div className={`rounded-md p-2 ${getCategoryColor(category)}`}>
        <CreditCard className="h-5 w-5 text-white" />
      </div>
      
      <div className="flex-grow min-w-0">
        <div className="flex items-start justify-between">
          <div>
            <h3 className={`font-medium ${!isTracked ? 'text-muted-foreground' : ''}`}>
              {name}
            </h3>
            
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <span className="text-xs text-muted-foreground">
                {capitalize(frequency)}
              </span>
              
              {provider && (
                <span className="text-xs text-muted-foreground">
                  {provider}
                </span>
              )}
              
              <RecurringStatusBadge 
                isNewlyDetected={isNewlyDetected}
                priceIncreased={priceIncreased}
                hasDuplicate={hasDuplicate}
                usageLevel={usageLevel}
              />
            </div>
          </div>
          
          <div className="flex flex-col items-end ml-2">
            <span className={`font-medium ${!isTracked ? 'text-muted-foreground' : ''}`}>
              {formatCurrency(amount)}
            </span>
            <span className="text-xs text-muted-foreground">
              {frequency === 'monthly' 
                ? `${formatCurrency(amount * 12)}/year` 
                : frequency === 'yearly'
                ? `${formatCurrency(amount / 12)}/month`
                : frequency === 'weekly'
                ? `${formatCurrency(amount * 4.33)}/month`
                : ''
              }
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center space-x-1">
            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Next: {formatDate(nextPaymentDate)}
            </span>
          </div>
          
          <PaymentDueBadge daysUntil={daysUntil} />
        </div>
      </div>
    </div>
  );
};
