
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, User, Plus } from "lucide-react";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

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
}

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
    date: '2024-12-17'
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
    date: '2024-12-17'
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
    date: '2024-12-18'
  }
];

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
];

export const EnhancedScheduleView = () => {
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>(mockScheduleItems);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(scheduleItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    
    // Update time based on destination
    const newTimeSlot = timeSlots[result.destination.index];
    reorderedItem.time = newTimeSlot;
    
    items.splice(result.destination.index, 0, reorderedItem);
    setScheduleItems(items);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const todaysJobs = scheduleItems.filter(item => item.date === selectedDate);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Enhanced Schedule</h2>
        <div className="flex items-center gap-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border rounded-md"
          />
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Appointment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Drag and Drop Schedule */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Schedule - {new Date(selectedDate).toLocaleDateString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                {/* Time Slots */}
                <div>
                  <h3 className="font-semibold mb-4">Available Time Slots</h3>
                  <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="timeSlots">
                      {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                          {timeSlots.map((slot, index) => {
                            const jobInSlot = todaysJobs.find(job => job.time === slot);
                            return (
                              <Draggable
                                key={slot}
                                draggableId={slot}
                                index={index}
                                isDragDisabled={!jobInSlot}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`p-3 border rounded-lg transition-colors ${
                                      jobInSlot 
                                        ? 'border-blue-300 bg-blue-50 cursor-move' 
                                        : 'border-gray-200 bg-gray-50'
                                    } ${snapshot.isDragging ? 'shadow-lg' : ''}`}
                                  >
                                    <div className="font-medium">{slot}</div>
                                    {jobInSlot && (
                                      <div className="mt-1">
                                        <div className="text-sm font-medium">{jobInSlot.title}</div>
                                        <div className="text-xs text-muted-foreground">{jobInSlot.customer}</div>
                                        <Badge className={`${getStatusColor(jobInSlot.status)} mt-1 text-xs`}>
                                          {jobInSlot.status}
                                        </Badge>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </div>

                {/* Job Details */}
                <div>
                  <h3 className="font-semibold mb-4">Job Details</h3>
                  <div className="space-y-4">
                    {todaysJobs.map((job) => (
                      <div key={job.id} className="border rounded-lg p-4">
                        <h4 className="font-semibold">{job.title}</h4>
                        <div className="grid grid-cols-1 gap-1 text-sm text-muted-foreground mt-2">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {job.customer}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {job.time} ({job.duration})
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {job.location}
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Details</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Schedule Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Today's Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Jobs</span>
                  <span className="font-semibold">{todaysJobs.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Scheduled</span>
                  <span className="font-semibold text-blue-600">
                    {todaysJobs.filter(item => item.status === 'scheduled').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">In Progress</span>
                  <span className="font-semibold text-yellow-600">
                    {todaysJobs.filter(item => item.status === 'in-progress').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Completed</span>
                  <span className="font-semibold text-green-600">
                    {todaysJobs.filter(item => item.status === 'completed').length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
