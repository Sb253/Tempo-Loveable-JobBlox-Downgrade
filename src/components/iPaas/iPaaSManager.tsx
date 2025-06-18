
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WorkflowBuilder } from './WorkflowBuilder';
import { IntegrationMonitoring } from './IntegrationMonitoring';
import { IntegrationTemplates } from './IntegrationTemplates';
import { APIGateway } from './APIGateway';
import { DataTransformation } from './DataTransformation';
import { Workflow, Zap, Monitor, Template, Gateway, Database } from "lucide-react";

export const iPaaSManager = () => {
  const [activeIntegrations, setActiveIntegrations] = useState(12);
  const [totalWorkflows, setTotalWorkflows] = useState(23);
  const [successRate, setSuccessRate] = useState(98.5);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">iPaaS Manager</h2>
          <p className="text-muted-foreground">Integration Platform as a Service</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary">{activeIntegrations} Active</Badge>
          <Badge variant="default">{successRate}% Success Rate</Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Workflow className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{totalWorkflows}</p>
                <p className="text-sm text-muted-foreground">Active Workflows</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{activeIntegrations}</p>
                <p className="text-sm text-muted-foreground">Integrations</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Monitor className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{successRate}%</p>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">2.4M</p>
                <p className="text-sm text-muted-foreground">Records Synced</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="workflows" className="space-y-4">
        <TabsList>
          <TabsTrigger value="workflows">Visual Workflows</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="gateway">API Gateway</TabsTrigger>
          <TabsTrigger value="transformation">Data Transform</TabsTrigger>
        </TabsList>

        <TabsContent value="workflows">
          <WorkflowBuilder />
        </TabsContent>

        <TabsContent value="monitoring">
          <IntegrationMonitoring />
        </TabsContent>

        <TabsContent value="templates">
          <IntegrationTemplates />
        </TabsContent>

        <TabsContent value="gateway">
          <APIGateway />
        </TabsContent>

        <TabsContent value="transformation">
          <DataTransformation />
        </TabsContent>
      </Tabs>
    </div>
  );
};
