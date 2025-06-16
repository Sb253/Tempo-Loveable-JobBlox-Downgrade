import React, { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction, AlertCircle } from "lucide-react";
import { ErrorBoundary } from "../../shared/components/ErrorBoundary";
import { LoadingSpinner } from "../../shared/components/LoadingSpinner";
import { demoDataService, DemoJob } from "../../services/demoDataService";

// Lazy load components for better performance
const Dashboard = React.lazy(() => import("../Dashboard").then(m => ({ default: m.Dashboard })));
const CustomerList = React.lazy(() => import("../CustomerList").then(m => ({ default: m.CustomerList })));
const JobList = React.lazy(() => import("../JobList").then(m => ({ default: m.JobList })));
const EstimateList = React.lazy(() => import("../EstimateList").then(m => ({ default: m.EstimateList })));
const InvoiceList = React.lazy(() => import("../InvoiceList").then(m => ({ default: m.InvoiceList })));
const ScheduleView = React.lazy(() => import("../ScheduleView").then(m => ({ default: m.ScheduleView })));
const ExpenseList = React.lazy(() => import("../ExpenseList").then(m => ({ default: m.ExpenseList })));
const TimeTracking = React.lazy(() => import("../TimeTracking").then(m => ({ default: m.TimeTracking })));
const MaterialsAndServices = React.lazy(() => import("../MaterialsAndServices").then(m => ({ default: m.MaterialsAndServices })));
const MaterialInventory = React.lazy(() => import("../MaterialInventory").then(m => ({ default: m.MaterialInventory })));
const EquipmentTracking = React.lazy(() => import("../EquipmentTracking").then(m => ({ default: m.EquipmentTracking })));
const PhotoDocumentation = React.lazy(() => import("../PhotoDocumentation").then(m => ({ default: m.PhotoDocumentation })));
const ReviewManagement = React.lazy(() => import("../ReviewManagement").then(m => ({ default: m.ReviewManagement })));
const SafetyManagement = React.lazy(() => import("../SafetyManagement").then(m => ({ default: m.SafetyManagement })));
const ReportsView = React.lazy(() => import("../ReportsView").then(m => ({ default: m.ReportsView })));
const TaxAndFinancialSection = React.lazy(() => import("../TaxAndFinancialSection").then(m => ({ default: m.TaxAndFinancialSection })));
const NotificationCenter = React.lazy(() => import("../NotificationCenter").then(m => ({ default: m.NotificationCenter })));
const MapView = React.lazy(() => import("../MapView").then(m => ({ default: m.MapView })));
const TeamManagement = React.lazy(() => import("../TeamManagement").then(m => ({ default: m.TeamManagement })));
const HRFeatures = React.lazy(() => import("../HRFeatures").then(m => ({ default: m.HRFeatures })));
const SubcontractorManagement = React.lazy(() => import("../SubcontractorManagement").then(m => ({ default: m.SubcontractorManagement })));
const MobileSettings = React.lazy(() => import("../MobileSettings").then(m => ({ default: m.MobileSettings })));
const CompanySettings = React.lazy(() => import("../CompanySettings").then(m => ({ default: m.CompanySettings })));
const BranchManagement = React.lazy(() => import("../BranchManagement").then(m => ({ default: m.BranchManagement })));
const BackOfficeSettings = React.lazy(() => import("../BackOfficeSettings").then(m => ({ default: m.BackOfficeSettings })));
const RealTimeChat = React.lazy(() => import("../RealTimeChat").then(m => ({ default: m.RealTimeChat })));
const AdvancedInventorySystem = React.lazy(() => import("../AdvancedInventorySystem").then(m => ({ default: m.AdvancedInventorySystem })));
const FinancialAnalyticsDashboard = React.lazy(() => import("../FinancialAnalyticsDashboard").then(m => ({ default: m.FinancialAnalyticsDashboard })));
const PaymentIntegrationHub = React.lazy(() => import("../PaymentIntegrationHub").then(m => ({ default: m.PaymentIntegrationHub })));
const ProfitMarginAnalysis = React.lazy(() => import("../ProfitMarginAnalysis").then(m => ({ default: m.ProfitMarginAnalysis })));
const PredictiveAnalyticsDashboard = React.lazy(() => import("../PredictiveAnalyticsDashboard").then(m => ({ default: m.PredictiveAnalyticsDashboard })));
const AdvancedReporting = React.lazy(() => import("../AdvancedReporting").then(m => ({ default: m.AdvancedReporting })));
const QuickBooksIntegration = React.lazy(() => import("../QuickBooksIntegration").then(m => ({ default: m.QuickBooksIntegration })));
const AccountingIntegration = React.lazy(() => import("../AccountingIntegration").then(m => ({ default: m.AccountingIntegration })));
const RadiusAssignment = React.lazy(() => import("../RadiusAssignment").then(m => ({ default: m.RadiusAssignment })));
const EmployeeLocationManager = React.lazy(() => import("../EmployeeLocationManager").then(m => ({ default: m.EmployeeLocationManager })));
const EnhancedAIChatAssistant = React.lazy(() => import("../EnhancedAIChatAssistant").then(m => ({ default: m.EnhancedAIChatAssistant })));
const EnhancedSmartDocumentGenerator = React.lazy(() => import("../EnhancedSmartDocumentGenerator").then(m => ({ default: m.EnhancedSmartDocumentGenerator })));
const EnhancedAISettings = React.lazy(() => import("../EnhancedAISettings").then(m => ({ default: m.EnhancedAISettings })));
const ClientAppointment = React.lazy(() => import("../ClientAppointment").then(m => ({ default: m.ClientAppointment })));
const Pipeline = React.lazy(() => import("../Pipeline").then(m => ({ default: m.Pipeline })));
const KPIDashboard = React.lazy(() => import("../KPIDashboard").then(m => ({ default: m.KPIDashboard })));
const AdvancedAnalytics = React.lazy(() => import("../AdvancedAnalytics").then(m => ({ default: m.AdvancedAnalytics })));

interface SectionRendererProps {
  activeSection: string;
}

// Transform DemoJob to Job interface for MapView component
const transformDemoJobsToMapJobs = (demoJobs: DemoJob[]) => {
  return demoJobs.map(job => ({
    id: job.id,
    title: job.title,
    customer: job.customerName,
    address: job.location,
    coordinates: job.coordinates,
    status: job.status,
    type: 'job' as const,
    time: new Date(job.startDate).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    })
  }));
};

// Component for sections that are under development
const UnderDevelopment = ({ sectionName }: { sectionName: string }) => (
  <div className="flex items-center justify-center min-h-96">
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <Construction className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <CardTitle className="capitalize">{sectionName.replace('-', ' ')}</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-muted-foreground">
          This feature is under development and will be available soon.
        </p>
      </CardContent>
    </Card>
  </div>
);

// Component for handling unknown sections
const SectionNotFound = ({ sectionName }: { sectionName: string }) => (
  <div className="flex items-center justify-center min-h-96">
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <CardTitle>Section Not Found</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-muted-foreground mb-4">
          The section "{sectionName}" could not be found.
        </p>
        <p className="text-sm text-muted-foreground">
          Please check the navigation or contact support if this issue persists.
        </p>
      </CardContent>
    </Card>
  </div>
);

// Registry pattern for section components
const createSectionRegistry = () => {
  const demoJobs = demoDataService.getJobs();
  const transformedJobs = transformDemoJobsToMapJobs(demoJobs);

  return {
    // Core sections
    'home': <Dashboard />,
    'dashboard': <Dashboard />,
    
    // Customer Management
    'customers': <CustomerList />,
    'pipeline': <Pipeline />,
    'client-appointment': <ClientAppointment />,
    'communication': <RealTimeChat />,
    'reviews': <ReviewManagement />,
    
    // Job Management
    'jobs': <JobList />,
    'schedule': <ScheduleView />,
    'time-tracking': <TimeTracking />,
    'photos': <PhotoDocumentation />,
    'safety': <SafetyManagement />,
    'quality': <UnderDevelopment sectionName="Quality Control" />,
    
    // Financial Management
    'estimates': <EstimateList />,
    'invoices': <InvoiceList />,
    'expenses': <ExpenseList />,
    'goals': <KPIDashboard />,
    'tax-financial': <TaxAndFinancialSection />,
    'financial-analytics': <FinancialAnalyticsDashboard />,
    'payment-integration': <PaymentIntegrationHub />,
    'profit-analysis': <ProfitMarginAnalysis />,
    
    // Team & Resources
    'team-management': <TeamManagement />,
    'hr-features': <HRFeatures />,
    'subcontractor-management': <SubcontractorManagement />,
    'materials-services': <MaterialsAndServices />,
    'inventory': <MaterialInventory />,
    'equipment': <EquipmentTracking />,
    'vehicles': <UnderDevelopment sectionName="Vehicle Management" />,
    'advanced-inventory': <AdvancedInventorySystem />,
    'employee-locations': <EmployeeLocationManager />,
    'radius-assignment': <RadiusAssignment />,
    
    // AI & Automation
    'ai-chat': <EnhancedAIChatAssistant />,
    'smart-document-generator': <EnhancedSmartDocumentGenerator />,
    'predictive-analytics': <PredictiveAnalyticsDashboard />,
    'ai-settings': <EnhancedAISettings />,
    
    // Integrations
    'quickbooks-integration': <QuickBooksIntegration />,
    'accounting-integration': <AccountingIntegration />,
    
    // Reports & Analytics
    'reports': <ReportsView />,
    'analytics': <AdvancedAnalytics />,
    'map-view': <MapView jobs={transformedJobs} />,
    'advanced-reporting': <AdvancedReporting />,
    
    // Communication
    'team-chat': <RealTimeChat />,
    'notifications': <NotificationCenter />,
    
    // Settings & Admin
    'company-settings': <CompanySettings />,
    'back-office': <BackOfficeSettings />,
    'mobile-settings': <MobileSettings />,
    'branch-management': <BranchManagement />
  };
};

export const SectionRenderer = ({ activeSection }: SectionRendererProps) => {
  console.log('SectionRenderer: Rendering section:', activeSection);

  const sectionRegistry = createSectionRegistry();
  const component = sectionRegistry[activeSection as keyof typeof sectionRegistry];
  
  if (component) {
    return (
      <div className="p-6">
        <ErrorBoundary>
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-96">
              <LoadingSpinner size="lg" text="Loading..." />
            </div>
          }>
            {component}
          </Suspense>
        </ErrorBoundary>
      </div>
    );
  }
  
  return (
    <div className="p-6">
      <SectionNotFound sectionName={activeSection} />
    </div>
  );
};
