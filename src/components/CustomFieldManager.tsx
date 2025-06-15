import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, Settings } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export interface CustomField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'phone' | 'textarea' | 'select' | 'checkbox' | 'date';
  required: boolean;
  placeholder?: string;
  options?: string[];
}

interface CustomFieldManagerProps {
  fields: CustomField[];
  onFieldsChange: (fields: CustomField[]) => void;
}

export const CustomFieldManager = ({ fields, onFieldsChange }: CustomFieldManagerProps) => {
  const [editingField, setEditingField] = useState<CustomField | null>(null);
  const [newFieldLabel, setNewFieldLabel] = useState('');
  const [newFieldType, setNewFieldType] = useState<CustomField['type']>('text');

  const addField = () => {
    if (!newFieldLabel.trim()) return;
    
    const newField: CustomField = {
      id: Date.now().toString(),
      label: newFieldLabel,
      type: newFieldType,
      required: false,
      placeholder: `Enter ${newFieldLabel.toLowerCase()}`
    };
    
    onFieldsChange([...fields, newField]);
    setNewFieldLabel('');
    setNewFieldType('text');
  };

  const updateField = (id: string, updates: Partial<CustomField>) => {
    onFieldsChange(fields.map(field => 
      field.id === id ? { ...field, ...updates } : field
    ));
  };

  const removeField = (id: string) => {
    onFieldsChange(fields.filter(field => field.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Custom Fields Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add new field */}
        <div className="flex gap-2">
          <Input
            placeholder="Field name"
            value={newFieldLabel}
            onChange={(e) => setNewFieldLabel(e.target.value)}
            className="flex-1"
          />
          <Select value={newFieldType} onValueChange={(value: CustomField['type']) => setNewFieldType(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text">Text</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="phone">Phone</SelectItem>
              <SelectItem value="textarea">Textarea</SelectItem>
              <SelectItem value="select">Select</SelectItem>
              <SelectItem value="checkbox">Checkbox</SelectItem>
              <SelectItem value="date">Date</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={addField} size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Existing fields */}
        <div className="space-y-2">
          {fields.map((field) => (
            <div key={field.id} className="flex items-center gap-2 p-2 border rounded">
              <div className="flex-1">
                <span className="font-medium">{field.label}</span>
                <span className="text-sm text-muted-foreground ml-2">({field.type})</span>
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" onClick={() => setEditingField(field)}>
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Field: {field.label}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Field Label</Label>
                      <Input
                        value={editingField?.label || field.label}
                        onChange={(e) => updateField(field.id, { label: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Placeholder</Label>
                      <Input
                        value={field.placeholder || ''}
                        onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={(e) => updateField(field.id, { required: e.target.checked })}
                      />
                      <Label>Required field</Label>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="destructive" size="sm" onClick={() => removeField(field.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
