
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileText, Wand2, Download, Copy, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DocumentTemplate {
  id: string;
  name: string;
  type: 'estimate' | 'invoice' | 'proposal' | 'report';
  description: string;
}

const templates: DocumentTemplate[] = [
  { id: '1', name: 'Kitchen Renovation Estimate', type: 'estimate', description: 'Complete kitchen remodel pricing' },
  { id: '2', name: 'Bathroom Repair Invoice', type: 'invoice', description: 'Standard bathroom repair billing' },
  { id: '3', name: 'Project Proposal', type: 'proposal', description: 'Comprehensive project proposal' },
  { id: '4', name: 'Job Completion Report', type: 'report', description: 'Post-job completion summary' }
];

export const SmartDocumentGenerator = () => {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [projectDetails, setProjectDetails] = useState('');
  const [customerInfo, setCustomerInfo] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateDocument = async () => {
    if (!selectedTemplate || !projectDetails) {
      toast({
        title: "Missing Information",
        description: "Please select a template and provide project details.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    // Simulate AI document generation
    setTimeout(() => {
      const template = templates.find(t => t.id === selectedTemplate);
      const mockContent = generateMockContent(template?.type || 'estimate', projectDetails, customerInfo);
      setGeneratedContent(mockContent);
      setIsGenerating(false);
      
      toast({
        title: "Document Generated",
        description: "Your AI-powered document is ready for review.",
      });
    }, 2000);
  };

  const generateMockContent = (type: string, details: string, customer: string) => {
    const baseContent = {
      estimate: `
# Project Estimate

**Customer:** ${customer || 'Customer Name'}
**Project:** ${details}
**Date:** ${new Date().toLocaleDateString()}

## Scope of Work
Based on the project details provided, this estimate includes:

- Material costs and specifications
- Labor requirements and timeline
- Permits and inspection fees
- Project management and coordination

## Cost Breakdown
| Item | Description | Quantity | Rate | Total |
|------|-------------|----------|------|-------|
| Materials | Premium grade materials | 1 | $2,500 | $2,500 |
| Labor | Skilled installation team | 40 hrs | $75/hr | $3,000 |
| Permits | Required permits and fees | 1 | $200 | $200 |

**Subtotal:** $5,700
**Tax (8.5%):** $484.50
**Total:** $6,184.50

## Terms & Conditions
- 50% deposit required to begin work
- Estimated completion: 5-7 business days
- All materials covered by manufacturer warranty
      `,
      invoice: `
# Invoice

**Invoice #:** INV-${Math.random().toString(36).substr(2, 9).toUpperCase()}
**Customer:** ${customer || 'Customer Name'}
**Project:** ${details}
**Date:** ${new Date().toLocaleDateString()}
**Due Date:** ${new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString()}

## Services Provided
Work completed as per agreed scope:

| Description | Quantity | Rate | Total |
|-------------|----------|------|-------|
| ${details || 'Project work'} | 1 | $5,700 | $5,700 |
| Materials and supplies | 1 | $2,500 | $2,500 |

**Subtotal:** $8,200
**Tax (8.5%):** $697
**Total Due:** $8,897

## Payment Information
Please remit payment within 30 days of invoice date.
      `,
      proposal: `
# Project Proposal

**Client:** ${customer || 'Client Name'}
**Project:** ${details}
**Prepared by:** JobBlox Construction
**Date:** ${new Date().toLocaleDateString()}

## Executive Summary
We are pleased to present this comprehensive proposal for your ${details} project. Our team brings extensive experience and commitment to quality craftsmanship.

## Project Overview
- **Scope:** Complete ${details}
- **Timeline:** 2-3 weeks
- **Team Size:** 3-4 skilled professionals
- **Quality Assurance:** Full inspection and warranty

## Our Approach
1. **Planning Phase:** Detailed project planning and permitting
2. **Execution Phase:** Quality-focused implementation
3. **Completion Phase:** Final inspection and cleanup

## Investment
Total project investment: $8,500 - $12,000
(Final pricing based on material selections and specific requirements)

## Next Steps
Upon approval, we will:
- Schedule site preparation
- Order materials
- Begin work within 5 business days
      `,
      report: `
# Job Completion Report

**Project:** ${details}
**Customer:** ${customer || 'Customer Name'}
**Completion Date:** ${new Date().toLocaleDateString()}
**Project Duration:** 7 days

## Work Summary
All scheduled work has been completed according to specifications:

✅ **Phase 1:** Site preparation and material delivery
✅ **Phase 2:** Primary installation work  
✅ **Phase 3:** Finishing and detail work
✅ **Phase 4:** Final inspection and cleanup

## Quality Metrics
- Work completed on schedule: Yes
- Customer satisfaction score: 9.5/10
- Quality inspection passed: Yes
- Site cleanup completed: Yes

## Materials Used
- All materials met or exceeded specifications
- Warranty documentation provided to customer
- Maintenance schedule provided

## Customer Feedback
"Excellent work quality and professional service. Very satisfied with the results."

## Recommendations
- Annual maintenance check recommended
- Contact us for any follow-up needs
      `
    };

    return baseContent[type as keyof typeof baseContent] || baseContent.estimate;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    toast({
      title: "Copied!",
      description: "Document content copied to clipboard.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Smart Document Generator
            <Badge variant="secondary">AI Powered</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Document Template</label>
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <div>
                          <div className="font-medium">{template.name}</div>
                          <div className="text-xs text-muted-foreground">{template.description}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Customer Information</label>
              <Input
                placeholder="Customer name, address, contact..."
                value={customerInfo}
                onChange={(e) => setCustomerInfo(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Project Details</label>
            <Textarea
              placeholder="Describe the project, materials needed, special requirements..."
              value={projectDetails}
              onChange={(e) => setProjectDetails(e.target.value)}
              rows={3}
            />
          </div>

          <Button 
            onClick={generateDocument} 
            disabled={isGenerating || !selectedTemplate}
            className="w-full"
          >
            {isGenerating ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Generating Document...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Wand2 className="h-4 w-4" />
                Generate AI Document
              </div>
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedContent && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Generated Document</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="whitespace-pre-wrap text-sm font-mono">{generatedContent}</pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
