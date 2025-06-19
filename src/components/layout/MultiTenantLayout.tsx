
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Users, CreditCard, Settings, BarChart3, Globe } from "lucide-react";
import { TenantDashboard } from './TenantDashboard';
import { SubscriptionManager } from '../subscription/SubscriptionManager';
import { ClientManagement } from '../tenant/ClientManagement';
import { DemoTrialManager } from '../demo/DemoTrialManager';

interface Tenant {
  id: string;
  name: string;
  plan: 'demo' | 'basic' | 'professional' | 'enterprise';
  status: 'active' | 'trial' | 'suspended' | 'cancelled';
  clientCount: number;
  subscriptionEnd?: string;
  trialEnd?: string;
}

export const MultiTenantLayout = () => {
  const [tenants, setTenants] = useState<Tenant[]>([
    {
      id: '1',
      name: 'Acme Corporation',
      plan: 'professional',
      status: 'active',
      clientCount: 15,
      subscriptionEnd: '2024-12-31'
    },
    {
      id: '2',
      name: 'StartupXYZ',
      plan: 'demo',
      status: 'trial',
      clientCount: 3,
      trialEnd: '2024-07-15'
    },
    {
      id: '3',
      name: 'Enterprise Solutions',
      plan: 'enterprise',
      status: 'active',
      clientCount: 50,
      subscriptionEnd: '2024-11-30'
    }
  ]);

  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'demo': return 'bg-yellow-100 text-yellow-800';
      case 'basic': return 'bg-blue-100 text-blue-800';
      case 'professional': return 'bg-green-100 text-green-800';
      case 'enterprise': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'trial': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-semibold">Multi-Tenant SaaS Platform</h1>
                <p className="text-sm text-muted-foreground">Advanced Client & Subscription Management</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-green-50 text-green-700">
                {tenants.filter(t => t.status === 'active').length} Active Tenants
              </Badge>
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                {tenants.filter(t => t.status === 'trial').length} Trial Users
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedTenant ? (
          <div className="space-y-6">
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold">{tenants.length}</p>
                      <p className="text-sm text-muted-foreground">Total Tenants</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Users className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold">
                        {tenants.reduce((sum, t) => sum + t.clientCount, 0)}
                      </p>
                      <p className="text-sm text-muted-foreground">Total Clients</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-8 w-8 text-purple-600" />
                    <div>
                      <p className="text-2xl font-bold">
                        {tenants.filter(t => t.status === 'active').length}
                      </p>
                      <p className="text-sm text-muted-foreground">Paying Customers</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="h-8 w-8 text-orange-600" />
                    <div>
                      <p className="text-2xl font-bold">$12,450</p>
                      <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tenants List */}
            <Card>
              <CardHeader>
                <CardTitle>Tenant Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tenants.map((tenant) => (
                    <div
                      key={tenant.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedTenant(tenant)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Building2 className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{tenant.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {tenant.clientCount} clients
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getPlanColor(tenant.plan)}>
                          {tenant.plan.charAt(0).toUpperCase() + tenant.plan.slice(1)}
                        </Badge>
                        <Badge className={getStatusColor(tenant.status)}>
                          {tenant.status.charAt(0).toUpperCase() + tenant.status.slice(1)}
                        </Badge>
                        {tenant.trialEnd && (
                          <span className="text-sm text-muted-foreground">
                            Trial ends: {tenant.trialEnd}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Demo Trial Section */}
            <DemoTrialManager />
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setSelectedTenant(null)}
                >
                  ← Back to Overview
                </Button>
                <div>
                  <h2 className="text-2xl font-bold">{selectedTenant.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={getPlanColor(selectedTenant.plan)}>
                      {selectedTenant.plan.charAt(0).toUpperCase() + selectedTenant.plan.slice(1)}
                    </Badge>
                    <Badge className={getStatusColor(selectedTenant.status)}>
                      {selectedTenant.status.charAt(0).toUpperCase() + selectedTenant.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="clients">Clients</TabsTrigger>
                <TabsTrigger value="subscription">Subscription</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <TenantDashboard tenant={selectedTenant} />
              </TabsContent>

              <TabsContent value="clients">
                <ClientManagement tenantId={selectedTenant.id} />
              </TabsContent>

              <TabsContent value="subscription">
                <SubscriptionManager tenant={selectedTenant} />
              </TabsContent>

              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Tenant Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Tenant configuration settings will be implemented here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};
