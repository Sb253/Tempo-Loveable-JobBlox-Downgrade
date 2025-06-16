
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Plus, Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { MapView } from "./MapView";

interface Job {
  id: string;
  title: string;
  customer: string;
  address: string;
  coordinates: [number, number];
  status: 'scheduled' | 'in-progress' | 'completed';
  type: 'job' | 'appointment';
  time: string;
  priority?: 'high' | 'medium' | 'low';
}

interface EditableRecentJobsProps {
  initialJobs?: Job[];
}

export const EditableRecentJobs = ({ initialJobs = [] }: EditableRecentJobsProps) => {
  const { toast } = useToast();
  const [jobs, setJobs] = useState<Job[]>(initialJobs.length > 0 ? initialJobs : [
    {
      id: '1',
      title: 'Kitchen Renovation',
      customer: 'John Smith',
      address: '123 Main St, City, State',
      coordinates: [-74.006, 40.7128],
      status: 'in-progress',
      type: 'job',
      time: '2024-01-15T10:00:00Z',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Bathroom Remodel',
      customer: 'Sarah Johnson',
      address: '456 Oak Ave, City, State',
      coordinates: [-74.026, 40.7228],
      status: 'scheduled',
      type: 'job',
      time: '2024-01-16T14:00:00Z',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Initial Consultation',
      customer: 'Mike Wilson',
      address: '789 Pine St, City, State',
      coordinates: [-73.986, 40.7328],
      status: 'completed',
      type: 'appointment',
      time: '2024-01-14T09:00:00Z',
      priority: 'low'
    }
  ]);

  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [newJob, setNewJob] = useState({
    title: '',
    customer: '',
    address: '',
    status: 'scheduled' as const,
    type: 'job' as const,
    priority: 'medium' as const,
    time: ''
  });

  const handleAddJob = () => {
    if (!newJob.title || !newJob.customer || !newJob.address) return;

    const job: Job = {
      id: Date.now().toString(),
      ...newJob,
      coordinates: [
        -74.006 + (Math.random() - 0.5) * 0.1,
        40.7128 + (Math.random() - 0.5) * 0.1
      ] as [number, number],
      time: newJob.time || new Date().toISOString()
    };

    setJobs(prev => [job, ...prev]);
    setNewJob({
      title: '',
      customer: '',
      address: '',
      status: 'scheduled',
      type: 'job',
      priority: 'medium',
      time: ''
    });
    setShowEditDialog(false);
    
    toast({
      title: "Job Added",
      description: "New job has been added successfully.",
    });
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setNewJob({
      title: job.title,
      customer: job.customer,
      address: job.address,
      status: job.status,
      type: job.type,
      priority: job.priority || 'medium',
      time: job.time
    });
    setShowEditDialog(true);
  };

  const handleUpdateJob = () => {
    if (!editingJob || !newJob.title || !newJob.customer || !newJob.address) return;

    const updatedJob: Job = {
      ...editingJob,
      ...newJob,
      time: newJob.time || editingJob.time
    };

    setJobs(prev => prev.map(job => job.id === editingJob.id ? updatedJob : job));
    setEditingJob(null);
    setNewJob({
      title: '',
      customer: '',
      address: '',
      status: 'scheduled',
      type: 'job',
      priority: 'medium',
      time: ''
    });
    setShowEditDialog(false);
    
    toast({
      title: "Job Updated",
      description: "Job has been updated successfully.",
    });
  };

  const handleRemoveJob = (jobId: string) => {
    setJobs(prev => prev.filter(job => job.id !== jobId));
    
    toast({
      title: "Job Removed",
      description: "Job has been removed successfully.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'in-progress':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Jobs List */}
      <Card className="border-border/40 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Jobs & Locations
            </CardTitle>
            <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" onClick={() => {
                  setEditingJob(null);
                  setNewJob({
                    title: '',
                    customer: '',
                    address: '',
                    status: 'scheduled',
                    type: 'job',
                    priority: 'medium',
                    time: ''
                  });
                }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Job
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingJob ? 'Edit Job' : 'Add New Job'}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={newJob.title}
                        onChange={(e) => setNewJob(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Kitchen Renovation"
                      />
                    </div>
                    <div>
                      <Label htmlFor="customer">Customer</Label>
                      <Input
                        id="customer"
                        value={newJob.customer}
                        onChange={(e) => setNewJob(prev => ({ ...prev, customer: e.target.value }))}
                        placeholder="John Smith"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={newJob.address}
                      onChange={(e) => setNewJob(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="123 Main St, City, State"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="type">Type</Label>
                      <Select value={newJob.type} onValueChange={(value) => setNewJob(prev => ({ ...prev, type: value as 'job' | 'appointment' }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="job">Job</SelectItem>
                          <SelectItem value="appointment">Appointment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select value={newJob.status} onValueChange={(value) => setNewJob(prev => ({ ...prev, status: value as 'scheduled' | 'in-progress' | 'completed' }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="priority">Priority</Label>
                      <Select value={newJob.priority} onValueChange={(value) => setNewJob(prev => ({ ...prev, priority: value as 'high' | 'medium' | 'low' }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="time">Date & Time</Label>
                    <Input
                      id="time"
                      type="datetime-local"
                      value={newJob.time ? new Date(newJob.time).toISOString().slice(0, 16) : ''}
                      onChange={(e) => setNewJob(prev => ({ ...prev, time: e.target.value ? new Date(e.target.value).toISOString() : '' }))}
                    />
                  </div>
                  <Button onClick={editingJob ? handleUpdateJob : handleAddJob} className="w-full">
                    {editingJob ? 'Update Job' : 'Add Job'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {jobs.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No jobs added yet. Click "Add Job" to get started.</p>
            ) : (
              jobs.map((job) => (
                <div
                  key={job.id}
                  className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{job.title}</h4>
                      <p className="text-xs text-muted-foreground truncate">{job.customer}</p>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditJob(job)}
                        className="h-7 w-7 p-0"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveJob(job.id)}
                        className="h-7 w-7 p-0 hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate">{job.address}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className={`text-xs px-2 py-0.5 ${getStatusColor(job.status)}`}>
                        {job.status.replace('-', ' ')}
                      </Badge>
                      {job.priority && (
                        <Badge className={`text-xs px-2 py-0.5 ${getPriorityColor(job.priority)}`}>
                          {job.priority}
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(job.time)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Map View */}
      <MapView 
        jobs={jobs} 
        isCompact={true} 
        editable={true}
        onJobsChange={setJobs}
      />
    </div>
  );
};
