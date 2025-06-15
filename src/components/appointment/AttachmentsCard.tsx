
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CameraCapture } from "../CameraCapture";
import { Paperclip, Camera, Upload, FileText, Image, X } from "lucide-react";

interface Attachment {
  id: string;
  name: string;
  type: 'image' | 'document';
  url: string;
  size: string;
  uploadedAt: string;
}

export const AttachmentsCard = () => {
  const { toast } = useToast();
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [showCamera, setShowCamera] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const attachment: Attachment = {
          id: Date.now().toString() + Math.random(),
          name: file.name,
          type: file.type.startsWith('image/') ? 'image' : 'document',
          url: e.target?.result as string,
          size: `${(file.size / 1024).toFixed(1)} KB`,
          uploadedAt: new Date().toLocaleTimeString()
        };
        
        setAttachments(prev => [...prev, attachment]);
        toast({
          title: "File Uploaded",
          description: `${file.name} has been uploaded successfully.`,
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const handlePhotoCapture = (photo: any) => {
    const attachment: Attachment = {
      id: photo.id,
      name: `Photo_${new Date().toLocaleDateString()}.jpg`,
      type: 'image',
      url: photo.url,
      size: `${(photo.file.size / 1024).toFixed(1)} KB`,
      uploadedAt: new Date().toLocaleTimeString()
    };
    
    setAttachments(prev => [...prev, attachment]);
    setShowCamera(false);
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(att => att.id !== id));
    toast({
      title: "Attachment Removed",
      description: "The attachment has been removed.",
    });
  };

  if (showCamera) {
    return (
      <div className="space-y-4">
        <Button 
          variant="outline" 
          onClick={() => setShowCamera(false)}
          className="mb-4"
        >
          <X className="h-4 w-4 mr-2" />
          Back to Attachments
        </Button>
        <CameraCapture 
          onPhotoCapture={handlePhotoCapture}
          categories={['progress', 'before', 'after', 'issue', 'completed']}
        />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-base">
          <div className="flex items-center gap-2">
            <Paperclip className="h-5 w-5" />
            Attachments ({attachments.length})
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            onClick={() => setShowCamera(true)}
            className="flex flex-col gap-1 h-16"
          >
            <Camera className="h-5 w-5" />
            <span className="text-xs">Take Photo</span>
          </Button>
          
          <label>
            <Button
              variant="outline"
              className="flex flex-col gap-1 h-16 w-full cursor-pointer"
              asChild
            >
              <span>
                <Upload className="h-5 w-5" />
                <span className="text-xs">Upload Files</span>
              </span>
            </Button>
            <input
              type="file"
              multiple
              accept="image/*,application/pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {attachments.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Uploaded Files</h4>
            {attachments.map((attachment) => (
              <div key={attachment.id} className="flex items-center gap-3 p-2 border rounded-lg">
                <div className="flex-shrink-0">
                  {attachment.type === 'image' ? (
                    <Image className="h-5 w-5 text-blue-500" />
                  ) : (
                    <FileText className="h-5 w-5 text-gray-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{attachment.name}</p>
                  <p className="text-xs text-gray-500">{attachment.size} • {attachment.uploadedAt}</p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeAttachment(attachment.id)}
                  className="flex-shrink-0"
                >
                  <X className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
