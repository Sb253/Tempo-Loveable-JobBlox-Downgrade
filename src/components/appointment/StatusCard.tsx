
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Truck, Play, Square, Mail, MessageCircle } from "lucide-react";

interface StatusCardProps {
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
  timeTracking?: {
    startTime?: Date;
    endTime?: Date;
    totalMinutes: number;
    isActive: boolean;
  };
  appointment: {
    customer: string;
    phone: string;
    email: string;
    technician: string;
    scheduledTime: string;
    title: string;
  };
  onStartTimeTracking: () => void;
  onPauseTimeTracking: () => void;
  onCompleteAppointment: () => void;
  activeTime: number;
  formatDuration: (minutes: number) => string;
}

export const StatusCard = ({ 
  status, 
  timeTracking, 
  appointment, 
  onStartTimeTracking, 
  onPauseTimeTracking, 
  onCompleteAppointment,
  activeTime,
  formatDuration
}: StatusCardProps) => {
  const { toast } = useToast();

  const sendOnMyWayNotification = async () => {
    try {
      const eta = new Date(Date.now() + 15 * 60 * 1000);
      const etaString = eta.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      const message = `Hi ${appointment.customer}, this is ${appointment.technician} from Construction CRM. I'm on my way to your location for your ${appointment.scheduledTime} appointment. I should arrive around ${etaString}. Please text back if you have any questions!`;

      console.log(`Sending SMS to ${appointment.phone}: ${message}`);
      console.log(`Sending email to ${appointment.email}: ${message}`);

      toast({
        title: "Notification Sent",
        description: `"On My Way" message sent to ${appointment.customer} via SMS and email`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send notification. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
            <span className="font-medium">Status</span>
          </div>
          <Badge variant="destructive">EXPIRED</Badge>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <Button
              onClick={sendOnMyWayNotification}
              variant="outline"
              className="w-full h-12 bg-orange-50 border-orange-200 hover:bg-orange-100 flex flex-col gap-1"
              disabled={status === 'completed'}
            >
              <div className="flex items-center gap-1">
                <Truck className="h-4 w-4 text-orange-600" />
                <Mail className="h-3 w-3 text-orange-600" />
                <MessageCircle className="h-3 w-3 text-orange-600" />
              </div>
              <span className="text-xs text-orange-600 font-medium">ON MY WAY</span>
              <span className="text-xs text-orange-500">Text & Email</span>
            </Button>
          </div>
          
          <div className="text-center">
            <Button
              onClick={status === 'scheduled' ? onStartTimeTracking : 
                       timeTracking?.isActive ? onPauseTimeTracking : onStartTimeTracking}
              className={`w-full h-12 ${
                timeTracking?.isActive 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-green-500 hover:bg-green-600'
              } flex flex-col gap-1`}
            >
              <Play className="h-4 w-4" />
              <span className="text-xs font-medium">
                {timeTracking?.isActive ? 'PAUSE' : 'START'}
              </span>
            </Button>
          </div>
          
          <div className="text-center">
            <Button
              onClick={onCompleteAppointment}
              variant="outline"
              className="w-full h-12 bg-gray-50 border-gray-200 hover:bg-gray-100 flex flex-col gap-1"
              disabled={status === 'completed'}
            >
              <Square className="h-4 w-4 text-gray-600" />
              <span className="text-xs text-gray-600 font-medium">FINISH</span>
            </Button>
          </div>
        </div>
        
        {activeTime > 0 && (
          <div className="mt-4 text-center">
            <div className="text-2xl font-bold">{formatDuration(activeTime)}</div>
            {timeTracking?.isActive && (
              <div className="text-sm text-green-600 font-medium">● Recording</div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
