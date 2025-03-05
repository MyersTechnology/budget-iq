
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Control } from "react-hook-form";
import { FormValues } from "./types";

interface AIAdjustmentFieldProps {
  control: Control<FormValues>;
}

export const AIAdjustmentField = ({ control }: AIAdjustmentFieldProps) => {
  return (
    <FormField
      control={control}
      name="autoAdjust"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
          <div className="space-y-0.5">
            <FormLabel className="text-base">AI Smart Adjustments</FormLabel>
            <FormDescription>
              Allow AI to suggest adjustments to your contribution amount based on your spending patterns
            </FormDescription>
          </div>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
