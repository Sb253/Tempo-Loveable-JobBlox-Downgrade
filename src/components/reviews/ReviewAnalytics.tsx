
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, TrendingUp, MessageSquare, ThumbsUp } from "lucide-react";

interface ReputationStats {
  averageRating: number;
  totalReviews: number;
  fiveStars: number;
  fourStars: number;
  threeStars: number;
  twoStars: number;
  oneStar: number;
  responseRate: number;
  averageResponseTime: string;
}

interface ReviewAnalyticsProps {
  stats: ReputationStats;
}

export const ReviewAnalytics = ({ stats }: ReviewAnalyticsProps) => {
  const ratingDistribution = [
    { stars: 5, count: stats.fiveStars, percentage: (stats.fiveStars / stats.totalReviews) * 100 },
    { stars: 4, count: stats.fourStars, percentage: (stats.fourStars / stats.totalReviews) * 100 },
    { stars: 3, count: stats.threeStars, percentage: (stats.threeStars / stats.totalReviews) * 100 },
    { stars: 2, count: stats.twoStars, percentage: (stats.twoStars / stats.totalReviews) * 100 },
    { stars: 1, count: stats.oneStar, percentage: (stats.oneStar / stats.totalReviews) * 100 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Rating Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {ratingDistribution.map((rating) => (
              <div key={rating.stars} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-12">
                  <span className="text-sm">{rating.stars}</span>
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full" 
                    style={{ width: `${rating.percentage}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-8">{rating.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Response Rate</span>
            <span className="font-semibold text-green-600">{stats.responseRate}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Average Response Time</span>
            <span className="font-semibold text-blue-600">{stats.averageResponseTime}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Positive Reviews (4-5 stars)</span>
            <span className="font-semibold text-purple-600">
              {Math.round(((stats.fiveStars + stats.fourStars) / stats.totalReviews) * 100)}%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>Total Engagement</span>
            <span className="font-semibold text-orange-600">{stats.totalReviews} reviews</span>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Platform Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">45</div>
              <div className="text-sm text-muted-foreground">Google Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">32</div>
              <div className="text-sm text-muted-foreground">Yelp Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">28</div>
              <div className="text-sm text-muted-foreground">Facebook Reviews</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
