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
  FileText,
  GripVertical,
  ChevronDown,
  ChevronUp,
  Zap,
  MessageSquare,
  Star,
  FolderOpen,
  Camera,
  Map,
  Calendar,
  Phone,
  FileCheck
} from "lucide-react";

interface IntegrationItem {
  id: string;
  name: string;
  description: string;
  icon: any;
  connected: boolean;
}

interface IntegrationCategory {
  id: string;
  title: string;
  icon: any;
  items: IntegrationItem[];
  order: number;
}

export const BackendSettings = () => {
  const { currentRole, permissions, changeRole } = useRolePermissions();

  const [integrationCategories, setIntegrationCategories] = useState<IntegrationCategory[]>([
    {
      id: 'sales-crm-lead',
      title: 'Sales, CRM & Lead Management',
      icon: Users,
      order: 1,
      items: [
        { id: 'salesrabbit', name: 'SalesRabbit', description: 'Door-to-door sales management platform', icon: Users, connected: false },
        { id: 'thumbtack', name: 'Thumbtack', description: 'Professional services marketplace', icon: Star, connected: false },
        { id: 'hover', name: 'Hover', description: '3D home exterior measurements', icon: Camera, connected: false },
        { id: 'roofr', name: 'Roofr', description: 'Roofing sales and proposal platform', icon: Building2, connected: false },
        { id: 'angi', name: 'Angi', description: 'Home services marketplace', icon: Star, connected: false },
        { id: 'hubspot', name: 'HubSpot', description: 'CRM and marketing automation', icon: Database, connected: false },
        { id: 'mailchimp', name: 'Mailchimp', description: 'Email marketing platform', icon: Mail, connected: false },
        { id: 'facebook-leads', name: 'Facebook Lead Ads', description: 'Social media lead generation', icon: Users, connected: false },
        { id: 'forms', name: 'Form Builders', description: 'Jotform, Gravity Forms, WPForms, Google Forms, etc.', icon: FileText, connected: false },
        { id: 'calendly', name: 'Calendly', description: 'Appointment scheduling platform', icon: Calendar, connected: false }
      ]
    },
    {
      id: 'project-field',
      title: 'Project & Field Management',
      icon: Camera,
      order: 2,
      items: [
        { id: 'companycam', name: 'CompanyCam', description: 'Photo documentation and project tracking', icon: Camera, connected: false },
        { id: 'eagleview', name: 'EagleView', description: 'Aerial imagery and measurements', icon: Map, connected: false },
        { id: 'photo-id', name: 'PHOTO iD by U Scope', description: 'Roofing photo documentation', icon: Camera, connected: false },
        { id: 'beacon-pro', name: 'Beacon PRO+', description: 'Building materials platform', icon: Package, connected: false },
        { id: 'qxo', name: 'QXO (formerly Beacon)', description: 'Building materials distribution', icon: Package, connected: false },
        { id: 'roof-hub', name: 'Roof Hub by SRS Distribution', description: 'Roofing materials and tools', icon: Building2, connected: false },
        { id: 'roofle', name: 'Roofle', description: 'Roofing project management', icon: Building2, connected: false },
        { id: 'google-calendar', name: 'Google Calendar', description: 'Calendar and scheduling integration', icon: Calendar, connected: false },
        { id: 'google-maps', name: 'Google Maps', description: 'Location and mapping services', icon: Map, connected: false }
      ]
    },
    {
      id: 'communication-reviews',
      title: 'Communication & Reviews',
      icon: MessageSquare,
      order: 3,
      items: [
        { id: 'gmail', name: 'Gmail', description: 'Email communication platform', icon: Mail, connected: false },
        { id: 'microsoft-outlook', name: 'Microsoft Outlook', description: 'Email and calendar platform', icon: Mail, connected: false },
        { id: 'openphone', name: 'OpenPhone', description: 'Business phone system', icon: Phone, connected: false }
      ]
    },
    {
      id: 'document-storage',
      title: 'Document Management & Storage',
      icon: FolderOpen,
      order: 4,
      items: [
        { id: 'dropbox', name: 'Dropbox', description: 'Cloud storage and file sharing', icon: FolderOpen, connected: false },
        { id: 'google-drive', name: 'Google Drive', description: 'Cloud storage and collaboration', icon: FolderOpen, connected: false },
        { id: 'docusign', name: 'DocuSign', description: 'Digital signature platform', icon: FileCheck, connected: false }
      ]
    },
    {
      id: 'automation',
      title: 'Automation Platforms',
      icon: Zap,
      order: 5,
      items: [
        { id: 'zapier', name: 'Zapier', description: 'Workflow automation platform', icon: Zap, connected: false },
        { id: 'leadsbridge', name: 'LeadsBridge', description: 'Lead data synchronization', icon: Users, connected: false }
      ]
    },
    {
      id: 'miscellaneous',
      title: 'Other / Miscellaneous',
      icon: Settings,
      order: 6,
      items: [
        { id: 'hailtrace', name: 'HailTrace', description: 'Hail damage tracking and reports', icon: Database, connected: false },
        { id: 'mysalesman', name: 'mySalesman', description: 'Sales management platform', icon: Users, connected: false },
        { id: 'xero', name: 'Xero', description: 'Accounting and bookkeeping', icon: Calculator, connected: false },
        { id: 'google-lsa', name: 'Google Local Services Ads', description: 'Local advertising platform', icon: Star, connected: false },
        { id: 'google-contacts', name: 'Google Contacts', description: 'Contact management', icon: Users, connected: false }
      ]
    }
  ]);

  const moveCategory = (fromIndex: number, toIndex: number) => {
    const updatedCategories = [...integrationCategories];
    const [movedCategory] = updatedCategories.splice(fromIndex, 1);
    updatedCategories.splice(toIndex, 0, movedCategory);
    
    // Update order numbers
    updatedCategories.forEach((category, index) => {
      category.order = index + 1;
    });
    
    setIntegrationCategories(updatedCategories);
  };

  const toggleConnection = (categoryId: string, itemId: string) => {
    setIntegrationCategories(prev =>
      prev.map(category =>
        category.id === categoryId
          ? {
              ...category,
              items: category.items.map(item =>
                item.id === itemId ? { ...item, connected: !item.connected } : item
              )
            }
          : category
      )
    );
  };

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
              Available Integrations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-6">
              Drag and drop to reorder integration categories. Click to configure individual integrations.
            </p>
            
            <div className="space-y-4">
              {integrationCategories
                .sort((a, b) => a.order - b.order)
                .map((category, categoryIndex) => {
                  const CategoryIcon = category.icon;
                  
                  return (
                    <Card key={category.id} className="border-2 border-dashed border-muted hover:border-border transition-colors">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <div 
                              className="cursor-grab active:cursor-grabbing flex items-center gap-2"
                              draggable
                              onDragStart={(e) => {
                                e.dataTransfer.setData('text/plain', categoryIndex.toString());
                              }}
                              onDragOver={(e) => e.preventDefault()}
                              onDrop={(e) => {
                                e.preventDefault();
                                const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
                                if (fromIndex !== categoryIndex) {
                                  moveCategory(fromIndex, categoryIndex);
                                }
                              }}
                            >
                              <GripVertical className="h-4 w-4 text-muted-foreground" />
                              <CategoryIcon className="h-5 w-5" />
                              {category.title}
                            </div>
                          </CardTitle>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => moveCategory(categoryIndex, Math.max(0, categoryIndex - 1))}
                              disabled={categoryIndex === 0}
                            >
                              <ChevronUp className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => moveCategory(categoryIndex, Math.min(integrationCategories.length - 1, categoryIndex + 1))}
                              disabled={categoryIndex === integrationCategories.length - 1}
                            >
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {category.items.map((item) => {
                            const ItemIcon = item.icon;
                            return (
                              <div
                                key={item.id}
                                className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                              >
                                <div className="flex items-center gap-3 min-w-0 flex-1">
                                  <ItemIcon className="h-4 w-4 flex-shrink-0" />
                                  <div className="min-w-0 flex-1">
                                    <p className="font-medium text-sm truncate">{item.name}</p>
                                    <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                                  </div>
                                </div>
                                <Switch
                                  checked={item.connected}
                                  onCheckedChange={() => toggleConnection(category.id, item.id)}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <Button className="w-full">Save Integration Settings</Button>
            </div>
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
      
      <Tabs defaultValue="integrations" className="w-full">
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
