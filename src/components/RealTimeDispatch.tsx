
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Clock, MapPin, User, Zap, Phone } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface DispatchEvent {
  id: string;
  type: 'urgent' | 'emergency' | 'routine' | 'update';
  jobId: string;
  jobTitle: string;
  customer: string;
  location: string;
  priority: 'high' | 'medium' | 'low';
  assignedTechnician?: string;
  timestamp: string;
  status: 'pending' | 'dispatched' | 'en-route' | 'arrived' | 'completed';
  estimatedArrival?: string;
}

export const RealTimeDispatch = () => {
  const [events, setEvents] = useState<DispatchEvent[]>([
    {
      id: '1',
      type: 'emergency',
      jobId: 'J001',
      jobTitle: 'Water Leak Emergency',
      customer: 'John Smith',
      location: '123 Main St, Anytown',
      priority: 'high',
      assignedTechnician: 'Mike Johnson',
      timestamp: '2 minutes ago',
      status: 'dispatched',
      estimatedArrival: '15 minutes'
    },
    {
      id: '2',
      type: 'routine',
      jobId: 'J002',
      jobTitle: 'Kitchen Inspection',
      customer: 'Sarah Wilson',
      location: '456 Oak St, City',
      priority: 'medium',
      timestamp: '5 minutes ago',
      status: 'pending'
    }
  ]);

  const [technicians] = useState([
    { id: '1', name: 'Mike Johnson', status: 'available', location: 'Downtown' },
    { id: '2', name: 'Sarah Davis', status: 'busy', location: 'Uptown' },
    { id: '3', name: 'Tom Wilson', status: 'available', location: 'Midtown' }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate incoming dispatch events
      if (Math.random() > 0.95) {
        const newEvent: DispatchEvent = {
          id: Date.now().toString(),
          type: Math.random() > 0.8 ? 'urgent' : 'routine',
          jobId: `J${Math.floor(Math.random() * 1000)}`,
          jobTitle: 'New Service Request',
          customer: 'New Customer',
          location: 'Auto-generated location',
          priority: Math.random() > 0.7 ? 'high' : 'medium',
          timestamp: 'Just now',
          status: 'pending'
        };
        
        setEvents(prev => [newEvent, ...prev.slice(0, 9)]);
        
        if (newEvent.type === 'urgent') {
          toast.error("Urgent dispatch required!", {
            description: `${newEvent.jobTitle} - ${newEvent.customer}`
          });
        }
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'emergency': return 'bg-red-100 text-red-800';
      case 'urgent': return 'bg-orange-100 text-orange-800';
      case 'routine': return 'bg-blue-100 text-blue-800';
      case 'update': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'dispatched': return 'bg-blue-100 text-blue-800';
      case 'en-route': return 'bg-purple-100 text-purple-800';
      case 'arrived': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDispatch = (eventId: string, technicianId: string) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { 
            ...event, 
            status: 'dispatched', 
            assignedTechnician: technicians.find(t => t.id === technicianId)?.name,
            estimatedArrival: '20 minutes'
          }
        : event
    ));
    
    toast.success("Job dispatched successfully", {
      description: "Technician has been notified"
    });
  };

  const handleStatusUpdate = (eventId: string, newStatus: DispatchEvent['status']) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId ? { ...event, status: newStatus } : event
    ));
    
    toast.success(`Status updated to: ${newStatus.replace('-', ' ')}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Real-Time Dispatch Center</h2>
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-green-500" />
          <span className="text-sm text-muted-foreground">Live Updates Active</span>
        </div>
      </div>

      {/* Active Dispatches Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Zap className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-2xl font-bold">{events.filter(e => e.type === 'emergency').length}</p>
                <p className="text-sm text-muted-foreground">Emergency</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{events.filter(e => e.status === 'pending').length}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <MapPin className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{events.filter(e => e.status === 'en-route').length}</p>
                <p className="text-sm text-muted-foreground">En Route</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <User className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{technicians.filter(t => t.status === 'available').length}</p>
                <p className="text-sm text-muted-foreground">Available</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dispatch Events */}
      <Card>
        <CardHeader>
          <CardTitle>Live Dispatch Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <Badge className={getEventTypeColor(event.type)}>
                      {event.type}
                    </Badge>
                    <Badge className={getStatusColor(event.status)}>
                      {event.status.replace('-', ' ')}
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">{event.timestamp}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h3 className="font-semibold">{event.jobTitle}</h3>
                    <p className="text-sm text-muted-foreground">Job ID: {event.jobId}</p>
                    <p className="text-sm">{event.customer}</p>
                    <p className="text-sm text-muted-foreground">{event.location}</p>
                  </div>

                  <div>
                    {event.status === 'pending' ? (
                      <div className="space-y-2">
                        <Select onValueChange={(value) => handleDispatch(event.id, value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Assign Technician" />
                          </SelectTrigger>
                          <SelectContent>
                            {technicians.filter(t => t.status === 'available').map(tech => (
                              <SelectItem key={tech.id} value={tech.id}>
                                {tech.name} - {tech.location}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm font-medium">Assigned: {event.assignedTechnician}</p>
                        {event.estimatedArrival && (
                          <p className="text-sm text-muted-foreground">ETA: {event.estimatedArrival}</p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {event.status !== 'completed' && (
                      <Select onValueChange={(value) => handleStatusUpdate(event.id, value as DispatchEvent['status'])}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Update Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dispatched">Dispatched</SelectItem>
                          <SelectItem value="en-route">En Route</SelectItem>
                          <SelectItem value="arrived">Arrived</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                    <Button variant="outline" size="sm">
                      <Phone className="h-3 w-3 mr-1" />
                      Call
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
