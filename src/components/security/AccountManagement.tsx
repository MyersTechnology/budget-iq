
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Trash, UserX } from "lucide-react";

const AccountManagement = () => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { toast } = useToast();

  const handleLogoutAllDevices = () => {
    toast({
      title: "Logged Out From All Devices",
      description: "You have been successfully logged out from all devices."
    });
  };

  const handleDeleteAccount = () => {
    // In a real app, this would make an API call to delete the account
    toast({
      title: "Account Deletion Initiated",
      description: "Your account deletion process has begun. You'll receive an email confirmation."
    });
    setShowDeleteConfirm(false);
  };

  return (
    <Card className="card-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserX className="h-5 w-5 text-budget-red" />
            <CardTitle>Account Management</CardTitle>
          </div>
        </div>
        <CardDescription>
          Log out from all devices or delete your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Session Management</h3>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleLogoutAllDevices}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log Out From All Devices
            </Button>
          </div>
          
          <div className="pt-3 border-t">
            <h3 className="font-medium mb-2">Account Deletion</h3>
            {!showDeleteConfirm ? (
              <>
                <Button 
                  variant="outline" 
                  className="w-full text-budget-red border-budget-red/20 hover:bg-budget-red/10"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete Account Permanently
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  This will permanently delete your account and all associated data
                </p>
              </>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-budget-red font-medium">
                  Are you sure you want to delete your account? This action cannot be undone.
                </p>
                <div className="flex gap-2">
                  <Button 
                    variant="destructive" 
                    className="flex-1"
                    onClick={handleDeleteAccount}
                  >
                    Yes, Delete My Account
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountManagement;
