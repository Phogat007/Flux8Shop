
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { 
  User, 
  ShoppingBag, 
  Heart, 
  MapPin, 
  CreditCard,
  Settings 
} from "lucide-react";

// Components for the different sections
import OrderHistory from "@/components/account/OrderHistory";
import AddressBook from "@/components/account/AddressBook";
import Wishlist from "@/components/account/Wishlist";
import PaymentMethods from "@/components/account/PaymentMethods";
import AccountSettings from "@/components/account/AccountSettings";

const Account = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <Layout>
      <div className="py-10 px-4 md:px-6 space-y-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">My Account</h1>
          <p className="text-muted-foreground mb-8">Manage your account details and preferences</p>

          <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-6 gap-2">
              <TabsTrigger value="profile" className="flex gap-2 items-center">
                <User className="h-4 w-4" />
                <span className="hidden md:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex gap-2 items-center">
                <ShoppingBag className="h-4 w-4" />
                <span className="hidden md:inline">Orders</span>
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="flex gap-2 items-center">
                <Heart className="h-4 w-4" />
                <span className="hidden md:inline">Wishlist</span>
              </TabsTrigger>
              <TabsTrigger value="addresses" className="flex gap-2 items-center">
                <MapPin className="h-4 w-4" />
                <span className="hidden md:inline">Addresses</span>
              </TabsTrigger>
              <TabsTrigger value="payment" className="flex gap-2 items-center">
                <CreditCard className="h-4 w-4" />
                <span className="hidden md:inline">Payment</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex gap-2 items-center">
                <Settings className="h-4 w-4" />
                <span className="hidden md:inline">Settings</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    toast({
                      title: "Profile updated",
                      description: "Your profile information has been updated successfully."
                    });
                  }} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="john.doe@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                      </div>
                    </div>
                    <Button type="submit">Save Changes</Button>
                  </form>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    toast({
                      title: "Password updated",
                      description: "Your password has been updated successfully."
                    });
                  }} className="space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input id="currentPassword" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input id="confirmPassword" type="password" />
                      </div>
                    </div>
                    <Button type="submit">Update Password</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <OrderHistory />
            </TabsContent>

            <TabsContent value="wishlist">
              <Wishlist />
            </TabsContent>

            <TabsContent value="addresses">
              <AddressBook />
            </TabsContent>

            <TabsContent value="payment">
              <PaymentMethods />
            </TabsContent>

            <TabsContent value="settings">
              <AccountSettings />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
