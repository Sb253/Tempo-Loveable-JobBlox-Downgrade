
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Star, MessageSquare, Share2, Send, ThumbsUp, AlertCircle, TrendingUp, Mail, Clock, Calendar, Users, Target } from "lucide-react";

export const ReviewManagement = () => {
  const { toast } = useToast();
  const [reviews] = useState([
    {
      id: '1',
      customer: 'John Smith',
      avatar: '/placeholder.svg',
      rating: 5,
      title: 'Excellent kitchen renovation!',
      text: 'The team did an amazing job on our kitchen renovation. Professional, timely, and the quality exceeded our expectations.',
      date: '2024-12-10',
      platform: 'Google',
      status: 'published',
      response: null
    },
    {
      id: '2',
      customer: 'Sarah Johnson',
      avatar: '/placeholder.svg',
      rating: 4,
      title: 'Great work on bathroom remodel',
      text: 'Very satisfied with the bathroom remodel. The only minor issue was a slight delay in completion.',
      date: '2024-12-08',
      platform: 'Yelp',
      status: 'published',
      response: 'Thank you for your feedback! We apologize for the delay and appreciate your patience.'
    },
    {
      id: '3',
      customer: 'Mike Wilson',
      avatar: '/placeholder.svg',
      rating: 2,
      title: 'Had some issues with communication',
      text: 'The work quality was decent but communication could have been better. Felt left out of the loop sometimes.',
      date: '2024-12-05',
      platform: 'Facebook',
      status: 'needs_response',
      response: null
    }
  ]);

  const [reputationStats] = useState({
    averageRating: 4.3,
    totalReviews: 127,
    fiveStars: 78,
    fourStars: 32,
    threeStars: 12,
    twoStars: 3,
    oneStar: 2,
    responseRate: 85,
    averageResponseTime: '2.3 hours'
  });

  const [automationSettings, setAutomationSettings] = useState({
    autoRequestEnabled: true,
    requestDelay: 7, // days after job completion
    reminderEnabled: true,
    reminderInterval: 3, // days
    maxReminders: 2
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleSendResponse = (reviewId: string) => {
    toast({
      title: "Response Sent",
      description: "Your response has been posted to the review.",
    });
  };

  const requestReview = () => {
    toast({
      title: "Review Request Sent",
      description: "Review request email has been sent to recent customers.",
    });
  };

  const handleAutomationToggle = (setting: string) => {
    setAutomationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
    toast({
      title: "Settings Updated",
      description: "Automation settings have been saved.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Review & Reputation Management</h2>
        <Button onClick={requestReview} className="flex items-center gap-2">
          <Send className="h-4 w-4" />
          Request Reviews
        </Button>
      </div>

      {/* Reputation Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">{reputationStats.averageRating}</p>
                <p className="text-sm text-muted-foreground">Average Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{reputationStats.totalReviews}</p>
                <p className="text-sm text-muted-foreground">Total Reviews</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <ThumbsUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{reputationStats.responseRate}%</p>
                <p className="text-sm text-muted-foreground">Response Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{reputationStats.averageResponseTime}</p>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="reviews" className="w-full">
        <TabsList>
          <TabsTrigger value="reviews">Recent Reviews</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="requests">Review Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="reviews" className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={review.avatar} />
                    <AvatarFallback>{review.customer.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">{review.customer}</h3>
                        <div className="flex items-center gap-2">
                          <div className="flex">{renderStars(review.rating)}</div>
                          <Badge variant="outline">{review.platform}</Badge>
                          <Badge variant={
                            review.status === 'needs_response' ? 'destructive' : 
                            review.status === 'published' ? 'default' : 'secondary'
                          }>
                            {review.status.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>

                    <h4 className="font-medium mb-2">{review.title}</h4>
                    <p className="text-muted-foreground mb-4">{review.text}</p>

                    {review.response ? (
                      <div className="bg-muted p-3 rounded-lg">
                        <p className="text-sm font-medium mb-1">Your Response:</p>
                        <p className="text-sm">{review.response}</p>
                      </div>
                    ) : review.status === 'needs_response' ? (
                      <div className="space-y-2">
                        <Input placeholder="Write your response..." />
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleSendResponse(review.id)}>
                            <Send className="h-3 w-3 mr-1" />
                            Send Response
                          </Button>
                          <Button variant="outline" size="sm">
                            Save Draft
                          </Button>
                        </div>
                      </div>
                    ) : null}

                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        <Share2 className="h-3 w-3 mr-1" />
                        Share
                      </Button>
                      {review.status === 'needs_response' && (
                        <div className="flex items-center gap-1 text-orange-600">
                          <AlertCircle className="h-3 w-3" />
                          <span className="text-xs">Needs Response</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Automated Review Requests
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Enable Auto-Requests</h3>
                  <p className="text-sm text-muted-foreground">Automatically send review requests after job completion</p>
                </div>
                <Button 
                  variant={automationSettings.autoRequestEnabled ? "default" : "outline"}
                  onClick={() => handleAutomationToggle('autoRequestEnabled')}
                >
                  {automationSettings.autoRequestEnabled ? 'Enabled' : 'Disabled'}
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Request Delay (days after completion)</label>
                  <Input 
                    type="number" 
                    value={automationSettings.requestDelay}
                    onChange={(e) => setAutomationSettings(prev => ({ ...prev, requestDelay: parseInt(e.target.value) }))}
                    className="w-20 mt-1"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Follow-up Reminders</h3>
                    <p className="text-sm text-muted-foreground">Send reminder emails to customers who haven't left reviews</p>
                  </div>
                  <Button 
                    variant={automationSettings.reminderEnabled ? "default" : "outline"}
                    onClick={() => handleAutomationToggle('reminderEnabled')}
                  >
                    {automationSettings.reminderEnabled ? 'Enabled' : 'Disabled'}
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Reminder Interval (days)</label>
                    <Input 
                      type="number" 
                      value={automationSettings.reminderInterval}
                      onChange={(e) => setAutomationSettings(prev => ({ ...prev, reminderInterval: parseInt(e.target.value) }))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Max Reminders</label>
                    <Input 
                      type="number" 
                      value={automationSettings.maxReminders}
                      onChange={(e) => setAutomationSettings(prev => ({ ...prev, maxReminders: parseInt(e.target.value) }))}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Review Request Templates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Subject</label>
                <Input placeholder="How was your experience with our service?" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Message</label>
                <textarea 
                  className="w-full min-h-[100px] p-3 border rounded-md"
                  placeholder="Hi {customer_name}, We'd love to hear about your experience with our recent {service_type} project..."
                />
              </div>
              <Button>Save Template</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Rating Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = reputationStats[`${['oneStar', 'twoStars', 'threeStars', 'fourStars', 'fiveStars'][rating - 1]}`];
                  const percentage = Math.round((count / reputationStats.totalReviews) * 100);
                  return (
                    <div key={rating} className="flex items-center gap-3">
                      <span className="text-sm w-8">{rating} ★</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm w-12">{count}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Google Reviews</span>
                    <span className="font-semibold">4.5 ★ (67 reviews)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Yelp</span>
                    <span className="font-semibold">4.2 ★ (38 reviews)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Facebook</span>
                    <span className="font-semibold">4.1 ★ (22 reviews)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>This Month</span>
                    <span className="font-semibold text-green-600">+12 reviews</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Month</span>
                    <span className="font-semibold">8 reviews</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Rating Trend</span>
                    <span className="font-semibold text-green-600">↑ 0.2</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Review Request Campaign</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">24</p>
                  <p className="text-sm text-muted-foreground">Requests Sent</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">8</p>
                  <p className="text-sm text-muted-foreground">Reviews Received</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">33%</p>
                  <p className="text-sm text-muted-foreground">Response Rate</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <p className="font-medium">John Smith - Kitchen Project</p>
                    <p className="text-sm text-muted-foreground">Sent 3 days ago • Auto-request</p>
                  </div>
                  <Badge variant="outline">Pending</Badge>
                </div>
                <div className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <p className="font-medium">Sarah Johnson - Bathroom Remodel</p>
                    <p className="text-sm text-muted-foreground">Sent 1 week ago • Manual request</p>
                  </div>
                  <Badge variant="default">Completed</Badge>
                </div>
                <div className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <p className="font-medium">Mike Wilson - Deck Construction</p>
                    <p className="text-sm text-muted-foreground">Sent 2 weeks ago • Auto-request + 1 reminder</p>
                  </div>
                  <Badge variant="secondary">No Response</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
