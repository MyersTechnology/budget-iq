
import { Check, Tag } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Transaction, getCategoryInfo } from '@/utils/mockData';
import { cn } from '@/lib/utils';

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const { date, description, amount, category, pending, aiCategorized } = transaction;
  const { color, label } = getCategoryInfo(category);
  
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  
  const formattedAmount = Math.abs(amount).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  
  return (
    <div className="flex items-center justify-between py-3 px-1 border-b border-border/50 last:border-0 transition-all hover:bg-secondary/30 rounded-md -mx-1 px-2 group">
      <div className="flex items-center gap-3">
        <div className={`flex-shrink-0 w-9 h-9 rounded-full ${color} flex items-center justify-center text-white`}>
          {label.charAt(0)}
        </div>
        
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-sm">{description}</h3>
            {pending && (
              <span className="text-xs px-1.5 py-0.5 bg-secondary/80 text-muted-foreground rounded-full">
                Pending
              </span>
            )}
            
            {aiCategorized && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-center rounded-full bg-budget-purple/10 p-1">
                      <Tag className="h-3 w-3 text-budget-purple" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">AI-categorized</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{formattedDate}</span>
            <span className="text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded-full">
              {label}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <p className={cn(
          "font-medium",
          amount > 0 ? "text-budget-green" : "text-foreground"
        )}>
          {amount > 0 ? '+' : ''}{formattedAmount}
        </p>
        
        <button className="h-6 w-6 rounded-full flex items-center justify-center bg-secondary/0 transition-all hover:bg-secondary opacity-0 group-hover:opacity-100">
          <Check className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
};

export default TransactionItem;
