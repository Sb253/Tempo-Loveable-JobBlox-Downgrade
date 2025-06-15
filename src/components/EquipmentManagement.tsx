
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Wrench, 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Truck,
  Plus,
  Search,
  Edit,
  Trash2,
  QrCode,
  MapPin,
  User,
  Settings,
  TrendingUp,
  Package
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

interface Equipment {
  id: string;
  name: string;
  type: string;
  category: string;
  serialNumber: string;
  model: string;
  manufacturer: string;
  status: 'available' | 'in-use' | 'maintenance' | 'repair' | 'retired';
  location: string;
  assignedTo?: string;
  assignedSite?: string;
  purchaseDate: string;
  purchasePrice: number;
  currentValue: number;
  lastMaintenance: string;
  nextMaintenance: string;
  hoursUsed: number;
  fuelConsumption?: number;
  notes: string;
}

interface MaintenanceRecord {
  id: string;
  equipmentId: string;
  date: string;
  type: 'routine' | 'repair' | 'inspection' | 'calibration';
  description: string;
  cost: number;
  technician: string;
  partsReplaced: string[];
  nextServiceDue: string;
  severity: 'low' | 'medium' | 'high';
}

const initialEquipment: Equipment[] = [
  {
    id: '1',
    name: 'Excavator CAT 320',
    type: 'Heavy Machinery',
    category: 'Excavation',
    serialNumber: 'CAT320-2024-001',
    model: '320 GC',
    manufacturer: 'Caterpillar',
    status: 'in-use',
    location: 'Downtown Construction Site',
    assignedTo: 'John Smith',
    assignedSite: 'Project Alpha',
    purchaseDate: '2022-03-15',
    purchasePrice: 125000,
    currentValue: 95000,
    lastMaintenance: '2024-11-15',
    nextMaintenance: '2024-12-15',
    hoursUsed: 2450,
    fuelConsumption: 8.5,
    notes: 'Excellent condition, regular maintenance up to date'
  },
  {
    id: '2',
    name: 'Concrete Mixer Truck',
    type: 'Vehicle',
    category: 'Transportation',
    serialNumber: 'CMT-2024-002',
    model: 'Oshkosh S-Series',
    manufacturer: 'Oshkosh',
    status: 'maintenance',
    location: 'Main Depot',
    purchaseDate: '2021-08-20',
    purchasePrice: 185000,
    currentValue: 145000,
    lastMaintenance: '2024-12-01',
    nextMaintenance: '2025-01-01',
    hoursUsed: 4200,
    fuelConsumption: 12.3,
    notes: 'Hydraulic system under maintenance'
  },
  {
    id: '3',
    name: 'Tower Crane',
    type: 'Heavy Machinery',
    category: 'Lifting',
    serialNumber: 'TC-2024-003',
    model: 'Liebherr 280 EC-H',
    manufacturer: 'Liebherr',
    status: 'available',
    location: 'Equipment Yard',
    purchaseDate: '2023-01-10',
    purchasePrice: 450000,
    currentValue: 420000,
    lastMaintenance: '2024-10-01',
    nextMaintenance: '2025-01-01',
    hoursUsed: 1200,
    notes: 'Ready for deployment'
  }
];

const maintenanceRecords: MaintenanceRecord[] = [
  {
    id: '1',
    equipmentId: '1',
    date: '2024-11-15',
    type: 'routine',
    description: 'Oil change, filter replacement, hydraulic fluid check',
    cost: 450,
    technician: 'Mike Johnson',
    partsReplaced: ['Oil filter', 'Hydraulic filter'],
    nextServiceDue: '2024-12-15',
    severity: 'low'
  },
  {
    id: '2',
    equipmentId: '2',
    date: '2024-12-01',
    type: 'repair',
    description: 'Hydraulic pump replacement',
    cost: 2500,
    technician: 'Sarah Wilson',
    partsReplaced: ['Hydraulic pump', 'Seals kit'],
    nextServiceDue: '2025-01-01',
    severity: 'high'
  }
];

const utilizationData = [
  { month: 'Jan', hours: 320, efficiency: 85 },
  { month: 'Feb', hours: 298, efficiency: 82 },
  { month: 'Mar', hours: 356, efficiency: 88 },
  { month: 'Apr', hours: 412, efficiency: 92 },
  { month: 'May', hours: 389, efficiency: 89 },
  { month: 'Jun', hours: 445, efficiency: 94 }
];

const categoryData = [
  { name: 'Heavy Machinery', value: 45, color: '#8884d8' },
  { name: 'Vehicles', value: 30, color: '#82ca9d' },
  { name: 'Tools', value: 15, color: '#ffc658' },
  { name: 'Safety Equipment', value: 10, color: '#ff7300' }
];

export const EquipmentManagement = () => {
  const { toast } = useToast();
  const [equipment, setEquipment] = useState<Equipment[]>(initialEquipment);
  const [maintenance, setMaintenance] = useState<MaintenanceRecord[]>(maintenanceRecords);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'in-use': return 'bg-blue-100 text-blue-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'repair': return 'bg-red-100 text-red-800';
      case 'retired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-use': return <Truck className="h-4 w-4 text-blue-600" />;
      case 'maintenance': return <Wrench className="h-4 w-4 text-yellow-600" />;
      case 'repair': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'retired': return <Clock className="h-4 w-4 text-gray-600" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleStatusUpdate = (equipmentId: string, newStatus: Equipment['status']) => {
    setEquipment(prev => prev.map(item => 
      item.id === equipmentId ? { ...item, status: newStatus } : item
    ));
    
    toast({
      title: "Status Updated",
      description: `Equipment status changed to ${newStatus}.`,
    });
  };

  const handleAssignEquipment = (equipmentId: string, assignee: string, site: string) => {
    setEquipment(prev => prev.map(item => 
      item.id === equipmentId ? { 
        ...item, 
        status: 'in-use',
        assignedTo: assignee,
        assignedSite: site
      } : item
    ));
    
    toast({
      title: "Equipment Assigned",
      description: `Equipment assigned to ${assignee} at ${site}.`,
    });
  };

  const handleMaintenanceSchedule = (equipmentId: string, date: string) => {
    setEquipment(prev => prev.map(item => 
      item.id === equipmentId ? { ...item, nextMaintenance: date } : item
    ));
    
    toast({
      title: "Maintenance Scheduled",
      description: `Maintenance scheduled for ${date}.`,
    });
  };

  const totalValue = equipment.reduce((sum, item) => sum + item.currentValue, 0);
  const availableCount = equipment.filter(item => item.status === 'available').length;
  const inUseCount = equipment.filter(item => item.status === 'in-use').length;
  const maintenanceCount = equipment.filter(item => 
    item.status === 'maintenance' || item.status === 'repair'
  ).length;

  const upcomingMaintenance = equipment.filter(item => {
    const nextDate = new Date(item.nextMaintenance);
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    return nextDate <= thirtyDaysFromNow;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Equipment Management</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <QrCode className="h-4 w-4 mr-2" />
            Scan Equipment
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Equipment
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            <div className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +2.3% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableCount}</div>
            <div className="text-xs text-muted-foreground">Ready for use</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Use</CardTitle>
            <Truck className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inUseCount}</div>
            <div className="text-xs text-muted-foreground">Currently deployed</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{maintenanceCount}</div>
            <div className="text-xs text-muted-foreground">Need attention</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="equipment" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="equipment" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search equipment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="in-use">In Use</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="repair">Repair</SelectItem>
                <SelectItem value="retired">Retired</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Excavation">Excavation</SelectItem>
                <SelectItem value="Transportation">Transportation</SelectItem>
                <SelectItem value="Lifting">Lifting</SelectItem>
                <SelectItem value="Tools">Tools</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Equipment Grid */}
          <div className="grid gap-4">
            {filteredEquipment.map((item) => (
              <Card key={item.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(item.status)}
                      <div>
                        <h4 className="font-semibold text-lg">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.manufacturer} {item.model} • {item.serialNumber}
                        </p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {item.location}
                          </span>
                          {item.assignedTo && (
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {item.assignedTo}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-lg font-bold">{item.hoursUsed.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Hours</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-lg font-bold">${item.currentValue.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Value</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-sm font-medium">{item.nextMaintenance}</div>
                        <div className="text-xs text-muted-foreground">Next Service</div>
                      </div>
                      
                      <div className="flex gap-2">
                        {item.status === 'available' && (
                          <Button 
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
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedEquipment(item)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <Badge className={getStatusColor(item.status)}>
                        {item.status.replace('-', ' ')}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Maintenance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingMaintenance.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        <div>
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Due: {item.nextMaintenance} • {item.hoursUsed} hours
                          </p>
                        </div>
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => handleMaintenanceSchedule(item.id, item.nextMaintenance)}
                      >
                        Schedule
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Maintenance History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {maintenance.map((record) => {
                    const equipmentItem = equipment.find(e => e.id === record.equipmentId);
                    return (
                      <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h3 className="font-semibold">{equipmentItem?.name}</h3>
                          <p className="text-sm text-muted-foreground">{record.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                            <span>{record.date}</span>
                            <span>By: {record.technician}</span>
                            <span>${record.cost}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className={
                          record.severity === 'high' ? 'border-red-200 text-red-800' :
                          record.severity === 'medium' ? 'border-yellow-200 text-yellow-800' :
                          'border-green-200 text-green-800'
                        }>
                          {record.type}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Equipment Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={utilizationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="hours" stroke="#8884d8" name="Hours Used" />
                    <Line type="monotone" dataKey="efficiency" stroke="#82ca9d" name="Efficiency %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Equipment by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Equipment Value Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={equipment}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                    <Bar dataKey="currentValue" fill="#8884d8" name="Current Value" />
                    <Bar dataKey="purchasePrice" fill="#82ca9d" name="Purchase Price" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Equipment Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingMaintenance.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg bg-orange-50">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-orange-500" />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Maintenance due: {item.nextMaintenance}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Location: {item.location} • Hours: {item.hoursUsed}
                        </p>
                      </div>
                    </div>
                    <Button size="sm">
                      Schedule
                    </Button>
                  </div>
                ))}

                {equipment.filter(item => item.hoursUsed > 4000).map((item) => (
                  <div key={`high-usage-${item.id}`} className="flex items-center justify-between p-3 border rounded-lg bg-yellow-50">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-yellow-600" />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          High usage: {item.hoursUsed} hours
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Consider replacement or major service
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Review
                    </Button>
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
