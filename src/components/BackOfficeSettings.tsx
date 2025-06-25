import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Settings,
  FileText,
  Database,
  Shield,
  Users,
  Building,
  Palette,
  Zap,
  Brain,
  BarChart3,
  MessageSquare,
  Target,
  PieChart,
  Map,
  Calculator,
  Activity,
  ChevronRight,
} from "lucide-react";
import { TemplateEditor } from "./TemplateEditor";
import { BusinessIntegrations } from "./BusinessIntegrations";

interface BackOfficeSettingsProps {
  onSectionChange?: (section: string) => void;
}

export const BackOfficeSettings = ({
  onSectionChange,
}: BackOfficeSettingsProps) => {
  const [activeTab, setActiveTab] = useState("ai-automation");

  const handleSectionNavigation = (sectionId: string) => {
    if (onSectionChange) {
      onSectionChange(sectionId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Settings className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Back Office Administration</h1>
            <p className="text-muted-foreground">
              Advanced features and system administration
            </p>
          </div>
        </div>
        <Badge variant="secondary" className="flex items-center gap-1">
          <Shield className="h-3 w-3" />
          Admin Access
        </Badge>
      </div>

      <Separator />

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4 h-12">
          <TabsTrigger
            value="ai-automation"
            className="flex items-center gap-2"
          >
            <Brain className="h-4 w-4" />
            AI & Automation
          </TabsTrigger>
          <TabsTrigger
            value="reports-analytics"
            className="flex items-center gap-2"
          >
            <BarChart3 className="h-4 w-4" />
            Reports & Analytics
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="system-admin" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            System Admin
          </TabsTrigger>
        </TabsList>

        {/* AI & Automation Hub */}
        <TabsContent value="ai-automation" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleSectionNavigation("ai-chat")}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-500" />
                  AI Chat Assistant
                  <ChevronRight className="h-4 w-4 ml-auto" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Intelligent chat assistant for customer service and internal
                  support.
                </p>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() =>
                handleSectionNavigation("smart-document-generator")
              }
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-500" />
                  Smart Document Generator
                  <ChevronRight className="h-4 w-4 ml-auto" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  AI-powered document creation for estimates, invoices, and
                  contracts.
                </p>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleSectionNavigation("predictive-analytics")}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-500" />
                  Predictive Analytics
                  <ChevronRight className="h-4 w-4 ml-auto" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Advanced forecasting and business intelligence insights.
                </p>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleSectionNavigation("ai-settings")}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-orange-500" />
                  AI Configuration
                  <ChevronRight className="h-4 w-4 ml-auto" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Configure AI models, training data, and automation rules.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Reports & Analytics Center */}
        <TabsContent value="reports-analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleSectionNavigation("reports")}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-500" />
                  Business Reports
                  <ChevronRight className="h-4 w-4 ml-auto" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Comprehensive business reporting and performance metrics.
                </p>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleSectionNavigation("analytics")}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-green-500" />
                  Advanced Analytics
                  <ChevronRight className="h-4 w-4 ml-auto" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Deep dive analytics with custom dashboards and KPIs.
                </p>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleSectionNavigation("map-view")}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Map className="h-5 w-5 text-purple-500" />
                  Geographic Analytics
                  <ChevronRight className="h-4 w-4 ml-auto" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Location-based insights and territory management.
                </p>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleSectionNavigation("advanced-reporting")}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-orange-500" />
                  Custom Reports
                  <ChevronRight className="h-4 w-4 ml-auto" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Build custom reports with advanced filtering and export
                  options.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Integrations Manager */}
        <TabsContent value="integrations" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleSectionNavigation("quickbooks-integration")}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-500" />
                  QuickBooks Integration
                  <ChevronRight className="h-4 w-4 ml-auto" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Sync financial data with QuickBooks for seamless accounting.
                </p>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleSectionNavigation("accounting-integration")}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-green-500" />
                  Accounting Systems
                  <ChevronRight className="h-4 w-4 ml-auto" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Connect with various accounting platforms and ERP systems.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-purple-500" />
                  API Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Manage API keys, webhooks, and third-party connections.
                  </p>
                  <Button variant="outline" size="sm">
                    Configure APIs
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-orange-500" />
                  Business Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BusinessIntegrations />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* System Administration */}
        <TabsContent value="system-admin" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleSectionNavigation("company-settings")}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-blue-500" />
                  Company Settings
                  <ChevronRight className="h-4 w-4 ml-auto" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Configure company information, branding, and business details.
                </p>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleSectionNavigation("mobile-settings")}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-green-500" />
                  Mobile App Settings
                  <ChevronRight className="h-4 w-4 ml-auto" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Configure mobile app features and field team settings.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-500" />
                  User Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Manage team members, roles, and permissions.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Manage Users
                    </Button>
                    <Button variant="outline" size="sm">
                      Configure Roles
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-orange-500" />
                  Security & Access
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Security settings, access control, and audit logs.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Security Settings
                    </Button>
                    <Button variant="outline" size="sm">
                      View Logs
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-red-500" />
                  Data Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Database backup, import/export, and data maintenance.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Backup Data
                    </Button>
                    <Button variant="outline" size="sm">
                      Import/Export
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-pink-500" />
                  Theme & Branding
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Customize colors, themes, and application branding.
                  </p>
                  <Button variant="outline" size="sm">
                    Customize Theme
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Legacy Template Editor */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Document Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TemplateEditor />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
