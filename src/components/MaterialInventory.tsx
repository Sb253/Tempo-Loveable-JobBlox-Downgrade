
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Package, DollarSign, TrendingUp, AlertTriangle, Plus, Minus, ShoppingCart } from "lucide-react";

interface Material {
  id: string;
  name: string;
  category: string;
  unit: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unitCost: number;
  supplier: string;
  location: string;
  lastOrdered: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'on-order';
}

interface CostEntry {
  id: string;
  materialId: string;
  materialName: string;
  jobId: string;
  jobName: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  date: string;
  type: 'used' | 'wasted' | 'returned';
}

export const MaterialInventory = () => {
  const { toast } = useToast();
  const [materials, setMaterials] = useState<Material[]>([
    {
      id: '1',
      name: 'Portland Cement',
      category: 'Concrete',
      unit: 'bags',
      currentStock: 45,
      minStock: 20,
      maxStock: 100,
      unitCost: 12.50,
      supplier: 'BuildMart Supply',
      location: 'Warehouse A',
      lastOrdered: '2024-12-01',
      status: 'in-stock'
    },
    {
      id: '2',
      name: '2x4 Lumber (8ft)',
      category: 'Lumber',
      unit: 'pieces',
      currentStock: 8,
      minStock: 15,
      maxStock: 200,
      unitCost: 4.25,
      supplier: 'Timber Direct',
      location: 'Yard Storage',
      lastOrdered: '2024-11-28',
      status: 'low-stock'
    },
    {
      id: '3',
      name: 'Rebar #4',
      category: 'Steel',
      unit: 'feet',
      currentStock: 0,
      minStock: 500,
      maxStock: 2000,
      unitCost: 0.85,
      supplier: 'Steel Solutions',
      location: 'Warehouse B',
      lastOrdered: '2024-12-10',
      status: 'out-of-stock'
    },
    {
      id: '4',
      name: 'Roofing Shingles',
      category: 'Roofing',
      unit: 'bundles',
      currentStock: 25,
      minStock: 10,
      maxStock: 50,
      unitCost: 35.00,
      supplier: 'Roof Pro Supply',
      location: 'Warehouse A',
      lastOrdered: '2024-12-05',
      status: 'in-stock'
    }
  ]);

  const [costEntries, setCostEntries] = useState<CostEntry[]>([
    {
      id: '1',
      materialId: '1',
      materialName: 'Portland Cement',
      jobId: 'job-1',
      jobName: 'Foundation - Smith House',
      quantity: 15,
      unitCost: 12.50,
      totalCost: 187.50,
      date: '2024-12-15',
      type: 'used'
    },
    {
      id: '2',
      materialId: '2',
      materialName: '2x4 Lumber (8ft)',
      jobId: 'job-2',
      jobName: 'Framing - Johnson Garage',
      quantity: 30,
      unitCost: 4.25,
      totalCost: 127.50,
      date: '2024-12-14',
      type: 'used'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': return 'bg-green-100 text-green-800';
      case 'low-stock': return 'bg-yellow-100 text-yellow-800';
      case 'out-of-stock': return 'bg-red-100 text-red-800';
      case 'on-order': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'used': return 'bg-blue-100 text-blue-800';
      case 'wasted': return 'bg-red-100 text-red-800';
      case 'returned': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAdjustStock = (materialId: string, adjustment: number) => {
    setMaterials(prev => prev.map(material => {
      if (material.id === materialId) {
        const newStock = Math.max(0, material.currentStock + adjustment);
        let newStatus: Material['status'] = 'in-stock';
        
        if (newStock === 0) newStatus = 'out-of-stock';
        else if (newStock <= material.minStock) newStatus = 'low-stock';
        
        return { ...material, currentStock: newStock, status: newStatus };
      }
      return material;
    }));

    toast({
      title: "Stock Updated",
      description: `Inventory has been ${adjustment > 0 ? 'increased' : 'decreased'}.`,
    });
  };

  const handleReorderMaterial = (materialId: string) => {
    setMaterials(prev => prev.map(material => 
      material.id === materialId ? { ...material, status: 'on-order' as const } : material
    ));
    
    toast({
      title: "Reorder Initiated",
      description: "Material has been added to the purchase order.",
    });
  };

  const totalInventoryValue = materials.reduce((sum, material) => 
    sum + (material.currentStock * material.unitCost), 0
  );
  
  const lowStockCount = materials.filter(m => m.status === 'low-stock' || m.status === 'out-of-stock').length;
  
  const monthlySpend = costEntries
    .filter(entry => entry.type === 'used')
    .reduce((sum, entry) => sum + entry.totalCost, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Material Cost Tracking & Inventory</h2>
        <div className="flex gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Material
          </Button>
          <Button variant="outline">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Purchase Order
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{materials.length}</p>
                <p className="text-sm text-muted-foreground">Total Materials</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">${totalInventoryValue.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Inventory Value</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{lowStockCount}</p>
                <p className="text-sm text-muted-foreground">Low Stock Alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">${monthlySpend.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Monthly Spend</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="inventory" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="costs">Cost Tracking</TabsTrigger>
          <TabsTrigger value="orders">Purchase Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4">
          {/* Low Stock Alerts */}
          {lowStockCount > 0 && (
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <AlertTriangle className="h-5 w-5" />
                  Low Stock Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {materials
                    .filter(material => material.status === 'low-stock' || material.status === 'out-of-stock')
                    .map((material) => (
                      <div key={material.id} className="flex items-center justify-between p-2 bg-white rounded border">
                        <span className="font-medium">{material.name}</span>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(material.status)}>
                            {material.currentStock} {material.unit}
                          </Badge>
                          <Button 
                            size="sm" 
                            onClick={() => handleReorderMaterial(material.id)}
                          >
                            Reorder
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Materials List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {materials.map((material) => (
              <Card key={material.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{material.name}</h3>
                      <p className="text-sm text-muted-foreground">{material.category}</p>
                    </div>
                    <Badge className={getStatusColor(material.status)}>
                      {material.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Current Stock</p>
                      <p className="font-medium">{material.currentStock} {material.unit}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Unit Cost</p>
                      <p className="font-medium">${material.unitCost}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Location</p>
                      <p className="font-medium">{material.location}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Supplier</p>
                      <p className="font-medium">{material.supplier}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAdjustStock(material.id, -1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAdjustStock(material.id, 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleReorderMaterial(material.id)}
                    >
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      Reorder
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="costs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Material Usage & Costs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {costEntries.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{entry.materialName}</h3>
                      <p className="text-sm text-muted-foreground">{entry.jobName}</p>
                      <p className="text-sm text-muted-foreground">
                        {entry.quantity} units × ${entry.unitCost} = ${entry.totalCost}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Badge className={getTypeColor(entry.type)}>
                        {entry.type}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{entry.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Cost Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Cost Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded">
                  <p className="text-2xl font-bold text-blue-600">
                    ${costEntries.filter(e => e.type === 'used').reduce((sum, e) => sum + e.totalCost, 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Materials Used</p>
                </div>
                <div className="text-center p-4 border rounded">
                  <p className="text-2xl font-bold text-red-600">
                    ${costEntries.filter(e => e.type === 'wasted').reduce((sum, e) => sum + e.totalCost, 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Materials Wasted</p>
                </div>
                <div className="text-center p-4 border rounded">
                  <p className="text-2xl font-bold text-green-600">
                    ${costEntries.filter(e => e.type === 'returned').reduce((sum, e) => sum + e.totalCost, 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Materials Returned</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Purchase Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {materials
                  .filter(material => material.status === 'on-order')
                  .map((material) => (
                    <div key={material.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{material.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Supplier: {material.supplier}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Order quantity: {material.maxStock - material.currentStock} {material.unit}
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <Badge className={getStatusColor(material.status)}>
                          On Order
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">
                          Est. ${((material.maxStock - material.currentStock) * material.unitCost).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                
                {materials.filter(m => m.status === 'on-order').length === 0 && (
                  <p className="text-center text-muted-foreground py-8">No pending purchase orders</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
