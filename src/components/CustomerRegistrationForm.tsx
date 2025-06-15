
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Phone, MapPin, FileText, Calendar } from "lucide-react";
import { CustomField, CustomFieldManager } from "./CustomFieldManager";

interface CustomerData {
  [key: string]: string | boolean;
}

export const CustomerRegistrationForm = () => {
  const { toast } = useToast();
  const [showFieldManager, setShowFieldManager] = useState(false);
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  });

  // Load custom fields from localStorage on component mount
  useEffect(() => {
    const savedFields = localStorage.getItem('customCustomerFields');
    if (savedFields) {
      setCustomFields(JSON.parse(savedFields));
    } else {
      // Set default custom fields
      const defaultFields: CustomField[] = [
        {
          id: '1',
          label: 'Company Name',
          type: 'text',
          required: false,
          placeholder: 'Enter company name'
        },
        {
          id: '2',
          label: 'Project Type',
          type: 'select',
          required: false,
          placeholder: 'Select project type',
          options: ['Residential', 'Commercial', 'Industrial', 'Renovation', 'New Construction']
        },
        {
          id: '3',
          label: 'Budget Range',
          type: 'select',
          required: false,
          placeholder: 'Select budget range',
          options: ['Under $10k', '$10k-$50k', '$50k-$100k', '$100k-$500k', 'Over $500k']
        },
        {
          id: '4',
          label: 'Preferred Contact Method',
          type: 'select',
          required: false,
          placeholder: 'Select contact method',
          options: ['Phone', 'Email', 'Text Message', 'In Person']
        }
      ];
      setCustomFields(defaultFields);
    }
  }, []);

  // Save custom fields to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('customCustomerFields', JSON.stringify(customFields));
  }, [customFields]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setCustomerData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = customFields.filter(field => field.required);
    const missingFields = requiredFields.filter(field => !customerData[field.id]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Required Fields",
        description: `Please fill in: ${missingFields.map(f => f.label).join(', ')}`,
        variant: "destructive"
      });
      return;
    }

    // Here you would typically save to a database
    console.log('Saving customer:', customerData);
    
    toast({
      title: "Customer Registered",
      description: `${customerData.name} has been successfully registered.`,
    });
    
    // Reset form
    const resetData: CustomerData = { name: '', email: '', phone: '', address: '', notes: '' };
    customFields.forEach(field => {
      resetData[field.id] = field.type === 'checkbox' ? false : '';
    });
    setCustomerData(resetData);
  };

  const renderCustomField = (field: CustomField) => {
    const value = customerData[field.id] || '';

    switch (field.type) {
      case 'text':
      case 'email':
      case 'phone':
        return (
          <Input
            type={field.type}
            value={value as string}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
          />
        );
      
      case 'textarea':
        return (
          <Textarea
            value={value as string}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            rows={3}
          />
        );
      
      case 'select':
        return (
          <Select 
            value={value as string} 
            onValueChange={(val) => handleInputChange(field.id, val)}
          >
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={value as boolean}
              onCheckedChange={(checked) => handleInputChange(field.id, checked as boolean)}
            />
            <Label>{field.placeholder || 'Check if applicable'}</Label>
          </div>
        );
      
      case 'date':
        return (
          <Input
            type="date"
            value={value as string}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            required={field.required}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Customer Registration</h2>
        <Button 
          variant="outline" 
          onClick={() => setShowFieldManager(!showFieldManager)}
        >
          {showFieldManager ? 'Hide' : 'Manage'} Custom Fields
        </Button>
      </div>

      {showFieldManager && (
        <CustomFieldManager 
          fields={customFields}
          onFieldsChange={setCustomFields}
        />
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Customer Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Customer Name *
                </Label>
                <Input
                  id="name"
                  value={customerData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={customerData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="customer@email.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={customerData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Address
                </Label>
                <Input
                  id="address"
                  value={customerData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Street address, city, state, zip"
                />
              </div>
            </div>

            {/* Custom Fields */}
            {customFields.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-t pt-4">Additional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {customFields.map((field) => (
                    <div key={field.id} className="space-y-2">
                      <Label className="flex items-center gap-2">
                        {field.type === 'email' && <Mail className="h-4 w-4" />}
                        {field.type === 'phone' && <Phone className="h-4 w-4" />}
                        {field.type === 'date' && <Calendar className="h-4 w-4" />}
                        {field.type === 'textarea' && <FileText className="h-4 w-4" />}
                        {field.label}
                        {field.required && <span className="text-red-500">*</span>}
                      </Label>
                      {renderCustomField(field)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Additional Notes
              </Label>
              <Textarea
                id="notes"
                value={customerData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Any additional information about this customer"
                rows={4}
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => {
                const resetData: CustomerData = { name: '', email: '', phone: '', address: '', notes: '' };
                customFields.forEach(field => {
                  resetData[field.id] = field.type === 'checkbox' ? false : '';
                });
                setCustomerData(resetData);
              }}>
                Clear Form
              </Button>
              <Button type="submit">
                Register Customer
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
