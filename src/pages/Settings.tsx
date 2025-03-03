
import { useState } from 'react';
import { BookUser, CreditCard, KeyRound, Lock, Mail, User } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Settings = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    
    // Simulate saving
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <AppLayout>
      <div className="space-y-6 pb-10 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold">Account Settings</h1>
        </div>
        
        <Tabs defaultValue="profile" className="w-full">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-64 flex-shrink-0">
              <TabsList className="flex flex-col items-start h-auto p-0 bg-transparent">
                <div className="w-full pb-2 mb-2 border-b">
                  <p className="text-sm font-medium text-muted-foreground px-3 mb-1">Account</p>
                  <TabsTrigger 
                    value="profile" 
                    className="w-full justify-start px-3 py-2 data-[state=active]:bg-secondary/50 rounded-md"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger 
                    value="security" 
                    className="w-full justify-start px-3 py-2 data-[state=active]:bg-secondary/50 rounded-md"
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Security
                  </TabsTrigger>
                  <TabsTrigger 
                    value="billing" 
                    className="w-full justify-start px-3 py-2 data-[state=active]:bg-secondary/50 rounded-md"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Billing
                  </TabsTrigger>
                </div>
                <div className="w-full pb-2">
                  <p className="text-sm font-medium text-muted-foreground px-3 mb-1">Application</p>
                  <TabsTrigger 
                    value="connections" 
                    className="w-full justify-start px-3 py-2 data-[state=active]:bg-secondary/50 rounded-md"
                  >
                    <BookUser className="h-4 w-4 mr-2" />
                    Connections
                  </TabsTrigger>
                  <TabsTrigger 
                    value="notifications" 
                    className="w-full justify-start px-3 py-2 data-[state=active]:bg-secondary/50 rounded-md"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger 
                    value="api" 
                    className="w-full justify-start px-3 py-2 data-[state=active]:bg-secondary/50 rounded-md"
                  >
                    <KeyRound className="h-4 w-4 mr-2" />
                    API Keys
                  </TabsTrigger>
                </div>
              </TabsList>
            </div>
            
            <div className="flex-1">
              <TabsContent value="profile">
                <Card className="border border-border/50 shadow-sm">
                  <CardHeader>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>
                      Manage your account profile information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSave} className="space-y-6">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="first-name">First name</Label>
                            <Input id="first-name" defaultValue="Alex" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="last-name">Last name</Label>
                            <Input id="last-name" defaultValue="Smith" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" defaultValue="alex@example.com" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone number</Label>
                          <Input id="phone" type="tel" defaultValue="(555) 123-4567" />
                        </div>
                      </div>
                      
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                            <span>Saving...</span>
                          </div>
                        ) : (
                          "Save changes"
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security">
                <Card className="border border-border/50 shadow-sm">
                  <CardHeader>
                    <CardTitle>Security</CardTitle>
                    <CardDescription>
                      Manage your account security settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSave} className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current password</Label>
                          <Input id="current-password" type="password" />
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="new-password">New password</Label>
                            <Input id="new-password" type="password" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm password</Label>
                            <Input id="confirm-password" type="password" />
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-4">
                          <h3 className="text-base font-medium">Two-factor authentication</h3>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <p className="text-sm font-medium">Authenticator app</p>
                              <p className="text-xs text-muted-foreground">
                                Use an authenticator app to generate one-time codes
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <p className="text-sm font-medium">Text message</p>
                              <p className="text-xs text-muted-foreground">
                                Receive codes via SMS
                              </p>
                            </div>
                            <Switch />
                          </div>
                        </div>
                      </div>
                      
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                            <span>Saving...</span>
                          </div>
                        ) : (
                          "Save changes"
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="billing">
                <Card className="border border-border/50 shadow-sm">
                  <CardHeader>
                    <CardTitle>Billing and Plans</CardTitle>
                    <CardDescription>
                      Manage your subscription plan and billing information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border rounded-lg p-4">
                        <div>
                          <h3 className="font-medium">Free Plan</h3>
                          <p className="text-sm text-muted-foreground">Basic features</p>
                        </div>
                        <Button variant="outline">Upgrade</Button>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-base font-medium">Payment methods</h3>
                        <p className="text-sm text-muted-foreground">
                          No payment methods added yet
                        </p>
                        <Button variant="outline" size="sm">Add payment method</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="connections">
                <Card className="border border-border/50 shadow-sm">
                  <CardHeader>
                    <CardTitle>Connected Accounts</CardTitle>
                    <CardDescription>
                      Manage your linked financial accounts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <CreditCard className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">Connect a bank account</h3>
                            <p className="text-sm text-muted-foreground">Link your financial accounts</p>
                          </div>
                        </div>
                        <Button size="sm">Connect</Button>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        No accounts connected yet. Link your bank accounts to get started with BudgetAI.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications">
                <Card className="border border-border/50 shadow-sm">
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>
                      Configure how and when you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-base font-medium">Email Notifications</h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <p className="text-sm font-medium">Weekly Summary</p>
                            <p className="text-xs text-muted-foreground">
                              Receive a weekly summary of your spending
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <p className="text-sm font-medium">Budget Alerts</p>
                            <p className="text-xs text-muted-foreground">
                              Get notified when you're approaching budget limits
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <p className="text-sm font-medium">Unusual Activity</p>
                            <p className="text-xs text-muted-foreground">
                              Get alerted about suspicious transactions
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-base font-medium">Push Notifications</h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <p className="text-sm font-medium">New Transactions</p>
                            <p className="text-xs text-muted-foreground">
                              Get notified of new transactions
                            </p>
                          </div>
                          <Switch />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <p className="text-sm font-medium">AI Insights</p>
                            <p className="text-xs text-muted-foreground">
                              Receive insights about your spending habits
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <Button type="submit">Save preferences</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="api">
                <Card className="border border-border/50 shadow-sm">
                  <CardHeader>
                    <CardTitle>API Keys</CardTitle>
                    <CardDescription>
                      Manage API keys for developer access
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between border rounded-lg p-4">
                      <div>
                        <h3 className="font-medium">Developer API</h3>
                        <p className="text-sm text-muted-foreground">Available on premium plans</p>
                      </div>
                      <Button variant="outline" disabled>Upgrade to access</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Settings;
