import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Eye, Save, FolderOpen } from "lucide-react";
import { TemplatePreview } from "./TemplatePreview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  const [selectedFont, setSelectedFont] = useState('sans');
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [templateName, setTemplateName] = useState('');
  
  const [formData, setFormData] = useState({
    estimateNumber: estimate?.estimateNumber || `EST-${Date.now()}`,
    customer: estimate?.customer || '',
    projectTitle: estimate?.projectTitle || '',
    validUntil: estimate?.validUntil || '',
    notes: estimate?.notes || '',
    terms: estimate?.terms || '50% deposit required, balance due upon completion',
    discountType: estimate?.discountType || 'percentage',
    discountValue: estimate?.discountValue || 0
  });

  const [lineItems, setLineItems] = useState<LineItem[]>(estimate?.lineItems || [
    { id: '1', description: '', quantity: 1, rate: 0, amount: 0 }
  ]);

  // Mock saved templates - in real app this would come from database
  const [savedTemplates] = useState([
    { id: '1', name: 'Kitchen Renovation Template', projectTitle: 'Kitchen Renovation', lineItems: 3 },
    { id: '2', name: 'Bathroom Upgrade Template', projectTitle: 'Bathroom Upgrade', lineItems: 2 },
    { id: '3', name: 'Deck Construction Template', projectTitle: 'Deck Construction', lineItems: 4 }
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

  const calculateSubtotal = () => {
    return lineItems.reduce((total, item) => total + item.amount, 0);
  };

  const calculateDiscount = () => {
    const subtotal = calculateSubtotal();
    return formData.discountType === 'percentage' 
      ? subtotal * (formData.discountValue / 100)
      : formData.discountValue;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount();
  };

  const getPreviewData = () => ({
    estimateNumber: formData.estimateNumber,
    customer: formData.customer,
    projectTitle: formData.projectTitle,
    validUntil: formData.validUntil,
    notes: formData.notes,
    terms: formData.terms,
    lineItems,
    subtotal: calculateSubtotal(),
    discount: calculateDiscount(),
    discountType: formData.discountType,
    discountValue: formData.discountValue,
    total: calculateTotal(),
    fontFamily: selectedFont
  });

  const handleSaveAsTemplate = () => {
    if (!templateName.trim()) {
      toast({
        title: "Template Name Required",
        description: "Please enter a name for your template.",
        variant: "destructive"
      });
      return;
    }

    console.log('Saving template:', { 
      name: templateName,
      projectTitle: formData.projectTitle,
      lineItems: lineItems.filter(item => item.description),
      notes: formData.notes,
      terms: formData.terms
    });
    
    toast({
      title: "Template Saved",
      description: `Template "${templateName}" has been saved successfully.`
    });
    
    setShowTemplateDialog(false);
    setTemplateName('');
  };

  const handleLoadTemplate = (templateId: string) => {
    // In real app, this would load from database
    const template = savedTemplates.find(t => t.id === templateId);
    if (template) {
      console.log('Loading template:', template);
      toast({
        title: "Template Loaded",
        description: `Template "${template.name}" has been loaded.`
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Saving estimate:', { 
      ...formData, 
      lineItems, 
      subtotal: calculateSubtotal(),
      discount: calculateDiscount(),
      total: calculateTotal(),
      template: selectedTemplate,
      fontFamily: selectedFont
    });
    
    toast({
      title: estimate ? "Estimate Updated" : "Estimate Created",
      description: `Estimate ${formData.estimateNumber} has been ${estimate ? 'updated' : 'created'} successfully with ${selectedTemplate} template.`,
    });
    
    onClose();
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{estimate ? 'Edit Estimate' : 'Create New Estimate'}</span>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowTemplateDialog(true)}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save as Template
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="basic" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="items">Line Items</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit}>
              <TabsContent value="basic" className="space-y-4">
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

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Estimate Template</Label>
                    <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="modern">Modern</SelectItem>
                        <SelectItem value="classic">Classic</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Font Family</Label>
                    <Select value={selectedFont} onValueChange={setSelectedFont}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sans">Sans Serif</SelectItem>
                        <SelectItem value="serif">Serif</SelectItem>
                        <SelectItem value="mono">Monospace</SelectItem>
                        <SelectItem value="playfair">Playfair Display</SelectItem>
                        <SelectItem value="inter">Inter</SelectItem>
                        <SelectItem value="roboto">Roboto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowPreview(true)}
                    disabled={!formData.customer || !formData.projectTitle || lineItems.every(item => !item.description)}
                    className="flex-1"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview Estimate
                  </Button>
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

                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label className="text-sm">Discount Type</Label>
                          <Select value={formData.discountType} onValueChange={(value) => handleChange('discountType', value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="percentage">Percentage (%)</SelectItem>
                              <SelectItem value="flat">Flat Rate ($)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm">Discount Value</Label>
                          <Input
                            type="number"
                            value={formData.discountValue}
                            onChange={(e) => handleChange('discountValue', parseFloat(e.target.value) || 0)}
                            min="0"
                            step="0.01"
                            placeholder={formData.discountType === 'percentage' ? '10' : '100.00'}
                          />
                        </div>
                        <div>
                          <Label className="text-sm">Discount Amount</Label>
                          <Input
                            value={`$${calculateDiscount().toFixed(2)}`}
                            readOnly
                            className="bg-gray-50"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-right border-t pt-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Subtotal</div>
                          <div className="font-medium">${calculateSubtotal().toFixed(2)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Discount</div>
                          <div className="font-medium text-red-600">-${calculateDiscount().toFixed(2)}</div>
                        </div>
                        <div>
                          <div className="text-lg font-semibold">Total: ${calculateTotal().toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="templates" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Saved Templates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {savedTemplates.map((template) => (
                        <div key={template.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">{template.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {template.projectTitle} • {template.lineItems} items
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleLoadTemplate(template.id)}
                          >
                            <FolderOpen className="h-4 w-4 mr-2" />
                            Load
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">
                  {estimate ? 'Update Estimate' : 'Create Estimate'}
                </Button>
              </div>
            </form>
          </Tabs>
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

      {/* Save Template Dialog */}
      <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Save as Template</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="templateName">Template Name *</Label>
              <Input
                id="templateName"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="e.g., Kitchen Renovation Template"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setShowTemplateDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveAsTemplate}>
                Save Template
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
