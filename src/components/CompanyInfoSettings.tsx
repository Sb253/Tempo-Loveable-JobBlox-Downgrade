
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Save, Upload, Building, Shield, Eye, EyeOff } from "lucide-react";

interface CompanyInfoSettings {
  // Basic Company Info
  companyName: string;
  businessAddress: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  website: string;
  logo?: string;
  
  // License & Legal Info
  businessLicense: string;
  contractorLicense: string;
  stateLicense: string;
  insurancePolicy: string;
  bonded: boolean;
  
  // Visibility Settings
  showLicense: boolean;
  showInsurance: boolean;
  showBonded: boolean;
  showWebsite: boolean;
  showEmail: boolean;
  showAddress: boolean;
  
  // Template Customization
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  defaultFont: string;
}

export const CompanyInfoSettings: React.FC = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<CompanyInfoSettings>({
    companyName: 'Your Construction Company',
    businessAddress: '123 Business Street',
    city: 'City, State 12345',
    state: 'California',
    zipCode: '12345',
    phone: '(555) 123-4567',
    email: 'info@yourcompany.com',
    website: 'www.yourcompany.com',
    businessLicense: '',
    contractorLicense: '',
    stateLicense: '',
    insurancePolicy: '',
    bonded: false,
    showLicense: false,
    showInsurance: false,
    showBonded: false,
    showWebsite: true,
    showEmail: true,
    showAddress: true,
    primaryColor: '#3B82F6',
    secondaryColor: '#8B5CF6',
    accentColor: '#10B981',
    defaultFont: 'sans'
  });

  const handleInputChange = (field: keyof CompanyInfoSettings, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // In real app, this would save to database
    console.log('Saving company settings:', settings);
    localStorage.setItem('companySettings', JSON.stringify(settings));
    
    toast({
      title: "Settings Saved",
      description: "Company information and visibility settings have been updated."
    });
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSettings(prev => ({
          ...prev,
          logo: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Company Information Settings</h2>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>

      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="licenses">Licenses</TabsTrigger>
          <TabsTrigger value="visibility">Visibility</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    value={settings.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={settings.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={settings.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessAddress">Business Address</Label>
                <Input
                  id="businessAddress"
                  value={settings.businessAddress}
                  onChange={(e) => handleInputChange('businessAddress', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={settings.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={settings.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={settings.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo">Company Logo</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="logo"
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
                {settings.logo && (
                  <img src={settings.logo} alt="Company Logo" className="h-16 w-auto object-contain" />
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="licenses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Licenses & Legal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> All license and legal fields are optional. Only fill in the information you have and want to display to customers.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessLicense">Business License (Optional)</Label>
                  <Input
                    id="businessLicense"
                    value={settings.businessLicense}
                    onChange={(e) => handleInputChange('businessLicense', e.target.value)}
                    placeholder="e.g., BL-123456 (leave blank if not applicable)"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contractorLicense">Contractor License (Optional)</Label>
                  <Input
                    id="contractorLicense"
                    value={settings.contractorLicense}
                    onChange={(e) => handleInputChange('contractorLicense', e.target.value)}
                    placeholder="e.g., CL-789012 (leave blank if not applicable)"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stateLicense">State License (Optional)</Label>
                  <Input
                    id="stateLicense"
                    value={settings.stateLicense}
                    onChange={(e) => handleInputChange('stateLicense', e.target.value)}
                    placeholder="e.g., SL-345678 (leave blank if not applicable)"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="insurancePolicy">Insurance Policy (Optional)</Label>
                  <Input
                    id="insurancePolicy"
                    value={settings.insurancePolicy}
                    onChange={(e) => handleInputChange('insurancePolicy', e.target.value)}
                    placeholder="e.g., INS-901234 (leave blank if not applicable)"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="bonded"
                  checked={settings.bonded}
                  onCheckedChange={(checked) => handleInputChange('bonded', checked)}
                />
                <Label htmlFor="bonded">Company is Bonded (Optional)</Label>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-gray-600">
                  <strong>Tip:</strong> You can control which license information appears on your estimates and invoices in the Visibility tab, even if you've filled in the fields above.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visibility" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Customer Visibility Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Control what information is displayed to customers on estimates and invoices. Only information that you've filled in will be shown.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="showAddress">Show Business Address</Label>
                    <p className="text-sm text-muted-foreground">Display full business address on documents</p>
                  </div>
                  <Switch
                    id="showAddress"
                    checked={settings.showAddress}
                    onCheckedChange={(checked) => handleInputChange('showAddress', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="showEmail">Show Email Address</Label>
                    <p className="text-sm text-muted-foreground">Display company email on documents</p>
                  </div>
                  <Switch
                    id="showEmail"
                    checked={settings.showEmail}
                    onCheckedChange={(checked) => handleInputChange('showEmail', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="showWebsite">Show Website</Label>
                    <p className="text-sm text-muted-foreground">Display company website on documents</p>
                  </div>
                  <Switch
                    id="showWebsite"
                    checked={settings.showWebsite}
                    onCheckedChange={(checked) => handleInputChange('showWebsite', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="showLicense">Show License Information</Label>
                    <p className="text-sm text-muted-foreground">Display business and contractor licenses (only if filled in)</p>
                  </div>
                  <Switch
                    id="showLicense"
                    checked={settings.showLicense}
                    onCheckedChange={(checked) => handleInputChange('showLicense', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="showInsurance">Show Insurance Information</Label>
                    <p className="text-sm text-muted-foreground">Display insurance policy details (only if filled in)</p>
                  </div>
                  <Switch
                    id="showInsurance"
                    checked={settings.showInsurance}
                    onCheckedChange={(checked) => handleInputChange('showInsurance', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="showBonded">Show Bonded Status</Label>
                    <p className="text-sm text-muted-foreground">Display bonded certification (only if marked as bonded)</p>
                  </div>
                  <Switch
                    id="showBonded"
                    checked={settings.showBonded}
                    onCheckedChange={(checked) => handleInputChange('showBonded', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Template Colors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primaryColor"
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
                      id="secondaryColor"
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
                <div className="space-y-2">
                  <Label htmlFor="accentColor">Accent Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="accentColor"
                      type="color"
                      value={settings.accentColor}
                      onChange={(e) => handleInputChange('accentColor', e.target.value)}
                      className="w-16 h-10"
                    />
                    <Input
                      value={settings.accentColor}
                      onChange={(e) => handleInputChange('accentColor', e.target.value)}
                      className="flex-1"
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
