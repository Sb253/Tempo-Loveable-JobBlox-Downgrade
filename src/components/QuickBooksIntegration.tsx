
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, DollarSign, FileText, Sync, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const QuickBooksIntegration = () => {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [syncSettings, setSyncSettings] = useState({
    autoSyncInvoices: true,
    autoSyncPayments: true,
    autoSyncExpenses: true,
    autoSyncCustomers: false,
  });
  const [apiKey, setApiKey] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    if (!apiKey || !companyId) {
      toast({
        title: "Missing Information",
        description: "Please provide both API key and Company ID",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulate API connection
    setTimeout(() => {
      setIsConnected(true);
      setIsLoading(false);
      toast({
        title: "QuickBooks Connected",
        description: "Successfully connected to QuickBooks Online",
      });
    }, 2000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setApiKey('');
    setCompanyId('');
    toast({
      title: "Disconnected",
      description: "QuickBooks integration has been disabled",
    });
  };

  const handleSync = async () => {
    setIsLoading(true);
    // Simulate sync process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Sync Complete",
        description: "All data has been synchronized with QuickBooks",
      });
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">QuickBooks Integration</h2>
        <Badge className={isConnected ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
          {isConnected ? (
            <>
              <CheckCircle className="h-3 w-3 mr-1" />
              Connected
            </>
          ) : (
            <>
              <AlertCircle className="h-3 w-3 mr-1" />
              Not Connected
            </>
          )}
        </Badge>
      </div>

      {/* Connection Setup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Connection Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isConnected ? (
            <>
              <div>
                <Label htmlFor="apiKey">QuickBooks API Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your QuickBooks API key"
                />
              </div>
              <div>
                <Label htmlFor="companyId">Company ID</Label>
                <Input
                  id="companyId"
                  value={companyId}
                  onChange={(e) => setCompanyId(e.target.value)}
                  placeholder="Enter your QuickBooks Company ID"
                />
              </div>
              <Button onClick={handleConnect} disabled={isLoading} className="w-full">
                {isLoading ? "Connecting..." : "Connect to QuickBooks"}
              </Button>
            </>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Status: Connected to QuickBooks Online</span>
                <Button variant="outline" onClick={handleDisconnect}>
                  Disconnect
                </Button>
              </div>
              <Button onClick={handleSync} disabled={isLoading} className="w-full">
                <Sync className="h-4 w-4 mr-2" />
                {isLoading ? "Syncing..." : "Sync Now"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sync Settings */}
      {isConnected && (
        <Card>
          <CardHeader>
            <CardTitle>Sync Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="invoices">Auto-sync Invoices</Label>
              <Switch
                id="invoices"
                checked={syncSettings.autoSyncInvoices}
                onCheckedChange={(checked) => 
                  setSyncSettings(prev => ({ ...prev, autoSyncInvoices: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="payments">Auto-sync Payments</Label>
              <Switch
                id="payments"
                checked={syncSettings.autoSyncPayments}
                onCheckedChange={(checked) => 
                  setSyncSettings(prev => ({ ...prev, autoSyncPayments: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="expenses">Auto-sync Expenses</Label>
              <Switch
                id="expenses"
                checked={syncSettings.autoSyncExpenses}
                onCheckedChange={(checked) => 
                  setSyncSettings(prev => ({ ...prev, autoSyncExpenses: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="customers">Auto-sync Customers</Label>
              <Switch
                id="customers"
                checked={syncSettings.autoSyncCustomers}
                onCheckedChange={(checked) => 
                  setSyncSettings(prev => ({ ...prev, autoSyncCustomers: checked }))
                }
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sync Summary */}
      {isConnected && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Invoices Synced</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">142</div>
              <p className="text-xs text-muted-foreground">Last sync: 2 hours ago</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Payments Synced</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">Last sync: 1 hour ago</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expenses Synced</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">67</div>
              <p className="text-xs text-muted-foreground">Last sync: 30 min ago</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
