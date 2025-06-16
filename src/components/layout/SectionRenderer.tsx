
import { Dashboard } from "../Dashboard";
import { CustomerList } from "../CustomerList";
import { JobList } from "../JobList";
import { CustomerForm } from "../CustomerForm";
import { JobForm } from "../JobForm";
import { EstimateList } from "../EstimateList";
import { InvoiceList } from "../InvoiceList";
import { ScheduleView } from "../ScheduleView";
import { ExpenseList } from "../ExpenseList";
import { TimeTracking } from "../TimeTracking";
import { MaterialsAndServices } from "../MaterialsAndServices";
import { MaterialInventory } from "../MaterialInventory";
import { EquipmentTracking } from "../EquipmentTracking";
import { PhotoDocumentation } from "../PhotoDocumentation";
import { ReviewManagement } from "../ReviewManagement";
import { SafetyManagement } from "../SafetyManagement";
import { ReportsView } from "../ReportsView";
import { TaxAndFinancialSection } from "../TaxAndFinancialSection";
import { NotificationCenter } from "../NotificationCenter";
import { MapView } from "../MapView";
import { TeamManagement } from "../TeamManagement";
import { HRFeatures } from "../HRFeatures";
import { SubcontractorManagement } from "../SubcontractorManagement";
import { MobileSettings } from "../MobileSettings";
import { CompanySettings } from "../CompanySettings";
import { BranchManagement } from "../BranchManagement";
import { BackOfficeSettings } from "../BackOfficeSettings";
import { RealTimeChat } from "../RealTimeChat";
import { AdvancedInventorySystem } from "../AdvancedInventorySystem";
import { FinancialAnalyticsDashboard } from "../FinancialAnalyticsDashboard";
import { PaymentIntegrationHub } from "../PaymentIntegrationHub";
import { ProfitMarginAnalysis } from "../ProfitMarginAnalysis";
import { PredictiveAnalyticsDashboard } from "../PredictiveAnalyticsDashboard";
import { AdvancedReporting } from "../AdvancedReporting";
import { QuickBooksIntegration } from "../QuickBooksIntegration";
import { AccountingIntegration } from "../AccountingIntegration";
import { RadiusAssignment } from "../RadiusAssignment";
import { EmployeeLocationManager } from "../EmployeeLocationManager";
import { EnhancedAIChatAssistant } from "../EnhancedAIChatAssistant";
import { EnhancedSmartDocumentGenerator } from "../EnhancedSmartDocumentGenerator";
import { EnhancedAISettings } from "../EnhancedAISettings";
import { ClientAppointment } from "../ClientAppointment";
import { Pipeline } from "../Pipeline";
import { KPIDashboard } from "../KPIDashboard";
import { AdvancedAnalytics } from "../AdvancedAnalytics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction, AlertCircle } from "lucide-react";

interface SectionRendererProps {
  activeSection: string;
}

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

export const SectionRenderer = ({ activeSection }: SectionRendererProps) => {
  console.log('SectionRenderer: Rendering section:', activeSection);

  // Map of all available sections to their components
  const sectionComponents: Record<string, JSX.Element> = {
    // Core sections
    'home': <Dashboard />,
    'dashboard': <Dashboard />,
    
    // Customer Management
    'customers': <CustomerList />,
    'customer-form': <CustomerForm />,
    'pipeline': <Pipeline />,
    'client-appointment': <ClientAppointment />,
    'communication': <RealTimeChat />,
    'reviews': <ReviewManagement />,
    
    // Job Management
    'jobs': <JobList />,
    'job-form': <JobForm />,
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
    'map-view': <MapView />,
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

  // Get the component for the active section
  const component = sectionComponents[activeSection];
  
  // If component exists, render it
  if (component) {
    return (
      <div className="p-6">
        {component}
      </div>
    );
  }
  
  // If section is not found, show appropriate message
  return (
    <div className="p-6">
      <SectionNotFound sectionName={activeSection} />
    </div>
  );
};
