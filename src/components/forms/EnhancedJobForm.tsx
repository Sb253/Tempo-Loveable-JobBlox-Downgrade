
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, Users, MapPin, DollarSign, Wrench, AlertTriangle, CheckCircle } from "lucide-react";

interface Job {
  id: string;
  title: string;
  description: string;
  customerId: string;
  customerName: string;
  jobType: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'draft' | 'scheduled' | 'in-progress' | 'on-hold' | 'completed' | 'cancelled';
  startDate: string;
  endDate: string;
  estimatedHours: number;
  actualHours: number;
  assignedTeam: string[];
  materials: Array<{
    id: string;
    name: string;
    quantity: number;
    cost: number;
  }>;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  estimatedCost: number;
  actualCost: number;
  notes: string;
  safetyRequirements: string[];
  qualityChecks: string[];
  customerInstructions: string;
  permitRequired: boolean;
  permitNumber: string;
}

interface EnhancedJobFormProps {
  job?: Job;
  onSave: (job: Job) => void;
  onCancel: () => void;
}

export const EnhancedJobForm = ({ job, onSave, onCancel }: EnhancedJobFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<Job>>({
    title: job?.title || '',
    description: job?.description || '',
    customerId: job?.customerId || '',
    customerName: job?.customerName || '',
    jobType: job?.jobType || '',
    priority: job?.priority || 'medium',
    status: job?.status || 'draft',
    startDate: job?.startDate || '',
    endDate: job?.endDate || '',
    estimatedHours: job?.estimatedHours || 0,
    actualHours: job?.actualHours || 0,
    assignedTeam: job?.assignedTeam || [],
    materials: job?.materials || [],
    address: job?.address || '',
    city: job?.city || '',
    state: job?.state || '',
    zipCode: job?.zipCode || '',
    estimatedCost: job?.estimatedCost || 0,
    actualCost: job?.actualCost || 0,
    notes: job?.notes || '',
    safetyRequirements: job?.safetyRequirements || [],
    qualityChecks: job?.qualityChecks || [],
    customerInstructions: job?.customerInstructions || '',
    permitRequired: job?.permitRequired || false,
    permitNumber: job?.permitNumber || ''
  });

  // Mock data for dropdowns
  const jobTypes = [
    'Residential Construction',
    'Commercial Construction',
    'Renovation',
    'Repair',
    'Maintenance',
    'Inspection',
    'Landscaping',
    'Electrical',
    'Plumbing',
    'HVAC'
  ];

  const teamMembers = [
    'John Smith - Foreman',
    'Mike Johnson - Electrician',
    'Sarah Davis - Plumber',
    'Tom Wilson - General Labor',
    'Lisa Brown - Project Manager',
    'David Lee - Carpenter'
  ];

  const safetyOptions = [
    'Hard Hat Required',
    'Safety Glasses Required',
    'Steel-Toed Boots Required',
    'Fall Protection Required',
    'Respirator Required',
    'High Visibility Vest Required',
    'Confined Space Entry',
    'Hot Work Permit'
  ];

  const qualityCheckOptions = [
    'Material Inspection',
    'Foundation Check',
    'Electrical Safety Test',
    'Plumbing Pressure Test',
    'Final Walkthrough',
    'Code Compliance Verification',
    'Customer Satisfaction Review',
    'Photo Documentation'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addMaterial = () => {
    setFormData(prev => ({
      ...prev,
      materials: [
        ...(prev.materials || []),
        {
          id: `mat-${Date.now()}`,
          name: '',
          quantity: 1,
          cost: 0
        }
      ]
    }));
  };

  const updateMaterial = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      materials: prev.materials?.map((material, i) => 
        i === index ? { ...material, [field]: value } : material
      ) || []
    }));
  };

  const removeMaterial = (index: number) => {
    setFormData(prev => ({
      ...prev,
      materials: prev.materials?.filter((_, i) => i !== index) || []
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.customerId || !formData.jobType) {
      toast({
        title: "Validation Error",
        description: "Title, customer, and job type are required fields.",
        variant: "destructive"
      });
      return;
    }

    const jobData: Job = {
      id: job?.id || `job-${Date.now()}`,
      title: formData.title!,
      description: formData.description!,
      customerId: formData.customerId!,
      customerName: formData.customerName!,
      jobType: formData.jobType!,
      priority: formData.priority!,
      status: formData.status!,
      startDate: formData.startDate!,
      endDate: formData.endDate!,
      estimatedHours: formData.estimatedHours!,
      actualHours: formData.actualHours!,
      assignedTeam: formData.assignedTeam!,
      materials: formData.materials!,
      address: formData.address!,
      city: formData.city!,
      state: formData.state!,
      zipCode: formData.zipCode!,
      estimatedCost: formData.estimatedCost!,
      actualCost: formData.actualCost!,
      notes: formData.notes!,
      safetyRequirements: formData.safetyRequirements!,
      qualityChecks: formData.qualityChecks!,
      customerInstructions: formData.customerInstructions!,
      permitRequired: formData.permitRequired!,
      permitNumber: formData.permitNumber!
    };

    onSave(jobData);
    
    toast({
      title: job ? "Job Updated" : "Job Created",
      description: `${jobData.title} has been ${job ? 'updated' : 'created'} successfully.`,
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'in-progress': return 'default';
      case 'scheduled': return 'secondary';
      case 'on-hold': return 'destructive';
      case 'cancelled': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <Card className="max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wrench className="h-6 w-6" />
          {job ? 'Edit Job' : 'New Job'}
          {job && (
            <div className="flex gap-2">
              <Badge variant={getPriorityColor(job.priority)}>
                {job.priority}
              </Badge>
              <Badge variant={getStatusColor(job.status)}>
                {job.status}
              </Badge>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="materials">Materials</TabsTrigger>
              <TabsTrigger value="safety">Safety</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter job title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jobType">Job Type *</Label>
                  <Select 
                    value={formData.jobType} 
                    onValueChange={(value) => handleInputChange('jobType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customerId">Customer *</Label>
                  <Select 
                    value={formData.customerId} 
                    onValueChange={(value) => {
                      handleInputChange('customerId', value);
                      handleInputChange('customerName', `Customer ${value}`);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cust-1">John Smith</SelectItem>
                      <SelectItem value="cust-2">ABC Construction Inc.</SelectItem>
                      <SelectItem value="cust-3">Sarah Johnson</SelectItem>
                      <SelectItem value="cust-4">Metro Properties</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select 
                    value={formData.priority} 
                    onValueChange={(value) => handleInputChange('priority', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => handleInputChange('status', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="on-hold">On Hold</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Detailed job description"
                    rows={3}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Start Date
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    End Date
                  </Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimatedHours" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Estimated Hours
                  </Label>
                  <Input
                    id="estimatedHours"
                    type="number"
                    value={formData.estimatedHours}
                    onChange={(e) => handleInputChange('estimatedHours', parseFloat(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="actualHours" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Actual Hours
                  </Label>
                  <Input
                    id="actualHours"
                    type="number"
                    value={formData.actualHours}
                    onChange={(e) => handleInputChange('actualHours', parseFloat(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimatedCost" className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Estimated Cost
                  </Label>
                  <Input
                    id="estimatedCost"
                    type="number"
                    value={formData.estimatedCost}
                    onChange={(e) => handleInputChange('estimatedCost', parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="actualCost" className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Actual Cost
                  </Label>
                  <Input
                    id="actualCost"
                    type="number"
                    value={formData.actualCost}
                    onChange={(e) => handleInputChange('actualCost', parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Job Location</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Address
                    </Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Job site address"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="City"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      placeholder="State"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      placeholder="12345"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="team" className="space-y-4">
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Assigned Team Members
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {teamMembers.map((member) => (
                    <div key={member} className="flex items-center space-x-2">
                      <Checkbox
                        id={member}
                        checked={formData.assignedTeam?.includes(member)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            handleInputChange('assignedTeam', [...(formData.assignedTeam || []), member]);
                          } else {
                            handleInputChange('assignedTeam', formData.assignedTeam?.filter(m => m !== member) || []);
                          }
                        }}
                      />
                      <Label htmlFor={member} className="text-sm">{member}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="materials" className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Materials & Supplies</h4>
                <Button type="button" onClick={addMaterial} variant="outline" size="sm">
                  Add Material
                </Button>
              </div>
              
              <div className="space-y-2">
                {formData.materials?.map((material, index) => (
                  <div key={material.id} className="grid grid-cols-1 md:grid-cols-4 gap-2 p-3 border rounded">
                    <Input
                      placeholder="Material name"
                      value={material.name}
                      onChange={(e) => updateMaterial(index, 'name', e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="Quantity"
                      value={material.quantity}
                      onChange={(e) => updateMaterial(index, 'quantity', parseInt(e.target.value) || 0)}
                    />
                    <Input
                      type="number"
                      placeholder="Cost"
                      value={material.cost}
                      onChange={(e) => updateMaterial(index, 'cost', parseFloat(e.target.value) || 0)}
                    />
                    <Button type="button" onClick={() => removeMaterial(index)} variant="destructive" size="sm">
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="safety" className="space-y-4">
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Safety Requirements
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {safetyOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox
                        id={option}
                        checked={formData.safetyRequirements?.includes(option)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            handleInputChange('safetyRequirements', [...(formData.safetyRequirements || []), option]);
                          } else {
                            handleInputChange('safetyRequirements', formData.safetyRequirements?.filter(req => req !== option) || []);
                          }
                        }}
                      />
                      <Label htmlFor={option} className="text-sm">{option}</Label>
                    </div>
                  ))}
                </div>

                <h4 className="font-medium flex items-center gap-2 pt-4">
                  <CheckCircle className="h-4 w-4" />
                  Quality Checks
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {qualityCheckOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox
                        id={option}
                        checked={formData.qualityChecks?.includes(option)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            handleInputChange('qualityChecks', [...(formData.qualityChecks || []), option]);
                          } else {
                            handleInputChange('qualityChecks', formData.qualityChecks?.filter(check => check !== option) || []);
                          }
                        }}
                      />
                      <Label htmlFor={option} className="text-sm">{option}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customerInstructions">Customer Instructions</Label>
                  <Textarea
                    id="customerInstructions"
                    value={formData.customerInstructions}
                    onChange={(e) => handleInputChange('customerInstructions', e.target.value)}
                    placeholder="Special instructions from the customer"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Internal Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Internal notes and comments"
                    rows={3}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="permitRequired"
                      checked={formData.permitRequired}
                      onCheckedChange={(checked) => handleInputChange('permitRequired', checked)}
                    />
                    <Label htmlFor="permitRequired">Permit Required</Label>
                  </div>

                  {formData.permitRequired && (
                    <div className="space-y-2">
                      <Label htmlFor="permitNumber">Permit Number</Label>
                      <Input
                        id="permitNumber"
                        value={formData.permitNumber}
                        onChange={(e) => handleInputChange('permitNumber', e.target.value)}
                        placeholder="Enter permit number"
                      />
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {job ? 'Update Job' : 'Create Job'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
