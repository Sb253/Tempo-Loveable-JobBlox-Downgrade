
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { FileText, Receipt, Save, Upload } from "lucide-react";

interface CustomizationSettings {
  // Estimate Settings
  estimateTitle: string;
  estimateSubtitle: string;
  estimateTerms: string;
  estimateNotes: string;
  estimateValidDays: number;
  showEstimateNumber: boolean;
  showEstimateDate: boolean;
  showValidUntil: boolean;
  
  // Invoice Settings
  invoiceTitle: string;
  invoiceSubtitle: string;
  invoiceTerms: string;
  invoiceNotes: string;
  invoiceDueDays: number;
  showInvoiceNumber: boolean;
  showInvoiceDate: boolean;
  showDueDate: boolean;
  showPaymentTerms: boolean;
  
  // Shared Settings
  headerLogo: string;
  footerText: string;
  showCompanyLogo: boolean;
  showPageNumbers: boolean;
  documentFont: string;
  primaryColor: string;
  secondaryColor: string;
}

export const EstimateInvoiceCustomization = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<CustomizationSettings>({
    estimateTitle: 'Estimate',
    estimateSubtitle: 'Professional Construction Estimate',
    estimateTerms: 'This estimate is valid for 30 days from the date issued.',
    estimateNotes: 'Thank you for considering our services.',
    estimateValidDays: 30,
    showEstimateNumber: true,
    showEstimateDate: true,
    showValidUntil: true,
    
    invoiceTitle: 'Invoice',
    invoiceSubtitle: 'Professional Construction Invoice',
    invoiceTerms: 'Payment is due within 30 days of invoice date.',
    invoiceNotes: 'Thank you for your business.',
    invoiceDueDays: 30,
    showInvoiceNumber: true,
    showInvoiceDate: true,
    showDueDate: true,
    showPaymentTerms: true,
    
    headerLogo: '',
    footerText: '',
    showCompanyLogo: true,
    showPageNumbers: true,
    documentFont: 'sans',
    primaryColor: '#3B82F6',
    secondaryColor: '#64748B'
  });

  const handleInputChange = (field: keyof CustomizationSettings, value: string | number | boolean) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    localStorage.setItem('estimateInvoiceSettings', JSON.stringify(settings));
    toast({
      title: "Settings Saved",
      description: "Estimate and invoice customization settings have been updated."
    });
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSettings(prev => ({
          ...prev,
          headerLogo: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Estimate & Invoice Customization</h2>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>

      <Tabs defaultValue="estimates" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="estimates">Estimates</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
        </TabsList>

        <TabsContent value="estimates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Estimate Customization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="estimateTitle">Document Title</Label>
                  <Input
                    id="estimateTitle"
                    value={settings.estimateTitle}
                    onChange={(e) => handleInputChange('estimateTitle', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estimateSubtitle">Subtitle</Label>
                  <Input
                    id="estimateSubtitle"
                    value={settings.estimateSubtitle}
                    onChange={(e) => handleInputChange('estimateSubtitle', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimateTerms">Terms & Conditions</Label>
                <Textarea
                  id="estimateTerms"
                  value={settings.estimateTerms}
                  onChange={(e) => handleInputChange('estimateTerms', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimateNotes">Footer Notes</Label>
                <Textarea
                  id="estimateNotes"
                  value={settings.estimateNotes}
                  onChange={(e) => handleInputChange('estimateNotes', e.target.value)}
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimateValidDays">Valid for (days)</Label>
                <Input
                  id="estimateValidDays"
                  type="number"
                  value={settings.estimateValidDays}
                  onChange={(e) => handleInputChange('estimateValidDays', parseInt(e.target.value))}
                />
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Display Options</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="showEstimateNumber">Show Estimate Number</Label>
                    <Switch
                      id="showEstimateNumber"
                      checked={settings.showEstimateNumber}
                      onCheckedChange={(checked) => handleInputChange('showEstimateNumber', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="showEstimateDate">Show Date</Label>
                    <Switch
                      id="showEstimateDate"
                      checked={settings.showEstimateDate}
                      onCheckedChange={(checked) => handleInputChange('showEstimateDate', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="showValidUntil">Show Valid Until</Label>
                    <Switch
                      id="showValidUntil"
                      checked={settings.showValidUntil}
                      onCheckedChange={(checked) => handleInputChange('showValidUntil', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5" />
                Invoice Customization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="invoiceTitle">Document Title</Label>
                  <Input
                    id="invoiceTitle"
                    value={settings.invoiceTitle}
                    onChange={(e) => handleInputChange('invoiceTitle', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invoiceSubtitle">Subtitle</Label>
                  <Input
                    id="invoiceSubtitle"
                    value={settings.invoiceSubtitle}
                    onChange={(e) => handleInputChange('invoiceSubtitle', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="invoiceTerms">Payment Terms</Label>
                <Textarea
                  id="invoiceTerms"
                  value={settings.invoiceTerms}
                  onChange={(e) => handleInputChange('invoiceTerms', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="invoiceNotes">Footer Notes</Label>
                <Textarea
                  id="invoiceNotes"
                  value={settings.invoiceNotes}
                  onChange={(e) => handleInputChange('invoiceNotes', e.target.value)}
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="invoiceDueDays">Payment Due (days)</Label>
                <Input
                  id="invoiceDueDays"
                  type="number"
                  value={settings.invoiceDueDays}
                  onChange={(e) => handleInputChange('invoiceDueDays', parseInt(e.target.value))}
                />
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Display Options</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="showInvoiceNumber">Show Invoice Number</Label>
                    <Switch
                      id="showInvoiceNumber"
                      checked={settings.showInvoiceNumber}
                      onCheckedChange={(checked) => handleInputChange('showInvoiceNumber', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="showInvoiceDate">Show Date</Label>
                    <Switch
                      id="showInvoiceDate"
                      checked={settings.showInvoiceDate}
                      onCheckedChange={(checked) => handleInputChange('showInvoiceDate', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="showDueDate">Show Due Date</Label>
                    <Switch
                      id="showDueDate"
                      checked={settings.showDueDate}
                      onCheckedChange={(checked) => handleInputChange('showDueDate', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="showPaymentTerms">Show Payment Terms</Label>
                    <Switch
                      id="showPaymentTerms"
                      checked={settings.showPaymentTerms}
                      onCheckedChange={(checked) => handleInputChange('showPaymentTerms', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Document Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="headerLogo">Header Logo</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="headerLogo"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
                {settings.headerLogo && (
                  <img src={settings.headerLogo} alt="Header Logo" className="h-16 w-auto object-contain" />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="footerText">Custom Footer Text</Label>
                <Input
                  id="footerText"
                  value={settings.footerText}
                  onChange={(e) => handleInputChange('footerText', e.target.value)}
                  placeholder="Custom footer text for all documents"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                      className="w-16 h-10"
                    />
                    <Input
                      value={settings.primaryColor}
                      onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={settings.secondaryColor}
                      onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                      className="w-16 h-10"
                    />
                    <Input
                      value={settings.secondaryColor}
                      onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Display Options</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="showCompanyLogo">Show Company Logo</Label>
                    <Switch
                      id="showCompanyLogo"
                      checked={settings.showCompanyLogo}
                      onCheckedChange={(checked) => handleInputChange('showCompanyLogo', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="showPageNumbers">Show Page Numbers</Label>
                    <Switch
                      id="showPageNumbers"
                      checked={settings.showPageNumbers}
                      onCheckedChange={(checked) => handleInputChange('showPageNumbers', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
