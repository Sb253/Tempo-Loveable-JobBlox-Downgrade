
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Users, Navigation, Plus, Building, Home, Clock } from "lucide-react";

export const LocationManagement = () => {
  const [locations, setLocations] = useState([
    { id: 1, name: "Downtown Office", type: "office", address: "123 Main St", employees: 8, status: "active" },
    { id: 2, name: "Warehouse North", type: "warehouse", address: "456 Industrial Blvd", employees: 3, status: "active" },
    { id: 3, name: "Johnson Job Site", type: "jobsite", address: "789 Residential Ave", employees: 2, status: "in-progress" }
  ]);

  const [routes, setRoutes] = useState([
    { id: 1, name: "Morning Route A", locations: 5, duration: "3.5 hrs", status: "active" },
    { id: 2, name: "Afternoon Route B", locations: 4, duration: "2.8 hrs", status: "completed" },
    { id: 3, name: "Emergency Route", locations: 2, duration: "1.2 hrs", status: "pending" }
  ]);

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'office': return <Building className="h-4 w-4 text-blue-500" />;
      case 'warehouse': return <Building className="h-4 w-4 text-orange-500" />;
      case 'jobsite': return <Home className="h-4 w-4 text-green-500" />;
      default: return <MapPin className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Location Management</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Location
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Locations</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Managed locations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Job Sites</CardTitle>
            <Home className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Employees on Site</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Currently deployed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Travel Time</CardTitle>
            <Clock className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28m</div>
            <p className="text-xs text-muted-foreground">Between locations</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="locations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="locations">Locations</TabsTrigger>
          <TabsTrigger value="routes">Route Planning</TabsTrigger>
          <TabsTrigger value="assignments">Employee Assignments</TabsTrigger>
        </TabsList>

        <TabsContent value="locations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Locations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {locations.map((location) => (
                  <div key={location.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      {getLocationIcon(location.type)}
                      <div>
                        <p className="font-medium">{location.name}</p>
                        <p className="text-sm text-muted-foreground">{location.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{location.employees} employees</p>
                        <p className="text-xs text-muted-foreground capitalize">{location.type}</p>
                      </div>
                      <Badge className={getStatusColor(location.status)}>
                        {location.status.replace('-', ' ')}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Navigation className="h-4 w-4 mr-2" />
                        Navigate
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="routes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Route Planning</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {routes.map((route) => (
                  <div key={route.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Navigation className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{route.name}</p>
                        <p className="text-sm text-muted-foreground">{route.locations} locations • {route.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge className={getStatusColor(route.status)}>
                        {route.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        View Route
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Employee Location Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Employee location assignments and scheduling will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
