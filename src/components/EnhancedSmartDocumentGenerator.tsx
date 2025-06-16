
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wand2, Sparkles, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { aiService, type DocumentGenerationRequest } from "@/services/aiService";

// Components
import { TemplateSelector } from "@/components/ai/document/TemplateSelector";
import { VoiceInputField } from "@/components/ai/document/VoiceInputField";
import { GenerationProgress } from "@/components/ai/document/GenerationProgress";
import { DocumentPreview } from "@/components/ai/document/DocumentPreview";

// Types and data
import { documentTemplates } from "@/types/documentTemplates";

// Custom hooks
import { useVoiceRecognition } from "@/hooks/ai/useVoiceRecognition";

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
  const [activeField, setActiveField] = useState<string>('');

  const { 
    isListening, 
    startListening, 
    stopListening 
  } = useVoiceRecognition();

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
      const template = documentTemplates.find(t => t.id === selectedTemplate);
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
    startListening((transcript) => {
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
      setActiveField('');
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
          <TemplateSelector 
            value={selectedTemplate} 
            onChange={setSelectedTemplate} 
          />

          {/* Customer Information */}
          <VoiceInputField
            label="Customer Information"
            value={customerInfo}
            onChange={setCustomerInfo}
            placeholder="Customer name, address, contact details..."
            isListening={isListening && activeField === 'customerInfo'}
            onVoiceStart={() => startVoiceInput('customerInfo')}
            onVoiceStop={stopListening}
          />

          {/* Project Details */}
          <VoiceInputField
            label="Project Details"
            value={projectDetails}
            onChange={setProjectDetails}
            placeholder="Describe the project, materials needed, scope of work, special requirements..."
            isListening={isListening && activeField === 'projectDetails'}
            onVoiceStart={() => startVoiceInput('projectDetails')}
            onVoiceStop={stopListening}
            isTextarea={true}
            rows={4}
          />

          {/* Additional Notes */}
          <VoiceInputField
            label="Additional Notes"
            value={additionalNotes}
            onChange={setAdditionalNotes}
            placeholder="Any additional context, special terms, or custom requirements..."
            isListening={isListening && activeField === 'additionalNotes'}
            onVoiceStart={() => startVoiceInput('additionalNotes')}
            onVoiceStop={stopListening}
            isTextarea={true}
            rows={2}
          />

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
            <GenerationProgress progress={generationProgress} />
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
        <DocumentPreview content={generatedContent} />
      )}
    </div>
  );
};
