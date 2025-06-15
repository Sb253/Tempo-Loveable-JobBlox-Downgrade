
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Plus, Settings, Download } from "lucide-react";

interface Task {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  duration: number;
  progress: number;
  dependencies?: string[];
  assignee: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'delayed';
}

interface Project {
  id: string;
  name: string;
  customer: string;
  startDate: string;
  endDate: string;
  tasks: Task[];
}

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Kitchen Renovation',
    customer: 'John Smith',
    startDate: '2024-12-15',
    endDate: '2025-01-30',
    tasks: [
      {
        id: '1',
        name: 'Demolition',
        startDate: '2024-12-15',
        endDate: '2024-12-18',
        duration: 3,
        progress: 100,
        assignee: 'Mike Johnson',
        status: 'completed'
      },
      {
        id: '2',
        name: 'Plumbing Rough-in',
        startDate: '2024-12-19',
        endDate: '2024-12-22',
        duration: 3,
        progress: 60,
        dependencies: ['1'],
        assignee: 'Sarah Davis',
        status: 'in-progress'
      },
      {
        id: '3',
        name: 'Electrical Rough-in',
        startDate: '2024-12-20',
        endDate: '2024-12-24',
        duration: 4,
        progress: 25,
        dependencies: ['1'],
        assignee: 'Tom Wilson',
        status: 'in-progress'
      },
      {
        id: '4',
        name: 'Drywall Installation',
        startDate: '2024-12-26',
        endDate: '2024-12-30',
        duration: 4,
        progress: 0,
        dependencies: ['2', '3'],
        assignee: 'Mike Johnson',
        status: 'not-started'
      },
      {
        id: '5',
        name: 'Cabinet Installation',
        startDate: '2025-01-02',
        endDate: '2025-01-08',
        duration: 6,
        progress: 0,
        dependencies: ['4'],
        assignee: 'Sarah Davis',
        status: 'not-started'
      }
    ]
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-green-500';
    case 'in-progress': return 'bg-blue-500';
    case 'delayed': return 'bg-red-500';
    default: return 'bg-gray-300';
  }
};

const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-800';
    case 'in-progress': return 'bg-blue-100 text-blue-800';
    case 'delayed': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const generateDateRange = (startDate: string, endDate: string) => {
  const dates = [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
    dates.push(new Date(date).toISOString().split('T')[0]);
  }
  
  return dates;
};

const getTaskPosition = (taskStart: string, taskEnd: string, projectStart: string, totalDays: number) => {
  const projectStartDate = new Date(projectStart);
  const taskStartDate = new Date(taskStart);
  const taskEndDate = new Date(taskEnd);
  
  const startOffset = Math.floor((taskStartDate.getTime() - projectStartDate.getTime()) / (1000 * 60 * 60 * 24));
  const taskDuration = Math.floor((taskEndDate.getTime() - taskStartDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  
  const left = (startOffset / totalDays) * 100;
  const width = (taskDuration / totalDays) * 100;
  
  return { left: `${left}%`, width: `${width}%` };
};

export const GanttChart = () => {
  const [selectedProject, setSelectedProject] = useState('1');
  
  const project = mockProjects.find(p => p.id === selectedProject);
  if (!project) return null;

  const projectDates = generateDateRange(project.startDate, project.endDate);
  const totalDays = projectDates.length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Project Timeline - Gantt Chart</h2>
        <div className="flex gap-4">
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              {mockProjects.map((proj) => (
                <SelectItem key={proj.id} value={proj.id}>
                  {proj.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {project.name}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Customer: {project.customer} | Duration: {totalDays} days
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Timeline Header */}
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted p-4">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-4">
                    <h4 className="font-medium">Task</h4>
                  </div>
                  <div className="col-span-2">
                    <h4 className="font-medium">Assignee</h4>
                  </div>
                  <div className="col-span-1">
                    <h4 className="font-medium">Duration</h4>
                  </div>
                  <div className="col-span-1">
                    <h4 className="font-medium">Progress</h4>
                  </div>
                  <div className="col-span-4">
                    <h4 className="font-medium">Timeline</h4>
                  </div>
                </div>
              </div>

              {/* Tasks */}
              <div className="divide-y">
                {project.tasks.map((task) => {
                  const position = getTaskPosition(task.startDate, task.endDate, project.startDate, totalDays);
                  
                  return (
                    <div key={task.id} className="p-4">
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-4">
                          <div className="flex items-center gap-2">
                            <h5 className="font-medium">{task.name}</h5>
                            <Badge className={getStatusBadgeColor(task.status)} variant="secondary">
                              {task.status.replace('-', ' ')}
                            </Badge>
                          </div>
                        </div>
                        <div className="col-span-2">
                          <span className="text-sm">{task.assignee}</span>
                        </div>
                        <div className="col-span-1">
                          <span className="text-sm">{task.duration}d</span>
                        </div>
                        <div className="col-span-1">
                          <span className="text-sm">{task.progress}%</span>
                        </div>
                        <div className="col-span-4">
                          <div className="relative h-8 bg-gray-100 rounded">
                            <div
                              className={`absolute top-0 h-full rounded ${getStatusColor(task.status)}`}
                              style={position}
                            >
                              <div 
                                className="h-full bg-white bg-opacity-30 rounded"
                                style={{ width: `${task.progress}%` }}
                              />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                              {task.progress > 0 && `${task.progress}%`}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Date Scale */}
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-3">Date Timeline</h4>
              <div className="flex overflow-x-auto">
                {projectDates.filter((_, index) => index % 7 === 0).map((date) => (
                  <div key={date} className="flex-shrink-0 w-24 text-center text-xs">
                    <div className="font-medium">{new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">{project.tasks.length}</div>
                  <p className="text-sm text-muted-foreground">Total Tasks</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-green-600">
                    {project.tasks.filter(t => t.status === 'completed').length}
                  </div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-blue-600">
                    {project.tasks.filter(t => t.status === 'in-progress').length}
                  </div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">
                    {Math.round(project.tasks.reduce((acc, task) => acc + task.progress, 0) / project.tasks.length)}%
                  </div>
                  <p className="text-sm text-muted-foreground">Overall Progress</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
