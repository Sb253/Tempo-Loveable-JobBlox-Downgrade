
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";
import { ReviewOverviewStats } from "./reviews/ReviewOverviewStats";
import { ReviewCard } from "./reviews/ReviewCard";
import { ReviewAutomationSettings } from "./reviews/ReviewAutomationSettings";
import { ReviewAnalytics } from "./reviews/ReviewAnalytics";
import { ReviewRequests } from "./reviews/ReviewRequests";

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
    requestDelay: 7,
    reminderEnabled: true,
    reminderInterval: 3,
    maxReminders: 2
  });

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

      <ReviewOverviewStats stats={reputationStats} />

      <Tabs defaultValue="reviews" className="w-full">
        <TabsList>
          <TabsTrigger value="reviews">Recent Reviews</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="requests">Review Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="reviews" className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard 
              key={review.id} 
              review={review} 
              onSendResponse={handleSendResponse} 
            />
          ))}
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          <ReviewAutomationSettings 
            settings={automationSettings}
            onSettingsChange={setAutomationSettings}
            onToggleAutomation={handleAutomationToggle}
          />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <ReviewAnalytics stats={reputationStats} />
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <ReviewRequests />
        </TabsContent>
      </Tabs>
    </div>
  );
};
