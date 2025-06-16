
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Calendar, DollarSign, FileText } from "lucide-react";
import { ExpenseForm } from "./ExpenseForm";

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  vendor: string;
  jobId?: string;
  status: 'pending' | 'approved' | 'reimbursed';
}

const mockExpenses: Expense[] = [
  {
    id: '1',
    description: 'Lumber for kitchen project',
    amount: 450.00,
    category: 'materials',
    date: '2024-12-15',
    vendor: 'Home Depot',
    jobId: 'kitchen-001',
    status: 'approved'
  },
  {
    id: '2',
    description: 'Fuel for work truck',
    amount: 85.50,
    category: 'transportation',
    date: '2024-12-14',
    vendor: 'Shell Gas Station',
    status: 'pending'
  },
  {
    id: '3',
    description: 'Safety equipment',
    amount: 120.00,
    category: 'equipment',
    date: '2024-12-13',
    vendor: 'Safety Supply Co',
    status: 'reimbursed'
  }
];

export const ExpenseList = () => {
  const [expenses] = useState<Expense[]>(mockExpenses);
  const [searchTerm, setSearchTerm] = useState('');
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  const filteredExpenses = expenses.filter(expense =>
    expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'reimbursed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'materials': return 'bg-purple-100 text-purple-800';
      case 'labor': return 'bg-blue-100 text-blue-800';
      case 'equipment': return 'bg-orange-100 text-orange-800';
      case 'transportation': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Expense Management</h2>
        <Button onClick={() => setShowExpenseForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Expense
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">${totalExpenses.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Total Expenses</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{expenses.length}</p>
                <p className="text-sm text-muted-foreground">Total Records</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{expenses.filter(e => e.status === 'pending').length}</p>
                <p className="text-sm text-muted-foreground">Pending Approval</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">
                  ${expenses.filter(e => e.status === 'approved').reduce((sum, e) => sum + e.amount, 0).toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">Approved Amount</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Expenses</CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by description, vendor, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Expenses ({filteredExpenses.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExpenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      {expense.amount.toFixed(2)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getCategoryColor(expense.category)}>
                      {expense.category}
                    </Badge>
                  </TableCell>
                  <TableCell>{expense.vendor}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(expense.date).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(expense.status)}>
                      {expense.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {showExpenseForm && (
        <ExpenseForm onClose={() => setShowExpenseForm(false)} />
      )}
    </div>
  );
};
