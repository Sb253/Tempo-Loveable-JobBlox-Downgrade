
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Clock, Wrench } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface JobTemplate {
  id: string;
  name: string;
  description: string;
  estimatedDuration: string;
  category: string;
  tasks: string[];
  materials: string[];
  defaultPrice: number;
}

export const JobTemplates = () => {
  const [templates, setTemplates] = useState<JobTemplate[]>([
    {
      id: '1',
      name: 'Kitchen Inspection',
      description: 'Standard kitchen renovation assessment',
      estimatedDuration: '2h',
      category: 'Inspection',
      tasks: ['Measure space', 'Check plumbing', 'Assess electrical', 'Photo documentation'],
      materials: ['Measuring tape', 'Camera', 'Checklist'],
      defaultPrice: 150
    },
    {
      id: '2',
      name: 'Bathroom Repair - Basic',
      description: 'Standard bathroom fixture repair',
      estimatedDuration: '3h',
      category: 'Repair',
      tasks: ['Diagnose issue', 'Replace fixtures', 'Test functionality', 'Clean up'],
      materials: ['Basic tools', 'Replacement parts', 'Sealant'],
      defaultPrice: 300
    }
  ]);

  const [newTemplate, setNewTemplate] = useState<Partial<JobTemplate>>({
    name: '',
    description: '',
    estimatedDuration: '',
    category: '',
    tasks: [],
    materials: [],
    defaultPrice: 0
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateTemplate = () => {
    if (!newTemplate.name || !newTemplate.category) {
      toast.error("Please fill in required fields");
      return;
    }

    const template: JobTemplate = {
      id: Date.now().toString(),
      name: newTemplate.name!,
      description: newTemplate.description || '',
      estimatedDuration: newTemplate.estimatedDuration || '1h',
      category: newTemplate.category!,
      tasks: newTemplate.tasks || [],
      materials: newTemplate.materials || [],
      defaultPrice: newTemplate.defaultPrice || 0
    };

    setTemplates([...templates, template]);
    setNewTemplate({});
    setIsDialogOpen(false);
    toast.success("Job template created successfully");
  };

  const handleUseTemplate = (template: JobTemplate) => {
    toast.success(`Using template: ${template.name}`, {
      description: "Job created from template"
    });
    // This would integrate with the job creation system
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Job Templates</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Job Template</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Template Name *</Label>
                  <Input
                    id="name"
                    value={newTemplate.name || ''}
                    onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                    placeholder="e.g., Kitchen Inspection"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select onValueChange={(value) => setNewTemplate({...newTemplate, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inspection">Inspection</SelectItem>
                      <SelectItem value="Repair">Repair</SelectItem>
                      <SelectItem value="Installation">Installation</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newTemplate.description || ''}
                  onChange={(e) => setNewTemplate({...newTemplate, description: e.target.value})}
                  placeholder="Template description..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Estimated Duration</Label>
                  <Input
                    id="duration"
                    value={newTemplate.estimatedDuration || ''}
                    onChange={(e) => setNewTemplate({...newTemplate, estimatedDuration: e.target.value})}
                    placeholder="e.g., 2h"
                  />
                </div>
                <div>
                  <Label htmlFor="price">Default Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newTemplate.defaultPrice || ''}
                    onChange={(e) => setNewTemplate({...newTemplate, defaultPrice: parseInt(e.target.value) || 0})}
                    placeholder="0"
                  />
                </div>
              </div>

              <Button onClick={handleCreateTemplate} className="w-full">
                Create Template
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <Badge variant="secondary">{template.category}</Badge>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-3 w-3" />
                  {template.estimatedDuration}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Wrench className="h-3 w-3" />
                  {template.tasks.length} tasks
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-semibold">${template.defaultPrice}</span>
                <Button onClick={() => handleUseTemplate(template)} size="sm">
                  Use Template
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
