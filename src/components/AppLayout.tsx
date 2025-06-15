import { useState, useEffect } from 'react';
import { LucideIcon, Building, Users, FileText, Calendar, Settings, DollarSign, TrendingUp, Wrench, Map, CreditCard, Clock, Database, Bell, Palette, BarChart3, UserPlus, PieChart, Activity, Package, Truck, FileImage, MessageSquare, Star, AlertTriangle, CheckCircle, Target, Briefcase, Home, UserCheck, Hammer, Calculator } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dashboard } from "./Dashboard";
import { CompanySettings } from "./CompanySettings";
import { TeamManagement } from "./TeamManagement";
import { SubcontractorManagement } from "./SubcontractorManagement";
import { MapView } from "./MapView";
import { ClientAppointment } from "./ClientAppointment";
import { MegaMenuSidebar } from "./MegaMenuSidebar";
import { MobileSettings } from "./MobileSettings";
import { CustomerList } from "./CustomerList";
import { JobList } from "./JobList";
import { InvoiceList } from "./InvoiceList";
import { SchedulingDashboard } from "./SchedulingDashboard";
import { EstimateList } from "./EstimateList";
import { PhotoDocumentation } from "./PhotoDocumentation";
import { MobileFeaturesDashboard } from "./MobileFeaturesDashboard";
import { RealTimeChat } from "./RealTimeChat";
import { AdvancedInventorySystem } from "./AdvancedInventorySystem";
import { EquipmentManagement } from "./EquipmentManagement";
import { FinancialAnalyticsDashboard } from "./FinancialAnalyticsDashboard";
import { PaymentIntegrationHub } from "./PaymentIntegrationHub";
import { BranchManagement } from "./BranchManagement";
import { Pipeline } from "./Pipeline";
import { CustomerRegistrationForm } from "./CustomerRegistrationForm";
import { Communication } from "./Communication";
import { SafetyManagement } from "./SafetyManagement";
import { QualityControl as QualityControlComponent } from "./QualityControl";
import { AddJobSection } from "./AddJobSection";
import { TimeTracking } from "./TimeTracking";
import { AppHeader } from "./AppHeader";
import { ServicesManagement } from "./ServicesManagement";
import { ImportExportHub } from "./ImportExportHub";

interface SidebarSection {
  id: string;
  label: string;
  icon: LucideIcon;
}

const sections: SidebarSection[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'client-appointment', label: 'Client Appointment', icon: Calendar },
  { id: 'pipeline', label: 'Pipeline', icon: TrendingUp },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'jobs', label: 'Jobs', icon: Wrench },
  { id: 'customer-form', label: 'Add Customer', icon: UserPlus },
  { id: 'job-form', label: 'Add Job', icon: FileText },
  { id: 'estimates', label: 'Estimates', icon: FileText },
  { id: 'invoices', label: 'Invoices', icon: DollarSign },
  { id: 'schedule', label: 'Schedule', icon: Calendar },
  { id: 'expenses', label: 'Expenses', icon: CreditCard },
  { id: 'time-tracking', label: 'Time Tracking', icon: Clock },
  { id: 'inventory', label: 'Inventory', icon: Database },
  { id: 'equipment', label: 'Equipment', icon: Package },
  { id: 'vehicles', label: 'Vehicles', icon: Truck },
  { id: 'photos', label: 'Photos', icon: FileImage },
  { id: 'communication', label: 'Communication', icon: MessageSquare },
  { id: 'reviews', label: 'Reviews', icon: Star },
  { id: 'safety', label: 'Safety', icon: AlertTriangle },
  { id: 'quality', label: 'Quality Control', icon: CheckCircle },
  { id: 'goals', label: 'Goals & KPIs', icon: Target },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'analytics', label: 'Analytics', icon: PieChart },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'map-view', label: 'Map View', icon: Map },
  { id: 'team-management', label: 'Team Management', icon: UserCheck },
  { id: 'subcontractor-management', label: 'Subcontractor Management', icon: Hammer },
  { id: 'services', label: 'Services', icon: Briefcase },
  { id: 'import-export', label: 'Import/Export', icon: Activity },
  { id: 'resource-allocation', label: 'Resource Allocation', icon: Package },
  { id: 'mobile-settings', label: 'Mobile App', icon: Activity },
  { id: 'company-settings', label: 'Company Settings', icon: Building },
  { id: 'branch-management', label: 'Branch Management', icon: Building },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'team-chat', label: 'Team Chat', icon: MessageSquare },
  { id: 'advanced-inventory', label: 'Advanced Inventory', icon: Package },
  { id: 'financial-analytics', label: 'Financial Analytics', icon: TrendingUp },
  { id: 'payment-integration', label: 'Payment Hub', icon: CreditCard },
  { id: 'profit-analysis', label: 'Profit Analysis', icon: DollarSign },
  { id: 'predictive-analytics', label: 'Predictive Analytics', icon: Target },
  { id: 'advanced-reporting', label: 'Advanced Reports', icon: BarChart3 },
  { id: 'quickbooks-integration', label: 'QuickBooks', icon: Database },
  { id: 'accounting-integration', label: 'Accounting', icon: Calculator },
  { id: 'radius-assignment', label: 'Radius Assignment', icon: Map },
  { id: 'employee-locations', label: 'Employee Locations', icon: Users }
];

const jobsAndAppointments = [
  {
    id: '1',
    title: 'Kitchen Renovation',
    customer: 'John Smith',
    address: '123 Main St, Anytown, USA',
    coordinates: [-74.006, 40.7128] as [number, number],
    status: 'scheduled' as const,
    type: 'job' as const,
    time: 'Today 2:00 PM',
    scheduledDate: '2024-01-15',
    assignedTo: 'Mike Johnson'
  },
  {
    id: '2',
    title: 'Bathroom Repair',
    customer: 'ABC Construction',
    address: '456 Business Ave, City, USA',
    coordinates: [-74.0, 40.72] as [number, number],
    status: 'in-progress' as const,
    type: 'job' as const,
    time: 'Tomorrow 9:00 AM',
    scheduledDate: '2024-01-16',
    assignedTo: 'Sarah Davis'
  },
  {
    id: '3',
    title: 'Consultation Meeting',
    customer: 'Sarah Johnson',
    address: '789 Oak Street, Downtown, USA',
    coordinates: [-74.01, 40.715] as [number, number],
    status: 'scheduled' as const,
    type: 'appointment' as const,
    time: 'Friday 3:00 PM',
    scheduledDate: '2024-01-19',
    assignedTo: 'Tom Wilson'
  },
  {
    id: '4',
    title: 'Project Estimate',
    customer: 'Mike Wilson',
    address: '321 Pine Ave, Suburb, USA',
    coordinates: [-73.99, 40.725] as [number, number],
    status: 'completed' as const,
    type: 'appointment' as const,
    time: 'Yesterday 11:00 AM',
    scheduledDate: '2024-01-14',
    assignedTo: 'Lisa Chen'
  }
];

const SafetyManagementComponent = () => (
  <div className="p-6">
    <SafetyManagement />
  </div>
);

export const AppLayout = () => {
  const [activeSection, setActiveSection] = useState('client-appointment');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const savedCollapsedState = localStorage.getItem('sidebarCollapsed');
    if (savedCollapsedState) {
      setSidebarCollapsed(JSON.parse(savedCollapsedState));
    }
  }, []);

  const handleSidebarToggle = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(collapsed));
  };

  const handleCompanySettingsClick = () => {
    setActiveSection('company-settings');
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'client-appointment':
        return <ClientAppointment />;
      case 'mobile-settings':
        return <MobileFeaturesDashboard />;
      case 'pipeline':
        return <Pipeline />;
      case 'customers':
        return <CustomerList />;
      case 'jobs':
        return <JobList />;
      case 'customer-form':
        return <CustomerRegistrationForm />;
      case 'job-form':
        return <AddJobSection />;
      case 'estimates':
        return <EstimateList />;
      case 'invoices':
        return <InvoiceList />;
      case 'schedule':
        return <SchedulingDashboard />;
      case 'time-tracking':
        return <TimeTracking />;
      case 'photos':
        return (
          <div className="p-6">
            <PhotoDocumentation />
          </div>
        );
      case 'inventory':
        return (
          <div className="p-6">
            <AdvancedInventorySystem />
          </div>
        );
      case 'equipment':
        return (
          <div className="p-6">
            <EquipmentManagement />
          </div>
        );
      case 'safety':
        return <SafetyManagementComponent />;
      case 'quality':
        return (
          <div className="p-6">
            <QualityControlComponent />
          </div>
        );
      case 'goals':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Goals & KPIs</h2>
            <Card>
              <CardContent className="p-6">
                <p>Key performance indicators and goals tracking will be implemented here.</p>
              </CardContent>
            </Card>
          </div>
        );
      case 'reports':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Reports</h2>
            <Card>
              <CardContent className="p-6">
                <p>Reporting and analytics system will be implemented here.</p>
              </CardContent>
            </Card>
          </div>
        );
      case 'analytics':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Advanced Analytics</h2>
            <Card>
              <CardContent className="p-6">
                <p>Advanced analytics and insights will be implemented here.</p>
              </CardContent>
            </Card>
          </div>
        );
      case 'notifications':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Notifications</h2>
            <Card>
              <CardContent className="p-6">
                <p>Notification management center will be implemented here.</p>
              </CardContent>
            </Card>
          </div>
        );
      case 'map-view':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Map View</h2>
            <MapView jobs={jobsAndAppointments} />
          </div>
        );
      case 'company-settings':
        return <CompanySettings />;
      case 'branch-management':
        return <BranchManagement />;
      case 'team-management':
        return <TeamManagement />;
      case 'subcontractor-management':
        return <SubcontractorManagement />;
      case 'services':
        return <ServicesManagement />;
      case 'import-export':
        return <ImportExportHub />;
      case 'settings':
        return (
          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Settings</h2>
              <p className="text-muted-foreground mb-6">Manage your application settings and integrations</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">General Settings</h3>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Configure general application preferences</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Custom Integrations</h3>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-card">
                    <h4 className="font-medium mb-2">QuickBooks Integration</h4>
                    <p className="text-sm text-muted-foreground mb-3">Connect with QuickBooks for accounting sync</p>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                      Configure QuickBooks
                    </button>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-card">
                    <h4 className="font-medium mb-2">Zapier Integration</h4>
                    <p className="text-sm text-muted-foreground mb-3">Automate workflows with 5000+ apps</p>
                    <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
                      Setup Zapier
                    </button>
                  </div>

                  <div className="p-4 border rounded-lg bg-card">
                    <h4 className="font-medium mb-2">Stripe Payment Processing</h4>
                    <p className="text-sm text-muted-foreground mb-3">Accept online payments from customers</p>
                    <button className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors">
                      Connect Stripe
                    </button>
                  </div>

                  <div className="p-4 border rounded-lg bg-card">
                    <h4 className="font-medium mb-2">Email Marketing</h4>
                    <p className="text-sm text-muted-foreground mb-3">Connect with Mailchimp or Constant Contact</p>
                    <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
                      Setup Email Marketing
                    </button>
                  </div>

                  <div className="p-4 border rounded-lg bg-card">
                    <h4 className="font-medium mb-2">Custom API Integration</h4>
                    <p className="text-sm text-muted-foreground mb-3">Connect with your custom systems via API</p>
                    <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors">
                      Add Custom API
                    </button>
                  </div>

                  <div className="p-4 border rounded-lg bg-card">
                    <h4 className="font-medium mb-2">Map Settings</h4>
                    <p className="text-sm text-muted-foreground mb-3">Configure map display and location settings</p>
                    <button className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors">
                      Configure Maps
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'team-chat':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Team Chat</h2>
            <Card>
              <CardContent className="p-6">
                <p>Real-time chat and collaboration tools for team members.</p>
              </CardContent>
            </Card>
          </div>
        );
      case 'advanced-inventory':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Advanced Inventory</h2>
            <Card>
              <CardContent className="p-6">
                <p>Advanced inventory management system with detailed tracking.</p>
              </CardContent>
            </Card>
          </div>
        );
      case 'financial-analytics':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Financial Analytics</h2>
            <Card>
              <CardContent className="p-6">
                <p>Financial analytics and reporting dashboard.</p>
              </CardContent>
            </Card>
          </div>
        );
      case 'payment-integration':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Payment Hub</h2>
            <Card>
              <CardContent className="p-6">
                <p>Centralized payment integration and management.</p>
              </CardContent>
            </Card>
          </div>
        );
      case 'profit-analysis':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Profit Analysis</h2>
            <Card>
              <CardContent className="p-6">
                <p>Profit margin and financial performance analysis will be implemented here.</p>
              </CardContent>
            </Card>
          </div>
        );
      case 'predictive-analytics':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Predictive Analytics</h2>
            <Card>
              <CardContent className="p-6">
                <p>Predictive analytics and forecasting system will be implemented here.</p>
              </CardContent>
            </Card>
          </div>
        );
      case 'advanced-reporting':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Advanced Reports</h2>
            <Card>
              <CardContent className="p-6">
                <p>Advanced reporting and visualization system will be implemented here.</p>
              </CardContent>
            </Card>
          </div>
        );
      case 'quickbooks-integration':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">QuickBooks</h2>
            <Card>
              <CardContent className="p-6">
                <p>QuickBooks integration and accounting system will be implemented here.</p>
              </CardContent>
            </Card>
          </div>
        );
      case 'accounting-integration':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Accounting</h2>
            <Card>
              <CardContent className="p-6">
                <p>Accounting and financial management system will be implemented here.</p>
              </CardContent>
            </Card>
          </div>
        );
      case 'radius-assignment':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Radius Assignment</h2>
            <Card>
              <CardContent className="p-6">
                <p>Radius assignment and location management system will be implemented here.</p>
              </CardContent>
            </Card>
          </div>
        );
      case 'employee-locations':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Employee Locations</h2>
            <Card>
              <CardContent className="p-6">
                <p>Employee location tracking and management system will be implemented here.</p>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return (
          <div className="p-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold mb-4 colorful-text">
                {sections.find(s => s.id === activeSection)?.label || 'Section'}
              </h2>
              <div className="max-w-md mx-auto">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4">
                      This section is ready for implementation. The navigation system is working correctly.
                    </p>
                    <Badge variant="outline">Coming Soon</Badge>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );
    }
  };

  const sidebarWidth = sidebarCollapsed ? 80 : 320;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader onCompanySettingsClick={handleCompanySettingsClick} />
      
      <div className="flex flex-1">
        <MegaMenuSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          sections={sections}
          isVisible={true}
          collapsed={sidebarCollapsed}
          onToggleCollapse={handleSidebarToggle}
        />

        <main className="flex-1 transition-all duration-300" style={{ marginLeft: `${sidebarWidth}px` }}>
          {renderSection()}
        </main>
      </div>
    </div>
  );
};
