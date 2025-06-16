
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Receipt, Calculator, TrendingUp, FileText, DollarSign, AlertCircle } from "lucide-react";

export const TaxAndFinancialSection = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Tax & Financial Management</h2>
        <p className="text-muted-foreground">Handle tax reporting, financial analysis, and compliance</p>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">$245,680</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tax Owed</p>
                <p className="text-2xl font-bold">$18,426</p>
              </div>
              <Receipt className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Deductions</p>
                <p className="text-2xl font-bold">$32,150</p>
              </div>
              <Calculator className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Profit Margin</p>
                <p className="text-2xl font-bold">24.5%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tax Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              Tax Reporting
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Q4 2023 Sales Tax</p>
                <p className="text-sm text-muted-foreground">Due: Jan 31, 2024</p>
              </div>
              <Badge variant="destructive">Overdue</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">2023 Income Tax</p>
                <p className="text-sm text-muted-foreground">Due: Apr 15, 2024</p>
              </div>
              <Badge variant="secondary">Pending</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Payroll Tax Q1</p>
                <p className="text-sm text-muted-foreground">Due: Apr 30, 2024</p>
              </div>
              <Badge variant="outline">Upcoming</Badge>
            </div>

            <Button className="w-full">Generate Tax Reports</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Financial Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Revenue Growth</span>
                <span className="text-sm font-medium text-green-600">+12.5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Expense Ratio</span>
                <span className="text-sm font-medium">68.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Cash Flow</span>
                <span className="text-sm font-medium text-green-600">Positive</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">ROI</span>
                <span className="text-sm font-medium">18.7%</span>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              <FileText className="h-4 w-4 mr-2" />
              Detailed Report
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Alerts and Reminders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Financial Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <p className="font-medium text-red-800">Sales Tax Payment Overdue</p>
                <p className="text-sm text-red-600">Q4 2023 sales tax payment is 15 days overdue. Please remit payment immediately to avoid penalties.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-800">Tax Document Preparation</p>
                <p className="text-sm text-yellow-600">Annual tax filing deadline is approaching. Ensure all financial documents are organized and reviewed.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
