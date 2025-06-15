
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Truck, Play, Square, Mail, MessageCircle, Phone } from "lucide-react";

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

  // Determine available communication methods
  const hasEmail = appointment.email && appointment.email.includes('@');
  const hasPhone = appointment.phone && appointment.phone.length > 0;
  const canText = hasPhone; // Assume all phones can receive texts

  const sendOnMyWayNotification = async () => {
    try {
      const eta = new Date(Date.now() + 15 * 60 * 1000);
      const etaString = eta.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      const message = `Hi ${appointment.customer}, this is ${appointment.technician} from Construction CRM. I'm on my way to your location for your ${appointment.scheduledTime} appointment. I should arrive around ${etaString}. Please text back if you have any questions!`;

      const methods = [];
      if (canText) {
        console.log(`Sending SMS to ${appointment.phone}: ${message}`);
        methods.push('SMS');
      }
      if (hasEmail) {
        console.log(`Sending email to ${appointment.email}: ${message}`);
        methods.push('Email');
      }

      toast({
        title: "Notification Sent",
        description: `"On My Way" message sent to ${appointment.customer} via ${methods.join(' and ')}`,
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
    <Card className="bg-card border-border">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-muted rounded-full"></div>
            <span className="font-medium text-foreground">Status</span>
          </div>
          <Badge variant="destructive">EXPIRED</Badge>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <Button
              onClick={sendOnMyWayNotification}
              variant="outline"
              className="w-full h-16 bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800 hover:bg-orange-100 dark:hover:bg-orange-950/40 flex flex-col items-center justify-center gap-1"
              disabled={status === 'completed'}
            >
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                <span className="text-sm text-orange-600 dark:text-orange-400 font-medium">ON MY WAY</span>
              </div>
              <div className="flex gap-2">
                {canText && <MessageCircle className="h-3 w-3 text-orange-500 dark:text-orange-300" />}
                {hasEmail && <Mail className="h-3 w-3 text-orange-500 dark:text-orange-300" />}
                {hasPhone && <Phone className="h-3 w-3 text-orange-500 dark:text-orange-300" />}
              </div>
            </Button>
          </div>
          
          <div className="text-center">
            <Button
              onClick={status === 'scheduled' ? onStartTimeTracking : 
                       timeTracking?.isActive ? onPauseTimeTracking : onStartTimeTracking}
              className={`w-full h-16 ${
                timeTracking?.isActive 
                  ? 'bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700' 
                  : 'bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700'
              } flex flex-col gap-1 text-white`}
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
              className="w-full h-16 bg-muted/50 border-border hover:bg-muted flex flex-col gap-1"
              disabled={status === 'completed'}
            >
              <Square className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground font-medium">FINISH</span>
            </Button>
          </div>
        </div>
        
        {activeTime > 0 && (
          <div className="mt-4 text-center">
            <div className="text-2xl font-bold text-foreground">{formatDuration(activeTime)}</div>
            {timeTracking?.isActive && (
              <div className="text-sm text-green-600 dark:text-green-400 font-medium">● Recording</div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
