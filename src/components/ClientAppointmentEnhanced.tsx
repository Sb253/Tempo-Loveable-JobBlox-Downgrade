import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { AppointmentHeader } from './appointment/AppointmentHeader';
import { StatusCard } from './appointment/StatusCard';
import { CustomerCard } from './appointment/CustomerCard';
import { ScheduleCard } from './appointment/ScheduleCard';
import { EditableExpirationCard } from './appointment/EditableExpirationCard';
import { LineItemsCard } from './appointment/LineItemsCard';
import { EditableNotesCard } from './appointment/EditableNotesCard';
import { EstimateFieldsCard } from './appointment/EstimateFieldsCard';
import { AttachmentsCard } from './appointment/AttachmentsCard';
import { OnMyWayButtonOptions } from './appointment/OnMyWayButtonOptions';

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
  const [showOnMyWayOptions, setShowOnMyWayOptions] = useState(false);

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
        isActive: true,
        totalMinutes: prev.timeTracking?.totalMinutes || 0
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

  const handleNotesUpdate = (newNotes: string) => {
    setAppointment(prev => ({
      ...prev,
      notes: newNotes
    }));
  };

  if (showOnMyWayOptions) {
    return (
      <div className="bg-background min-h-screen p-4">
        <button 
          onClick={() => setShowOnMyWayOptions(false)}
          className="mb-4 text-blue-600 hover:underline"
        >
          ← Back to Appointment
        </button>
        <OnMyWayButtonOptions 
          appointment={{
            customer: appointment.customer,
            phone: appointment.phone,
            email: appointment.email,
            technician: appointment.technician,
            scheduledTime: appointment.scheduledTime
          }}
          status={appointment.status}
        />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <AppointmentHeader appointmentId="5709" status={appointment.status} />

      <div className="space-y-3 p-4">
        <StatusCard
          status={appointment.status}
          timeTracking={appointment.timeTracking}
          appointment={{
            customer: appointment.customer,
            phone: appointment.phone,
            email: appointment.email,
            technician: appointment.technician,
            scheduledTime: appointment.scheduledTime,
            title: appointment.title
          }}
          onStartTimeTracking={startTimeTracking}
          onPauseTimeTracking={pauseTimeTracking}
          onCompleteAppointment={completeAppointment}
          activeTime={getActiveTime()}
          formatDuration={formatDuration}
        />

        <CustomerCard
          customer={appointment.customer}
          address={appointment.address}
          phone={appointment.phone}
          email={appointment.email}
        />

        <ScheduleCard
          scheduledDate={appointment.scheduledDate}
          scheduledTime={appointment.scheduledTime}
          technician={appointment.technician}
        />

        <EditableExpirationCard />

        <LineItemsCard />

        <EditableNotesCard
          notes={appointment.notes}
          technician={appointment.technician}
          onNotesUpdate={handleNotesUpdate}
        />

        <EstimateFieldsCard />

        <AttachmentsCard />

        <div className="mt-4">
          <button 
            onClick={() => setShowOnMyWayOptions(true)}
            className="text-blue-600 hover:underline text-sm"
          >
            → View "On My Way" Button Options
          </button>
        </div>
      </div>
    </div>
  );
};
