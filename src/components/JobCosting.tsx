
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, Plus, DollarSign, Clock, Users, Package } from "lucide-react";

interface JobCostItem {
  id: string;
  type: 'material' | 'labor' | 'equipment' | 'overhead';
  description: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  vendor?: string;
  date: string;
}

interface JobCost {
  id: string;
  jobName: string;
  customer: string;
  estimatedCost: number;
  actualCost: number;
  revenue: number;
  profit: number;
  profitMargin: number;
  status: 'planned' | 'in-progress' | 'completed';
  items: JobCostItem[];
}

const mockJobCosts: JobCost[] = [
  {
    id: '1',
    jobName: 'Kitchen Renovation - Smith House',
    customer: 'John Smith',
    estimatedCost: 8500,
    actualCost: 9200,
    revenue: 15000,
    profit: 5800,
    profitMargin: 38.67,
    status: 'completed',
    items: [
      {
        id: '1',
        type: 'material',
        description: 'Cabinets and Hardware',
        quantity: 1,
        unitCost: 4500,
        totalCost: 4500,
        vendor: 'Cabinet Depot',
        date: '2024-12-01'
      },
      {
        id: '2',
        type: 'labor',
        description: 'Installation Labor',
        quantity: 32,
        unitCost: 85,
        totalCost: 2720,
        date: '2024-12-05'
      }
    ]
  }
];

export const JobCosting = () => {
  const [jobCosts] = useState<JobCost[]>(mockJobCosts);
  const [selectedJob, setSelectedJob] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = jobCosts.filter(job => {
    const matchesSearch = job.jobName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesJob = selectedJob === 'all' || job.id === selectedJob;
    return matchesSearch && matchesJob;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planned': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProfitMarginColor = (margin: number) => {
    if (margin >= 30) return 'text-green-600';
    if (margin >= 15) return 'text-yellow-600';
    return 'text-red-600';
  };

  const totalEstimated = filteredJobs.reduce((sum, job) => sum + job.estimatedCost, 0);
  const totalActual = filteredJobs.reduce((sum, job) => sum + job.actualCost, 0);
  const totalRevenue = filteredJobs.reduce((sum, job) => sum + job.revenue, 0);
  const totalProfit = filteredJobs.reduce((sum, job) => sum + job.profit, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Job Costing & Profitability</h2>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Job Cost
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Actual Costs</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalActual.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">
              vs ${totalEstimated.toLocaleString()} estimated
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalProfit.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Profit Margin</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getProfitMarginColor(totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0)}`}>
              {totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100).toFixed(1) : 0}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Jobs</CardTitle>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedJob} onValueChange={setSelectedJob}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jobs</SelectItem>
                {jobCosts.map(job => (
                  <SelectItem key={job.id} value={job.id}>
                    {job.jobName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </Card>

      {/* Job List */}
      <Card>
        <CardHeader>
          <CardTitle>Job Profitability Analysis ({filteredJobs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Name</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Estimated Cost</TableHead>
                <TableHead>Actual Cost</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Profit</TableHead>
                <TableHead>Margin</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.jobName}</TableCell>
                  <TableCell>{job.customer}</TableCell>
                  <TableCell>${job.estimatedCost.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      ${job.actualCost.toLocaleString()}
                      {job.actualCost > job.estimatedCost && (
                        <Badge variant="destructive" className="text-xs">
                          Over Budget
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>${job.revenue.toLocaleString()}</TableCell>
                  <TableCell className="text-green-600 font-medium">
                    ${job.profit.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${getProfitMarginColor(job.profitMargin)}`}>
                        {job.profitMargin.toFixed(1)}%
                      </span>
                      <Progress 
                        value={Math.min(job.profitMargin, 50)} 
                        className="w-16 h-2"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(job.status)}>
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detailed Cost Breakdown for Selected Job */}
      {selectedJob !== 'all' && (
        <Card>
          <CardHeader>
            <CardTitle>Cost Breakdown - {jobCosts.find(j => j.id === selectedJob)?.jobName}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit Cost</TableHead>
                  <TableHead>Total Cost</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobCosts.find(j => j.id === selectedJob)?.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Badge variant="outline">
                        {item.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>${item.unitCost.toLocaleString()}</TableCell>
                    <TableCell>${item.totalCost.toLocaleString()}</TableCell>
                    <TableCell>{item.vendor || 'N/A'}</TableCell>
                    <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
