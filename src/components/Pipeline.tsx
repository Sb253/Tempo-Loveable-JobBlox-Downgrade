
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, ArrowRight, Calendar, DollarSign, User, Clock } from "lucide-react";

interface PipelineJob {
  id: string;
  title: string;
  client: string;
  value: number;
  status: 'lead' | 'estimate' | 'approved' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  estimatedStart: string;
  assignedTo: string;
}

export const Pipeline = () => {
  const [jobs] = useState<PipelineJob[]>([
    {
      id: '1',
      title: 'Kitchen Renovation',
      client: 'John Smith',
      value: 15000,
      status: 'estimate',
      priority: 'high',
      estimatedStart: '2024-01-15',
      assignedTo: 'Mike Johnson'
    },
    {
      id: '2',
      title: 'Bathroom Remodel',
      client: 'Sarah Wilson',
      value: 8500,
      status: 'approved',
      priority: 'medium',
      estimatedStart: '2024-01-20',
      assignedTo: 'Dave Brown'
    },
    {
      id: '3',
      title: 'Deck Construction',
      client: 'ABC Company',
      value: 12000,
      status: 'in-progress',
      priority: 'high',
      estimatedStart: '2024-01-10',
      assignedTo: 'Tom Davis'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'lead': return 'bg-gray-100 text-gray-800';
      case 'estimate': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const groupedJobs = jobs.reduce((acc, job) => {
    if (!acc[job.status]) {
      acc[job.status] = [];
    }
    acc[job.status].push(job);
    return acc;
  }, {} as Record<string, PipelineJob[]>);

  const stages = [
    { key: 'lead', title: 'Leads', count: groupedJobs.lead?.length || 0 },
    { key: 'estimate', title: 'Estimates', count: groupedJobs.estimate?.length || 0 },
    { key: 'approved', title: 'Approved', count: groupedJobs.approved?.length || 0 },
    { key: 'in-progress', title: 'In Progress', count: groupedJobs['in-progress']?.length || 0 },
    { key: 'completed', title: 'Completed', count: groupedJobs.completed?.length || 0 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Pipeline Management</h1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Job
        </Button>
      </div>

      <Tabs defaultValue="kanban" className="w-full">
        <TabsList>
          <TabsTrigger value="kanban">Kanban View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>

        <TabsContent value="kanban">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {stages.map((stage) => (
              <Card key={stage.key} className="min-h-[500px]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center justify-between">
                    {stage.title}
                    <Badge variant="secondary">{stage.count}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {groupedJobs[stage.key]?.map((job) => (
                    <Card key={job.id} className="p-3 cursor-pointer hover:shadow-md transition-shadow">
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">{job.title}</h4>
                        <p className="text-xs text-muted-foreground">{job.client}</p>
                        
                        <div className="flex items-center justify-between">
                          <Badge className={getPriorityColor(job.priority)} variant="secondary">
                            {job.priority}
                          </Badge>
                          <span className="text-sm font-medium">${job.value.toLocaleString()}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {job.estimatedStart}
                        </div>
                        
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <User className="h-3 w-3" />
                          {job.assignedTo}
                        </div>
                      </div>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>All Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {jobs.map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-4">
                      <div>
                        <h4 className="font-medium">{job.title}</h4>
                        <p className="text-sm text-muted-foreground">{job.client}</p>
                      </div>
                      <Badge className={getStatusColor(job.status)} variant="secondary">
                        {job.status}
                      </Badge>
                      <Badge className={getPriorityColor(job.priority)} variant="secondary">
                        {job.priority}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span className="font-medium">${job.value.toLocaleString()}</span>
                      <span className="text-sm text-muted-foreground">{job.assignedTo}</span>
                      <Button variant="ghost" size="sm">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Calendar View</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Calendar view coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
