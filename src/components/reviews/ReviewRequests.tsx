
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle, Clock, TrendingUp, Users, Star } from "lucide-react";

export const ReviewRequests = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5" />
          Review Request Campaign
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Send className="h-4 w-4 text-blue-600" />
              <p className="text-2xl font-bold text-blue-600">24</p>
            </div>
            <p className="text-sm text-muted-foreground">Requests Sent</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <p className="text-2xl font-bold text-green-600">8</p>
            </div>
            <p className="text-sm text-muted-foreground">Reviews Received</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="h-4 w-4 text-purple-600" />
              <p className="text-2xl font-bold text-purple-600">33%</p>
            </div>
            <p className="text-sm text-muted-foreground">Response Rate</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 border rounded">
            <div>
              <p className="font-medium flex items-center gap-2">
                <Users className="h-4 w-4" />
                John Smith - Kitchen Project
              </p>
              <p className="text-sm text-muted-foreground">Sent 3 days ago • Auto-request</p>
            </div>
            <Badge variant="outline">
              <Clock className="h-3 w-3 mr-1" />
              Pending
            </Badge>
          </div>
          <div className="flex justify-between items-center p-3 border rounded">
            <div>
              <p className="font-medium flex items-center gap-2">
                <Users className="h-4 w-4" />
                Sarah Johnson - Bathroom Remodel
              </p>
              <p className="text-sm text-muted-foreground">Sent 1 week ago • Manual request</p>
            </div>
            <Badge variant="default">
              <CheckCircle className="h-3 w-3 mr-1" />
              Completed
            </Badge>
          </div>
          <div className="flex justify-between items-center p-3 border rounded">
            <div>
              <p className="font-medium flex items-center gap-2">
                <Users className="h-4 w-4" />
                Mike Wilson - Deck Construction
              </p>
              <p className="text-sm text-muted-foreground">Sent 2 weeks ago • Auto-request + 1 reminder</p>
            </div>
            <Badge variant="secondary">
              <Clock className="h-3 w-3 mr-1" />
              No Response
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
