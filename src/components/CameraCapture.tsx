
import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Camera, Upload, X, Check } from "lucide-react";

interface CapturedPhoto {
  id: string;
  file: File;
  url: string;
  caption: string;
  category: string;
  timestamp: string;
  location?: string;
}

interface CameraCaptureProps {
  onPhotoCapture: (photo: CapturedPhoto) => void;
  categories: string[];
}

export const CameraCapture = ({ onPhotoCapture, categories }: CameraCaptureProps) => {
  const { toast } = useToast();
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0] || 'progress');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment', // Use back camera on mobile
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCapturing(true);
      }
    } catch (error) {
      toast({
        title: "Camera Access Denied",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCapturing(false);
    setCapturedPhoto(null);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    
    if (context) {
      context.drawImage(videoRef.current, 0, 0);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
      setCapturedPhoto(dataUrl);
    }
  };

  const savePhoto = async () => {
    if (!capturedPhoto) return;

    try {
      // Convert data URL to blob
      const response = await fetch(capturedPhoto);
      const blob = await response.blob();
      
      // Create file
      const file = new File([blob], `photo_${Date.now()}.jpg`, { type: 'image/jpeg' });
      
      // Get current location if available
      let location = '';
      if ('geolocation' in navigator) {
        try {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
          });
          location = `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`;
        } catch (error) {
          console.log('Location not available');
        }
      }

      const photo: CapturedPhoto = {
        id: Date.now().toString(),
        file,
        url: capturedPhoto,
        caption: caption || 'Job site photo',
        category: selectedCategory,
        timestamp: new Date().toISOString(),
        location
      };

      onPhotoCapture(photo);
      
      toast({
        title: "Photo Saved",
        description: "Photo has been captured and saved successfully.",
      });

      // Reset state
      setCapturedPhoto(null);
      setCaption('');
      stopCamera();
      
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Unable to save photo. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      setCapturedPhoto(url);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5" />
          Camera Capture
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isCapturing && !capturedPhoto && (
          <div className="flex gap-2">
            <Button onClick={startCamera} className="flex-1">
              <Camera className="h-4 w-4 mr-2" />
              Open Camera
            </Button>
            <Button 
              variant="outline" 
              onClick={() => fileInputRef.current?.click()}
              className="flex-1"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Photo
            </Button>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />

        {isCapturing && (
          <div className="space-y-4">
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-64 object-cover rounded-lg bg-black"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={capturePhoto} className="flex-1">
                <Camera className="h-4 w-4 mr-2" />
                Capture
              </Button>
              <Button variant="outline" onClick={stopCamera}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        )}

        {capturedPhoto && (
          <div className="space-y-4">
            <div className="relative">
              <img 
                src={capturedPhoto} 
                alt="Captured" 
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="caption">Photo Caption</Label>
                <Textarea
                  id="caption"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Describe what this photo shows..."
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={savePhoto} className="flex-1">
                <Check className="h-4 w-4 mr-2" />
                Save Photo
              </Button>
              <Button variant="outline" onClick={() => setCapturedPhoto(null)}>
                <X className="h-4 w-4 mr-2" />
                Retake
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
