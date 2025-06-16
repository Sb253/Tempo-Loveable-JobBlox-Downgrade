
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapView } from "./MapView";
import { jobsAndAppointments } from "./AppLayoutTypes";

export const EmployeeChat = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Employee Communication</h2>
    <Card>
      <CardContent className="p-6">
        <p>Internal communication and messaging system will be implemented here.</p>
      </CardContent>
    </Card>
  </div>
);

export const AdvancedAnalytics = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Advanced Analytics</h2>
    <Card>
      <CardContent className="p-6">
        <p>Advanced analytics and insights will be implemented here.</p>
      </CardContent>
    </Card>
  </div>
);

export const MapViewPage = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Map View</h2>
    <MapView jobs={jobsAndAppointments} />
  </div>
);

export const ProfitMarginAnalysis = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Profit Analysis</h2>
    <Card>
      <CardContent className="p-6">
        <p>Profit margin and financial performance analysis will be implemented here.</p>
      </CardContent>
    </Card>
  </div>
);

export const PredictiveAnalytics = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Predictive Analytics</h2>
    <Card>
      <CardContent className="p-6">
        <p>Predictive analytics and forecasting system will be implemented here.</p>
      </CardContent>
    </Card>
  </div>
);

export const AdvancedReporting = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Advanced Reports</h2>
    <Card>
      <CardContent className="p-6">
        <p>Advanced reporting and visualization system will be implemented here.</p>
      </CardContent>
    </Card>
  </div>
);

export const QuickBooksIntegration = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">QuickBooks</h2>
    <Card>
      <CardContent className="p-6">
        <p>QuickBooks integration and accounting system will be implemented here.</p>
      </CardContent>
    </Card>
  </div>
);

export const AccountingIntegration = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Accounting</h2>
    <Card>
      <CardContent className="p-6">
        <p>Accounting and financial management system will be implemented here.</p>
      </CardContent>
    </Card>
  </div>
);

export const ComingSoonSection = ({ sectionId, sections }: { sectionId: string; sections: any[] }) => (
  <div className="p-6">
    <div className="text-center space-y-4">
      <h2 className="text-2xl font-bold mb-4 colorful-text">
        {sections.find(s => s.id === sectionId)?.label || 'Section'}
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
