
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, MapPin, WifiOff, Bell, Smartphone, Activity, Download } from "lucide-react";
import { CameraCapture } from "./CameraCapture";
import { GPSTracking } from "./GPSTracking";
import { OfflineSync } from "./OfflineSync";
import { PushNotifications } from "./PushNotifications";
import { MobileJobDocumentation } from "./MobileJobDocumentation";
import { MobileOptimizations } from "./MobileOptimizations";

interface CapturedPhoto {
  id: string;
  file: File;
  url: string;
  caption: string;
  category: string;
  timestamp: string;
  location?: string;
}

export const MobileFeaturesDashboard = () => {
  const [capturedPhotos, setCapturedPhotos] = useState<CapturedPhoto[]>([]);

  const photoCategories = [
    'progress',
    'before',
    'after',
    'safety',
    'quality',
    'issue',
    'materials',
    'completed'
  ];

  const handlePhotoCapture = (photo: CapturedPhoto) => {
    setCapturedPhotos(prev => [photo, ...prev]);
    
    // Add to offline storage if available
    if ((window as any).addOfflineData) {
      (window as any).addOfflineData('photo', photo);
    }
  };

  const downloadApp = () => {
    // This would typically trigger PWA install prompt
    alert('To install the mobile app:\n\n1. Open this site in your mobile browser\n2. Tap the "Add to Home Screen" option\n3. Or use the browser menu to install the app');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Mobile Features</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={downloadApp}>
            <Download className="h-4 w-4 mr-2" />
            Install App
          </Button>
          <Badge variant="outline" className="flex items-center gap-1">
            <Smartphone className="h-3 w-3" />
            Mobile Ready
          </Badge>
        </div>
      </div>

      {/* Feature Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Camera className="h-8 w-8 text-blue-600" />
              <div>
                <p className="font-medium">Photo Capture</p>
                <p className="text-sm text-muted-foreground">Camera integration</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <MapPin className="h-8 w-8 text-green-600" />
              <div>
                <p className="font-medium">GPS Tracking</p>
                <p className="text-sm text-muted-foreground">Field team location</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <WifiOff className="h-8 w-8 text-orange-600" />
              <div>
                <p className="font-medium">Offline Mode</p>
                <p className="text-sm text-muted-foreground">Work without internet</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Bell className="h-8 w-8 text-purple-600" />
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-muted-foreground">Real-time alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Feature Tabs */}
      <Tabs defaultValue="camera" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="camera">Camera</TabsTrigger>
          <TabsTrigger value="gps">GPS</TabsTrigger>
          <TabsTrigger value="offline">Offline</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="camera" className="space-y-4">
          <CameraCapture 
            onPhotoCapture={handlePhotoCapture}
            categories={photoCategories}
          />
          
          {capturedPhotos.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recently Captured ({capturedPhotos.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {capturedPhotos.slice(0, 8).map((photo) => (
                    <div key={photo.id} className="space-y-2">
                      <img 
                        src={photo.url} 
                        alt={photo.caption}
                        className="w-full h-24 object-cover rounded border"
                      />
                      <div className="text-xs">
                        <p className="font-medium truncate">{photo.caption}</p>
                        <Badge variant="outline" className="text-xs">
                          {photo.category}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="gps">
          <GPSTracking />
        </TabsContent>

        <TabsContent value="offline">
          <OfflineSync />
        </TabsContent>

        <TabsContent value="notifications">
          <PushNotifications />
        </TabsContent>

        <TabsContent value="documentation">
          <MobileJobDocumentation />
        </TabsContent>

        <TabsContent value="optimization">
          <MobileOptimizations />
        </TabsContent>
      </Tabs>
    </div>
  );
};
