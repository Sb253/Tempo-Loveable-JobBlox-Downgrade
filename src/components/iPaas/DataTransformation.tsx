
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Code, Database, FileJson, Shuffle } from "lucide-react";

interface TransformationRule {
  id: string;
  name: string;
  sourceField: string;
  targetField: string;
  transformation: string;
  dataType: string;
  status: 'active' | 'inactive';
}

export const DataTransformation = () => {
  const [transformationRules, setTransformationRules] = useState<TransformationRule[]>([
    {
      id: '1',
      name: 'Format Phone Numbers',
      sourceField: 'phone',
      targetField: 'formatted_phone',
      transformation: 'formatPhoneUS',
      dataType: 'string',
      status: 'active'
    },
    {
      id: '2',
      name: 'Calculate Total Price',
      sourceField: 'price, quantity',
      targetField: 'total_amount',
      transformation: 'multiply',
      dataType: 'number',
      status: 'active'
    },
    {
      id: '3',
      name: 'Extract Domain from Email',
      sourceField: 'email',
      targetField: 'company_domain',
      transformation: 'extractDomain',
      dataType: 'string',
      status: 'inactive'
    }
  ]);

  const [showNewRule, setShowNewRule] = useState(false);

  const transformationTypes = [
    { value: 'formatPhone', label: 'Format Phone Number' },
    { value: 'formatDate', label: 'Format Date' },
    { value: 'uppercase', label: 'Convert to Uppercase' },
    { value: 'lowercase', label: 'Convert to Lowercase' },
    { value: 'extractDomain', label: 'Extract Domain' },
    { value: 'multiply', label: 'Multiply Values' },
    { value: 'concatenate', label: 'Concatenate Fields' },
    { value: 'split', label: 'Split String' },
    { value: 'custom', label: 'Custom JavaScript' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Data Transformation</h3>
        <Button onClick={() => setShowNewRule(true)}>
          <Shuffle className="h-4 w-4 mr-2" />
          New Transformation
        </Button>
      </div>

      {/* Transformation Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Code className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{transformationRules.length}</p>
                <p className="text-sm text-muted-foreground">Active Rules</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">15.2K</p>
                <p className="text-sm text-muted-foreground">Records Processed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileJson className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">99.7%</p>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shuffle className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">47</p>
                <p className="text-sm text-muted-foreground">Transformations/min</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transformation Rules */}
      <Card>
        <CardHeader>
          <CardTitle>Transformation Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transformationRules.map((rule) => (
              <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="font-medium text-sm">{rule.sourceField}</p>
                    <p className="text-xs text-muted-foreground">Source</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <div className="text-center">
                    <Badge variant="outline">{rule.transformation}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">Transform</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <div className="text-center">
                    <p className="font-medium text-sm">{rule.targetField}</p>
                    <p className="text-xs text-muted-foreground">Target</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Badge variant={rule.dataType === 'string' ? 'secondary' : 'default'}>
                    {rule.dataType}
                  </Badge>
                  <Badge variant={rule.status === 'active' ? 'default' : 'outline'}>
                    {rule.status}
                  </Badge>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Create New Transformation Rule */}
      {showNewRule && (
        <Card>
          <CardHeader>
            <CardTitle>Create Transformation Rule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Rule Name</label>
                <Input placeholder="Enter rule name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Transformation Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select transformation" />
                  </SelectTrigger>
                  <SelectContent>
                    {transformationTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Source Field(s)</label>
                <Input placeholder="e.g., firstName, lastName" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Target Field</label>
                <Input placeholder="e.g., fullName" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Custom JavaScript (if applicable)</label>
              <Textarea 
                placeholder="function transform(input) { return input.toUpperCase(); }"
                rows={4}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={() => setShowNewRule(false)}>Create Rule</Button>
              <Button variant="outline" onClick={() => setShowNewRule(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Field Mapping Helper */}
      <Card>
        <CardHeader>
          <CardTitle>Field Mapping Helper</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Source Schema</h4>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm">
{`{
  "customer_name": "string",
  "phone_number": "string", 
  "email_address": "string",
  "order_total": "number",
  "created_date": "date"
}`}
                </pre>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Target Schema</h4>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm">
{`{
  "name": "string",
  "phone": "string",
  "email": "string", 
  "total_amount": "number",
  "timestamp": "datetime"
}`}
                </pre>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
