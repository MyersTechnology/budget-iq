
import { Badge } from '@/components/ui/badge';

interface PaymentDueBadgeProps {
  daysUntil: number;
}

export const PaymentDueBadge = ({ daysUntil }: PaymentDueBadgeProps) => {
  if (daysUntil <= 7 && daysUntil >= 0) {
    return (
      <Badge 
        variant="outline" 
        className={daysUntil <= 3 ? "bg-red-50 text-red-700 border-red-200" : "bg-yellow-50 text-yellow-700 border-yellow-200"}
      >
        {daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `${daysUntil} days`}
      </Badge>
    );
  }
  
  return null;
};
