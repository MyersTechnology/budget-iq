
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Control } from "react-hook-form";
import { FormValues } from "./types";

interface GoalPriorityFieldProps {
  control: Control<FormValues>;
}

export const GoalPriorityField = ({ control }: GoalPriorityFieldProps) => {
  return (
    <FormField
      control={control}
      name="priority"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Priority</FormLabel>
          <FormControl>
            <RadioGroup 
              onValueChange={field.onChange} 
              defaultValue={field.value}
              className="flex space-x-2"
            >
              <FormItem className="flex items-center space-x-1 space-y-0">
                <FormControl>
                  <RadioGroupItem value="low" />
                </FormControl>
                <FormLabel className="font-normal cursor-pointer">Low</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-1 space-y-0">
                <FormControl>
                  <RadioGroupItem value="medium" />
                </FormControl>
                <FormLabel className="font-normal cursor-pointer">Medium</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-1 space-y-0">
                <FormControl>
                  <RadioGroupItem value="high" />
                </FormControl>
                <FormLabel className="font-normal cursor-pointer">High</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
