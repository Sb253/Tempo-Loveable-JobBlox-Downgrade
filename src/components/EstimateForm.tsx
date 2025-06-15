import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Eye } from "lucide-react";
import { TemplatePreview } from "./TemplatePreview";

interface EstimateFormProps {
  onClose: () => void;
  estimate?: any;
}

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export const EstimateForm = ({ onClose, estimate }: EstimateFormProps) => {
  const { toast } = useToast();
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  
  const [formData, setFormData] = useState({
    estimateNumber: estimate?.estimateNumber || `EST-${Date.now()}`,
    customer: estimate?.customer || '',
    projectTitle: estimate?.projectTitle || '',
    validUntil: estimate?.validUntil || '',
    notes: estimate?.notes || '',
    terms: estimate?.terms || '50% deposit required, balance due upon completion'
  });

  const [lineItems, setLineItems] = useState<LineItem[]>(estimate?.lineItems || [
    { id: '1', description: '', quantity: 1, rate: 0, amount: 0 }
  ]);

  const addLineItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0
    };
    setLineItems([...lineItems, newItem]);
  };

  const removeLineItem = (id: string) => {
    setLineItems(lineItems.filter(item => item.id !== id));
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: string | number) => {
    setLineItems(lineItems.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === 'quantity' || field === 'rate') {
          updated.amount = updated.quantity * updated.rate;
        }
        return updated;
      }
      return item;
    }));
  };

  const calculateTotal = () => {
    return lineItems.reduce((total, item) => total + item.amount, 0);
  };

  const getPreviewData = () => ({
    estimateNumber: formData.estimateNumber,
    customer: formData.customer,
    projectTitle: formData.projectTitle,
    validUntil: formData.validUntil,
    notes: formData.notes,
    terms: formData.terms,
    lineItems,
    total: calculateTotal()
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Saving estimate:', { 
      ...formData, 
      lineItems, 
      total: calculateTotal(),
      template: selectedTemplate
    });
    
    toast({
      title: estimate ? "Estimate Updated" : "Estimate Created",
      description: `Estimate ${formData.estimateNumber} has been ${estimate ? 'updated' : 'created'} successfully with ${selectedTemplate} template.`,
    });
    
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{estimate ? 'Edit Estimate' : 'Create New Estimate'}</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="estimateNumber">Estimate Number *</Label>
                <Input
                  id="estimateNumber"
                  value={formData.estimateNumber}
                  onChange={(e) => handleChange('estimateNumber', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customer">Customer *</Label>
                <Input
                  id="customer"
                  value={formData.customer}
                  onChange={(e) => handleChange('customer', e.target.value)}
                  placeholder="Customer name"
                  required
                />
              </div>
            </div>

            {/* Template Selection */}
            <div className="space-y-2">
              <Label>Estimate Template</Label>
              <div className="flex gap-2">
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger className="flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="modern">Modern</SelectItem>
                    <SelectItem value="classic">Classic</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowPreview(true)}
                  disabled={!formData.customer || !formData.projectTitle || lineItems.every(item => !item.description)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectTitle">Project Title *</Label>
              <Input
                id="projectTitle"
                value={formData.projectTitle}
                onChange={(e) => handleChange('projectTitle', e.target.value)}
                placeholder="e.g., Kitchen Renovation"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="validUntil">Valid Until</Label>
              <Input
                id="validUntil"
                type="date"
                value={formData.validUntil}
                onChange={(e) => handleChange('validUntil', e.target.value)}
              />
            </div>

            {/* Line Items */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold">Line Items</Label>
                <Button type="button" onClick={addLineItem} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>

              <div className="space-y-3">
                {lineItems.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-12 gap-2 items-end p-3 border rounded-lg">
                    <div className="col-span-5">
                      <Label className="text-sm">Description</Label>
                      <Input
                        value={item.description}
                        onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                        placeholder="Item description"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label className="text-sm">Qty</Label>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateLineItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label className="text-sm">Rate ($)</Label>
                      <Input
                        type="number"
                        value={item.rate}
                        onChange={(e) => updateLineItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label className="text-sm">Amount</Label>
                      <Input
                        value={`$${item.amount.toFixed(2)}`}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                    <div className="col-span-1">
                      {lineItems.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeLineItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <div className="text-right">
                  <div className="text-lg font-semibold">
                    Total: ${calculateTotal().toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                placeholder="Additional notes for this estimate"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="terms">Terms & Conditions</Label>
              <Textarea
                id="terms"
                value={formData.terms}
                onChange={(e) => handleChange('terms', e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {estimate ? 'Update Estimate' : 'Create Estimate'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {showPreview && (
        <TemplatePreview
          type="estimate"
          data={getPreviewData()}
          onClose={() => setShowPreview(false)}
          onTemplateSelect={setSelectedTemplate}
          selectedTemplate={selectedTemplate}
        />
      )}
    </>
  );
};
