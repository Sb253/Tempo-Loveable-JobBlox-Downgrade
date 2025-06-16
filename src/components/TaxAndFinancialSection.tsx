
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Receipt, DollarSign, TrendingUp, FileText, Calculator, PieChart, BarChart3, Download } from "lucide-react";

interface TaxRecord {
  id: string;
  year: number;
  quarter: string;
  type: string;
  amount: number;
  status: 'pending' | 'filed' | 'paid';
  dueDate: string;
}

interface FinancialSummary {
  revenue: number;
  expenses: number;
  profit: number;
  taxes: number;
  period: string;
}

export const TaxAndFinancialSection = () => {
  const [taxRecords] = useState<TaxRecord[]>([
    {
      id: '1',
      year: 2024,
      quarter: 'Q1',
      type: 'Federal Income Tax',
      amount: 12500,
      status: 'paid',
      dueDate: '2024-04-15'
    },
    {
      id: '2',
      year: 2024,
      quarter: 'Q2',
      type: 'State Sales Tax',
      amount: 3200,
      status: 'filed',
      dueDate: '2024-07-31'
    },
    {
      id: '3',
      year: 2024,
      quarter: 'Q3',
      type: 'Payroll Tax',
      amount: 8900,
      status: 'pending',
      dueDate: '2024-10-15'
    }
  ]);

  const [financialSummary] = useState<FinancialSummary>({
    revenue: 485000,
    expenses: 320000,
    profit: 165000,
    taxes: 24750,
    period: 'Year to Date 2024'
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      filed: { color: 'bg-blue-100 text-blue-800', label: 'Filed' },
      paid: { color: 'bg-green-100 text-green-800', label: 'Paid' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  const handleExportReport = (reportType: string) => {
    console.log(`Exporting ${reportType} report`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tax & Financial Management</h1>
          <p className="text-muted-foreground">Comprehensive tax filing and financial reporting</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Reports
          </Button>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            New Tax Filing
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Financial Overview</TabsTrigger>
          <TabsTrigger value="tax-filings">Tax Filings</TabsTrigger>
          <TabsTrigger value="reports">Financial Reports</TabsTrigger>
          <TabsTrigger value="analytics">Advanced Analytics</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  ${financialSummary.revenue.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">{financialSummary.period}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                <Receipt className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  ${financialSummary.expenses.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">{financialSummary.period}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  ${financialSummary.profit.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">{financialSummary.period}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tax Liability</CardTitle>
                <Calculator className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  ${financialSummary.taxes.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">{financialSummary.period}</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Expense Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Labor Costs</span>
                    <span className="font-medium">$128,000 (40%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Materials</span>
                    <span className="font-medium">$96,000 (30%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Equipment</span>
                    <span className="font-medium">$64,000 (20%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Overhead</span>
                    <span className="font-medium">$32,000 (10%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Monthly Revenue Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>January</span>
                    <span className="font-medium">$42,500</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>February</span>
                    <span className="font-medium">$38,200</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>March</span>
                    <span className="font-medium">$45,800</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>April</span>
                    <span className="font-medium">$52,100</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tax-filings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5" />
                Tax Filings & Compliance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {taxRecords.map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{record.type}</h3>
                      <p className="text-sm text-muted-foreground">
                        {record.year} {record.quarter} • Due: {record.dueDate}
                      </p>
                      <p className="text-sm font-medium">${record.amount.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      {getStatusBadge(record.status)}
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Financial Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Report Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="profit-loss">Profit & Loss Statement</SelectItem>
                      <SelectItem value="balance-sheet">Balance Sheet</SelectItem>
                      <SelectItem value="cash-flow">Cash Flow Statement</SelectItem>
                      <SelectItem value="tax-summary">Tax Summary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Period</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current-month">Current Month</SelectItem>
                      <SelectItem value="current-quarter">Current Quarter</SelectItem>
                      <SelectItem value="current-year">Current Year</SelectItem>
                      <SelectItem value="previous-year">Previous Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full" onClick={() => handleExportReport('financial')}>
                  <Download className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tax Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start" onClick={() => handleExportReport('tax-summary')}>
                  <FileText className="mr-2 h-4 w-4" />
                  Annual Tax Summary
                </Button>
                <Button className="w-full justify-start" onClick={() => handleExportReport('quarterly-estimates')}>
                  <Calculator className="mr-2 h-4 w-4" />
                  Quarterly Estimates
                </Button>
                <Button className="w-full justify-start" onClick={() => handleExportReport('deductions')}>
                  <Receipt className="mr-2 h-4 w-4" />
                  Deductions Report
                </Button>
                <Button className="w-full justify-start" onClick={() => handleExportReport('1099')}>
                  <FileText className="mr-2 h-4 w-4" />
                  1099 Contractor Forms
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Advanced Financial Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Advanced analytics and financial forecasting tools will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Compliance & Audit Trail
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Compliance monitoring and audit trail functionality will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
