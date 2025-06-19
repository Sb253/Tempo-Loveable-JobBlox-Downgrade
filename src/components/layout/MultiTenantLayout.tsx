
import React, { useState } from 'react';
import { AppHeader } from '../AppHeader';
import { UnifiedSidebar } from '../UnifiedSidebar';
import { TenantDashboard } from './TenantDashboard';
import { ClientManagement } from '../tenant/ClientManagement';
import { SubscriptionManager } from '../subscription/SubscriptionManager';
import { DemoTrialManager } from '../demo/DemoTrialManager';
import { WorkflowAutomation } from '../WorkflowAutomation';
import { 
  Building2, 
  Users, 
  CreditCard, 
  BarChart3, 
  Settings,
  Zap,
  Clock,
  Globe,
  Shield
} from "lucide-react";

export const MultiTenantLayout = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarVisible, setSidebarVisible] = useState(true);

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

  const sections = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'clients', label: 'Client Management', icon: Users },
    { id: 'subscription', label: 'Subscription', icon: CreditCard },
    { id: 'automation', label: 'Workflow Automation', icon: Zap },
    { id: 'trial-manager', label: 'Trial Management', icon: Clock },
    { id: 'integrations', label: 'Integrations', icon: Globe },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield }
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <TenantDashboard tenant={mockTenant} />;
      case 'clients':
        return <ClientManagement />;
      case 'subscription':
        return <SubscriptionManager tenant={mockTenant} />;
      case 'automation':
        return <WorkflowAutomation />;
      case 'trial-manager':
        return <DemoTrialManager />;
      default:
        return <TenantDashboard tenant={mockTenant} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader 
        onSectionChange={setActiveSection}
        onMobileSidebarToggle={() => setSidebarVisible(!sidebarVisible)}
      />
      
      <div className="flex pt-16">
        <UnifiedSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          sections={sections}
          isVisible={sidebarVisible}
        />
        
        <main className={`flex-1 transition-all duration-300 ${sidebarVisible ? 'ml-64' : 'ml-16'} p-6`}>
          {renderSection()}
        </main>
      </div>
    </div>
  );
};
