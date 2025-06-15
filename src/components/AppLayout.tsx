import { useState } from "react";
import { MegaMenu } from "./MegaMenu";
import { Sidebar } from "./Sidebar";
import { Dashboard } from "./Dashboard";
import { CustomerList } from "./CustomerList";
import { JobList } from "./JobList";
import { EstimateList } from "./EstimateList";
import { InvoiceList } from "./InvoiceList";
import { ScheduleView } from "./ScheduleView";
import { ReportsView } from "./ReportsView";
import { SettingsDashboard } from "./SettingsDashboard";
import { ClientAppointmentView } from "./ClientAppointmentView";

export const AppLayout = () => {
  const [activeView, setActiveView] = useState("dashboard");

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />;
      case "customers":
        return <CustomerList />;
      case "jobs":
        return <JobList />;
      case "estimates":
        return <EstimateList />;
      case "invoices":
        return <InvoiceList />;
      case "schedule":
        return <ScheduleView />;
      case "reports":
        return <ReportsView />;
      case "settings":
        return <SettingsDashboard />;
      case "appointment":
        return <ClientAppointmentView />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <MegaMenu activeView={activeView} setActiveView={setActiveView} />
      <div className="flex-1 overflow-hidden">
        <main className="h-full overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};
