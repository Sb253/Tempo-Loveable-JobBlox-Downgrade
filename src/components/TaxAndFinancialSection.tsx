
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calendar, DollarSign, FileText, TrendingUp, Calculator, Download, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TaxRecord {
  id: string;
  year: number;
  quarter: string;
  type: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
}

interface FinancialMetric {
  label: string;
  value: number;
  change: number;
  period: string;
}

export const TaxAndFinancialSection = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedYear, setSelectedYear] = useState('2024');

  const mockTaxRecords: TaxRecord[] = [
    {
      id: '1',
      year: 2024,
      quarter: 'Q1',
      type: 'Quarterly Estimated',
      amount: 15000,
      status: 'paid',
      dueDate: '2024-04-15'
    },
    {
      id: '2',
      year: 2024,
      quarter: 'Q2',
      type: 'Quarterly Estimated',
      amount: 18000,
      status: 'pending',
      dueDate: '2024-07-15'
    }
  ];

  const financialMetrics: FinancialMetric[] = [
    { label: 'Revenue', value: 485000, change: 12.5, period: 'YTD' },
    { label: 'Expenses', value: 325000, change: 8.2, period: 'YTD' },
    { label: 'Net Profit', value: 160000, change: 18.7, period: 'YTD' },
    { label: 'Tax Liability', value: 48000, change: 15.2, period: 'YTD' }
  ];

  const handleGenerateReport = (reportType: string) => {
    toast({
      title: "Report Generated",
      description: `${reportType} report has been generated and is ready for download.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Tax & Financial Management</h2>
          <p className="text-muted-foreground">Comprehensive tax planning and financial analytics</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => handleGenerateReport('Year-End Tax')} className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Generate Tax Report
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tax-planning">Tax Planning</TabsTrigger>
          <TabsTrigger value="financial-analysis">Financial Analysis</TabsTrigger>
          <TabsTrigger value="reports">Reports & Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Financial Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {financialMetrics.map((metric, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${metric.value.toLocaleString()}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +{metric.change}% {metric.period}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tax Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Tax Summary {selectedYear}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Period</TableHead>
                    <TableHead>Tax Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTaxRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.year} {record.quarter}</TableCell>
                      <TableCell>{record.type}</TableCell>
                      <TableCell>${record.amount.toLocaleString()}</TableCell>
                      <TableCell>{new Date(record.dueDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(record.status)}>
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tax-planning" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tax Planning Tools</CardTitle>
              <p className="text-sm text-muted-foreground">
                Plan and optimize your tax strategy throughout the year
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Estimated Tax Calculator</h3>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="quarterly-income">Quarterly Income</Label>
                      <Input id="quarterly-income" placeholder="$50,000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deductions">Estimated Deductions</Label>
                      <Input id="deductions" placeholder="$15,000" />
                    </div>
                    <Button className="w-full">Calculate Estimated Tax</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Tax Deduction Tracker</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Business Expenses</span>
                      <span className="font-medium">$12,450</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Vehicle Expenses</span>
                      <span className="font-medium">$8,200</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Equipment Depreciation</span>
                      <span className="font-medium">$5,600</span>
                    </div>
                    <div className="flex justify-between text-sm border-t pt-2 font-semibold">
                      <span>Total Deductions</span>
                      <span>$26,250</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">Add Deduction</Button>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">Tax Optimization Recommendations</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-900 dark:text-blue-100">Equipment Purchase Timing</p>
                      <p className="text-sm text-blue-700 dark:text-blue-200">
                        Consider purchasing equipment before year-end to maximize Section 179 deductions.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-900 dark:text-green-100">Retirement Contributions</p>
                      <p className="text-sm text-green-700 dark:text-green-200">
                        You can still contribute $15,000 to SEP-IRA to reduce current year tax liability.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial-analysis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Financial Analytics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h4 className="font-semibold">Profit Margin Analysis</h4>
                  <div className="text-2xl font-bold text-green-600">32.8%</div>
                  <p className="text-sm text-muted-foreground">Average profit margin this year</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Cash Flow Ratio</h4>
                  <div className="text-2xl font-bold text-blue-600">1.4</div>
                  <p className="text-sm text-muted-foreground">Current ratio (healthy: >1.2)</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">ROI</h4>
                  <div className="text-2xl font-bold text-purple-600">24.5%</div>
                  <p className="text-sm text-muted-foreground">Return on investment</p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-semibold mb-4">Cost Center Analysis</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Labor Costs</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 rounded">
                        <div className="w-16 h-2 bg-blue-500 rounded"></div>
                      </div>
                      <span className="text-sm font-medium">65%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Materials</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 rounded">
                        <div className="w-12 h-2 bg-green-500 rounded"></div>
                      </div>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Overhead</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 rounded">
                        <div className="w-6 h-2 bg-orange-500 rounded"></div>
                      </div>
                      <span className="text-sm font-medium">25%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Reports & Compliance</CardTitle>
              <p className="text-sm text-muted-foreground">
                Generate financial reports and ensure tax compliance
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Financial Reports</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-between" onClick={() => handleGenerateReport('Profit & Loss')}>
                      Profit & Loss Statement
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="w-full justify-between" onClick={() => handleGenerateReport('Cash Flow')}>
                      Cash Flow Statement
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="w-full justify-between" onClick={() => handleGenerateReport('Balance Sheet')}>
                      Balance Sheet
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Tax Reports</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-between" onClick={() => handleGenerateReport('1099 Forms')}>
                      1099 Forms
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="w-full justify-between" onClick={() => handleGenerateReport('Quarterly Tax')}>
                      Quarterly Tax Summary
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="w-full justify-between" onClick={() => handleGenerateReport('Annual Tax')}>
                      Annual Tax Report
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6 mt-6">
                <h4 className="font-semibold mb-4">Compliance Dashboard</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="font-medium">Sales Tax</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Filed for Q1 2024</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="font-medium">Payroll Tax</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Due in 5 days</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="font-medium">Workers Comp</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Current & compliant</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
