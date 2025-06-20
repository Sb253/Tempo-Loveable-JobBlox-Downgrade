
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Shield,
  Bell,
  User
} from "lucide-react";

export const MultiTenantLayout = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarVisible, setSidebarVisible] = useState(true);
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

// Placeholder components for missing sections
const IntegrationsSection = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-3">
      <Globe className="h-6 w-6 text-blue-600" />
      <div>
        <h2 className="text-xl font-semibold">Integrations</h2>
        <p className="text-sm text-muted-foreground">Connect with external services</p>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {['Slack', 'Microsoft Teams', 'Zapier', 'QuickBooks', 'Salesforce', 'HubSpot'].map((integration) => (
        <div key={integration} className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer">
          <h3 className="font-medium">{integration}</h3>
          <p className="text-sm text-muted-foreground">Connect your {integration} account</p>
        </div>
      ))}
    </div>
  </div>
);

const NotificationsSection = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-3">
      <Bell className="h-6 w-6 text-blue-600" />
      <div>
        <h2 className="text-xl font-semibold">Notifications</h2>
        <p className="text-sm text-muted-foreground">Manage your notification preferences</p>
      </div>
    </div>
    <div className="space-y-4">
      {[
        { title: 'New client signed up', time: '2 minutes ago', type: 'success' },
        { title: 'Subscription payment received', time: '1 hour ago', type: 'info' },
        { title: 'System maintenance scheduled', time: '3 hours ago', type: 'warning' },
      ].map((notification, index) => (
        <div key={index} className="p-4 border rounded-lg">
          <h3 className="font-medium">{notification.title}</h3>
          <p className="text-sm text-muted-foreground">{notification.time}</p>
        </div>
      ))}
    </div>
  </div>
);

const ProfileSection = ({ userType }: { userType: string | null }) => (
  <div className="space-y-6">
    <div className="flex items-center gap-3">
      <User className="h-6 w-6 text-blue-600" />
      <div>
        <h2 className="text-xl font-semibold">Profile Settings</h2>
        <p className="text-sm text-muted-foreground">Manage your account information</p>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">User Type</label>
          <p className="text-lg capitalize">{userType || 'Unknown'}</p>
        </div>
        <div>
          <label className="text-sm font-medium">Email</label>
          <p className="text-lg">demo@example.com</p>
        </div>
      </div>
    </div>
  </div>
);

const SettingsSection = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-3">
      <Settings className="h-6 w-6 text-blue-600" />
      <div>
        <h2 className="text-xl font-semibold">System Settings</h2>
        <p className="text-sm text-muted-foreground">Configure platform settings</p>
      </div>
    </div>
    <div className="space-y-4">
      <div className="p-4 border rounded-lg">
        <h3 className="font-medium">General Settings</h3>
        <p className="text-sm text-muted-foreground">Basic platform configuration</p>
      </div>
      <div className="p-4 border rounded-lg">
        <h3 className="font-medium">Billing Settings</h3>
        <p className="text-sm text-muted-foreground">Manage subscription and payments</p>
      </div>
    </div>
  </div>
);

const SecuritySection = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-3">
      <Shield className="h-6 w-6 text-blue-600" />
      <div>
        <h2 className="text-xl font-semibold">Security Settings</h2>
        <p className="text-sm text-muted-foreground">Manage security and access controls</p>
      </div>
    </div>
    <div className="space-y-4">
      <div className="p-4 border rounded-lg">
        <h3 className="font-medium">Two-Factor Authentication</h3>
        <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
      </div>
      <div className="p-4 border rounded-lg">
        <h3 className="font-medium">API Keys</h3>
        <p className="text-sm text-muted-foreground">Manage API access tokens</p>
      </div>
    </div>
  </div>
);
