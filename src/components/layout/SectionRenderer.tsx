
import { Dashboard } from "../Dashboard";
import { ClientAppointment } from "../ClientAppointment";
import { MobileFeaturesDashboard } from "../MobileFeaturesDashboard";
import { Pipeline } from "../Pipeline";
import { CustomerList } from "../CustomerList";
import { JobList } from "../JobList";
import { CustomerRegistrationForm } from "../CustomerRegistrationForm";
import { EstimateList } from "../EstimateList";
import { InvoiceList } from "../InvoiceList";
import { SchedulingDashboard } from "../SchedulingDashboard";
import { ExpenseList } from "../ExpenseList";
import { TimeTracking } from "../TimeTracking";
import { MaterialsAndServices } from "../MaterialsAndServices";
import { MaterialInventory } from "../MaterialInventory";
import { EquipmentTracking } from "../EquipmentTracking";
import { PhotoDocumentation } from "../PhotoDocumentation";
import { EmployeeChat } from "../EmployeeChat";
import { SafetyManagement } from "../SafetyManagement";
import { TaxAndFinancialSection } from "../TaxAndFinancialSection";
import { CompanySettings } from "../CompanySettings";
import { BranchManagement } from "../BranchManagement";
import { TeamManagement } from "../TeamManagement";
import { HRFeatures } from "../HRFeatures";
import { SubcontractorManagement } from "../SubcontractorManagement";
import { BackOfficeSettings } from "../BackOfficeSettings";
import { RealTimeChat } from "../RealTimeChat";
import { AdvancedInventorySystem } from "../AdvancedInventorySystem";
import { FinancialAnalyticsDashboard } from "../FinancialAnalyticsDashboard";
import { PaymentIntegrationHub } from "../PaymentIntegrationHub";
import { RadiusAssignment } from "../RadiusAssignment";
import { EmployeeLocationManager } from "../EmployeeLocationManager";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sections } from "./SectionTypes";
import { MapViewPage } from "./MapViewPage";
import {
  JobForm,
  ReviewManagement,
  QualityControl,
  KPIDashboard,
  ReportsView,
  AdvancedAnalytics,
  NotificationCenter,
  VehicleManagement,
  ProfitMarginAnalysis,
  PredictiveAnalytics,
  AdvancedReporting,
  QuickBooksIntegration,
  AccountingIntegration
} from "./PlaceholderComponents";

interface SectionRendererProps {
  activeSection: string;
}

export const SectionRenderer = ({ activeSection }: SectionRendererProps) => {
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
      return <JobForm />;
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
