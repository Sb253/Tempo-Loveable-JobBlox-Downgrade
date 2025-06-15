
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Rating Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = stats[`${['oneStar', 'twoStars', 'threeStars', 'fourStars', 'fiveStars'][rating - 1]}` as keyof ReputationStats] as number;
              const percentage = Math.round((count / stats.totalReviews) * 100);
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
    </div>
  );
};
