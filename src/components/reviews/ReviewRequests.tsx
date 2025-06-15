
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const ReviewRequests = () => {
  return (
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
  );
};
