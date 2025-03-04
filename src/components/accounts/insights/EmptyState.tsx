
import { Link } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const EmptyState = () => {
  return (
    <Card className="border border-border/50 card-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center text-center h-[400px] max-w-md mx-auto">
          <Link className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">Select an account</h3>
          <p className="text-muted-foreground mt-1">
            Choose an account from the list to view transactions and insights.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyState;
