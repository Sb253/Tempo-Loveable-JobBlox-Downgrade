
import { useState, useEffect } from "react";
import { Dashboard } from "@/components/Dashboard";
import { MegaMenuSidebar } from "@/components/MegaMenuSidebar";
import { NavigationSettings } from "@/components/NavigationSettings";
import { NavigationToggle } from "@/components/NavigationToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Settings, Home, Users, Briefcase, MessageSquare, Star, Truck, Calendar, DollarSign, BarChart3, Building2, Bell, Cog } from "lucide-react";

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [navigationLayout, setNavigationLayout] = useState<'sidebar' | 'menu'>('sidebar');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Sidebar sections configuration
  const sidebarSections = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'communication', label: 'Communication', icon: MessageSquare },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'vehicles', label: 'Vehicles', icon: Truck },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'invoices', label: 'Invoices', icon: DollarSign },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'company-settings', label: 'Company Settings', icon: Building2 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Cog },
  ];

  useEffect(() => {
    const savedLayout = localStorage.getItem('navigationLayout') as 'sidebar' | 'menu';
    if (savedLayout) {
      setNavigationLayout(savedLayout);
    }
  }, []);

  const handleSectionChange = (section: string) => {
    console.log('Index: Section changed to:', section);
    setActiveSection(section);
  };

  const handleNavigationSettings = () => {
    setIsSettingsOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with controls */}
      <div className="fixed top-0 right-0 z-50 p-4 flex items-center gap-2">
        <NavigationToggle 
          currentLayout={navigationLayout}
          onLayoutChange={setNavigationLayout}
        />
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
        isVisible={navigationLayout === 'sidebar'}
        collapsed={sidebarCollapsed}
        onToggleCollapse={setSidebarCollapsed}
      />

      {/* Main Content */}
      <div 
        className={`transition-all duration-300 ${
          navigationLayout === 'sidebar' 
            ? (sidebarCollapsed ? 'ml-20' : 'ml-80') 
            : 'ml-0'
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
