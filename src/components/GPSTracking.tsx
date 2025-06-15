
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Clock, Users, Route, AlertTriangle, Navigation } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'break';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  lastUpdate: string;
  jobSite?: string;
}

export const GPSTracking = () => {
  const { toast } = useToast();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'John Smith',
      status: 'active',
      location: {
        lat: 40.7128,
        lng: -74.0060,
        address: '123 Main St, New York, NY'
      },
      lastUpdate: '2 minutes ago',
      jobSite: 'Kitchen Renovation - Smith Residence'
    },
    {
      id: '2',
      name: 'Mike Wilson',
      status: 'active',
      location: {
        lat: 40.7580,
        lng: -73.9855,
        address: '456 Park Ave, New York, NY'
      },
      lastUpdate: '5 minutes ago',
      jobSite: 'Bathroom Remodel - Johnson Home'
    },
    {
      id: '3',
      name: 'Sarah Davis',
      status: 'break',
      location: {
        lat: 40.7505,
        lng: -73.9934,
        address: '789 Broadway, New York, NY'
      },
      lastUpdate: '15 minutes ago'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'break': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <MapPin className="h-4 w-4 text-green-600" />;
      case 'break': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'inactive': return <AlertTriangle className="h-4 w-4 text-gray-600" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const handleRefreshLocation = () => {
    toast({
      title: "Location Updated",
      description: "Team member locations have been refreshed.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">GPS Team Tracking</h2>
        <div className="flex gap-2">
          <Button onClick={handleRefreshLocation}>
            <Navigation className="h-4 w-4 mr-2" />
            Refresh Locations
          </Button>
          <Button variant="outline">
            <Route className="h-4 w-4 mr-2" />
            View Routes
          </Button>
        </div>
      </div>

      {/* Team Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{teamMembers.filter(m => m.status === 'active').length}</p>
                <p className="text-sm text-muted-foreground">Active in Field</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{teamMembers.filter(m => m.status === 'break').length}</p>
                <p className="text-sm text-muted-foreground">On Break</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <MapPin className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{teamMembers.length}</p>
                <p className="text-sm text-muted-foreground">Total Tracked</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Members List */}
      <Card>
        <CardHeader>
          <CardTitle>Team Member Locations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  {getStatusIcon(member.status)}
                  <div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.location.address}</p>
                    {member.jobSite && (
                      <p className="text-sm text-blue-600">{member.jobSite}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <Badge className={getStatusColor(member.status)}>
                      {member.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{member.lastUpdate}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <MapPin className="h-3 w-3 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Location History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Location Updates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded">
              <div>
                <p className="font-medium">John Smith arrived at job site</p>
                <p className="text-sm text-muted-foreground">Kitchen Renovation - Smith Residence</p>
              </div>
              <span className="text-sm text-muted-foreground">8:30 AM</span>
            </div>
            <div className="flex items-center justify-between p-3 border rounded">
              <div>
                <p className="font-medium">Mike Wilson started break</p>
                <p className="text-sm text-muted-foreground">Downtown Coffee Shop</p>
              </div>
              <span className="text-sm text-muted-foreground">12:15 PM</span>
            </div>
            <div className="flex items-center justify-between p-3 border rounded">
              <div>
                <p className="font-medium">Sarah Davis completed job</p>
                <p className="text-sm text-muted-foreground">Bathroom Remodel - Johnson Home</p>
              </div>
              <span className="text-sm text-muted-foreground">3:45 PM</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
