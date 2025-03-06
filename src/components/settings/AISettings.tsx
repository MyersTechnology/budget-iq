
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Brain, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AISettings = () => {
  const [autoCategorizationEnabled, setAutoCategorizationEnabled] = useState(true);
  const [aiInsightsEnabled, setAiInsightsEnabled] = useState(true);
  const { toast } = useToast();

  const handleSubmitFeedback = () => {
    toast({
      title: "Feedback Submitted",
      description: "Thank you for helping us improve our AI features!"
    });
  };

  return (
    <Card className="card-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-budget-purple" />
            <CardTitle>AI Learning Customization</CardTitle>
          </div>
        </div>
        <CardDescription>
          Personalize how our AI helps you manage your finances
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="auto-categorization">AI Auto-Categorization</Label>
            <p className="text-sm text-muted-foreground">
              Allow AI to automatically categorize your transactions
            </p>
          </div>
          <Switch
            id="auto-categorization"
            checked={autoCategorizationEnabled}
            onCheckedChange={setAutoCategorizationEnabled}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="ai-insights">AI Financial Insights</Label>
            <p className="text-sm text-muted-foreground">
              Receive personalized insights and recommendations
            </p>
          </div>
          <Switch
            id="ai-insights"
            checked={aiInsightsEnabled}
            onCheckedChange={setAiInsightsEnabled}
          />
        </div>
        
        <div className="pt-4 border-t">
          <Label className="mb-2 block">Feedback on AI Insights</Label>
          <p className="text-sm text-muted-foreground mb-3">
            Help us improve our AI by providing feedback on the insights you receive
          </p>
          <Button onClick={handleSubmitFeedback} variant="outline" className="w-full">
            <Lightbulb className="mr-2 h-4 w-4" />
            Submit AI Feedback
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AISettings;
