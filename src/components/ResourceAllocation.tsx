
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Calendar, Clock, MapPin, Wrench, Truck } from "lucide-react";

interface Resource {
  id: string;
  name: string;
  type: 'technician' | 'equipment' | 'vehicle';
  status: 'available' | 'busy' | 'maintenance';
  currentAssignment?: string;
  skills?: string[];
  location?: string;
  utilization: number;
}

interface Assignment {
  id: string;
  projectName: string;
  customer: string;
  date: string;
  timeSlot: string;
  resources: string[];
  status: 'scheduled' | 'in-progress' | 'completed';
}

const mockResources: Resource[] = [
  {
    id: '1',
    name: 'Mike Johnson',
    type: 'technician',
    status: 'busy',
    currentAssignment: 'Kitchen Renovation',
    skills: ['Plumbing', 'Electrical', 'Carpentry'],
    location: 'Downtown Area',
    utilization: 85
  },
  {
    id: '2',
    name: 'Sarah Davis',
    type: 'technician',
    status: 'available',
    skills: ['Roofing', 'Insulation', 'General'],
    location: 'North Side',
    utilization: 72
  },
  {
    id: '3',
    name: 'Excavator CAT 320',
    type: 'equipment',
    status: 'available',
    location: 'Warehouse A',
    utilization: 45
  },
  {
    id: '4',
    name: 'Service Van #1',
    type: 'vehicle',
    status: 'busy',
    currentAssignment: 'Bathroom Repair',
    location: 'East Side',
    utilization: 90
  }
];

const mockAssignments: Assignment[] = [
  {
    id: '1',
    projectName: 'Kitchen Renovation',
    customer: 'John Smith',
    date: '2024-12-18',
    timeSlot: '09:00 - 17:00',
    resources: ['Mike Johnson', 'Service Van #1'],
    status: 'scheduled'
  },
  {
    id: '2',
    projectName: 'Roof Repair',
    customer: 'Mary Williams',
    date: '2024-12-18',
    timeSlot: '10:00 - 14:00',
    resources: ['Sarah Davis', 'Service Van #2'],
    status: 'scheduled'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'available': return 'bg-green-100 text-green-800';
    case 'busy': return 'bg-yellow-100 text-yellow-800';
    case 'maintenance': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getResourceIcon = (type: string) => {
  switch (type) {
    case 'technician': return <Users className="h-4 w-4" />;
    case 'equipment': return <Wrench className="h-4 w-4" />;
    case 'vehicle': return <Truck className="h-4 w-4" />;
    default: return <Users className="h-4 w-4" />;
  }
};

export const ResourceAllocation = () => {
  const [resources] = useState<Resource[]>(mockResources);
  const [assignments] = useState<Assignment[]>(mockAssignments);
  const [selectedDate, setSelectedDate] = useState('2024-12-18');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Resource Allocation</h2>
        <div className="flex gap-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border rounded-md"
          />
          <Button>Optimize Schedule</Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="utilization">Utilization</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Resource Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {resources.map((resource) => (
                      <div key={resource.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            {getResourceIcon(resource.type)}
                            <div>
                              <h4 className="font-medium">{resource.name}</h4>
                              <p className="text-sm text-muted-foreground capitalize">{resource.type}</p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(resource.status)}>
                            {resource.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          {resource.currentAssignment && (
                            <div>
                              <span className="text-muted-foreground">Current Assignment:</span>
                              <span className="ml-2 font-medium">{resource.currentAssignment}</span>
                            </div>
                          )}
                          {resource.location && (
                            <div>
                              <span className="text-muted-foreground">Location:</span>
                              <span className="ml-2">{resource.location}</span>
                            </div>
                          )}
                          <div>
                            <span className="text-muted-foreground">Utilization:</span>
                            <span className="ml-2 font-medium">{resource.utilization}%</span>
                          </div>
                        </div>
                        
                        {resource.skills && (
                          <div className="mt-3">
                            <span className="text-sm text-muted-foreground">Skills: </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {resource.skills.map((skill) => (
                                <Badge key={skill} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="mt-3">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${resource.utilization}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Resource Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Technicians</span>
                      <span className="font-semibold">
                        {resources.filter(r => r.type === 'technician').length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Available</span>
                      <span className="font-semibold text-green-600">
                        {resources.filter(r => r.status === 'available').length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Busy</span>
                      <span className="font-semibold text-yellow-600">
                        {resources.filter(r => r.status === 'busy').length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Equipment Units</span>
                      <span className="font-semibold">
                        {resources.filter(r => r.type === 'equipment').length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Vehicles</span>
                      <span className="font-semibold">
                        {resources.filter(r => r.type === 'vehicle').length}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      Add Technician
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Wrench className="h-4 w-4 mr-2" />
                      Add Equipment
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Maintenance
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Resource Assignments - {new Date(selectedDate).toLocaleDateString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <div key={assignment.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium">{assignment.projectName}</h4>
                        <p className="text-sm text-muted-foreground">{assignment.customer}</p>
                      </div>
                      <Badge variant="outline">{assignment.status}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        {assignment.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        {assignment.timeSlot}
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-sm text-muted-foreground">Assigned Resources:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {assignment.resources.map((resource) => (
                          <Badge key={resource} variant="secondary">
                            {resource}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="utilization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resource Utilization Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {resources.map((resource) => (
                  <div key={resource.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{resource.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {resource.utilization}% utilized
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${
                          resource.utilization >= 90 ? 'bg-red-500' :
                          resource.utilization >= 70 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${resource.utilization}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="planning" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resource Planning</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Project</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kitchen">Kitchen Renovation</SelectItem>
                        <SelectItem value="bathroom">Bathroom Repair</SelectItem>
                        <SelectItem value="deck">Deck Installation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Required Skills</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select skills" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="plumbing">Plumbing</SelectItem>
                        <SelectItem value="electrical">Electrical</SelectItem>
                        <SelectItem value="carpentry">Carpentry</SelectItem>
                        <SelectItem value="roofing">Roofing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border rounded-md"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>
                </div>
                <Button className="w-full">Find Available Resources</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
