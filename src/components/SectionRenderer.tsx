
import { Dashboard } from "./Dashboard";
import { CompanySettings } from "./CompanySettings";
import { TeamManagement } from "./TeamManagement";
import { SubcontractorManagement } from "./SubcontractorManagement";
import { ClientAppointment } from "./ClientAppointment";
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
import { ExpenseList } from "./ExpenseList";
import { TimeTracking } from "./TimeTracking";
import { EquipmentTracking } from "./EquipmentTracking";
import { VehicleManagement } from "./VehicleManagement";
import { SafetyManagement } from "./SafetyManagement";
import { QualityControl } from "./QualityControl";
import { ReportsView } from "./ReportsView";
import { NotificationCenter } from "./NotificationCenter";
import {
  EmployeeChat,
  AdvancedAnalytics,
  MapViewPage,
  ProfitMarginAnalysis,
  PredictiveAnalytics,
  AdvancedReporting,
  QuickBooksIntegration,
  AccountingIntegration,
  ComingSoonSection
} from "./PlaceholderComponents";
import { sections } from "./AppLayoutTypes";

interface SectionRendererProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const SectionRenderer = ({ activeSection, setActiveSection }: SectionRendererProps) => {
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
      return <ComingSoonSection sectionId={activeSection} sections={sections} />;
  }
};
