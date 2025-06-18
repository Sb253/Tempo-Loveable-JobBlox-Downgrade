
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Download, Star, Clock } from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  services: string[];
  complexity: 'simple' | 'intermediate' | 'advanced';
  rating: number;
  downloads: number;
  setupTime: string;
}

export const IntegrationTemplates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const templates: Template[] = [
    {
      id: '1',
      name: 'CRM to Email Marketing Sync',
      description: 'Automatically sync customer data from CRM to email marketing platform',
      category: 'Marketing',
      services: ['CRM', 'Mailchimp', 'HubSpot'],
      complexity: 'simple',
      rating: 4.8,
      downloads: 1247,
      setupTime: '5 minutes'
    },
    {
      id: '2',
      name: 'Invoice to Accounting Integration',
      description: 'Sync invoices and payments between business systems and accounting software',
      category: 'Finance',
      services: ['QuickBooks', 'Xero', 'FreshBooks'],
      complexity: 'intermediate',
      rating: 4.6,
      downloads: 892,
      setupTime: '15 minutes'
    },
    {
      id: '3',
      name: 'Project Management Workflow',
      description: 'Create comprehensive project workflow with task assignments and notifications',
      category: 'Operations',
      services: ['Asana', 'Slack', 'Teams'],
      complexity: 'advanced',
      rating: 4.9,
      downloads: 2156,
      setupTime: '30 minutes'
    },
    {
      id: '4',
      name: 'Customer Support Integration',
      description: 'Connect support tickets with CRM and knowledge base systems',
      category: 'Support',
      services: ['Zendesk', 'Intercom', 'CRM'],
      complexity: 'intermediate',
      rating: 4.7,
      downloads: 734,
      setupTime: '20 minutes'
    },
    {
      id: '5',
      name: 'E-commerce Order Processing',
      description: 'Automate order processing from store to fulfillment and accounting',
      category: 'E-commerce',
      services: ['Shopify', 'WooCommerce', 'ShipStation'],
      complexity: 'advanced',
      rating: 4.5,
      downloads: 1567,
      setupTime: '45 minutes'
    },
    {
      id: '6',
      name: 'Lead Qualification Pipeline',
      description: 'Score and route leads automatically based on criteria and behavior',
      category: 'Sales',
      services: ['CRM', 'Marketing Automation', 'Analytics'],
      complexity: 'intermediate',
      rating: 4.8,
      downloads: 923,
      setupTime: '25 minutes'
    }
  ];

  const categories = ['all', 'Marketing', 'Finance', 'Operations', 'Support', 'E-commerce', 'Sales'];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'simple': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Integration Templates</h3>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Custom Template
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <Badge className={getComplexityColor(template.complexity)}>
                  {template.complexity}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{template.description}</p>
              
              <div className="flex flex-wrap gap-1">
                {template.services.map((service) => (
                  <Badge key={service} variant="outline" className="text-xs">
                    {service}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span>{template.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Download className="h-4 w-4 text-muted-foreground" />
                  <span>{template.downloads}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{template.setupTime}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">Use Template</Button>
                <Button variant="outline">Preview</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
