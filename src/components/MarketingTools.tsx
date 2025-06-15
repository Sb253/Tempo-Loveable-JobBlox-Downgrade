import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Mail, MessageSquare, Send, Users, Calendar, Target, TrendingUp, Clock, CheckCircle, Play, Pause, Plus } from "lucide-react";

export const MarketingTools = () => {
  const { toast } = useToast();
  
  const [emailCampaigns] = useState([
    {
      id: '1',
      name: 'Welcome New Customers',
      type: 'automated',
      status: 'active',
      recipients: 156,
      openRate: '24.5%',
      clickRate: '3.2%',
      lastSent: '2024-12-10'
    },
    {
      id: '2',
      name: 'Holiday Promotion',
      type: 'manual',
      status: 'draft',
      recipients: 0,
      openRate: '-',
      clickRate: '-',
      lastSent: null
    },
    {
      id: '3',
      name: 'Project Completion Follow-up',
      type: 'automated',
      status: 'active',
      recipients: 43,
      openRate: '31.8%',
      clickRate: '5.7%',
      lastSent: '2024-12-08'
    }
  ]);

  const [textCampaigns] = useState([
    {
      id: '1',
      name: 'Appointment Reminders',
      type: 'automated',
      status: 'active',
      sent: 23,
      delivered: 22,
      responseRate: '8.7%'
    },
    {
      id: '2',
      name: 'Service Promotions',
      type: 'manual',
      status: 'active',
      sent: 89,
      delivered: 87,
      responseRate: '4.3%'
    }
  ]);

  const handleCampaignAction = (action: string, campaignId: string) => {
    toast({
      title: `Campaign ${action}`,
      description: `Campaign has been ${action.toLowerCase()}.`,
    });
  };

  const createNewCampaign = (type: 'email' | 'text') => {
    toast({
      title: "New Campaign",
      description: `Creating new ${type} campaign...`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Marketing & Growth Tools</h2>
        <div className="flex gap-2">
          <Button onClick={() => createNewCampaign('email')} className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            New Email Campaign
          </Button>
          <Button variant="outline" onClick={() => createNewCampaign('text')} className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            New Text Campaign
          </Button>
        </div>
      </div>

      {/* Marketing Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-muted-foreground">Email Subscribers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">134</p>
                <p className="text-sm text-muted-foreground">SMS Subscribers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">27.3%</p>
                <p className="text-sm text-muted-foreground">Avg Open Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">4.2%</p>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="email" className="w-full">
        <TabsList>
          <TabsTrigger value="email">Email Marketing</TabsTrigger>
          <TabsTrigger value="text">Text Marketing</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="email" className="space-y-4">
          <div className="grid gap-4">
            {emailCampaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{campaign.name}</h3>
                        <Badge variant={campaign.type === 'automated' ? 'default' : 'secondary'}>
                          {campaign.type}
                        </Badge>
                        <Badge variant={campaign.status === 'active' ? 'default' : 'outline'}>
                          {campaign.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Recipients:</span>
                          <div className="font-medium">{campaign.recipients}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Open Rate:</span>
                          <div className="font-medium">{campaign.openRate}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Click Rate:</span>
                          <div className="font-medium">{campaign.clickRate}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Last Sent:</span>
                          <div className="font-medium">
                            {campaign.lastSent ? new Date(campaign.lastSent).toLocaleDateString() : 'Never'}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      {campaign.status === 'active' ? (
                        <Button size="sm" variant="outline" onClick={() => handleCampaignAction('Paused', campaign.id)}>
                          <Pause className="h-3 w-3 mr-1" />
                          Pause
                        </Button>
                      ) : (
                        <Button size="sm" onClick={() => handleCampaignAction('Started', campaign.id)}>
                          <Play className="h-3 w-3 mr-1" />
                          Start
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      {campaign.status === 'draft' && (
                        <Button size="sm" onClick={() => handleCampaignAction('Sent', campaign.id)}>
                          <Send className="h-3 w-3 mr-1" />
                          Send
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Create Email Campaign</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Campaign Name</label>
                  <Input placeholder="Enter campaign name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Campaign Type</label>
                  <select className="w-full px-3 py-2 border rounded-md">
                    <option value="manual">One-time Send</option>
                    <option value="automated">Automated</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject Line</label>
                <Input placeholder="Enter email subject" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Content</label>
                <textarea 
                  className="w-full min-h-[150px] p-3 border rounded-md"
                  placeholder="Enter your email content..."
                />
              </div>
              <div className="flex gap-2">
                <Button>Save Draft</Button>
                <Button variant="outline">Preview</Button>
                <Button variant="outline">Send Test</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="text" className="space-y-4">
          <div className="grid gap-4">
            {textCampaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{campaign.name}</h3>
                        <Badge variant={campaign.type === 'automated' ? 'default' : 'secondary'}>
                          {campaign.type}
                        </Badge>
                        <Badge variant={campaign.status === 'active' ? 'default' : 'outline'}>
                          {campaign.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Sent:</span>
                          <div className="font-medium">{campaign.sent}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Delivered:</span>
                          <div className="font-medium">{campaign.delivered}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Response Rate:</span>
                          <div className="font-medium">{campaign.responseRate}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      {campaign.status === 'active' ? (
                        <Button size="sm" variant="outline" onClick={() => handleCampaignAction('Paused', campaign.id)}>
                          <Pause className="h-3 w-3 mr-1" />
                          Pause
                        </Button>
                      ) : (
                        <Button size="sm" onClick={() => handleCampaignAction('Started', campaign.id)}>
                          <Play className="h-3 w-3 mr-1" />
                          Start
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Create Text Campaign</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Campaign Name</label>
                  <Input placeholder="Enter campaign name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Campaign Type</label>
                  <select className="w-full px-3 py-2 border rounded-md">
                    <option value="manual">One-time Send</option>
                    <option value="automated">Automated</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message Content</label>
                <textarea 
                  className="w-full min-h-[100px] p-3 border rounded-md"
                  placeholder="Enter your text message (160 characters max)..."
                  maxLength={160}
                />
                <p className="text-xs text-muted-foreground">160 characters remaining</p>
              </div>
              <div className="flex gap-2">
                <Button>Save Draft</Button>
                <Button variant="outline">Send Test</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Marketing Automation Rules
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Welcome Email Series</h3>
                    <p className="text-sm text-muted-foreground">Send welcome emails to new customers</p>
                  </div>
                  <Badge variant="default">Active</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Project Completion Follow-up</h3>
                    <p className="text-sm text-muted-foreground">Email customers 3 days after project completion</p>
                  </div>
                  <Badge variant="default">Active</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Appointment Reminders</h3>
                    <p className="text-sm text-muted-foreground">Text reminders 24 hours before appointments</p>
                  </div>
                  <Badge variant="default">Active</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Birthday Promotions</h3>
                    <p className="text-sm text-muted-foreground">Send special offers on customer birthdays</p>
                  </div>
                  <Badge variant="outline">Inactive</Badge>
                </div>
              </div>
              
              <Button className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Create New Automation Rule
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total Campaigns</span>
                    <span className="font-semibold">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Emails Sent</span>
                    <span className="font-semibold">2,456</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Open Rate</span>
                    <span className="font-semibold text-green-600">27.3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Click Rate</span>
                    <span className="font-semibold text-blue-600">4.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Text Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total Campaigns</span>
                    <span className="font-semibold">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Messages Sent</span>
                    <span className="font-semibold">1,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Rate</span>
                    <span className="font-semibold text-green-600">98.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Response Rate</span>
                    <span className="font-semibold text-blue-600">6.1%</span>
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
