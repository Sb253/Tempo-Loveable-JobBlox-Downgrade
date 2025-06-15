
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Calendar, Clock, MapPin, User, Phone, Mail } from "lucide-react";
import { Job } from "@/components/SchedulingDashboard";

interface ListViewProps {
  jobs: Job[];
  onJobSelect: (job: Job) => void;
  onJobUpdate: (job: Job) => void;
  statusColors: Record<string, string>;
  jobTypeColors: Record<string, string>;
}

export const ListView = ({ 
  jobs, 
  onJobSelect, 
  onJobUpdate, 
  statusColors, 
  jobTypeColors 
}: ListViewProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('startDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredAndSortedJobs = jobs
    .filter(job => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
      const matchesType = typeFilter === 'all' || job.jobType === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    })
    .sort((a, b) => {
      let aValue: any = a[sortBy as keyof Job];
      let bValue: any = b[sortBy as keyof Job];
      
      if (sortBy === 'startDate') {
        aValue = new Date(`${a.startDate} ${a.startTime}`).getTime();
        bValue = new Date(`${b.startDate} ${b.startTime}`).getTime();
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  const handleStatusChange = (jobId: string, newStatus: Job['status']) => {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      onJobUpdate({ ...job, status: newStatus });
    }
  };

  const formatTime = (time: string) => {
    return time.slice(0, 5);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs, customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="inspection">Inspection</SelectItem>
                <SelectItem value="repair">Repair</SelectItem>
                <SelectItem value="installation">Installation</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="consultation">Consultation</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="startDate">Date & Time</SelectItem>
                <SelectItem value="title">Job Title</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
                <SelectItem value="status">Status</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              {sortOrder === 'asc' ? '↑' : '↓'} Sort
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Jobs List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            Jobs List ({filteredAndSortedJobs.length} jobs)
          </h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Export</Button>
            <Button variant="outline" size="sm">Print</Button>
          </div>
        </div>

        {filteredAndSortedJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {/* Job Info */}
                <div className="lg:col-span-2 space-y-2">
                  <div className="flex items-start gap-3">
                    <div className={`w-4 h-4 rounded mt-1 ${jobTypeColors[job.jobType]}`}></div>
                    <div className="flex-1">
                      <h4 
                        className="font-semibold text-lg cursor-pointer hover:text-primary"
                        onClick={() => onJobSelect(job)}
                      >
                        {job.title}
                      </h4>
                      <p className="text-muted-foreground">{job.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge className={statusColors[job.status]}>
                      {job.status.replace('-', ' ')}
                    </Badge>
                    <Badge variant="outline">{job.jobType}</Badge>
                    <Badge variant="outline">{job.priority} priority</Badge>
                    {job.isRecurring && (
                      <Badge variant="outline">Recurring</Badge>
                    )}
                  </div>
                </div>

                {/* Customer & Location */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{job.customer}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{job.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Tech: {job.technician}</span>
                  </div>
                </div>

                {/* Schedule & Actions */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{formatDate(job.startDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {formatTime(job.startTime)} - {job.endTime ? formatTime(job.endTime) : 'Open'}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Duration: {job.duration}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Select
                      value={job.status}
                      onValueChange={(value: Job['status']) => handleStatusChange(job.id, value)}
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex gap-1">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => onJobSelect(job)}
                      >
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Call
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Custom Fields */}
              {job.customFields && Object.keys(job.customFields).length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <h5 className="text-sm font-medium mb-2">Additional Information</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(job.customFields).map(([key, value]) => (
                      <div key={key} className="text-sm">
                        <span className="text-muted-foreground">{key}:</span>{' '}
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {filteredAndSortedJobs.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or filters
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
