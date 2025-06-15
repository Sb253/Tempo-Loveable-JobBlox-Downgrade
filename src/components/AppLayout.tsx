
import { useState, useEffect } from 'react';
import { LucideIcon, Building, Users, FileText, Calendar, Settings, DollarSign, TrendingUp, Wrench, Map, CreditCard, Clock, Database, Bell, Palette, BarChart3, UserPlus, PieChart } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { TopMenuNavigation } from "./TopMenuNavigation";
import { Dashboard } from "./Dashboard";

interface SidebarSection {
  id: string;
  label: string;
  icon: LucideIcon;
}

const sections: SidebarSection[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Building },
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
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'analytics', label: 'Analytics', icon: PieChart },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'map-view', label: 'Map View', icon: Map },
  { id: 'settings', label: 'Settings', icon: Settings }
];

export const AppLayout = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [currentLayout, setCurrentLayout] = useState<'sidebar' | 'menu'>(() => {
    const saved = localStorage.getItem('navigationLayout') as 'sidebar' | 'menu';
    return saved || 'sidebar';
  });

  const handleLayoutChange = (layout: 'sidebar' | 'menu') => {
    console.log('AppLayout: Changing layout to:', layout);
    setCurrentLayout(layout);
    localStorage.setItem('navigationLayout', layout);
  };

  const handleNavigationSettings = () => {
    setActiveSection('settings');
  };

  return (
    <div className="min-h-screen bg-background w-full">
      {/* Sidebar Navigation */}
      {currentLayout === 'sidebar' && (
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          sections={sections}
          isVisible={true}
        />
      )}

      {/* Top Menu Navigation */}
      {currentLayout === 'menu' && (
        <TopMenuNavigation
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          sections={sections}
          onNavigationSettings={handleNavigationSettings}
          isVisible={true}
        />
      )}

      {/* Main Content */}
      <main className={`transition-all duration-300 ${currentLayout === 'sidebar' ? 'ml-64' : 'ml-0'} ${currentLayout === 'menu' ? 'pt-16' : 'pt-0'}`}>
        {activeSection === 'dashboard' ? (
          <Dashboard 
            currentLayout={currentLayout}
            onLayoutChange={handleLayoutChange}
          />
        ) : (
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
        )}
      </main>
    </div>
  );
};
