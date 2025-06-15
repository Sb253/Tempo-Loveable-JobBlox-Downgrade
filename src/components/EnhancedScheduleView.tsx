
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, User, Plus, Zap, Bell } from "lucide-react";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { MapView } from "./MapView";
import { toast } from "@/components/ui/sonner";

interface ScheduleItem {
  id: string;
  title: string;
  customer: string;
  time: string;
  duration: string;
  location: string;
  status: 'scheduled' | 'in-progress' | 'completed';
  technician: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
  template?: string;
}

// Sample coordinates for demo purposes
const mockScheduleItems: ScheduleItem[] = [
  {
    id: '1',
    title: 'Kitchen Renovation - Site Visit',
    customer: 'John Smith',
    time: '09:00',
    duration: '2h',
    location: '123 Main St, Anytown',
    status: 'scheduled',
    technician: 'Mike Johnson',
    date: '2024-12-17',
    priority: 'high',
    template: 'Kitchen Inspection'
  },
  {
    id: '2',
    title: 'Bathroom Repair',
    customer: 'ABC Construction Inc.',
    time: '11:30',
    duration: '4h',
    location: '456 Business Ave, City',
    status: 'in-progress',
    technician: 'Sarah Davis',
    date: '2024-12-17',
    priority: 'medium'
  },
  {
    id: '3',
    title: 'Deck Installation - Materials Delivery',
    customer: 'Sarah Johnson',
    time: '14:00',
    duration: '1h',
    location: '789 Oak Drive, Hometown',
    status: 'scheduled',
    technician: 'Tom Wilson',
    date: '2024-12-18',
    priority: 'low'
  }
];

// Mock job locations with coordinates
const mockJobLocations = [
  {
    id: '1',
    title: 'Kitchen Renovation - Site Visit',
    customer: 'John Smith',
    address: '123 Main St, Anytown',
    coordinates: [-74.006, 40.7128] as [number, number],
    status: 'scheduled' as const
  },
  {
    id: '2',
    title: 'Bathroom Repair',
    customer: 'ABC Construction Inc.',
    address: '456 Business Ave, City',
    coordinates: [-74.0, 40.72] as [number, number],
    status: 'in-progress' as const
  },
  {
    id: '3',
    title: 'Deck Installation - Materials Delivery',
    customer: 'Sarah Johnson',
    address: '789 Oak Drive, Hometown',
    coordinates: [-73.99, 40.71] as [number, number],
    status: 'scheduled' as const
  }
];

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
];

const technicians = ['Mike Johnson', 'Sarah Davis', 'Tom Wilson', 'Alex Brown'];

export const EnhancedScheduleView = () => {
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>(mockScheduleItems);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    // Handle different drop scenarios
    if (source.droppableId === 'unassigned' && destination.droppableId.startsWith('technician-')) {
      // Assigning job to technician
      const technicianName = destination.droppableId.replace('technician-', '');
      const newTimeSlot = timeSlots[destination.index] || '09:00';
      
      setScheduleItems(prev => prev.map(item => 
        item.id === draggableId 
          ? { ...item, technician: technicianName, time: newTimeSlot }
          : item
      ));
      
      toast.success(`Job assigned to ${technicianName}`);
    } else if (source.droppableId.startsWith('technician-') && destination.droppableId.startsWith('technician-')) {
      // Moving between technicians or reordering
      const newTechnician = destination.droppableId.replace('technician-', '');
      const newTimeSlot = timeSlots[destination.index] || '09:00';
      
      setScheduleItems(prev => prev.map(item => 
        item.id === draggableId 
          ? { ...item, technician: newTechnician, time: newTimeSlot }
          : item
      ));
      
      if (source.droppableId !== destination.droppableId) {
        toast.success(`Job reassigned to ${newTechnician}`);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
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

  const todaysJobs = scheduleItems.filter(item => item.date === selectedDate);
  const unassignedJobs = todaysJobs.filter(item => !item.technician);

  const handleDispatchJob = (jobId: string) => {
    toast.success("Job dispatched", {
      description: "Technician has been notified and customer will receive updates"
    });
  };

  const handleEmergencyInsert = () => {
    const emergencyJob: ScheduleItem = {
      id: Date.now().toString(),
      title: 'EMERGENCY - Water Leak',
      customer: 'Emergency Customer',
      time: '10:30',
      duration: '1h',
      location: 'Emergency Location',
      status: 'scheduled',
      technician: 'Mike Johnson',
      date: selectedDate,
      priority: 'high'
    };
    
    setScheduleItems(prev => [emergencyJob, ...prev]);
    toast.error("Emergency job inserted", {
      description: "High priority job added to schedule"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Enhanced Schedule Management</h2>
        <div className="flex items-center gap-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border rounded-md"
          />
          <Button onClick={handleEmergencyInsert} variant="destructive">
            <Zap className="h-4 w-4 mr-2" />
            Emergency Insert
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Job
          </Button>
        </div>
      </div>

      {/* Real-time alerts */}
      <div className="flex gap-4 mb-4">
        <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
          <Bell className="h-4 w-4 text-blue-600" />
          <span className="text-sm text-blue-700">2 technicians en route</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
          <MapPin className="h-4 w-4 text-green-600" />
          <span className="text-sm text-green-700">GPS tracking active</span>
        </div>
      </div>

      {/* Map View with GPS Integration */}
      <MapView jobs={mockJobLocations} />

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Unassigned Jobs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Unassigned Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <Droppable droppableId="unassigned">
                {(provided, snapshot) => (
                  <div 
                    {...provided.droppableProps} 
                    ref={provided.innerRef}
                    className={`space-y-2 min-h-32 p-2 rounded ${snapshot.isDraggingOver ? 'bg-blue-50' : ''}`}
                  >
                    {unassignedJobs.map((job, index) => (
                      <Draggable key={job.id} draggableId={job.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`p-3 border rounded-lg bg-white shadow-sm cursor-move ${snapshot.isDragging ? 'shadow-lg rotate-2' : ''}`}
                          >
                            <div className="text-sm font-medium">{job.title}</div>
                            <div className="text-xs text-muted-foreground">{job.customer}</div>
                            <div className="flex gap-1 mt-2">
                              <Badge className={getPriorityColor(job.priority)} size="sm">
                                {job.priority}
                              </Badge>
                              {job.template && (
                                <Badge variant="outline" size="sm">Template</Badge>
                              )}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </CardContent>
          </Card>

          {/* Technician Columns */}
          {technicians.map((technician) => {
            const techJobs = todaysJobs.filter(job => job.technician === technician);
            
            return (
              <Card key={technician}>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center justify-between">
                    {technician}
                    <Badge variant="outline">{techJobs.length} jobs</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Droppable droppableId={`technician-${technician}`}>
                    {(provided, snapshot) => (
                      <div 
                        {...provided.droppableProps} 
                        ref={provided.innerRef}
                        className={`space-y-2 min-h-96 p-2 rounded ${snapshot.isDraggingOver ? 'bg-green-50' : ''}`}
                      >
                        {timeSlots.map((slot, slotIndex) => {
                          const jobInSlot = techJobs.find(job => job.time === slot);
                          
                          if (jobInSlot) {
                            return (
                              <Draggable key={jobInSlot.id} draggableId={jobInSlot.id} index={slotIndex}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`p-3 border rounded-lg bg-white shadow-sm cursor-move ${snapshot.isDragging ? 'shadow-lg rotate-2' : ''}`}
                                  >
                                    <div className="flex justify-between items-start mb-1">
                                      <span className="text-sm font-medium">{slot}</span>
                                      <Badge className={getStatusColor(jobInSlot.status)} size="sm">
                                        {jobInSlot.status}
                                      </Badge>
                                    </div>
                                    <div className="text-sm font-medium">{jobInSlot.title}</div>
                                    <div className="text-xs text-muted-foreground">{jobInSlot.customer}</div>
                                    <div className="text-xs text-muted-foreground">{jobInSlot.duration}</div>
                                    <div className="flex gap-1 mt-2">
                                      <Badge className={getPriorityColor(jobInSlot.priority)} size="sm">
                                        {jobInSlot.priority}
                                      </Badge>
                                      {jobInSlot.template && (
                                        <Badge variant="outline" size="sm">Template</Badge>
                                      )}
                                    </div>
                                    <div className="flex gap-1 mt-2">
                                      <Button 
                                        size="sm" 
                                        variant="outline" 
                                        className="text-xs h-6"
                                        onClick={() => handleDispatchJob(jobInSlot.id)}
                                      >
                                        Dispatch
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            );
                          }
                          
                          return (
                            <div key={slot} className="p-3 border-2 border-dashed border-gray-200 rounded-lg text-center text-gray-400 text-sm">
                              {slot}
                            </div>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </DragDropContext>

      {/* Schedule Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{todaysJobs.length}</p>
                <p className="text-sm text-muted-foreground">Total Jobs Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{todaysJobs.filter(j => j.status === 'in-progress').length}</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <User className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{technicians.length}</p>
                <p className="text-sm text-muted-foreground">Active Technicians</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Zap className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{todaysJobs.filter(j => j.priority === 'high').length}</p>
                <p className="text-sm text-muted-foreground">High Priority</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
