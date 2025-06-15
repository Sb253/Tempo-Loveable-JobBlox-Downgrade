
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRolePermissions, UserRole } from '@/hooks/useRolePermissions';
import { 
  Building2, 
  Users, 
  DollarSign, 
  Settings, 
  Database, 
  Mail, 
  Shield, 
  Clock,
  MapPin,
  Truck,
  Package,
  Calculator,
  Bell,
  Smartphone,
  Globe,
  Key,
  Server,
  CreditCard,
  FileText
} from "lucide-react";

export const BackendSettings = () => {
  const { currentRole, permissions, changeRole } = useRolePermissions();

  const renderRoleSelector = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Current User Role (Demo)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={currentRole} onValueChange={(value: UserRole) => changeRole(value)}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="owner">Owner</SelectItem>
            <SelectItem value="admin">Administrator</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="employee">Employee</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );

  const CompanySettings = () => {
    if (!permissions.canManageCompany) {
      return (
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-center">
              You don't have permission to manage company settings.
            </p>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Company Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input id="company-name" placeholder="ABC Construction" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="business-license">Business License #</Label>
                <Input id="business-license" placeholder="BL123456789" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tax-id">Tax ID / EIN</Label>
                <Input id="tax-id" placeholder="12-3456789" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Primary Phone</Label>
                <Input id="phone" placeholder="(555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Primary Email</Label>
                <Input id="email" type="email" placeholder="info@company.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" placeholder="www.company.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Business Address</Label>
              <Textarea id="address" placeholder="123 Business St, City, State 12345" />
            </div>
            <Button>Save Company Settings</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Licensing & Insurance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contractor-license">Contractor License #</Label>
                <Input id="contractor-license" placeholder="CL987654321" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="license-expiry">License Expiry Date</Label>
                <Input id="license-expiry" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="insurance-policy">Insurance Policy #</Label>
                <Input id="insurance-policy" placeholder="INS123456789" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="insurance-expiry">Insurance Expiry</Label>
                <Input id="insurance-expiry" type="date" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="bonded" />
              <Label htmlFor="bonded">Company is Bonded</Label>
            </div>
            <Button>Save License & Insurance</Button>
          </CardContent>
        </Card>
      </div>
    );
  };

  const UserManagement = () => {
    if (!permissions.canManageUsers) {
      return (
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-center">
              You don't have permission to manage users.
            </p>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            User Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="default-role">Default New User Role</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select default role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employee">Employee</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="admin">Administrator</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-policy">Minimum Password Length</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="8 characters" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6 characters</SelectItem>
                  <SelectItem value="8">8 characters</SelectItem>
                  <SelectItem value="12">12 characters</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="require-2fa" />
              <Label htmlFor="require-2fa">Require Two-Factor Authentication</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="auto-logout" />
              <Label htmlFor="auto-logout">Auto-logout after inactivity</Label>
            </div>
          </div>
          <Button>Save User Settings</Button>
        </CardContent>
      </Card>
    );
  };

  const IntegrationSettings = () => {
    if (!permissions.canManageIntegrations) {
      return (
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-center">
              You don't have permission to manage integrations.
            </p>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Accounting Integration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="accounting-system">Accounting System</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select accounting system" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quickbooks">QuickBooks</SelectItem>
                  <SelectItem value="xero">Xero</SelectItem>
                  <SelectItem value="sage">Sage</SelectItem>
                  <SelectItem value="manual">Manual Entry</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sync-frequency">Sync Frequency</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Daily" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="real-time">Real-time</SelectItem>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>Configure Integration</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Processing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="payment-processor">Payment Processor</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select processor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stripe">Stripe</SelectItem>
                  <SelectItem value="square">Square</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="authorize">Authorize.net</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="auto-payment-reminders" />
              <Label htmlFor="auto-payment-reminders">Automatic Payment Reminders</Label>
            </div>
            <Button>Configure Payment Settings</Button>
          </CardContent>
        </Card>
      </div>
    );
  };

  const OperationalSettings = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Scheduling & Time Tracking
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="work-hours-start">Work Day Start</Label>
                <Input id="work-hours-start" type="time" defaultValue="08:00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="work-hours-end">Work Day End</Label>
                <Input id="work-hours-end" type="time" defaultValue="17:00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="overtime-threshold">Overtime Threshold (hours)</Label>
                <Input id="overtime-threshold" type="number" defaultValue="40" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="break-duration">Default Break Duration (minutes)</Label>
                <Input id="break-duration" type="number" defaultValue="30" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="gps-tracking" />
                <Label htmlFor="gps-tracking">Enable GPS Time Tracking</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="photo-timeclock" />
                <Label htmlFor="photo-timeclock">Require Photo for Clock In/Out</Label>
              </div>
            </div>
            <Button>Save Scheduling Settings</Button>
          </CardContent>
        </Card>

        {permissions.canManageInventory && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Inventory Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="low-stock-threshold">Low Stock Alert Threshold</Label>
                  <Input id="low-stock-threshold" type="number" defaultValue="10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reorder-point">Auto Reorder Point</Label>
                  <Input id="reorder-point" type="number" defaultValue="5" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="auto-reorder" />
                  <Label htmlFor="auto-reorder">Automatic Reordering</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="barcode-scanning" />
                  <Label htmlFor="barcode-scanning">Enable Barcode Scanning</Label>
                </div>
              </div>
              <Button>Save Inventory Settings</Button>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  const NotificationSettings = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notification Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="email-notifications" />
            <Label htmlFor="email-notifications">Email Notifications</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="sms-notifications" />
            <Label htmlFor="sms-notifications">SMS Notifications</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="push-notifications" />
            <Label htmlFor="push-notifications">Push Notifications</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="job-reminders" />
            <Label htmlFor="job-reminders">Job Appointment Reminders</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="payment-reminders" />
            <Label htmlFor="payment-reminders">Payment Due Reminders</Label>
          </div>
        </div>
        <Button>Save Notification Settings</Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Backend Settings</h1>
      
      {renderRoleSelector()}
      
      <Tabs defaultValue="company" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="company">
          <CompanySettings />
        </TabsContent>

        <TabsContent value="users">
          <UserManagement />
        </TabsContent>

        <TabsContent value="integrations">
          <IntegrationSettings />
        </TabsContent>

        <TabsContent value="operations">
          <OperationalSettings />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};
