
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { 
  Globe, 
  Facebook, 
  MessageCircle, 
  Star, 
  Phone, 
  Mail, 
  Calendar,
  User,
  TrendingUp,
  Settings,
  Plus,
  CheckCircle,
  AlertCircle,
  ExternalLink
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  value: number;
  notes: string;
  createdAt: string;
}

interface Integration {
  id: string;
  name: string;
  icon: any;
  connected: boolean;
  description: string;
  leads: number;
}

export const LeadGeneration = () => {
  const { toast } = useToast();
  
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'google',
      name: 'Google My Business',
      icon: Globe,
      connected: true,
      description: 'Capture leads from Google searches and maps',
      leads: 45
    },
    {
      id: 'facebook',
      name: 'Facebook Business',
      icon: Facebook,
      connected: true,
      description: 'Lead ads and page inquiries',
      leads: 23
    },
    {
      id: 'yelp',
      name: 'Yelp Business',
      icon: Star,
      connected: false,
      description: 'Customer inquiries from Yelp',
      leads: 0
    }
  ]);

  const [leads] = useState<Lead[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john@email.com',
      phone: '(555) 123-4567',
      source: 'Google My Business',
      status: 'new',
      value: 5000,
      notes: 'Kitchen renovation project',
      createdAt: '2024-12-10'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@email.com',
      phone: '(555) 987-6543',
      source: 'Facebook',
      status: 'contacted',
      value: 8500,
      notes: 'Bathroom remodel inquiry',
      createdAt: '2024-12-09'
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike@email.com',
      phone: '(555) 456-7890',
      source: 'Website Chat',
      status: 'qualified',
      value: 12000,
      notes: 'Full home renovation',
      createdAt: '2024-12-08'
    }
  ]);

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [pipelineStages] = useState([
    { id: 'new', name: 'New Leads', count: 12, color: 'blue' },
    { id: 'contacted', name: 'Contacted', count: 8, color: 'yellow' },
    { id: 'qualified', name: 'Qualified', count: 5, color: 'green' },
    { id: 'converted', name: 'Converted', count: 15, color: 'purple' },
    { id: 'lost', name: 'Lost', count: 3, color: 'red' }
  ]);

  const connectIntegration = (integrationId: string) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === integrationId 
          ? { ...integration, connected: true }
          : integration
      )
    );
    toast({
      title: "Integration Connected",
      description: `Successfully connected to ${integrations.find(i => i.id === integrationId)?.name}`,
    });
  };

  const updateLeadStatus = (leadId: string, newStatus: Lead['status']) => {
    toast({
      title: "Lead Updated",
      description: `Lead status updated to ${newStatus}`,
    });
  };

  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'qualified': return 'bg-green-100 text-green-800';
      case 'converted': return 'bg-purple-100 text-purple-800';
      case 'lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Lead Generation & Pipeline</h2>
        <div className="flex gap-2">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Manual Lead
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Pipeline Settings
          </Button>
        </div>
      </div>

      {/* Lead Generation Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">68</p>
                <p className="text-sm text-muted-foreground">Total Leads</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">15</p>
                <p className="text-sm text-muted-foreground">Converted This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">$125k</p>
                <p className="text-sm text-muted-foreground">Pipeline Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">22%</p>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pipeline" className="w-full">
        <TabsList>
          <TabsTrigger value="pipeline">Pipeline Management</TabsTrigger>
          <TabsTrigger value="integrations">Lead Sources</TabsTrigger>
          <TabsTrigger value="website">Website Integration</TabsTrigger>
          <TabsTrigger value="analytics">Lead Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="pipeline" className="space-y-6">
          {/* Pipeline Stages */}
          <div className="grid grid-cols-5 gap-4">
            {pipelineStages.map((stage) => (
              <Card key={stage.id} className="border-2">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">{stage.name}</CardTitle>
                    <Badge className={`bg-${stage.color}-100 text-${stage.color}-800`}>
                      {stage.count}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {leads
                    .filter(lead => lead.status === stage.id)
                    .slice(0, 3)
                    .map((lead) => (
                      <div 
                        key={lead.id}
                        className="p-3 border rounded-lg cursor-pointer hover:bg-accent"
                        onClick={() => setSelectedLead(lead)}
                      >
                        <div className="font-medium text-sm">{lead.name}</div>
                        <div className="text-xs text-muted-foreground">{lead.source}</div>
                        <div className="text-xs font-medium">${lead.value.toLocaleString()}</div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Lead Details */}
          {selectedLead && (
            <Card>
              <CardHeader>
                <CardTitle>Lead Details - {selectedLead.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Contact Information</label>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span className="text-sm">{selectedLead.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span className="text-sm">{selectedLead.phone}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Lead Details</label>
                    <div className="space-y-2 mt-2">
                      <div className="text-sm">Source: {selectedLead.source}</div>
                      <div className="text-sm">Value: ${selectedLead.value.toLocaleString()}</div>
                      <Badge className={getStatusColor(selectedLead.status)}>
                        {selectedLead.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Notes</label>
                  <p className="text-sm mt-1">{selectedLead.notes}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => updateLeadStatus(selectedLead.id, 'contacted')}>
                    Mark as Contacted
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => updateLeadStatus(selectedLead.id, 'qualified')}>
                    Qualify Lead
                  </Button>
                  <Button size="sm" variant="outline">
                    Create Job
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {integrations.map((integration) => {
              const IconComponent = integration.icon;
              return (
                <Card key={integration.id}>
                  <CardHeader>
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
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Leads Generated</span>
                        <span className="font-semibold">{integration.leads}</span>
                      </div>
                      
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
                          <Button size="sm" variant="outline" className="flex-1">
                            <Settings className="h-3 w-3 mr-1" />
                            Configure
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          size="sm" 
                          onClick={() => connectIntegration(integration.id)}
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

          <Card>
            <CardHeader>
              <CardTitle>Add New Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Integration Name</label>
                  <Input placeholder="Enter integration name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">API Endpoint</label>
                  <Input placeholder="Enter API endpoint URL" />
                </div>
              </div>
              <Button className="mt-4">Add Integration</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="website" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Website Chat Integration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Live Chat Widget</h3>
                  <p className="text-sm text-muted-foreground">Enable chat on your website</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Chat Widget Settings</label>
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Welcome message" defaultValue="How can we help you today?" />
                  <select className="w-full px-3 py-2 border rounded-md">
                    <option>Bottom Right</option>
                    <option>Bottom Left</option>
                    <option>Top Right</option>
                    <option>Top Left</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Embed Code</label>
                <textarea 
                  className="w-full min-h-[100px] p-3 border rounded-md font-mono text-xs"
                  readOnly
                  value={`<!-- Construction CRM Chat Widget -->
<script>
  (function() {
    var script = document.createElement('script');
    script.src = 'https://your-domain.com/chat-widget.js';
    script.async = true;
    document.head.appendChild(script);
  })();
</script>`}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Online Booking Integration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Online Booking Widget</h3>
                  <p className="text-sm text-muted-foreground">Allow customers to book appointments online</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Booking Page URL</label>
                <Input value="https://your-domain.com/book-appointment" readOnly />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Available Services</label>
                <div className="space-y-2">
                  {['Consultation', 'Kitchen Renovation', 'Bathroom Remodel', 'General Repair'].map(service => (
                    <div key={service} className="flex items-center justify-between">
                      <span className="text-sm">{service}</span>
                      <Switch defaultChecked />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Lead Source Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Google My Business</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">45 leads</span>
                      <div className="w-20 h-2 bg-gray-200 rounded">
                        <div className="w-3/4 h-full bg-blue-500 rounded"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Facebook</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">23 leads</span>
                      <div className="w-20 h-2 bg-gray-200 rounded">
                        <div className="w-1/2 h-full bg-green-500 rounded"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Website Chat</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">12 leads</span>
                      <div className="w-20 h-2 bg-gray-200 rounded">
                        <div className="w-1/4 h-full bg-purple-500 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conversion Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Lead to Contact</span>
                    <span className="font-semibold text-green-600">85%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Contact to Qualified</span>
                    <span className="font-semibold text-blue-600">62%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Qualified to Converted</span>
                    <span className="font-semibold text-purple-600">45%</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>Overall Conversion</span>
                    <span className="font-semibold text-orange-600">22%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
