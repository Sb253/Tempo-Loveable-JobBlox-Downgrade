
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Calendar as CalendarIcon, Clock, MapPin, User, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Employee {
  id: string;
  name: string;
  skills: string[];
  workRadius: number;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  availability: {
    [date: string]: string[]; // Available time slots for each date
  };
  status: 'available' | 'busy' | 'break' | 'offline';
}

interface AppointmentData {
  type: 'job' | 'work-order' | 'estimate' | 'inspection';
  date: Date | undefined;
  timeSlot: string;
  employeeId: string;
  customerLocation: string;
  notes: string;
  priority: 'low' | 'medium' | 'high';
}

const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Mike Johnson',
    skills: ['Plumbing', 'Electrical', 'General Repair'],
    workRadius: 25,
    location: {
      lat: 40.7128,
      lng: -74.0060,
      address: 'Downtown NYC'
    },
    availability: {
      '2024-12-18': ['09:00', '10:00', '11:00', '14:00', '15:00'],
      '2024-12-19': ['09:00', '10:00', '13:00', '14:00', '16:00'],
      '2024-12-20': ['08:00', '09:00', '10:00', '15:00', '16:00']
    },
    status: 'available'
  },
  {
    id: '2',
    name: 'Sarah Davis',
    skills: ['Carpentry', 'Renovation', 'Inspection'],
    workRadius: 35,
    location: {
      lat: 40.7580,
      lng: -73.9855,
      address: 'Midtown NYC'
    },
    availability: {
      '2024-12-18': ['08:00', '09:00', '13:00', '14:00', '15:00'],
      '2024-12-19': ['10:00', '11:00', '14:00', '15:00', '16:00'],
      '2024-12-20': ['09:00', '10:00', '11:00', '13:00', '14:00']
    },
    status: 'available'
  },
  {
    id: '3',
    name: 'Tom Wilson',
    skills: ['HVAC', 'Electrical', 'Maintenance'],
    workRadius: 30,
    location: {
      lat: 40.6892,
      lng: -74.0445,
      address: 'Brooklyn NYC'
    },
    availability: {
      '2024-12-18': ['09:00', '10:00', '11:00', '15:00', '16:00'],
      '2024-12-19': ['08:00', '09:00', '13:00', '14:00', '15:00'],
      '2024-12-20': ['10:00', '11:00', '13:00', '14:00', '16:00']
    },
    status: 'busy'
  }
];

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00'
];

interface AppointmentSchedulerProps {
  onScheduled?: (appointment: AppointmentData & { employeeName: string }) => void;
}

export const AppointmentScheduler = ({ onScheduled }: AppointmentSchedulerProps) => {
  const { toast } = useToast();
  const [employees] = useState<Employee[]>(mockEmployees);
  const [appointmentData, setAppointmentData] = useState<AppointmentData>({
    type: 'estimate',
    date: undefined,
    timeSlot: '',
    employeeId: '',
    customerLocation: '',
    notes: '',
    priority: 'medium'
  });
  const [availableEmployees, setAvailableEmployees] = useState<Employee[]>([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);

  // Filter available employees based on location and appointment type
  useEffect(() => {
    const filtered = employees.filter(emp => {
      // For demo purposes, show all employees
      // In real implementation, filter by location proximity and skills
      return emp.status === 'available' || emp.status === 'busy';
    });
    setAvailableEmployees(filtered);
  }, [employees, appointmentData.customerLocation]);

  // Update available time slots when date or employee changes
  useEffect(() => {
    if (appointmentData.date && appointmentData.employeeId) {
      const selectedEmployee = employees.find(emp => emp.id === appointmentData.employeeId);
      const dateString = format(appointmentData.date, 'yyyy-MM-dd');
      
      if (selectedEmployee && selectedEmployee.availability[dateString]) {
        setAvailableTimeSlots(selectedEmployee.availability[dateString]);
      } else {
        setAvailableTimeSlots([]);
      }
    } else {
      setAvailableTimeSlots([]);
    }
  }, [appointmentData.date, appointmentData.employeeId, employees]);

  const handleInputChange = (field: keyof AppointmentData, value: any) => {
    setAppointmentData(prev => ({
      ...prev,
      [field]: value
    }));

    // Reset dependent fields when date or employee changes
    if (field === 'date' || field === 'employeeId') {
      setAppointmentData(prev => ({
        ...prev,
        timeSlot: ''
      }));
    }
  };

  const handleScheduleAppointment = () => {
    if (!appointmentData.date || !appointmentData.timeSlot || !appointmentData.employeeId) {
      toast({
        title: "Missing Information",
        description: "Please select a date, time, and employee for the appointment.",
        variant: "destructive"
      });
      return;
    }

    const selectedEmployee = employees.find(emp => emp.id === appointmentData.employeeId);
    
    if (selectedEmployee) {
      const appointmentWithEmployee = {
        ...appointmentData,
        employeeName: selectedEmployee.name
      };

      onScheduled?.(appointmentWithEmployee);

      toast({
        title: "Appointment Scheduled",
        description: `${appointmentData.type} scheduled with ${selectedEmployee.name} on ${format(appointmentData.date, 'PPP')} at ${appointmentData.timeSlot}`,
      });

      // Reset form
      setAppointmentData({
        type: 'estimate',
        date: undefined,
        timeSlot: '',
        employeeId: '',
        customerLocation: '',
        notes: '',
        priority: 'medium'
      });
    }
  };

  const getAppointmentTypeColor = (type: string) => {
    switch (type) {
      case 'job': return 'bg-blue-100 text-blue-800';
      case 'work-order': return 'bg-green-100 text-green-800';
      case 'estimate': return 'bg-yellow-100 text-yellow-800';
      case 'inspection': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          Schedule Appointment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Appointment Type and Priority */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Appointment Type *</Label>
            <Select 
              value={appointmentData.type} 
              onValueChange={(value: any) => handleInputChange('type', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select appointment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="estimate">Estimate</SelectItem>
                <SelectItem value="inspection">Inspection</SelectItem>
                <SelectItem value="job">Job</SelectItem>
                <SelectItem value="work-order">Work Order</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Priority</Label>
            <Select 
              value={appointmentData.priority} 
              onValueChange={(value: any) => handleInputChange('priority', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Customer Location */}
        <div className="space-y-2">
          <Label htmlFor="location" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Customer Location *
          </Label>
          <Input
            id="location"
            value={appointmentData.customerLocation}
            onChange={(e) => handleInputChange('customerLocation', e.target.value)}
            placeholder="Enter customer address"
          />
        </div>

        {/* Date Selection */}
        <div className="space-y-2">
          <Label>Appointment Date *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !appointmentData.date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {appointmentData.date ? format(appointmentData.date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={appointmentData.date}
                onSelect={(date) => handleInputChange('date', date)}
                disabled={(date) => date < new Date()}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Employee Selection */}
        <div className="space-y-2">
          <Label>Assign Employee *</Label>
          <Select 
            value={appointmentData.employeeId} 
            onValueChange={(value) => handleInputChange('employeeId', value)}
            disabled={!appointmentData.date}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an employee" />
            </SelectTrigger>
            <SelectContent>
              {availableEmployees.map((employee) => (
                <SelectItem key={employee.id} value={employee.id}>
                  <div className="flex items-center justify-between w-full">
                    <span>{employee.name}</span>
                    <div className="flex items-center gap-2 ml-2">
                      <Badge variant="outline" className="text-xs">
                        {employee.workRadius}mi
                      </Badge>
                      <Badge className={employee.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {employee.status}
                      </Badge>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {appointmentData.employeeId && (
            <div className="mt-2">
              {(() => {
                const selectedEmployee = employees.find(emp => emp.id === appointmentData.employeeId);
                return selectedEmployee ? (
                  <div className="text-sm text-muted-foreground">
                    <p className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {selectedEmployee.location.address}
                    </p>
                    <p>Skills: {selectedEmployee.skills.join(', ')}</p>
                  </div>
                ) : null;
              })()}
            </div>
          )}
        </div>

        {/* Time Slot Selection */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Available Time Slots *
          </Label>
          {availableTimeSlots.length > 0 ? (
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
              {availableTimeSlots.map((slot) => (
                <Button
                  key={slot}
                  variant={appointmentData.timeSlot === slot ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleInputChange('timeSlot', slot)}
                  className="h-8"
                >
                  {slot}
                </Button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              {appointmentData.date && appointmentData.employeeId 
                ? "No available time slots for selected date" 
                : "Select a date and employee to view available time slots"
              }
            </p>
          )}
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea
            id="notes"
            value={appointmentData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            placeholder="Any special instructions or requirements..."
            rows={3}
          />
        </div>

        {/* Appointment Summary */}
        {appointmentData.date && appointmentData.timeSlot && appointmentData.employeeId && (
          <div className="border rounded-lg p-4 bg-muted/50">
            <h4 className="font-medium mb-2">Appointment Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span>Type:</span>
                <Badge className={getAppointmentTypeColor(appointmentData.type)}>
                  {appointmentData.type}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Priority:</span>
                <Badge className={getPriorityColor(appointmentData.priority)}>
                  {appointmentData.priority}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Date & Time:</span>
                <span>{format(appointmentData.date, 'PPP')} at {appointmentData.timeSlot}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Employee:</span>
                <span>{employees.find(emp => emp.id === appointmentData.employeeId)?.name}</span>
              </div>
            </div>
          </div>
        )}

        {/* Schedule Button */}
        <Button 
          onClick={handleScheduleAppointment}
          className="w-full"
          size="lg"
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Schedule Appointment
        </Button>
      </CardContent>
    </Card>
  );
};
