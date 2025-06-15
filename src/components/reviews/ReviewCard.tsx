
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Share2, Send, AlertCircle } from "lucide-react";

interface Review {
  id: string;
  customer: string;
  avatar: string;
  rating: number;
  title: string;
  text: string;
  date: string;
  platform: string;
  status: string;
  response: string | null;
}

interface ReviewCardProps {
  review: Review;
  onSendResponse: (reviewId: string) => void;
}

export const ReviewCard = ({ review, onSendResponse }: ReviewCardProps) => {
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

  return (
    <Card>
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
                  <Button size="sm" onClick={() => onSendResponse(review.id)}>
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
  );
};
