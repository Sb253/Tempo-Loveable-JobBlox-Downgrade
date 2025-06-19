
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Globe, 
  Settings, 
  Activity, 
  FileText, 
  Users, 
  Database,
  Zap,
  BarChart3,
  CheckCircle,
  Clock,
  AlertTriangle
} from "lucide-react";
import { WorkflowBuilder } from './WorkflowBuilder';
import { IntegrationTemplates } from './IntegrationTemplates';
import { APIGateway } from './APIGateway';
import { DataTransformation } from './DataTransformation';
import { IntegrationMonitoring } from './IntegrationMonitoring';

export const IPaaSManager = () => {
  const [activeWorkflows, setActiveWorkflows] = useState(12);
  const [totalIntegrations, setTotalIntegrations] = useState(8);
  const [successRate, setSuccessRate] = useState(98.5);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">iPaaS Management</h1>
          <p className="text-muted-foreground">
            Integration Platform as a Service - Manage all your workflows and integrations
          </p>
        </div>
        <Button>
          <Zap className="h-4 w-4 mr-2" />
          Create Workflow
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Activity className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{activeWorkflows}</p>
                <p className="text-sm text-muted-foreground">Active Workflows</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Globe className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{totalIntegrations}</p>
                <p className="text-sm text-muted-foreground">Integrations</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{successRate}%</p>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">1.2M</p>
                <p className="text-sm text-muted-foreground">API Calls/Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="workflows" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="gateway">API Gateway</TabsTrigger>
          <TabsTrigger value="transform">Transform</TabsTrigger>
          <TabsTrigger value="monitor">Monitor</TabsTrigger>
        </TabsList>
        
        <TabsContent value="workflows" className="space-y-4">
          <WorkflowBuilder />
        </TabsContent>
        
        <TabsContent value="templates" className="space-y-4">
          <IntegrationTemplates />
        </TabsContent>
        
        <TabsContent value="gateway" className="space-y-4">
          <APIGateway />
        </TabsContent>
        
        <TabsContent value="transform" className="space-y-4">
          <DataTransformation />
        </TabsContent>
        
        <TabsContent value="monitor" className="space-y-4">
          <IntegrationMonitoring />
        </TabsContent>
      </Tabs>
    </div>
  );
};
