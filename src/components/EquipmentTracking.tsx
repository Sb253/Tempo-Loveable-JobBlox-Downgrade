
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Wrench, Calendar, AlertTriangle, CheckCircle, Clock, DollarSign, Truck } from "lucide-react";

interface Equipment {
  id: string;
  name: string;
  type: string;
  status: 'available' | 'in-use' | 'maintenance' | 'repair';
  location: string;
  assignedTo?: string;
  purchaseDate: string;
  purchasePrice: number;
  lastMaintenance: string;
  nextMaintenance: string;
  maintenanceHistory: MaintenanceRecord[];
}

interface MaintenanceRecord {
  id: string;
  date: string;
  type: 'routine' | 'repair' | 'inspection';
  description: string;
  cost: number;
  technician: string;
  notes: string;
}

export const EquipmentTracking = () => {
  const { toast } = useToast();
  const [equipment, setEquipment] = useState<Equipment[]>([
    {
      id: '1',
      name: 'Excavator CAT 320',
      type: 'Heavy Machinery',
      status: 'in-use',
      location: 'Job Site A',
      assignedTo: 'John Smith',
      purchaseDate: '2022-03-15',
      purchasePrice: 125000,
      lastMaintenance: '2024-11-15',
      nextMaintenance: '2024-12-15',
      maintenanceHistory: [
        {
          id: '1',
          date: '2024-11-15',
          type: 'routine',
          description: 'Oil change and filter replacement',
          cost: 350,
          technician: 'Mike Johnson',
          notes: 'All systems operating normally'
        }
      ]
    },
    {
      id: '2',
      name: 'Concrete Mixer Truck',
      type: 'Vehicle',
      status: 'maintenance',
      location: 'Maintenance Shop',
      purchaseDate: '2021-08-20',
      purchasePrice: 85000,
      lastMaintenance: '2024-12-01',
      nextMaintenance: '2025-01-01',
      maintenanceHistory: [
        {
          id: '2',
          date: '2024-12-01',
          type: 'repair',
          description: 'Hydraulic system repair',
          cost: 1200,
          technician: 'Sarah Wilson',
          notes: 'Replaced hydraulic pump and seals'
        }
      ]
    },
    {
      id: '3',
      name: 'Generator 50kW',
      type: 'Power Equipment',
      status: 'available',
      location: 'Equipment Yard',
      purchaseDate: '2023-01-10',
      purchasePrice: 15000,
      lastMaintenance: '2024-10-01',
      nextMaintenance: '2025-01-01',
      maintenanceHistory: []
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'in-use': return 'bg-blue-100 text-blue-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'repair': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-use': return <Truck className="h-4 w-4 text-blue-600" />;
      case 'maintenance': return <Wrench className="h-4 w-4 text-yellow-600" />;
      case 'repair': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleScheduleMaintenance = (equipmentId: string) => {
    toast({
      title: "Maintenance Scheduled",
      description: "Equipment maintenance has been scheduled.",
    });
  };

  const handleUpdateStatus = (equipmentId: string, newStatus: Equipment['status']) => {
    setEquipment(prev => prev.map(item => 
      item.id === equipmentId ? { ...item, status: newStatus } : item
    ));
    
    toast({
      title: "Status Updated",
      description: `Equipment status changed to ${newStatus}.`,
    });
  };

  const totalValue = equipment.reduce((sum, item) => sum + item.purchasePrice, 0);
  const availableCount = equipment.filter(item => item.status === 'available').length;
  const maintenanceCount = equipment.filter(item => item.status === 'maintenance' || item.status === 'repair').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Equipment Maintenance Tracking</h2>
        <Button>
          <Wrench className="h-4 w-4 mr-2" />
          Schedule Maintenance
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Truck className="h-8 w-8 text-blue-600" />
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
              <CheckCircle className="h-8 w-8 text-green-600" />
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
              <AlertTriangle className="h-8 w-8 text-orange-600" />
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
              <DollarSign className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">${totalValue.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="inventory" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="inventory">Equipment Inventory</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance Schedule</TabsTrigger>
          <TabsTrigger value="history">Maintenance History</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {equipment.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(item.status)}
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.type}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Location</p>
                      <p className="font-medium">{item.location}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Assigned To</p>
                      <p className="font-medium">{item.assignedTo || 'Unassigned'}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Last Maintenance</p>
                      <p className="font-medium">{item.lastMaintenance}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Next Maintenance</p>
                      <p className="font-medium">{item.nextMaintenance}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleScheduleMaintenance(item.id)}
                    >
                      <Calendar className="h-3 w-3 mr-1" />
                      Schedule
                    </Button>
                    {item.status === 'available' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleUpdateStatus(item.id, 'in-use')}
                      >
                        Assign
                      </Button>
                    )}
                    {item.status === 'in-use' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleUpdateStatus(item.id, 'available')}
                      >
                        Return
                      </Button>
                    )}
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
                {equipment
                  .filter(item => new Date(item.nextMaintenance) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000))
                  .map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        <div>
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Due: {item.nextMaintenance}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Schedule Now
                      </Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Maintenance History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {equipment.flatMap(item => 
                  item.maintenanceHistory.map(record => ({
                    ...record,
                    equipmentName: item.name
                  }))
                ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{record.equipmentName}</h3>
                      <p className="text-sm text-muted-foreground">{record.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                        <span>{record.date}</span>
                        <span>By: {record.technician}</span>
                        <span>${record.cost}</span>
                      </div>
                    </div>
                    <Badge variant="outline">
                      {record.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
