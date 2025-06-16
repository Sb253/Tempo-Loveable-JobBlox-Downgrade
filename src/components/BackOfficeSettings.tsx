
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Settings, 
  Users, 
  Shield, 
  Database, 
  Bell, 
  Palette, 
  Globe, 
  Code, 
  CreditCard,
  Mail,
  Lock,
  UserCheck,
  Building2,
  FileText,
  BarChart3,
  Zap,
  Cloud,
  Key,
  Webhook
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const BackOfficeSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    toast({
      title: "Settings saved",
      description: "Your settings have been successfully updated.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Back Office Settings</h1>
          <p className="text-muted-foreground">Manage your system configuration and advanced settings</p>
        </div>
        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save All Changes"}
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-8">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Company Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" defaultValue="JobBlox Construction" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-email">Company Email</Label>
                  <Input id="company-email" type="email" defaultValue="info@jobblox.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-phone">Phone Number</Label>
                  <Input id="company-phone" defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-address">Address</Label>
                  <Textarea id="company-address" defaultValue="123 Construction Ave, Builder City, BC 12345" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Regional Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select defaultValue="america/new_york">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="america/new_york">Eastern Time (EST/EDT)</SelectItem>
                      <SelectItem value="america/chicago">Central Time (CST/CDT)</SelectItem>
                      <SelectItem value="america/denver">Mountain Time (MST/MDT)</SelectItem>
                      <SelectItem value="america/los_angeles">Pacific Time (PST/PDT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD - US Dollar</SelectItem>
                      <SelectItem value="cad">CAD - Canadian Dollar</SelectItem>
                      <SelectItem value="eur">EUR - Euro</SelectItem>
                      <SelectItem value="gbp">GBP - British Pound</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Date Format</Label>
                  <Select defaultValue="mm/dd/yyyy">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Auto-approve new users</h4>
                  <p className="text-sm text-muted-foreground">Automatically approve new user registrations</p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Require email verification</h4>
                  <p className="text-sm text-muted-foreground">Users must verify their email before accessing the system</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Default user role</Label>
                <Select defaultValue="employee">
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="employee">Employee</SelectItem>
                    <SelectItem value="contractor">Contractor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Policies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Two-factor authentication</h4>
                    <p className="text-sm text-muted-foreground">Require 2FA for all users</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Strong password policy</h4>
                    <p className="text-sm text-muted-foreground">Enforce complex password requirements</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label>Session timeout (minutes)</Label>
                  <Input type="number" defaultValue="30" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Access Control
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>IP Whitelist</Label>
                  <Textarea placeholder="Enter IP addresses (one per line)" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Audit logging</h4>
                    <p className="text-sm text-muted-foreground">Log all user actions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Third-party Integrations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">QuickBooks</h4>
                    <p className="text-sm text-muted-foreground">Accounting integration</p>
                  </div>
                  <Badge variant="outline">Connected</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Stripe</h4>
                    <p className="text-sm text-muted-foreground">Payment processing</p>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Google Maps</h4>
                    <p className="text-sm text-muted-foreground">Location services</p>
                  </div>
                  <Badge variant="outline">Connected</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>SMTP Server</Label>
                  <Input defaultValue="smtp.gmail.com" />
                </div>
                <div className="space-y-2">
                  <Label>Port</Label>
                  <Input defaultValue="587" />
                </div>
                <div className="space-y-2">
                  <Label>Username</Label>
                  <Input defaultValue="noreply@jobblox.com" />
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input type="password" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Email Notifications</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>New job assignments</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Customer messages</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Invoice payments</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>System updates</span>
                    <Switch />
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h4 className="font-medium">Push Notifications</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Urgent alerts</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Daily summaries</span>
                    <Switch />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Billing & Subscription
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-blue-900 dark:text-blue-100">Professional Plan</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">$99/month • Billed annually</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Active</Badge>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Next billing date</span>
                  <span className="font-medium">January 15, 2025</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Payment method</span>
                  <span className="font-medium">•••• 4242</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Update Payment Method</Button>
                <Button variant="outline">Download Invoices</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  API Keys
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Production API Key</Label>
                  <div className="flex gap-2">
                    <Input type="password" defaultValue="sk_live_..." readOnly />
                    <Button variant="outline" size="sm">Copy</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Test API Key</Label>
                  <div className="flex gap-2">
                    <Input type="password" defaultValue="sk_test_..." readOnly />
                    <Button variant="outline" size="sm">Copy</Button>
                  </div>
                </div>
                <Button variant="outline" className="w-full">Generate New Key</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Webhook className="h-5 w-5" />
                  Webhooks
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Webhook URL</Label>
                  <Input placeholder="https://your-app.com/webhooks" />
                </div>
                <div className="space-y-2">
                  <Label>Events</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="job-created" />
                      <label htmlFor="job-created" className="text-sm">Job Created</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="payment-received" />
                      <label htmlFor="payment-received" className="text-sm">Payment Received</label>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">Add Webhook</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Database Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Auto-backup</h4>
                    <p className="text-sm text-muted-foreground">Daily automated backups</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label>Backup retention (days)</Label>
                  <Input type="number" defaultValue="30" />
                </div>
                <Button variant="outline" className="w-full">Create Manual Backup</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="h-5 w-5" />
                  System Maintenance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Maintenance mode</h4>
                    <p className="text-sm text-muted-foreground">Enable for system updates</p>
                  </div>
                  <Switch />
                </div>
                <div className="space-y-2">
                  <Label>Cache TTL (seconds)</Label>
                  <Input type="number" defaultValue="3600" />
                </div>
                <Button variant="outline" className="w-full">Clear All Caches</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
