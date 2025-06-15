
import { useState, useEffect } from 'react';
import { LucideIcon, Building, Users, FileText, Calendar, Settings, DollarSign, TrendingUp, Wrench, Map, CreditCard, Clock, Database, Bell, Palette, BarChart3, UserPlus, PieChart, Activity, Package, Truck, FileImage, MessageSquare, Star, AlertTriangle, CheckCircle, Target, Briefcase, Home, UserCheck, Hammer } from "lucide-react";
import { TopMenuNavigation } from "./TopMenuNavigation";
import { Dashboard } from "./Dashboard";
import { CustomWidgetList } from "./CustomWidgetList";
import { CustomCardList } from "./CustomCardList";
import { CompanySettings } from "./CompanySettings";
import { NavigationSettings } from "./NavigationSettings";
import { TeamManagement } from "./TeamManagement";
import { SubcontractorManagement } from "./SubcontractorManagement";

interface SidebarSection {
  id: string;
  label: string;
  icon: LucideIcon;
}

const sections: SidebarSection[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'pipeline', label: 'Pipeline', icon: TrendingUp },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'jobs', label: 'Jobs', icon: Wrench },
  { id: 'customer-form', label: 'Add Customer', icon: UserPlus },
  { id: 'job-form', label: 'Add Job', icon: FileText },
  { id: 'estimates', label: 'Estimates', icon: FileText },
  { id: 'invoices', label: 'Invoices', icon: DollarSign },
  { id: 'schedule', label: 'Schedule', icon: Calendar },
  { id: 'expenses', label: 'Expenses', icon: CreditCard },
  { id: 'time-tracking', label: 'Time Tracking', icon: Clock },
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
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'map-view', label: 'Map View', icon: Map },
  { id: 'team-management', label: 'Team Management', icon: UserCheck },
  { id: 'subcontractor-management', label: 'Subcontractor Management', icon: Hammer },
  { id: 'widgets', label: 'Dashboard Widgets', icon: Palette },
  { id: 'cards', label: 'Dashboard Cards', icon: Activity },
  { id: 'company-settings', label: 'Company Settings', icon: Building },
  { id: 'settings', label: 'Settings', icon: Settings }
];

export const AppLayout = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showNavigationSettings, setShowNavigationSettings] = useState(false);

  const handleNavigationSettings = () => {
    setShowNavigationSettings(true);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'widgets':
        return <CustomWidgetList />;
      case 'cards':
        return <CustomCardList />;
      case 'company-settings':
        return <CompanySettings />;
      case 'team-management':
        return <TeamManagement />;
      case 'subcontractor-management':
        return <SubcontractorManagement />;
      case 'settings':
        return <SettingsView />;
      default:
        return (
          <div className="p-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4 colorful-text">
                {sections.find(s => s.id === activeSection)?.label || 'Section'}
              </h2>
              <p className="text-muted-foreground">
                This section is ready for implementation. The navigation system is working correctly.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background w-full">
      <TopMenuNavigation
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        sections={sections}
        onNavigationSettings={handleNavigationSettings}
        isVisible={true}
      />

      <main className="pt-16">
        {renderSection()}
      </main>

      <NavigationSettings
        open={showNavigationSettings}
        onOpenChange={setShowNavigationSettings}
        currentLayout="menu"
        onLayoutChange={() => {}}
      />
    </div>
  );
};

const SettingsView = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Settings</h2>
        <p className="text-muted-foreground mb-6">Manage your application settings and integrations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">General Settings</h3>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Configure general application preferences</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Custom Integrations</h3>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-card">
              <h4 className="font-medium mb-2">QuickBooks Integration</h4>
              <p className="text-sm text-muted-foreground mb-3">Connect with QuickBooks for accounting sync</p>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                Configure QuickBooks
              </button>
            </div>
            
            <div className="p-4 border rounded-lg bg-card">
              <h4 className="font-medium mb-2">Zapier Integration</h4>
              <p className="text-sm text-muted-foreground mb-3">Automate workflows with 5000+ apps</p>
              <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
                Setup Zapier
              </button>
            </div>

            <div className="p-4 border rounded-lg bg-card">
              <h4 className="font-medium mb-2">Stripe Payment Processing</h4>
              <p className="text-sm text-muted-foreground mb-3">Accept online payments from customers</p>
              <button className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors">
                Connect Stripe
              </button>
            </div>

            <div className="p-4 border rounded-lg bg-card">
              <h4 className="font-medium mb-2">Email Marketing</h4>
              <p className="text-sm text-muted-foreground mb-3">Connect with Mailchimp or Constant Contact</p>
              <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
                Setup Email Marketing
              </button>
            </div>

            <div className="p-4 border rounded-lg bg-card">
              <h4 className="font-medium mb-2">Custom API Integration</h4>
              <p className="text-sm text-muted-foreground mb-3">Connect with your custom systems via API</p>
              <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors">
                Add Custom API
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
