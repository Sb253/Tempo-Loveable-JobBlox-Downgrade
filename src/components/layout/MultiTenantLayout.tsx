
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../AppHeader';
import { UnifiedSidebar } from '../UnifiedSidebar';
import { TenantDashboard } from './TenantDashboard';
import { ClientManagement } from '../tenant/ClientManagement';
import { SubscriptionManager } from '../subscription/SubscriptionManager';
import { DemoTrialManager } from '../demo/DemoTrialManager';
import { WorkflowAutomation } from '../WorkflowAutomation';
import { IntegrationsSection } from '../sections/IntegrationsSection';
import { NotificationsSection } from '../sections/NotificationsSection';
import { ProfileSection } from '../sections/ProfileSection';
import { SettingsSection } from '../sections/SettingsSection';
import { SecuritySection } from '../sections/SecuritySection';
import { 
  Building2, 
  Users, 
  CreditCard, 
  BarChart3, 
  Settings,
  Zap,
  Clock,
  Globe,
  Shield,
  Bell,
  User
} from "lucide-react";

export const MultiTenantLayout = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [userType, setUserType] = useState<'admin' | 'tenant' | 'trial' | null>(null);

  // Mock tenant data
  const mockTenant = {
    id: 'tenant-001',
    name: 'Acme Construction Co.',
    plan: 'professional',
    status: 'active',
    clientCount: 15,
    subscriptionEnd: '2024-08-15',
    trialEnd: undefined
  };

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
    // Get user type from session storage or redirect to auth
    const storedUserType = sessionStorage.getItem('userType') || sessionStorage.getItem('devUserType');
    if (storedUserType && ['admin', 'tenant', 'trial'].includes(storedUserType)) {
      setUserType(storedUserType as 'admin' | 'tenant' | 'trial');
    } else {
      navigate('/auth');
    }
  }, [navigate]);

  const sections = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'clients', label: 'Client Management', icon: Users },
    { id: 'subscription', label: 'Subscription', icon: CreditCard },
    { id: 'automation', label: 'Workflow Automation', icon: Zap },
    { id: 'trial-manager', label: 'Trial Management', icon: Clock },
    { id: 'integrations', label: 'Integrations', icon: Globe },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield }
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <TenantDashboard tenant={mockTenant} />;
      case 'clients':
        return <ClientManagement tenantId={mockTenant.id} />;
      case 'subscription':
        return <SubscriptionManager tenant={mockTenant} />;
      case 'automation':
        return <WorkflowAutomation />;
      case 'trial-manager':
        return <DemoTrialManager />;
      case 'integrations':
        return <IntegrationsSection />;
      case 'notifications':
        return <NotificationsSection />;
      case 'profile':
        return <ProfileSection userType={userType} />;
      case 'settings':
        return <SettingsSection />;
      case 'security':
        return <SecuritySection />;
      default:
        return <TenantDashboard tenant={mockTenant} />;
    }
  };

  if (!userType) {
    return null; // Will redirect to auth
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader 
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
