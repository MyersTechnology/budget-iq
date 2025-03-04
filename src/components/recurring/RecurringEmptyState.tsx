
import { FileWarning } from 'lucide-react';

const RecurringEmptyState = () => {
  return (
    <div className="text-center py-6">
      <FileWarning className="mx-auto h-10 w-10 text-muted-foreground" />
      <h3 className="mt-2 text-sm font-medium">No recurring expenses found</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Try adjusting your search or filters
      </p>
    </div>
  );
};

export default RecurringEmptyState;
