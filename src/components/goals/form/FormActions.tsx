
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  onCancel: () => void;
}

export const FormActions = ({ onCancel }: FormActionsProps) => {
  return (
    <div className="flex justify-end gap-3 pt-3">
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit">
        Create Goal
      </Button>
    </div>
  );
};
