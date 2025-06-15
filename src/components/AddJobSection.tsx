
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JobForm } from "@/components/JobForm";
import { Plus, Calendar, MapPin, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Job {
  id: string;
  title: string;
  customer: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  scheduledDate: string;
  estimatedValue: number;
  description: string;
  address: string;
  assignedTechnician: string;
  estimatedHours: number;
  jobType: 'inspection' | 'repair' | 'installation' | 'maintenance' | 'consultation';
}

interface AddJobSectionProps {
  onJobAdd?: (job: Job) => void;
}

export const AddJobSection = ({ onJobAdd }: AddJobSectionProps) => {
  const { toast } = useToast();
  const [showJobForm, setShowJobForm] = useState(false);
  const [recentJobs, setRecentJobs] = useState<Job[]>([
    {
      id: '1',
      title: 'Kitchen Renovation Assessment',
      customer: 'John Smith',
      status: 'scheduled',
      priority: 'high',
      scheduledDate: '2024-12-20',
      estimatedValue: 15000,
      description: 'Complete kitchen assessment for renovation project',
      address: '123 Main St, Anytown, USA',
      assignedTechnician: 'Mike Johnson',
      estimatedHours: 4,
      jobType: 'inspection'
    },
    {
      id: '2',
      title: 'Bathroom Plumbing Repair',
      customer: 'Sarah Davis',
      status: 'in-progress',
      priority: 'medium',
      scheduledDate: '2024-12-19',
      estimatedValue: 2500,
      description: 'Fix leaking pipes and replace fixtures',
      address: '456 Oak Ave, City, State',
      assignedTechnician: 'Tom Wilson',
      estimatedHours: 6,
      jobType: 'repair'
    }
  ]);

  const handleJobSave = (newJob: Job) => {
    setRecentJobs(prev => [newJob, ...prev]);
    onJobAdd?.(newJob);
    setShowJobForm(false);
    
    toast({
      title: "Job Created Successfully!",
      description: `"${newJob.title}" has been added to the schedule.`
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Job Management</h1>
          <p className="text-muted-foreground">Create and manage construction jobs</p>
        </div>
        <Button onClick={() => setShowJobForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Job
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Jobs</p>
                <p className="text-2xl font-bold">{recentJobs.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">
                  {recentJobs.filter(job => job.status === 'in-progress').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">
                  {recentJobs.filter(job => job.status === 'completed').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Scheduled</p>
                <p className="text-2xl font-bold">
                  {recentJobs.filter(job => job.status === 'scheduled').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Jobs */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentJobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">{job.title}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                      {job.status}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(job.priority)}`}>
                      {job.priority}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {job.customer}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {job.address}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(job.scheduledDate).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="mt-2 text-sm">
                    <span className="font-medium">Assigned to:</span> {job.assignedTechnician} | 
                    <span className="font-medium"> Est. Value:</span> ${job.estimatedValue.toLocaleString()} | 
                    <span className="font-medium"> Est. Hours:</span> {job.estimatedHours}h
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Job Form Modal */}
      {showJobForm && (
        <JobForm
          onClose={() => setShowJobForm(false)}
          onSave={handleJobSave}
        />
      )}
    </div>
  );
};
