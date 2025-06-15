
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Star, TrendingUp, MessageSquare, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReviewCard } from "./reviews/ReviewCard";
import { ReviewAnalytics } from "./reviews/ReviewAnalytics";
import { ReviewAutomationSettings } from "./reviews/ReviewAutomationSettings";
import { ReviewRequests } from "./reviews/ReviewRequests";

interface Review {
  id: string;
  customer: string;
  avatar: string;
  rating: number;
  title: string;
  text: string;
  date: string;
  platform: string;
  status: 'published' | 'needs_response' | 'responded';
  response?: string;
}

interface AutomationSettings {
  autoRequestEnabled: boolean;
  requestDelay: number;
  reminderEnabled: boolean;
  reminderInterval: number;
  maxReminders: number;
}

const mockReviews: Review[] = [
  {
    id: '1',
    customer: 'John Smith',
    avatar: '/placeholder.svg',
    rating: 5,
    title: 'Excellent roof repair service',
    text: 'Professional team, completed the job on time and within budget. Highly recommend!',
    date: '2024-12-10',
    platform: 'Google',
    status: 'responded',
    response: 'Thank you for your kind words, John! We\'re glad we could help with your roof repair.'
  },
  {
    id: '2',
    customer: 'Sarah Johnson',
    avatar: '/placeholder.svg',
    rating: 4,
    title: 'Good kitchen renovation',
    text: 'Quality work but took a bit longer than expected. Overall satisfied with the results.',
    date: '2024-12-08',
    platform: 'Yelp',
    status: 'needs_response'
  },
  {
    id: '3',
    customer: 'Mike Wilson',
    avatar: '/placeholder.svg',
    rating: 5,
    title: 'Outstanding bathroom remodel',
    text: 'Transformed our old bathroom into a modern space. Attention to detail was impressive.',
    date: '2024-12-05',
    platform: 'Facebook',
    status: 'published'
  }
];

const reputationStats = {
  averageRating: 4.7,
  totalReviews: 105,
  fiveStars: 78,
  fourStars: 20,
  threeStars: 5,
  twoStars: 1,
  oneStar: 1,
  responseRate: 85,
  averageResponseTime: '2 hours'
};

export const ReviewManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [automationSettings, setAutomationSettings] = useState<AutomationSettings>({
    autoRequestEnabled: true,
    requestDelay: 3,
    reminderEnabled: true,
    reminderInterval: 7,
    maxReminders: 2
  });

  const filteredReviews = reviews.filter(review =>
    review.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendResponse = (reviewId: string) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { ...review, status: 'responded' as const }
        : review
    ));
  };

  const handleToggleAutomation = (setting: string) => {
    setAutomationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof AutomationSettings]
    }));
  };

  const stats = [
    { title: "Average Rating", value: "4.7", icon: Star, color: "text-yellow-600" },
    { title: "Total Reviews", value: "105", icon: MessageSquare, color: "text-blue-600" },
    { title: "Response Rate", value: "85%", icon: TrendingUp, color: "text-green-600" },
    { title: "Needs Response", value: filteredReviews.filter(r => r.status === 'needs_response').length.toString(), icon: MessageSquare, color: "text-orange-600" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Review Management</h2>
          <p className="text-muted-foreground">
            Monitor and respond to customer reviews across all platforms
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Send Review Request
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="reviews" className="space-y-4">
        <TabsList>
          <TabsTrigger value="reviews">All Reviews</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="requests">Review Requests</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
        </TabsList>

        <TabsContent value="reviews" className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          
          <div className="grid gap-4">
            {filteredReviews.map((review) => (
              <ReviewCard 
                key={review.id} 
                review={review} 
                onSendResponse={handleSendResponse}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <ReviewAnalytics stats={reputationStats} />
        </TabsContent>

        <TabsContent value="requests">
          <ReviewRequests />
        </TabsContent>

        <TabsContent value="automation">
          <ReviewAutomationSettings 
            settings={automationSettings}
            onSettingsChange={setAutomationSettings}
            onToggleAutomation={handleToggleAutomation}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
