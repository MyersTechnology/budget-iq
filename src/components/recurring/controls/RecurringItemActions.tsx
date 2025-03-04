
import { Button } from '@/components/ui/button';
import { Check, AlertCircle, Trash2 } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface RecurringItemActionsProps {
  isTracked: boolean;
  cancellationUrl?: string;
  onToggleTracking: () => void;
}

export const RecurringItemActions = ({
  isTracked,
  cancellationUrl,
  onToggleTracking
}: RecurringItemActionsProps) => {
  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onToggleTracking}
            >
              {isTracked ? (
                <Check className="h-4 w-4 text-budget-green" />
              ) : (
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {isTracked ? 'Pause tracking' : 'Resume tracking'}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      {cancellationUrl && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive"
                asChild
              >
                <a href={cancellationUrl} target="_blank" rel="noopener noreferrer">
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
  );
};
