
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, FileText, Send, DollarSign } from "lucide-react";
import { EstimateForm } from "./EstimateForm";

interface Estimate {
  id: string;
  estimateNumber: string;
  customer: string;
  projectTitle: string;
  total: number;
  status: 'draft' | 'sent' | 'viewed' | 'approved' | 'declined';
  createdDate: string;
  validUntil: string;
}

const mockEstimates: Estimate[] = [
  {
    id: '1',
    estimateNumber: 'EST-001',
    customer: 'John Smith',
    projectTitle: 'Kitchen Renovation',
    total: 15000,
    status: 'sent',
    createdDate: '2024-12-15',
    validUntil: '2024-12-30'
  },
  {
    id: '2',
    estimateNumber: 'EST-002',
    customer: 'ABC Construction Inc.',
    projectTitle: 'Bathroom Remodel',
    total: 8500,
    status: 'approved',
    createdDate: '2024-12-14',
    validUntil: '2024-12-29'
  },
  {
    id: '3',
    estimateNumber: 'EST-003',
    customer: 'Sarah Johnson',
    projectTitle: 'Deck Installation',
    total: 12000,
    status: 'draft',
    createdDate: '2024-12-16',
    validUntil: '2024-12-31'
  }
];

export const EstimateList = () => {
  const [estimates] = useState<Estimate[]>(mockEstimates);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEstimateForm, setShowEstimateForm] = useState(false);

  const filteredEstimates = estimates.filter(estimate =>
    estimate.estimateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    estimate.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    estimate.projectTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'viewed': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'declined': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Estimates & Quotes</h2>
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
              placeholder="Search by estimate number, customer, or project..."
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
                <TableHead>Project</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Valid Until</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEstimates.map((estimate) => (
                <TableRow key={estimate.id}>
                  <TableCell className="font-medium">{estimate.estimateNumber}</TableCell>
                  <TableCell>{estimate.customer}</TableCell>
                  <TableCell>{estimate.projectTitle}</TableCell>
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
                  <TableCell>{new Date(estimate.createdDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(estimate.validUntil).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <FileText className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
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
        <EstimateForm onClose={() => setShowEstimateForm(false)} />
      )}
    </div>
  );
};
