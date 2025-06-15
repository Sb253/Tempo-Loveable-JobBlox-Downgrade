
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, FileText, Send, DollarSign, Eye, Edit, Copy } from "lucide-react";
import { EstimateForm } from "./EstimateForm";
import { useToast } from "@/hooks/use-toast";

interface Estimate {
  id: string;
  estimateNumber: string;
  customer: string;
  jobTitle: string;
  total: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  issueDate: string;
  expiryDate: string;
  description: string;
}

const mockEstimates: Estimate[] = [
  {
    id: '1',
    estimateNumber: 'EST-001',
    customer: 'John Smith',
    jobTitle: 'Kitchen Renovation',
    total: 15000,
    status: 'sent',
    issueDate: '2024-12-15',
    expiryDate: '2025-01-15',
    description: 'Complete kitchen remodel including cabinets, countertops, and appliances'
  },
  {
    id: '2',
    estimateNumber: 'EST-002',
    customer: 'ABC Construction Inc.',
    jobTitle: 'Bathroom Remodel',
    total: 8500,
    status: 'accepted',
    issueDate: '2024-12-10',
    expiryDate: '2025-01-10',
    description: 'Master bathroom renovation with luxury fixtures'
  },
  {
    id: '3',
    estimateNumber: 'EST-003',
    customer: 'Sarah Johnson',
    jobTitle: 'Deck Installation',
    total: 12000,
    status: 'draft',
    issueDate: '2024-12-12',
    expiryDate: '2025-01-12',
    description: 'New wooden deck with railings and stairs'
  }
];

export const EstimateList = () => {
  const [estimates, setEstimates] = useState<Estimate[]>(mockEstimates);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEstimateForm, setShowEstimateForm] = useState(false);
  const [selectedEstimate, setSelectedEstimate] = useState<Estimate | null>(null);
  const { toast } = useToast();

  const filteredEstimates = estimates.filter(estimate =>
    estimate.estimateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    estimate.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    estimate.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleConvertToInvoice = (estimate: Estimate) => {
    toast({
      title: "Converting to Invoice",
      description: `Estimate ${estimate.estimateNumber} will be converted to an invoice.`,
    });
    // Logic to convert estimate to invoice would go here
  };

  const handleDuplicate = (estimate: Estimate) => {
    const newEstimate = {
      ...estimate,
      id: Date.now().toString(),
      estimateNumber: `EST-${Date.now()}`,
      status: 'draft' as const,
      issueDate: new Date().toISOString().split('T')[0]
    };
    setEstimates(prev => [...prev, newEstimate]);
    toast({
      title: "Estimate Duplicated",
      description: `Created ${newEstimate.estimateNumber} from ${estimate.estimateNumber}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Estimates</h2>
        <Button onClick={() => setShowEstimateForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Estimate
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Estimates</CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by estimate number, customer, or job..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Estimates ({filteredEstimates.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Estimate #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Job Title</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEstimates.map((estimate) => (
                <TableRow key={estimate.id}>
                  <TableCell className="font-medium">{estimate.estimateNumber}</TableCell>
                  <TableCell>{estimate.customer}</TableCell>
                  <TableCell>{estimate.jobTitle}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      {estimate.total.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(estimate.status)}>
                      {estimate.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(estimate.issueDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(estimate.expiryDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedEstimate(estimate);
                          setShowEstimateForm(true);
                        }}
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDuplicate(estimate)}
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Duplicate
                      </Button>
                      {estimate.status === 'accepted' && (
                        <Button 
                          variant="default" 
                          size="sm"
                          onClick={() => handleConvertToInvoice(estimate)}
                        >
                          Convert to Invoice
                        </Button>
                      )}
                      {estimate.status === 'draft' && (
                        <Button variant="default" size="sm">
                          <Send className="h-3 w-3 mr-1" />
                          Send
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {showEstimateForm && (
        <EstimateForm 
          onClose={() => {
            setShowEstimateForm(false);
            setSelectedEstimate(null);
          }} 
          estimate={selectedEstimate}
        />
      )}
    </div>
  );
};
