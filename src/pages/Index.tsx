import { useState, useEffect } from 'react';
import { Sidebar } from "@/components/Sidebar";
import { TopMenuNavigation } from "@/components/TopMenuNavigation";
import { NavigationSettings } from "@/components/NavigationSettings";
import { Dashboard } from "@/components/Dashboard";
import { MapView } from "@/components/MapView";
import { SettingsDashboard } from "@/components/SettingsDashboard";
import { SchedulingDashboard } from "@/components/SchedulingDashboard";
import { GPSTracking } from "@/components/GPSTracking";
import { RealTimeDispatch } from "@/components/RealTimeDispatch";
import { OnMyWayNotifications } from "@/components/OnMyWayNotifications";
import { CustomerList } from "@/components/CustomerList";
import { CustomerPortal } from "@/components/CustomerPortal";
import { ReviewManagement } from "@/components/ReviewManagement";
import { LeadGeneration } from "@/components/LeadGeneration";
import { PaymentProcessing } from "@/components/PaymentProcessing";
import { ExpenseList } from "@/components/ExpenseList";
import { ReportsView } from "@/components/ReportsView";
import { ProfitMarginAnalysis } from "@/components/ProfitMarginAnalysis";
import { AdvancedReporting } from "@/components/AdvancedReporting";
import { AdvancedAnalytics } from "@/components/AdvancedAnalytics";
import { APIIntegrations } from "@/components/APIIntegrations";
import { QuickBooksIntegration } from "@/components/QuickBooksIntegration";
import { JobCosting } from "@/components/JobCosting";
import { BusinessIntegrations } from "@/components/BusinessIntegrations";
import { JobChecklists } from "@/components/JobChecklists";
import { DocumentManagement } from "@/components/DocumentManagement";
import { JobList } from "@/components/JobList";
import { Pipeline } from "@/components/Pipeline";
import { AccessControl } from "@/components/AccessControl";
import { SubcontractorManagement } from "@/components/SubcontractorManagement";
import { CheckSquare, FileText, MapPin, Zap, MessageSquare, LayoutDashboard, Calendar, Settings, Users, Globe, Star, TrendingUp, CreditCard, Receipt, BarChart3, PieChart, TrendingDown, Cloud, Plug, GitBranch, Shield, UserCheck, DollarSign } from "lucide-react";
import { WageManagement } from "@/components/WageManagement";

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [navigationLayout, setNavigationLayout] = useState<'sidebar' | 'menu'>('sidebar');
  const [showNavigationSettings, setShowNavigationSettings] = useState(false);

  useEffect(() => {
    const savedLayout = localStorage.getItem('navigationLayout') as 'sidebar' | 'menu';
    if (savedLayout) {
      setNavigationLayout(savedLayout);
    }
  }, []);

  const sections = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pipeline', label: 'Pipeline', icon: GitBranch },
    { id: 'scheduling', label: 'Scheduling', icon: Calendar },
    { id: 'job-list', label: 'Job Management', icon: CheckSquare },
    { id: 'job-checklists', label: 'Job Checklists', icon: CheckSquare },
    { id: 'customers', label: 'Customer Management', icon: Users },
    { id: 'customer-portal', label: 'Customer Portal', icon: Globe },
    { id: 'leads', label: 'Lead Generation', icon: TrendingUp },
    { id: 'reviews', label: 'Review Management', icon: Star },
    { id: 'payments', label: 'Payment Processing', icon: CreditCard },
    { id: 'expenses', label: 'Expense Tracking', icon: Receipt },
    { id: 'job-costing', label: 'Job Costing', icon: TrendingDown },
    { id: 'reports', label: 'Financial Reports', icon: BarChart3 },
    { id: 'profit-analysis', label: 'Profit Analysis', icon: TrendingDown },
    { id: 'advanced-reporting', label: 'Advanced Reporting', icon: PieChart },
    { id: 'analytics', label: 'Business Analytics', icon: BarChart3 },
    { id: 'documents', label: 'Document Management', icon: FileText },
    { id: 'subcontractor-management', label: 'Subcontractors', icon: UserCheck },
    { id: 'access-control', label: 'Access Control', icon: Shield },
    { id: 'api-integrations', label: 'API Integrations', icon: Cloud },
    { id: 'business-integrations', label: 'Business Tools', icon: Plug },
    { id: 'quickbooks', label: 'QuickBooks', icon: Cloud },
    { id: 'map', label: 'Map View', icon: MapPin },
    { id: 'gps-tracking', label: 'GPS Tracking', icon: MapPin },
    { id: 'dispatch', label: 'Real-Time Dispatch', icon: Zap },
    { id: 'notifications', label: 'Customer Notifications', icon: MessageSquare },
    { id: 'wage-management', label: 'Wage Management', icon: DollarSign },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'pipeline':
        return <Pipeline />;
      case 'scheduling':
        return <SchedulingDashboard />;
      case 'map':
        return <MapView jobs={[]} />;
      case 'customers':
        return <CustomerList />;
      case 'customer-portal':
        return <CustomerPortal />;
      case 'reviews':
        return <ReviewManagement />;
      case 'leads':
        return <LeadGeneration />;
      case 'payments':
        return <PaymentProcessing />;
      case 'expenses':
        return <ExpenseList />;
      case 'reports':
        return <ReportsView />;
      case 'profit-analysis':
        return <ProfitMarginAnalysis />;
      case 'advanced-reporting':
        return <AdvancedReporting />;
      case 'analytics':
        return <AdvancedAnalytics />;
      case 'job-costing':
        return <JobCosting />;
      case 'api-integrations':
        return <APIIntegrations />;
      case 'quickbooks':
        return <QuickBooksIntegration />;
      case 'business-integrations':
        return <BusinessIntegrations />;
      case 'access-control':
        return <AccessControl />;
      case 'subcontractor-management':
        return <SubcontractorManagement />;
      case 'settings':
        return <SettingsDashboard />;
      case 'gps-tracking':
        return <GPSTracking />;
      case 'dispatch':
        return <RealTimeDispatch />;
      case 'notifications':
        return <OnMyWayNotifications />;
      case 'job-list':
        return <JobList />;
      case 'job-checklists':
        return <JobChecklists />;
      case 'documents':
        return <DocumentManagement />;
      case 'wage-management':
        return <WageManagement />;
      default:
        return <div>Select a section from the sidebar.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {navigationLayout === 'sidebar' ? (
        <>
          <Sidebar 
            activeSection={activeSection} 
            onSectionChange={setActiveSection}
            sections={sections}
          />
          <main className="ml-64 p-8">
            {renderContent()}
          </main>
        </>
      ) : (
        <>
          <TopMenuNavigation
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            sections={sections}
            onNavigationSettings={() => setShowNavigationSettings(true)}
          />
          <main className="p-8">
            {renderContent()}
          </main>
        </>
      )}

      <NavigationSettings
        open={showNavigationSettings}
        onOpenChange={setShowNavigationSettings}
        currentLayout={navigationLayout}
        onLayoutChange={setNavigationLayout}
      />
    </div>
  );
};

export default Index;
