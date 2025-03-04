
import { RecurringCategory } from '@/types/recurring';
import { getAvailableCategories } from '@/utils/recurring/recurringHelpers';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategorySelectProps {
  category: RecurringCategory;
  onUpdateCategory: (value: string) => void;
  className?: string;
}

export const CategorySelect = ({
  category,
  onUpdateCategory,
  className = "h-8 w-full sm:w-[130px]"
}: CategorySelectProps) => {
  return (
    <Select 
      defaultValue={category} 
      onValueChange={onUpdateCategory}
    >
      <SelectTrigger className={className}>
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
  );
};
