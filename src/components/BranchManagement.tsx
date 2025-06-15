
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MapPin, Plus, Edit, Trash2, Building2, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Branch {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  manager: string;
  isHeadquarters: boolean;
  status: 'active' | 'inactive';
}

export const BranchManagement = () => {
  const { toast } = useToast();
  const [branches, setBranches] = useState<Branch[]>([
    {
      id: '1',
      name: 'Main Office',
      address: '123 Business St',
      city: 'Denver',
      state: 'CO',
      zipCode: '80202',
      phone: '(303) 555-0100',
      email: 'main@company.com',
      manager: 'John Smith',
      isHeadquarters: true,
      status: 'active'
    },
    {
      id: '2',
      name: 'North Branch',
      address: '456 North Ave',
      city: 'Boulder',
      state: 'CO',
      zipCode: '80301',
      phone: '(303) 555-0200',
      email: 'north@company.com',
      manager: 'Sarah Johnson',
      isHeadquarters: false,
      status: 'active'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [formData, setFormData] = useState<Partial<Branch>>({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
    manager: '',
    isHeadquarters: false,
    status: 'active'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingBranch) {
      setBranches(prev => prev.map(branch => 
        branch.id === editingBranch.id 
          ? { ...branch, ...formData } as Branch
          : branch
      ));
      toast({
        title: "Branch Updated",
        description: "Branch information has been updated successfully.",
      });
    } else {
      const newBranch: Branch = {
        id: Date.now().toString(),
        ...formData as Branch
      };
      setBranches(prev => [...prev, newBranch]);
      toast({
        title: "Branch Added",
        description: "New branch has been added successfully.",
      });
    }
    
    setIsDialogOpen(false);
    setEditingBranch(null);
    setFormData({
      name: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      phone: '',
      email: '',
      manager: '',
      isHeadquarters: false,
      status: 'active'
    });
  };

  const handleEdit = (branch: Branch) => {
    setEditingBranch(branch);
    setFormData(branch);
    setIsDialogOpen(true);
  };

  const handleDelete = (branchId: string) => {
    setBranches(prev => prev.filter(branch => branch.id !== branchId));
    toast({
      title: "Branch Deleted",
      description: "Branch has been removed successfully.",
      variant: "destructive"
    });
  };

  const activeBranches = branches.filter(branch => branch.status === 'active');

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Branch Management</h2>
          <p className="text-muted-foreground">Manage your company's office locations and branches</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingBranch(null);
              setFormData({
                name: '',
                address: '',
                city: '',
                state: '',
                zipCode: '',
                phone: '',
                email: '',
                manager: '',
                isHeadquarters: false,
                status: 'active'
              });
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Branch
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingBranch ? 'Edit Branch' : 'Add New Branch'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Branch Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Main Office"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="manager">Manager</Label>
                  <Input
                    id="manager"
                    value={formData.manager}
                    onChange={(e) => setFormData(prev => ({ ...prev, manager: e.target.value }))}
                    placeholder="John Smith"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="123 Business Street"
                  required
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="Denver"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                    placeholder="CO"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
                    placeholder="80202"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="(303) 555-0100"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="branch@company.com"
                    required
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isHeadquarters"
                  checked={formData.isHeadquarters}
                  onChange={(e) => setFormData(prev => ({ ...prev, isHeadquarters: e.target.checked }))}
                  className="rounded"
                />
                <Label htmlFor="isHeadquarters">Mark as Headquarters</Label>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingBranch ? 'Update Branch' : 'Add Branch'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeBranches.map((branch) => (
          <Card key={branch.id} className={`relative ${branch.isHeadquarters ? 'ring-2 ring-primary' : ''}`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{branch.name}</CardTitle>
                </div>
                <div className="flex items-center gap-1">
                  {branch.isHeadquarters && (
                    <Badge variant="default" className="text-xs">HQ</Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(branch)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  {!branch.isHeadquarters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(branch.id)}
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="text-sm">
                  <div>{branch.address}</div>
                  <div>{branch.city}, {branch.state} {branch.zipCode}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{branch.phone}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{branch.email}</span>
              </div>
              
              <div className="pt-2 border-t">
                <div className="text-sm text-muted-foreground">Manager</div>
                <div className="font-medium">{branch.manager}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {activeBranches.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No branches found</h3>
            <p className="text-muted-foreground mb-4">Get started by adding your first branch or office location.</p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add First Branch
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
