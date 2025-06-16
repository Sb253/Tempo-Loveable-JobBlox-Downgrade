import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, FileText, Database, Shield, Users, Building, Palette, Zap } from "lucide-react";
import { TemplateEditor } from "./TemplateEditor";
import { BusinessIntegrations } from "./BusinessIntegrations";

export const BackOfficeSettings = () => {
  const [activeTab, setActiveTab] = useState('templates');

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Settings className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Back Office Settings</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="company">Company Settings</TabsTrigger>
          <TabsTrigger value="themes">Themes</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          <TemplateEditor />
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Business Tool Integrations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BusinessIntegrations />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Database Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Data Backup</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Configure automatic backups and data retention policies.
                  </p>
                  <Button variant="outline">Configure Backup</Button>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Data Import/Export</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Import data from other systems or export for backup.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline">Import Data</Button>
                    <Button variant="outline">Export Data</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Access Control</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Manage user permissions and role-based access.
                  </p>
                  <Button variant="outline">Manage Permissions</Button>
                </div>
                <div>
                  <h3 className="font-medium mb-2">API Keys</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Manage API keys for integrations and external services.
                  </p>
                  <Button variant="outline">Manage API Keys</Button>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Audit Logs</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    View system access logs and user activity.
                  </p>
                  <Button variant="outline">View Logs</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Team Members</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Add, remove, and manage team member accounts.
                  </p>
                  <Button variant="outline">Manage Team</Button>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Roles & Permissions</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Define custom roles and permission levels.
                  </p>
                  <Button variant="outline">Configure Roles</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="company" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Company Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Business Information</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Update company details, logo, and contact information.
                  </p>
                  <Button variant="outline">Edit Company Info</Button>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Branch Management</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Manage multiple business locations and branches.
                  </p>
                  <Button variant="outline">Manage Branches</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="themes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Theme Customization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Color Schemes</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Customize the application color scheme and branding.
                  </p>
                  <Button variant="outline">Customize Colors</Button>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Layout Settings</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Configure dashboard layout and component arrangement.
                  </p>
                  <Button variant="outline">Layout Settings</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">System Maintenance</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Perform system maintenance tasks and updates.
                  </p>
                  <Button variant="outline">System Maintenance</Button>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Performance Monitoring</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Monitor system performance and resource usage.
                  </p>
                  <Button variant="outline">View Performance</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
