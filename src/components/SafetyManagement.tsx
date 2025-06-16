
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { businessDataManager, type SafetyIncident } from '../utils/businessDataManager';
import { useToast } from "@/hooks/use-toast";
import { Shield, AlertTriangle, CheckCircle, Clock, Plus, FileText, Camera, Users } from "lucide-react";

interface SafetyChecklist {
  id: string;
  name: string;
  category: string;
  items: SafetyChecklistItem[];
  jobId?: string;
  assignedTo: string;
  status: 'pending' | 'completed' | 'overdue';
  dueDate: string;
  completedDate?: string;
  createdAt: string;
}

interface SafetyChecklistItem {
  id: string;
  description: string;
  completed: boolean;
  notes?: string;
  photoRequired: boolean;
  photoUrl?: string;
}

export const SafetyManagement = () => {
  const { toast } = useToast();
  const [incidents, setIncidents] = useState<SafetyIncident[]>([]);
  const [checklists, setChecklists] = useState<SafetyChecklist[]>([]);
  const [showIncidentDialog, setShowIncidentDialog] = useState(false);
  const [showChecklistDialog, setShowChecklistDialog] = useState(false);
  const [newIncident, setNewIncident] = useState({
    title: '',
    description: '',
    severity: 'minor',
    location: '',
    jobId: '',
    reportedBy: '',
    injuredPerson: '',
    witnessNames: '',
    correctiveActions: '',
    photos: [] as string[]
  });
  const [newChecklist, setNewChecklist] = useState({
    name: '',
    category: '',
    jobId: '',
    assignedTo: '',
    dueDate: new Date().toISOString().split('T')[0],
    items: [
      { description: '', photoRequired: false }
    ]
  });

  const employees = businessDataManager.getAllEmployees();
  const jobs = businessDataManager.getAllJobs();
  const severityLevels = ['minor', 'moderate', 'serious', 'critical'];
  const checklistCategories = ['PPE Check', 'Equipment Safety', 'Site Safety', 'Emergency Procedures', 'Environmental'];

  useEffect(() => {
    loadIncidents();
    loadChecklists();
  }, []);

  const loadIncidents = () => {
    const data = businessDataManager.getAllSafetyIncidents();
    setIncidents(data);
  };

  const loadChecklists = () => {
    const data = businessDataManager.getAllSafetyChecklists();
    setChecklists(data);
  };

  const handleCreateIncident = () => {
    if (!newIncident.title || !newIncident.description || !newIncident.location) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const incident = businessDataManager.createSafetyIncident({
      ...newIncident,
      severity: newIncident.severity as SafetyIncident['severity'],
      date: new Date().toISOString(),
      witnessNames: newIncident.witnessNames.split(',').map(name => name.trim()).filter(Boolean),
      status: 'reported'
    });

    loadIncidents();
    setShowIncidentDialog(false);
    setNewIncident({
      title: '',
      description: '',
      severity: 'minor',
      location: '',
      jobId: '',
      reportedBy: '',
      injuredPerson: '',
      witnessNames: '',
      correctiveActions: '',
      photos: []
    });

    toast({
      title: "Incident Reported",
      description: "Safety incident has been reported and logged",
      variant: "destructive"
    });
  };

  const handleCreateChecklist = () => {
    if (!newChecklist.name || !newChecklist.assignedTo || newChecklist.items.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const checklist: SafetyChecklist = {
      id: `checklist-${Date.now()}`,
      name: newChecklist.name,
      category: newChecklist.category,
      jobId: newChecklist.jobId || undefined,
      assignedTo: newChecklist.assignedTo,
      status: 'pending',
      dueDate: newChecklist.dueDate,
      items: newChecklist.items.map((item, index) => ({
        id: `item-${index}`,
        description: item.description,
        completed: false,
        photoRequired: item.photoRequired
      })),
      createdAt: new Date().toISOString()
    };

    businessDataManager.createSafetyChecklist(checklist);
    loadChecklists();
    setShowChecklistDialog(false);
    setNewChecklist({
      name: '',
      category: '',
      jobId: '',
      assignedTo: '',
      dueDate: new Date().toISOString().split('T')[0],
      items: [{ description: '', photoRequired: false }]
    });

    toast({
      title: "Checklist Created",
      description: "Safety checklist has been created and assigned"
    });
  };

  const handleStatusUpdate = (incidentId: string, newStatus: SafetyIncident['status']) => {
    const incident = incidents.find(inc => inc.id === incidentId);
    if (!incident) return;

    const updatedIncident = { ...incident, status: newStatus };
    businessDataManager.saveSafetyIncident(updatedIncident);
    loadIncidents();

    toast({
      title: "Status Updated",
      description: `Incident status changed to ${newStatus}`
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'minor': return 'bg-yellow-100 text-yellow-800';
      case 'moderate': return 'bg-orange-100 text-orange-800';
      case 'serious': return 'bg-red-100 text-red-800';
      case 'critical': return 'bg-red-200 text-red-900';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reported': return 'bg-blue-100 text-blue-800';
      case 'investigating': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalIncidents = incidents.length;
  const criticalIncidents = incidents.filter(inc => inc.severity === 'critical' || inc.severity === 'serious').length;
  const openIncidents = incidents.filter(inc => inc.status !== 'resolved').length;
  const overdueChecklists = checklists.filter(ch => ch.status === 'overdue' || (ch.status === 'pending' && new Date(ch.dueDate) < new Date())).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Safety Management</h2>
        <div className="flex gap-2">
          <Dialog open={showChecklistDialog} onOpenChange={setShowChecklistDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                New Checklist
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Safety Checklist</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Checklist Name *</Label>
                    <Input
                      value={newChecklist.name}
                      onChange={(e) => setNewChecklist(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Daily Safety Check"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={newChecklist.category} onValueChange={(value) => setNewChecklist(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {checklistCategories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Assign To *</Label>
                    <Select value={newChecklist.assignedTo} onValueChange={(value) => setNewChecklist(prev => ({ ...prev, assignedTo: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select employee" />
                      </SelectTrigger>
                      <SelectContent>
                        {employees.map(emp => (
                          <SelectItem key={emp.id} value={emp.name}>{emp.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Due Date</Label>
                    <Input
                      type="date"
                      value={newChecklist.dueDate}
                      onChange={(e) => setNewChecklist(prev => ({ ...prev, dueDate: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Related Job (Optional)</Label>
                  <Select value={newChecklist.jobId} onValueChange={(value) => setNewChecklist(prev => ({ ...prev, jobId: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">No specific job</SelectItem>
                      {jobs.map(job => (
                        <SelectItem key={job.id} value={job.id}>{job.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Checklist Items</Label>
                  {newChecklist.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 border rounded">
                      <Input
                        value={item.description}
                        onChange={(e) => {
                          const updatedItems = [...newChecklist.items];
                          updatedItems[index].description = e.target.value;
                          setNewChecklist(prev => ({ ...prev, items: updatedItems }));
                        }}
                        placeholder="Safety check item"
                        className="flex-1"
                      />
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={item.photoRequired}
                          onCheckedChange={(checked) => {
                            const updatedItems = [...newChecklist.items];
                            updatedItems[index].photoRequired = !!checked;
                            setNewChecklist(prev => ({ ...prev, items: updatedItems }));
                          }}
                        />
                        <Label className="text-sm">Photo Required</Label>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const updatedItems = newChecklist.items.filter((_, i) => i !== index);
                          setNewChecklist(prev => ({ ...prev, items: updatedItems }));
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => {
                      setNewChecklist(prev => ({
                        ...prev,
                        items: [...prev.items, { description: '', photoRequired: false }]
                      }));
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowChecklistDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateChecklist}>
                    Create Checklist
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showIncidentDialog} onOpenChange={setShowIncidentDialog}>
            <DialogTrigger asChild>
              <Button>
                <AlertTriangle className="h-4 w-4 mr-2" />
                Report Incident
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Report Safety Incident</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Incident Title *</Label>
                    <Input
                      value={newIncident.title}
                      onChange={(e) => setNewIncident(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Brief description"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Severity *</Label>
                    <Select value={newIncident.severity} onValueChange={(value) => setNewIncident(prev => ({ ...prev, severity: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {severityLevels.map(level => (
                          <SelectItem key={level} value={level}>
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description *</Label>
                  <Textarea
                    value={newIncident.description}
                    onChange={(e) => setNewIncident(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Detailed description of the incident"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Location *</Label>
                    <Input
                      value={newIncident.location}
                      onChange={(e) => setNewIncident(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Where did this occur?"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Related Job</Label>
                    <Select value={newIncident.jobId} onValueChange={(value) => setNewIncident(prev => ({ ...prev, jobId: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select job" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Not related to specific job</SelectItem>
                        {jobs.map(job => (
                          <SelectItem key={job.id} value={job.id}>{job.title}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Reported By</Label>
                    <Select value={newIncident.reportedBy} onValueChange={(value) => setNewIncident(prev => ({ ...prev, reportedBy: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select reporter" />
                      </SelectTrigger>
                      <SelectContent>
                        {employees.map(emp => (
                          <SelectItem key={emp.id} value={emp.name}>{emp.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Injured Person (if any)</Label>
                    <Input
                      value={newIncident.injuredPerson}
                      onChange={(e) => setNewIncident(prev => ({ ...prev, injuredPerson: e.target.value }))}
                      placeholder="Name of injured person"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Witnesses (comma separated)</Label>
                  <Input
                    value={newIncident.witnessNames}
                    onChange={(e) => setNewIncident(prev => ({ ...prev, witnessNames: e.target.value }))}
                    placeholder="Names of witnesses, separated by commas"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Corrective Actions Taken</Label>
                  <Textarea
                    value={newIncident.correctiveActions}
                    onChange={(e) => setNewIncident(prev => ({ ...prev, correctiveActions: e.target.value }))}
                    placeholder="What actions were taken to address the incident?"
                    rows={2}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowIncidentDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateIncident}>
                    Report Incident
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{totalIncidents}</p>
                <p className="text-sm text-muted-foreground">Total Incidents</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{criticalIncidents}</p>
                <p className="text-sm text-muted-foreground">Critical/Serious</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{openIncidents}</p>
                <p className="text-sm text-muted-foreground">Open Incidents</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{overdueChecklists}</p>
                <p className="text-sm text-muted-foreground">Overdue Checklists</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="incidents" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="incidents">Safety Incidents</TabsTrigger>
          <TabsTrigger value="checklists">Safety Checklists</TabsTrigger>
        </TabsList>

        <TabsContent value="incidents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Safety Incidents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incidents.map((incident) => (
                  <div key={incident.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{incident.title}</h3>
                          <Badge className={getSeverityColor(incident.severity)}>
                            {incident.severity}
                          </Badge>
                          <Badge className={getStatusColor(incident.status)}>
                            {incident.status}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2">{incident.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                          <div>
                            <span className="font-medium">Location:</span> {incident.location}
                          </div>
                          <div>
                            <span className="font-medium">Reported by:</span> {incident.reportedBy}
                          </div>
                          <div>
                            <span className="font-medium">Date:</span> {new Date(incident.date).toLocaleDateString()}
                          </div>
                        </div>
                        
                        {incident.injuredPerson && (
                          <p className="text-sm text-red-600 mt-2">
                            <span className="font-medium">Injured:</span> {incident.injuredPerson}
                          </p>
                        )}
                      </div>

                      {incident.status !== 'resolved' && (
                        <div className="flex gap-2 ml-4">
                          {incident.status === 'reported' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleStatusUpdate(incident.id, 'investigating')}
                            >
                              Start Investigation
                            </Button>
                          )}
                          {incident.status === 'investigating' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleStatusUpdate(incident.id, 'resolved')}
                            >
                              Mark Resolved
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {incidents.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No safety incidents reported. Keep up the good work!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checklists" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Safety Checklists</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {checklists.map((checklist) => (
                  <div key={checklist.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{checklist.name}</h3>
                          <Badge className={getStatusColor(checklist.status)}>
                            {checklist.status}
                          </Badge>
                          {checklist.category && (
                            <Badge variant="outline">{checklist.category}</Badge>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                          <div>
                            <span className="font-medium">Assigned to:</span> {checklist.assignedTo}
                          </div>
                          <div>
                            <span className="font-medium">Due date:</span> {checklist.dueDate}
                          </div>
                          <div>
                            <span className="font-medium">Items:</span> {checklist.items.length}
                          </div>
                        </div>
                        
                        <div className="mt-2">
                          <div className="text-sm text-muted-foreground">
                            Progress: {checklist.items.filter(item => item.completed).length} / {checklist.items.length} items completed
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ 
                                width: `${(checklist.items.filter(item => item.completed).length / checklist.items.length) * 100}%` 
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {checklists.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No safety checklists created yet.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
