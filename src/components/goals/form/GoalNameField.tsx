
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormValues } from "./types";

interface GoalNameFieldProps {
  control: Control<FormValues>;
}

export const GoalNameField = ({ control }: GoalNameFieldProps) => {
  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Goal Name</FormLabel>
          <FormControl>
            <Input placeholder="e.g. Emergency Fund" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
