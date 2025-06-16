
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield, FileText, Plus, Calendar } from "lucide-react";

interface SafetyIncident {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  location: string;
  reportedBy: string;
  date: string;
  status: 'reported' | 'investigating' | 'resolved';
  actions: string;
}

interface SafetyProtocol {
  id: string;
  title: string;
  category: string;
  lastUpdated: string;
  status: 'active' | 'draft' | 'archived';
}

const mockIncidents: SafetyIncident[] = [
  {
    id: '1',
    type: 'Near Miss',
    severity: 'medium',
    description: 'Worker almost fell from scaffolding due to loose plank',
    location: 'Job Site A - Building 2',
    reportedBy: 'John Smith',
    date: '2024-12-15',
    status: 'investigating',
    actions: 'Scaffolding inspection scheduled, safety briefing conducted'
  },
  {
    id: '2',
    type: 'Equipment Malfunction',
    severity: 'low',
    description: 'Power tool stopped working during operation',
    location: 'Workshop',
    reportedBy: 'Mike Johnson',
    date: '2024-12-14',
    status: 'resolved',
    actions: 'Tool replaced, maintenance schedule updated'
  }
];

const mockProtocols: SafetyProtocol[] = [
  {
    id: '1',
    title: 'Fall Protection Protocol',
    category: 'Heights',
    lastUpdated: '2024-11-01',
    status: 'active'
  },
  {
    id: '2',
    title: 'Electrical Safety Guidelines',
    category: 'Electrical',
    lastUpdated: '2024-10-15',
    status: 'active'
  },
  {
    id: '3',
    title: 'Emergency Evacuation Plan',
    category: 'Emergency',
    lastUpdated: '2024-09-20',
    status: 'active'
  }
];

export const SafetyManagement = () => {
  const [incidents] = useState<SafetyIncident[]>(mockIncidents);
  const [protocols] = useState<SafetyProtocol[]>(mockProtocols);
  const [activeTab, setActiveTab] = useState<'incidents' | 'protocols'>('incidents');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reported': return 'bg-blue-100 text-blue-800';
      case 'investigating': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'archived': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const openIncidents = incidents.filter(i => i.status !== 'resolved').length;
  const criticalIncidents = incidents.filter(i => i.severity === 'critical').length;

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Safety Management</h2>
        <div className="flex gap-2">
          <Button 
            variant={activeTab === 'incidents' ? 'default' : 'outline'}
            onClick={() => setActiveTab('incidents')}
          >
            Incidents
          </Button>
          <Button 
            variant={activeTab === 'protocols' ? 'default' : 'outline'}
            onClick={() => setActiveTab('protocols')}
          >
            Protocols
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{incidents.length}</p>
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
                <p className="text-sm text-muted-foreground">Critical</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{openIncidents}</p>
                <p className="text-sm text-muted-foreground">Open Cases</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{protocols.filter(p => p.status === 'active').length}</p>
                <p className="text-sm text-muted-foreground">Active Protocols</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {activeTab === 'incidents' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Safety Incidents</h3>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Report Incident
            </Button>
          </div>

          <Card>
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Reported By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incidents.map((incident) => (
                    <TableRow key={incident.id}>
                      <TableCell className="font-medium">{incident.type}</TableCell>
                      <TableCell>
                        <Badge className={getSeverityColor(incident.severity)}>
                          {incident.severity}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{incident.description}</TableCell>
                      <TableCell>{incident.location}</TableCell>
                      <TableCell>{incident.reportedBy}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(incident.date).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(incident.status)}>
                          {incident.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View</Button>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'protocols' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Safety Protocols</h3>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Protocol
            </Button>
          </div>

          <Card>
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Protocol</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {protocols.map((protocol) => (
                    <TableRow key={protocol.id}>
                      <TableCell className="font-medium">{protocol.title}</TableCell>
                      <TableCell>{protocol.category}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(protocol.lastUpdated).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(protocol.status)}>
                          {protocol.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View</Button>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
