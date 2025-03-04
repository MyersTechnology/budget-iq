
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LoadingState = () => {
  return (
    <Card className="border border-border/50 card-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg skeleton-pulse">Loading account data...</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadingState;
