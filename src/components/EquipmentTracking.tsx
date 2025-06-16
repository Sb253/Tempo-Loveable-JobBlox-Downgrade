
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Package, Wrench, Calendar, AlertTriangle, Plus } from "lucide-react";

interface Equipment {
  id: string;
  name: string;
  type: string;
  serialNumber: string;
  status: 'available' | 'in-use' | 'maintenance' | 'retired';
  location: string;
  assignedTo?: string;
  lastMaintenance: string;
  nextMaintenance: string;
  purchaseDate: string;
  value: number;
}

const mockEquipment: Equipment[] = [
  {
    id: '1',
    name: 'DeWalt Circular Saw',
    type: 'Power Tool',
    serialNumber: 'DW-12345',
    status: 'in-use',
    location: 'Job Site A',
    assignedTo: 'John Smith',
    lastMaintenance: '2024-11-15',
    nextMaintenance: '2025-02-15',
    purchaseDate: '2023-06-10',
    value: 299.99
  },
  {
    id: '2',
    name: 'Scaffolding Set',
    type: 'Safety Equipment',
    serialNumber: 'SC-67890',
    status: 'available',
    location: 'Warehouse',
    lastMaintenance: '2024-10-20',
    nextMaintenance: '2025-01-20',
    purchaseDate: '2022-03-15',
    value: 1599.99
  },
  {
    id: '3',
    name: 'Concrete Mixer',
    type: 'Heavy Equipment',
    serialNumber: 'CM-54321',
    status: 'maintenance',
    location: 'Service Center',
    lastMaintenance: '2024-12-10',
    nextMaintenance: '2024-12-20',
    purchaseDate: '2021-08-05',
    value: 3999.99
  }
];

export const EquipmentTracking = () => {
  const [equipment] = useState<Equipment[]>(mockEquipment);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEquipment = equipment.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'in-use': return 'bg-blue-100 text-blue-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'retired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalValue = equipment.reduce((sum, item) => sum + item.value, 0);
  const availableCount = equipment.filter(item => item.status === 'available').length;
  const maintenanceCount = equipment.filter(item => item.status === 'maintenance').length;

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Equipment Tracking</h2>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Equipment
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{equipment.length}</p>
                <p className="text-sm text-muted-foreground">Total Equipment</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{availableCount}</p>
                <p className="text-sm text-muted-foreground">Available</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Wrench className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{maintenanceCount}</p>
                <p className="text-sm text-muted-foreground">In Maintenance</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">${totalValue.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Search Equipment</CardTitle>
          <Input
            placeholder="Search by name, type, or serial number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </CardHeader>
      </Card>

      {/* Equipment Table */}
      <Card>
        <CardHeader>
          <CardTitle>Equipment Inventory ({filteredEquipment.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Equipment</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Serial #</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Next Maintenance</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEquipment.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.serialNumber}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status.replace('-', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.assignedTo || '-'}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(item.nextMaintenance).toLocaleDateString()}
                      {new Date(item.nextMaintenance) < new Date() && (
                        <AlertTriangle className="h-3 w-3 text-red-500 ml-1" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>${item.value.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">History</Button>
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
