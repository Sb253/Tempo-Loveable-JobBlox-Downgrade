
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Package, Plus, Download, Upload, Search, Filter, Wrench, Truck } from "lucide-react";

interface Material {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  cost: number;
  supplier: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  rate: number;
  unit: string;
  provider: string;
}

export const MaterialsAndServices = () => {
  const [materials] = useState<Material[]>([
    {
      id: '1',
      name: '2x4 Lumber',
      category: 'Wood',
      quantity: 150,
      unit: 'pieces',
      cost: 8.50,
      supplier: 'ABC Lumber Co.',
      status: 'in-stock'
    },
    {
      id: '2',
      name: 'Concrete Mix',
      category: 'Concrete',
      quantity: 25,
      unit: 'bags',
      cost: 12.00,
      supplier: 'City Building Supply',
      status: 'in-stock'
    },
    {
      id: '3',
      name: 'Roofing Shingles',
      category: 'Roofing',
      quantity: 5,
      unit: 'bundles',
      cost: 89.99,
      supplier: 'Roof Masters',
      status: 'low-stock'
    }
  ]);

  const [services] = useState<Service[]>([
    {
      id: '1',
      name: 'Electrical Installation',
      category: 'Electrical',
      description: 'Professional electrical work and installations',
      rate: 85.00,
      unit: 'hour',
      provider: 'Elite Electric'
    },
    {
      id: '2',
      name: 'Plumbing Services',
      category: 'Plumbing',
      description: 'Complete plumbing services and repairs',
      rate: 75.00,
      unit: 'hour',
      provider: 'Pro Plumbing'
    }
  ]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'in-stock': { color: 'bg-green-100 text-green-800', label: 'In Stock' },
      'low-stock': { color: 'bg-yellow-100 text-yellow-800', label: 'Low Stock' },
      'out-of-stock': { color: 'bg-red-100 text-red-800', label: 'Out of Stock' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  const handleImport = () => {
    // Import functionality would be implemented here
    console.log('Import materials/services data');
  };

  const handleExport = () => {
    // Export functionality would be implemented here
    console.log('Export materials/services data');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Materials & Services</h1>
          <p className="text-muted-foreground">Manage inventory, materials, and service providers</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleImport}>
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </div>
      </div>

      <Tabs defaultValue="materials" className="space-y-4">
        <TabsList>
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="materials" className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search materials..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Items</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{materials.length}</div>
                <p className="text-xs text-muted-foreground">Materials in inventory</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {materials.filter(m => m.status === 'low-stock').length}
                </div>
                <p className="text-xs text-muted-foreground">Need restocking</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${materials.reduce((total, material) => total + (material.quantity * material.cost), 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">Inventory value</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Materials Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {materials.map((material) => (
                  <div key={material.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Package className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{material.name}</h3>
                        <p className="text-sm text-muted-foreground">{material.category}</p>
                        <p className="text-sm text-muted-foreground">
                          {material.quantity} {material.unit} • ${material.cost} each
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {getStatusBadge(material.status)}
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                Service Providers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {services.map((service) => (
                  <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Wrench className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                        <p className="text-sm text-muted-foreground">
                          ${service.rate} per {service.unit} • {service.provider}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Contact
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Supplier Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Supplier management system will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Inventory Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start">
                  <Package className="mr-2 h-4 w-4" />
                  Automatic Reorder Points
                </Button>
                <Button className="w-full justify-start">
                  <Package className="mr-2 h-4 w-4" />
                  Cost Analysis Reports
                </Button>
                <Button className="w-full justify-start">
                  <Package className="mr-2 h-4 w-4" />
                  Vendor Performance Tracking
                </Button>
                <Button className="w-full justify-start">
                  <Package className="mr-2 h-4 w-4" />
                  Inventory Forecasting
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Import/Export Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Import Materials Data</Label>
                  <div className="flex gap-2 mt-2">
                    <Input type="file" accept=".csv,.xlsx" />
                    <Button onClick={handleImport}>Import</Button>
                  </div>
                </div>
                <div>
                  <Label>Export Current Inventory</Label>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" onClick={handleExport} className="flex-1">
                      Export as CSV
                    </Button>
                    <Button variant="outline" onClick={handleExport} className="flex-1">
                      Export as Excel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
