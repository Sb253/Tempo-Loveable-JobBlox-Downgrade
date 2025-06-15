
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  FileText, 
  Camera, 
  Star,
  Clock,
  User,
  MapPin,
  Download,
  Upload,
  Plus,
  Search
} from "lucide-react";

interface QualityInspection {
  id: string;
  jobId: string;
  jobTitle: string;
  inspector: string;
  date: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  score: number;
  checklist: QualityCheckItem[];
  notes: string;
  photos: string[];
  customerSatisfaction: number;
}

interface QualityCheckItem {
  id: string;
  category: string;
  item: string;
  required: boolean;
  status: 'pass' | 'fail' | 'na' | 'pending';
  notes: string;
  photos: string[];
}

const mockInspections: QualityInspection[] = [
  {
    id: '1',
    jobId: 'J001',
    jobTitle: 'Kitchen Renovation - Smith Residence',
    inspector: 'Mike Johnson',
    date: '2024-12-15',
    status: 'completed',
    score: 95,
    checklist: [
      {
        id: 'c1',
        category: 'Installation',
        item: 'Cabinets properly aligned',
        required: true,
        status: 'pass',
        notes: 'Perfect alignment achieved',
        photos: []
      },
      {
        id: 'c2',
        category: 'Safety',
        item: 'Electrical connections secure',
        required: true,
        status: 'pass',
        notes: 'All connections tested and secure',
        photos: []
      },
      {
        id: 'c3',
        category: 'Finish',
        item: 'Paint quality acceptable',
        required: false,
        status: 'fail',
        notes: 'Touch-up needed on south wall',
        photos: []
      }
    ],
    notes: 'Overall excellent work. Minor touch-up required.',
    photos: [],
    customerSatisfaction: 5
  },
  {
    id: '2',
    jobId: 'J002',
    jobTitle: 'Bathroom Repair - Davis Home',
    inspector: 'Sarah Wilson',
    date: '2024-12-14',
    status: 'in-progress',
    score: 0,
    checklist: [],
    notes: '',
    photos: [],
    customerSatisfaction: 0
  }
];

const qualityCategories = [
  'Installation',
  'Safety',
  'Finish',
  'Functionality',
  'Cleanup',
  'Documentation'
];

export const QualityControl = () => {
  const { toast } = useToast();
  const [inspections, setInspections] = useState<QualityInspection[]>(mockInspections);
  const [selectedInspection, setSelectedInspection] = useState<QualityInspection | null>(null);
  const [showNewInspection, setShowNewInspection] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCheckItemIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'fail': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'na': return <span className="text-gray-400 text-sm">N/A</span>;
      default: return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const filteredInspections = inspections.filter(inspection => {
    const matchesSearch = inspection.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inspection.inspector.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || inspection.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const calculateOverallScore = () => {
    const completedInspections = inspections.filter(i => i.status === 'completed');
    if (completedInspections.length === 0) return 0;
    return Math.round(completedInspections.reduce((sum, i) => sum + i.score, 0) / completedInspections.length);
  };

  const handleCreateInspection = () => {
    setShowNewInspection(true);
  };

  const handleExportReport = () => {
    toast({
      title: "Report Exported",
      description: "Quality control report has been exported to CSV.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Quality Control</h2>
          <p className="text-muted-foreground">Manage job quality inspections and standards</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleExportReport} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button onClick={handleCreateInspection}>
            <Plus className="h-4 w-4 mr-2" />
            New Inspection
          </Button>
        </div>
      </div>

      {/* Quality Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{calculateOverallScore()}%</p>
                <p className="text-sm text-muted-foreground">Average Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{inspections.length}</p>
                <p className="text-sm text-muted-foreground">Total Inspections</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{inspections.filter(i => i.status === 'pending').length}</p>
                <p className="text-sm text-muted-foreground">Pending Reviews</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Star className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">4.8</p>
                <p className="text-sm text-muted-foreground">Avg Customer Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex gap-4 items-center">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search inspections..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Inspections List */}
      <Card>
        <CardHeader>
          <CardTitle>Quality Inspections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredInspections.map((inspection) => (
              <div key={inspection.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{inspection.jobTitle}</h3>
                      <Badge className={getStatusColor(inspection.status)}>
                        {inspection.status}
                      </Badge>
                      {inspection.status === 'completed' && (
                        <Badge variant="outline">
                          Score: {inspection.score}%
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {inspection.inspector}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {inspection.date}
                      </span>
                      <span>Job ID: {inspection.jobId}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {inspection.status === 'completed' && (
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < inspection.customerSatisfaction
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedInspection(inspection)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
                
                {inspection.status === 'completed' && inspection.checklist.length > 0 && (
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex items-center gap-2 text-sm">
                      <span>Checklist Progress:</span>
                      <div className="flex-1">
                        <Progress 
                          value={(inspection.checklist.filter(item => item.status === 'pass').length / inspection.checklist.length) * 100}
                          className="h-2"
                        />
                      </div>
                      <span className="text-muted-foreground">
                        {inspection.checklist.filter(item => item.status === 'pass').length} / {inspection.checklist.length}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Inspection Details Modal */}
      {selectedInspection && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">{selectedInspection.jobTitle}</h2>
                <p className="text-muted-foreground">Inspector: {selectedInspection.inspector}</p>
              </div>
              <Button 
                variant="ghost" 
                onClick={() => setSelectedInspection(null)}
              >
                ×
              </Button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Inspection Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold">{selectedInspection.score}%</p>
                    <p className="text-sm text-muted-foreground">Quality Score</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="flex justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < selectedInspection.customerSatisfaction
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">Customer Rating</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Badge className={getStatusColor(selectedInspection.status)}>
                      {selectedInspection.status}
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-2">Status</p>
                  </CardContent>
                </Card>
              </div>

              {/* Checklist */}
              {selectedInspection.checklist.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Quality Checklist</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedInspection.checklist.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            {getCheckItemIcon(item.status)}
                            <div>
                              <p className="font-medium">{item.item}</p>
                              <p className="text-sm text-muted-foreground">
                                {item.category} {item.required && <span className="text-red-500">*</span>}
                              </p>
                              {item.notes && (
                                <p className="text-xs text-muted-foreground mt-1">{item.notes}</p>
                              )}
                            </div>
                          </div>
                          <Badge variant="outline" className="capitalize">
                            {item.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Notes */}
              {selectedInspection.notes && (
                <Card>
                  <CardHeader>
                    <CardTitle>Inspector Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{selectedInspection.notes}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}

      {/* New Inspection Modal */}
      {showNewInspection && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold">Create New Inspection</h2>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowNewInspection(false)}
              >
                ×
              </Button>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Job</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a job" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="j1">Kitchen Renovation - Smith</SelectItem>
                      <SelectItem value="j2">Bathroom Repair - Davis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Inspector</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select inspector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="i1">Mike Johnson</SelectItem>
                      <SelectItem value="i2">Sarah Wilson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Inspection Date</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea placeholder="Add inspection notes..." rows={3} />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowNewInspection(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  setShowNewInspection(false);
                  toast({
                    title: "Inspection Created",
                    description: "New quality inspection has been scheduled.",
                  });
                }}>
                  Create Inspection
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
