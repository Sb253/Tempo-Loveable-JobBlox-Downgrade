
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Camera, 
  MapPin, 
  Phone, 
  CheckCircle, 
  AlertTriangle,
  Navigation,
  MessageSquare
} from "lucide-react";

interface Job {
  id: string;
  title: string;
  customer: string;
  address: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  estimatedTime: string;
  customerPhone: string;
}

interface MobileJobQuickActionsProps {
  currentJob?: Job;
  onStartJob: () => void;
  onCompleteJob: () => void;
  onTakePhoto: () => void;
  onNavigate: () => void;
  onCallCustomer: () => void;
  onAddNote: () => void;
}

export const MobileJobQuickActions = ({
  currentJob,
  onStartJob,
  onCompleteJob,
  onTakePhoto,
  onNavigate,
  onCallCustomer,
  onAddNote
}: MobileJobQuickActionsProps) => {
  if (!currentJob) {
    return (
      <Card className="m-4">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No active job</p>
          <p className="text-sm text-muted-foreground mt-2">
            Select a job to see quick actions
          </p>
        </CardContent>
      </Card>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="m-4">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg leading-tight">{currentJob.title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{currentJob.customer}</p>
            <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{currentJob.address}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 ml-4">
            <Badge className={getStatusColor(currentJob.status)}>
              {currentJob.status.replace('-', ' ')}
            </Badge>
            <Badge className={getPriorityColor(currentJob.priority)}>
              {currentJob.priority}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Job Status Actions */}
        <div className="grid grid-cols-2 gap-3">
          {currentJob.status === 'pending' && (
            <Button onClick={onStartJob} className="w-full h-12">
              <Clock className="h-4 w-4 mr-2" />
              Start Job
            </Button>
          )}
          
          {currentJob.status === 'in-progress' && (
            <Button onClick={onCompleteJob} variant="default" className="w-full h-12">
              <CheckCircle className="h-4 w-4 mr-2" />
              Complete
            </Button>
          )}

          <Button onClick={onTakePhoto} variant="outline" className="w-full h-12">
            <Camera className="h-4 w-4 mr-2" />
            Photo
          </Button>
        </div>

        {/* Communication & Navigation */}
        <div className="grid grid-cols-3 gap-2">
          <Button onClick={onNavigate} variant="outline" size="sm" className="h-10">
            <Navigation className="h-4 w-4 mr-1" />
            Navigate
          </Button>
          
          <Button onClick={onCallCustomer} variant="outline" size="sm" className="h-10">
            <Phone className="h-4 w-4 mr-1" />
            Call
          </Button>
          
          <Button onClick={onAddNote} variant="outline" size="sm" className="h-10">
            <MessageSquare className="h-4 w-4 mr-1" />
            Note
          </Button>
        </div>

        {/* Job Info */}
        <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>Est: {currentJob.estimatedTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Phone className="h-3 w-3" />
            <span>{currentJob.customerPhone}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
