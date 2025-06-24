
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { BusinessHeader } from '../BusinessHeader';
import { UnifiedSidebar } from '../UnifiedSidebar';
import { Dashboard } from './Dashboard';
import { WorkflowAutomation } from '../WorkflowAutomation';
import { IntegrationsSection } from '../sections/IntegrationsSection';
import { NotificationsSection } from '../sections/NotificationsSection';
import { ProfileSection } from '../sections/ProfileSection';
import { SettingsSection } from '../sections/SettingsSection';
import { SecuritySection } from '../sections/SecuritySection';
import { InternalMeetingsSection } from '../sections/InternalMeetingsSection';
import { 
  Building2, 
  Users, 
  BarChart3, 
  Settings,
  Zap,
  Globe,
  Shield,
  Bell,
  User,
  Calendar,
  DollarSign,
  Wrench,
  Package
} from "lucide-react";

export const BusinessLayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, user } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const sections = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'jobs', label: 'Jobs', icon: Wrench },
    { id: 'invoices', label: 'Invoices', icon: DollarSign },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'automation', label: 'Workflow Automation', icon: Zap },
    { id: 'integrations', label: 'Integrations', icon: Globe },
    { id: 'internal-meetings', label: 'Internal Meetings', icon: Calendar },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield }
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'automation':
        return <WorkflowAutomation />;
      case 'integrations':
        return <IntegrationsSection />;
      case 'internal-meetings':
        return <InternalMeetingsSection />;
      case 'notifications':
        return <NotificationsSection />;
      case 'profile':
        return <ProfileSection userType={user?.role || 'user'} />;
      case 'settings':
        return <SettingsSection />;
      case 'security':
        return <SecuritySection />;
      default:
        return <Dashboard />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-background">
      <BusinessHeader 
        onSectionChange={setActiveSection}
        onMobileSidebarToggle={() => setSidebarVisible(!sidebarVisible)}
        isMobile={isMobile}
      />
      
      <div className="flex pt-16">
        <UnifiedSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          sections={sections}
          isVisible={isMobile ? sidebarVisible : true}
        />
        
        <main className={`flex-1 transition-all duration-300 ${
          isMobile 
            ? (sidebarVisible ? 'ml-0' : 'ml-0') 
            : (sidebarVisible ? 'ml-64' : 'ml-16')
        } p-6`}>
          {renderSection()}
        </main>
      </div>
    </div>
  );
};
