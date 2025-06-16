
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Building2, Save, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const CompanySettings = () => {
  const { toast } = useToast();
  const [companyData, setCompanyData] = useState({
    companyName: 'JobBlox',
    name: 'JobBlox', // Legacy support
    address: '123 Business Street',
    city: 'City, State 12345',
    phone: '(555) 123-4567',
    email: 'info@yourcompany.com',
    website: 'www.yourcompany.com',
    logo: null as string | null
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('companySettings');
    if (savedSettings) {
      try {
        const data = JSON.parse(savedSettings);
        setCompanyData({
          companyName: data.companyName || data.name || 'JobBlox',
          name: data.companyName || data.name || 'JobBlox',
          address: data.address || data.businessAddress || '123 Business Street',
          city: data.city || 'City, State 12345',
          phone: data.phone || '(555) 123-4567',
          email: data.email || 'info@yourcompany.com',
          website: data.website || 'www.yourcompany.com',
          logo: data.logo || null
        });
      } catch (error) {
        console.error('Error loading company settings:', error);
      }
    }
  }, []);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCompanyData(prev => ({ ...prev, logo: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Save with both companyName and name for compatibility
    const dataToSave = {
      ...companyData,
      companyName: companyData.companyName,
      name: companyData.companyName,
      businessAddress: companyData.address
    };
    
    localStorage.setItem('companySettings', JSON.stringify(dataToSave));
    
    // Trigger a storage event to notify other components
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'companySettings',
      newValue: JSON.stringify(dataToSave)
    }));
    
    toast({
      title: "Settings Saved",
      description: "Company settings have been updated successfully. The changes will be reflected in the header and sidebar.",
    });
  };

  const handleRemoveLogo = () => {
    setCompanyData(prev => ({ ...prev, logo: null }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Building2 className="h-6 w-6" />
        <h2 className="text-2xl font-bold">Company Settings</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Branding */}
        <Card>
          <CardHeader>
            <CardTitle>Company Branding</CardTitle>
            <p className="text-sm text-muted-foreground">
              This information will appear in the header and throughout the application.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={companyData.companyName}
                onChange={(e) => setCompanyData(prev => ({ ...prev, companyName: e.target.value, name: e.target.value }))}
                placeholder="Your Company Name"
              />
              <p className="text-xs text-muted-foreground">
                This will replace "JobBlox" in the header and sidebar.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo">Company Logo</Label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  {companyData.logo ? (
                    <div className="relative">
                      <img src={companyData.logo} alt="Company Logo" className="h-24 w-auto object-contain" />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={handleRemoveLogo}
                        className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                      >
                        ×
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                        <Zap className="h-6 w-6 text-white" />
                      </div>
                      <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> your logo
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG (MAX. 2MB)</p>
                    </div>
                  )}
                  <input type="file" className="hidden" onChange={handleLogoUpload} accept="image/*" />
                </label>
              </div>
              <p className="text-xs text-muted-foreground">
                Logo will appear in the header next to your company name. Recommended size: 32x32px.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Company Information */}
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Business Address</Label>
              <Input
                id="address"
                value={companyData.address}
                onChange={(e) => setCompanyData(prev => ({ ...prev, address: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City, State, ZIP</Label>
              <Input
                id="city"
                value={companyData.city}
                onChange={(e) => setCompanyData(prev => ({ ...prev, city: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={companyData.phone}
                  onChange={(e) => setCompanyData(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={companyData.email}
                  onChange={(e) => setCompanyData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={companyData.website}
                onChange={(e) => setCompanyData(prev => ({ ...prev, website: e.target.value }))}
              />
            </div>

            <Button onClick={handleSave} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
