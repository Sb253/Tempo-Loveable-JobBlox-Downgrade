
import { useState } from 'react';
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { MapView } from "@/components/MapView";
import { SettingsDashboard } from "@/components/SettingsDashboard";
import { SchedulingDashboard } from "@/components/SchedulingDashboard";
import { GPSTracking } from "@/components/GPSTracking";
import { RealTimeDispatch } from "@/components/RealTimeDispatch";
import { OnMyWayNotifications } from "@/components/OnMyWayNotifications";
import { CustomerList } from "@/components/CustomerList";
import { CustomerPortal } from "@/components/CustomerPortal";
import { MapPin, Zap, MessageSquare, LayoutDashboard, Calendar, Settings, Users, Globe } from "lucide-react";

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'scheduling':
        return <SchedulingDashboard />;
      case 'map':
        return <MapView jobs={[]} />;
      case 'customers':
        return <CustomerList />;
      case 'customer-portal':
        return <CustomerPortal />;
      case 'settings':
        return <SettingsDashboard />;
      case 'gps-tracking':
        return <GPSTracking />;
      case 'dispatch':
        return <RealTimeDispatch />;
      case 'notifications':
        return <OnMyWayNotifications />;
      default:
        return <div>Select a section from the sidebar.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        sections={[
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'scheduling', label: 'Scheduling', icon: Calendar },
          { id: 'customers', label: 'Customer Management', icon: Users },
          { id: 'customer-portal', label: 'Customer Portal', icon: Globe },
          { id: 'map', label: 'Map View', icon: MapPin },
          { id: 'gps-tracking', label: 'GPS Tracking', icon: MapPin },
          { id: 'dispatch', label: 'Real-Time Dispatch', icon: Zap },
          { id: 'notifications', label: 'Customer Notifications', icon: MessageSquare },
          { id: 'settings', label: 'Settings', icon: Settings }
        ]}
      />
      
      <main className="ml-64 p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
