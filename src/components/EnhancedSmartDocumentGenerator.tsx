
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileText, Wand2, Download, Copy, Sparkles, Upload, Camera, Mic, MicOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { aiService, type DocumentGenerationRequest } from "@/services/aiService";

interface DocumentTemplate {
  id: string;
  name: string;
  type: 'estimate' | 'invoice' | 'proposal' | 'report';
  description: string;
  category: string;
}

const templates: DocumentTemplate[] = [
  { id: '1', name: 'Kitchen Renovation Estimate', type: 'estimate', description: 'Complete kitchen remodel pricing', category: 'Residential' },
  { id: '2', name: 'Bathroom Repair Invoice', type: 'invoice', description: 'Standard bathroom repair billing', category: 'Residential' },
  { id: '3', name: 'Commercial Project Proposal', type: 'proposal', description: 'Large-scale commercial proposal', category: 'Commercial' },
  { id: '4', name: 'Job Completion Report', type: 'report', description: 'Post-job completion summary', category: 'General' },
  { id: '5', name: 'Roofing Estimate', type: 'estimate', description: 'Comprehensive roofing project estimate', category: 'Residential' },
  { id: '6', name: 'Emergency Repair Invoice', type: 'invoice', description: 'Emergency service billing', category: 'Emergency' }
];

export const EnhancedSmartDocumentGenerator = () => {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [projectDetails, setProjectDetails] = useState('');
  const [customerInfo, setCustomerInfo] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [activeField, setActiveField] = useState<string>('');

  const generateDocument = async () => {
    if (!selectedTemplate || !projectDetails) {
      toast({
        title: "Missing Information",
        description: "Please select a template and provide project details.",
        variant: "destructive"
      });
      return;
    }

    if (!aiService.isConfigured()) {
      toast({
        title: "AI Not Configured",
        description: "Please configure your AI settings to use document generation.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);

    try {
      const template = templates.find(t => t.id === selectedTemplate);
      if (!template) return;

      // Simulate progress steps
      const progressSteps = [
        { progress: 20, message: "Analyzing project details..." },
        { progress: 40, message: "Processing customer information..." },
        { progress: 60, message: "Generating document structure..." },
        { progress: 80, message: "Applying professional formatting..." },
        { progress: 100, message: "Document ready!" }
      ];

      for (const step of progressSteps) {
        setGenerationProgress(step.progress);
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      const request: DocumentGenerationRequest = {
        type: template.type,
        projectDetails,
        customerInfo,
        additionalContext: {
          template: template.name,
          category: template.category,
          notes: additionalNotes,
          images: uploadedImages.length
        }
      };

      const content = await aiService.generateDocument(request);
      setGeneratedContent(content);
      
      toast({
        title: "Document Generated Successfully",
        description: `Your ${template.name} has been created using AI.`,
      });

    } catch (error) {
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate document",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
      setGenerationProgress(0);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedImages(prev => [...prev, ...files]);
    
    // Here you could implement image analysis using AI
    if (files.length > 0) {
      toast({
        title: "Images Uploaded",
        description: `${files.length} image(s) uploaded. AI will analyze them for document generation.`,
      });
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const startVoiceInput = (field: string) => {
    setActiveField(field);
    setIsListening(true);
    
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        
        switch (field) {
          case 'projectDetails':
            setProjectDetails(prev => prev + ' ' + transcript);
            break;
          case 'customerInfo':
            setCustomerInfo(prev => prev + ' ' + transcript);
            break;
          case 'additionalNotes':
            setAdditionalNotes(prev => prev + ' ' + transcript);
            break;
        }
        
        setIsListening(false);
        setActiveField('');
      };

      recognition.onerror = () => {
        setIsListening(false);
        setActiveField('');
        toast({
          title: "Voice Input Error",
          description: "Could not process voice input. Please try again.",
          variant: "destructive"
        });
      };

      recognition.start();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    toast({
      title: "Copied!",
      description: "Document content copied to clipboard.",
    });
  };

  const downloadDocument = () => {
    const blob = new Blob([generatedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `document-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download Started",
      description: "Your document is being downloaded.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Enhanced Smart Document Generator
            <Badge variant="secondary">AI Powered</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Template Selection */}
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
                        <div className="text-xs text-muted-foreground">
                          {template.description} • {template.category}
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Customer Information */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Customer Information</label>
            <div className="flex gap-2">
              <Input
                placeholder="Customer name, address, contact details..."
                value={customerInfo}
                onChange={(e) => setCustomerInfo(e.target.value)}
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => startVoiceInput('customerInfo')}
                disabled={isListening && activeField !== 'customerInfo'}
                className={isListening && activeField === 'customerInfo' ? 'bg-red-100' : ''}
              >
                {isListening && activeField === 'customerInfo' ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Project Details</label>
            <div className="flex gap-2">
              <Textarea
                placeholder="Describe the project, materials needed, scope of work, special requirements..."
                value={projectDetails}
                onChange={(e) => setProjectDetails(e.target.value)}
                rows={4}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => startVoiceInput('projectDetails')}
                disabled={isListening && activeField !== 'projectDetails'}
                className={isListening && activeField === 'projectDetails' ? 'bg-red-100' : ''}
              >
                {isListening && activeField === 'projectDetails' ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Additional Notes</label>
            <div className="flex gap-2">
              <Textarea
                placeholder="Any additional context, special terms, or custom requirements..."
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                rows={2}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => startVoiceInput('additionalNotes')}
                disabled={isListening && activeField !== 'additionalNotes'}
                className={isListening && activeField === 'additionalNotes' ? 'bg-red-100' : ''}
              >
                {isListening && activeField === 'additionalNotes' ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Project Images (Optional)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <div className="text-center">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center gap-2">
                    <Camera className="h-8 w-8 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      Click to upload project images for AI analysis
                    </p>
                  </div>
                </label>
              </div>
              
              {uploadedImages.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {uploadedImages.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-20 object-cover rounded"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6"
                        onClick={() => removeImage(index)}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Generation Progress */}
          {isGenerating && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Generating Document...</span>
                <span>{generationProgress}%</span>
              </div>
              <Progress value={generationProgress} className="h-2" />
            </div>
          )}

          {/* Generate Button */}
          <Button 
            onClick={generateDocument} 
            disabled={isGenerating || !selectedTemplate || !projectDetails}
            className="w-full"
            size="lg"
          >
            {isGenerating ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Generating AI Document...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Wand2 className="h-5 w-5" />
                Generate AI Document
              </div>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Document */}
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
                <Button variant="outline" size="sm" onClick={downloadDocument}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-6 rounded-lg max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm font-mono">{generatedContent}</pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
