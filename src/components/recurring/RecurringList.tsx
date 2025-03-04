
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { RecurringItem, CategorySummary } from '@/types/recurring';
import RecurringListItem from './RecurringListItem';
import RecurringEmptyState from './RecurringEmptyState';
import RecurringFilters from './RecurringFilters';
import RecurringLoadingState from './RecurringLoadingState';
import { getAvailableCategories, getCategoryColor } from '@/utils/recurring/recurringHelpers';

// Export these for use by RecurringListItem
export { getAvailableCategories, getCategoryColor };

interface RecurringListProps {
  items: RecurringItem[];
  categories: CategorySummary[];
  isLoading: boolean;
  onToggleTracking: (itemId: string, tracked: boolean) => void;
  onUpdateCategory: (itemId: string, category: string) => void;
}

const RecurringList = ({
  items,
  categories,
  isLoading,
  onToggleTracking,
  onUpdateCategory
}: RecurringListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.provider?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  const sortedItems = [...filteredItems].sort((a, b) => {
    return new Date(a.nextPaymentDate).getTime() - new Date(b.nextPaymentDate).getTime();
  });
  
  return (
    <Card className="border border-border/50 card-shadow">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="text-lg">Recurring Expenses</CardTitle>
          
          <RecurringFilters 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            categories={categories}
          />
        </div>
      </CardHeader>
      
      <CardContent>
        {isLoading ? (
          <RecurringLoadingState />
        ) : (
          <div className="space-y-2 max-h-[600px] overflow-auto pr-1">
            {sortedItems.length === 0 ? (
              <RecurringEmptyState />
            ) : (
              sortedItems.map((item) => (
                <RecurringListItem 
                  key={item.id}
                  item={item}
                  onToggleTracking={onToggleTracking}
                  onUpdateCategory={onUpdateCategory}
                />
              ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecurringList;
