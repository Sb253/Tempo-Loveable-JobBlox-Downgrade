
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarView } from "@/components/scheduling/CalendarView";
import { DragDropCalendar } from "@/components/scheduling/DragDropCalendar";
import { MapCalendarView } from "@/components/scheduling/MapCalendarView";
import { ListView } from "@/components/scheduling/ListView";
import { JobDetailsPanel } from "@/components/scheduling/JobDetailsPanel";
import { RecurringJobForm } from "@/components/scheduling/RecurringJobForm";
import { Calendar, MapPin, List, Clock, Plus, Filter, Settings } from "lucide-react";
import { toast } from "@/components/ui/sonner";

export interface Job {
  id: string;
  title: string;
  customer: string;
  location: string;
  address: string;
  coordinates?: [number, number];
  startDate: string;
  endDate?: string;
  startTime: string;
  endTime?: string;
  duration: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'high' | 'medium' | 'low';
  jobType: 'inspection' | 'repair' | 'installation' | 'maintenance' | 'consultation';
  technician: string;
  description?: string;
  customFields?: Record<string, any>;
  isRecurring?: boolean;
  recurringPattern?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    interval: number;
    endDate?: string;
  };
}

export const SchedulingDashboard = () => {
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: '1',
      title: 'Kitchen Renovation Assessment',
      customer: 'John Smith',
      location: '123 Main St',
      address: '123 Main St, Anytown, USA',
      coordinates: [-74.006, 40.7128],
      startDate: '2024-12-18',
      startTime: '09:00',
      endTime: '11:00',
      duration: '2h',
      status: 'scheduled',
      priority: 'high',
      jobType: 'inspection',
      technician: 'Mike Johnson',
      description: 'Initial assessment for kitchen renovation project',
      customFields: {
        estimatedValue: '$15000',
        specialRequirements: 'Asbestos testing required'
      }
    },
    {
      id: '2',
      title: 'Bathroom Repair',
      customer: 'ABC Construction Inc.',
      location: '456 Business Ave',
      address: '456 Business Ave, City, USA',
      coordinates: [-74.0, 40.72],
      startDate: '2024-12-18',
      startTime: '14:00',
      endTime: '18:00',
      duration: '4h',
      status: 'in-progress',
      priority: 'medium',
      jobType: 'repair',
      technician: 'Sarah Davis',
      isRecurring: true,
      recurringPattern: {
        frequency: 'monthly',
        interval: 1,
        endDate: '2025-06-18'
      }
    },
    {
      id: '3',
      title: 'Deck Installation',
      customer: 'Sarah Johnson',
      location: '789 Oak Drive',
      address: '789 Oak Drive, Hometown, USA',
      coordinates: [-73.99, 40.71],
      startDate: '2024-12-19',
      startTime: '08:00',
      endTime: '16:00',
      duration: '8h',
      status: 'scheduled',
      priority: 'low',
      jobType: 'installation',
      technician: 'Tom Wilson'
    }
  ]);

  const [activeView, setActiveView] = useState<'month' | 'week' | 'day' | 'map' | 'list'>('month');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showRecurringForm, setShowRecurringForm] = useState(false);

  const jobTypeColors = {
    inspection: 'bg-blue-500',
    repair: 'bg-orange-500',
    installation: 'bg-green-500',
    maintenance: 'bg-purple-500',
    consultation: 'bg-cyan-500'
  };

  const statusColors = {
    scheduled: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'in-progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  };

  const handleJobUpdate = (updatedJob: Job) => {
    setJobs(prev => prev.map(job => job.id === updatedJob.id ? updatedJob : job));
    toast.success("Job updated successfully");
  };

  const handleJobMove = (jobId: string, newDate: string, newTime?: string) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId 
        ? { ...job, startDate: newDate, ...(newTime && { startTime: newTime }) }
        : job
    ));
    toast.success("Job rescheduled successfully");
  };

  const getJobStats = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayJobs = jobs.filter(job => job.startDate === today);
    const scheduledJobs = jobs.filter(job => job.status === 'scheduled');
    const inProgressJobs = jobs.filter(job => job.status === 'in-progress');
    
    return {
      total: jobs.length,
      today: todayJobs.length,
      scheduled: scheduledJobs.length,
      inProgress: inProgressJobs.length
    };
  };

  const stats = getJobStats();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Scheduling & Dispatching</h1>
        <div className="flex gap-2">
          <Button onClick={() => setShowRecurringForm(true)} variant="outline">
            <Clock className="h-4 w-4 mr-2" />
            Recurring Jobs
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Job
          </Button>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Jobs</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.today}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.scheduled}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.inProgress}</div>
          </CardContent>
        </Card>
      </div>

      {/* Job Type Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Job Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {Object.entries(jobTypeColors).map(([type, color]) => (
              <div key={type} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded ${color}`}></div>
                <span className="text-sm capitalize">{type}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Calendar Views */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Schedule Calendar</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Customize
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeView} onValueChange={(value: any) => setActiveView(value)} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="month" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Month
              </TabsTrigger>
              <TabsTrigger value="week" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Week
              </TabsTrigger>
              <TabsTrigger value="day" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Day
              </TabsTrigger>
              <TabsTrigger value="map" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Map
              </TabsTrigger>
              <TabsTrigger value="list" className="flex items-center gap-2">
                <List className="h-4 w-4" />
                List
              </TabsTrigger>
            </TabsList>

            <TabsContent value="month" className="mt-6">
              <DragDropCalendar 
                jobs={jobs} 
                view="month"
                onJobMove={handleJobMove}
                onJobSelect={setSelectedJob}
                jobTypeColors={jobTypeColors}
              />
            </TabsContent>

            <TabsContent value="week" className="mt-6">
              <DragDropCalendar 
                jobs={jobs} 
                view="week"
                onJobMove={handleJobMove}
                onJobSelect={setSelectedJob}
                jobTypeColors={jobTypeColors}
              />
            </TabsContent>

            <TabsContent value="day" className="mt-6">
              <DragDropCalendar 
                jobs={jobs} 
                view="day"
                onJobMove={handleJobMove}
                onJobSelect={setSelectedJob}
                jobTypeColors={jobTypeColors}
              />
            </TabsContent>

            <TabsContent value="map" className="mt-6">
              <MapCalendarView 
                jobs={jobs}
                onJobSelect={setSelectedJob}
                jobTypeColors={jobTypeColors}
              />
            </TabsContent>

            <TabsContent value="list" className="mt-6">
              <ListView 
                jobs={jobs}
                onJobSelect={setSelectedJob}
                onJobUpdate={handleJobUpdate}
                statusColors={statusColors}
                jobTypeColors={jobTypeColors}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Selected Job Details Panel */}
      {selectedJob && (
        <JobDetailsPanel 
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onUpdate={handleJobUpdate}
          statusColors={statusColors}
          jobTypeColors={jobTypeColors}
        />
      )}

      {/* Recurring Job Form */}
      {showRecurringForm && (
        <RecurringJobForm 
          onClose={() => setShowRecurringForm(false)}
          onSave={(job) => {
            setJobs(prev => [...prev, { ...job, id: Date.now().toString() }]);
            setShowRecurringForm(false);
            toast.success("Recurring job created successfully");
          }}
        />
      )}
    </div>
  );
};
