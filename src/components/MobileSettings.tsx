
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Smartphone, Camera, MapPin, Wifi } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const MobileSettings = () => {
  const { toast } = useToast();

  const requestPermissions = async () => {
    // Location permission
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          toast({
            title: "Location Permission Granted",
            description: "GPS tracking is now available",
          });
        },
        () => {
          toast({
            title: "Location Permission Denied",
            description: "Some features may be limited",
            variant: "destructive",
          });
        }
      );
    }

    // Notification permission
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        toast({
          title: "Notifications Enabled",
          description: "You'll receive important updates",
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Mobile Settings</h2>
        <p className="text-muted-foreground">Configure mobile app features and permissions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Mobile Features
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Offline Mode</Label>
              <div className="text-sm text-muted-foreground">Work without internet connection</div>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label>Push Notifications</Label>
              <div className="text-sm text-muted-foreground">Receive job updates and alerts</div>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Auto-sync</Label>
              <div className="text-sm text-muted-foreground">Sync data when online</div>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Device Permissions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button onClick={requestPermissions} className="w-full flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Enable Location & Notifications
          </Button>
          
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center p-3 border rounded-lg">
              <Camera className="h-6 w-6 mx-auto mb-2 text-blue-600" />
              <div className="text-xs">Camera</div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <MapPin className="h-6 w-6 mx-auto mb-2 text-green-600" />
              <div className="text-xs">Location</div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <Wifi className="h-6 w-6 mx-auto mb-2 text-purple-600" />
              <div className="text-xs">Network</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mobile Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>🔗 <strong>Current:</strong> Web app accessible via browser</p>
            <p>📱 <strong>Next:</strong> Export to Github and build native app</p>
            <p>⚡ <strong>Features:</strong> Offline mode, push notifications, camera access</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
