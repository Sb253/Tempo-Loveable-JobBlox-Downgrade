
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  Play, 
  Pause, 
  Square,
  CheckCircle,
  AlertCircle,
  XCircle,
  Edit,
  MessageCircle,
  FileText
} from "lucide-react";

interface Appointment {
  id: string;
  title: string;
  customer: string;
  email: string;
  phone: string;
  address: string;
  scheduledDate: string;
  scheduledTime: string;
  duration: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
  appointmentType: 'consultation' | 'estimate' | 'follow-up' | 'inspection';
  technician: string;
  notes: string;
  timeTracking?: {
    startTime?: Date;
    endTime?: Date;
    totalMinutes: number;
    isActive: boolean;
  };
}

interface ClientAppointmentEnhancedProps {
  selectedAppointment: Appointment;
}

export const ClientAppointmentEnhanced = ({ selectedAppointment }: ClientAppointmentEnhancedProps) => {
  const { toast } = useToast();
  const [appointment, setAppointment] = useState<Appointment>(selectedAppointment);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second for active timers
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const startTimeTracking = () => {
    setAppointment(prev => ({
      ...prev,
      status: 'in-progress' as const,
      timeTracking: {
        ...prev.timeTracking,
        startTime: new Date(),
        isActive: true
      } as any
    }));

    toast({
      title: "Time Tracking Started",
      description: `Started tracking time for ${appointment.title}`,
    });
  };

  const pauseTimeTracking = () => {
    if (appointment.timeTracking?.isActive) {
      const now = new Date();
      const startTime = appointment.timeTracking.startTime;
      const additionalMinutes = startTime 
        ? Math.floor((now.getTime() - startTime.getTime()) / 1000 / 60)
        : 0;

      setAppointment(prev => ({
        ...prev,
        timeTracking: {
          ...prev.timeTracking!,
          endTime: now,
          totalMinutes: prev.timeTracking!.totalMinutes + additionalMinutes,
          isActive: false
        }
      }));

      toast({
        title: "Time Tracking Paused",
        description: "Timer has been paused",
      });
    }
  };

  const completeAppointment = () => {
    const now = new Date();
    let finalMinutes = appointment.timeTracking?.totalMinutes || 0;

    if (appointment.timeTracking?.isActive && appointment.timeTracking.startTime) {
      const additionalMinutes = Math.floor((now.getTime() - appointment.timeTracking.startTime.getTime()) / 1000 / 60);
      finalMinutes += additionalMinutes;
    }

    setAppointment(prev => ({
      ...prev,
      status: 'completed' as const,
      timeTracking: {
        ...prev.timeTracking!,
        endTime: now,
        totalMinutes: finalMinutes,
        isActive: false
      }
    }));

    toast({
      title: "Appointment Completed",
      description: `${appointment.title} has been marked as completed`,
    });
  };

  const getActiveTime = () => {
    if (!appointment.timeTracking?.isActive || !appointment.timeTracking.startTime) {
      return appointment.timeTracking?.totalMinutes || 0;
    }

    const elapsed = Math.floor((currentTime.getTime() - appointment.timeTracking.startTime.getTime()) / 1000 / 60);
    return appointment.timeTracking.totalMinutes + elapsed;
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'no-show':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'in-progress':
        return <Play className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      case 'no-show':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{appointment.title}</h1>
          <p className="text-muted-foreground">{appointment.appointmentType}</p>
        </div>
        <div className="flex items-center gap-2">
          {getStatusIcon(appointment.status)}
          <Badge className={getStatusColor(appointment.status)}>
            {appointment.status.replace('-', ' ').toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* Time Tracking Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Time Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={appointment.status === 'scheduled' ? startTimeTracking : 
                         appointment.timeTracking?.isActive ? pauseTimeTracking : startTimeTracking}
                variant={appointment.timeTracking?.isActive ? "destructive" : "default"}
              >
                {appointment.timeTracking?.isActive ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Start
                  </>
                )}
              </Button>

              <Button
                onClick={completeAppointment}
                variant="outline"
                disabled={appointment.status === 'completed'}
              >
                <Square className="h-4 w-4 mr-2" />
                Complete
              </Button>
            </div>

            <div className="text-right">
              {getActiveTime() > 0 && (
                <div className="text-2xl font-bold">
                  {formatDuration(getActiveTime())}
                </div>
              )}
              {appointment.timeTracking?.isActive && (
                <div className="text-sm text-green-600 font-medium">● Recording</div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">{appointment.customer}</h3>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{appointment.email}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{appointment.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{appointment.address}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button size="sm" variant="outline">
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
              <Button size="sm" variant="outline">
                <MessageCircle className="h-4 w-4 mr-2" />
                Message
              </Button>
              <Button size="sm" variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Schedule Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Schedule
              </div>
              <Button size="sm" variant="ghost">
                <Edit className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Date</label>
                <p className="text-lg">{appointment.scheduledDate}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Time</label>
                <p className="text-lg">{appointment.scheduledTime}</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Duration</label>
              <p className="text-lg">{appointment.duration}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Technician</label>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4" />
                </div>
                <span className="font-medium">{appointment.technician}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notes */}
      {appointment.notes && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{appointment.notes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
