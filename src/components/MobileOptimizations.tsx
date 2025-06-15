
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Tablet, Monitor, Wifi, Battery, MapPin, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const MobileOptimizations = () => {
  const { toast } = useToast();
  const [deviceInfo, setDeviceInfo] = useState({
    type: 'desktop',
    online: true,
    battery: 100,
    location: null as GeolocationPosition | null
  });
  
  const [settings, setSettings] = useState({
    offlineMode: true,
    autoSync: true,
    locationTracking: false,
    pushNotifications: true,
    dataCompression: true,
    lowBandwidthMode: false
  });

  useEffect(() => {
    // Detect device type
    const detectDevice = () => {
      const width = window.innerWidth;
      if (width < 768) return 'mobile';
      if (width < 1024) return 'tablet';
      return 'desktop';
    };

    // Check online status
    const updateOnlineStatus = () => {
      setDeviceInfo(prev => ({ ...prev, online: navigator.onLine }));
    };

    // Get battery info (if available)
    const getBatteryInfo = async () => {
      if ('getBattery' in navigator) {
        try {
          const battery = await (navigator as any).getBattery();
          setDeviceInfo(prev => ({ 
            ...prev, 
            battery: Math.round(battery.level * 100) 
          }));
        } catch (error) {
          console.log('Battery API not available');
        }
      }
    };

    setDeviceInfo(prev => ({ ...prev, type: detectDevice() }));
    updateOnlineStatus();
    getBatteryInfo();

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    window.addEventListener('resize', () => {
      setDeviceInfo(prev => ({ ...prev, type: detectDevice() }));
    });

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  const getDeviceIcon = () => {
    switch (deviceInfo.type) {
      case 'mobile': return Smartphone;
      case 'tablet': return Tablet;
      default: return Monitor;
    }
  };

  const requestLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setDeviceInfo(prev => ({ ...prev, location: position }));
          setSettings(prev => ({ ...prev, locationTracking: true }));
          toast({
            title: "Location Access Granted",
            description: "GPS tracking is now enabled for field teams",
          });
        },
        (error) => {
          toast({
            title: "Location Access Denied",
            description: "Unable to access location services",
            variant: "destructive",
          });
        }
      );
    }
  };

  const enableNotifications = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setSettings(prev => ({ ...prev, pushNotifications: true }));
        toast({
          title: "Notifications Enabled",
          description: "You'll now receive push notifications",
        });
      }
    }
  };

  const DeviceIcon = getDeviceIcon();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Mobile Optimizations</h2>
        <Badge className={deviceInfo.online ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
          {deviceInfo.online ? (
            <>
              <Wifi className="h-3 w-3 mr-1" />
              Online
            </>
          ) : (
            "Offline"
          )}
        </Badge>
      </div>

      {/* Device Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DeviceIcon className="h-5 w-5" />
            Device Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <DeviceIcon className="h-8 w-8 text-blue-600" />
              <div>
                <div className="font-medium capitalize">{deviceInfo.type}</div>
                <div className="text-sm text-muted-foreground">Device Type</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Battery className="h-8 w-8 text-green-600" />
              <div>
                <div className="font-medium">{deviceInfo.battery}%</div>
                <div className="text-sm text-muted-foreground">Battery Level</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="h-8 w-8 text-purple-600" />
              <div>
                <div className="font-medium">
                  {deviceInfo.location ? "Enabled" : "Disabled"}
                </div>
                <div className="text-sm text-muted-foreground">GPS Tracking</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mobile Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Mobile Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="offline">Offline Mode</Label>
                <div className="text-sm text-muted-foreground">Work without internet</div>
              </div>
              <Switch
                id="offline"
                checked={settings.offlineMode}
                onCheckedChange={(checked) => 
                  setSettings(prev => ({ ...prev, offlineMode: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoSync">Auto-Sync</Label>
                <div className="text-sm text-muted-foreground">Sync when online</div>
              </div>
              <Switch
                id="autoSync"
                checked={settings.autoSync}
                onCheckedChange={(checked) => 
                  setSettings(prev => ({ ...prev, autoSync: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="compression">Data Compression</Label>
                <div className="text-sm text-muted-foreground">Reduce data usage</div>
              </div>
              <Switch
                id="compression"
                checked={settings.dataCompression}
                onCheckedChange={(checked) => 
                  setSettings(prev => ({ ...prev, dataCompression: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="lowBandwidth">Low Bandwidth Mode</Label>
                <div className="text-sm text-muted-foreground">Optimize for slow connections</div>
              </div>
              <Switch
                id="lowBandwidth"
                checked={settings.lowBandwidthMode}
                onCheckedChange={(checked) => 
                  setSettings(prev => ({ ...prev, lowBandwidthMode: checked }))
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Permissions & Access</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Button 
                onClick={requestLocation} 
                className="w-full flex items-center gap-2"
                variant={deviceInfo.location ? "outline" : "default"}
              >
                <MapPin className="h-4 w-4" />
                {deviceInfo.location ? "Location Enabled" : "Enable Location"}
              </Button>
              <div className="text-xs text-muted-foreground">
                Required for GPS tracking and job site navigation
              </div>
            </div>

            <div className="space-y-2">
              <Button 
                onClick={enableNotifications}
                className="w-full flex items-center gap-2"
                variant={settings.pushNotifications ? "outline" : "default"}
              >
                <Smartphone className="h-4 w-4" />
                {settings.pushNotifications ? "Notifications Enabled" : "Enable Notifications"}
              </Button>
              <div className="text-xs text-muted-foreground">
                Receive important updates and alerts
              </div>
            </div>

            <div className="space-y-2">
              <Button className="w-full flex items-center gap-2" variant="outline">
                <Camera className="h-4 w-4" />
                Camera Access
              </Button>
              <div className="text-xs text-muted-foreground">
                Take photos for job documentation
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">98%</div>
              <div className="text-sm text-muted-foreground">App Performance</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">2.1s</div>
              <div className="text-sm text-muted-foreground">Load Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">15MB</div>
              <div className="text-sm text-muted-foreground">Data Usage</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
