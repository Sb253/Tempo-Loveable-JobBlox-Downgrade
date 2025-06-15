
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QuoteTemplate } from "./QuoteTemplate";
import { Eye, Download, Printer, Send } from "lucide-react";

interface QuotePreviewProps {
  data: any;
  onClose: () => void;
  onTemplateSelect: (template: string) => void;
  selectedTemplate?: string;
}

export const QuotePreview: React.FC<QuotePreviewProps> = ({
  data,
  onClose,
  onTemplateSelect,
  selectedTemplate = 'modern'
}) => {
  const [currentTemplate, setCurrentTemplate] = useState<'modern' | 'classic' | 'minimal'>(selectedTemplate as 'modern' | 'classic' | 'minimal');

  const handleTemplateChange = (template: string) => {
    setCurrentTemplate(template as 'modern' | 'classic' | 'minimal');
    onTemplateSelect(template);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    console.log('Downloading quote PDF...');
  };

  const handleSend = () => {
    console.log('Sending quote to customer...');
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Quote Preview
            </span>
            <div className="flex items-center gap-4">
              <Select value={currentTemplate} onValueChange={handleTemplateChange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="classic">Classic</SelectItem>
                  <SelectItem value="minimal">Minimal</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={handleSend}>
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                PDF
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-6 bg-gray-100 p-8 rounded-lg">
          <QuoteTemplate data={data} template={currentTemplate} />
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={() => {
            onTemplateSelect(currentTemplate);
            onClose();
          }}>
            Use This Template
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
