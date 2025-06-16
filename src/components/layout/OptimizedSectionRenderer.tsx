
import React, { Suspense, memo, useMemo } from 'react';
import { ErrorBoundary } from "../../shared/components/ErrorBoundary";
import { LoadingSpinner } from "../../shared/components/LoadingSpinner";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load components with better chunking
const Dashboard = React.lazy(() => import("../Dashboard").then(m => ({ default: m.Dashboard })));
const CustomerList = React.lazy(() => import("../CustomerList").then(m => ({ default: m.CustomerList })));
const JobList = React.lazy(() => import("../JobList").then(m => ({ default: m.JobList })));
const MapView = React.lazy(() => import("../MapView").then(m => ({ default: m.MapView })));

// Group related components for better code splitting
const FinancialComponents = {
  EstimateList: React.lazy(() => import("../EstimateList").then(m => ({ default: m.EstimateList }))),
  InvoiceList: React.lazy(() => import("../InvoiceList").then(m => ({ default: m.InvoiceList }))),
  ExpenseList: React.lazy(() => import("../ExpenseList").then(m => ({ default: m.ExpenseList }))),
  FinancialAnalyticsDashboard: React.lazy(() => import("../FinancialAnalyticsDashboard").then(m => ({ default: m.FinancialAnalyticsDashboard }))),
  PaymentIntegrationHub: React.lazy(() => import("../PaymentIntegrationHub").then(m => ({ default: m.PaymentIntegrationHub }))),
  ProfitMarginAnalysis: React.lazy(() => import("../ProfitMarginAnalysis").then(m => ({ default: m.ProfitMarginAnalysis })))
};

const TeamComponents = {
  TeamManagement: React.lazy(() => import("../TeamManagement").then(m => ({ default: m.TeamManagement }))),
  HRFeatures: React.lazy(() => import("../HRFeatures").then(m => ({ default: m.HRFeatures }))),
  SubcontractorManagement: React.lazy(() => import("../SubcontractorManagement").then(m => ({ default: m.SubcontractorManagement }))),
  EmployeeLocationManager: React.lazy(() => import("../EmployeeLocationManager").then(m => ({ default: m.EmployeeLocationManager }))),
  RadiusAssignment: React.lazy(() => import("../RadiusAssignment").then(m => ({ default: m.RadiusAssignment })))
};

const AIComponents = {
  EnhancedAIChatAssistant: React.lazy(() => import("../EnhancedAIChatAssistant").then(m => ({ default: m.EnhancedAIChatAssistant }))),
  EnhancedSmartDocumentGenerator: React.lazy(() => import("../EnhancedSmartDocumentGenerator").then(m => ({ default: m.EnhancedSmartDocumentGenerator }))),
  PredictiveAnalyticsDashboard: React.lazy(() => import("../PredictiveAnalyticsDashboard").then(m => ({ default: m.PredictiveAnalyticsDashboard }))),
  EnhancedAISettings: React.lazy(() => import("../EnhancedAISettings").then(m => ({ default: m.EnhancedAISettings })))
};

// Enhanced loading component with skeleton
const SectionLoadingSkeleton = memo(() => (
  <div className="p-6 space-y-6">
    <div className="flex items-center space-x-4">
      <Skeleton className="h-8 w-8 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-[200px]" />
        <Skeleton className="h-4 w-[150px]" />
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-32 w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  </div>
));

interface OptimizedSectionRendererProps {
  activeSection: string;
}

export const OptimizedSectionRenderer = memo(({ activeSection }: OptimizedSectionRendererProps) => {
  console.log('OptimizedSectionRenderer: Rendering section:', activeSection);

  // Memoize component mapping for better performance
  const componentMap = useMemo(() => {
    const { demoDataService } = require("../../services/demoDataService");
    const demoJobs = demoDataService.getJobs();
    const transformedJobs = demoJobs.map((job: any) => ({
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
      
      // Financial Management
      'estimates': <FinancialComponents.EstimateList />,
      'invoices': <FinancialComponents.InvoiceList />,
      'expenses': <FinancialComponents.ExpenseList />,
      'financial-analytics': <FinancialComponents.FinancialAnalyticsDashboard />,
      'payment-integration': <FinancialComponents.PaymentIntegrationHub />,
      'profit-analysis': <FinancialComponents.ProfitMarginAnalysis />,
      
      // Team & Resources
      'team-management': <TeamComponents.TeamManagement />,
      'hr-features': <TeamComponents.HRFeatures />,
      'subcontractor-management': <TeamComponents.SubcontractorManagement />,
      'employee-locations': <TeamComponents.EmployeeLocationManager />,
      'radius-assignment': <TeamComponents.RadiusAssignment />,
      
      // AI & Automation
      'ai-chat': <AIComponents.EnhancedAIChatAssistant />,
      'smart-document-generator': <AIComponents.EnhancedSmartDocumentGenerator />,
      'predictive-analytics': <AIComponents.PredictiveAnalyticsDashboard />,
      'ai-settings': <AIComponents.EnhancedAISettings />,
      
      // Map View
      'map-view': <MapView jobs={transformedJobs} />
    };
  }, [activeSection]);

  const component = componentMap[activeSection as keyof typeof componentMap];
  
  if (!component) {
    return (
      <div className="p-6">
        <div className="text-center text-muted-foreground">
          Section "{activeSection}" not found or under development.
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6">
      <ErrorBoundary>
        <Suspense fallback={<SectionLoadingSkeleton />}>
          {component}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
});

OptimizedSectionRenderer.displayName = 'OptimizedSectionRenderer';

// Add missing lazy imports for components used in the map
const Pipeline = React.lazy(() => import("../Pipeline").then(m => ({ default: m.Pipeline })));
const ClientAppointment = React.lazy(() => import("../ClientAppointment").then(m => ({ default: m.ClientAppointment })));
const RealTimeChat = React.lazy(() => import("../RealTimeChat").then(m => ({ default: m.RealTimeChat })));
const ReviewManagement = React.lazy(() => import("../ReviewManagement").then(m => ({ default: m.ReviewManagement })));
const ScheduleView = React.lazy(() => import("../ScheduleView").then(m => ({ default: m.ScheduleView })));
const TimeTracking = React.lazy(() => import("../TimeTracking").then(m => ({ default: m.TimeTracking })));
const PhotoDocumentation = React.lazy(() => import("../PhotoDocumentation").then(m => ({ default: m.PhotoDocumentation })));
const SafetyManagement = React.lazy(() => import("../SafetyManagement").then(m => ({ default: m.SafetyManagement })));
