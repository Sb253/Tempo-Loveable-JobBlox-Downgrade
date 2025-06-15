
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  Cloud, 
  Key, 
  Zap, 
  Mail, 
  CreditCard, 
  MapPin, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Settings
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: any;
  connected: boolean;
  apiKey?: string;
  webhookUrl?: string;
}

export const APIIntegrations = () => {
  const { toast } = useToast();
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Payment processing and billing',
      icon: CreditCard,
      connected: false,
    },
    {
      id: 'mailgun',
      name: 'Mailgun',
      description: 'Email delivery and notifications',
      icon: Mail,
      connected: true,
      apiKey: 'mg-key-***********'
    },
    {
      id: 'zapier',
      name: 'Zapier',
      description: 'Workflow automation',
      icon: Zap,
      connected: false,
    },
    {
      id: 'google-maps',
      name: 'Google Maps',
      description: 'Location services and routing',
      icon: MapPin,
      connected: true,
      apiKey: 'AIza***********'
    },
    {
      id: 'google-calendar',
      name: 'Google Calendar',
      description: 'Calendar synchronization',
      icon: Calendar,
      connected: false,
    }
  ]);

  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [webhookInput, setWebhookInput] = useState('');

  const connectIntegration = (integrationId: string) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === integrationId 
          ? { ...integration, connected: true, apiKey: apiKeyInput || 'key-***********' }
          : integration
      )
    );
    setApiKeyInput('');
    toast({
      title: "Integration Connected",
      description: `Successfully connected to ${integrations.find(i => i.id === integrationId)?.name}`,
    });
  };

  const disconnectIntegration = (integrationId: string) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === integrationId 
          ? { ...integration, connected: false, apiKey: undefined }
          : integration
      )
    );
    toast({
      title: "Integration Disconnected",
      description: `Disconnected from ${integrations.find(i => i.id === integrationId)?.name}`,
    });
  };

  const testConnection = async (integrationId: string) => {
    // Simulate API test
    setTimeout(() => {
      toast({
        title: "Connection Test",
        description: "API connection is working correctly",
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">API Integrations</h2>
        <Badge className="bg-blue-100 text-blue-800">
          {integrations.filter(i => i.connected).length} / {integrations.length} Connected
        </Badge>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="setup">Setup & Configuration</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="logs">API Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations.map((integration) => {
              const IconComponent = integration.icon;
              return (
                <Card key={integration.id} className="relative">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <IconComponent className="h-8 w-8 text-blue-600" />
                        <div>
                          <CardTitle className="text-lg">{integration.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {integration.description}
                          </p>
                        </div>
                      </div>
                      {integration.connected ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Badge 
                        className={integration.connected 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                        }
                      >
                        {integration.connected ? "Connected" : "Not Connected"}
                      </Badge>
                      
                      {integration.connected ? (
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => testConnection(integration.id)}
                            className="flex-1"
                          >
                            Test
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            onClick={() => disconnectIntegration(integration.id)}
                            className="flex-1"
                          >
                            Disconnect
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          size="sm" 
                          onClick={() => setSelectedIntegration(integration)}
                          className="w-full"
                        >
                          Connect
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="setup" className="space-y-4">
          {selectedIntegration ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <selectedIntegration.icon className="h-5 w-5" />
                  Setup {selectedIntegration.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="apiKey">API Key</Label>
                  <Input
                    id="apiKey"
                    type="password"
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                    placeholder={`Enter your ${selectedIntegration.name} API key`}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={() => connectIntegration(selectedIntegration.id)}
                    disabled={!apiKeyInput}
                  >
                    Connect
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedIntegration(null)}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Select an integration from the Overview tab to configure it
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Webhook Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="webhookUrl">Webhook URL</Label>
                <Input
                  id="webhookUrl"
                  value={webhookInput}
                  onChange={(e) => setWebhookInput(e.target.value)}
                  placeholder="https://your-app.com/webhooks/construction-crm"
                />
              </div>

              <div className="space-y-2">
                <Label>Webhook Events</Label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'customer.created',
                    'job.completed',
                    'payment.received',
                    'estimate.approved',
                    'schedule.updated',
                    'team.location_update'
                  ].map(event => (
                    <div key={event} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">{event}</span>
                      <Switch defaultChecked />
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full">Save Webhook Configuration</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Activity Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { time: '2:30 PM', api: 'Stripe', action: 'Payment processed', status: 'success' },
                  { time: '2:15 PM', api: 'Google Maps', action: 'Route calculated', status: 'success' },
                  { time: '1:45 PM', api: 'Mailgun', action: 'Email sent', status: 'success' },
                  { time: '1:30 PM', api: 'Zapier', action: 'Workflow triggered', status: 'error' },
                  { time: '12:00 PM', api: 'Google Calendar', action: 'Event created', status: 'success' }
                ].map((log, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        log.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                      }`} />
                      <div>
                        <div className="font-medium">{log.api}</div>
                        <div className="text-sm text-muted-foreground">{log.action}</div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">{log.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
