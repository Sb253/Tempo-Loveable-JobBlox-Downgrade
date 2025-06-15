
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Calendar, Clock, MapPin, User, Plus, Filter, Search, Zap, Navigation, Bell } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface Job {
  id: string;
  title: string;
  customer: string;
  location: string;
  date: string;
  time: string;
  duration: string;
  status: 'scheduled' | 'in-progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
  technician: string;
  estimatedArrival?: string;
  coordinates?: [number, number];
  templateUsed?: string;
}

interface JobTemplate {
  id: string;
  name: string;
  description: string;
  estimatedDuration: string;
  category: string;
}

export const EnhancedScheduleView = () => {
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: '1',
      title: 'Kitchen Renovation Assessment',
      customer: 'John Smith',
      location: '123 Main St, Anytown',
      date: '2024-12-18',
      time: '09:00',
      duration: '2h',
      status: 'scheduled',
      priority: 'high',
      technician: 'Mike Johnson',
      coordinates: [-74.006, 40.7128],
      templateUsed: 'Kitchen Inspection'
    },
    {
      id: '2',
      title: 'Bathroom Repair',
      customer: 'ABC Construction Inc.',
      location: '456 Business Ave, City',
      date: '2024-12-18',
      time: '14:00',
      duration: '3h',
      status: 'in-progress',
      priority: 'medium',
      technician: 'Sarah Davis',
      coordinates: [-74.0, 40.72]
    },
    {
      id: '3',
      title: 'Deck Installation',
      customer: 'Sarah Johnson',
      location: '789 Oak Drive, Hometown',
      date: '2024-12-19',
      time: '10:00',
      duration: '4h',
      status: 'scheduled',
      priority: 'low',
      technician: 'Tom Wilson',
      coordinates: [-73.99, 40.71]
    }
  ]);

  const [selectedDate, setSelectedDate] = useState('2024-12-18');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const jobTemplates: JobTemplate[] = [
    { id: '1', name: 'Kitchen Inspection', description: 'Standard kitchen assessment', estimatedDuration: '2h', category: 'Inspection' },
    { id: '2', name: 'Bathroom Repair', description: 'Basic bathroom fixture repair', estimatedDuration: '3h', category: 'Repair' },
    { id: '3', name: 'Deck Installation', description: 'Standard deck construction', estimatedDuration: '6h', category: 'Installation' }
  ];

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate job status updates
      setJobs(prev => prev.map(job => {
        if (job.status === 'in-progress' && Math.random() > 0.9) {
          toast.success(`Job "${job.title}" status updated`, {
            description: `Technician ${job.technician} has made progress`
          });
          return job;
        }
        return job;
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesDate = job.date === selectedDate;
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || job.status === filterStatus;
    return matchesDate && matchesSearch && matchesStatus;
  });

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(filteredJobs);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update the original jobs array
    const updatedJobs = jobs.map(job => {
      const foundJob = items.find(item => item.id === job.id);
      return foundJob || job;
    });

    setJobs(updatedJobs);
    toast.success("Schedule updated", {
      description: "Job order has been rearranged"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const handleDispatchJob = (jobId: string) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId 
        ? { ...job, status: 'in-progress' as const, estimatedArrival: '20 minutes' }
        : job
    ));
    
    toast.success("Job dispatched!", {
      description: "Technician has been notified and is en route"
    });
  };

  const handleUseTemplate = (templateId: string, jobId?: string) => {
    const template = jobTemplates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(template.name);
      toast.success(`Template "${template.name}" applied`, {
        description: `Duration set to ${template.estimatedDuration}`
      });
    }
  };

  const handleSendNotification = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      toast.success("Notification sent!", {
        description: `"On My Way" message sent to ${job.customer}`
      });
    }
  };

  const getCoordinatesDisplay = (coordinates?: [number, number]) => {
    if (!coordinates) return 'No GPS data';
    return `${coordinates[0].toFixed(3)}, ${coordinates[1].toFixed(3)}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Enhanced Schedule Management</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Job
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Zap className="h-4 w-4 mr-2" />
                Quick Dispatch
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Quick Dispatch Center</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p>Real-time dispatch features available here</p>
                <Button className="w-full">Open Dispatch Center</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-primary dark:text-primary-foreground">Select Date</label>
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border-primary/30 focus:border-primary dark:border-primary/50 dark:focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Search Jobs</label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs or customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Filter Status</label>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Job Template</label>
          <Select value={selectedTemplate} onValueChange={(value) => handleUseTemplate(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select template" />
            </SelectTrigger>
            <SelectContent>
              {jobTemplates.map(template => (
                <SelectItem key={template.id} value={template.id}>
                  {template.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Schedule Board */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Schedule for {new Date(selectedDate).toLocaleDateString()}
            <Badge variant="outline">{filteredJobs.length} jobs</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="schedule">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                  {filteredJobs.map((job, index) => (
                    <Draggable key={job.id} draggableId={job.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`p-4 border rounded-lg transition-all ${
                            snapshot.isDragging 
                              ? 'shadow-lg bg-accent' 
                              : 'hover:shadow-md'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-semibold text-lg">{job.title}</h3>
                              <p className="text-muted-foreground">{job.customer}</p>
                            </div>
                            <div className="flex gap-2">
                              <Badge className={getStatusColor(job.status)}>
                                {job.status}
                              </Badge>
                              <Badge className={getPriorityColor(job.priority)}>
                                {job.priority}
                              </Badge>
                              {job.templateUsed && (
                                <Badge variant="outline">
                                  {job.templateUsed}
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="h-4 w-4" />
                              {job.time} ({job.duration})
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="h-4 w-4" />
                              {job.location}
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <User className="h-4 w-4" />
                              {job.technician}
                            </div>
                          </div>

                          {job.coordinates && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                              <Navigation className="h-4 w-4" />
                              GPS: {getCoordinatesDisplay(job.coordinates)}
                              {job.estimatedArrival && (
                                <span className="ml-4 text-green-600">
                                  ETA: {job.estimatedArrival}
                                </span>
                              )}
                            </div>
                          )}

                          <div className="flex gap-2">
                            {job.status === 'scheduled' && (
                              <Button onClick={() => handleDispatchJob(job.id)} size="sm">
                                <Zap className="h-4 w-4 mr-2" />
                                Dispatch
                              </Button>
                            )}
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleSendNotification(job.id)}
                            >
                              <Bell className="h-4 w-4 mr-2" />
                              Notify Customer
                            </Button>
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </CardContent>
      </Card>
    </div>
  );
};
