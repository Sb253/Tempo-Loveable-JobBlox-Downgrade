
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Camera, Upload, X, Image } from "lucide-react";

interface PhotoUploadProps {
  onUpload: (photo: UploadedPhoto) => void;
  maxFiles?: number;
  acceptedTypes?: string[];
}

interface UploadedPhoto {
  id: string;
  file: File;
  url: string;
  caption: string;
  category: string;
}

export const PhotoUpload = ({ 
  onUpload, 
  maxFiles = 5, 
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'] 
}: PhotoUploadProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [captions, setCaptions] = useState<string[]>([]);
  const [category, setCategory] = useState('progress');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    // Validate file types
    const validFiles = files.filter(file => acceptedTypes.includes(file.type));
    const invalidFiles = files.filter(file => !acceptedTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      toast({
        title: "Invalid File Type",
        description: `${invalidFiles.length} file(s) were skipped. Only JPEG, PNG, and WebP images are allowed.`,
        variant: "destructive"
      });
    }

    // Check file size (5MB limit)
    const oversizedFiles = validFiles.filter(file => file.size > 5 * 1024 * 1024);
    const acceptableFiles = validFiles.filter(file => file.size <= 5 * 1024 * 1024);
    
    if (oversizedFiles.length > 0) {
      toast({
        title: "File Too Large",
        description: `${oversizedFiles.length} file(s) were skipped. Maximum file size is 5MB.`,
        variant: "destructive"
      });
    }

    // Limit number of files
    const totalFiles = selectedFiles.length + acceptableFiles.length;
    const filesToAdd = totalFiles > maxFiles 
      ? acceptableFiles.slice(0, maxFiles - selectedFiles.length)
      : acceptableFiles;

    if (totalFiles > maxFiles) {
      toast({
        title: "Too Many Files",
        description: `Only ${maxFiles} files are allowed. Some files were not added.`,
        variant: "destructive"
      });
    }

    // Create previews
    const newPreviews: string[] = [];
    filesToAdd.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newPreviews.push(e.target?.result as string);
        if (newPreviews.length === filesToAdd.length) {
          setPreviews(prev => [...prev, ...newPreviews]);
          setCaptions(prev => [...prev, ...new Array(filesToAdd.length).fill('')]);
        }
      };
      reader.readAsDataURL(file);
    });

    setSelectedFiles(prev => [...prev, ...filesToAdd]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
    setCaptions(prev => prev.filter((_, i) => i !== index));
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const updateCaption = (index: number, caption: string) => {
    setCaptions(prev => prev.map((c, i) => i === index ? caption : c));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "No Files Selected",
        description: "Please select at least one photo to upload.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      selectedFiles.forEach((file, index) => {
        const uploadedPhoto: UploadedPhoto = {
          id: Date.now().toString() + index,
          file,
          url: previews[index],
          caption: captions[index] || `Photo ${index + 1}`,
          category
        };
        onUpload(uploadedPhoto);
      });

      toast({
        title: "Upload Successful",
        description: `${selectedFiles.length} photo(s) uploaded successfully.`,
      });

      // Reset form
      setSelectedFiles([]);
      setPreviews([]);
      setCaptions([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your photos. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      {/* File Input */}
      <Input
        ref={fileInputRef}
        type="file"
        multiple
        accept={acceptedTypes.join(',')}
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Upload Area */}
      <Card>
        <CardContent className="p-6">
          <div 
            onClick={triggerFileInput}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
          >
            <div className="flex flex-col items-center space-y-2">
              <Image className="h-12 w-12 text-gray-400" />
              <div>
                <p className="text-lg font-medium">Drop photos here or click to upload</p>
                <p className="text-sm text-muted-foreground">
                  Support for JPEG, PNG, WebP files (max 5MB each, up to {maxFiles} files)
                </p>
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Files
                </Button>
                <Button type="button" variant="outline">
                  <Camera className="h-4 w-4 mr-2" />
                  Take Photo
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Selection */}
      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          <Label htmlFor="category">Photo Category</Label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full h-10 px-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <option value="progress">Progress</option>
            <option value="before">Before</option>
            <option value="after">After</option>
            <option value="safety">Safety</option>
            <option value="quality">Quality</option>
            <option value="issue">Issue</option>
          </select>
        </div>
      )}

      {/* Preview and Captions */}
      {selectedFiles.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium">Selected Photos ({selectedFiles.length}/{maxFiles})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedFiles.map((file, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="relative">
                    <img
                      src={previews[index]}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded mb-3"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-1 right-1"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Caption</Label>
                    <Textarea
                      value={captions[index]}
                      onChange={(e) => updateCaption(index, e.target.value)}
                      placeholder="Add a description for this photo..."
                      rows={2}
                      className="text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Upload Button */}
      {selectedFiles.length > 0 && (
        <Button 
          onClick={handleUpload} 
          disabled={isUploading}
          className="w-full"
        >
          {isUploading ? (
            <>Uploading...</>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Upload {selectedFiles.length} Photo{selectedFiles.length > 1 ? 's' : ''}
            </>
          )}
        </Button>
      )}
    </div>
  );
};
