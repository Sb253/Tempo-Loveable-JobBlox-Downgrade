
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, User, Phone, AlertCircle } from "lucide-react";

interface EmployeeStatus {
  id: string;
  name: string;
  phone: string;
  status: 'available' | 'busy' | 'break' | 'offline';
  currentJob?: {
    id: string;
    title: string;
    customer: string;
    estimatedCompletion: string;
  };
  location: {
    lat: number;
    lng: number;
    address: string;
    lastUpdated: string;
  };
  workRadius: number;
  skills: string[];
}

export const EmployeeAvailabilityTracker = () => {
  const [employees, setEmployees] = useState<EmployeeStatus[]>([
    {
      id: '1',
      name: 'Mike Johnson',
      phone: '(555) 123-4567',
      status: 'busy',
      currentJob: {
        id: 'job-1',
        title: 'Kitchen Renovation',
        customer: 'John Smith',
        estimatedCompletion: '16:30'
      },
      location: {
        lat: 40.7128,
        lng: -74.0060,
        address: '123 Main St, NYC',
        lastUpdated: '2 mins ago'
      },
      workRadius: 25,
      skills: ['plumbing', 'electrical']
    },
    {
      id: '2',
      name: 'Sarah Davis',
      phone: '(555) 987-6543',
      status: 'available',
      location: {
        lat: 40.7580,
        lng: -73.9855,
        address: '456 Park Ave, NYC',
        lastUpdated: '1 min ago'
      },
      workRadius: 35,
      skills: ['carpentry', 'renovation']
    },
    {
      id: '3',
      name: 'Tom Wilson',
      phone: '(555) 456-7890',
      status: 'break',
      location: {
        lat: 40.6892,
        lng: -74.0445,
        address: '789 Broadway, NYC',
        lastUpdated: '5 mins ago'
      },
      workRadius: 30,
      skills: ['hvac', 'electrical']
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-red-100 text-red-800';
      case 'break': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvailableEmployeesForLocation = (lat: number, lng: number) => {
    // Simple distance calculation for demo (in real app, use proper geolocation)
    return employees.filter(emp => 
      emp.status === 'available' || emp.status === 'break'
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Employee Availability</h3>
        <div className="flex gap-2">
          <Badge className="bg-green-100 text-green-800">
            {employees.filter(emp => emp.status === 'available').length} Available
          </Badge>
          <Badge className="bg-red-100 text-red-800">
            {employees.filter(emp => emp.status === 'busy').length} Busy
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {employees.map((employee) => (
          <Card key={employee.id} className="border-2">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{employee.name}</CardTitle>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Phone className="h-3 w-3" />
                    {employee.phone}
                  </div>
                </div>
                <Badge className={getStatusColor(employee.status)}>
                  {employee.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm">{employee.location.address}</p>
                  <p className="text-xs text-muted-foreground">
                    Updated {employee.location.lastUpdated}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Work Radius:</span>
                <Badge variant="outline">{employee.workRadius} miles</Badge>
              </div>

              <div>
                <p className="text-sm font-medium mb-1">Skills:</p>
                <div className="flex flex-wrap gap-1">
                  {employee.skills.map(skill => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {employee.currentJob && (
                <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-800">Current Job</p>
                      <p className="text-xs text-red-600">{employee.currentJob.title}</p>
                      <p className="text-xs text-red-600">Customer: {employee.currentJob.customer}</p>
                      <p className="text-xs text-red-600">
                        ETA: {employee.currentJob.estimatedCompletion}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  Track
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Phone className="h-3 w-3 mr-1" />
                  Call
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Assignment Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Job Assignment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Available Now</h4>
              <div className="space-y-2">
                {employees
                  .filter(emp => emp.status === 'available')
                  .map(emp => (
                    <div key={emp.id} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span className="text-sm">{emp.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {emp.workRadius}mi
                        </Badge>
                      </div>
                      <Button size="sm">Assign</Button>
                    </div>
                  ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Available Soon</h4>
              <div className="space-y-2">
                {employees
                  .filter(emp => emp.status === 'busy' && emp.currentJob)
                  .map(emp => (
                    <div key={emp.id} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{emp.name}</span>
                        <Badge variant="outline" className="text-xs">
                          ETA: {emp.currentJob?.estimatedCompletion}
                        </Badge>
                      </div>
                      <Button size="sm" variant="outline">Schedule</Button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
