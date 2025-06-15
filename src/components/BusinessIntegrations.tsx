
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  Search, 
  Star, 
  Calendar, 
  Mail, 
  Camera,
  Home,
  FileText,
  Truck,
  Zap,
  MessageSquare,
  Building,
  CheckCircle,
  AlertCircle,
  Settings,
  Cloud,
  Facebook
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BusinessIntegration {
  id: string;
  name: string;
  description: string;
  icon: any;
  connected: boolean;
  category: 'marketing' | 'documentation' | 'calendar' | 'supply' | 'automation' | 'reviews';
  apiKey?: string;
  webhookUrl?: string;
  features: string[];
}

export const BusinessIntegrations = () => {
  const { toast } = useToast();
  const [integrations, setIntegrations] = useState<BusinessIntegration[]>([
    {
      id: 'google-local-services',
      name: 'Google Local Services Ads',
      description: 'Manage and track local service advertisements',
      icon: Search,
      connected: false,
      category: 'marketing',
      features: ['Lead tracking', 'Ad performance', 'Local visibility']
    },
    {
      id: 'google-reviews',
      name: 'Google Reviews',
      description: 'Monitor and respond to Google Business reviews',
      icon: Star,
      connected: true,
      category: 'reviews',
      apiKey: 'goog-key-***********',
      features: ['Review monitoring', 'Response automation', 'Rating analytics']
    },
    {
      id: 'yelp-reviews',
      name: 'Yelp Reviews',
      description: 'Track and manage Yelp business reviews',
      icon: Star,
      connected: false,
      category: 'reviews',
      features: ['Review alerts', 'Business insights', 'Customer engagement']
    },
    {
      id: 'facebook-reviews',
      name: 'Facebook Reviews',
      description: 'Monitor Facebook page reviews and recommendations',
      icon: Facebook,
      connected: false,
      category: 'reviews',
      features: ['Page monitoring', 'Review responses', 'Social insights']
    },
    {
      id: 'companycam',
      name: 'CompanyCam',
      description: 'Photo documentation and project tracking',
      icon: Camera,
      connected: true,
      category: 'documentation',
      apiKey: 'cc-key-***********',
      features: ['Photo organization', 'Project timeline', 'Client sharing']
    },
    {
      id: 'hover',
      name: 'Hover',
      description: '3D property measurements and estimates',
      icon: Home,
      connected: false,
      category: 'documentation',
      features: ['3D measurements', 'Automated estimates', 'Material calculations']
    },
    {
      id: 'docusign',
      name: 'DocuSign',
      description: 'Electronic signature and document management',
      icon: FileText,
      connected: true,
      category: 'documentation',
      apiKey: 'ds-key-***********',
      features: ['E-signatures', 'Document templates', 'Workflow automation']
    },
    {
      id: 'roofr',
      name: 'Roofr',
      description: 'Roofing measurement and estimation tool',
      icon: Home,
      connected: false,
      category: 'documentation',
      features: ['Roof measurements', 'Material estimates', 'Proposal generation']
    },
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      description: 'Email marketing and customer communication',
      icon: Mail,
      connected: false,
      category: 'marketing',
      features: ['Email campaigns', 'Customer lists', 'Marketing automation']
    },
    {
      id: 'zapier',
      name: 'Zapier',
      description: 'Workflow automation between apps',
      icon: Zap,
      connected: true,
      category: 'automation',
      apiKey: 'zap-key-***********',
      features: ['App connections', 'Automated workflows', 'Data sync']
    },
    {
      id: 'srs-distribution',
      name: 'SRS Distribution',
      description: 'Building materials ordering and inventory',
      icon: Building,
      connected: false,
      category: 'supply',
      features: ['Material ordering', 'Inventory tracking', 'Pricing updates']
    },
    {
      id: 'google-calendar',
      name: 'Google Calendar',
      description: 'Calendar synchronization and scheduling',
      icon: Calendar,
      connected: true,
      category: 'calendar',
      apiKey: 'gcal-key-***********',
      features: ['Schedule sync', 'Appointment booking', 'Team calendars']
    },
    {
      id: 'microsoft-365',
      name: 'Microsoft 365',
      description: 'Office suite and calendar integration',
      icon: Calendar,
      connected: false,
      category: 'calendar',
      features: ['Outlook sync', 'Teams integration', 'Document sharing']
    },
    {
      id: 'direct-supply',
      name: 'Direct Supply Ordering',
      description: 'Direct supplier material ordering system',
      icon: Truck,
      connected: false,
      category: 'supply',
      features: ['Bulk ordering', 'Supplier network', 'Delivery tracking']
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedIntegration, setSelectedIntegration] = useState<BusinessIntegration | null>(null);
  const [apiKeyInput, setApiKeyInput] = useState('');

  const categories = [
    { id: 'all', label: 'All Integrations', count: integrations.length },
    { id: 'marketing', label: 'Marketing & Ads', count: integrations.filter(i => i.category === 'marketing').length },
    { id: 'reviews', label: 'Review Management', count: integrations.filter(i => i.category === 'reviews').length },
    { id: 'documentation', label: 'Documentation', count: integrations.filter(i => i.category === 'documentation').length },
    { id: 'calendar', label: 'Calendar & Scheduling', count: integrations.filter(i => i.category === 'calendar').length },
    { id: 'supply', label: 'Supply Chain', count: integrations.filter(i => i.category === 'supply').length },
    { id: 'automation', label: 'Automation', count: integrations.filter(i => i.category === 'automation').length }
  ];

  const filteredIntegrations = selectedCategory === 'all' 
    ? integrations 
    : integrations.filter(i => i.category === selectedCategory);

  const connectIntegration = (integrationId: string) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === integrationId 
          ? { ...integration, connected: true, apiKey: apiKeyInput || 'key-***********' }
          : integration
      )
    );
    setApiKeyInput('');
    setSelectedIntegration(null);
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
    setTimeout(() => {
      toast({
        title: "Connection Test",
        description: "Integration is working correctly",
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Business Tool Integrations</h2>
          <p className="text-muted-foreground">Connect with essential construction business tools</p>
        </div>
        <Badge className="bg-blue-100 text-blue-800">
          {integrations.filter(i => i.connected).length} / {integrations.length} Connected
        </Badge>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="setup">Setup & Configuration</TabsTrigger>
          <TabsTrigger value="webhooks">Automation Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Category Filter */}
          <Card>
            <CardHeader>
              <CardTitle>Filter by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center gap-2"
                  >
                    {category.label}
                    <Badge variant="secondary" className="ml-1">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Integrations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredIntegrations.map((integration) => {
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
                      
                      <div className="text-xs text-muted-foreground">
                        <strong>Features:</strong> {integration.features.join(', ')}
                      </div>
                      
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
                  <Label htmlFor="apiKey">API Key / Access Token</Label>
                  <Input
                    id="apiKey"
                    type="password"
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                    placeholder={`Enter your ${selectedIntegration.name} API key`}
                  />
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <p><strong>Features:</strong></p>
                  <ul className="list-disc list-inside">
                    {selectedIntegration.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
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
              <CardTitle>Automation Settings</CardTitle>
              <p className="text-sm text-muted-foreground">
                Configure automated workflows between your business tools
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {[
                  { name: 'Auto-sync photos from CompanyCam to customer portal', enabled: true },
                  { name: 'Send DocuSign contracts when estimates are approved', enabled: true },
                  { name: 'Update Google Calendar when jobs are scheduled', enabled: true },
                  { name: 'Request Google Reviews after job completion', enabled: false },
                  { name: 'Send Mailchimp campaigns to new leads', enabled: false },
                  { name: 'Auto-order materials from SRS when job starts', enabled: false }
                ].map((automation, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded">
                    <span className="text-sm">{automation.name}</span>
                    <Switch defaultChecked={automation.enabled} />
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
