
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormValues } from "./types";

interface AmountFieldsProps {
  control: Control<FormValues>;
}

export const AmountFields = ({ control }: AmountFieldsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <FormField
        control={control}
        name="targetAmount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Target Amount</FormLabel>
            <FormControl>
              <Input type="number" min="0" step="0.01" placeholder="0.00" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="targetDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Target Date (Optional)</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormDescription>
              Leave blank for ongoing goals
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
