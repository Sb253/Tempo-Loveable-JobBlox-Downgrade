import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Settings, 
  Users, 
  Shield, 
  Bell, 
  CreditCard, 
  Code, 
  Database,
  Building,
  Zap,
  Save,
  Upload,
  Download,
  Trash2,
  Plus,
  Eye,
  EyeOff
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BusinessIntegrations } from "./BusinessIntegrations";

export const BackOfficeSettings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('general');

  const [companySettings, setCompanySettings] = useState({
    name: 'JobBlox Construction',
    address: '123 Business Ave, City, State 12345',
    phone: '(555) 123-4567',
    email: 'info@jobblox.com',
    website: 'https://jobblox.com',
    logo: null as string | null,
    timezone: 'America/New_York',
    currency: 'USD',
    dateFormat: 'MM/dd/yyyy',
    businessType: 'construction'
  });

  const [userManagement, setUserManagement] = useState({
    allowRegistration: false,
    requireEmailVerification: true,
    defaultUserRole: 'employee',
    sessionTimeout: 60,
    maxLoginAttempts: 5
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    passwordComplexity: true,
    sslRequired: true,
    apiRateLimit: 100,
    auditLogging: true,
    ipWhitelist: '',
    backupEncryption: true
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    jobUpdates: true,
    customerMessages: true,
    systemAlerts: true,
    weeklyReports: true
  });

  const [billingSettings, setBillingSettings] = useState({
    subscriptionPlan: 'professional',
    billingCycle: 'monthly',
    autoRenew: true,
    invoiceEmail: 'billing@jobblox.com',
    taxRate: 8.5,
    currency: 'USD'
  });

  const [apiSettings, setApiSettings] = useState({
    enableApi: true,
    apiKey: 'jb_sk_test_***************',
    webhookUrl: '',
    rateLimit: 1000,
    allowedOrigins: 'https://app.jobblox.com',
    apiVersion: 'v1'
  });

  const [advancedSettings, setAdvancedSettings] = useState({
    databaseBackups: true,
    autoBackupFrequency: 'daily',
    dataRetention: 365,
    debugMode: false,
    performanceMonitoring: true,
    errorReporting: true,
    customDomain: '',
    sslCertificate: true
  });

  const handleSave = (section: string) => {
    toast({
      title: "Settings Saved",
      description: `${section} settings have been updated successfully.`,
    });
  };

  const handleFileUpload = (file: File) => {
    // Handle file upload logic here
    console.log('Uploading file:', file);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'integrations', label: 'Integrations', icon: Zap },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'api', label: 'API Settings', icon: Code },
    { id: 'advanced', label: 'Advanced', icon: Database }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Back Office Settings</h2>
          <p className="text-muted-foreground">Manage your system configuration and business settings</p>
        </div>
        <Badge variant="outline">Admin Access Required</Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={companySettings.name}
                    onChange={(e) => setCompanySettings(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="businessType">Business Type</Label>
                  <Select value={companySettings.businessType} onValueChange={(value) => setCompanySettings(prev => ({ ...prev, businessType: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="construction">Construction</SelectItem>
                      <SelectItem value="roofing">Roofing</SelectItem>
                      <SelectItem value="plumbing">Plumbing</SelectItem>
                      <SelectItem value="electrical">Electrical</SelectItem>
                      <SelectItem value="hvac">HVAC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="address">Business Address</Label>
                <Textarea
                  id="address"
                  value={companySettings.address}
                  onChange={(e) => setCompanySettings(prev => ({ ...prev, address: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={companySettings.phone}
                    onChange={(e) => setCompanySettings(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={companySettings.email}
                    onChange={(e) => setCompanySettings(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>

              <Button onClick={() => handleSave('Company Information')}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Management */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Access & Permissions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Allow User Registration</Label>
                  <p className="text-sm text-muted-foreground">Allow new users to register accounts</p>
                </div>
                <Switch 
                  checked={userManagement.allowRegistration}
                  onCheckedChange={(checked) => setUserManagement(prev => ({ ...prev, allowRegistration: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Require Email Verification</Label>
                  <p className="text-sm text-muted-foreground">Users must verify email before accessing system</p>
                </div>
                <Switch 
                  checked={userManagement.requireEmailVerification}
                  onCheckedChange={(checked) => setUserManagement(prev => ({ ...prev, requireEmailVerification: checked }))}
                />
              </div>

              <div>
                <Label htmlFor="defaultRole">Default User Role</Label>
                <Select value={userManagement.defaultUserRole} onValueChange={(value) => setUserManagement(prev => ({ ...prev, defaultUserRole: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employee">Employee</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={() => handleSave('User Management')}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Require 2FA for all user accounts</p>
                </div>
                <Switch 
                  checked={securitySettings.twoFactorAuth}
                  onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, twoFactorAuth: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Password Complexity</Label>
                  <p className="text-sm text-muted-foreground">Enforce strong password requirements</p>
                </div>
                <Switch 
                  checked={securitySettings.passwordComplexity}
                  onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, passwordComplexity: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Audit Logging</Label>
                  <p className="text-sm text-muted-foreground">Log all user actions and system events</p>
                </div>
                <Switch 
                  checked={securitySettings.auditLogging}
                  onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, auditLogging: checked }))}
                />
              </div>

              <div>
                <Label htmlFor="ipWhitelist">IP Whitelist</Label>
                <Textarea
                  id="ipWhitelist"
                  placeholder="Enter IP addresses (one per line)"
                  value={securitySettings.ipWhitelist}
                  onChange={(e) => setSecuritySettings(prev => ({ ...prev, ipWhitelist: e.target.value }))}
                />
              </div>

              <Button onClick={() => handleSave('Security')}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations" className="space-y-6">
          <BusinessIntegrations />
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch 
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, emailNotifications: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                </div>
                <Switch 
                  checked={notificationSettings.smsNotifications}
                  onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, smsNotifications: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Job Updates</Label>
                  <p className="text-sm text-muted-foreground">Notifications for job status changes</p>
                </div>
                <Switch 
                  checked={notificationSettings.jobUpdates}
                  onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, jobUpdates: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Customer Messages</Label>
                  <p className="text-sm text-muted-foreground">Notifications for customer communications</p>
                </div>
                <Switch 
                  checked={notificationSettings.customerMessages}
                  onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, customerMessages: checked }))}
                />
              </div>

              <Button onClick={() => handleSave('Notifications')}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing */}
        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Billing & Subscription
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Current Plan</Label>
                <div className="mt-2">
                  <Badge variant="default" className="text-lg px-4 py-2">
                    Professional Plan - $99/month
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-Renewal</Label>
                  <p className="text-sm text-muted-foreground">Automatically renew subscription</p>
                </div>
                <Switch 
                  checked={billingSettings.autoRenew}
                  onCheckedChange={(checked) => setBillingSettings(prev => ({ ...prev, autoRenew: checked }))}
                />
              </div>

              <div>
                <Label htmlFor="invoiceEmail">Invoice Email</Label>
                <Input
                  id="invoiceEmail"
                  type="email"
                  value={billingSettings.invoiceEmail}
                  onChange={(e) => setBillingSettings(prev => ({ ...prev, invoiceEmail: e.target.value }))}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={() => handleSave('Billing')}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Invoice
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Settings */}
        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                API Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable API Access</Label>
                  <p className="text-sm text-muted-foreground">Allow external API access to your data</p>
                </div>
                <Switch 
                  checked={apiSettings.enableApi}
                  onCheckedChange={(checked) => setApiSettings(prev => ({ ...prev, enableApi: checked }))}
                />
              </div>

              <div>
                <Label htmlFor="apiKey">API Key</Label>
                <div className="flex gap-2">
                  <Input
                    id="apiKey"
                    type="password"
                    value={apiSettings.apiKey}
                    readOnly
                  />
                  <Button variant="outline" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="webhookUrl">Webhook URL</Label>
                <Input
                  id="webhookUrl"
                  value={apiSettings.webhookUrl}
                  onChange={(e) => setApiSettings(prev => ({ ...prev, webhookUrl: e.target.value }))}
                  placeholder="https://yoursite.com/webhook"
                />
              </div>

              <Button onClick={() => handleSave('API')}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Settings */}
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Advanced Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Automatic Database Backups</Label>
                  <p className="text-sm text-muted-foreground">Automatically backup database</p>
                </div>
                <Switch 
                  checked={advancedSettings.databaseBackups}
                  onCheckedChange={(checked) => setAdvancedSettings(prev => ({ ...prev, databaseBackups: checked }))}
                />
              </div>

              <div>
                <Label htmlFor="backupFreq">Backup Frequency</Label>
                <Select value={advancedSettings.autoBackupFrequency} onValueChange={(value) => setAdvancedSettings(prev => ({ ...prev, autoBackupFrequency: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Performance Monitoring</Label>
                  <p className="text-sm text-muted-foreground">Monitor system performance</p>
                </div>
                <Switch 
                  checked={advancedSettings.performanceMonitoring}
                  onCheckedChange={(checked) => setAdvancedSettings(prev => ({ ...prev, performanceMonitoring: checked }))}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={() => handleSave('Advanced')}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Export Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
