
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Calendar } from "lucide-react";

interface AdvancedInvoiceFormProps {
  onClose: () => void;
  invoice?: any;
}

interface PaymentPlan {
  id: string;
  dueDate: string;
  amount: number;
  description: string;
}

export const AdvancedInvoiceForm = ({ onClose, invoice }: AdvancedInvoiceFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    invoiceNumber: invoice?.invoiceNumber || `INV-${Date.now()}`,
    customer: invoice?.customer || '',
    jobReference: invoice?.jobReference || '',
    issueDate: invoice?.issueDate || new Date().toISOString().split('T')[0],
    dueDate: invoice?.dueDate || '',
    notes: invoice?.notes || '',
    terms: invoice?.terms || 'Payment due within 30 days',
    hasPaymentPlan: invoice?.hasPaymentPlan || false,
    taxRate: invoice?.taxRate || 8,
    discountType: invoice?.discountType || 'none',
    discountValue: invoice?.discountValue || 0
  });

  const [paymentPlans, setPaymentPlans] = useState<PaymentPlan[]>(invoice?.paymentPlans || []);

  const addPaymentPlan = () => {
    const newPlan: PaymentPlan = {
      id: Date.now().toString(),
      dueDate: '',
      amount: 0,
      description: ''
    };
    setPaymentPlans([...paymentPlans, newPlan]);
  };

  const removePaymentPlan = (id: string) => {
    setPaymentPlans(paymentPlans.filter(plan => plan.id !== id));
  };

  const updatePaymentPlan = (id: string, field: keyof PaymentPlan, value: string | number) => {
    setPaymentPlans(paymentPlans.map(plan => 
      plan.id === id ? { ...plan, [field]: value } : plan
    ));
  };

  const calculateSubtotal = () => {
    return 5000; // Placeholder - would normally calculate from line items
  };

  const calculateDiscount = () => {
    const subtotal = calculateSubtotal();
    if (formData.discountType === 'percentage') {
      return subtotal * (formData.discountValue / 100);
    } else if (formData.discountType === 'fixed') {
      return formData.discountValue;
    }
    return 0;
  };

  const calculateTax = () => {
    const afterDiscount = calculateSubtotal() - calculateDiscount();
    return afterDiscount * (formData.taxRate / 100);
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount() + calculateTax();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Saving advanced invoice:', { 
      ...formData, 
      paymentPlans,
      subtotal: calculateSubtotal(),
      discount: calculateDiscount(),
      tax: calculateTax(),
      total: calculateTotal() 
    });
    
    toast({
      title: "Invoice Created",
      description: `Advanced invoice ${formData.invoiceNumber} has been created with ${formData.hasPaymentPlan ? 'payment plan' : 'standard terms'}.`,
    });
    
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Advanced Invoice Creator</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="invoiceNumber">Invoice Number *</Label>
              <Input
                id="invoiceNumber"
                value={formData.invoiceNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, invoiceNumber: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="customer">Customer *</Label>
              <Input
                id="customer"
                value={formData.customer}
                onChange={(e) => setFormData(prev => ({ ...prev, customer: e.target.value }))}
                placeholder="Customer name"
                required
              />
            </div>
          </div>

          {/* Discount Section */}
          <div className="space-y-4 border p-4 rounded-lg">
            <Label className="text-lg font-semibold">Discount & Tax Settings</Label>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Discount Type</Label>
                <Select value={formData.discountType} onValueChange={(value) => setFormData(prev => ({ ...prev, discountType: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Discount</SelectItem>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Discount Value</Label>
                <Input
                  type="number"
                  value={formData.discountValue}
                  onChange={(e) => setFormData(prev => ({ ...prev, discountValue: parseFloat(e.target.value) || 0 }))}
                  disabled={formData.discountType === 'none'}
                />
              </div>
              <div className="space-y-2">
                <Label>Tax Rate (%)</Label>
                <Input
                  type="number"
                  value={formData.taxRate}
                  onChange={(e) => setFormData(prev => ({ ...prev, taxRate: parseFloat(e.target.value) || 0 }))}
                  step="0.01"
                />
              </div>
            </div>
          </div>

          {/* Payment Plan Section */}
          <div className="space-y-4 border p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-semibold">Payment Plan</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasPaymentPlan"
                  checked={formData.hasPaymentPlan}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, hasPaymentPlan: !!checked }))}
                />
                <Label htmlFor="hasPaymentPlan">Enable Payment Plan</Label>
              </div>
            </div>

            {formData.hasPaymentPlan && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Payment Schedule</span>
                  <Button type="button" onClick={addPaymentPlan} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Payment
                  </Button>
                </div>

                {paymentPlans.map((plan) => (
                  <div key={plan.id} className="grid grid-cols-12 gap-2 items-end p-3 border rounded-lg">
                    <div className="col-span-4">
                      <Label className="text-sm">Description</Label>
                      <Input
                        value={plan.description}
                        onChange={(e) => updatePaymentPlan(plan.id, 'description', e.target.value)}
                        placeholder="Payment description"
                      />
                    </div>
                    <div className="col-span-3">
                      <Label className="text-sm">Due Date</Label>
                      <Input
                        type="date"
                        value={plan.dueDate}
                        onChange={(e) => updatePaymentPlan(plan.id, 'dueDate', e.target.value)}
                      />
                    </div>
                    <div className="col-span-3">
                      <Label className="text-sm">Amount ($)</Label>
                      <Input
                        type="number"
                        value={plan.amount}
                        onChange={(e) => updatePaymentPlan(plan.id, 'amount', parseFloat(e.target.value) || 0)}
                        step="0.01"
                      />
                    </div>
                    <div className="col-span-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removePaymentPlan(plan.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Financial Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-right space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>
              {formData.discountType !== 'none' && (
                <div className="flex justify-between text-red-600">
                  <span>Discount:</span>
                  <span>-${calculateDiscount().toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Tax ({formData.taxRate}%):</span>
                <span>${calculateTax().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold border-t pt-2">
                <span>Total:</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Create Advanced Invoice
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
