
import { Badge } from '@/components/ui/badge';

interface RecurringStatusBadgeProps {
  isNewlyDetected?: boolean;
  priceIncreased?: boolean;
  hasDuplicate?: boolean;
  usageLevel?: string;
}

export const RecurringStatusBadge = ({
  isNewlyDetected,
  priceIncreased,
  hasDuplicate,
  usageLevel
}: RecurringStatusBadgeProps) => {
  if (isNewlyDetected) {
    return (
      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">New</Badge>
    );
  } else if (priceIncreased) {
    return (
      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Price Increased</Badge>
    );
  } else if (hasDuplicate) {
    return (
      <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Duplicate</Badge>
    );
  } else if (usageLevel === 'unused') {
    return (
      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Unused</Badge>
    );
  }
  
  return null;
};
