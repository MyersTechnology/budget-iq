
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Database, Download, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DataPrivacySettings = () => {
  const [analyticsSharingEnabled, setAnalyticsSharingEnabled] = useState(true);
  const [transactionHistoryEnabled, setTransactionHistoryEnabled] = useState(true);
  const { toast } = useToast();

  const handleExportData = () => {
    // In a real implementation, this would trigger an API call to generate the export
    toast({
      title: "Export Started",
      description: "Your transaction history is being prepared for download."
    });
    
    // Simulate download after a delay
    setTimeout(() => {
      toast({
        title: "Export Ready",
        description: "Your data has been exported successfully."
      });
    }, 2000);
  };

  return (
    <Card className="card-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-budget-red" />
            <CardTitle>Data & Privacy</CardTitle>
          </div>
        </div>
        <CardDescription>
          Manage your data and privacy preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="analytics-sharing">Analytics Sharing</Label>
              <p className="text-sm text-muted-foreground">
                Allow anonymous usage data to improve our services
              </p>
            </div>
            <Switch
              id="analytics-sharing"
              checked={analyticsSharingEnabled}
              onCheckedChange={setAnalyticsSharingEnabled}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="transaction-history">Transaction History</Label>
              <p className="text-sm text-muted-foreground">
                Keep detailed transaction history for personalized insights
              </p>
            </div>
            <Switch
              id="transaction-history"
              checked={transactionHistoryEnabled}
              onCheckedChange={setTransactionHistoryEnabled}
            />
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <Label className="mb-2 block">Export Your Data</Label>
          <p className="text-sm text-muted-foreground mb-3">
            Download your transaction history and personal data
          </p>
          <Button onClick={handleExportData} variant="outline" className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Export Transaction History
          </Button>
        </div>
        
        <div className="pt-4 border-t">
          <Button variant="outline" className="w-full text-budget-red border-budget-red/20 hover:bg-budget-red/10">
            <Database className="mr-2 h-4 w-4" />
            Delete Account Data
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            This will permanently delete all your data from our servers
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataPrivacySettings;
