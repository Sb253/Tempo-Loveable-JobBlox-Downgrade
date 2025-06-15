
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Calendar, DollarSign, MapPin, Clock, User, Edit, Trash2, Eye } from "lucide-react";
import { JobForm } from "./JobForm";
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

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Kitchen Renovation',
    customer: 'John Smith',
    status: 'scheduled',
    priority: 'high',
    scheduledDate: '2024-12-17',
    estimatedValue: 15000,
    description: 'Complete kitchen remodel including cabinets, countertops, and appliances',
    address: '123 Main St, Anytown, USA',
    assignedTechnician: 'Mike Johnson',
    estimatedHours: 40,
    jobType: 'installation'
  },
  {
    id: '2',
    title: 'Bathroom Repair',
    customer: 'ABC Construction Inc.',
    status: 'in-progress',
    priority: 'medium',
    scheduledDate: '2024-12-18',
    estimatedValue: 5000,
    description: 'Fix plumbing issues and retile shower area',
    address: '456 Business Ave, City, USA',
    assignedTechnician: 'Sarah Davis',
    estimatedHours: 16,
    jobType: 'repair'
  },
  {
    id: '3',
    title: 'Deck Installation',
    customer: 'Sarah Johnson',
    status: 'completed',
    priority: 'low',
    scheduledDate: '2024-12-20',
    estimatedValue: 8500,
    description: 'Build new wooden deck with railings',
    address: '789 Oak Drive, Hometown, USA',
    assignedTechnician: 'Tom Wilson',
    estimatedHours: 32,
    jobType: 'installation'
  },
  {
    id: '4',
    title: 'HVAC Maintenance',
    customer: 'City Office Building',
    status: 'scheduled',
    priority: 'medium',
    scheduledDate: '2024-12-21',
    estimatedValue: 2500,
    description: 'Quarterly HVAC system inspection and maintenance',
    address: '100 Business Plaza, Downtown, USA',
    assignedTechnician: 'Alex Chen',
    estimatedHours: 8,
    jobType: 'maintenance'
  }
];

export const JobList = () => {
  const { toast } = useToast();
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [showJobForm, setShowJobForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showJobDetails, setShowJobDetails] = useState(false);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || job.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getJobTypeColor = (jobType: string) => {
    switch (jobType) {
      case 'inspection': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'repair': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'installation': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'maintenance': return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200';
      case 'consultation': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleJobAction = (action: string, job: Job) => {
    switch (action) {
      case 'view':
        setSelectedJob(job);
        setShowJobDetails(true);
        break;
      case 'edit':
        setSelectedJob(job);
        setShowJobForm(true);
        break;
      case 'delete':
        setJobs(prev => prev.filter(j => j.id !== job.id));
        toast({
          title: "Job Deleted",
          description: `${job.title} has been deleted.`
        });
        break;
      case 'start':
        setJobs(prev => prev.map(j => 
          j.id === job.id ? { ...j, status: 'in-progress' as const } : j
        ));
        toast({
          title: "Job Started",
          description: `${job.title} is now in progress.`
        });
        break;
      case 'complete':
        setJobs(prev => prev.map(j => 
          j.id === job.id ? { ...j, status: 'completed' as const } : j
        ));
        toast({
          title: "Job Completed",
          description: `${job.title} has been marked as completed.`
        });
        break;
    }
  };

  const getJobStats = () => {
    return {
      total: jobs.length,
      scheduled: jobs.filter(j => j.status === 'scheduled').length,
      inProgress: jobs.filter(j => j.status === 'in-progress').length,
      completed: jobs.filter(j => j.status === 'completed').length,
      totalValue: jobs.reduce((sum, job) => sum + job.estimatedValue, 0)
    };
  };

  const stats = getJobStats();

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Job Management</h1>
          <p className="text-muted-foreground">Manage and track all your construction jobs</p>
        </div>
        <Button onClick={() => setShowJobForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Job
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.scheduled}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.inProgress}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalValue.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by job title, customer, or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Jobs Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Jobs ({filteredJobs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Details</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Scheduled Date</TableHead>
                  <TableHead>Technician</TableHead>
                  <TableHead>Est. Value</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{job.title}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {job.address}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {job.customer}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(job.status)}>
                        {job.status.replace('-', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(job.priority)}>
                        {job.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getJobTypeColor(job.jobType)}>
                        {job.jobType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(job.scheduledDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>{job.assignedTechnician}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        {job.estimatedValue.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleJobAction('view', job)}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleJobAction('edit', job)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        {job.status === 'scheduled' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleJobAction('start', job)}
                          >
                            Start
                          </Button>
                        )}
                        {job.status === 'in-progress' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleJobAction('complete', job)}
                          >
                            Complete
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Job Form Dialog */}
      {showJobForm && (
        <JobForm 
          onClose={() => {
            setShowJobForm(false);
            setSelectedJob(null);
          }}
          job={selectedJob}
          onSave={(job) => {
            if (selectedJob) {
              setJobs(prev => prev.map(j => j.id === selectedJob.id ? job : j));
              toast({
                title: "Job Updated",
                description: `${job.title} has been updated.`
              });
            } else {
              setJobs(prev => [...prev, { ...job, id: Date.now().toString() }]);
              toast({
                title: "Job Created",
                description: `${job.title} has been created.`
              });
            }
            setShowJobForm(false);
            setSelectedJob(null);
          }}
        />
      )}

      {/* Job Details Dialog */}
      {showJobDetails && selectedJob && (
        <Dialog open={showJobDetails} onOpenChange={setShowJobDetails}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedJob.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Customer</label>
                  <p className="text-sm text-muted-foreground">{selectedJob.customer}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <div className="mt-1">
                    <Badge className={getStatusColor(selectedJob.status)}>
                      {selectedJob.status.replace('-', ' ')}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Priority</label>
                  <div className="mt-1">
                    <Badge className={getPriorityColor(selectedJob.priority)}>
                      {selectedJob.priority}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Job Type</label>
                  <div className="mt-1">
                    <Badge className={getJobTypeColor(selectedJob.jobType)}>
                      {selectedJob.jobType}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Scheduled Date</label>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedJob.scheduledDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Estimated Value</label>
                  <p className="text-sm text-muted-foreground">
                    ${selectedJob.estimatedValue.toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Assigned Technician</label>
                  <p className="text-sm text-muted-foreground">{selectedJob.assignedTechnician}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Estimated Hours</label>
                  <p className="text-sm text-muted-foreground">{selectedJob.estimatedHours}h</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Address</label>
                <p className="text-sm text-muted-foreground">{selectedJob.address}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <p className="text-sm text-muted-foreground">{selectedJob.description}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
