
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Phone, MapPin, Building, CreditCard, Calendar, FileText } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  customerType: 'residential' | 'commercial' | 'industrial';
  paymentTerms: string;
  creditLimit: number;
  taxExempt: boolean;
  preferredContactMethod: string;
  notes: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  serviceHistory: any[];
  totalRevenue: number;
  lastServiceDate: string;
  status: 'active' | 'inactive' | 'potential';
}

interface EnhancedCustomerFormProps {
  customer?: Customer;
  onSave: (customer: Customer) => void;
  onCancel: () => void;
}

export const EnhancedCustomerForm = ({ customer, onSave, onCancel }: EnhancedCustomerFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<Customer>>({
    name: customer?.name || '',
    email: customer?.email || '',
    phone: customer?.phone || '',
    address: customer?.address || '',
    city: customer?.city || '',
    state: customer?.state || '',
    zipCode: customer?.zipCode || '',
    customerType: customer?.customerType || 'residential',
    paymentTerms: customer?.paymentTerms || '30',
    creditLimit: customer?.creditLimit || 5000,
    taxExempt: customer?.taxExempt || false,
    preferredContactMethod: customer?.preferredContactMethod || 'email',
    notes: customer?.notes || '',
    emergencyContact: customer?.emergencyContact || {
      name: '',
      phone: '',
      relationship: ''
    },
    status: customer?.status || 'potential'
  });

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof Customer] as any),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Validation Error",
        description: "Name, email, and phone are required fields.",
        variant: "destructive"
      });
      return;
    }

    const customerData: Customer = {
      id: customer?.id || `cust-${Date.now()}`,
      name: formData.name!,
      email: formData.email!,
      phone: formData.phone!,
      address: formData.address || '',
      city: formData.city || '',
      state: formData.state || '',
      zipCode: formData.zipCode || '',
      customerType: formData.customerType!,
      paymentTerms: formData.paymentTerms!,
      creditLimit: formData.creditLimit!,
      taxExempt: formData.taxExempt!,
      preferredContactMethod: formData.preferredContactMethod!,
      notes: formData.notes!,
      emergencyContact: formData.emergencyContact!,
      serviceHistory: customer?.serviceHistory || [],
      totalRevenue: customer?.totalRevenue || 0,
      lastServiceDate: customer?.lastServiceDate || '',
      status: formData.status!
    };

    onSave(customerData);
    
    toast({
      title: customer ? "Customer Updated" : "Customer Created",
      description: `${customerData.name} has been ${customer ? 'updated' : 'created'} successfully.`,
    });
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-6 w-6" />
          {customer ? 'Edit Customer' : 'New Customer'}
          {customer && (
            <Badge variant={customer.status === 'active' ? 'default' : 'secondary'}>
              {customer.status}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
              <TabsTrigger value="emergency">Emergency</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Customer Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter customer name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customerType" className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Customer Type
                  </Label>
                  <Select 
                    value={formData.customerType} 
                    onValueChange={(value) => handleInputChange('customerType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select customer type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="customer@email.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferredContactMethod">Preferred Contact Method</Label>
                  <Select 
                    value={formData.preferredContactMethod} 
                    onValueChange={(value) => handleInputChange('preferredContactMethod', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select contact method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="phone">Phone</SelectItem>
                      <SelectItem value="text">Text Message</SelectItem>
                      <SelectItem value="mail">Mail</SelectItem>
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
                      <SelectItem value="potential">Potential</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="address" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Street Address
                  </Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="123 Main Street"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="City"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    placeholder="State"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    placeholder="12345"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="business" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="paymentTerms" className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Payment Terms (Days)
                  </Label>
                  <Select 
                    value={formData.paymentTerms} 
                    onValueChange={(value) => handleInputChange('paymentTerms', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment terms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Due on Receipt</SelectItem>
                      <SelectItem value="15">Net 15</SelectItem>
                      <SelectItem value="30">Net 30</SelectItem>
                      <SelectItem value="60">Net 60</SelectItem>
                      <SelectItem value="90">Net 90</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="creditLimit">Credit Limit ($)</Label>
                  <Input
                    id="creditLimit"
                    type="number"
                    value={formData.creditLimit}
                    onChange={(e) => handleInputChange('creditLimit', parseFloat(e.target.value) || 0)}
                    placeholder="5000"
                  />
                </div>

                <div className="flex items-center space-x-2 md:col-span-2">
                  <Checkbox
                    id="taxExempt"
                    checked={formData.taxExempt}
                    onCheckedChange={(checked) => handleInputChange('taxExempt', checked)}
                  />
                  <Label htmlFor="taxExempt">Tax Exempt Customer</Label>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="emergency" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyName">Emergency Contact Name</Label>
                  <Input
                    id="emergencyName"
                    value={formData.emergencyContact?.name}
                    onChange={(e) => handleInputChange('emergencyContact.name', e.target.value)}
                    placeholder="Contact name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                  <Input
                    id="emergencyPhone"
                    value={formData.emergencyContact?.phone}
                    onChange={(e) => handleInputChange('emergencyContact.phone', e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyRelationship">Relationship</Label>
                  <Input
                    id="emergencyRelationship"
                    value={formData.emergencyContact?.relationship}
                    onChange={(e) => handleInputChange('emergencyContact.relationship', e.target.value)}
                    placeholder="Spouse, Friend, etc."
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="space-y-2">
            <Label htmlFor="notes" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Notes
            </Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Additional notes about this customer"
              rows={4}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {customer ? 'Update Customer' : 'Create Customer'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
