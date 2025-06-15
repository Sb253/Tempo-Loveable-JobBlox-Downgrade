
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, Wrench, Download, Upload, Plus, Search, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Material {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  cost: number;
  supplier: string;
  location: string;
  minStock: number;
}

interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  basePrice: number;
  duration: number;
  materials: string[];
}

export const MaterialsAndServices = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('materials');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showAdvancedFeatures, setShowAdvancedFeatures] = useState(false);

  const mockMaterials: Material[] = [
    {
      id: '1',
      name: '2x4 Lumber',
      category: 'Wood',
      quantity: 150,
      unit: 'pieces',
      cost: 5.99,
      supplier: 'Home Depot',
      location: 'Warehouse A',
      minStock: 50
    },
    {
      id: '2',
      name: 'Concrete Mix',
      category: 'Concrete',
      quantity: 25,
      unit: 'bags',
      cost: 12.99,
      supplier: 'Lowes',
      location: 'Warehouse B',
      minStock: 10
    }
  ];

  const mockServices: Service[] = [
    {
      id: '1',
      name: 'Kitchen Installation',
      category: 'Installation',
      description: 'Complete kitchen cabinet and countertop installation',
      basePrice: 2500,
      duration: 8,
      materials: ['Cabinets', 'Countertops', 'Hardware']
    },
    {
      id: '2',
      name: 'Bathroom Renovation',
      category: 'Renovation',
      description: 'Full bathroom renovation including plumbing and tiling',
      basePrice: 4500,
      duration: 16,
      materials: ['Tiles', 'Fixtures', 'Plumbing supplies']
    }
  ];

  const handleExportData = () => {
    const data = activeTab === 'materials' ? mockMaterials : mockServices;
    const csv = convertToCSV(data);
    downloadCSV(csv, `${activeTab}_export.csv`);
    toast({
      title: "Export Successful",
      description: `${activeTab} data has been exported successfully.`,
    });
  };

  const handleImportData = () => {
    // Create file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv,.xlsx';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // Process file here
        toast({
          title: "Import Successful",
          description: `${file.name} has been imported successfully.`,
        });
      }
    };
    input.click();
  };

  const convertToCSV = (data: any[]) => {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => `"${row[header]}"`).join(','))
    ].join('\n');
    
    return csvContent;
  };

  const downloadCSV = (csv: string, filename: string) => {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Materials & Services</h2>
          <p className="text-muted-foreground">Manage inventory, materials, and service offerings</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowAdvancedFeatures(!showAdvancedFeatures)}>
            Advanced Features
          </Button>
          <Button onClick={() => setShowAddDialog(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Import/Export Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Data Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button onClick={handleImportData} className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Import Data
            </Button>
            <Button onClick={handleExportData} variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Data
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Import from CSV/Excel files or export current data for backup and analysis.
          </p>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="materials" className="space-y-6">
          {/* Materials Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Materials</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockMaterials.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockMaterials.filter(m => m.quantity <= m.minStock).length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${mockMaterials.reduce((sum, m) => sum + (m.quantity * m.cost), 0).toLocaleString()}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Categories</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {new Set(mockMaterials.map(m => m.category)).size}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Materials Table */}
          <Card>
            <CardHeader>
              <CardTitle>Materials Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Unit Cost</TableHead>
                    <TableHead>Total Value</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockMaterials.map((material) => (
                    <TableRow key={material.id}>
                      <TableCell className="font-medium">{material.name}</TableCell>
                      <TableCell>{material.category}</TableCell>
                      <TableCell>{material.quantity} {material.unit}</TableCell>
                      <TableCell>${material.cost}</TableCell>
                      <TableCell>${(material.quantity * material.cost).toFixed(2)}</TableCell>
                      <TableCell>{material.supplier}</TableCell>
                      <TableCell>
                        <Badge variant={material.quantity <= material.minStock ? "destructive" : "default"}>
                          {material.quantity <= material.minStock ? "Low Stock" : "In Stock"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          {/* Services Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Services</CardTitle>
                <Wrench className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockServices.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Price</CardTitle>
                <Wrench className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${Math.round(mockServices.reduce((sum, s) => sum + s.basePrice, 0) / mockServices.length).toLocaleString()}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Duration</CardTitle>
                <Wrench className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(mockServices.reduce((sum, s) => sum + s.duration, 0) / mockServices.length)}h
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Categories</CardTitle>
                <Wrench className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {new Set(mockServices.map(s => s.category)).size}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Services Table */}
          <Card>
            <CardHeader>
              <CardTitle>Service Offerings</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Base Price</TableHead>
                    <TableHead>Duration (hrs)</TableHead>
                    <TableHead>Materials Required</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockServices.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">{service.name}</TableCell>
                      <TableCell>{service.category}</TableCell>
                      <TableCell>${service.basePrice.toLocaleString()}</TableCell>
                      <TableCell>{service.duration}h</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {service.materials.slice(0, 2).map((material, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {material}
                            </Badge>
                          ))}
                          {service.materials.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{service.materials.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Features</CardTitle>
              <p className="text-sm text-muted-foreground">
                Advanced inventory management, analytics, and automation features
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Automated Reordering</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Automatically generate purchase orders when inventory falls below minimum levels
                  </p>
                  <Button variant="outline">Configure</Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Cost Analysis</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Analyze material costs and optimize purchasing decisions
                  </p>
                  <Button variant="outline">View Analysis</Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Barcode Scanning</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Use mobile devices to scan and track inventory items
                  </p>
                  <Button variant="outline">Setup Scanning</Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Supplier Integration</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Connect directly with supplier catalogs and pricing
                  </p>
                  <Button variant="outline">Connect Suppliers</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
