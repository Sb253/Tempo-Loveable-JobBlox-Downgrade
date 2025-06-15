
import { useState, useEffect } from "react";
import { Dashboard } from "@/components/Dashboard";
import { MegaMenuSidebar } from "@/components/MegaMenuSidebar";
import { NavigationSettings } from "@/components/NavigationSettings";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Settings, Home, Users, Briefcase, MessageSquare, Star, Truck, Calendar, DollarSign, BarChart3, Building2, Bell, Cog, UserPlus, FileText, TrendingUp, CreditCard, Clock, Database, Package, FileImage, AlertTriangle, CheckCircle, Target, PieChart, Map, UserCheck, Hammer, Activity, Calculator } from "lucide-react";

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Complete sidebar sections configuration
  const sidebarSections = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'client-appointment', label: 'Client Appointment', icon: Calendar },
    { id: 'pipeline', label: 'Pipeline', icon: TrendingUp },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'customer-form', label: 'Add Customer', icon: UserPlus },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'job-form', label: 'Add Job', icon: FileText },
    { id: 'estimates', label: 'Estimates', icon: FileText },
    { id: 'invoices', label: 'Invoices', icon: DollarSign },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'time-tracking', label: 'Time Tracking', icon: Clock },
    { id: 'expenses', label: 'Expenses', icon: CreditCard },
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
    { id: 'map-view', label: 'Map View', icon: Map },
    { id: 'team-management', label: 'Team Management', icon: UserCheck },
    { id: 'subcontractor-management', label: 'Subcontractor Management', icon: Hammer },
    { id: 'advanced-inventory', label: 'Advanced Inventory', icon: Package },
    { id: 'financial-analytics', label: 'Financial Analytics', icon: TrendingUp },
    { id: 'payment-integration', label: 'Payment Hub', icon: CreditCard },
    { id: 'profit-analysis', label: 'Profit Analysis', icon: DollarSign },
    { id: 'predictive-analytics', label: 'Predictive Analytics', icon: Target },
    { id: 'advanced-reporting', label: 'Advanced Reports', icon: BarChart3 },
    { id: 'quickbooks-integration', label: 'QuickBooks', icon: Database },
    { id: 'accounting-integration', label: 'Accounting', icon: Calculator },
    { id: 'radius-assignment', label: 'Radius Assignment', icon: Map },
    { id: 'employee-locations', label: 'Employee Locations', icon: Users },
    { id: 'team-chat', label: 'Team Chat', icon: MessageSquare },
    { id: 'mobile-settings', label: 'Mobile App', icon: Activity },
    { id: 'branch-management', label: 'Branch Management', icon: Building2 },
    { id: 'company-settings', label: 'Company Settings', icon: Building2 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Cog },
  ];

  useEffect(() => {
    const savedCollapsed = localStorage.getItem('sidebarCollapsed');
    if (savedCollapsed) {
      setSidebarCollapsed(JSON.parse(savedCollapsed));
    }
  }, []);

  const handleSectionChange = (section: string) => {
    console.log('Index: Section changed to:', section);
    setActiveSection(section);
  };

  const handleNavigationSettings = () => {
    setIsSettingsOpen(true);
  };

  const handleSidebarToggle = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(collapsed));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with controls */}
      <div className="fixed top-0 right-0 z-50 p-4 flex items-center gap-2">
        <ThemeToggle />
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleNavigationSettings}
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      {/* Sidebar */}
      <MegaMenuSidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        sections={sidebarSections}
        isVisible={true}
        collapsed={sidebarCollapsed}
        onToggleCollapse={handleSidebarToggle}
      />

      {/* Main Content */}
      <div 
        className={`transition-all duration-300 ${
          sidebarCollapsed ? 'ml-20' : 'ml-80'
        }`}
      >
        <div className="container mx-auto p-6 pt-20">
          <Dashboard />
        </div>
      </div>

      {/* Navigation Settings Dialog */}
      <NavigationSettings 
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
      />
    </div>
  );
};

export default Index;
