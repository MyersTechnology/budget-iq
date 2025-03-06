
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormValues } from "./types";

interface ContributionFieldsProps {
  control: Control<FormValues>;
}

export const ContributionFields = ({ control }: ContributionFieldsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <FormField
        control={control}
        name="contributionFrequency"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Contribution Frequency</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="biweekly">Every 2 Weeks</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="contributionAmount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Contribution Amount</FormLabel>
            <FormControl>
              <Input type="number" min="0" step="0.01" placeholder="0.00" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
