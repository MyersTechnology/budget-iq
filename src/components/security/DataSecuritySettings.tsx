
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Database, Eye, EyeOff, Lock, LockKeyhole } from "lucide-react";

const DataSecuritySettings = () => {
  const [plaidConnected, setPlaidConnected] = useState(true);
  const [autoLockEnabled, setAutoLockEnabled] = useState(true);
  const [sessionLength, setSessionLength] = useState(30); // minutes
  const { toast } = useToast();

  const handleDeletePlaidConnection = () => {
    toast({
      title: "Plaid Connection Removed",
      description: "Your connection to Plaid has been successfully removed."
    });
    setPlaidConnected(false);
  };

  const handleReconnectPlaid = () => {
    toast({
      title: "Reconnecting to Plaid",
      description: "Redirecting to Plaid to securely connect your accounts..."
    });
    setPlaidConnected(true);
  };

  return (
    <Card className="card-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LockKeyhole className="h-5 w-5 text-budget-purple" />
            <CardTitle>Data Security</CardTitle>
          </div>
        </div>
        <CardDescription>
          Manage your financial data connections and encryption settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-lock">Auto-Lock App</Label>
              <p className="text-sm text-muted-foreground">
                Automatically lock the app after {sessionLength} minutes of inactivity
              </p>
            </div>
            <Switch 
              id="auto-lock" 
              checked={autoLockEnabled} 
              onCheckedChange={setAutoLockEnabled}
            />
          </div>
          
          <div className="pt-3 border-t">
            <h3 className="font-medium mb-2">Financial Connections</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="font-medium">Plaid API Connection</span>
                  <p className="text-sm text-muted-foreground">
                    {plaidConnected ? "Active and secure" : "Not connected"}
                  </p>
                </div>
                {plaidConnected ? (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleDeletePlaidConnection} 
                    className="text-budget-red"
                  >
                    Disconnect
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleReconnectPlaid}
                  >
                    Connect
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          <div className="pt-3 border-t">
            <h3 className="font-medium mb-2">Linked Financial Institutions</h3>
            {plaidConnected ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    <span>Chase Bank</span>
                  </div>
                  <Button variant="ghost" size="sm">Manage</Button>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    <span>Bank of America</span>
                  </div>
                  <Button variant="ghost" size="sm">Manage</Button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No financial institutions are currently linked
              </p>
            )}
          </div>
          
          <div className="pt-3 border-t">
            <h3 className="font-medium mb-2">Data Encryption</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Your data is encrypted using bank-level 256-bit AES encryption
            </p>
            <div className="flex items-center gap-2 text-sm text-budget-green">
              <Lock className="h-4 w-4" />
              <span>End-to-end encryption active</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataSecuritySettings;
