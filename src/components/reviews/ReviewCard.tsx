
import { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MessageSquare, ExternalLink } from "lucide-react";

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
  response?: string | null;
}

interface ReviewCardProps {
  review: Review;
  onSendResponse: (reviewId: string) => void;
}

export const ReviewCard = ({ review, onSendResponse }: ReviewCardProps) => {
  const [responseText, setResponseText] = useState('');
  const [showResponseForm, setShowResponseForm] = useState(false);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'needs_response':
        return 'bg-red-100 text-red-800';
      case 'responded':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSendResponse = () => {
    if (responseText.trim()) {
      onSendResponse(review.id);
      setResponseText('');
      setShowResponseForm(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={review.avatar} />
              <AvatarFallback>{review.customer.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{review.customer}</h3>
              <div className="flex items-center gap-2">
                <div className="flex">{renderStars(review.rating)}</div>
                <span className="text-sm text-muted-foreground">on {review.platform}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(review.status)}>
              {review.status.replace('_', ' ')}
            </Badge>
            <Button variant="outline" size="sm">
              <ExternalLink className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">{review.title}</h4>
          <p className="text-sm text-muted-foreground">{review.text}</p>
          <p className="text-xs text-muted-foreground mt-2">{review.date}</p>
        </div>

        {review.response && (
          <div className="bg-muted p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="h-4 w-4" />
              <span className="text-sm font-medium">Your Response</span>
            </div>
            <p className="text-sm">{review.response}</p>
          </div>
        )}

        {review.status === 'needs_response' && (
          <div className="space-y-3">
            {!showResponseForm ? (
              <Button 
                onClick={() => setShowResponseForm(true)}
                className="w-full"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Respond to Review
              </Button>
            ) : (
              <div className="space-y-3">
                <textarea
                  className="w-full min-h-[100px] p-3 border rounded-md"
                  placeholder="Write your response..."
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                />
                <div className="flex gap-2">
                  <Button onClick={handleSendResponse}>Send Response</Button>
                  <Button variant="outline" onClick={() => setShowResponseForm(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
