
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Eye, Upload, Image, Paperclip } from "lucide-react";
import { QuotePreview } from "./QuotePreview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

interface QuoteFormProps {
  onClose: () => void;
  quote?: any;
}

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  markupType: 'flat' | 'percentage';
  markupValue: number;
  amount: number;
}

export const QuoteForm = ({ onClose, quote }: QuoteFormProps) => {
  const { toast } = useToast();
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  
  const [formData, setFormData] = useState({
    quoteNumber: quote?.quoteNumber || `QTE-${Date.now()}`,
    customer: quote?.customer || '',
    projectTitle: quote?.projectTitle || '',
    validUntil: quote?.validUntil || '',
    notes: quote?.notes || '',
    terms: quote?.terms || 'Quote valid for 30 days. 50% deposit required upon acceptance.',
    requireDigitalApproval: quote?.requireDigitalApproval || true
  });

  const [lineItems, setLineItems] = useState<LineItem[]>(quote?.lineItems || [
    { id: '1', description: '', quantity: 1, rate: 0, markupType: 'percentage', markupValue: 0, amount: 0 }
  ]);

  const [packages, setPackages] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [images, setImages] = useState([]);

  const addLineItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      rate: 0,
      markupType: 'percentage',
      markupValue: 0,
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
        if (field === 'quantity' || field === 'rate' || field === 'markupValue' || field === 'markupType') {
          const baseAmount = updated.quantity * updated.rate;
          const markup = updated.markupType === 'percentage' 
            ? baseAmount * (updated.markupValue / 100)
            : updated.markupValue;
          updated.amount = baseAmount + markup;
        }
        return updated;
      }
      return item;
    }));
  };

  const calculateSubtotal = () => {
    return lineItems.reduce((total, item) => total + (item.quantity * item.rate), 0);
  };

  const calculateMarkup = () => {
    return lineItems.reduce((total, item) => {
      const baseAmount = item.quantity * item.rate;
      const markup = item.markupType === 'percentage' 
        ? baseAmount * (item.markupValue / 100)
        : item.markupValue;
      return total + markup;
    }, 0);
  };

  const calculateTotal = () => {
    return lineItems.reduce((total, item) => total + item.amount, 0);
  };

  const getPreviewData = () => ({
    quoteNumber: formData.quoteNumber,
    customer: formData.customer,
    projectTitle: formData.projectTitle,
    validUntil: formData.validUntil,
    notes: formData.notes,
    terms: formData.terms,
    lineItems,
    packages,
    images,
    attachments,
    subtotal: calculateSubtotal(),
    markup: calculateMarkup(),
    total: calculateTotal(),
    requireDigitalApproval: formData.requireDigitalApproval
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Saving quote:', { 
      ...formData, 
      lineItems, 
      packages,
      images,
      attachments,
      subtotal: calculateSubtotal(),
      markup: calculateMarkup(),
      total: calculateTotal(),
      template: selectedTemplate
    });
    
    toast({
      title: quote ? "Quote Updated" : "Quote Created",
      description: `Quote ${formData.quoteNumber} has been ${quote ? 'updated' : 'created'} successfully with ${selectedTemplate} template.`,
    });
    
    onClose();
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{quote ? 'Edit Quote' : 'Create New Quote'}</DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="basic" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="items">Line Items</TabsTrigger>
              <TabsTrigger value="media">Media & Files</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit}>
              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quoteNumber">Quote Number *</Label>
                    <Input
                      id="quoteNumber"
                      value={formData.quoteNumber}
                      onChange={(e) => handleChange('quoteNumber', e.target.value)}
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

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    placeholder="Additional notes for this quote"
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
              </TabsContent>

              <TabsContent value="items" className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-lg font-semibold">Line Items</Label>
                  <Button type="button" onClick={addLineItem} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </div>

                <div className="space-y-3">
                  {lineItems.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="grid grid-cols-12 gap-2 items-end">
                          <div className="col-span-4">
                            <Label className="text-sm">Description</Label>
                            <Input
                              value={item.description}
                              onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                              placeholder="Item description"
                            />
                          </div>
                          <div className="col-span-1">
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
                            <Label className="text-sm">Base Rate ($)</Label>
                            <Input
                              type="number"
                              value={item.rate}
                              onChange={(e) => updateLineItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                              min="0"
                              step="0.01"
                            />
                          </div>
                          <div className="col-span-1">
                            <Label className="text-sm">Markup Type</Label>
                            <Select value={item.markupType} onValueChange={(value) => updateLineItem(item.id, 'markupType', value)}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="percentage">%</SelectItem>
                                <SelectItem value="flat">$</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="col-span-1">
                            <Label className="text-sm">Markup</Label>
                            <Input
                              type="number"
                              value={item.markupValue}
                              onChange={(e) => updateLineItem(item.id, 'markupValue', parseFloat(e.target.value) || 0)}
                              min="0"
                              step="0.01"
                            />
                          </div>
                          <div className="col-span-2">
                            <Label className="text-sm">Total Amount</Label>
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
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-3 gap-4 text-right">
                      <div>
                        <div className="text-sm text-muted-foreground">Subtotal</div>
                        <div className="font-medium">${calculateSubtotal().toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Total Markup</div>
                        <div className="font-medium">${calculateMarkup().toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold">Total: ${calculateTotal().toFixed(2)}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="media" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Image className="h-5 w-5" />
                        Images
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Images
                      </Button>
                      <p className="text-sm text-muted-foreground mt-2">
                        Add project images, before/after photos, or reference materials
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Paperclip className="h-5 w-5" />
                        Attachments
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Files
                      </Button>
                      <p className="text-sm text-muted-foreground mt-2">
                        Add specifications, drawings, or supporting documents
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Quote Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Quote Template</Label>
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
                          disabled={!formData.customer || !formData.projectTitle}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Digital Approval Required</Label>
                        <p className="text-sm text-muted-foreground">
                          Require customer to digitally approve quote through app or portal
                        </p>
                      </div>
                      <Switch
                        checked={formData.requireDigitalApproval}
                        onCheckedChange={(value) => handleChange('requireDigitalApproval', value)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">
                  {quote ? 'Update Quote' : 'Create Quote'}
                </Button>
              </div>
            </form>
          </Tabs>
        </DialogContent>
      </Dialog>

      {showPreview && (
        <QuotePreview
          data={getPreviewData()}
          onClose={() => setShowPreview(false)}
          onTemplateSelect={setSelectedTemplate}
          selectedTemplate={selectedTemplate}
        />
      )}
    </>
  );
};
