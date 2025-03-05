
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Bell, BellOff, Mail } from "lucide-react";

const NotificationSettings = () => {
  const [spendingAlerts, setSpendingAlerts] = useState(true);
  const [budgetReminders, setBudgetReminders] = useState(true);
  const [goalUpdates, setGoalUpdates] = useState(true);
  const [frequency, setFrequency] = useState("weekly");

  return (
    <Card className="card-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-budget-blue" />
            <CardTitle>Notification Preferences</CardTitle>
          </div>
        </div>
        <CardDescription>
          Customize how and when you receive alerts and updates
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="spending-alerts">AI Spending Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when unusual spending is detected
              </p>
            </div>
            <Switch
              id="spending-alerts"
              checked={spendingAlerts}
              onCheckedChange={setSpendingAlerts}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="budget-reminders">Budget Reminders</Label>
              <p className="text-sm text-muted-foreground">
                Receive alerts when approaching budget limits
              </p>
            </div>
            <Switch
              id="budget-reminders"
              checked={budgetReminders}
              onCheckedChange={setBudgetReminders}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="goal-updates">Financial Goal Updates</Label>
              <p className="text-sm text-muted-foreground">
                Get progress updates on your savings goals
              </p>
            </div>
            <Switch
              id="goal-updates"
              checked={goalUpdates}
              onCheckedChange={setGoalUpdates}
            />
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <Label htmlFor="notification-frequency" className="mb-2 block">
            Notification Frequency
          </Label>
          <Select value={frequency} onValueChange={setFrequency}>
            <SelectTrigger id="notification-frequency" className="w-full">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground mt-2">
            How often you want to receive summary notifications
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
