
import { useState } from 'react';
import { ClientAppointmentList } from './ClientAppointmentList';
import { ClientAppointmentEnhanced } from './ClientAppointmentEnhanced';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

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

export const ClientAppointment = () => {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleBackToList = () => {
    setSelectedAppointment(null);
  };

  if (selectedAppointment) {
    return (
      <div>
        <div className="p-4 border-b bg-background">
          <Button 
            variant="ghost" 
            onClick={handleBackToList}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Appointments
          </Button>
        </div>
        <ClientAppointmentEnhanced selectedAppointment={selectedAppointment} />
      </div>
    );
  }

  return <ClientAppointmentList onAppointmentClick={handleAppointmentClick} />;
};
