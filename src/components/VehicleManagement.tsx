
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Car, 
  Truck, 
  Plus, 
  Edit, 
  Trash2, 
  MapPin, 
  Fuel,
  Settings,
  Calendar,
  Users
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Vehicle {
  id: string;
  name: string;
  type: 'truck' | 'van' | 'car' | 'trailer';
  licensePlate: string;
  make: string;
  model: string;
  year: number;
  status: 'active' | 'maintenance' | 'inactive';
  assignedTo?: string;
  location?: string;
  mileage: number;
  fuelLevel: number;
  lastMaintenance: string;
  nextMaintenance: string;
}

export const VehicleManagement = () => {
  const { toast } = useToast();
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: '1',
      name: 'Service Truck 1',
      type: 'truck',
      licensePlate: 'ABC-123',
      make: 'Ford',
      model: 'F-150',
      year: 2022,
      status: 'active',
      assignedTo: 'John Smith',
      location: 'Downtown Area',
      mileage: 45000,
      fuelLevel: 75,
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-04-15'
    },
    {
      id: '2',
      name: 'Equipment Van',
      type: 'van',
      licensePlate: 'XYZ-789',
      make: 'Ford',
      model: 'Transit',
      year: 2021,
      status: 'maintenance',
      assignedTo: 'Mike Johnson',
      location: 'Main Office',
      mileage: 32000,
      fuelLevel: 45,
      lastMaintenance: '2024-02-01',
      nextMaintenance: '2024-05-01'
    }
  ]);

  const [isAddingVehicle, setIsAddingVehicle] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    name: '',
    type: 'truck' as Vehicle['type'],
    licensePlate: '',
    make: '',
    model: '',
    year: new Date().getFullYear(),
    status: 'active' as Vehicle['status'],
    assignedTo: '',
    location: '',
    mileage: 0,
    fuelLevel: 100,
    lastMaintenance: '',
    nextMaintenance: ''
  });

  const getVehicleIcon = (type: Vehicle['type']) => {
    switch (type) {
      case 'truck':
        return <Truck className="h-5 w-5" />;
      case 'van':
        return <Car className="h-5 w-5" />;
      case 'car':
        return <Car className="h-5 w-5" />;
      case 'trailer':
        return <Truck className="h-5 w-5" />;
      default:
        return <Car className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: Vehicle['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddVehicle = () => {
    if (!newVehicle.name || !newVehicle.licensePlate) {
      toast({
        title: "Error",
        description: "Please fill in required fields",
        variant: "destructive"
      });
      return;
    }

    const vehicle: Vehicle = {
      ...newVehicle,
      id: Date.now().toString()
    };

    setVehicles([...vehicles, vehicle]);
    setNewVehicle({
      name: '',
      type: 'truck',
      licensePlate: '',
      make: '',
      model: '',
      year: new Date().getFullYear(),
      status: 'active',
      assignedTo: '',
      location: '',
      mileage: 0,
      fuelLevel: 100,
      lastMaintenance: '',
      nextMaintenance: ''
    });
    setIsAddingVehicle(false);
    
    toast({
      title: "Vehicle Added",
      description: `${vehicle.name} has been added to the fleet`,
    });
  };

  const handleDeleteVehicle = (id: string) => {
    setVehicles(vehicles.filter(v => v.id !== id));
    toast({
      title: "Vehicle Removed",
      description: "Vehicle has been removed from the fleet",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Vehicle Management</h1>
          <p className="text-muted-foreground">Manage your fleet vehicles, maintenance, and assignments</p>
        </div>
        <Button onClick={() => setIsAddingVehicle(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Vehicle
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="vehicles">All Vehicles</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
                <Car className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{vehicles.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active</CardTitle>
                <div className="h-2 w-2 bg-green-500 rounded-full" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {vehicles.filter(v => v.status === 'active').length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {vehicles.filter(v => v.status === 'maintenance').length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Fuel Level</CardTitle>
                <Fuel className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(vehicles.reduce((sum, v) => sum + v.fuelLevel, 0) / vehicles.length)}%
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="vehicles" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vehicles.map((vehicle) => (
              <Card key={vehicle.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getVehicleIcon(vehicle.type)}
                      <CardTitle className="text-lg">{vehicle.name}</CardTitle>
                    </div>
                    <Badge className={getStatusColor(vehicle.status)}>
                      {vehicle.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">License:</span>
                      <span>{vehicle.licensePlate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Vehicle:</span>
                      <span>{vehicle.year} {vehicle.make} {vehicle.model}</span>
                    </div>
                    {vehicle.assignedTo && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Assigned:</span>
                        <span>{vehicle.assignedTo}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fuel:</span>
                      <span>{vehicle.fuelLevel}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Mileage:</span>
                      <span>{vehicle.mileage.toLocaleString()} mi</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteVehicle(vehicle.id)}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Maintenance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {vehicles.filter(v => v.nextMaintenance).map((vehicle) => (
                  <div key={vehicle.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      {getVehicleIcon(vehicle.type)}
                      <div>
                        <div className="font-medium">{vehicle.name}</div>
                        <div className="text-sm text-muted-foreground">{vehicle.licensePlate}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{vehicle.nextMaintenance}</div>
                      <div className="text-sm text-muted-foreground">Due Date</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {isAddingVehicle && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Vehicle</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Vehicle Name*</Label>
                <Input
                  id="name"
                  value={newVehicle.name}
                  onChange={(e) => setNewVehicle({...newVehicle, name: e.target.value})}
                  placeholder="Service Truck 1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="licensePlate">License Plate*</Label>
                <Input
                  id="licensePlate"
                  value={newVehicle.licensePlate}
                  onChange={(e) => setNewVehicle({...newVehicle, licensePlate: e.target.value})}
                  placeholder="ABC-123"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="make">Make</Label>
                <Input
                  id="make"
                  value={newVehicle.make}
                  onChange={(e) => setNewVehicle({...newVehicle, make: e.target.value})}
                  placeholder="Ford"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  value={newVehicle.model}
                  onChange={(e) => setNewVehicle({...newVehicle, model: e.target.value})}
                  placeholder="F-150"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Button onClick={handleAddVehicle}>Add Vehicle</Button>
              <Button variant="outline" onClick={() => setIsAddingVehicle(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
