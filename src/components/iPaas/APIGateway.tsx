
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Shield, Zap, Globe, Lock, Activity } from "lucide-react";

interface APIEndpoint {
  id: string;
  name: string;
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  rateLimit: number;
  requestsToday: number;
  status: 'active' | 'inactive';
  authentication: boolean;
  lastActivity: string;
}

export const APIGateway = () => {
  const [endpoints] = useState<APIEndpoint[]>([
    {
      id: '1',
      name: 'Customer Data API',
      path: '/api/customers',
      method: 'GET',
      rateLimit: 1000,
      requestsToday: 247,
      status: 'active',
      authentication: true,
      lastActivity: '2 minutes ago'
    },
    {
      id: '2',
      name: 'Invoice Creation',
      path: '/api/invoices',
      method: 'POST',
      rateLimit: 500,
      requestsToday: 89,
      status: 'active',
      authentication: true,
      lastActivity: '15 minutes ago'
    },
    {
      id: '3',
      name: 'Project Updates',
      path: '/api/projects',
      method: 'PUT',
      rateLimit: 750,
      requestsToday: 156,
      status: 'inactive',
      authentication: true,
      lastActivity: '1 hour ago'
    }
  ]);

  const totalRequests = endpoints.reduce((sum, endpoint) => sum + endpoint.requestsToday, 0);
  const averageUsage = endpoints.reduce((sum, endpoint) => sum + (endpoint.requestsToday / endpoint.rateLimit * 100), 0) / endpoints.length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">API Gateway</h3>
        <Button>
          <Globe className="h-4 w-4 mr-2" />
          Create Endpoint
        </Button>
      </div>

      {/* Gateway Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{totalRequests}</p>
                <p className="text-sm text-muted-foreground">Requests Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{endpoints.filter(e => e.status === 'active').length}</p>
                <p className="text-sm text-muted-foreground">Active Endpoints</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">99.9%</p>
                <p className="text-sm text-muted-foreground">Uptime</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{Math.round(averageUsage)}%</p>
                <p className="text-sm text-muted-foreground">Avg Usage</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Endpoints List */}
      <Card>
        <CardHeader>
          <CardTitle>API Endpoints</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {endpoints.map((endpoint) => (
              <div key={endpoint.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Badge variant={endpoint.method === 'GET' ? 'default' : endpoint.method === 'POST' ? 'secondary' : 'outline'}>
                    {endpoint.method}
                  </Badge>
                  <div>
                    <h4 className="font-medium">{endpoint.name}</h4>
                    <p className="text-sm text-muted-foreground">{endpoint.path}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="font-medium">{endpoint.requestsToday}</p>
                    <p className="text-xs text-muted-foreground">Requests</p>
                  </div>
                  
                  <div className="w-24">
                    <Progress 
                      value={(endpoint.requestsToday / endpoint.rateLimit) * 100} 
                      className="h-2" 
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {endpoint.rateLimit} limit
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                    <Switch checked={endpoint.authentication} />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch checked={endpoint.status === 'active'} />
                    <span className="text-sm">{endpoint.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rate Limiting Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Rate Limiting & Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Global Rate Limit (per hour)</label>
              <Input type="number" defaultValue="10000" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">API Key Expiration (days)</label>
              <Input type="number" defaultValue="365" />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Enable CORS</h4>
              <p className="text-sm text-muted-foreground">Allow cross-origin requests</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Request Logging</h4>
              <p className="text-sm text-muted-foreground">Log all API requests for analytics</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
