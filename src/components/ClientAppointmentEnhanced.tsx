
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
  Truck,
  FileText,
  Tag,
  Paperclip,
  Plus
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

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* Header Actions */}
      <div className="bg-white border-b px-4 py-3">
        <div className="flex justify-between items-center text-blue-600">
          <div className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            <span className="text-sm font-medium">Edit</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <span className="text-sm font-medium">Estimate</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            <span className="text-sm font-medium">Copy to Job</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">⋯</span>
            <span className="text-sm font-medium">More</span>
          </div>
        </div>
      </div>

      {/* Status Section */}
      <Card className="mx-4 mt-4 shadow-sm">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-400"></div>
              <span className="font-semibold text-gray-700">Status</span>
            </div>
            <Badge className={getStatusColor(appointment.status)}>
              {appointment.status.toUpperCase().replace('-', ' ')}
            </Badge>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <Truck className="h-6 w-6 text-gray-400" />
              </div>
              <span className="text-xs text-gray-500 font-medium">ON MY WAY</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <Button
                onClick={appointment.status === 'scheduled' ? startTimeTracking : 
                         appointment.timeTracking?.isActive ? pauseTimeTracking : startTimeTracking}
                className="w-12 h-12 rounded-full p-0"
              >
                {appointment.timeTracking?.isActive ? 
                  <Pause className="h-6 w-6" /> : 
                  <Play className="h-6 w-6" />
                }
              </Button>
              <span className="text-xs text-blue-600 font-medium">
                {appointment.timeTracking?.isActive ? 'PAUSE' : 'START'}
              </span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <Button
                onClick={completeAppointment}
                variant={appointment.status === 'completed' ? 'default' : 'outline'}
                className="w-12 h-12 rounded-full p-0"
              >
                <Square className="h-6 w-6" />
              </Button>
              <span className="text-xs text-blue-600 font-medium">FINISH</span>
            </div>
          </div>

          {/* Time Display */}
          {getActiveTime() > 0 && (
            <div className="mt-4 text-center">
              <div className="text-lg font-semibold text-gray-700">
                Time: {formatDuration(getActiveTime())}
              </div>
              {appointment.timeTracking?.isActive && (
                <div className="text-sm text-green-600 font-medium">● Recording</div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Customer Section */}
      <Card className="mx-4 mt-4 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-5 w-5 text-gray-600" />
            <span className="font-semibold text-gray-700">Customer</span>
          </div>

          {/* Customer Photo Placeholder */}
          <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
            <MapPin className="h-12 w-12 text-gray-400" />
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800">{appointment.customer}</h3>
          </div>

          <div className="space-y-2 mb-4">
            <div className="text-gray-600">{appointment.address}</div>
          </div>

          {/* Contact Actions */}
          <div className="flex justify-end gap-4">
            <Button size="sm" variant="outline" className="rounded-full w-10 h-10 p-0">
              <User className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" className="rounded-full w-10 h-10 p-0">
              <MessageCircle className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" className="rounded-full w-10 h-10 p-0">
              <Phone className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Section */}
      <Card className="mx-4 mt-4 shadow-sm">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-600" />
              <span className="font-semibold text-gray-700">Schedule</span>
            </div>
            <Edit className="h-4 w-4 text-blue-600" />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">From:</span>
              <div className="text-right">
                <div className="font-medium">{appointment.scheduledDate}</div>
                <div className="text-sm text-gray-500">{appointment.scheduledTime}</div>
              </div>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">To:</span>
              <div className="text-right">
                <div className="font-medium">{appointment.scheduledDate}</div>
                <div className="text-sm text-gray-500">
                  {appointment.scheduledTime.split(':').map((part, i) => 
                    i === 1 ? String(parseInt(part) + parseInt(appointment.duration.replace(/[^\d]/g, '')) || 60).padStart(2, '0') : part
                  ).join(':')}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-gray-600" />
            </div>
            <span className="font-medium text-gray-700">{appointment.technician}</span>
          </div>
        </CardContent>
      </Card>

      {/* Notes Section */}
      {appointment.notes && (
        <Card className="mx-4 mt-4 shadow-sm">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-gray-600" />
                <span className="font-semibold text-gray-700">Notes</span>
              </div>
              <div className="flex gap-2">
                <button className="text-blue-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </button>
                <Plus className="h-4 w-4 text-blue-600" />
              </div>
            </div>

            <div className="text-sm text-gray-500 mb-2">
              {new Date().toLocaleDateString()}, {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </div>

            <p className="text-gray-700 mb-4">{appointment.notes}</p>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-gray-600" />
              </div>
              <span className="font-medium text-gray-700">{appointment.technician}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Additional Sections */}
      <div className="mx-4 mt-4 space-y-4 pb-8">
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-gray-600" />
                <span className="font-semibold text-gray-700">Estimate Fields</span>
              </div>
              <Plus className="h-5 w-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-gray-600" />
                <span className="font-semibold text-gray-700">Job Tags</span>
              </div>
              <Plus className="h-5 w-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Paperclip className="h-5 w-5 text-gray-600" />
                <span className="font-semibold text-gray-700">Attachments</span>
              </div>
              <Plus className="h-5 w-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
