
import { useState, useEffect } from 'react';
import { LucideIcon, Building, Users, FileText, Calendar, Settings, DollarSign, TrendingUp, Wrench, Map, CreditCard, Clock, Database, Bell, Palette, BarChart3, UserPlus, PieChart, Activity, Package, Truck, FileImage, MessageSquare, Star, AlertTriangle, CheckCircle, Target, Briefcase, Home, UserCheck, Hammer, Calculator, Receipt, UserCog, Brain } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AppHeader } from "./AppHeader";
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
import { FinancialAnalyticsDashboard } from "./FinancialAnalyticsDashboard";
import { PaymentIntegrationHub } from "./PaymentIntegrationHub";
import { BranchManagement } from "./BranchManagement";
import { RadiusAssignment } from "./RadiusAssignment";
import { EmployeeLocationManager } from "./EmployeeLocationManager";
import { Pipeline } from "./Pipeline";
import { CustomerRegistrationForm } from "./CustomerRegistrationForm";
import { HRFeatures } from "./HRFeatures";
import { MaterialsAndServices } from "./MaterialsAndServices";
import { TaxAndFinancialSection } from "./TaxAndFinancialSection";
import { BackOfficeSettings } from "./BackOfficeSettings";
import { KPIDashboard } from "./KPIDashboard";
import { MaterialInventory } from "./MaterialInventory";
import { ReviewManagement } from "./ReviewManagement";
import { JobForm } from "./JobForm";
import { ExpenseForm } from "./ExpenseForm";
import { ExpenseList } from "./ExpenseList";
import { TimeTracking } from "./TimeTracking";
import { EquipmentTracking } from "./EquipmentTracking";
import { VehicleManagement } from "./VehicleManagement";
import { SafetyManagement } from "./SafetyManagement";
import { QualityControl } from "./QualityControl";
import { ReportsView } from "./ReportsView";
import { NotificationCenter } from "./NotificationCenter";

interface SidebarSection {
  id: string;
  label: string;
  icon: LucideIcon;
}

const sections: SidebarSection[] = [
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
  { id: 'materials-services', label: 'Materials & Services', icon: Package },
  { id: 'inventory', label: 'Inventory', icon: Package },
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
  { id: 'tax-financial', label: 'Tax & Financial', icon: Receipt },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'map-view', label: 'Map View', icon: Map },
  { id: 'team-management', label: 'Team Management', icon: UserCheck },
  { id: 'hr-features', label: 'HR Features', icon: UserCog },
  { id: 'subcontractor-management', label: 'Subcontractor Management', icon: Hammer },
  { id: 'mobile-settings', label: 'Mobile App', icon: Activity },
  { id: 'company-settings', label: 'Company Settings', icon: Building },
  { id: 'branch-management', label: 'Branch Management', icon: Building },
  { id: 'back-office', label: 'Back Office Settings', icon: Settings },
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
  const [activeSection, setActiveSection] = useState('home');
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

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
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
        return <JobForm onClose={() => setActiveSection('jobs')} />;
      case 'estimates':
        return <EstimateList />;
      case 'invoices':
        return <InvoiceList />;
      case 'schedule':
        return <SchedulingDashboard />;
      case 'expenses':
        return <ExpenseList />;
      case 'time-tracking':
        return <TimeTracking />;
      case 'materials-services':
        return <MaterialsAndServices />;
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
        return <SafetyManagement />;
      case 'quality':
        return <QualityControl />;
      case 'goals':
        return <KPIDashboard />;
      case 'reports':
        return <ReportsView />;
      case 'analytics':
        return <AdvancedAnalytics />;
      case 'tax-financial':
        return <TaxAndFinancialSection />;
      case 'notifications':
        return <NotificationCenter />;
      case 'map-view':
        return <MapViewPage />;
      case 'company-settings':
        return <CompanySettings />;
      case 'branch-management':
        return <BranchManagement />;
      case 'team-management':
        return <TeamManagement />;
      case 'hr-features':
        return <HRFeatures />;
      case 'subcontractor-management':
        return <SubcontractorManagement />;
      case 'back-office':
        return <BackOfficeSettings />;
      case 'team-chat':
        return <RealTimeChat />;
      case 'advanced-inventory':
        return <AdvancedInventorySystem />;
      case 'financial-analytics':
        return <FinancialAnalyticsDashboard />;
      case 'payment-integration':
        return <PaymentIntegrationHub />;
      case 'profit-analysis':
        return <ProfitMarginAnalysis />;
      case 'predictive-analytics':
        return <PredictiveAnalytics />;
      case 'advanced-reporting':
        return <AdvancedReporting />;
      case 'quickbooks-integration':
        return <QuickBooksIntegration />;
      case 'accounting-integration':
        return <AccountingIntegration />;
      case 'radius-assignment':
        return <RadiusAssignment />;
      case 'employee-locations':
        return <EmployeeLocationManager />;
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

  const sidebarWidth = sidebarCollapsed ? 64 : 256;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader onSectionChange={setActiveSection} />
      
      <div className="flex flex-1">
        <MegaMenuSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          sections={sections}
          isVisible={true}
          collapsed={sidebarCollapsed}
          onToggleCollapse={handleSidebarToggle}
        />

        <main 
          className="flex-1 transition-all duration-300 pt-16" 
          style={{ marginLeft: `${sidebarWidth}px` }}
        >
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

// Placeholder components for missing sections
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

const MapViewPage = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Map View</h2>
    <MapView jobs={jobsAndAppointments} />
  </div>
);

const ProfitMarginAnalysis = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Profit Analysis</h2>
    <Card>
      <CardContent className="p-6">
        <p>Profit margin and financial performance analysis will be implemented here.</p>
      </CardContent>
    </Card>
  </div>
);

const PredictiveAnalytics = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Predictive Analytics</h2>
    <Card>
      <CardContent className="p-6">
        <p>Predictive analytics and forecasting system will be implemented here.</p>
      </CardContent>
    </Card>
  </div>
);

const AdvancedReporting = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Advanced Reports</h2>
    <Card>
      <CardContent className="p-6">
        <p>Advanced reporting and visualization system will be implemented here.</p>
      </CardContent>
    </Card>
  </div>
);

const QuickBooksIntegration = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">QuickBooks</h2>
    <Card>
      <CardContent className="p-6">
        <p>QuickBooks integration and accounting system will be implemented here.</p>
      </CardContent>
    </Card>
  </div>
);

const AccountingIntegration = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Accounting</h2>
    <Card>
      <CardContent className="p-6">
        <p>Accounting and financial management system will be implemented here.</p>
      </CardContent>
    </Card>
  </div>
);
