
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CreditCard, DollarSign, AlertCircle, CheckCircle, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Payment {
  id: string;
  invoiceNumber: string;
  customer: string;
  amount: number;
  method: 'credit_card' | 'bank_transfer' | 'check' | 'cash';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  date: string;
  transactionId?: string;
}

const mockPayments: Payment[] = [
  {
    id: '1',
    invoiceNumber: 'INV-001',
    customer: 'John Smith',
    amount: 15000,
    method: 'credit_card',
    status: 'completed',
    date: '2024-12-15',
    transactionId: 'txn_1234567890'
  },
  {
    id: '2',
    invoiceNumber: 'INV-002',
    customer: 'ABC Construction Inc.',
    amount: 8500,
    method: 'bank_transfer',
    status: 'processing',
    date: '2024-12-14'
  },
  {
    id: '3',
    invoiceNumber: 'INV-003',
    customer: 'Sarah Johnson',
    amount: 12000,
    method: 'check',
    status: 'pending',
    date: '2024-12-13'
  }
];

export const PaymentProcessing = () => {
  const { toast } = useToast();
  const [payments] = useState<Payment[]>(mockPayments);
  const [showProcessForm, setShowProcessForm] = useState(false);
  const [formData, setFormData] = useState({
    invoiceNumber: '',
    amount: '',
    method: 'credit_card',
    customerEmail: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'credit_card': return <CreditCard className="h-4 w-4" />;
      case 'bank_transfer': return <DollarSign className="h-4 w-4" />;
      default: return <DollarSign className="h-4 w-4" />;
    }
  };

  const handleProcessPayment = () => {
    console.log('Processing payment:', formData);
    
    toast({
      title: "Payment Processing",
      description: "Payment has been initiated. You will be redirected to the payment gateway.",
    });

    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: "Payment Successful",
        description: `Payment of $${formData.amount} has been processed successfully.`,
      });
      setShowProcessForm(false);
      setFormData({ invoiceNumber: '', amount: '', method: 'credit_card', customerEmail: '' });
    }, 2000);
  };

  const totalProcessed = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingAmount = payments
    .filter(p => p.status === 'pending' || p.status === 'processing')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Payment Processing</h2>
        <Button onClick={() => setShowProcessForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Process Payment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Processed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalProcessed.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending/Processing</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">${pendingAmount.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {Math.round((payments.filter(p => p.status === 'completed').length / payments.length) * 100)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {showProcessForm && (
        <Card>
          <CardHeader>
            <CardTitle>Process New Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="invoiceNumber">Invoice Number</Label>
                <Input
                  id="invoiceNumber"
                  value={formData.invoiceNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, invoiceNumber: e.target.value }))}
                  placeholder="INV-001"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerEmail">Customer Email</Label>
                <Input
                  id="customerEmail"
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, customerEmail: e.target.value }))}
                  placeholder="customer@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="method">Payment Method</Label>
                <select 
                  id="method"
                  value={formData.method}
                  onChange={(e) => setFormData(prev => ({ ...prev, method: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="credit_card">Credit Card</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="check">Check</option>
                  <option value="cash">Cash</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={handleProcessPayment} className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Process Payment
              </Button>
              <Button variant="outline" onClick={() => setShowProcessForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Recent Payments ({payments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.invoiceNumber}</TableCell>
                  <TableCell>{payment.customer}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      {payment.amount.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getMethodIcon(payment.method)}
                      {payment.method.replace('_', ' ')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(payment.status)}>
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                  <TableCell className="font-mono text-sm">
                    {payment.transactionId || '-'}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      {payment.status === 'failed' && (
                        <Button variant="outline" size="sm">
                          Retry
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
    </div>
  );
};
