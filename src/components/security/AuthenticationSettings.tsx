
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Fingerprint, Key, Lock, Shield, UserCheck } from "lucide-react";

const AuthenticationSettings = () => {
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [googleLinked, setGoogleLinked] = useState(true);
  const [appleLinked, setAppleLinked] = useState(false);
  const { toast } = useToast();

  const handleMfaToggle = (enabled: boolean) => {
    setMfaEnabled(enabled);
    toast({
      title: enabled ? "MFA Enabled" : "MFA Disabled",
      description: enabled 
        ? "Multi-factor authentication is now active on your account."
        : "Multi-factor authentication has been disabled."
    });
  };

  const handleLinkAccount = (provider: string) => {
    toast({
      title: "Account Linking Initiated",
      description: `Redirecting to ${provider} for authentication...`
    });
    // In a real app, this would redirect to OAuth flow
  };

  return (
    <Card className="card-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-budget-blue" />
            <CardTitle>Authentication & Access</CardTitle>
          </div>
        </div>
        <CardDescription>
          Manage your login methods and security settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="mfa">Multi-Factor Authentication (MFA)</Label>
              <p className="text-sm text-muted-foreground">
                Require a verification code when logging in
              </p>
            </div>
            <Switch 
              id="mfa" 
              checked={mfaEnabled} 
              onCheckedChange={handleMfaToggle}
            />
          </div>
          
          <div className="pt-3 border-t">
            <h3 className="font-medium mb-2">Connected Accounts</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserCheck className="h-4 w-4" />
                  <span>Google Account</span>
                </div>
                {googleLinked ? (
                  <Button variant="outline" size="sm" onClick={() => setGoogleLinked(false)}>
                    Disconnect
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => handleLinkAccount("Google")}>
                    Connect
                  </Button>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserCheck className="h-4 w-4" />
                  <span>Apple ID</span>
                </div>
                {appleLinked ? (
                  <Button variant="outline" size="sm" onClick={() => setAppleLinked(false)}>
                    Disconnect
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => handleLinkAccount("Apple")}>
                    Connect
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          <div className="pt-3 border-t">
            <h3 className="font-medium mb-2">Password Management</h3>
            <Button variant="outline" className="w-full">
              <Key className="mr-2 h-4 w-4" />
              Change Password
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthenticationSettings;
