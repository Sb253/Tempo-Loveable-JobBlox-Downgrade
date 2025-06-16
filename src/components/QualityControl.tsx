
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Clock, FileText, Plus } from "lucide-react";

interface QualityChecklist {
  id: string;
  jobId: string;
  jobName: string;
  inspector: string;
  date: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  score: number;
  items: QualityItem[];
}

interface QualityItem {
  id: string;
  description: string;
  status: 'pass' | 'fail' | 'pending';
  notes?: string;
}

const mockChecklists: QualityChecklist[] = [
  {
    id: '1',
    jobId: 'job-001',
    jobName: 'Kitchen Renovation - Smith House',
    inspector: 'Sarah Johnson',
    date: '2024-12-15',
    status: 'completed',
    score: 92,
    items: [
      { id: '1', description: 'Cabinet installation alignment', status: 'pass' },
      { id: '2', description: 'Countertop finish quality', status: 'pass' },
      { id: '3', description: 'Plumbing connections secure', status: 'pass' },
      { id: '4', description: 'Electrical work compliance', status: 'fail', notes: 'One outlet needs repositioning' }
    ]
  },
  {
    id: '2',
    jobId: 'job-002',
    jobName: 'Bathroom Remodel - Johnson Residence',
    inspector: 'Mike Wilson',
    date: '2024-12-14',
    status: 'in-progress',
    score: 0,
    items: [
      { id: '5', description: 'Tile work quality', status: 'pass' },
      { id: '6', description: 'Waterproofing integrity', status: 'pending' },
      { id: '7', description: 'Fixture installation', status: 'pending' }
    ]
  }
];

export const QualityControl = () => {
  const [checklists] = useState<QualityChecklist[]>(mockChecklists);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getItemStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'fail': return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const completedInspections = checklists.filter(c => c.status === 'completed').length;
  const averageScore = Math.round(
    checklists
      .filter(c => c.status === 'completed')
      .reduce((sum, c) => sum + c.score, 0) / completedInspections || 0
  );
  const failedItems = checklists.reduce((sum, c) => 
    sum + c.items.filter(item => item.status === 'fail').length, 0
  );

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Quality Control</h2>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Inspection
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{checklists.length}</p>
                <p className="text-sm text-muted-foreground">Total Inspections</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{completedInspections}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{averageScore}%</p>
                <p className="text-sm text-muted-foreground">Average Score</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{failedItems}</p>
                <p className="text-sm text-muted-foreground">Failed Items</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quality Checklists */}
      <div className="grid gap-6">
        {checklists.map((checklist) => (
          <Card key={checklist.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{checklist.jobName}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Inspector: {checklist.inspector} • {new Date(checklist.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {checklist.status === 'completed' && (
                    <div className="text-right">
                      <p className="text-2xl font-bold">{checklist.score}%</p>
                      <p className="text-xs text-muted-foreground">Quality Score</p>
                    </div>
                  )}
                  <Badge className={getStatusColor(checklist.status)}>
                    {checklist.status.replace('-', ' ')}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {checklist.items.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    {getItemStatusIcon(item.status)}
                    <div className="flex-1">
                      <p className="font-medium">{item.description}</p>
                      {item.notes && (
                        <p className="text-sm text-muted-foreground mt-1">{item.notes}</p>
                      )}
                    </div>
                    <Badge variant={item.status === 'pass' ? 'default' : item.status === 'fail' ? 'destructive' : 'secondary'}>
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex justify-end gap-2">
                <Button variant="outline" size="sm">View Details</Button>
                <Button variant="outline" size="sm">Edit</Button>
                {checklist.status !== 'completed' && (
                  <Button size="sm">Continue Inspection</Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
