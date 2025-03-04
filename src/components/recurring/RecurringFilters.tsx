
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategorySummary } from '@/types/recurring';

interface RecurringFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  categories: CategorySummary[];
}

const RecurringFilters = ({
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  categories
}: RecurringFiltersProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-grow">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search subscriptions..."
          className="pl-8 h-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground"
            onClick={() => setSearchQuery('')}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      
      <Select value={categoryFilter} onValueChange={setCategoryFilter}>
        <SelectTrigger className="w-[130px] h-9">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.category} value={cat.category}>
                {cat.displayName}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default RecurringFilters;
