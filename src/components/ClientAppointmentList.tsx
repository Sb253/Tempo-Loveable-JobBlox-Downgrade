
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  XCircle,
  Play
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
      startTime: new Date(Date.now() - 20 * 60 * 1000),
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

interface ClientAppointmentListProps {
  onAppointmentClick: (appointment: Appointment) => void;
}

export const ClientAppointmentList = ({ onAppointmentClick }: ClientAppointmentListProps) => {
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
          <p className="text-muted-foreground">Overview of all client appointments</p>
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
              {mockAppointments.filter(apt => apt.scheduledDate === '2024-12-18').length}
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
              {mockAppointments.filter(apt => apt.status === 'in-progress').length}
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
              {mockAppointments.filter(apt => apt.status === 'completed').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockAppointments.filter(apt => apt.status === 'scheduled').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appointments List */}
      <div className="space-y-3">
        {mockAppointments.map((appointment) => (
          <Card 
            key={appointment.id} 
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onAppointmentClick(appointment)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
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

                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
