
import { Card, CardContent } from "@/components/ui/card";
import { Star, MessageSquare, ThumbsUp, TrendingUp } from "lucide-react";

interface ReputationStats {
  averageRating: number;
  totalReviews: number;
  responseRate: number;
  averageResponseTime: string;
}

interface ReviewOverviewStatsProps {
  stats: ReputationStats;
}

export const ReviewOverviewStats = ({ stats }: ReviewOverviewStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            <div>
              <p className="text-2xl font-bold">{stats.averageRating}</p>
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
              <p className="text-2xl font-bold">{stats.totalReviews}</p>
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
              <p className="text-2xl font-bold">{stats.responseRate}%</p>
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
              <p className="text-2xl font-bold">{stats.averageResponseTime}</p>
              <p className="text-sm text-muted-foreground">Avg Response Time</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
