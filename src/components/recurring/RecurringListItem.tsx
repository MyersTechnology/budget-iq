
import { RecurringItem, RecurringCategory } from '@/types/recurring';
import { formatCurrency } from '@/utils/transactions';
import { 
  AlertCircle, 
  Check, 
  Clock, 
  CreditCard, 
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface RecurringListItemProps {
  item: RecurringItem;
  onToggleTracking: (itemId: string, tracked: boolean) => void;
  onUpdateCategory: (itemId: string, category: string) => void;
}

const RecurringListItem = ({
  item,
  onToggleTracking,
  onUpdateCategory
}: RecurringListItemProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  const getDaysUntil = (dateString: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0);
    
    const diffTime = date.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const daysUntil = getDaysUntil(item.nextPaymentDate);
  let statusBadge = null;
  
  if (item.isNewlyDetected) {
    statusBadge = (
      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">New</Badge>
    );
  } else if (item.priceIncreased) {
    statusBadge = (
      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Price Increased</Badge>
    );
  } else if (item.hasDuplicate) {
    statusBadge = (
      <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Duplicate</Badge>
    );
  } else if (item.usageLevel === 'unused') {
    statusBadge = (
      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Unused</Badge>
    );
  }
  
  return (
    <div 
      className={`flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-lg border ${
        !item.isTracked ? 'bg-muted/30 border-dashed' : 'bg-card'
      }`}
    >
      <div className="flex items-start gap-3 flex-grow">
        <div className={`rounded-md p-2 ${getCategoryColor(item.category)}`}>
          <CreditCard className="h-5 w-5 text-white" />
        </div>
        
        <div className="flex-grow min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className={`font-medium ${!item.isTracked ? 'text-muted-foreground' : ''}`}>
                {item.name}
              </h3>
              
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                <span className="text-xs text-muted-foreground">
                  {capitalize(item.frequency)}
                </span>
                
                {item.provider && (
                  <span className="text-xs text-muted-foreground">
                    {item.provider}
                  </span>
                )}
                
                {statusBadge}
              </div>
            </div>
            
            <div className="flex flex-col items-end ml-2">
              <span className={`font-medium ${!item.isTracked ? 'text-muted-foreground' : ''}`}>
                {formatCurrency(item.amount)}
              </span>
              <span className="text-xs text-muted-foreground">
                {item.frequency === 'monthly' 
                  ? `${formatCurrency(item.amount * 12)}/year` 
                  : item.frequency === 'yearly'
                  ? `${formatCurrency(item.amount / 12)}/month`
                  : item.frequency === 'weekly'
                  ? `${formatCurrency(item.amount * 4.33)}/month`
                  : ''
                }
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center space-x-1">
              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                Next: {formatDate(item.nextPaymentDate)}
              </span>
            </div>
            
            {daysUntil <= 7 && daysUntil >= 0 && (
              <Badge variant="outline" className={daysUntil <= 3 ? "bg-red-50 text-red-700 border-red-200" : "bg-yellow-50 text-yellow-700 border-yellow-200"}>
                {daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `${daysUntil} days`}
              </Badge>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 sm:justify-end">
        <div className="flex-grow sm:flex-grow-0">
          <Select 
            defaultValue={item.category} 
            onValueChange={(value) => onUpdateCategory(item.id, value)}
          >
            <SelectTrigger className="h-8 w-full sm:w-[130px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {getAvailableCategories().map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onToggleTracking(item.id, !item.isTracked)}
              >
                {item.isTracked ? (
                  <Check className="h-4 w-4 text-budget-green" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {item.isTracked ? 'Pause tracking' : 'Resume tracking'}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {item.cancellationUrl && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive"
                  asChild
                >
                  <a href={item.cancellationUrl} target="_blank" rel="noopener noreferrer">
                    <Trash2 className="h-4 w-4" />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Cancel subscription
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
};

export default RecurringListItem;
