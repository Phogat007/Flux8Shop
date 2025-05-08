
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const AccountSettings = () => {
  const { toast } = useToast();

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings saved",
      description: "Your account settings have been updated successfully."
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>Manage how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="orderUpdates">Order Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about your order status
                  </p>
                </div>
                <Switch id="orderUpdates" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="productNotifications">Product Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when items in your wishlist go on sale
                  </p>
                </div>
                <Switch id="productNotifications" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="marketingEmails">Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive promotions and special offers
                  </p>
                </div>
                <Switch id="marketingEmails" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="newsletter">Newsletter</Label>
                  <p className="text-sm text-muted-foreground">
                    Subscribe to our weekly newsletter
                  </p>
                </div>
                <Switch id="newsletter" defaultChecked />
              </div>
            </div>
            <Button type="submit">Save Notification Preferences</Button>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Privacy Settings</CardTitle>
          <CardDescription>Manage your privacy preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dataSharing">Data Sharing</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow us to share anonymized data for service improvement
                  </p>
                </div>
                <Switch id="dataSharing" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="cookiePreferences">Cookie Preferences</Label>
                  <p className="text-sm text-muted-foreground">
                    Manage cookies used for analytics and personalization
                  </p>
                </div>
                <Switch id="cookiePreferences" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="activityTracking">Activity Tracking</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow us to track your browsing activity on our site
                  </p>
                </div>
                <Switch id="activityTracking" defaultChecked />
              </div>
            </div>
            <Button type="submit">Save Privacy Settings</Button>
          </form>
        </CardContent>
      </Card>
      
      <Card className="border-destructive/20">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>Irreversible account actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-1">Download Your Data</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Download a copy of all the data we have stored about your account.
            </p>
            <Button variant="outline">Request Data Export</Button>
          </div>
          
          <div className="pt-4 border-t">
            <h3 className="font-medium text-destructive mb-1">Delete Account</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountSettings;
