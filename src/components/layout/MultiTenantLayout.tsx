
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

// Enhanced placeholder components for missing sections
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
      {[
        { name: 'Slack', description: 'Team communication', status: 'available' },
        { name: 'Microsoft Teams', description: 'Video conferencing', status: 'available' },
        { name: 'Zapier', description: 'Workflow automation', status: 'connected' },
        { name: 'QuickBooks', description: 'Accounting software', status: 'available' },
        { name: 'Salesforce', description: 'CRM platform', status: 'available' },
        { name: 'HubSpot', description: 'Marketing automation', status: 'connected' }
      ].map((integration) => (
        <div key={integration.name} className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">{integration.name}</h3>
            <span className={`text-xs px-2 py-1 rounded ${
              integration.status === 'connected' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              {integration.status}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{integration.description}</p>
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
        { title: 'New client signed up', time: '2 minutes ago', type: 'success', read: false },
        { title: 'Subscription payment received', time: '1 hour ago', type: 'info', read: false },
        { title: 'System maintenance scheduled', time: '3 hours ago', type: 'warning', read: true },
        { title: 'Weekly report generated', time: '1 day ago', type: 'info', read: true },
        { title: 'Client feedback received', time: '2 days ago', type: 'success', read: true },
      ].map((notification, index) => (
        <div key={index} className={`p-4 border rounded-lg transition-colors ${
          !notification.read ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-medium">{notification.title}</h3>
              <p className="text-sm text-muted-foreground">{notification.time}</p>
            </div>
            {!notification.read && (
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
            )}
          </div>
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
        <div className="p-4 border rounded-lg">
          <label className="text-sm font-medium text-muted-foreground">User Type</label>
          <p className="text-lg font-medium capitalize">{userType || 'Unknown'}</p>
        </div>
        <div className="p-4 border rounded-lg">
          <label className="text-sm font-medium text-muted-foreground">Email</label>
          <p className="text-lg">demo@example.com</p>
        </div>
        <div className="p-4 border rounded-lg">
          <label className="text-sm font-medium text-muted-foreground">Company</label>
          <p className="text-lg">Acme Construction Co.</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="p-4 border rounded-lg">
          <label className="text-sm font-medium text-muted-foreground">Last Login</label>
          <p className="text-lg">Today at 2:30 PM</p>
        </div>
        <div className="p-4 border rounded-lg">
          <label className="text-sm font-medium text-muted-foreground">Account Status</label>
          <p className="text-lg text-green-600 font-medium">Active</p>
        </div>
        <div className="p-4 border rounded-lg">
          <label className="text-sm font-medium text-muted-foreground">Plan</label>
          <p className="text-lg">Professional</p>
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors">
        <h3 className="font-medium mb-2">General Settings</h3>
        <p className="text-sm text-muted-foreground">Basic platform configuration and preferences</p>
      </div>
      <div className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors">
        <h3 className="font-medium mb-2">Billing Settings</h3>
        <p className="text-sm text-muted-foreground">Manage subscription and payment methods</p>
      </div>
      <div className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors">
        <h3 className="font-medium mb-2">Team Management</h3>
        <p className="text-sm text-muted-foreground">Add and manage team members</p>
      </div>
      <div className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors">
        <h3 className="font-medium mb-2">API Configuration</h3>
        <p className="text-sm text-muted-foreground">Manage API keys and webhooks</p>
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors">
        <h3 className="font-medium mb-2">Two-Factor Authentication</h3>
        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
        <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded mt-2 inline-block">Not Enabled</span>
      </div>
      <div className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors">
        <h3 className="font-medium mb-2">API Keys</h3>
        <p className="text-sm text-muted-foreground">Manage API access tokens and permissions</p>
        <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded mt-2 inline-block">2 Active Keys</span>
      </div>
      <div className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors">
        <h3 className="font-medium mb-2">Login History</h3>
        <p className="text-sm text-muted-foreground">View recent login activity and sessions</p>
      </div>
      <div className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors">
        <h3 className="font-medium mb-2">Data Export</h3>
        <p className="text-sm text-muted-foreground">Download your account data and settings</p>
      </div>
    </div>
  </div>
);
