
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Truck, Fuel, Calendar, AlertTriangle, Plus } from "lucide-react";

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  vin: string;
  status: 'active' | 'maintenance' | 'out-of-service';
  assignedDriver?: string;
  mileage: number;
  lastService: string;
  nextService: string;
  fuelLevel: number;
  location: string;
}

const mockVehicles: Vehicle[] = [
  {
    id: '1',
    make: 'Ford',
    model: 'F-150',
    year: 2022,
    licensePlate: 'ABC-123',
    vin: '1FTFW1ET5DFA12345',
    status: 'active',
    assignedDriver: 'John Smith',
    mileage: 45234,
    lastService: '2024-11-15',
    nextService: '2025-02-15',
    fuelLevel: 75,
    location: 'Job Site A'
  },
  {
    id: '2',
    make: 'Chevrolet',
    model: 'Silverado',
    year: 2021,
    licensePlate: 'XYZ-789',
    vin: '1GCRYDED5MZ123456',
    status: 'maintenance',
    mileage: 62890,
    lastService: '2024-12-10',
    nextService: '2024-12-20',
    fuelLevel: 25,
    location: 'Service Center'
  },
  {
    id: '3',
    make: 'Ram',
    model: '1500',
    year: 2023,
    licensePlate: 'DEF-456',
    vin: '1C6SRFFT0PN123789',
    status: 'active',
    assignedDriver: 'Mike Johnson',
    mileage: 23456,
    lastService: '2024-10-20',
    nextService: '2025-01-20',
    fuelLevel: 90,
    location: 'Warehouse'
  }
];

export const VehicleManagement = () => {
  const [vehicles] = useState<Vehicle[]>(mockVehicles);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'out-of-service': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFuelLevelColor = (level: number) => {
    if (level > 50) return 'text-green-600';
    if (level > 25) return 'text-yellow-600';
    return 'text-red-600';
  };

  const activeVehicles = vehicles.filter(v => v.status === 'active').length;
  const maintenanceVehicles = vehicles.filter(v => v.status === 'maintenance').length;
  const averageMileage = Math.round(vehicles.reduce((sum, v) => sum + v.mileage, 0) / vehicles.length);

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Vehicle Management</h2>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Vehicle
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Truck className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{vehicles.length}</p>
                <p className="text-sm text-muted-foreground">Total Vehicles</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Truck className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{activeVehicles}</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{maintenanceVehicles}</p>
                <p className="text-sm text-muted-foreground">In Maintenance</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Truck className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{averageMileage.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Avg Mileage</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Search Vehicles</CardTitle>
          <Input
            placeholder="Search by make, model, or license plate..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </CardHeader>
      </Card>

      {/* Vehicles Table */}
      <Card>
        <CardHeader>
          <CardTitle>Fleet Overview ({filteredVehicles.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vehicle</TableHead>
                <TableHead>License Plate</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Mileage</TableHead>
                <TableHead>Fuel Level</TableHead>
                <TableHead>Next Service</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVehicles.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell className="font-medium">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </TableCell>
                  <TableCell>{vehicle.licensePlate}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(vehicle.status)}>
                      {vehicle.status.replace('-', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>{vehicle.assignedDriver || '-'}</TableCell>
                  <TableCell>{vehicle.mileage.toLocaleString()} mi</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Fuel className={`h-3 w-3 ${getFuelLevelColor(vehicle.fuelLevel)}`} />
                      <span className={getFuelLevelColor(vehicle.fuelLevel)}>
                        {vehicle.fuelLevel}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(vehicle.nextService).toLocaleDateString()}
                      {new Date(vehicle.nextService) < new Date() && (
                        <AlertTriangle className="h-3 w-3 text-red-500 ml-1" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{vehicle.location}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Track</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
