
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Users, Briefcase, Car, Home } from "lucide-react";

interface Job {
  id: string;
  title: string;
  customer: string;
  address: string;
  coordinates: [number, number];
  status: 'scheduled' | 'in-progress' | 'completed';
  type: 'job' | 'appointment';
  time: string;
  scheduledDate: string;
  assignedTo: string;
}

interface Employee {
  id: string;
  name: string;
  position: string;
  status: 'active' | 'driving' | 'break' | 'offline';
  currentLocation: string;
  coordinates: [number, number];
  nextJob?: string;
}

interface MapViewProps {
  jobs?: Job[];
}

export const MapView = ({ jobs = [] }: MapViewProps) => {
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'jobs' | 'employees' | 'both'>('both');

  // Mock employee data
  const employees: Employee[] = [
    {
      id: '1',
      name: 'Mike Johnson',
      position: 'Lead Technician',
      status: 'active',
      currentLocation: '123 Main St',
      coordinates: [-74.006, 40.7128],
      nextJob: 'Kitchen Renovation - 2:00 PM'
    },
    {
      id: '2',
      name: 'Sarah Davis',
      position: 'Project Manager',
      status: 'driving',
      currentLocation: 'En route to 456 Oak Ave',
      coordinates: [-73.9442, 40.6782],
      nextJob: 'Bathroom Remodel - 3:30 PM'
    },
    {
      id: '3',
      name: 'Tom Wilson',
      position: 'Electrician',
      status: 'break',
      currentLocation: 'Office',
      coordinates: [-73.9904, 40.7505]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
      case 'active':
        return 'bg-green-500';
      case 'in-progress':
      case 'driving':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-gray-500';
      case 'break':
        return 'bg-orange-500';
      case 'offline':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getMarkerIcon = (type: 'job' | 'employee', status?: string) => {
    if (type === 'job') {
      return status === 'completed' ? '✓' : 'J';
    }
    return 'E';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Map View</h1>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'jobs' ? 'default' : 'outline'}
            onClick={() => setViewMode('jobs')}
            size="sm"
          >
            <Briefcase className="h-4 w-4 mr-2" />
            Jobs Only
          </Button>
          <Button
            variant={viewMode === 'employees' ? 'default' : 'outline'}
            onClick={() => setViewMode('employees')}
            size="sm"
          >
            <Users className="h-4 w-4 mr-2" />
            Employees Only
          </Button>
          <Button
            variant={viewMode === 'both' ? 'default' : 'outline'}
            onClick={() => setViewMode('both')}
            size="sm"
          >
            Both
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Container */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Live Map
                </div>
                <div className="flex gap-2">
                  {(viewMode === 'jobs' || viewMode === 'both') && (
                    <Badge variant="outline">
                      {jobs.length} jobs
                    </Badge>
                  )}
                  {(viewMode === 'employees' || viewMode === 'both') && (
                    <Badge variant="outline">
                      {employees.filter(emp => emp.status !== 'offline').length} active employees
                    </Badge>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Enhanced Map Display */}
                <div className="w-full h-96 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 rounded-lg flex items-center justify-center border-2 border-dashed border-border relative overflow-hidden">
                  <div className="text-center space-y-2">
                    <MapPin className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="text-muted-foreground">Interactive Map View</p>
                    <p className="text-sm text-muted-foreground">
                      Real-time job and employee tracking
                    </p>
                  </div>
                  
                  {/* Job Markers */}
                  {(viewMode === 'jobs' || viewMode === 'both') && jobs.map((job, index) => (
                    <div 
                      key={`job-${job.id}`}
                      className={`absolute w-8 h-8 ${getStatusColor(job.status)} rounded-full text-white text-xs flex items-center justify-center font-bold shadow-lg cursor-pointer hover:scale-110 transition-transform`}
                      style={{
                        top: `${20 + index * 15}%`,
                        left: `${25 + index * 20}%`,
                      }}
                      onClick={() => setSelectedMarker(`job-${job.id}`)}
                      title={`${job.title} - ${job.status}`}
                    >
                      {getMarkerIcon('job', job.status)}
                    </div>
                  ))}
                  
                  {/* Employee Markers */}
                  {(viewMode === 'employees' || viewMode === 'both') && employees.map((employee, index) => (
                    <div 
                      key={`employee-${employee.id}`}
                      className={`absolute w-8 h-8 ${getStatusColor(employee.status)} rounded-full text-white text-xs flex items-center justify-center font-bold shadow-lg cursor-pointer hover:scale-110 transition-transform`}
                      style={{
                        top: `${30 + index * 20}%`,
                        right: `${20 + index * 15}%`,
                      }}
                      onClick={() => setSelectedMarker(`employee-${employee.id}`)}
                      title={`${employee.name} - ${employee.status}`}
                    >
                      {getMarkerIcon('employee')}
                    </div>
                  ))}
                </div>
                
                {/* Map Legend */}
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-4 text-sm">
                    {(viewMode === 'jobs' || viewMode === 'both') && (
                      <>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span>Scheduled Jobs</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span>In Progress</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                          <span>Completed</span>
                        </div>
                      </>
                    )}
                    {(viewMode === 'employees' || viewMode === 'both') && (
                      <>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span>Active</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                          <span>On Break</span>
                        </div>
                      </>
                    )}
                  </div>
                  <Button size="sm" variant="outline">
                    <Navigation className="h-4 w-4 mr-2" />
                    Get Directions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Details Panel */}
        <div className="space-y-4">
          {/* Job List */}
          {(viewMode === 'jobs' || viewMode === 'both') && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Today's Jobs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {jobs.map((job) => (
                    <div 
                      key={job.id} 
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedMarker === `job-${job.id}` ? 'bg-primary/10 border-primary' : 'hover:bg-muted'
                      }`}
                      onClick={() => setSelectedMarker(`job-${job.id}`)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">{job.title}</p>
                          <p className="text-sm text-muted-foreground">{job.customer}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3" />
                            {job.address}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Assigned to: {job.assignedTo}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{job.time}</p>
                          <Badge variant={job.status === 'completed' ? 'default' : 'outline'} className="text-xs">
                            {job.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Employee List */}
          {(viewMode === 'employees' || viewMode === 'both') && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Employee Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {employees.map((employee) => (
                    <div 
                      key={employee.id} 
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedMarker === `employee-${employee.id}` ? 'bg-primary/10 border-primary' : 'hover:bg-muted'
                      }`}
                      onClick={() => setSelectedMarker(`employee-${employee.id}`)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-sm text-muted-foreground">{employee.position}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3" />
                            {employee.currentLocation}
                          </div>
                          {employee.nextJob && (
                            <p className="text-xs text-muted-foreground">
                              Next: {employee.nextJob}
                            </p>
                          )}
                        </div>
                        <Badge 
                          variant={employee.status === 'active' ? 'default' : 'outline'}
                          className={`text-xs ${
                            employee.status === 'active' ? 'bg-green-100 text-green-800' :
                            employee.status === 'driving' ? 'bg-blue-100 text-blue-800' :
                            employee.status === 'break' ? 'bg-orange-100 text-orange-800' :
                            'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {employee.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
