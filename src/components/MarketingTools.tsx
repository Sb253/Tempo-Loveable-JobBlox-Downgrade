
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Send, Users, TrendingUp, Eye, MousePointer, Share2, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Campaign {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'social';
  status: 'draft' | 'active' | 'completed';
  recipients: number;
  opens: number;
  clicks: number;
  created: string;
  scheduled?: string;
}

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Spring Home Renovation Specials',
    type: 'email',
    status: 'active',
    recipients: 450,
    opens: 180,
    clicks: 45,
    created: '2024-12-10',
    scheduled: '2024-12-20'
  },
  {
    id: '2',
    name: 'Holiday Service Reminders',
    type: 'sms',
    status: 'completed',
    recipients: 200,
    opens: 185,
    clicks: 25,
    created: '2024-12-05'
  },
  {
    id: '3',
    name: 'Customer Testimonials Campaign',
    type: 'social',
    status: 'draft',
    recipients: 0,
    opens: 0,
    clicks: 0,
    created: '2024-12-15'
  }
];

export const MarketingTools = () => {
  const { toast } = useToast();
  const [campaigns] = useState<Campaign[]>(mockCampaigns);
  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    type: 'email',
    subject: '',
    content: '',
    audience: 'all'
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return Mail;
      case 'sms': return Send;
      case 'social': return Share2;
      default: return Mail;
    }
  };

  const handleCreateCampaign = () => {
    console.log('Creating new campaign:', newCampaign);
    toast({
      title: "Campaign Created",
      description: `${newCampaign.name} has been created successfully.`,
    });
    setShowNewCampaign(false);
    setNewCampaign({ name: '', type: 'email', subject: '', content: '', audience: 'all' });
  };

  const totalRecipients = campaigns.reduce((sum, campaign) => sum + campaign.recipients, 0);
  const totalOpens = campaigns.reduce((sum, campaign) => sum + campaign.opens, 0);
  const totalClicks = campaigns.reduce((sum, campaign) => sum + campaign.clicks, 0);
  const avgOpenRate = totalRecipients > 0 ? (totalOpens / totalRecipients * 100).toFixed(1) : '0';
  const avgClickRate = totalOpens > 0 ? (totalClicks / totalOpens * 100).toFixed(1) : '0';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Marketing Tools</h2>
        <Button onClick={() => setShowNewCampaign(true)} className="flex items-center gap-2">
          <Send className="h-4 w-4" />
          New Campaign
        </Button>
      </div>

      {/* Marketing Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Recipients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRecipients.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Open Rate</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgOpenRate}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Click Rate</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgClickRate}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {campaigns.filter(c => c.status === 'active').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Marketing Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
              <Mail className="h-6 w-6" />
              <span>Email Newsletter</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
              <Send className="h-6 w-6" />
              <span>SMS Promotions</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
              <Share2 className="h-6 w-6" />
              <span>Social Media</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
              <Calendar className="h-6 w-6" />
              <span>Seasonal Campaigns</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Campaign Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">Service Reminder</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Remind customers about upcoming maintenance or seasonal services.
              </p>
              <Button variant="outline" size="sm">Use Template</Button>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">Special Promotion</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Announce special offers and discounts to your customer base.
              </p>
              <Button variant="outline" size="sm">Use Template</Button>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">Project Showcase</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Share recent project photos and customer testimonials.
              </p>
              <Button variant="outline" size="sm">Use Template</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Campaigns */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaigns.map((campaign) => {
              const IconComponent = getTypeIcon(campaign.type);
              const openRate = campaign.recipients > 0 ? (campaign.opens / campaign.recipients * 100).toFixed(1) : '0';
              const clickRate = campaign.opens > 0 ? (campaign.clicks / campaign.opens * 100).toFixed(1) : '0';

              return (
                <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <IconComponent className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">{campaign.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getStatusColor(campaign.status)}>
                          {campaign.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {new Date(campaign.created).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="font-medium">{campaign.recipients}</p>
                        <p className="text-muted-foreground">Recipients</p>
                      </div>
                      <div>
                        <p className="font-medium">{openRate}%</p>
                        <p className="text-muted-foreground">Open Rate</p>
                      </div>
                      <div>
                        <p className="font-medium">{clickRate}%</p>
                        <p className="text-muted-foreground">Click Rate</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* New Campaign Dialog */}
      {showNewCampaign && (
        <Dialog open={true} onOpenChange={setShowNewCampaign}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Marketing Campaign</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="campaignName">Campaign Name *</Label>
                <Input
                  id="campaignName"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter campaign name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="campaignType">Campaign Type *</Label>
                <Select value={newCampaign.type} onValueChange={(value) => setNewCampaign(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select campaign type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email Campaign</SelectItem>
                    <SelectItem value="sms">SMS Campaign</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="audience">Target Audience *</Label>
                <Select value={newCampaign.audience} onValueChange={(value) => setNewCampaign(prev => ({ ...prev, audience: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Customers</SelectItem>
                    <SelectItem value="active">Active Customers</SelectItem>
                    <SelectItem value="prospects">Prospects</SelectItem>
                    <SelectItem value="custom">Custom Segment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {newCampaign.type === 'email' && (
                <div className="space-y-2">
                  <Label htmlFor="subject">Email Subject *</Label>
                  <Input
                    id="subject"
                    value={newCampaign.subject}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="Enter email subject"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={newCampaign.content}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Enter campaign content"
                  rows={6}
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setShowNewCampaign(false)}>
                  Cancel
                </Button>
                <Button variant="outline">
                  Save Draft
                </Button>
                <Button onClick={handleCreateCampaign}>
                  Create & Send
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
