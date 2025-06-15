
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Package, Users, Wrench, Building } from "lucide-react";

interface CostItem {
  id: string;
  type: 'material' | 'labor' | 'equipment' | 'overhead';
  category: string;
  description: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  jobReference: string;
  vendor?: string;
  date: string;
  employeeName?: string;
  hours?: number;
  hourlyRate?: number;
}

const mockCostItems: CostItem[] = [
  {
    id: '1',
    type: 'material',
    category: 'Lumber',
    description: '2x4 Premium Pine Lumber',
    quantity: 50,
    unitCost: 8.50,
    totalCost: 425.00,
    jobReference: 'Kitchen Renovation',
    vendor: 'Home Depot',
    date: '2024-12-10'
  },
  {
    id: '2',
    type: 'labor',
    category: 'Installation',
    description: 'Cabinet Installation',
    quantity: 1,
    unitCost: 2400,
    totalCost: 2400,
    jobReference: 'Kitchen Renovation',
    employeeName: 'Mike Johnson',
    hours: 32,
    hourlyRate: 75,
    date: '2024-12-12'
  },
  {
    id: '3',
    type: 'equipment',
    category: 'Tools',
    description: 'Table Saw Rental',
    quantity: 3,
    unitCost: 85,
    totalCost: 255,
    jobReference: 'Deck Installation',
    vendor: 'Tool Rental Co',
    date: '2024-12-08'
  }
];

export const CostTracking = () => {
  const [costItems] = useState<CostItem[]>(mockCostItems);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedJob, setSelectedJob] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = costItems.filter(item => {
    const matchesSearch = item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.jobReference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesJob = selectedJob === 'all' || item.jobReference === selectedJob;
    return matchesSearch && matchesType && matchesJob;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'material': return <Package className="h-4 w-4" />;
      case 'labor': return <Users className="h-4 w-4" />;
      case 'equipment': return <Wrench className="h-4 w-4" />;
      case 'overhead': return <Building className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'material': return 'bg-blue-100 text-blue-800';
      case 'labor': return 'bg-green-100 text-green-800';
      case 'equipment': return 'bg-yellow-100 text-yellow-800';
      case 'overhead': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const materialCosts = costItems.filter(item => item.type === 'material').reduce((sum, item) => sum + item.totalCost, 0);
  const laborCosts = costItems.filter(item => item.type === 'labor').reduce((sum, item) => sum + item.totalCost, 0);
  const equipmentCosts = costItems.filter(item => item.type === 'equipment').reduce((sum, item) => sum + item.totalCost, 0);
  const overheadCosts = costItems.filter(item => item.type === 'overhead').reduce((sum, item) => sum + item.totalCost, 0);

  const totalCosts = materialCosts + laborCosts + equipmentCosts + overheadCosts;

  const uniqueJobs = [...new Set(costItems.map(item => item.jobReference))];

  const renderMaterialTracking = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Material Costs</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${materialCosts.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">
              {((materialCosts / totalCosts) * 100).toFixed(1)}% of total costs
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3">
        {costItems.filter(item => item.type === 'material').map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="h-4 w-4 text-blue-600" />
                    <h4 className="font-semibold">{item.description}</h4>
                    <Badge variant="outline">{item.category}</Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Quantity:</span>
                      <div className="font-medium">{item.quantity}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Unit Cost:</span>
                      <div className="font-medium">${item.unitCost.toFixed(2)}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Vendor:</span>
                      <div className="font-medium">{item.vendor}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Job:</span>
                      <div className="font-medium">{item.jobReference}</div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">${item.totalCost.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">{new Date(item.date).toLocaleDateString()}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderLaborTracking = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Labor Costs</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${laborCosts.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">
              {((laborCosts / totalCosts) * 100).toFixed(1)}% of total costs
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3">
        {costItems.filter(item => item.type === 'labor').map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-green-600" />
                    <h4 className="font-semibold">{item.description}</h4>
                    <Badge variant="outline">{item.category}</Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Employee:</span>
                      <div className="font-medium">{item.employeeName}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Hours:</span>
                      <div className="font-medium">{item.hours}h</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Hourly Rate:</span>
                      <div className="font-medium">${item.hourlyRate}/hr</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Job:</span>
                      <div className="font-medium">{item.jobReference}</div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">${item.totalCost.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">{new Date(item.date).toLocaleDateString()}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Cost Tracking</h2>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Cost Item
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Material Costs</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${materialCosts.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Labor Costs</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${laborCosts.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Equipment Costs</CardTitle>
            <Wrench className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${equipmentCosts.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Costs</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCosts.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Cost Items</CardTitle>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search cost items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="material">Materials</SelectItem>
                <SelectItem value="labor">Labor</SelectItem>
                <SelectItem value="equipment">Equipment</SelectItem>
                <SelectItem value="overhead">Overhead</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedJob} onValueChange={setSelectedJob}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jobs</SelectItem>
                {uniqueJobs.map(job => (
                  <SelectItem key={job} value={job}>
                    {job}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Costs</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="labor">Labor</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Cost Items ({filteredItems.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(item.type)}
                      <div>
                        <div className="font-medium">{item.description}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.jobReference} • {item.vendor || item.employeeName}
                        </div>
                      </div>
                      <Badge className={getTypeColor(item.type)}>
                        {item.type}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">${item.totalCost.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(item.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials">
          {renderMaterialTracking()}
        </TabsContent>

        <TabsContent value="labor">
          {renderLaborTracking()}
        </TabsContent>

        <TabsContent value="equipment" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Equipment Costs</CardTitle>
                <Wrench className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${equipmentCosts.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">
                  {((equipmentCosts / totalCosts) * 100).toFixed(1)}% of total costs
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
