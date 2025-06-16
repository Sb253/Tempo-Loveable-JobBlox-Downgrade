
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Plus, Edit, Trash2, Save, Eye } from "lucide-react";

interface Template {
  id: string;
  name: string;
  type: 'estimate' | 'invoice';
  content: string;
  variables: string[];
  isDefault: boolean;
  lastModified: string;
}

export const TemplateEditor = () => {
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: '1',
      name: 'Standard Estimate',
      type: 'estimate',
      content: `Estimate for {{customer_name}}
      
Project: {{project_title}}
Date: {{date}}

Services:
{{services_list}}

Total: {{total_amount}}`,
      variables: ['customer_name', 'project_title', 'date', 'services_list', 'total_amount'],
      isDefault: true,
      lastModified: '2024-01-15'
    },
    {
      id: '2',
      name: 'Detailed Invoice',
      type: 'invoice',
      content: `INVOICE #{{invoice_number}}

Bill To: {{customer_name}}
{{customer_address}}

Date: {{date}}
Due Date: {{due_date}}

Description of Services:
{{services_description}}

Amount Due: {{total_amount}}`,
      variables: ['invoice_number', 'customer_name', 'customer_address', 'date', 'due_date', 'services_description', 'total_amount'],
      isDefault: true,
      lastModified: '2024-01-15'
    }
  ]);

  const [activeTemplate, setActiveTemplate] = useState<Template | null>(templates[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const saveTemplate = () => {
    if (activeTemplate) {
      setTemplates(templates.map(t => 
        t.id === activeTemplate.id 
          ? { ...activeTemplate, lastModified: new Date().toISOString().split('T')[0] }
          : t
      ));
      setIsEditing(false);
    }
  };

  const createNewTemplate = (type: 'estimate' | 'invoice') => {
    const newTemplate: Template = {
      id: Date.now().toString(),
      name: `New ${type}`,
      type,
      content: `New ${type} template content here...`,
      variables: [],
      isDefault: false,
      lastModified: new Date().toISOString().split('T')[0]
    };
    setTemplates([...templates, newTemplate]);
    setActiveTemplate(newTemplate);
    setIsEditing(true);
  };

  const deleteTemplate = (id: string) => {
    const template = templates.find(t => t.id === id);
    if (template && !template.isDefault) {
      setTemplates(templates.filter(t => t.id !== id));
      setActiveTemplate(templates[0]);
    }
  };

  const renderPreview = () => {
    if (!activeTemplate) return '';
    
    let preview = activeTemplate.content;
    activeTemplate.variables.forEach(variable => {
      preview = preview.replace(
        new RegExp(`{{${variable}}}`, 'g'), 
        `[${variable.replace('_', ' ').toUpperCase()}]`
      );
    });
    return preview;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Template Editor</h3>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => createNewTemplate('estimate')}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Estimate
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => createNewTemplate('invoice')}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Invoice
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Template List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="estimate" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="estimate">Estimates</TabsTrigger>
                <TabsTrigger value="invoice">Invoices</TabsTrigger>
              </TabsList>
              
              <TabsContent value="estimate" className="space-y-2">
                {templates.filter(t => t.type === 'estimate').map(template => (
                  <div 
                    key={template.id}
                    className={`p-3 border rounded cursor-pointer hover:bg-muted ${
                      activeTemplate?.id === template.id ? 'border-primary bg-muted' : ''
                    }`}
                    onClick={() => setActiveTemplate(template)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">{template.name}</div>
                        <div className="text-xs text-muted-foreground">
                          Modified: {template.lastModified}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {template.isDefault && (
                          <Badge variant="secondary" className="text-xs">Default</Badge>
                        )}
                        {!template.isDefault && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteTemplate(template.id);
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="invoice" className="space-y-2">
                {templates.filter(t => t.type === 'invoice').map(template => (
                  <div 
                    key={template.id}
                    className={`p-3 border rounded cursor-pointer hover:bg-muted ${
                      activeTemplate?.id === template.id ? 'border-primary bg-muted' : ''
                    }`}
                    onClick={() => setActiveTemplate(template)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">{template.name}</div>
                        <div className="text-xs text-muted-foreground">
                          Modified: {template.lastModified}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {template.isDefault && (
                          <Badge variant="secondary" className="text-xs">Default</Badge>
                        )}
                        {!template.isDefault && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteTemplate(template.id);
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Editor */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {activeTemplate?.name || 'Select a template'}
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPreviewMode(!previewMode)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  {previewMode ? 'Edit' : 'Preview'}
                </Button>
                {isEditing && (
                  <Button size="sm" onClick={saveTemplate}>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                )}
                {!isEditing && activeTemplate && (
                  <Button size="sm" onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {activeTemplate && (
              <div className="space-y-4">
                {isEditing && (
                  <div>
                    <label className="text-sm font-medium">Template Name</label>
                    <Input
                      value={activeTemplate.name}
                      onChange={(e) => setActiveTemplate({
                        ...activeTemplate,
                        name: e.target.value
                      })}
                    />
                  </div>
                )}
                
                <div>
                  <label className="text-sm font-medium">Content</label>
                  {previewMode ? (
                    <div className="w-full h-64 p-3 border rounded bg-muted font-mono text-sm whitespace-pre-wrap">
                      {renderPreview()}
                    </div>
                  ) : (
                    <Textarea
                      value={activeTemplate.content}
                      onChange={(e) => setActiveTemplate({
                        ...activeTemplate,
                        content: e.target.value
                      })}
                      className="h-64 font-mono text-sm"
                      disabled={!isEditing}
                    />
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium">Available Variables</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {activeTemplate.variables.map(variable => (
                      <Badge key={variable} variant="outline">
                        {`{{${variable}}}`}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
