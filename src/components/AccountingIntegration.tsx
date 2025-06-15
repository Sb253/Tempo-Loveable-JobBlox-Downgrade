import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Link, Settings, RefreshCw, CheckCircle, AlertCircle, Database } from "lucide-react";

interface Integration {
  id: string;
  name: string;
  status: 'connected' | 'disconnected' | 'error';
  lastSync: string;
  description: string;
  icon: string;
}

const availableIntegrations: Integration[] = [
  {
    id: 'quickbooks',
    name: 'QuickBooks Online',
    status: 'connected',
    lastSync: '2024-12-15 10:30 AM',
    description: 'Sync invoices, expenses, and customer data',
    icon: '📊'
  },
  {
    id: 'xero',
    name: 'Xero',
    status: 'disconnected',
    lastSync: 'Never',
    description: 'Complete accounting platform integration',
    icon: '📈'
  },
  {
    id: 'freshbooks',
    name: 'FreshBooks',
    status: 'disconnected',
    lastSync: 'Never',
    description: 'Time tracking and invoicing sync',
    icon: '📋'
  },
  {
    id: 'wave',
    name: 'Wave Accounting',
    status: 'error',
    lastSync: '2024-12-10 2:15 PM',
    description: 'Free accounting software integration',
    icon: '🌊'
  }
];

export const AccountingIntegration = () => {
  const { toast } = useToast();
  const [integrations, setIntegrations] = useState(availableIntegrations);
  const [syncSettings, setSyncSettings] = useState({
    autoSync: true,
    syncFrequency: 'daily',
    syncInvoices: true,
    syncExpenses: true,
    syncCustomers: true,
    syncPayments: true
  });

  const handleConnect = (integrationId: string) => {
    console.log(`Connecting to ${integrationId}`);
    
    setIntegrations(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { ...integration, status: 'connected' as const, lastSync: new Date().toLocaleString() }
        : integration
    ));

    toast({
      title: "Integration Connected",
      description: `Successfully connected to ${integrations.find(i => i.id === integrationId)?.name}`,
    });
  };

  const handleDisconnect = (integrationId: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { ...integration, status: 'disconnected' as const, lastSync: 'Never' }
        : integration
    ));

    toast({
      title: "Integration Disconnected",
      description: `Disconnected from ${integrations.find(i => i.id === integrationId)?.name}`,
    });
  };

  const handleSync = (integrationId: string) => {
    console.log(`Syncing ${integrationId}`);
    
    setIntegrations(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { ...integration, lastSync: new Date().toLocaleString() }
        : integration
    ));

    toast({
      title: "Sync Complete",
      description: "Data has been synchronized successfully",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Accounting Software Integration</h2>
        <Button variant="outline">
          <Settings className="h-4 w-4 mr-2" />
          Sync Settings
        </Button>
      </div>

      {/* Sync Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Synchronization Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="autoSync">Automatic Sync</Label>
              <p className="text-sm text-muted-foreground">Enable automatic data synchronization</p>
            </div>
            <Switch
              id="autoSync"
              checked={syncSettings.autoSync}
              onCheckedChange={(checked) => setSyncSettings(prev => ({ ...prev, autoSync: checked }))}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="syncInvoices"
                checked={syncSettings.syncInvoices}
                onCheckedChange={(checked) => setSyncSettings(prev => ({ ...prev, syncInvoices: checked }))}
              />
              <Label htmlFor="syncInvoices">Invoices</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="syncExpenses"
                checked={syncSettings.syncExpenses}
                onCheckedChange={(checked) => setSyncSettings(prev => ({ ...prev, syncExpenses: checked }))}
              />
              <Label htmlFor="syncExpenses">Expenses</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="syncCustomers"
                checked={syncSettings.syncCustomers}
                onCheckedChange={(checked) => setSyncSettings(prev => ({ ...prev, syncCustomers: checked }))}
              />
              <Label htmlFor="syncCustomers">Customers</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="syncPayments"
                checked={syncSettings.syncPayments}
                onCheckedChange={(checked) => setSyncSettings(prev => ({ ...prev, syncPayments: checked }))}
              />
              <Label htmlFor="syncPayments">Payments</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Integrations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((integration) => (
          <Card key={integration.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{integration.icon}</span>
                  <div>
                    <h3 className="font-semibold">{integration.name}</h3>
                    <p className="text-sm text-muted-foreground">{integration.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(integration.status)}
                  <Badge className={getStatusColor(integration.status)}>
                    {integration.status}
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm">
                <span className="text-muted-foreground">Last sync: </span>
                <span>{integration.lastSync}</span>
              </div>

              <div className="flex gap-2">
                {integration.status === 'connected' ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSync(integration.id)}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Sync Now
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDisconnect(integration.id)}
                    >
                      Disconnect
                    </Button>
                  </>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => handleConnect(integration.id)}
                  >
                    <Link className="h-4 w-4 mr-2" />
                    Connect
                  </Button>
                )}
              </div>

              {integration.status === 'error' && (
                <div className="p-2 bg-red-50 rounded text-sm text-red-700">
                  Connection error. Please check your credentials and try again.
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Data Mapping */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Data Mapping Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Invoice Account</Label>
                <Input placeholder="Select account..." />
              </div>
              <div className="space-y-2">
                <Label>Expense Account</Label>
                <Input placeholder="Select account..." />
              </div>
              <div className="space-y-2">
                <Label>Tax Rate Mapping</Label>
                <Input placeholder="Default tax rate..." />
              </div>
              <div className="space-y-2">
                <Label>Customer Class</Label>
                <Input placeholder="Default customer class..." />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sync History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Sync Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded">
              <div>
                <div className="font-medium">QuickBooks Online - Invoice Sync</div>
                <div className="text-sm text-muted-foreground">15 invoices synchronized</div>
              </div>
              <div className="text-sm text-muted-foreground">2 hours ago</div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded">
              <div>
                <div className="font-medium">QuickBooks Online - Expense Sync</div>
                <div className="text-sm text-muted-foreground">8 expenses synchronized</div>
              </div>
              <div className="text-sm text-muted-foreground">6 hours ago</div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded">
              <div>
                <div className="font-medium">QuickBooks Online - Customer Sync</div>
                <div className="text-sm text-muted-foreground">3 customers synchronized</div>
              </div>
              <div className="text-sm text-muted-foreground">1 day ago</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
