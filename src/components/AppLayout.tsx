import { useState, useEffect } from 'react';
import { LucideIcon, Building, Users, FileText, Calendar, Settings, DollarSign, TrendingUp, Wrench, Map, CreditCard, Clock, Database, Bell, Palette, BarChart3, UserPlus, PieChart, Activity, Package, Truck, FileImage, MessageSquare, Star, AlertTriangle, CheckCircle, Target, Briefcase, Home, UserCheck, Hammer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dashboard } from "./Dashboard";
import { CustomWidgetList } from "./CustomWidgetList";
import { CustomCardList } from "./CustomCardList";
import { CompanySettings } from "./CompanySettings";
import { NavigationSettings } from "./NavigationSettings";
import { TeamManagement } from "./TeamManagement";
import { SubcontractorManagement } from "./SubcontractorManagement";
import { MapView } from "./MapView";
import { ClientAppointment } from "./ClientAppointment";
import { Sidebar } from "./Sidebar";
import { MobileSettings } from "./MobileSettings";

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
  { id: 'mobile-settings', label: 'Mobile App', icon: Activity },
  { id: 'widgets', label: 'Dashboard Widgets', icon: Palette },
  { id: 'cards', label: 'Dashboard Cards', icon: Activity },
  { id: 'company-settings', label: 'Company Settings', icon: Building },
  { id: 'settings', label: 'Settings', icon: Settings }
];

// Sample job data with appointments and jobs
const jobsAndAppointments = [
  {
    id: '1',
    title: 'Kitchen Renovation',
    customer: 'John Smith',
    address: '123 Main St, Anytown, USA',
    coordinates: [-74.006, 40.7128] as [number, number],
    status: 'scheduled' as const,
    type: 'job' as const,
    time: 'Today 2:00 PM'
  },
  {
    id: '2',
    title: 'Bathroom Repair',
    customer: 'ABC Construction',
    address: '456 Business Ave, City, USA',
    coordinates: [-74.0, 40.72] as [number, number],
    status: 'in-progress' as const,
    type: 'job' as const,
    time: 'Tomorrow 9:00 AM'
  },
  {
    id: '3',
    title: 'Consultation Meeting',
    customer: 'Sarah Johnson',
    address: '789 Oak Street, Downtown, USA',
    coordinates: [-74.01, 40.715] as [number, number],
    status: 'scheduled' as const,
    type: 'appointment' as const,
    time: 'Friday 3:00 PM'
  },
  {
    id: '4',
    title: 'Project Estimate',
    customer: 'Mike Wilson',
    address: '321 Pine Ave, Suburb, USA',
    coordinates: [-73.99, 40.725] as [number, number],
    status: 'completed' as const,
    type: 'appointment' as const,
    time: 'Yesterday 11:00 AM'
  }
];

export const AppLayout = () => {
  const [activeSection, setActiveSection] = useState('client-appointment');
  const [showNavigationSettings, setShowNavigationSettings] = useState(false);

  const handleNavigationSettings = () => {
    setShowNavigationSettings(true);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'client-appointment':
        return <ClientAppointment />;
      case 'mobile-settings':
        return <MobileSettings />;
      case 'pipeline':
        return <Pipeline />;
      case 'customers':
        return <CustomerList />;
      case 'jobs':
        return <JobList />;
      case 'customer-form':
        return <CustomerForm />;
      case 'job-form':
        return <JobForm />;
      case 'estimates':
        return <EstimateList />;
      case 'invoices':
        return <InvoiceList />;
      case 'schedule':
        return <ScheduleView />;
      case 'expenses':
        return <ExpenseList />;
      case 'time-tracking':
        return <TimeTracking />;
      case 'inventory':
        return <MaterialInventory />;
      case 'equipment':
        return <EquipmentTracking />;
      case 'vehicles':
        return <VehicleManagement />;
      case 'photos':
        return <PhotoDocumentation />;
      case 'communication':
        return <EmployeeChat />;
      case 'reviews':
        return <ReviewManagement />;
      case 'safety':
        return <SaftyManagement />;
      case 'quality':
        return <QualityControl />;
      case 'goals':
        return <KPIDashboard />;
      case 'reports':
        return <ReportsView />;
      case 'analytics':
        return <AdvancedAnalytics />;
      case 'notifications':
        return <NotificationCenter />;
      case 'map-view':
        return <MapViewPage />;
      case 'widgets':
        return <CustomWidgetList />;
      case 'cards':
        return <CustomCardList />;
      case 'company-settings':
        return <CompanySettings />;
      case 'team-management':
        return <TeamManagement />;
      case 'subcontractor-management':
        return <SubcontractorManagement />;
      case 'settings':
        return <SettingsView />;
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

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        sections={sections}
        isVisible={true}
      />

      <main className="flex-1 ml-64">
        {renderSection()}
      </main>

      <NavigationSettings
        open={showNavigationSettings}
        onOpenChange={setShowNavigationSettings}
        currentLayout="sidebar"
        onLayoutChange={() => {}}
      />
    </div>
  );
};

// Placeholder components for missing sections
const Pipeline = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Sales Pipeline</h2>
    <Card>
      <CardContent className="p-6">
        <p>Sales pipeline and lead management system will be implemented here.</p>
      </CardContent>
    </Card>
  </div>
);

const CustomerList = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Customer Management</h2>
    <Card>
      <CardContent className="p-6">
        <p>Customer list and management interface will be implemented here.</p>
      </CardContent>
    </Card>
  </div>
);

const JobList = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Job Management</h2>
    <Card>
      <CardContent className="p-6">
        <p>Job list and tracking system will be implemented here.</p>
      </CardContent>
    </Card>
  </div>
);

const CustomerForm = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Add New Customer</h2>
    <Card>
      <CardContent className="p-6">
        <p>Customer registration form will be implemented here.</p>
      </CardContent>
    </Card>
  </div>
);

const JobForm = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Create New Job</h2>
    <Card>
      <CardContent className="p-6">
        <p>Job creation form will be implemented here.</p>
      </CardContent>
    </Card>
  </div>
);

const EstimateList = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Estimates</h2>
    <Card>
      <CardContent className="p-6">
        <p>Estimate management system will be implemented here.</p>
      </CardContent>
    </Card>
  </div>
);

const InvoiceList = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Invoices</h2>
    <Card>
      <CardContent className="p-6">
        <p>Invoice management system will be implemented here.</p>
      </CardContent>
    </Card>
  </div>
);

const ScheduleView = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Schedule</h2>
    <Card>
      <CardContent className="p-6">
        <p>Calendar and scheduling system will be implemented here.</p>
      </CardContent>
    </Card>
  </div>
);

const ExpenseList = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Expenses</h2>
    <Card>
      <CardContent className="p-6">
        <p>Expense tracking system will be implemented here.</p>
      </CardContent>
    </Card>
  </div>
);

const TimeTracking = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Time Tracking</h2>
    <Card>
      <CardContent className="p-6">
        <p>Time tracking and reporting system will be implemented here.</p>
      </CardContent>
    </Card>
  </div>
);

const MaterialInventory = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Material Inventory</h2>
    <Card>
      <CardContent className="p-6">
        <p>Inventory management system will be implemented here.</p>
      </CardContent>
    </Card>
  </div>
);

const EquipmentTracking = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Equipment Tracking</h2>
    <Card>
      <CardContent className="p-6">
        <p>Equipment management and tracking system will be implemented here.</p>
      </CardContent>
    </Card>
  </div>
);

const PhotoDocumentation = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Photo Documentation</h2>
    <Card>
      <CardContent className="p-6">
        <p>Photo management and documentation system will be implemented here.</p>
      </CardContent>
    </Card>
  </div>
);

const EmployeeChat = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Employee Communication</h2>
    <Card>
      <CardContent className="p-6">
        <p>Internal communication and messaging system will be implemented here.</p>
      </CardContent>
    </Card>
  </div>
);

const ReviewManagement = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Review Management</h2>
    <Card>
      <CardContent className="p-6">
        <p>Customer review management system will be implemented here.</p>
      </CardContent>
    </Card>
  </div>
);

const KPIDashboard = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">KPI Dashboard</h2>
    <Card>
      <CardContent className="p-6">
        <p>Key performance indicators and goals tracking will be implemented here.</p>
      </CardContent>
    </Card>
  </div>
);

const ReportsView = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Reports</h2>
    <Card>
      <CardContent className="p-6">
        <p>Reporting and analytics system will be implemented here.</p>
      </CardContent>
    </Card>
  </div>
);

const AdvancedAnalytics = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Advanced Analytics</h2>
    <Card>
      <CardContent className="p-6">
        <p>Advanced analytics and insights will be implemented here.</p>
      </CardContent>
    </Card>
  </div>
);

const NotificationCenter = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Notifications</h2>
    <Card>
      <CardContent className="p-6">
        <p>Notification management center will be implemented here.</p>
      </CardContent>
    </Card>
  </div>
);

const VehicleManagement = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Vehicle Management</h2>
    <Card>
      <CardContent className="p-6">
        <p>Vehicle tracking and management system will be implemented here.</p>
      </CardContent>
    </Card>
  </div>
);

const SaftyManagement = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Safety Management</h2>
    <Card>
      <CardContent className="p-6">
        <p>Safety protocols and incident management system.</p>
      </CardContent>
    </Card>
  </div>
);

const QualityControl = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Quality Control</h2>
    <Card>
      <CardContent className="p-6">
        <p>Quality control checklists and inspection management.</p>
      </CardContent>
    </Card>
  </div>
);

const MapViewPage = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Map View</h2>
    <MapView jobs={jobsAndAppointments} />
  </div>
);

const SettingsView = () => {
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
};
