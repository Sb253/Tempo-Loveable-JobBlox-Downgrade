
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, Clock, DollarSign, MapPin, User, Wrench, Plus, Save, X } from "lucide-react";
import { format } from "date-fns";

interface Job {
  id: string;
  title: string;
  customer: string;
  description: string;
  address: string;
  scheduledDate: Date;
  scheduledTime: string;
  estimatedDuration: number;
  estimatedValue: number;
  priority: 'low' | 'medium' | 'high';
  jobType: 'inspection' | 'repair' | 'installation' | 'maintenance' | 'consultation';
  assignedTechnician: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  materials: string[];
  specialInstructions: string;
}

const jobTypes = [
  { value: 'inspection', label: 'Inspection' },
  { value: 'repair', label: 'Repair' },
  { value: 'installation', label: 'Installation' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'consultation', label: 'Consultation' }
];

const priorities = [
  { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'high', label: 'High', color: 'bg-red-100 text-red-800' }
];

const technicians = [
  'Mike Johnson',
  'Sarah Davis',
  'Tom Wilson',
  'Alex Chen',
  'Lisa Rodriguez',
  'David Brown'
];

const customers = [
  'John Smith',
  'ABC Construction Inc.',
  'Sarah Johnson',
  'City Office Building',
  'Mike Wilson',
  'Emma Davis'
];

export const AddJobSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<Job>>({
    title: '',
    customer: '',
    description: '',
    address: '',
    scheduledDate: new Date(),
    scheduledTime: '09:00',
    estimatedDuration: 2,
    estimatedValue: 0,
    priority: 'medium',
    jobType: 'inspection',
    assignedTechnician: '',
    status: 'scheduled',
    materials: [],
    specialInstructions: ''
  });

  const [materialInput, setMaterialInput] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  const handleInputChange = (field: keyof Job, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addMaterial = () => {
    if (materialInput.trim()) {
      setFormData(prev => ({
        ...prev,
        materials: [...(prev.materials || []), materialInput.trim()]
      }));
      setMaterialInput('');
    }
  };

  const removeMaterial = (index: number) => {
    setFormData(prev => ({
      ...prev,
      materials: prev.materials?.filter((_, i) => i !== index) || []
    }));
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.customer || !formData.assignedTechnician) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const newJob: Job = {
      id: Date.now().toString(),
      ...formData as Job
    };

    toast({
      title: "Job Created Successfully",
      description: `${newJob.title} has been scheduled for ${format(newJob.scheduledDate, 'PPP')} at ${newJob.scheduledTime}`,
    });

    // Reset form
    setFormData({
      title: '',
      customer: '',
      description: '',
      address: '',
      scheduledDate: new Date(),
      scheduledTime: '09:00',
      estimatedDuration: 2,
      estimatedValue: 0,
      priority: 'medium',
      jobType: 'inspection',
      assignedTechnician: '',
      status: 'scheduled',
      materials: [],
      specialInstructions: ''
    });
  };

  const clearForm = () => {
    setFormData({
      title: '',
      customer: '',
      description: '',
      address: '',
      scheduledDate: new Date(),
      scheduledTime: '09:00',
      estimatedDuration: 2,
      estimatedValue: 0,
      priority: 'medium',
      jobType: 'inspection',
      assignedTechnician: '',
      status: 'scheduled',
      materials: [],
      specialInstructions: ''
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Add New Job</h1>
          <p className="text-muted-foreground">Create and schedule a new job</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={clearForm}>
            <X className="h-4 w-4 mr-2" />
            Clear Form
          </Button>
          <Button onClick={handleSubmit}>
            <Save className="h-4 w-4 mr-2" />
            Create Job
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter job title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="customer">Customer *</Label>
              <Select value={formData.customer} onValueChange={(value) => handleInputChange('customer', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map(customer => (
                    <SelectItem key={customer} value={customer}>
                      {customer}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe the job details"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Job Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Enter job location"
              />
            </div>
          </CardContent>
        </Card>

        {/* Scheduling */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Scheduling
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Scheduled Date</Label>
              <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.scheduledDate ? format(formData.scheduledDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.scheduledDate}
                    onSelect={(date) => {
                      handleInputChange('scheduledDate', date);
                      setShowCalendar(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Scheduled Time</Label>
              <Input
                id="time"
                type="time"
                value={formData.scheduledTime}
                onChange={(e) => handleInputChange('scheduledTime', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Estimated Duration (hours)</Label>
              <Input
                id="duration"
                type="number"
                min="0.5"
                step="0.5"
                value={formData.estimatedDuration}
                onChange={(e) => handleInputChange('estimatedDuration', parseFloat(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="technician">Assigned Technician *</Label>
              <Select value={formData.assignedTechnician} onValueChange={(value) => handleInputChange('assignedTechnician', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select technician" />
                </SelectTrigger>
                <SelectContent>
                  {technicians.map(tech => (
                    <SelectItem key={tech} value={tech}>
                      {tech}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Job Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Job Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="jobType">Job Type</Label>
              <Select value={formData.jobType} onValueChange={(value) => handleInputChange('jobType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  {jobTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map(priority => (
                    <SelectItem key={priority.value} value={priority.value}>
                      <div className="flex items-center gap-2">
                        <Badge className={priority.color}>{priority.label}</Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimatedValue">Estimated Value ($)</Label>
              <Input
                id="estimatedValue"
                type="number"
                min="0"
                step="0.01"
                value={formData.estimatedValue}
                onChange={(e) => handleInputChange('estimatedValue', parseFloat(e.target.value))}
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialInstructions">Special Instructions</Label>
              <Textarea
                id="specialInstructions"
                value={formData.specialInstructions}
                onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                placeholder="Any special instructions or notes"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Materials */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Materials Needed
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={materialInput}
                onChange={(e) => setMaterialInput(e.target.value)}
                placeholder="Add material"
                onKeyPress={(e) => e.key === 'Enter' && addMaterial()}
              />
              <Button onClick={addMaterial} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              {formData.materials?.map((material, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                  <span className="text-sm">{material}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeMaterial(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              {(!formData.materials || formData.materials.length === 0) && (
                <p className="text-sm text-muted-foreground">No materials added yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
