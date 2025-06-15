import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Users, Calendar, Clock, MapPin, Wrench, Truck, FileText, Import, Export } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Resource {
  id: string;
  name: string;
  type: 'technician' | 'equipment' | 'vehicle';
  status: 'available' | 'busy' | 'maintenance';
  currentAssignment?: string;
  skills?: string[];
  location?: string;
  utilization: number;
}

interface Material {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  cost: number;
  supplier: string;
  location: string;
  reorderLevel: number;
}

interface Service {
  id: string;
  name: string;
  category: string;
  hourlyRate: number;
  provider: string;
  description: string;
  availability: 'available' | 'limited' | 'unavailable';
}

interface Assignment {
  id: string;
  projectName: string;
  customer: string;
  date: string;
  timeSlot: string;
  resources: string[];
  status: 'scheduled' | 'in-progress' | 'completed';
}

const mockResources: Resource[] = [
  {
    id: '1',
    name: 'Mike Johnson',
    type: 'technician',
    status: 'busy',
    currentAssignment: 'Kitchen Renovation',
    skills: ['Plumbing', 'Electrical', 'Carpentry'],
    location: 'Downtown Area',
    utilization: 85
  },
  {
    id: '2',
    name: 'Sarah Davis',
    type: 'technician',
    status: 'available',
    skills: ['Roofing', 'Insulation', 'General'],
    location: 'North Side',
    utilization: 72
  }
];

const mockMaterials: Material[] = [
  {
    id: '1',
    name: 'Lumber 2x4x8',
    category: 'Wood',
    quantity: 50,
    unit: 'pieces',
    cost: 8.50,
    supplier: 'Home Depot',
    location: 'Warehouse A',
    reorderLevel: 20
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
    reorderLevel: 10
  }
];

const mockServices: Service[] = [
  {
    id: '1',
    name: 'Electrical Installation',
    category: 'Electrical',
    hourlyRate: 85,
    provider: 'ABC Electric',
    description: 'Licensed electrical contractor services',
    availability: 'available'
  },
  {
    id: '2',
    name: 'Plumbing Repair',
    category: 'Plumbing',
    hourlyRate: 75,
    provider: 'Quick Plumb',
    description: 'Emergency and scheduled plumbing services',
    availability: 'limited'
  }
];

const mockAssignments: Assignment[] = [
  {
    id: '1',
    projectName: 'Kitchen Renovation',
    customer: 'John Smith',
    date: '2024-12-18',
    timeSlot: '09:00 - 17:00',
    resources: ['Mike Johnson', 'Service Van #1'],
    status: 'scheduled'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'available': return 'bg-green-100 text-green-800';
    case 'busy': return 'bg-yellow-100 text-yellow-800';
    case 'maintenance': return 'bg-red-100 text-red-800';
    case 'limited': return 'bg-orange-100 text-orange-800';
    case 'unavailable': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getResourceIcon = (type: string) => {
  switch (type) {
    case 'technician': return <Users className="h-4 w-4" />;
    case 'equipment': return <Wrench className="h-4 w-4" />;
    case 'vehicle': return <Truck className="h-4 w-4" />;
    default: return <Users className="h-4 w-4" />;
  }
};

export const ResourceAllocation = () => {
  const { toast } = useToast();
  const [resources] = useState<Resource[]>(mockResources);
  const [materials, setMaterials] = useState<Material[]>(mockMaterials);
  const [services, setServices] = useState<Service[]>(mockServices);
  const [assignments] = useState<Assignment[]>(mockAssignments);
  const [selectedDate, setSelectedDate] = useState('2024-12-18');

  const handleExportMaterials = () => {
    const csvContent = [
      ['ID', 'Name', 'Category', 'Quantity', 'Unit', 'Cost', 'Supplier', 'Location', 'Reorder Level'],
      ...materials.map(m => [m.id, m.name, m.category, m.quantity, m.unit, m.cost, m.supplier, m.location, m.reorderLevel])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'materials.csv';
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Successful",
      description: "Materials data has been exported to CSV."
    });
  };

  const handleExportServices = () => {
    const csvContent = [
      ['ID', 'Name', 'Category', 'Hourly Rate', 'Provider', 'Description', 'Availability'],
      ...services.map(s => [s.id, s.name, s.category, s.hourlyRate, s.provider, s.description, s.availability])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'services.csv';
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Successful",
      description: "Services data has been exported to CSV."
    });
  };

  const handleImportMaterials = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n');
      const headers = lines[0].split(',');
      
      const newMaterials = lines.slice(1).filter(line => line.trim()).map((line, index) => {
        const values = line.split(',');
        return {
          id: `imported-${Date.now()}-${index}`,
          name: values[1] || '',
          category: values[2] || '',
          quantity: parseInt(values[3]) || 0,
          unit: values[4] || '',
          cost: parseFloat(values[5]) || 0,
          supplier: values[6] || '',
          location: values[7] || '',
          reorderLevel: parseInt(values[8]) || 0
        };
      });

      setMaterials(prev => [...prev, ...newMaterials]);
      
      toast({
        title: "Import Successful",
        description: `${newMaterials.length} materials imported from CSV.`
      });
    };
    reader.readAsText(file);
  };

  const handleImportServices = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n');
      
      const newServices = lines.slice(1).filter(line => line.trim()).map((line, index) => {
        const values = line.split(',');
        return {
          id: `imported-${Date.now()}-${index}`,
          name: values[1] || '',
          category: values[2] || '',
          hourlyRate: parseFloat(values[3]) || 0,
          provider: values[4] || '',
          description: values[5] || '',
          availability: (values[6] as 'available' | 'limited' | 'unavailable') || 'available'
        };
      });

      setServices(prev => [...prev, ...newServices]);
      
      toast({
        title: "Import Successful",
        description: `${newServices.length} services imported from CSV.`
      });
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Resource Allocation</h2>
        <div className="flex gap-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border rounded-md"
          />
          <Button>Optimize Schedule</Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Resource Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {resources.map((resource) => (
                      <div key={resource.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            {getResourceIcon(resource.type)}
                            <div>
                              <h4 className="font-medium">{resource.name}</h4>
                              <p className="text-sm text-muted-foreground capitalize">{resource.type}</p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(resource.status)}>
                            {resource.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          {resource.currentAssignment && (
                            <div>
                              <span className="text-muted-foreground">Current Assignment:</span>
                              <span className="ml-2 font-medium">{resource.currentAssignment}</span>
                            </div>
                          )}
                          {resource.location && (
                            <div>
                              <span className="text-muted-foreground">Location:</span>
                              <span className="ml-2">{resource.location}</span>
                            </div>
                          )}
                          <div>
                            <span className="text-muted-foreground">Utilization:</span>
                            <span className="ml-2 font-medium">{resource.utilization}%</span>
                          </div>
                        </div>
                        
                        {resource.skills && (
                          <div className="mt-3">
                            <span className="text-sm text-muted-foreground">Skills: </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {resource.skills.map((skill) => (
                                <Badge key={skill} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="mt-3">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${resource.utilization}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Resource Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Technicians</span>
                      <span className="font-semibold">
                        {resources.filter(r => r.type === 'technician').length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Available</span>
                      <span className="font-semibold text-green-600">
                        {resources.filter(r => r.status === 'available').length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Busy</span>
                      <span className="font-semibold text-yellow-600">
                        {resources.filter(r => r.status === 'busy').length}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Resource Assignments - {new Date(selectedDate).toLocaleDateString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <div key={assignment.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium">{assignment.projectName}</h4>
                        <p className="text-sm text-muted-foreground">{assignment.customer}</p>
                      </div>
                      <Badge variant="outline">{assignment.status}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        {assignment.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        {assignment.timeSlot}
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-sm text-muted-foreground">Assigned Resources:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {assignment.resources.map((resource) => (
                          <Badge key={resource} variant="secondary">
                            {resource}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Material Inventory
                <div className="flex gap-2">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleImportMaterials}
                    className="hidden"
                    id="materials-import"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('materials-import')?.click()}
                  >
                    <Import className="h-4 w-4 mr-2" />
                    Import CSV
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleExportMaterials}>
                    <Export className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {materials.map((material) => (
                  <div key={material.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{material.name}</h4>
                        <p className="text-sm text-muted-foreground">{material.category}</p>
                      </div>
                      <Badge variant={material.quantity <= material.reorderLevel ? "destructive" : "secondary"}>
                        {material.quantity <= material.reorderLevel ? "Low Stock" : "In Stock"}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Quantity:</span>
                        <span className="ml-2 font-medium">{material.quantity} {material.unit}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Cost:</span>
                        <span className="ml-2 font-medium">${material.cost}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Supplier:</span>
                        <span className="ml-2">{material.supplier}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Location:</span>
                        <span className="ml-2">{material.location}</span>
                      </div>
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
              <CardTitle className="flex items-center justify-between">
                Service Providers
                <div className="flex gap-2">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleImportServices}
                    className="hidden"
                    id="services-import"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('services-import')?.click()}
                  >
                    <Import className="h-4 w-4 mr-2" />
                    Import CSV
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleExportServices}>
                    <Export className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {services.map((service) => (
                  <div key={service.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{service.name}</h4>
                        <p className="text-sm text-muted-foreground">{service.category}</p>
                      </div>
                      <Badge className={getStatusColor(service.availability)}>
                        {service.availability}
                      </Badge>
                    </div>
                    
                    <p className="text-sm mb-3">{service.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Hourly Rate:</span>
                        <span className="ml-2 font-medium">${service.hourlyRate}/hr</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Provider:</span>
                        <span className="ml-2">{service.provider}</span>
                      </div>
                    </div>
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
