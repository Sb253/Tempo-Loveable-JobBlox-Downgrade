
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Star, ThumbsUp, MessageSquare, Send, Search, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Review {
  id: string;
  customerName: string;
  jobTitle: string;
  rating: number;
  comment: string;
  date: string;
  platform: 'google' | 'yelp' | 'facebook' | 'website';
  status: 'new' | 'responded' | 'flagged';
  response?: string;
}

const mockReviews: Review[] = [
  {
    id: '1',
    customerName: 'John Smith',
    jobTitle: 'Kitchen Renovation',
    rating: 5,
    comment: 'Excellent work! The team was professional and finished on time. Highly recommend!',
    date: '2024-12-15',
    platform: 'google',
    status: 'new'
  },
  {
    id: '2',
    customerName: 'Sarah Johnson',
    jobTitle: 'Bathroom Remodel',
    rating: 4,
    comment: 'Great quality work, though it took a bit longer than expected. Overall satisfied.',
    date: '2024-12-14',
    platform: 'yelp',
    status: 'responded',
    response: 'Thank you for your feedback! We apologize for the delay and will work to improve our timeline estimates.'
  },
  {
    id: '3',
    customerName: 'Mike Davis',
    jobTitle: 'Deck Installation',
    rating: 2,
    comment: 'Work was okay but communication could have been better. Had to follow up multiple times.',
    date: '2024-12-13',
    platform: 'facebook',
    status: 'flagged'
  }
];

export const ReviewManagement = () => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [showResponseDialog, setShowResponseDialog] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [responseText, setResponseText] = useState('');

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = selectedPlatform === 'all' || review.platform === selectedPlatform;
    return matchesSearch && matchesPlatform;
  });

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'responded': return 'bg-green-100 text-green-800';
      case 'flagged': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'google': return 'bg-red-100 text-red-800';
      case 'yelp': return 'bg-orange-100 text-orange-800';
      case 'facebook': return 'bg-blue-100 text-blue-800';
      case 'website': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const handleRespondToReview = (review: Review) => {
    setSelectedReview(review);
    setResponseText(review.response || '');
    setShowResponseDialog(true);
  };

  const submitResponse = () => {
    if (!selectedReview) return;

    setReviews(prev => 
      prev.map(review => 
        review.id === selectedReview.id 
          ? { ...review, response: responseText, status: 'responded' }
          : review
      )
    );

    toast({
      title: "Response Sent",
      description: `Your response to ${selectedReview.customerName}'s review has been posted.`,
    });

    setShowResponseDialog(false);
    setSelectedReview(null);
    setResponseText('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Review Management</h2>
        <Button className="flex items-center gap-2">
          <Send className="h-4 w-4" />
          Request Reviews
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
            <div className="flex mt-1">
              {renderStars(Math.round(averageRating))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reviews.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Responses</CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reviews.filter(r => r.status === 'new').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">5-Star Reviews</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reviews.filter(r => r.rating === 5).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Reviews</CardTitle>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select 
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">All Platforms</option>
              <option value="google">Google</option>
              <option value="yelp">Yelp</option>
              <option value="facebook">Facebook</option>
              <option value="website">Website</option>
            </select>
          </div>
        </CardHeader>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{review.customerName}</h3>
                    <Badge className={getPlatformColor(review.platform)}>
                      {review.platform}
                    </Badge>
                    <Badge className={getStatusColor(review.status)}>
                      {review.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.jobTitle}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm">{review.comment}</p>
                </div>

                {review.response && (
                  <div className="bg-blue-50 p-3 rounded-md">
                    <p className="text-sm font-medium mb-1">Your Response:</p>
                    <p className="text-sm">{review.response}</p>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRespondToReview(review)}
                  >
                    <MessageSquare className="h-3 w-3 mr-1" />
                    {review.response ? 'Edit Response' : 'Respond'}
                  </Button>
                  {review.rating <= 3 && (
                    <Button variant="outline" size="sm">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      Follow Up
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Response Dialog */}
      {showResponseDialog && selectedReview && (
        <Dialog open={true} onOpenChange={setShowResponseDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Respond to {selectedReview.customerName}'s Review</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {renderStars(selectedReview.rating)}
                  </div>
                  <span className="text-sm font-medium">{selectedReview.customerName}</span>
                </div>
                <p className="text-sm">{selectedReview.comment}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="response">Your Response</Label>
                <Textarea
                  id="response"
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Write your response..."
                  rows={4}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowResponseDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={submitResponse}>
                  {selectedReview.response ? 'Update Response' : 'Post Response'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
