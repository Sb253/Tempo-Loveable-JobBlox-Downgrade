
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Package, 
  Wrench, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  MapPin,
  Calendar,
  DollarSign,
  Scan,
  Plus,
  Filter,
  Download,
  Minus,
  ShoppingCart,
  Search,
  Edit,
  Trash2
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  costPerUnit: number;
  supplier: string;
  location: string;
  lastRestocked: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

interface Equipment {
  id: string;
  name: string;
  type: string;
  serialNumber: string;
  assignedTo: string;
  location: string;
  status: 'available' | 'in-use' | 'maintenance' | 'retired';
  purchaseDate: string;
  lastMaintenance: string;
  nextMaintenance: string;
  value: number;
}

const initialInventory: InventoryItem[] = [
  {
    id: '1',
    name: 'PVC Pipes (2 inch)',
    category: 'Plumbing',
    currentStock: 45,
    minStock: 20,
    maxStock: 100,
    unit: 'pieces',
    costPerUnit: 12.50,
    supplier: 'PlumbCorp',
    location: 'Warehouse A',
    lastRestocked: '2024-12-10',
    status: 'in-stock'
  },
  {
    id: '2',
    name: 'Electrical Wire (12 AWG)',
    category: 'Electrical',
    currentStock: 8,
    minStock: 15,
    maxStock: 50,
    unit: 'rolls',
    costPerUnit: 85.00,
    supplier: 'ElectriCorp',
    location: 'Warehouse B',
    lastRestocked: '2024-12-08',
    status: 'low-stock'
  },
  {
    id: '3',
    name: 'Ceramic Tiles',
    category: 'Flooring',
    currentStock: 0,
    minStock: 10,
    maxStock: 200,
    unit: 'boxes',
    costPerUnit: 45.00,
    supplier: 'TileMaster',
    location: 'Warehouse A',
    lastRestocked: '2024-11-25',
    status: 'out-of-stock'
  },
  {
    id: '4',
    name: 'Concrete Mix',
    category: 'Construction',
    currentStock: 75,
    minStock: 30,
    maxStock: 150,
    unit: 'bags',
    costPerUnit: 8.50,
    supplier: 'BuildCorp',
    location: 'Warehouse C',
    lastRestocked: '2024-12-12',
    status: 'in-stock'
  },
  {
    id: '5',
    name: 'Copper Fittings',
    category: 'Plumbing',
    currentStock: 25,
    minStock: 50,
    maxStock: 200,
    unit: 'pieces',
    costPerUnit: 3.75,
    supplier: 'PlumbCorp',
    location: 'Warehouse A',
    lastRestocked: '2024-12-05',
    status: 'low-stock'
  }
];

const initialEquipment: Equipment[] = [
  {
    id: '1',
    name: 'Hydraulic Drill',
    type: 'Power Tool',
    serialNumber: 'HD-2024-001',
    assignedTo: 'Mike Johnson',
    location: 'Downtown Site',
    status: 'in-use',
    purchaseDate: '2024-01-15',
    lastMaintenance: '2024-11-01',
    nextMaintenance: '2025-02-01',
    value: 2500
  },
  {
    id: '2',
    name: 'Pipe Threading Machine',
    type: 'Specialized Tool',
    serialNumber: 'PTM-2024-002',
    assignedTo: 'Available',
    location: 'Main Warehouse',
    status: 'available',
    purchaseDate: '2024-03-20',
    lastMaintenance: '2024-12-01',
    nextMaintenance: '2025-03-01',
    value: 3200
  },
  {
    id: '3',
    name: 'Electrical Tester',
    type: 'Diagnostic Tool',
    serialNumber: 'ET-2024-003',
    assignedTo: 'Tom Wilson',
    location: 'Residential Site',
    status: 'maintenance',
    purchaseDate: '2024-02-10',
    lastMaintenance: '2024-12-10',
    nextMaintenance: '2025-01-10',
    value: 800
  },
  {
    id: '4',
    name: 'Concrete Mixer',
    type: 'Heavy Equipment',
    serialNumber: 'CM-2024-004',
    assignedTo: 'Sarah Davis',
    location: 'Construction Site B',
    status: 'in-use',
    purchaseDate: '2024-05-10',
    lastMaintenance: '2024-11-20',
    nextMaintenance: '2025-02-20',
    value: 5500
  }
];

const usageData = [
  { month: 'Jan', inventory: 85000, equipment: 45000 },
  { month: 'Feb', inventory: 92000, equipment: 48000 },
  { month: 'Mar', inventory: 78000, equipment: 52000 },
  { month: 'Apr', inventory: 105000, equipment: 47000 },
  { month: 'May', inventory: 98000, equipment: 55000 },
  { month: 'Jun', inventory: 112000, equipment: 58000 }
];

const categoryData = [
  { name: 'Plumbing', value: 35, color: '#8884d8' },
  { name: 'Electrical', value: 28, color: '#82ca9d' },
  { name: 'Construction', value: 20, color: '#ffc658' },
  { name: 'Flooring', value: 17, color: '#ff7300' }
];

export const AdvancedInventorySystem = () => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState('inventory');
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [equipment, setEquipment] = useState<Equipment[]>(initialEquipment);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock':
      case 'available': return 'bg-green-100 text-green-800';
      case 'low-stock':
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'out-of-stock':
      case 'retired': return 'bg-red-100 text-red-800';
      case 'in-use': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'low-stock':
      case 'out-of-stock': return <AlertTriangle className="h-4 w-4" />;
      case 'in-use': return <Wrench className="h-4 w-4" />;
      default: return null;
    }
  };

  const filteredInventory = inventory.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter === 'all' || item.category.toLowerCase() === categoryFilter)
  );

  const filteredEquipment = equipment.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockItems = inventory.filter(item => item.status === 'low-stock' || item.status === 'out-of-stock');
  const totalInventoryValue = inventory.reduce((sum, item) => sum + (item.currentStock * item.costPerUnit), 0);
  const totalEquipmentValue = equipment.reduce((sum, item) => sum + item.value, 0);

  const handleStockAdjustment = (itemId: string, adjustment: number) => {
    setInventory(prev => prev.map(item => {
      if (item.id === itemId) {
        const newStock = Math.max(0, item.currentStock + adjustment);
        let newStatus: InventoryItem['status'] = 'in-stock';
        
        if (newStock === 0) newStatus = 'out-of-stock';
        else if (newStock <= item.minStock) newStatus = 'low-stock';
        
        return { ...item, currentStock: newStock, status: newStatus };
      }
      return item;
    }));

    toast({
      title: "Stock Updated",
      description: `Inventory has been ${adjustment > 0 ? 'increased' : 'decreased'}.`,
    });
  };

  const handleReorder = (itemId: string) => {
    const item = inventory.find(i => i.id === itemId);
    if (item) {
      const orderQuantity = item.maxStock - item.currentStock;
      toast({
        title: "Reorder Initiated",
        description: `Ordering ${orderQuantity} ${item.unit} of ${item.name}`,
      });
    }
  };

  const handleEquipmentStatusChange = (equipmentId: string, newStatus: Equipment['status']) => {
    setEquipment(prev => prev.map(item => 
      item.id === equipmentId ? { ...item, status: newStatus } : item
    ));
    
    toast({
      title: "Equipment Status Updated",
      description: `Status changed to ${newStatus}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Advanced Inventory & Equipment</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <Scan className="h-4 w-4 mr-2" />
            Scan QR Code
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inventory Value</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalInventoryValue.toLocaleString()}</div>
            <div className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8.2% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Equipment Value</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalEquipmentValue.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">
              {equipment.filter(e => e.status === 'in-use').length} in use
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{lowStockItems.length}</div>
            <div className="text-xs text-muted-foreground">
              Items need restocking
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Usage</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$112K</div>
            <div className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +14.3% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="plumbing">Plumbing</SelectItem>
                <SelectItem value="electrical">Electrical</SelectItem>
                <SelectItem value="construction">Construction</SelectItem>
                <SelectItem value="flooring">Flooring</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          {/* Low Stock Alert */}
          {lowStockItems.length > 0 && (
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <AlertTriangle className="h-5 w-5" />
                  Low Stock Alerts ({lowStockItems.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {lowStockItems.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-2 bg-white rounded border">
                      <span className="font-medium">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-orange-600">
                          {item.currentStock} {item.unit}
                        </Badge>
                        <Button size="sm" onClick={() => handleReorder(item.id)}>
                          Reorder
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Inventory Grid */}
          <div className="grid gap-4">
            {filteredInventory.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(item.status)}
                        <div>
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">{item.category}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-lg font-bold">{item.currentStock}</div>
                        <div className="text-xs text-muted-foreground">{item.unit}</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-lg font-bold">${item.costPerUnit}</div>
                        <div className="text-xs text-muted-foreground">per {item.unit}</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-sm">{item.location}</div>
                        <div className="text-xs text-muted-foreground">{item.supplier}</div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleStockAdjustment(item.id, -1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleStockAdjustment(item.id, 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleReorder(item.id)}
                        >
                          <ShoppingCart className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <Badge className={getStatusColor(item.status)}>
                        {item.status.replace('-', ' ')}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Stock Level Bar */}
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Stock Level</span>
                      <span>{item.currentStock} / {item.maxStock}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          item.currentStock <= item.minStock ? 'bg-red-500' :
                          item.currentStock <= item.minStock * 1.5 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${Math.min((item.currentStock / item.maxStock) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="equipment" className="space-y-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search equipment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid gap-4">
            {filteredEquipment.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Wrench className="h-8 w-8 text-blue-600" />
                      <div>
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">{item.type} • {item.serialNumber}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-sm font-medium">{item.assignedTo}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {item.location}
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-sm font-medium">${item.value.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Value</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-sm font-medium">{item.nextMaintenance}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Next Service
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {item.status === 'available' && (
                          <Button 
                            size="sm" 
                            onClick={() => handleEquipmentStatusChange(item.id, 'in-use')}
                          >
                            Assign
                          </Button>
                        )}
                        {item.status === 'in-use' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEquipmentStatusChange(item.id, 'available')}
                          >
                            Return
                          </Button>
                        )}
                        {item.status !== 'maintenance' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEquipmentStatusChange(item.id, 'maintenance')}
                          >
                            Maintenance
                          </Button>
                        )}
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

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Usage Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={usageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                    <Line type="monotone" dataKey="inventory" stroke="#8884d8" name="Inventory" />
                    <Line type="monotone" dataKey="equipment" stroke="#82ca9d" name="Equipment" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Inventory by Category</CardTitle>
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
                <CardTitle>Stock Levels Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={inventory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="currentStock" fill="#8884d8" name="Current Stock" />
                    <Bar dataKey="minStock" fill="#82ca9d" name="Min Stock" />
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
                Inventory Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {lowStockItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg bg-orange-50">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.status === 'out-of-stock' ? 'Out of stock' : `Low stock: ${item.currentStock} ${item.unit} remaining`}
                        </p>
                        <p className="text-xs text-muted-foreground">Location: {item.location}</p>
                      </div>
                    </div>
                    <Button size="sm" onClick={() => handleReorder(item.id)}>
                      Reorder
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-blue-500" />
                Equipment Maintenance Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {equipment
                  .filter(item => new Date(item.nextMaintenance) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000))
                  .map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg bg-blue-50">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Maintenance due: {item.nextMaintenance}
                          </p>
                          <p className="text-xs text-muted-foreground">Location: {item.location}</p>
                        </div>
                      </div>
                      <Button size="sm" onClick={() => handleEquipmentStatusChange(item.id, 'maintenance')}>
                        Schedule
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
