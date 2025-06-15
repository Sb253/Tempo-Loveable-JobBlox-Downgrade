import { useState, useEffect } from "react";
import { Dashboard } from "@/components/Dashboard";
import { MegaMenuSidebar } from "@/components/MegaMenuSidebar";
import { Button } from "@/components/ui/button";
import { Settings, Home, Users, Briefcase, MessageSquare, Star, Truck, Calendar, DollarSign, BarChart3, Building2, Bell, Cog, UserPlus, FileText, TrendingUp, CreditCard, Clock, Database, Package, FileImage, AlertTriangle, CheckCircle, Target, PieChart, Map, UserCheck, Hammer, Activity, Calculator } from "lucide-react";

// Import all the components we need for different sections
import { Communication } from "@/components/Communication";
import { ReviewManagement } from "@/components/ReviewManagement";
import { VehicleManagement } from "@/components/VehicleManagement";
import { CustomerList } from "@/components/CustomerList";
import { JobList } from "@/components/JobList";
import { EstimateList } from "@/components/EstimateList";
import { InvoiceList } from "@/components/InvoiceList";
import { ScheduleView } from "@/components/ScheduleView";
import { TimeTracking } from "@/components/TimeTracking";
import { ExpenseList } from "@/components/ExpenseList";
import { MaterialInventory } from "@/components/MaterialInventory";
import { EquipmentManagement } from "@/components/EquipmentManagement";
import { PhotoDocumentation } from "@/components/PhotoDocumentation";
import { SafetyManagement } from "@/components/SafetyManagement";
import { QualityControl } from "@/components/QualityControl";
import { KPIDashboard } from "@/components/KPIDashboard";
import { ReportsView } from "@/components/ReportsView";
import { AdvancedAnalytics } from "@/components/AdvancedAnalytics";
import { MapView } from "@/components/MapView";
import { TeamManagement } from "@/components/TeamManagement";
import { SubcontractorManagement } from "@/components/SubcontractorManagement";
import { AdvancedInventorySystem } from "@/components/AdvancedInventorySystem";
import { FinancialAnalyticsDashboard } from "@/components/FinancialAnalyticsDashboard";
import { PaymentIntegrationHub } from "@/components/PaymentIntegrationHub";
import { ProfitMarginAnalysis } from "@/components/ProfitMarginAnalysis";
import { PredictiveAnalytics } from "@/components/PredictiveAnalytics";
import { AdvancedReporting } from "@/components/AdvancedReporting";
import { QuickBooksIntegration } from "@/components/QuickBooksIntegration";
import { AccountingIntegration } from "@/components/AccountingIntegration";
import { RadiusAssignment } from "@/components/RadiusAssignment";
import { EmployeeLocationManager } from "@/components/EmployeeLocationManager";
import { RealTimeChat } from "@/components/RealTimeChat";
import { MobileSettings } from "@/components/MobileSettings";
import { BranchManagement } from "@/components/BranchManagement";
import { CompanySettings } from "@/components/CompanySettings";
import { NotificationCenter } from "@/components/NotificationCenter";
import { SettingsDashboard } from "@/components/SettingsDashboard";
import { CustomerRegistrationForm } from "@/components/CustomerRegistrationForm";
import { JobForm } from "@/components/JobForm";
import { ClientAppointment } from "@/components/ClientAppointment";
import { Pipeline } from "@/components/Pipeline";
import { BackendSettings } from "@/components/BackendSettings";

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);

  // Mock data for components that need it - fixed to match Job interface
  const mockJobs = [
    {
      id: '1',
      title: 'Kitchen Renovation',
      customer: 'John Smith',
      address: '123 Main St, New York, NY',
      coordinates: [-74.006, 40.7128] as [number, number],
      status: 'in-progress' as const,
      type: 'job' as const,
      time: '9:00 AM',
      scheduledDate: '2024-01-15',
      assignedTo: 'Mike Johnson'
    },
    {
      id: '2',
      title: 'Bathroom Remodel',
      customer: 'Sarah Wilson',
      address: '456 Oak Ave, Brooklyn, NY',
      coordinates: [-73.9442, 40.6782] as [number, number],
      status: 'scheduled' as const,
      type: 'job' as const,
      time: '2:00 PM',
      scheduledDate: '2024-01-20',
      assignedTo: 'Tom Brown'
    },
    {
      id: '3',
      title: 'Design Consultation',
      customer: 'Mike Davis',
      address: '789 Broadway, Manhattan, NY',
      coordinates: [-73.9904, 40.7505] as [number, number],
      status: 'scheduled' as const,
      type: 'appointment' as const,
      time: '11:00 AM',
      scheduledDate: '2024-01-18',
      assignedTo: 'Lisa Chen'
    }
  ];

  // Complete sidebar sections configuration
  const sidebarSections = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'client-appointment', label: 'Client Appointment', icon: Calendar },
    { id: 'pipeline', label: 'Pipeline', icon: TrendingUp },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'customer-form', label: 'Customer Intake', icon: UserPlus },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'job-form', label: 'Add Job', icon: FileText },
    { id: 'estimates', label: 'Estimates', icon: FileText },
    { id: 'invoices', label: 'Invoices', icon: DollarSign },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'time-tracking', label: 'Time Tracking', icon: Clock },
    { id: 'expenses', label: 'Expenses', icon: CreditCard },
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
    { id: 'map-view', label: 'Map View', icon: Map },
    { id: 'team-management', label: 'Team Management', icon: UserCheck },
    { id: 'subcontractor-management', label: 'Subcontractor Management', icon: Hammer },
    { id: 'advanced-inventory', label: 'Advanced Inventory', icon: Package },
    { id: 'financial-analytics', label: 'Financial Analytics', icon: TrendingUp },
    { id: 'payment-integration', label: 'Payment Hub', icon: CreditCard },
    { id: 'profit-analysis', label: 'Profit Analysis', icon: DollarSign },
    { id: 'predictive-analytics', label: 'Predictive Analytics', icon: Target },
    { id: 'advanced-reporting', label: 'Advanced Reports', icon: BarChart3 },
    { id: 'quickbooks-integration', label: 'QuickBooks', icon: Database },
    { id: 'accounting-integration', label: 'Accounting', icon: Calculator },
    { id: 'radius-assignment', label: 'Radius Assignment', icon: Map },
    { id: 'employee-locations', label: 'Employee Locations', icon: Users },
    { id: 'team-chat', label: 'Team Chat', icon: MessageSquare },
    { id: 'mobile-settings', label: 'Mobile App', icon: Activity },
    { id: 'branch-management', label: 'Branch Management', icon: Building2 },
    { id: 'company-settings', label: 'Company Settings', icon: Building2 },
    { id: 'backend-settings', label: 'Backend Settings', icon: Cog },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Cog },
  ];

  useEffect(() => {
    const savedCollapsed = localStorage.getItem('sidebarCollapsed');
    if (savedCollapsed) {
      setSidebarCollapsed(JSON.parse(savedCollapsed));
    }
  }, []);

  const handleSectionChange = (section: string) => {
    console.log('Index: Section changed to:', section);
    setActiveSection(section);
    
    // Handle special form sections
    if (section === 'job-form') {
      setShowJobForm(true);
      setActiveSection('jobs'); // Show jobs list as background
    } else {
      setShowJobForm(false);
    }
  };

  const handleSidebarToggle = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(collapsed));
  };

  const handleCloseJobForm = () => {
    setShowJobForm(false);
    setActiveSection('jobs');
  };

  const handleSaveJob = (jobData: any) => {
    console.log('Saving job:', jobData);
    setShowJobForm(false);
    setActiveSection('jobs');
  };

  // Function to render the appropriate component based on active section
  const renderActiveComponent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard onSectionChange={handleSectionChange} />;
      case 'client-appointment':
        return <ClientAppointment />;
      case 'pipeline':
        return <Pipeline />;
      case 'customers':
        return <CustomerList />;
      case 'customer-form':
        return <CustomerRegistrationForm />;
      case 'jobs':
        return <JobList />;
      case 'estimates':
        return <EstimateList />;
      case 'invoices':
        return <InvoiceList />;
      case 'schedule':
        return <ScheduleView />;
      case 'time-tracking':
        return <TimeTracking />;
      case 'expenses':
        return <ExpenseList />;
      case 'inventory':
        return <MaterialInventory />;
      case 'equipment':
        return <EquipmentManagement />;
      case 'vehicles':
        return <VehicleManagement />;
      case 'photos':
        return <PhotoDocumentation />;
      case 'communication':
        return <Communication />;
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
      case 'map-view':
        return <MapView jobs={mockJobs} />;
      case 'team-management':
        return <TeamManagement />;
      case 'subcontractor-management':
        return <SubcontractorManagement />;
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
      case 'team-chat':
        return <RealTimeChat />;
      case 'mobile-settings':
        return <MobileSettings />;
      case 'branch-management':
        return <BranchManagement />;
      case 'company-settings':
        return <CompanySettings />;
      case 'backend-settings':
        return <BackendSettings />;
      case 'notifications':
        return <NotificationCenter />;
      case 'settings':
        return <SettingsDashboard />;
      default:
        return <Dashboard onSectionChange={handleSectionChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <MegaMenuSidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        sections={sidebarSections}
        isVisible={true}
        collapsed={sidebarCollapsed}
        onToggleCollapse={handleSidebarToggle}
      />

      {/* Main Content */}
      <div 
        className={`transition-all duration-300 ${
          sidebarCollapsed ? 'ml-20' : 'ml-80'
        }`}
      >
        <div className="container mx-auto p-6">
          {renderActiveComponent()}
        </div>
      </div>

      {/* Modal Forms */}
      {showJobForm && (
        <JobForm 
          onClose={handleCloseJobForm}
          onSave={handleSaveJob}
        />
      )}
    </div>
  );
};

export default Index;
