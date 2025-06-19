import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, Clock, XCircle, RefreshCw } from "lucide-react";

interface IntegrationStatus {
  id: string;
  name: string;
  status: 'healthy' | 'warning' | 'error' | 'syncing';
  lastSync: string;
  recordsProcessed: number;
  errorCount: number;
  performance: number;
}

export const IntegrationMonitoring = () => {
  const [integrations] = useState<IntegrationStatus[]>([
    {
      id: '1',
      name: 'QuickBooks → CRM Sync',
      status: 'healthy',
      lastSync: '2 minutes ago',
      recordsProcessed: 1247,
      errorCount: 0,
      performance: 98
    },
    {
      id: '2',
      name: 'Email Marketing Integration',
      status: 'warning',
      lastSync: '15 minutes ago',
      recordsProcessed: 523,
      errorCount: 3,
      performance: 85
    },
    {
      id: '3',
      name: 'Payment Gateway Sync',
      status: 'syncing',
      lastSync: 'In progress',
      recordsProcessed: 89,
      errorCount: 0,
      performance: 92
    },
    {
      id: '4',
      name: 'Document Management',
      status: 'error',
      lastSync: '2 hours ago',
      recordsProcessed: 0,
      errorCount: 12,
      performance: 45
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'error': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'syncing': return <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'default';
      case 'warning': return 'secondary';
      case 'error': return 'destructive';
      case 'syncing': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Integration Monitoring</h3>
        <Button variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh All
        </Button>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {integrations.filter(i => i.status === 'healthy').length}
              </p>
              <p className="text-sm text-muted-foreground">Healthy</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {integrations.filter(i => i.status === 'warning').length}
              </p>
              <p className="text-sm text-muted-foreground">Warnings</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">
                {integrations.filter(i => i.status === 'error').length}
              </p>
              <p className="text-sm text-muted-foreground">Errors</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {integrations.reduce((sum, i) => sum + i.recordsProcessed, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Records Today</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Integration Status List */}
      <div className="space-y-4">
        {integrations.map((integration) => (
          <Card key={integration.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(integration.status)}
                  <div>
                    <h4 className="font-medium">{integration.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Last sync: {integration.lastSync}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium">{integration.recordsProcessed.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Records processed</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{integration.errorCount}</p>
                    <p className="text-sm text-muted-foreground">Errors</p>
                  </div>
                  <div className="w-24">
                    <Progress value={integration.performance} className="h-2" />
                    <p className="text-sm text-muted-foreground mt-1">
                      {integration.performance}% performance
                    </p>
                  </div>
                  <Badge variant={getStatusColor(integration.status) as any}>
                    {integration.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
