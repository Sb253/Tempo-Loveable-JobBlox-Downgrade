import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft,
  Edit,
  Play,
  Square,
  Truck,
  User,
  Phone,
  MessageCircle,
  MapPin,
  Calendar,
  Clock,
  Plus,
  ChevronRight,
  Paperclip,
  Tag,
  FileText,
  CheckCircle,
  AlertCircle,
  XCircle,
  MoreHorizontal
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

  const sendOnMyWayNotification = async () => {
    try {
      // Calculate ETA (example: 15 minutes from now)
      const eta = new Date(Date.now() + 15 * 60 * 1000);
      const etaString = eta.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      const message = `Hi ${appointment.customer}, this is ${appointment.technician} from Construction CRM. I'm on my way to your location for your ${appointment.scheduledTime} appointment. I should arrive around ${etaString}. Please text back if you have any questions!`;

      // Simulate sending SMS and email
      console.log(`Sending SMS to ${appointment.phone}: ${message}`);
      console.log(`Sending email to ${appointment.email}: ${message}`);

      // Update appointment status
      setAppointment(prev => ({ ...prev, status: 'in-progress' }));

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

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg font-semibold text-center flex-1">Estimate #5709</h1>
          </div>
          
          {/* Action Buttons */}
          <div className="grid grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center">
              <Button variant="outline" size="icon" className="w-12 h-12 rounded-full bg-blue-50 border-blue-200 hover:bg-blue-100">
                <Edit className="h-5 w-5 text-blue-600" />
              </Button>
              <span className="text-xs text-blue-600 mt-1 font-medium">Approve</span>
            </div>
            <div className="flex flex-col items-center">
              <Button variant="outline" size="icon" className="w-12 h-12 rounded-full bg-blue-50 border-blue-200 hover:bg-blue-100">
                <FileText className="h-5 w-5 text-blue-600" />
              </Button>
              <span className="text-xs text-blue-600 mt-1 font-medium">Estimate</span>
            </div>
            <div className="flex flex-col items-center">
              <Button variant="outline" size="icon" className="w-12 h-12 rounded-full bg-blue-50 border-blue-200 hover:bg-blue-100">
                <CheckCircle className="h-5 w-5 text-blue-600" />
              </Button>
              <span className="text-xs text-blue-600 mt-1 font-medium">Copy to Job</span>
            </div>
            <div className="flex flex-col items-center">
              <Button variant="outline" size="icon" className="w-12 h-12 rounded-full bg-blue-50 border-blue-200 hover:bg-blue-100">
                <MoreHorizontal className="h-5 w-5 text-blue-600" />
              </Button>
              <span className="text-xs text-blue-600 mt-1 font-medium">More</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3 p-4">
        {/* Status Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                <span className="font-medium">Status</span>
              </div>
              <Badge variant="destructive">EXPIRED</Badge>
            </div>
            
            {/* Time Tracking Controls */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <Button
                  onClick={sendOnMyWayNotification}
                  variant="outline"
                  className="w-12 h-12 rounded-full bg-orange-50 border-orange-200 hover:bg-orange-100"
                  disabled={appointment.status === 'completed'}
                >
                  <Truck className="h-6 w-6 text-orange-600" />
                </Button>
                <span className="text-sm text-orange-600 font-medium block mt-2">ON MY WAY</span>
              </div>
              
              <div className="text-center">
                <Button
                  onClick={appointment.status === 'scheduled' ? startTimeTracking : 
                           appointment.timeTracking?.isActive ? pauseTimeTracking : startTimeTracking}
                  className={`w-12 h-12 rounded-full ${
                    appointment.timeTracking?.isActive 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  <Play className="h-6 w-6" />
                </Button>
                <span className="text-sm text-green-600 font-medium block mt-2">START</span>
              </div>
              
              <div className="text-center">
                <Button
                  onClick={completeAppointment}
                  variant="outline"
                  className="w-12 h-12 rounded-full bg-gray-50 border-gray-200 hover:bg-gray-100"
                  disabled={appointment.status === 'completed'}
                >
                  <Square className="h-6 w-6 text-gray-600" />
                </Button>
                <span className="text-sm text-gray-600 font-medium block mt-2">FINISH</span>
              </div>
            </div>
            
            {/* Active Timer Display */}
            {getActiveTime() > 0 && (
              <div className="mt-4 text-center">
                <div className="text-2xl font-bold">{formatDuration(getActiveTime())}</div>
                {appointment.timeTracking?.isActive && (
                  <div className="text-sm text-green-600 font-medium">● Recording</div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Customer Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="h-5 w-5" />
              Customer
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Property Image */}
            <div className="relative mb-4 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=200&fit=crop" 
                alt="Property" 
                className="w-full h-40 object-cover"
              />
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                $1,755,773
              </div>
              <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                Built in 1926
              </div>
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                4 Beds | 2.0 Baths | 2710 Sq. ft.
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{appointment.customer}</h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="w-10 h-10 p-0 rounded-full">
                    <MessageCircle className="h-4 w-4 text-gray-600" />
                  </Button>
                  <Button size="sm" variant="outline" className="w-10 h-10 p-0 rounded-full">
                    <MessageCircle className="h-4 w-4 text-blue-600" />
                  </Button>
                  <Button size="sm" variant="outline" className="w-10 h-10 p-0 rounded-full">
                    <Phone className="h-4 w-4 text-green-600" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{appointment.address}</p>
                  <p className="text-sm text-gray-500">Seattle, WA, 98112</p>
                </div>
                <Button size="sm" variant="outline" className="w-10 h-10 p-0 rounded-full">
                  <MapPin className="h-4 w-4 text-blue-600" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schedule Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between text-base">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Schedule
              </div>
              <Button size="sm" variant="ghost" className="p-1 rounded-full hover:bg-gray-100">
                <Edit className="h-4 w-4 text-blue-600" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">From:</span>
              <div className="text-right">
                <div className="font-medium">{appointment.scheduledDate}</div>
                <div className="text-sm text-gray-500">{appointment.scheduledTime}</div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm">To:</span>
              <div className="text-right">
                <div className="font-medium">{appointment.scheduledDate}</div>
                <div className="text-sm text-gray-500">11:30a</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 pt-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-blue-600">
                  {appointment.technician.charAt(0)}
                </span>
              </div>
              <span className="font-medium">{appointment.technician}</span>
            </div>
          </CardContent>
        </Card>

        {/* Expiration Date Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between text-base">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Expiration date
              </div>
              <Button size="sm" variant="ghost" className="p-1 rounded-full hover:bg-gray-100">
                <Edit className="h-4 w-4 text-blue-600" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
              <div className="flex items-center gap-2 text-red-700">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">This estimate has expired.</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Expires on</span>
              <span className="font-medium">Apr 30, 2024</span>
            </div>
          </CardContent>
        </Card>

        {/* Line Items Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between text-base">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Line Items
              </div>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" className="p-1 rounded-full hover:bg-gray-100">
                  <ChevronRight className="h-4 w-4 text-blue-600" />
                </Button>
                <Button size="sm" variant="ghost" className="p-1 rounded-full hover:bg-gray-100">
                  <Edit className="h-4 w-4 text-blue-600" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Services</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div>
                    <div className="font-medium">Standard Install Package: #2</div>
                    <div className="text-sm text-gray-500">Qty 1 @ $6,200.00/Each</div>
                    <div className="text-sm text-gray-600">Tear out and removal of existing standard tub or shower system without...</div>
                  </div>
                  <div className="font-medium">$6,200.00</div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Materials</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div>
                    <div className="font-medium">MileStone Bath Systems - Bella Stone™ Smooth Marble Full Bath...</div>
                    <div className="text-sm text-gray-500">Qty 1 @ $2,450.25/Each</div>
                    <div className="text-sm text-gray-600">High quality acrylic walls are high-gloss and UV protected against yellowing. ...</div>
                  </div>
                  <div className="font-medium">$2,450.25</div>
                </div>
                
                <div className="flex justify-between">
                  <div>
                    <div className="font-medium">60x30 21" Tub</div>
                    <div className="text-sm text-gray-500">Qty 1 @ $2,509.99/Each</div>
                    <div className="text-sm text-gray-600">White L</div>
                  </div>
                  <div className="font-medium">$2,509.99</div>
                </div>
                
                <div className="flex justify-between">
                  <div>
                    <div className="font-medium">Tru-Temp Pressure Balance 1/2" Rough-In Valve - Tru-Temp Pressure...</div>
                    <div className="text-sm text-gray-500">Qty 1 @ $291.38/Each</div>
                    <div className="text-sm text-gray-600">PULSE ShowerSpas Tru-Temp Pressure Balance Rough-In Valve with Trim Kit utili...</div>
                  </div>
                  <div className="font-medium">$291.38</div>
                </div>
              </div>
            </div>
            
            {/* Pricing Summary */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium">$12,899.62</span>
              </div>
              
              <div className="flex justify-between">
                <div>
                  <div>Discount</div>
                  <div className="text-sm text-gray-500">Seattle Home Show ($2,000.00)</div>
                </div>
                <span className="font-medium">-$2,000.00</span>
              </div>
              
              <div className="flex justify-between">
                <div>
                  <div>Tax</div>
                  <div className="text-sm text-gray-500">King County (10.5%)</div>
                </div>
                <span className="font-medium">$1,144.46</span>
              </div>
              
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total</span>
                <span>$12,044.08</span>
              </div>
              
              <div className="flex justify-between border-t pt-2">
                <div>
                  <div>Deposit</div>
                  <div className="text-sm text-gray-500">Due on 3/13</div>
                </div>
                <span className="font-medium">$6,298.29</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notes Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between text-base">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Notes
              </div>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" className="p-1 rounded-full hover:bg-gray-100">
                  <ChevronRight className="h-4 w-4 text-blue-600" />
                </Button>
                <Button size="sm" variant="ghost" className="p-1 rounded-full hover:bg-gray-100">
                  <Plus className="h-4 w-4 text-blue-600" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-500 mb-2">02/23/2024, 4:59PM</div>
            <div className="font-medium mb-3">{appointment.notes || "REMODEL OF SMALL BATHROOM ON THE UPPER FLOOR"}</div>
            
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-semibold text-blue-600">
                  {appointment.technician.split(' ').map(n => n.charAt(0)).join('')}
                </span>
              </div>
              <span className="font-medium">{appointment.technician}</span>
            </div>
          </CardContent>
        </Card>

        {/* Expandable Sections */}
        <div className="space-y-2">
          <Card className="border-2 border-dashed border-gray-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <span className="font-medium">Estimate Fields</span>
                </div>
                <Button size="sm" variant="ghost" className="p-1 rounded-full hover:bg-gray-100">
                  <Plus className="h-5 w-5 text-gray-500" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-dashed border-gray-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Tag className="h-5 w-5 text-gray-500" />
                  <span className="font-medium">Job Tags</span>
                </div>
                <Button size="sm" variant="ghost" className="p-1 rounded-full hover:bg-gray-100">
                  <Plus className="h-5 w-5 text-gray-500" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-dashed border-gray-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Paperclip className="h-5 w-5 text-gray-500" />
                  <span className="font-medium">Attachments</span>
                </div>
                <Button size="sm" variant="ghost" className="p-1 rounded-full hover:bg-gray-100">
                  <Plus className="h-5 w-5 text-gray-500" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
