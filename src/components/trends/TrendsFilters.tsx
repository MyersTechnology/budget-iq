
import { Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getCategoryInfo } from '@/utils/mockData';

interface TrendsFiltersProps {
  categories: string[];
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
}

const TrendsFilters = ({ categories, selectedCategories, onToggleCategory }: TrendsFiltersProps) => {
  return (
    <Card className="border border-border/50 card-shadow overflow-hidden">
      <CardContent className="p-2 sm:p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search transactions..." 
              className="pl-9 text-sm"
            />
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1 flex-shrink-0 text-xs sm:text-sm"
            >
              <SlidersHorizontal className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Filters</span>
            </Button>
            
            {categories.slice(0, 6).map((category) => {
              const { color, label } = getCategoryInfo(category);
              const isSelected = selectedCategories.includes(category);
              
              return (
                <Button
                  key={category}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => onToggleCategory(category)}
                  className="flex-shrink-0 text-xs sm:text-sm px-2 sm:px-3"
                >
                  <div className={`h-2 w-2 rounded-full mr-1 ${color}`} />
                  {label}
                </Button>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendsFilters;
