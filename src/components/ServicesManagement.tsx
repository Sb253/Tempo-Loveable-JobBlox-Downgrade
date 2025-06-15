
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, DollarSign, Clock, Users } from "lucide-react";

interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  basePrice: number;
  duration: string;
  requiredTeamSize: number;
  status: 'active' | 'inactive';
}

export const ServicesManagement = () => {
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      name: 'Roofing Installation',
      description: 'Complete roof installation and replacement services',
      category: 'Roofing',
      basePrice: 15000,
      duration: '3-5 days',
      requiredTeamSize: 4,
      status: 'active'
    },
    {
      id: '2',
      name: 'Siding Repair',
      description: 'Siding repair and maintenance services',
      category: 'Siding',
      basePrice: 3500,
      duration: '1-2 days',
      requiredTeamSize: 2,
      status: 'active'
    },
    {
      id: '3',
      name: 'Deck Construction',
      description: 'Custom deck building and installation',
      category: 'Deck',
      basePrice: 8000,
      duration: '2-3 days',
      requiredTeamSize: 3,
      status: 'active'
    },
    {
      id: '4',
      name: 'Patio Cover Installation',
      description: 'Patio cover design and installation',
      category: 'Patio Cover',
      basePrice: 5500,
      duration: '1-2 days',
      requiredTeamSize: 2,
      status: 'active'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  const categories = ['Roofing', 'Siding', 'Deck', 'Patio Cover', 'General'];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">Services Management</h2>
          <p className="text-muted-foreground">Manage your construction services and pricing</p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Service</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Service Name</label>
                <Input placeholder="Enter service name" />
              </div>
              <div>
                <label className="text-sm font-medium">Category</label>
                <select className="w-full p-2 border rounded-md">
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Base Price ($)</label>
                <Input type="number" placeholder="0.00" />
              </div>
              <div>
                <label className="text-sm font-medium">Duration</label>
                <Input placeholder="e.g., 1-2 days" />
              </div>
              <div>
                <label className="text-sm font-medium">Team Size Required</label>
                <Input type="number" placeholder="Number of team members" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea placeholder="Service description" />
            </div>
            <div className="flex gap-2">
              <Button>Save Service</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {services.map((service) => (
          <Card key={service.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <Badge variant="outline" className="mt-2">{service.category}</Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{service.description}</p>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span>${service.basePrice.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span>{service.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-purple-600" />
                  <span>{service.requiredTeamSize} people</span>
                </div>
              </div>
              <Badge variant={service.status === 'active' ? 'default' : 'secondary'}>
                {service.status}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
