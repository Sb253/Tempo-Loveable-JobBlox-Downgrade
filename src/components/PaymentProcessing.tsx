
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, DollarSign, AlertCircle, CheckCircle, Plus, Smartphone, Banknote, Receipt, Calculator } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Payment {
  id: string;
  invoiceNumber: string;
  customer: string;
  amount: number;
  method: 'credit_card' | 'debit_card' | 'bank_transfer' | 'check' | 'cash' | 'mobile_payment' | 'financing';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  date: string;
  transactionId?: string;
  financingTerm?: string;
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
    method: 'mobile_payment',
    status: 'processing',
    date: '2024-12-14'
  },
  {
    id: '3',
    invoiceNumber: 'INV-003',
    customer: 'Sarah Johnson',
    amount: 12000,
    method: 'financing',
    status: 'completed',
    date: '2024-12-13',
    financingTerm: '12 months'
  },
  {
    id: '4',
    invoiceNumber: 'INV-004',
    customer: 'Mike Wilson',
    amount: 2500,
    method: 'cash',
    status: 'completed',
    date: '2024-12-12'
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
    customerEmail: '',
    financingTerm: ''
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
      case 'credit_card':
      case 'debit_card':
        return <CreditCard className="h-4 w-4" />;
      case 'mobile_payment':
        return <Smartphone className="h-4 w-4" />;
      case 'cash':
        return <Banknote className="h-4 w-4" />;
      case 'check':
        return <Receipt className="h-4 w-4" />;
      case 'financing':
        return <Calculator className="h-4 w-4" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  const handleProcessPayment = () => {
    console.log('Processing payment:', formData);
    
    const methodDescription = formData.method === 'financing' 
      ? `financing (${formData.financingTerm})` 
      : formData.method.replace('_', ' ');
    
    toast({
      title: "Payment Processing",
      description: `Processing ${methodDescription} payment of $${formData.amount}`,
    });

    setTimeout(() => {
      toast({
        title: "Payment Successful",
        description: `Payment of $${formData.amount} via ${methodDescription} has been processed.`,
      });
      setShowProcessForm(false);
      setFormData({ invoiceNumber: '', amount: '', method: 'credit_card', customerEmail: '', financingTerm: '' });
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

      {/* Payment Stats */}
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

      {/* Payment Processing Form */}
      {showProcessForm && (
        <Card>
          <CardHeader>
            <CardTitle>Process New Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="standard" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="standard">Standard Payment</TabsTrigger>
                <TabsTrigger value="mobile">Mobile Payment</TabsTrigger>
                <TabsTrigger value="financing">Financing</TabsTrigger>
              </TabsList>
              
              <TabsContent value="standard" className="space-y-4">
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
                      <option value="debit_card">Debit Card</option>
                      <option value="bank_transfer">Bank Transfer</option>
                      <option value="check">Check</option>
                      <option value="cash">Cash</option>
                    </select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="mobile" className="space-y-4">
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
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Mobile Payment Options</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Smartphone className="h-4 w-4 mr-2" />
                      Card Reader (Tap/Chip/Swipe)
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Manual Card Entry
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Banknote className="h-4 w-4 mr-2" />
                      Cash Payment
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="financing" className="space-y-4">
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
                    <Label htmlFor="financingTerm">Financing Term</Label>
                    <select 
                      id="financingTerm"
                      value={formData.financingTerm}
                      onChange={(e) => setFormData(prev => ({ ...prev, financingTerm: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="">Select Term</option>
                      <option value="6 months">6 months (0% APR)</option>
                      <option value="12 months">12 months (5.9% APR)</option>
                      <option value="24 months">24 months (8.9% APR)</option>
                      <option value="36 months">36 months (12.9% APR)</option>
                    </select>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Financing Partners</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Calculator className="h-4 w-4 mr-2" />
                      Synchrony Financial
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Calculator className="h-4 w-4 mr-2" />
                      GreenSky Financing
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Calculator className="h-4 w-4 mr-2" />
                      Affirm
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

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

      {/* Recent Payments Table */}
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
                <TableHead>Details</TableHead>
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
                  <TableCell className="text-sm">
                    {payment.transactionId && (
                      <div>ID: {payment.transactionId}</div>
                    )}
                    {payment.financingTerm && (
                      <div>Term: {payment.financingTerm}</div>
                    )}
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
