
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { businessDataManager, type Material } from '../utils/businessDataManager';
import { Package, Plus, Search, AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export const MaterialInventory = () => {
  const { toast } = useToast();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    name: '',
    description: '',
    sku: '',
    category: '',
    supplier: '',
    cost: 0,
    sellingPrice: 0,
    quantityInStock: 0,
    reorderPoint: 10,
    unit: '',
    location: ''
  });

  const categories = ['Plumbing', 'Electrical', 'HVAC', 'Flooring', 'Roofing', 'Hardware', 'Safety', 'Tools', 'Other'];

  useEffect(() => {
    loadMaterials();
  }, []);

  const loadMaterials = () => {
    const data = businessDataManager.getAllMaterials();
    setMaterials(data);
  };

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || material.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const handleCreateMaterial = () => {
    if (!newMaterial.name || !newMaterial.sku || !newMaterial.category) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    businessDataManager.createMaterial({
      ...newMaterial,
      lastOrderDate: new Date().toISOString().split('T')[0]
    });

    loadMaterials();
    setShowCreateDialog(false);
    setNewMaterial({
      name: '',
      description: '',
      sku: '',
      category: '',
      supplier: '',
      cost: 0,
      sellingPrice: 0,
      quantityInStock: 0,
      reorderPoint: 10,
      unit: '',
      location: ''
    });

    toast({
      title: "Material Added",
      description: "New material has been added to inventory"
    });
  };

  const handleStockUpdate = (materialId: string, newQuantity: number) => {
    const material = materials.find(m => m.id === materialId);
    if (!material) return;

    const updatedMaterial = {
      ...material,
      quantityInStock: newQuantity
    };

    businessDataManager.saveMaterial(updatedMaterial);
    loadMaterials();

    toast({
      title: "Stock Updated",
      description: `${material.name} stock updated to ${newQuantity} ${material.unit}`
    });
  };

  const getStockStatus = (material: Material) => {
    if (material.quantityInStock === 0) {
      return { status: 'out-of-stock', color: 'bg-red-100 text-red-800', icon: AlertTriangle };
    } else if (material.quantityInStock <= material.reorderPoint) {
      return { status: 'low-stock', color: 'bg-yellow-100 text-yellow-800', icon: TrendingDown };
    } else {
      return { status: 'in-stock', color: 'bg-green-100 text-green-800', icon: TrendingUp };
    }
  };

  const lowStockItems = materials.filter(m => m.quantityInStock <= m.reorderPoint);
  const outOfStockItems = materials.filter(m => m.quantityInStock === 0);
  const totalValue = materials.reduce((sum, m) => sum + (m.quantityInStock * m.cost), 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Material Inventory</h2>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Material
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Material</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={newMaterial.name}
                  onChange={(e) => setNewMaterial(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Material name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sku">SKU *</Label>
                <Input
                  id="sku"
                  value={newMaterial.sku}
                  onChange={(e) => setNewMaterial(prev => ({ ...prev, sku: e.target.value }))}
                  placeholder="Stock keeping unit"
                />
              </div>

              <div className="space-y-2 col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newMaterial.description}
                  onChange={(e) => setNewMaterial(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Material description"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={newMaterial.category} onValueChange={(value) => setNewMaterial(prev => ({ ...prev, category: value }))}>
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
                <Label htmlFor="supplier">Supplier</Label>
                <Input
                  id="supplier"
                  value={newMaterial.supplier}
                  onChange={(e) => setNewMaterial(prev => ({ ...prev, supplier: e.target.value }))}
                  placeholder="Supplier name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cost">Cost</Label>
                <Input
                  id="cost"
                  type="number"
                  step="0.01"
                  value={newMaterial.cost}
                  onChange={(e) => setNewMaterial(prev => ({ ...prev, cost: parseFloat(e.target.value) || 0 }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sellingPrice">Selling Price</Label>
                <Input
                  id="sellingPrice"
                  type="number"
                  step="0.01"
                  value={newMaterial.sellingPrice}
                  onChange={(e) => setNewMaterial(prev => ({ ...prev, sellingPrice: parseFloat(e.target.value) || 0 }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Initial Stock</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={newMaterial.quantityInStock}
                  onChange={(e) => setNewMaterial(prev => ({ ...prev, quantityInStock: parseInt(e.target.value) || 0 }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reorderPoint">Reorder Point</Label>
                <Input
                  id="reorderPoint"
                  type="number"
                  value={newMaterial.reorderPoint}
                  onChange={(e) => setNewMaterial(prev => ({ ...prev, reorderPoint: parseInt(e.target.value) || 0 }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Input
                  id="unit"
                  value={newMaterial.unit}
                  onChange={(e) => setNewMaterial(prev => ({ ...prev, unit: e.target.value }))}
                  placeholder="e.g., pieces, feet, lbs"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newMaterial.location}
                  onChange={(e) => setNewMaterial(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Storage location"
                />
              </div>

              <div className="col-span-2 flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateMaterial}>
                  Add Material
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{materials.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
            <TrendingDown className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{lowStockItems.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{outOfStockItems.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalValue.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Materials List */}
      <Card>
        <CardHeader>
          <CardTitle>Materials ({filteredMaterials.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredMaterials.map((material) => {
              const stockInfo = getStockStatus(material);
              const StockIcon = stockInfo.icon;
              
              return (
                <div key={material.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{material.name}</h3>
                        <Badge className={stockInfo.color}>
                          <StockIcon className="h-3 w-3 mr-1" />
                          {stockInfo.status.replace('-', ' ')}
                        </Badge>
                        <Badge variant="outline">{material.category}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div>
                          <span className="font-medium">SKU:</span> {material.sku}
                        </div>
                        <div>
                          <span className="font-medium">Supplier:</span> {material.supplier}
                        </div>
                        <div>
                          <span className="font-medium">Location:</span> {material.location}
                        </div>
                        <div>
                          <span className="font-medium">Unit:</span> {material.unit}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mt-2">
                        <div>
                          <span className="font-medium">Current Stock:</span>
                          <span className={`ml-1 font-bold ${material.quantityInStock <= material.reorderPoint ? 'text-red-600' : 'text-green-600'}`}>
                            {material.quantityInStock} {material.unit}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium">Reorder Point:</span> {material.reorderPoint} {material.unit}
                        </div>
                        <div>
                          <span className="font-medium">Cost:</span> ${material.cost.toFixed(2)}
                        </div>
                        <div>
                          <span className="font-medium">Selling Price:</span> ${material.sellingPrice.toFixed(2)}
                        </div>
                      </div>
                      
                      {material.description && (
                        <p className="text-sm text-muted-foreground mt-2">{material.description}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          className="w-20"
                          defaultValue={material.quantityInStock}
                          onBlur={(e) => {
                            const newQuantity = parseInt(e.target.value) || 0;
                            if (newQuantity !== material.quantityInStock) {
                              handleStockUpdate(material.id, newQuantity);
                            }
                          }}
                        />
                        <span className="text-sm text-muted-foreground">{material.unit}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredMaterials.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No materials found matching your criteria.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
