
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MapPin, Plus, Edit, Trash2, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  coordinates: [number, number];
  skills: string[];
  availability: 'available' | 'busy' | 'offline';
  workload: number;
}

export const EmployeeLocationManager = () => {
  const { toast } = useToast();
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: '1',
      name: 'Mike Johnson',
      email: 'mike@company.com',
      phone: '(555) 0101',
      address: '123 Worker St, Denver, CO',
      coordinates: [-104.9903, 39.7392],
      skills: ['plumbing', 'electrical', 'general'],
      availability: 'available',
      workload: 45
    },
    {
      id: '2',
      name: 'Sarah Davis',
      email: 'sarah@company.com',
      phone: '(555) 0102',
      address: '456 Tech Ave, Boulder, CO',
      coordinates: [-105.2705, 40.0150],
      skills: ['roofing', 'carpentry', 'painting'],
      availability: 'available',
      workload: 30
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState<Partial<Employee>>({
    name: '',
    email: '',
    phone: '',
    address: '',
    coordinates: [0, 0],
    skills: [],
    availability: 'available',
    workload: 0
  });

  const availableSkills = [
    'plumbing', 'electrical', 'roofing', 'carpentry', 'painting', 
    'hvac', 'general', 'maintenance', 'flooring', 'drywall'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingEmployee) {
      setEmployees(prev => prev.map(emp => 
        emp.id === editingEmployee.id 
          ? { ...emp, ...formData } as Employee
          : emp
      ));
      toast({
        title: "Employee Updated",
        description: "Employee information has been updated successfully.",
      });
    } else {
      const newEmployee: Employee = {
        id: Date.now().toString(),
        ...formData as Employee
      };
      setEmployees(prev => [...prev, newEmployee]);
      toast({
        title: "Employee Added",
        description: "New employee has been added successfully.",
      });
    }
    
    setIsDialogOpen(false);
    setEditingEmployee(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      coordinates: [0, 0],
      skills: [],
      availability: 'available',
      workload: 0
    });
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setFormData(employee);
    setIsDialogOpen(true);
  };

  const handleDelete = (employeeId: string) => {
    setEmployees(prev => prev.filter(emp => emp.id !== employeeId));
    toast({
      title: "Employee Removed",
      description: "Employee has been removed successfully.",
      variant: "destructive"
    });
  };

  const toggleSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills?.includes(skill) 
        ? prev.skills.filter(s => s !== skill)
        : [...(prev.skills || []), skill]
    }));
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Employee Location Manager</h2>
          <p className="text-muted-foreground">Manage employee addresses and skills for radius-based assignments</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingEmployee(null);
              resetForm();
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="John Doe"
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
                    placeholder="john@company.com"
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
                    placeholder="(555) 0123"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="availability">Availability</Label>
                  <select
                    id="availability"
                    value={formData.availability}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      availability: e.target.value as 'available' | 'busy' | 'offline'
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="available">Available</option>
                    <option value="busy">Busy</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="123 Main Street, City, State"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input
                    id="latitude"
                    type="number"
                    step="any"
                    value={formData.coordinates?.[1] || ''}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      coordinates: [prev.coordinates?.[0] || 0, parseFloat(e.target.value) || 0]
                    }))}
                    placeholder="39.7392"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input
                    id="longitude"
                    type="number"
                    step="any"
                    value={formData.coordinates?.[0] || ''}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      coordinates: [parseFloat(e.target.value) || 0, prev.coordinates?.[1] || 0]
                    }))}
                    placeholder="-104.9903"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Skills</Label>
                <div className="grid grid-cols-3 gap-2">
                  {availableSkills.map(skill => (
                    <div key={skill} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={skill}
                        checked={formData.skills?.includes(skill) || false}
                        onChange={() => toggleSkill(skill)}
                        className="rounded"
                      />
                      <Label htmlFor={skill} className="text-sm capitalize">{skill}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingEmployee ? 'Update Employee' : 'Add Employee'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((employee) => (
          <Card key={employee.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{employee.name}</CardTitle>
                </div>
                <div className="flex items-center gap-1">
                  <Badge className={getAvailabilityColor(employee.availability)}>
                    {employee.availability}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(employee)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(employee.id)}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="text-sm">
                  <div>{employee.address}</div>
                  <div className="text-muted-foreground">
                    {employee.coordinates[1]}, {employee.coordinates[0]}
                  </div>
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium mb-2">Skills:</div>
                <div className="flex flex-wrap gap-1">
                  {employee.skills.map(skill => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Workload:</span>
                  <span>{employee.workload}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      employee.workload > 80 ? 'bg-red-500' : 
                      employee.workload > 60 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${employee.workload}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="pt-2 border-t text-sm text-muted-foreground">
                <div>Email: {employee.email}</div>
                <div>Phone: {employee.phone}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
