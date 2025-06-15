
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckSquare, Plus, Edit, Trash2, Copy, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  required: boolean;
}

interface JobChecklist {
  id: string;
  name: string;
  description: string;
  category: string;
  items: ChecklistItem[];
  totalItems: number;
  completedItems: number;
  assignedJobs: string[];
}

const mockChecklists: JobChecklist[] = [
  {
    id: '1',
    name: 'Kitchen Renovation Pre-Work',
    description: 'Essential checklist before starting kitchen renovation',
    category: 'Renovation',
    assignedJobs: ['Kitchen Renovation - Smith House'],
    totalItems: 8,
    completedItems: 5,
    items: [
      { id: '1', text: 'Measure kitchen dimensions', completed: true, required: true },
      { id: '2', text: 'Check electrical outlets', completed: true, required: true },
      { id: '3', text: 'Inspect plumbing connections', completed: true, required: true },
      { id: '4', text: 'Take photos of current state', completed: true, required: false },
      { id: '5', text: 'Order materials', completed: true, required: true },
      { id: '6', text: 'Schedule inspections', completed: false, required: true },
      { id: '7', text: 'Set up work area', completed: false, required: false },
      { id: '8', text: 'Review safety protocols', completed: false, required: true }
    ]
  },
  {
    id: '2',
    name: 'Bathroom Installation Checklist',
    description: 'Complete bathroom installation process',
    category: 'Plumbing',
    assignedJobs: ['Bathroom Repair - Davis Home'],
    totalItems: 6,
    completedItems: 2,
    items: [
      { id: '1', text: 'Shut off water supply', completed: true, required: true },
      { id: '2', text: 'Remove old fixtures', completed: true, required: true },
      { id: '3', text: 'Install new plumbing', completed: false, required: true },
      { id: '4', text: 'Test water pressure', completed: false, required: true },
      { id: '5', text: 'Install new fixtures', completed: false, required: true },
      { id: '6', text: 'Final cleanup', completed: false, required: false }
    ]
  }
];

export const JobChecklists = () => {
  const { toast } = useToast();
  const [checklists, setChecklists] = useState<JobChecklist[]>(mockChecklists);
  const [selectedChecklist, setSelectedChecklist] = useState<string>('1');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newChecklist, setNewChecklist] = useState({
    name: '',
    description: '',
    category: '',
    items: ['']
  });

  const currentChecklist = checklists.find(c => c.id === selectedChecklist);

  const handleItemToggle = (checklistId: string, itemId: string) => {
    setChecklists(prev => prev.map(checklist => {
      if (checklist.id === checklistId) {
        const updatedItems = checklist.items.map(item => 
          item.id === itemId ? { ...item, completed: !item.completed } : item
        );
        const completedCount = updatedItems.filter(item => item.completed).length;
        
        return {
          ...checklist,
          items: updatedItems,
          completedItems: completedCount
        };
      }
      return checklist;
    }));
    
    toast({
      title: "Checklist Updated",
      description: "Item status has been updated.",
    });
  };

  const getProgressPercentage = (checklist: JobChecklist) => {
    return checklist.totalItems > 0 ? Math.round((checklist.completedItems / checklist.totalItems) * 100) : 0;
  };

  const getProgressColor = (percentage: number) => {
    if (percentage === 100) return 'bg-green-500';
    if (percentage >= 75) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const handleCreateChecklist = () => {
    const items = newChecklist.items
      .filter(item => item.trim())
      .map((item, index) => ({
        id: (index + 1).toString(),
        text: item.trim(),
        completed: false,
        required: true
      }));

    const checklist: JobChecklist = {
      id: (checklists.length + 1).toString(),
      name: newChecklist.name,
      description: newChecklist.description,
      category: newChecklist.category,
      items,
      totalItems: items.length,
      completedItems: 0,
      assignedJobs: []
    };

    setChecklists(prev => [...prev, checklist]);
    setShowCreateDialog(false);
    setNewChecklist({ name: '', description: '', category: '', items: [''] });
    
    toast({
      title: "Checklist Created",
      description: `${newChecklist.name} has been created successfully.`,
    });
  };

  const addNewItem = () => {
    setNewChecklist(prev => ({
      ...prev,
      items: [...prev.items, '']
    }));
  };

  const updateItem = (index: number, value: string) => {
    setNewChecklist(prev => ({
      ...prev,
      items: prev.items.map((item, i) => i === index ? value : item)
    }));
  };

  const removeItem = (index: number) => {
    setNewChecklist(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Job Checklists</h2>
        <Button onClick={() => setShowCreateDialog(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Checklist
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Checklists</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{checklists.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {checklists.reduce((total, c) => total + c.assignedJobs.length, 0)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {checklists.filter(c => getProgressPercentage(c) === 100).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(checklists.reduce((total, c) => total + getProgressPercentage(c), 0) / checklists.length)}%
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Checklist List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Available Checklists</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {checklists.map((checklist) => {
              const progress = getProgressPercentage(checklist);
              return (
                <div
                  key={checklist.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-accent ${
                    selectedChecklist === checklist.id ? 'bg-accent border-primary' : ''
                  }`}
                  onClick={() => setSelectedChecklist(checklist.id)}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{checklist.name}</h3>
                      <Badge variant="outline">{checklist.category}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{checklist.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span>{checklist.completedItems} of {checklist.totalItems} completed</span>
                      <span className="font-medium">{progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${getProgressColor(progress)}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Checklist Details */}
        <Card className="lg:col-span-2">
          {currentChecklist && (
            <>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{currentChecklist.name}</CardTitle>
                    <p className="text-muted-foreground">{currentChecklist.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Progress: {getProgressPercentage(currentChecklist)}%</span>
                  <Badge variant={getProgressPercentage(currentChecklist) === 100 ? "default" : "secondary"}>
                    {currentChecklist.completedItems} / {currentChecklist.totalItems} items
                  </Badge>
                </div>

                <div className="space-y-3">
                  {currentChecklist.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <Checkbox
                        checked={item.completed}
                        onCheckedChange={() => handleItemToggle(currentChecklist.id, item.id)}
                      />
                      <div className="flex-1">
                        <span className={`${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {item.text}
                        </span>
                        {item.required && (
                          <Badge variant="destructive" className="ml-2 text-xs">Required</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {currentChecklist.assignedJobs.length > 0 && (
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Assigned to Jobs:</h4>
                    <div className="space-y-1">
                      {currentChecklist.assignedJobs.map((job, index) => (
                        <Badge key={index} variant="outline">{job}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </>
          )}
        </Card>
      </div>

      {/* Create Checklist Dialog */}
      {showCreateDialog && (
        <Dialog open={true} onOpenChange={setShowCreateDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Checklist</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Checklist Name *</Label>
                  <Input
                    id="name"
                    value={newChecklist.name}
                    onChange={(e) => setNewChecklist(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter checklist name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={newChecklist.category} onValueChange={(value) => setNewChecklist(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Renovation">Renovation</SelectItem>
                      <SelectItem value="Plumbing">Plumbing</SelectItem>
                      <SelectItem value="Electrical">Electrical</SelectItem>
                      <SelectItem value="Carpentry">Carpentry</SelectItem>
                      <SelectItem value="General">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newChecklist.description}
                  onChange={(e) => setNewChecklist(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of this checklist"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label>Checklist Items *</Label>
                {newChecklist.items.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={item}
                      onChange={(e) => updateItem(index, e.target.value)}
                      placeholder={`Item ${index + 1}`}
                      className="flex-1"
                    />
                    {newChecklist.items.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeItem(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addNewItem}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateChecklist} disabled={!newChecklist.name || !newChecklist.category}>
                  Create Checklist
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
