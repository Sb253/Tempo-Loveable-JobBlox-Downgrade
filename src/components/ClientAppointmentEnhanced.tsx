
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

const mockAppointments: Appointment[] = [
  {
    id: '1',
    title: 'Kitchen Renovation Consultation',
    customer: 'John Smith',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    address: '123 Main St, Anytown, USA',
    scheduledDate: '2024-12-18',
    scheduledTime: '09:00',
    duration: '1h',
    status: 'scheduled',
    appointmentType: 'consultation',
    technician: 'Mike Johnson',
    notes: 'Customer interested in complete kitchen remodel',
    timeTracking: {
      totalMinutes: 0,
      isActive: false
    }
  },
  {
    id: '2',
    title: 'Bathroom Repair Estimate',
    customer: 'Sarah Davis',
    email: 'sarah.davis@email.com',
    phone: '(555) 234-5678',
    address: '456 Oak Ave, City, USA',
    scheduledDate: '2024-12-18',
    scheduledTime: '14:00',
    duration: '45m',
    status: 'in-progress',
    appointmentType: 'estimate',
    technician: 'Tom Wilson',
    notes: 'Leak in master bathroom, needs assessment',
    timeTracking: {
      startTime: new Date(Date.now() - 20 * 60 * 1000), // Started 20 minutes ago
      totalMinutes: 20,
      isActive: true
    }
  },
  {
    id: '3',
    title: 'Project Follow-up',
    customer: 'ABC Construction',
    email: 'contact@abcconstruction.com',
    phone: '(555) 345-6789',
    address: '789 Business Plaza, Downtown',
    scheduledDate: '2024-12-17',
    scheduledTime: '10:30',
    duration: '30m',
    status: 'completed',
    appointmentType: 'follow-up',
    technician: 'Sarah Wilson',
    notes: 'Follow-up on completed deck installation',
    timeTracking: {
      startTime: new Date('2024-12-17T10:30:00'),
      endTime: new Date('2024-12-17T11:15:00'),
      totalMinutes: 45,
      isActive: false
    }
  }
];

export const ClientAppointmentEnhanced = () => {
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second for active timers
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const startTimeTracking = (appointmentId: string) => {
    setAppointments(prev => prev.map(apt => {
      if (apt.id === appointmentId) {
        return {
          ...apt,
          status: 'in-progress' as const,
          timeTracking: {
            ...apt.timeTracking,
            startTime: new Date(),
            isActive: true
          }
        };
      }
      return apt;
    }));

    const appointment = appointments.find(apt => apt.id === appointmentId);
    toast({
      title: "Time Tracking Started",
      description: `Started tracking time for ${appointment?.title}`,
    });
  };

  const pauseTimeTracking = (appointmentId: string) => {
    setAppointments(prev => prev.map(apt => {
      if (apt.id === appointmentId && apt.timeTracking?.isActive) {
        const now = new Date();
        const startTime = apt.timeTracking.startTime;
        const additionalMinutes = startTime 
          ? Math.floor((now.getTime() - startTime.getTime()) / 1000 / 60)
          : 0;

        return {
          ...apt,
          timeTracking: {
            ...apt.timeTracking,
            endTime: now,
            totalMinutes: apt.timeTracking.totalMinutes + additionalMinutes,
            isActive: false
          }
        };
      }
      return apt;
    }));

    toast({
      title: "Time Tracking Paused",
      description: "Timer has been paused",
    });
  };

  const completeAppointment = (appointmentId: string) => {
    setAppointments(prev => prev.map(apt => {
      if (apt.id === appointmentId) {
        const now = new Date();
        let finalMinutes = apt.timeTracking?.totalMinutes || 0;

        if (apt.timeTracking?.isActive && apt.timeTracking.startTime) {
          const additionalMinutes = Math.floor((now.getTime() - apt.timeTracking.startTime.getTime()) / 1000 / 60);
          finalMinutes += additionalMinutes;
        }

        return {
          ...apt,
          status: 'completed' as const,
          timeTracking: {
            ...apt.timeTracking,
            endTime: now,
            totalMinutes: finalMinutes,
            isActive: false
          }
        };
      }
      return apt;
    }));

    const appointment = appointments.find(apt => apt.id === appointmentId);
    toast({
      title: "Appointment Completed",
      description: `${appointment?.title} has been marked as completed`,
    });
  };

  const getActiveTime = (appointment: Appointment) => {
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
          <h1 className="text-3xl font-bold">Client Appointments</h1>
          <p className="text-muted-foreground">Manage client appointments with integrated time tracking</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {appointments.filter(apt => apt.scheduledDate === '2024-12-18').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Play className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {appointments.filter(apt => apt.status === 'in-progress').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {appointments.filter(apt => apt.status === 'completed').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatDuration(appointments.reduce((total, apt) => total + getActiveTime(apt), 0))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{appointment.title}</h3>
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

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{appointment.customer}</p>
                        <p className="text-muted-foreground">{appointment.technician}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{appointment.scheduledDate}</p>
                        <p className="text-muted-foreground">{appointment.scheduledTime} ({appointment.duration})</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{appointment.address}</p>
                        <div className="flex items-center gap-2">
                          <Phone className="h-3 w-3" />
                          <span className="text-muted-foreground">{appointment.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  {/* Time Tracking Display */}
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      Time: {formatDuration(getActiveTime(appointment))}
                    </p>
                    {appointment.timeTracking?.isActive && (
                      <p className="text-xs text-green-600">● Recording</p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {appointment.status === 'scheduled' && (
                      <Button 
                        size="sm" 
                        onClick={() => startTimeTracking(appointment.id)}
                      >
                        <Play className="h-3 w-3 mr-1" />
                        Start
                      </Button>
                    )}

                    {appointment.status === 'in-progress' && appointment.timeTracking?.isActive && (
                      <>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => pauseTimeTracking(appointment.id)}
                        >
                          <Pause className="h-3 w-3 mr-1" />
                          Pause
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => completeAppointment(appointment.id)}
                        >
                          <Square className="h-3 w-3 mr-1" />
                          Complete
                        </Button>
                      </>
                    )}

                    {appointment.status === 'in-progress' && !appointment.timeTracking?.isActive && (
                      <>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => startTimeTracking(appointment.id)}
                        >
                          <Play className="h-3 w-3 mr-1" />
                          Resume
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => completeAppointment(appointment.id)}
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Complete
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {appointment.notes && (
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium mb-1">Notes:</p>
                  <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
