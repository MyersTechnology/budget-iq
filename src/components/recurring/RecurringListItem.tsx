
import { RecurringItem } from '@/types/recurring';
import { RecurringItemDetails } from './details/RecurringItemDetails';
import { CategorySelect } from './controls/CategorySelect';
import { RecurringItemActions } from './controls/RecurringItemActions';

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
  return (
    <div 
      className={`flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-lg border ${
        !item.isTracked ? 'bg-muted/30 border-dashed' : 'bg-card'
      }`}
    >
      <RecurringItemDetails 
        name={item.name}
        amount={item.amount}
        category={item.category}
        frequency={item.frequency}
        provider={item.provider}
        nextPaymentDate={item.nextPaymentDate}
        isTracked={item.isTracked}
        isNewlyDetected={item.isNewlyDetected}
        priceIncreased={item.priceIncreased}
        hasDuplicate={item.hasDuplicate}
        usageLevel={item.usageLevel}
      />
      
      <div className="flex items-center gap-2 sm:justify-end">
        <div className="flex-grow sm:flex-grow-0">
          <CategorySelect 
            category={item.category}
            onUpdateCategory={(value) => onUpdateCategory(item.id, value)}
          />
        </div>
        
        <RecurringItemActions 
          isTracked={item.isTracked}
          cancellationUrl={item.cancellationUrl}
          onToggleTracking={() => onToggleTracking(item.id, !item.isTracked)}
        />
      </div>
    </div>
  );
};

export default RecurringListItem;
