
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { businessDataManager, type Equipment } from '../utils/businessDataManager';
import { useToast } from "@/hooks/use-toast";
import { Wrench, Calendar, AlertTriangle, CheckCircle, Clock, DollarSign, Truck, Plus, MapPin } from "lucide-react";

export const EquipmentTracking = () => {
  const { toast } = useToast();
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showMaintenanceDialog, setShowMaintenanceDialog] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<string>('');
  const [newEquipment, setNewEquipment] = useState({
    name: '',
    model: '',
    serialNumber: '',
    category: '',
    location: '',
    purchaseDate: new Date().toISOString().split('T')[0],
    purchasePrice: 0,
    warrantyExpiration: '',
    notes: ''
  });
  const [newMaintenance, setNewMaintenance] = useState({
    type: 'routine',
    description: '',
    scheduledDate: new Date().toISOString().split('T')[0],
    estimatedCost: 0,
    assignedTechnician: '',
    notes: ''
  });

  const employees = businessDataManager.getAllEmployees();
  const categories = ['Heavy Machinery', 'Vehicles', 'Power Tools', 'Safety Equipment', 'Measuring Tools', 'Other'];

  useEffect(() => {
    loadEquipment();
  }, []);

  const loadEquipment = () => {
    const data = businessDataManager.getAllEquipment();
    setEquipment(data);
  };

  const handleCreateEquipment = () => {
    if (!newEquipment.name || !newEquipment.serialNumber) {
      toast({
        title: "Validation Error",
        description: "Please fill in required fields",
        variant: "destructive"
      });
      return;
    }

    businessDataManager.createEquipment({
      ...newEquipment,
      status: 'available'
    });

    loadEquipment();
    setShowCreateDialog(false);
    setNewEquipment({
      name: '',
      model: '',
      serialNumber: '',
      category: '',
      location: '',
      purchaseDate: new Date().toISOString().split('T')[0],
      purchasePrice: 0,
      warrantyExpiration: '',
      notes: ''
    });

    toast({
      title: "Equipment Added",
      description: "New equipment has been added to inventory"
    });
  };

  const handleScheduleMaintenance = () => {
    if (!selectedEquipment || !newMaintenance.description) {
      toast({
        title: "Validation Error",
        description: "Please fill in required fields",
        variant: "destructive"
      });
      return;
    }

    const equipment = businessDataManager.getEquipment(selectedEquipment);
    if (!equipment) return;

    const maintenanceRecord = {
      id: `maint-${Date.now()}`,
      equipmentId: selectedEquipment,
      equipmentName: equipment.name,
      type: newMaintenance.type as 'routine' | 'repair' | 'inspection',
      description: newMaintenance.description,
      scheduledDate: newMaintenance.scheduledDate,
      estimatedCost: newMaintenance.estimatedCost,
      assignedTechnician: newMaintenance.assignedTechnician,
      status: 'scheduled' as const,
      notes: newMaintenance.notes,
      createdAt: new Date().toISOString()
    };

    businessDataManager.createMaintenanceRecord(maintenanceRecord);

    // Update equipment next maintenance date
    businessDataManager.updateEquipment(selectedEquipment, {
      nextMaintenanceDate: newMaintenance.scheduledDate,
      status: 'maintenance'
    });

    loadEquipment();
    setShowMaintenanceDialog(false);
    setNewMaintenance({
      type: 'routine',
      description: '',
      scheduledDate: new Date().toISOString().split('T')[0],
      estimatedCost: 0,
      assignedTechnician: '',
      notes: ''
    });

    toast({
      title: "Maintenance Scheduled",
      description: `Maintenance scheduled for ${equipment.name}`
    });
  };

  const handleStatusUpdate = (equipmentId: string, newStatus: Equipment['status']) => {
    businessDataManager.updateEquipment(equipmentId, { status: newStatus });
    loadEquipment();

    toast({
      title: "Status Updated",
      description: `Equipment status changed to ${newStatus}`
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'in-use': return 'bg-blue-100 text-blue-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'retired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-use': return <Truck className="h-4 w-4 text-blue-600" />;
      case 'maintenance': return <Wrench className="h-4 w-4 text-yellow-600" />;
      case 'retired': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const totalValue = equipment.reduce((sum, item) => sum + item.purchasePrice, 0);
  const availableCount = equipment.filter(item => item.status === 'available').length;
  const maintenanceCount = equipment.filter(item => item.status === 'maintenance').length;
  const maintenanceRecords = businessDataManager.getAllMaintenanceRecords();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Equipment Tracking</h2>
        <div className="flex gap-2">
          <Dialog open={showMaintenanceDialog} onOpenChange={setShowMaintenanceDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Maintenance
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule Maintenance</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Equipment</Label>
                  <Select value={selectedEquipment} onValueChange={setSelectedEquipment}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select equipment" />
                    </SelectTrigger>
                    <SelectContent>
                      {equipment.map(item => (
                        <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Maintenance Type</Label>
                  <Select value={newMaintenance.type} onValueChange={(value) => setNewMaintenance(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="routine">Routine</SelectItem>
                      <SelectItem value="repair">Repair</SelectItem>
                      <SelectItem value="inspection">Inspection</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={newMaintenance.description}
                    onChange={(e) => setNewMaintenance(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe the maintenance work"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Scheduled Date</Label>
                    <Input
                      type="date"
                      value={newMaintenance.scheduledDate}
                      onChange={(e) => setNewMaintenance(prev => ({ ...prev, scheduledDate: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Estimated Cost</Label>
                    <Input
                      type="number"
                      value={newMaintenance.estimatedCost}
                      onChange={(e) => setNewMaintenance(prev => ({ ...prev, estimatedCost: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Assigned Technician</Label>
                  <Select value={newMaintenance.assignedTechnician} onValueChange={(value) => setNewMaintenance(prev => ({ ...prev, assignedTechnician: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select technician" />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.map(emp => (
                        <SelectItem key={emp.id} value={emp.name}>{emp.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowMaintenanceDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleScheduleMaintenance}>
                    Schedule
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Equipment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Equipment</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name *</Label>
                  <Input
                    value={newEquipment.name}
                    onChange={(e) => setNewEquipment(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Equipment name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Model</Label>
                  <Input
                    value={newEquipment.model}
                    onChange={(e) => setNewEquipment(prev => ({ ...prev, model: e.target.value }))}
                    placeholder="Model number"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Serial Number *</Label>
                  <Input
                    value={newEquipment.serialNumber}
                    onChange={(e) => setNewEquipment(prev => ({ ...prev, serialNumber: e.target.value }))}
                    placeholder="Serial number"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={newEquipment.category} onValueChange={(value) => setNewEquipment(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={newEquipment.location}
                    onChange={(e) => setNewEquipment(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Current location"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Purchase Date</Label>
                  <Input
                    type="date"
                    value={newEquipment.purchaseDate}
                    onChange={(e) => setNewEquipment(prev => ({ ...prev, purchaseDate: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Purchase Price</Label>
                  <Input
                    type="number"
                    value={newEquipment.purchasePrice}
                    onChange={(e) => setNewEquipment(prev => ({ ...prev, purchasePrice: parseFloat(e.target.value) || 0 }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Warranty Expiration</Label>
                  <Input
                    type="date"
                    value={newEquipment.warrantyExpiration}
                    onChange={(e) => setNewEquipment(prev => ({ ...prev, warrantyExpiration: e.target.value }))}
                  />
                </div>

                <div className="space-y-2 col-span-2">
                  <Label>Notes</Label>
                  <Textarea
                    value={newEquipment.notes}
                    onChange={(e) => setNewEquipment(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Additional notes"
                  />
                </div>

                <div className="col-span-2 flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateEquipment}>
                    Add Equipment
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
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
                        <p className="text-sm text-muted-foreground">{item.model}</p>
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
                      <p className="text-muted-foreground">Serial Number</p>
                      <p className="font-medium">{item.serialNumber}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Category</p>
                      <p className="font-medium">{item.category}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Location</p>
                      <p className="font-medium flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {item.location || 'Unassigned'}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Purchase Date</p>
                      <p className="font-medium">{item.purchaseDate}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedEquipment(item.id);
                        setShowMaintenanceDialog(true);
                      }}
                    >
                      <Calendar className="h-3 w-3 mr-1" />
                      Schedule
                    </Button>
                    {item.status === 'available' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleStatusUpdate(item.id, 'in-use')}
                      >
                        Assign
                      </Button>
                    )}
                    {item.status === 'in-use' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleStatusUpdate(item.id, 'available')}
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
              <CardTitle>Scheduled Maintenance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {maintenanceRecords
                  .filter(record => record.status === 'scheduled')
                  .map((record) => (
                    <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        <div>
                          <h3 className="font-semibold">{record.equipmentName}</h3>
                          <p className="text-sm text-muted-foreground">
                            {record.description} - Due: {record.scheduledDate}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Assigned to: {record.assignedTechnician}
                          </p>
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

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {maintenanceRecords
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .map((record) => (
                    <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{record.equipmentName}</h3>
                        <p className="text-sm text-muted-foreground">{record.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                          <span>{record.scheduledDate}</span>
                          <span>By: {record.assignedTechnician}</span>
                          <span>${record.estimatedCost}</span>
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
