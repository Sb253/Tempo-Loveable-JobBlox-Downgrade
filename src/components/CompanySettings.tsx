
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Upload, Building2, Save, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const CompanySettings = () => {
  const { toast } = useToast();
  const [companyData, setCompanyData] = useState({
    name: 'Your Construction Company',
    address: '123 Business Street',
    city: 'City, State 12345',
    phone: '(555) 123-4567',
    email: 'info@yourcompany.com',
    website: 'www.yourcompany.com',
    logo: null as string | null,
    // Header customization options
    displayInHeader: true,
    headerCompanyName: 'JobBlox',
    useCustomHeaderName: false
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('companySettings');
    if (savedSettings) {
      try {
        const data = JSON.parse(savedSettings);
        setCompanyData(prev => ({ ...prev, ...data }));
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
    const settingsToSave = {
      ...companyData,
      companyName: companyData.name // Ensure compatibility
    };
    
    localStorage.setItem('companySettings', JSON.stringify(settingsToSave));
    
    // Dispatch a custom event to notify other components
    window.dispatchEvent(new Event('storage'));
    
    toast({
      title: "Settings Saved",
      description: "Company settings have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Building2 className="h-6 w-6" />
        <h2 className="text-2xl font-bold">Company Settings</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Logo */}
        <Card>
          <CardHeader>
            <CardTitle>Company Logo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                {companyData.logo ? (
                  <img src={companyData.logo} alt="Company Logo" className="h-24 w-auto object-contain" />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
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
          </CardContent>
        </Card>

        {/* Header Customization */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Header Customization
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="displayInHeader">Display in Header</Label>
                <p className="text-xs text-muted-foreground">
                  Show company branding in the application header
                </p>
              </div>
              <Switch
                id="displayInHeader"
                checked={companyData.displayInHeader}
                onCheckedChange={(checked) => 
                  setCompanyData(prev => ({ ...prev, displayInHeader: checked }))
                }
              />
            </div>

            {companyData.displayInHeader && (
              <>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="useCustomHeaderName">Use Custom Header Name</Label>
                    <p className="text-xs text-muted-foreground">
                      Override default "JobBlox" branding
                    </p>
                  </div>
                  <Switch
                    id="useCustomHeaderName"
                    checked={companyData.useCustomHeaderName}
                    onCheckedChange={(checked) => 
                      setCompanyData(prev => ({ ...prev, useCustomHeaderName: checked }))
                    }
                  />
                </div>

                {companyData.useCustomHeaderName && (
                  <div className="space-y-2">
                    <Label htmlFor="headerCompanyName">Header Company Name</Label>
                    <Input
                      id="headerCompanyName"
                      value={companyData.headerCompanyName}
                      onChange={(e) => setCompanyData(prev => ({ 
                        ...prev, 
                        headerCompanyName: e.target.value 
                      }))}
                      placeholder="Enter name to display in header"
                    />
                  </div>
                )}

                <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Preview:</strong> Header will show{' '}
                    {companyData.useCustomHeaderName 
                      ? `"${companyData.headerCompanyName || 'Company Name'}"` 
                      : '"JobBlox"'
                    } with gradient styling
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={companyData.name}
                onChange={(e) => setCompanyData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={companyData.website}
                onChange={(e) => setCompanyData(prev => ({ ...prev, website: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
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

          <Button onClick={handleSave} className="w-full">
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
