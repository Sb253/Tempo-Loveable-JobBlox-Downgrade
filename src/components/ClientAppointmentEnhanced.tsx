
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
  XCircle
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-progress':
        return <Play className="h-4 w-4 text-blue-600" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'no-show':
        return <AlertCircle className="h-4 w-4 text-orange-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
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

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{appointment.title}</h1>
          <p className="text-muted-foreground">Detailed appointment management with time tracking</p>
        </div>
      </div>

      {/* Main Appointment Card */}
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-2xl font-semibold">{appointment.title}</h3>
                <Badge className={getStatusColor(appointment.status)}>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(appointment.status)}
                    {appointment.status.replace('-', ' ')}
                  </div>
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {appointment.appointmentType}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm mb-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-base">{appointment.customer}</p>
                      <p className="text-muted-foreground">Assigned to: {appointment.technician}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{appointment.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{appointment.email}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-base">{appointment.scheduledDate}</p>
                      <p className="text-muted-foreground">{appointment.scheduledTime} ({appointment.duration})</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{appointment.address}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-base">Time: {formatDuration(getActiveTime())}</p>
                      {appointment.timeTracking?.isActive && (
                        <p className="text-sm text-green-600 font-medium">● Recording</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {appointment.status === 'scheduled' && (
                  <Button onClick={startTimeTracking}>
                    <Play className="h-4 w-4 mr-2" />
                    Start Appointment
                  </Button>
                )}

                {appointment.status === 'in-progress' && appointment.timeTracking?.isActive && (
                  <>
                    <Button variant="outline" onClick={pauseTimeTracking}>
                      <Pause className="h-4 w-4 mr-2" />
                      Pause Timer
                    </Button>
                    <Button onClick={completeAppointment}>
                      <Square className="h-4 w-4 mr-2" />
                      Complete Appointment
                    </Button>
                  </>
                )}

                {appointment.status === 'in-progress' && !appointment.timeTracking?.isActive && (
                  <>
                    <Button variant="outline" onClick={startTimeTracking}>
                      <Play className="h-4 w-4 mr-2" />
                      Resume Timer
                    </Button>
                    <Button onClick={completeAppointment}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Complete Appointment
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>

          {appointment.notes && (
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-2">Notes:</p>
              <p className="text-sm text-muted-foreground">{appointment.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
