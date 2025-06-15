
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, Clock, FileText, Users, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SafetyIncident {
  id: string;
  type: 'injury' | 'near-miss' | 'property-damage' | 'safety-violation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  location: string;
  reportedBy: string;
  date: string;
  status: 'open' | 'investigating' | 'resolved';
  assignedTo?: string;
}

interface SafetyChecklist {
  id: string;
  name: string;
  category: 'daily' | 'weekly' | 'monthly' | 'project-specific';
  items: { id: string; description: string; completed: boolean }[];
  completedBy?: string;
  completedDate?: string;
  jobSite?: string;
}

const mockIncidents: SafetyIncident[] = [
  {
    id: '1',
    type: 'near-miss',
    severity: 'medium',
    description: 'Worker nearly slipped on wet surface',
    location: '123 Main St - Kitchen Renovation',
    reportedBy: 'Mike Johnson',
    date: '2024-12-15',
    status: 'investigating',
    assignedTo: 'Safety Manager'
  },
  {
    id: '2',
    type: 'safety-violation',
    severity: 'high',
    description: 'Hard hat not worn in construction zone',
    location: '456 Oak Ave - Bathroom Repair',
    reportedBy: 'Tom Wilson',
    date: '2024-12-14',
    status: 'resolved'
  }
];

const mockChecklists: SafetyChecklist[] = [
  {
    id: '1',
    name: 'Daily Site Safety Check',
    category: 'daily',
    items: [
      { id: '1', description: 'Check all workers have proper PPE', completed: true },
      { id: '2', description: 'Inspect scaffolding and ladders', completed: true },
      { id: '3', description: 'Verify fire extinguisher locations', completed: false },
      { id: '4', description: 'Check electrical safety', completed: true }
    ],
    completedBy: 'Mike Johnson',
    completedDate: '2024-12-16',
    jobSite: '123 Main St'
  },
  {
    id: '2',
    name: 'Weekly Equipment Inspection',
    category: 'weekly',
    items: [
      { id: '1', description: 'Inspect power tools', completed: false },
      { id: '2', description: 'Check vehicle safety equipment', completed: false },
      { id: '3', description: 'Review first aid kit supplies', completed: false }
    ],
    jobSite: 'All Sites'
  }
];

export const SafetyManagement = () => {
  const { toast } = useToast();
  const [incidents] = useState<SafetyIncident[]>(mockIncidents);
  const [checklists, setChecklists] = useState<SafetyChecklist[]>(mockChecklists);

  const getIncidentTypeColor = (type: string) => {
    switch (type) {
      case 'injury': return 'bg-red-100 text-red-800';
      case 'near-miss': return 'bg-yellow-100 text-yellow-800';
      case 'property-damage': return 'bg-orange-100 text-orange-800';
      case 'safety-violation': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'investigating': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleReportIncident = () => {
    toast({
      title: "Incident Report",
      description: "New incident reporting form opened."
    });
  };

  const handleCompleteChecklist = (checklistId: string) => {
    setChecklists(prev => prev.map(checklist => 
      checklist.id === checklistId 
        ? { ...checklist, completedBy: 'Current User', completedDate: new Date().toISOString().split('T')[0] }
        : checklist
    ));
    
    toast({
      title: "Checklist Completed",
      description: "Safety checklist has been marked as completed."
    });
  };

  const getChecklistProgress = (checklist: SafetyChecklist) => {
    const completed = checklist.items.filter(item => item.completed).length;
    return Math.round((completed / checklist.items.length) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Safety Management</h1>
          <p className="text-muted-foreground">Manage workplace safety and compliance</p>
        </div>
        <Button onClick={handleReportIncident} className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          Report Incident
        </Button>
      </div>

      {/* Safety Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Days Without Incident</p>
                <p className="text-2xl font-bold">45</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">Open Incidents</p>
                <p className="text-2xl font-bold">{incidents.filter(i => i.status !== 'resolved').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Pending Checklists</p>
                <p className="text-2xl font-bold">{checklists.filter(c => !c.completedDate).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Safety Training Due</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="incidents" className="space-y-4">
        <TabsList>
          <TabsTrigger value="incidents">Incidents</TabsTrigger>
          <TabsTrigger value="checklists">Safety Checklists</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="incidents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Incidents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incidents.map((incident) => (
                  <div key={incident.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5 text-orange-500" />
                        <div>
                          <h4 className="font-medium">{incident.description}</h4>
                          <p className="text-sm text-muted-foreground">{incident.location}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getIncidentTypeColor(incident.type)}>
                          {incident.type.replace('-', ' ')}
                        </Badge>
                        <Badge className={getSeverityColor(incident.severity)}>
                          {incident.severity}
                        </Badge>
                        <Badge className={getStatusColor(incident.status)}>
                          {incident.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                      <div>
                        <span className="font-medium">Reported by:</span> {incident.reportedBy}
                      </div>
                      <div>
                        <span className="font-medium">Date:</span> {new Date(incident.date).toLocaleDateString()}
                      </div>
                      {incident.assignedTo && (
                        <div>
                          <span className="font-medium">Assigned to:</span> {incident.assignedTo}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                      {incident.status !== 'resolved' && (
                        <Button variant="outline" size="sm">
                          Update Status
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
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
                  <div key={checklist.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{checklist.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {checklist.category.replace('-', ' ')} • {checklist.jobSite}
                        </p>
                      </div>
                      <Badge variant="outline">
                        {checklist.category}
                      </Badge>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Progress</span>
                        <span className="text-sm">{getChecklistProgress(checklist)}%</span>
                      </div>
                      <Progress value={getChecklistProgress(checklist)} className="h-2" />
                    </div>
                    
                    {checklist.completedDate ? (
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">Completed by:</span> {checklist.completedBy} on {new Date(checklist.completedDate).toLocaleDateString()}
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          View Checklist
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => handleCompleteChecklist(checklist.id)}
                          disabled={getChecklistProgress(checklist) === 100}
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Mark Complete
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Safety Training</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Safety training management will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Compliance reporting and documentation will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
