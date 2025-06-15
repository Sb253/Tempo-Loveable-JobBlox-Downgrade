
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CustomFieldManager, CustomField } from "../CustomFieldManager";
import { FileText, Plus, Settings } from "lucide-react";

export const EstimateFieldsCard = () => {
  const { toast } = useToast();
  const [showFieldManager, setShowFieldManager] = useState(false);
  const [customFields, setCustomFields] = useState<CustomField[]>([
    {
      id: '1',
      label: 'Project Type',
      type: 'select',
      required: true,
      options: ['Bathroom Remodel', 'Kitchen Remodel', 'Flooring', 'Plumbing', 'Electrical']
    },
    {
      id: '2',
      label: 'Square Footage',
      type: 'text',
      required: false,
      placeholder: 'Enter square footage'
    }
  ]);
  
  const [fieldValues, setFieldValues] = useState<Record<string, any>>({});

  const handleFieldChange = (fieldId: string, value: any) => {
    setFieldValues(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const renderField = (field: CustomField) => {
    const value = fieldValues[field.id] || '';

    switch (field.type) {
      case 'text':
      case 'email':
      case 'phone':
        return (
          <Input
            key={field.id}
            type={field.type}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            required={field.required}
          />
        );
      
      case 'textarea':
        return (
          <Textarea
            key={field.id}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            required={field.required}
          />
        );
      
      case 'select':
        return (
          <Select key={field.id} value={value} onValueChange={(val) => handleFieldChange(field.id, val)}>
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
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
          <div key={field.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => handleFieldChange(field.id, e.target.checked)}
              className="rounded"
            />
            <Label>{field.label}</Label>
          </div>
        );
      
      case 'date':
        return (
          <Input
            key={field.id}
            type="date"
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            required={field.required}
          />
        );
      
      default:
        return null;
    }
  };

  if (showFieldManager) {
    return (
      <div className="space-y-4">
        <Button 
          variant="outline" 
          onClick={() => setShowFieldManager(false)}
        >
          Back to Estimate Fields
        </Button>
        <CustomFieldManager 
          fields={customFields}
          onFieldsChange={setCustomFields}
        />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-base">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Estimate Fields
          </div>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => setShowFieldManager(true)}
            className="h-8 px-2 rounded hover:bg-gray-100"
          >
            <Settings className="h-4 w-4 text-blue-600" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {customFields.map((field) => (
          <div key={field.id} className="space-y-2">
            <Label>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            {renderField(field)}
          </div>
        ))}
        
        {customFields.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No custom fields configured</p>
            <Button 
              variant="outline" 
              onClick={() => setShowFieldManager(true)}
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Fields
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
