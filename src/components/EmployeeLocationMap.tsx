
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Clock, Phone, RefreshCw } from "lucide-react";

interface Employee {
  id: string;
  name: string;
  position: string;
  status: 'active' | 'break' | 'offline' | 'driving';
  location: {
    lat: number;
    lng: number;
    address: string;
    accuracy: number;
  };
  lastUpdate: string;
  currentJob?: {
    id: string;
    title: string;
    customer: string;
  };
  contact: {
    phone: string;
    email: string;
  };
}

const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Mike Johnson',
    position: 'Lead Technician',
    status: 'active',
    location: {
      lat: 40.7128,
      lng: -74.0060,
      address: '123 Main St, New York, NY',
      accuracy: 15
    },
    lastUpdate: '2 minutes ago',
    currentJob: {
      id: 'J001',
      title: 'Kitchen Renovation',
      customer: 'Smith Residence'
    },
    contact: {
      phone: '(555) 123-4567',
      email: 'mike.johnson@company.com'
    }
  },
  {
    id: '2',
    name: 'Sarah Davis',
    position: 'Project Manager',
    status: 'driving',
    location: {
      lat: 40.7580,
      lng: -73.9855,
      address: '456 Broadway, New York, NY',
      accuracy: 20
    },
    lastUpdate: '5 minutes ago',
    currentJob: {
      id: 'J002',
      title: 'Site Inspection',
      customer: 'Davis Corp'
    },
    contact: {
      phone: '(555) 234-5678',
      email: 'sarah.davis@company.com'
    }
  },
  {
    id: '3',
    name: 'Tom Wilson',
    position: 'Electrician',
    status: 'break',
    location: {
      lat: 40.6892,
      lng: -74.0445,
      address: '789 Office Building, Brooklyn, NY',
      accuracy: 10
    },
    lastUpdate: '1 minute ago',
    contact: {
      phone: '(555) 345-6789',
      email: 'tom.wilson@company.com'
    }
  },
  {
    id: '4',
    name: 'Lisa Chen',
    position: 'Designer',
    status: 'offline',
    location: {
      lat: 40.7831,
      lng: -73.9712,
      address: '321 Design Studio, Manhattan, NY',
      accuracy: 25
    },
    lastUpdate: '15 minutes ago',
    contact: {
      phone: '(555) 456-7890',
      email: 'lisa.chen@company.com'
    }
  }
];

interface EmployeeLocationMapProps {
  compact?: boolean;
}

export const EmployeeLocationMap = ({ compact = false }: EmployeeLocationMapProps) => {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'driving': return 'bg-blue-100 text-blue-800';
      case 'break': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <MapPin className="h-3 w-3" />;
      case 'driving': return <Navigation className="h-3 w-3" />;
      case 'break': return <Clock className="h-3 w-3" />;
      case 'offline': return <MapPin className="h-3 w-3 opacity-50" />;
      default: return <MapPin className="h-3 w-3" />;
    }
  };

  const handleRefresh = () => {
    setLastRefresh(new Date());
    // In a real app, this would fetch fresh location data
  };

  const activeEmployees = employees.filter(emp => emp.status !== 'offline');
  const totalEmployees = employees.length;

  if (compact) {
    return (
      <Card className="h-80">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Employee Locations</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {activeEmployees.length}/{totalEmployees} Active
              </Badge>
              <Button variant="ghost" size="sm" onClick={handleRefresh}>
                <RefreshCw className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {employees.map((employee) => (
              <div key={employee.id} className="flex items-center justify-between p-2 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    {getStatusIcon(employee.status)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium truncate">{employee.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{employee.location.address}</p>
                  </div>
                </div>
                <Badge className={`${getStatusColor(employee.status)} text-xs`}>
                  {employee.status}
                </Badge>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t">
            <p className="text-xs text-muted-foreground">
              Last updated: {lastRefresh.toLocaleTimeString()}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Employee Location Tracking</h3>
          <p className="text-sm text-muted-foreground">Real-time location monitoring for field team</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            {activeEmployees.length} of {totalEmployees} online
          </Badge>
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Map Placeholder */}
      <Card>
        <CardContent className="p-6">
          <div className="bg-muted rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Interactive map with employee locations would be displayed here</p>
              <p className="text-sm text-muted-foreground mt-2">Integration with Google Maps or similar service required</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employee List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {employees.map((employee) => (
          <Card key={employee.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold">{employee.name}</h4>
                  <p className="text-sm text-muted-foreground">{employee.position}</p>
                </div>
                <Badge className={getStatusColor(employee.status)}>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(employee.status)}
                    {employee.status}
                  </div>
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm">{employee.location.address}</p>
                    <p className="text-xs text-muted-foreground">
                      Accuracy: ±{employee.location.accuracy}m • {employee.lastUpdate}
                    </p>
                  </div>
                </div>

                {employee.currentJob && (
                  <div className="bg-muted/50 rounded-lg p-2">
                    <p className="text-xs font-medium">Current Job:</p>
                    <p className="text-sm">{employee.currentJob.title}</p>
                    <p className="text-xs text-muted-foreground">{employee.currentJob.customer}</p>
                  </div>
                )}

                <div className="flex items-center gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Phone className="h-3 w-3 mr-1" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Navigation className="h-3 w-3 mr-1" />
                    Directions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
