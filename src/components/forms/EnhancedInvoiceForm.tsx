import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { FileText, DollarSign, Calendar, User, Plus, Trash2 } from "lucide-react";

interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
  taxable: boolean;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  jobId?: string;
  issueDate: string;
  dueDate: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  lineItems: InvoiceLineItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discountPercent: number;
  discountAmount: number;
  total: number;
  notes: string;
  terms: string;
  paymentMethod: string;
  paidDate?: string;
  paidAmount: number;
}

interface EnhancedInvoiceFormProps {
  invoice?: Invoice;
  onSave: (invoice: Invoice) => void;
  onCancel: () => void;
}

export const EnhancedInvoiceForm = ({ invoice, onSave, onCancel }: EnhancedInvoiceFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<Invoice>>({
    invoiceNumber: invoice?.invoiceNumber || `INV-${Date.now()}`,
    customerId: invoice?.customerId || '',
    customerName: invoice?.customerName || '',
    customerEmail: invoice?.customerEmail || '',
    jobId: invoice?.jobId || '',
    issueDate: invoice?.issueDate || new Date().toISOString().split('T')[0],
    dueDate: invoice?.dueDate || '',
    status: invoice?.status || 'draft',
    lineItems: invoice?.lineItems || [
      {
        id: `item-${Date.now()}`,
        description: '',
        quantity: 1,
        rate: 0,
        amount: 0,
        taxable: true
      }
    ],
    subtotal: invoice?.subtotal || 0,
    taxRate: invoice?.taxRate || 8.5,
    taxAmount: invoice?.taxAmount || 0,
    discountPercent: invoice?.discountPercent || 0,
    discountAmount: invoice?.discountAmount || 0,
    total: invoice?.total || 0,
    notes: invoice?.notes || '',
    terms: invoice?.terms || 'Payment due within 30 days',
    paymentMethod: invoice?.paymentMethod || '',
    paidAmount: invoice?.paidAmount || 0
  });

  const customers = [
    { id: 'cust-1', name: 'John Smith', email: 'john@email.com' },
    { id: 'cust-2', name: 'ABC Construction Inc.', email: 'billing@abc.com' },
    { id: 'cust-3', name: 'Sarah Johnson', email: 'sarah@email.com' },
    { id: 'cust-4', name: 'Metro Properties', email: 'accounts@metro.com' }
  ];

  const jobs = [
    { id: 'job-1', title: 'Kitchen Renovation', customerId: 'cust-1' },
    { id: 'job-2', title: 'Bathroom Repair', customerId: 'cust-2' },
    { id: 'job-3', title: 'Deck Installation', customerId: 'cust-3' },
    { id: 'job-4', title: 'Office Renovation', customerId: 'cust-4' }
  ];

  // Calculate totals whenever line items or tax/discount change
  useEffect(() => {
    calculateTotals();
  }, [formData.lineItems, formData.taxRate, formData.discountPercent]);

  const calculateTotals = () => {
    const lineItems = formData.lineItems || [];
    const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0);
    const taxableAmount = lineItems.filter(item => item.taxable).reduce((sum, item) => sum + item.amount, 0);
    const taxAmount = (taxableAmount * (formData.taxRate || 0)) / 100;
    const discountAmount = (subtotal * (formData.discountPercent || 0)) / 100;
    const total = subtotal + taxAmount - discountAmount;

    setFormData(prev => ({
      ...prev,
      subtotal,
      taxAmount,
      discountAmount,
      total
    }));
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCustomerChange = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId);
    if (customer) {
      setFormData(prev => ({
        ...prev,
        customerId,
        customerName: customer.name,
        customerEmail: customer.email,
        jobId: '' // Reset job selection when customer changes
      }));
    }
  };

  const addLineItem = () => {
    setFormData(prev => ({
      ...prev,
      lineItems: [
        ...(prev.lineItems || []),
        {
          id: `item-${Date.now()}`,
          description: '',
          quantity: 1,
          rate: 0,
          amount: 0,
          taxable: true
        }
      ]
    }));
  };

  const updateLineItem = (index: number, field: keyof InvoiceLineItem, value: string | number | boolean) => {
    setFormData(prev => {
      const lineItems = [...(prev.lineItems || [])];
      const item = { ...lineItems[index] };
      
      // Type-safe assignment based on field type
      switch (field) {
        case 'description':
          item.description = value as string;
          break;
        case 'quantity':
          item.quantity = value as number;
          break;
        case 'rate':
          item.rate = value as number;
          break;
        case 'amount':
          item.amount = value as number;
          break;
        case 'taxable':
          item.taxable = value as boolean;
          break;
        case 'id':
          item.id = value as string;
          break;
      }
      
      // Recalculate amount when quantity or rate changes
      if (field === 'quantity' || field === 'rate') {
        item.amount = item.quantity * item.rate;
      }
      
      lineItems[index] = item;
      
      return {
        ...prev,
        lineItems
      };
    });
  };

  const removeLineItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      lineItems: prev.lineItems?.filter((_, i) => i !== index) || []
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customerId || !formData.issueDate || !formData.dueDate) {
      toast({
        title: "Validation Error",
        description: "Customer, issue date, and due date are required fields.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.lineItems || formData.lineItems.length === 0) {
      toast({
        title: "Validation Error",
        description: "At least one line item is required.",
        variant: "destructive"
      });
      return;
    }

    const invoiceData: Invoice = {
      id: invoice?.id || `inv-${Date.now()}`,
      invoiceNumber: formData.invoiceNumber!,
      customerId: formData.customerId!,
      customerName: formData.customerName!,
      customerEmail: formData.customerEmail!,
      jobId: formData.jobId,
      issueDate: formData.issueDate!,
      dueDate: formData.dueDate!,
      status: formData.status!,
      lineItems: formData.lineItems!,
      subtotal: formData.subtotal!,
      taxRate: formData.taxRate!,
      taxAmount: formData.taxAmount!,
      discountPercent: formData.discountPercent!,
      discountAmount: formData.discountAmount!,
      total: formData.total!,
      notes: formData.notes!,
      terms: formData.terms!,
      paymentMethod: formData.paymentMethod!,
      paidDate: formData.paidDate,
      paidAmount: formData.paidAmount!
    };

    onSave(invoiceData);
    
    toast({
      title: invoice ? "Invoice Updated" : "Invoice Created",
      description: `Invoice ${invoiceData.invoiceNumber} has been ${invoice ? 'updated' : 'created'} successfully.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'default';
      case 'sent': return 'secondary';
      case 'overdue': return 'destructive';
      case 'cancelled': return 'destructive';
      default: return 'outline';
    }
  };

  const availableJobs = jobs.filter(job => job.customerId === formData.customerId);

  return (
    <Card className="max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            {invoice ? 'Edit Invoice' : 'New Invoice'}
            <span className="text-sm font-normal text-muted-foreground">
              {formData.invoiceNumber}
            </span>
          </div>
          {invoice && (
            <Badge variant={getStatusColor(invoice.status)}>
              {invoice.status}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Header Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="invoiceNumber">Invoice Number</Label>
              <Input
                id="invoiceNumber"
                value={formData.invoiceNumber}
                onChange={(e) => handleInputChange('invoiceNumber', e.target.value)}
                placeholder="INV-001"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="issueDate" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Issue Date *
              </Label>
              <Input
                id="issueDate"
                type="date"
                value={formData.issueDate}
                onChange={(e) => handleInputChange('issueDate', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Due Date *
              </Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleInputChange('dueDate', e.target.value)}
                required
              />
            </div>
          </div>

          {/* Customer and Job Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customerId" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Customer *
              </Label>
              <Select 
                value={formData.customerId} 
                onValueChange={handleCustomerChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobId">Related Job (Optional)</Label>
              <Select 
                value={formData.jobId} 
                onValueChange={(value) => handleInputChange('jobId', value)}
                disabled={!formData.customerId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select job" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No related job</SelectItem>
                  {availableJobs.map((job) => (
                    <SelectItem key={job.id} value={job.id}>
                      {job.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => handleInputChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select 
                value={formData.paymentMethod} 
                onValueChange={(value) => handleInputChange('paymentMethod', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="check">Check</SelectItem>
                  <SelectItem value="credit_card">Credit Card</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="online">Online Payment</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Line Items */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Line Items</h3>
              <Button type="button" onClick={addLineItem} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-12 gap-2 text-sm font-medium text-muted-foreground">
                <div className="col-span-5">Description</div>
                <div className="col-span-1">Qty</div>
                <div className="col-span-2">Rate</div>
                <div className="col-span-2">Amount</div>
                <div className="col-span-1">Tax</div>
                <div className="col-span-1">Action</div>
              </div>

              {formData.lineItems?.map((item, index) => (
                <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-5">
                    <Input
                      placeholder="Item description"
                      value={item.description}
                      onChange={(e) => updateLineItem(index, 'description', e.target.value)}
                    />
                  </div>
                  <div className="col-span-1">
                    <Input
                      type="number"
                      placeholder="1"
                      value={item.quantity}
                      onChange={(e) => updateLineItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={item.rate}
                      onChange={(e) => updateLineItem(index, 'rate', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      type="number"
                      value={item.amount.toFixed(2)}
                      readOnly
                      className="bg-muted"
                    />
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <Checkbox
                      checked={item.taxable}
                      onCheckedChange={(checked) => updateLineItem(index, 'taxable', checked)}
                    />
                  </div>
                  <div className="col-span-1">
                    <Button
                      type="button"
                      onClick={() => removeLineItem(index)}
                      variant="destructive"
                      size="sm"
                      disabled={formData.lineItems?.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Totals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="terms">Payment Terms</Label>
                <Textarea
                  id="terms"
                  value={formData.terms}
                  onChange={(e) => handleInputChange('terms', e.target.value)}
                  placeholder="Payment terms and conditions"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Additional notes"
                  rows={3}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="taxRate">Tax Rate (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    step="0.1"
                    value={formData.taxRate}
                    onChange={(e) => handleInputChange('taxRate', parseFloat(e.target.value) || 0)}
                    placeholder="8.5"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discountPercent">Discount (%)</Label>
                  <Input
                    id="discountPercent"
                    type="number"
                    step="0.1"
                    value={formData.discountPercent}
                    onChange={(e) => handleInputChange('discountPercent', parseFloat(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="space-y-2 bg-muted p-4 rounded">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${formData.subtotal?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax ({formData.taxRate}%):</span>
                  <span>${formData.taxAmount?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount ({formData.discountPercent}%):</span>
                  <span>-${formData.discountAmount?.toFixed(2) || '0.00'}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    {formData.total?.toFixed(2) || '0.00'}
                  </span>
                </div>
              </div>

              {formData.status === 'paid' && (
                <div className="space-y-2">
                  <Label htmlFor="paidAmount">Paid Amount</Label>
                  <Input
                    id="paidAmount"
                    type="number"
                    step="0.01"
                    value={formData.paidAmount}
                    onChange={(e) => handleInputChange('paidAmount', parseFloat(e.target.value) || 0)}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {invoice ? 'Update Invoice' : 'Create Invoice'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
