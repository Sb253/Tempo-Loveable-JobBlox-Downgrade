
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Truck, Mail, MessageCircle, ArrowRight, Bell } from "lucide-react";

interface OnMyWayButtonOptionsProps {
  appointment: {
    customer: string;
    phone: string;
    email: string;
    technician: string;
    scheduledTime: string;
  };
  status: string;
}

export const OnMyWayButtonOptions = ({ appointment, status }: OnMyWayButtonOptionsProps) => {
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
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Choose your preferred "On My Way" button design:</h3>
      
      {/* Option 1: Clean with Badge */}
      <div className="space-y-2">
        <h4 className="font-medium">Option 1: Clean with Notification Badge</h4>
        <Button
          onClick={sendOnMyWayNotification}
          variant="outline"
          className="w-full h-12 bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800 hover:bg-orange-100 dark:hover:bg-orange-950/40 flex items-center justify-center gap-2 relative"
          disabled={status === 'completed'}
        >
          <Truck className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          <span className="text-sm text-orange-600 dark:text-orange-400 font-medium">ON MY WAY</span>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
            <Bell className="h-3 w-3 text-white" />
          </div>
        </Button>
      </div>

      {/* Option 2: Flow Design */}
      <div className="space-y-2">
        <h4 className="font-medium">Option 2: Flow Design</h4>
        <Button
          onClick={sendOnMyWayNotification}
          variant="outline"
          className="w-full h-12 bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800 hover:bg-orange-100 dark:hover:bg-orange-950/40 flex items-center justify-center gap-2"
          disabled={status === 'completed'}
        >
          <Truck className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          <ArrowRight className="h-4 w-4 text-orange-500 dark:text-orange-300" />
          <div className="flex gap-1">
            <MessageCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            <Mail className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          </div>
          <span className="text-sm text-orange-600 dark:text-orange-400 font-medium ml-2">ON MY WAY</span>
        </Button>
      </div>

      {/* Option 3: Stacked Design */}
      <div className="space-y-2">
        <h4 className="font-medium">Option 3: Stacked Layout</h4>
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
            <MessageCircle className="h-3 w-3 text-orange-500 dark:text-orange-300" />
            <Mail className="h-3 w-3 text-orange-500 dark:text-orange-300" />
          </div>
        </Button>
      </div>

      {/* Option 4: Minimal Design */}
      <div className="space-y-2">
        <h4 className="font-medium">Option 4: Minimal Design</h4>
        <Button
          onClick={sendOnMyWayNotification}
          className="w-full h-12 bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 flex items-center justify-center gap-2 text-white"
          disabled={status === 'completed'}
        >
          <Truck className="h-5 w-5" />
          <span className="text-sm font-medium">ON MY WAY</span>
        </Button>
      </div>
    </div>
  );
};
