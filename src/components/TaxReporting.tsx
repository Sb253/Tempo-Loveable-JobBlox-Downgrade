
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Calculator, Calendar, Receipt } from "lucide-react";

interface TaxRecord {
  id: string;
  date: string;
  type: 'income' | 'expense' | 'depreciation';
  category: string;
  description: string;
  amount: number;
  taxDeductible: boolean;
  documentation: string;
}

const mockTaxRecords: TaxRecord[] = [
  {
    id: '1',
    date: '2024-12-15',
    type: 'income',
    category: 'Service Revenue',
    description: 'Kitchen Renovation Payment',
    amount: 15000,
    taxDeductible: false,
    documentation: 'Invoice INV-001'
  },
  {
    id: '2',
    date: '2024-12-14',
    type: 'expense',
    category: 'Materials',
    description: 'Lumber and Building Supplies',
    amount: 2450,
    taxDeductible: true,
    documentation: 'Receipt R-001'
  },
  {
    id: '3',
    date: '2024-12-13',
    type: 'expense',
    category: 'Equipment',
    description: 'Tool Rental',
    amount: 450,
    taxDeductible: true,
    documentation: 'Receipt R-002'
  }
];

export const TaxReporting = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedQuarter, setSelectedQuarter] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const filteredRecords = mockTaxRecords.filter(record => {
    const recordYear = new Date(record.date).getFullYear().toString();
    const recordQuarter = Math.ceil((new Date(record.date).getMonth() + 1) / 3);
    
    return recordYear === selectedYear &&
           (selectedQuarter === 'all' || recordQuarter.toString() === selectedQuarter) &&
           (selectedType === 'all' || record.type === selectedType);
  });

  const totalIncome = filteredRecords
    .filter(r => r.type === 'income')
    .reduce((sum, r) => sum + r.amount, 0);

  const totalExpenses = filteredRecords
    .filter(r => r.type === 'expense')
    .reduce((sum, r) => sum + r.amount, 0);

  const deductibleExpenses = filteredRecords
    .filter(r => r.type === 'expense' && r.taxDeductible)
    .reduce((sum, r) => sum + r.amount, 0);

  const netIncome = totalIncome - totalExpenses;
  const estimatedTax = Math.max(0, netIncome * 0.25); // Simplified 25% tax rate

  const generateReport = (reportType: string) => {
    console.log(`Generating ${reportType} report for ${selectedYear}`);
    // Would generate actual report file
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tax Reporting & Compliance</h2>
        <div className="flex gap-4">
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
          <Select value={selectedQuarter} onValueChange={setSelectedQuarter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Year</SelectItem>
              <SelectItem value="1">Q1</SelectItem>
              <SelectItem value="2">Q2</SelectItem>
              <SelectItem value="3">Q3</SelectItem>
              <SelectItem value="4">Q4</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tax Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <Receipt className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalIncome.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deductible Expenses</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">${deductibleExpenses.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Income</CardTitle>
            <Calculator className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">${netIncome.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estimated Tax</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">${estimatedTax.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Tax Reports & Forms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => generateReport('1099')}
            >
              <FileText className="h-6 w-6" />
              <span className="text-sm">Generate 1099</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => generateReport('quarterly')}
            >
              <Calendar className="h-6 w-6" />
              <span className="text-sm">Quarterly Report</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => generateReport('deductions')}
            >
              <Receipt className="h-6 w-6" />
              <span className="text-sm">Deductions Summary</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => generateReport('annual')}
            >
              <Download className="h-6 w-6" />
              <span className="text-sm">Annual Summary</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Records */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Tax Records ({filteredRecords.length})
            <div className="flex gap-2">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expenses</SelectItem>
                  <SelectItem value="depreciation">Depreciation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Tax Deductible</TableHead>
                <TableHead>Documentation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={record.type === 'income' ? 'default' : 'secondary'}>
                      {record.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{record.category}</TableCell>
                  <TableCell>{record.description}</TableCell>
                  <TableCell className={record.type === 'income' ? 'text-green-600' : ''}>
                    ${record.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {record.taxDeductible ? (
                      <Badge className="bg-green-100 text-green-800">Yes</Badge>
                    ) : (
                      <Badge variant="outline">No</Badge>
                    )}
                  </TableCell>
                  <TableCell>{record.documentation}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Compliance Reminders */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance Reminders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-semibold text-yellow-800">Quarterly Tax Payment Due</h4>
              <p className="text-sm text-yellow-700">Next quarterly payment due: January 15, 2025</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <h4 className="font-semibold text-blue-800">Document Retention</h4>
              <p className="text-sm text-blue-700">Ensure all receipts and invoices are properly filed for tax purposes</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
              <h4 className="font-semibold text-green-800">Business Expenses</h4>
              <p className="text-sm text-green-700">Review equipment purchases for potential depreciation deductions</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
