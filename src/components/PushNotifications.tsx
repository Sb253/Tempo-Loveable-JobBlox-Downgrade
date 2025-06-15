
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Bell, BellOff, Smartphone, Clock, MapPin, Wrench, AlertTriangle } from "lucide-react";

interface NotificationSettings {
  enabled: boolean;
  jobUpdates: boolean;
  scheduleChanges: boolean;
  emergencyAlerts: boolean;
  dailyReminders: boolean;
  locationBased: boolean;
}

interface PushNotification {
  id: string;
  title: string;
  body: string;
  type: 'job' | 'schedule' | 'emergency' | 'reminder' | 'location';
  timestamp: string;
  read: boolean;
  jobId?: string;
}

export const PushNotifications = () => {
  const { toast } = useToast();
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [settings, setSettings] = useState<NotificationSettings>({
    enabled: false,
    jobUpdates: true,
    scheduleChanges: true,
    emergencyAlerts: true,
    dailyReminders: false,
    locationBased: false
  });
  const [notifications, setNotifications] = useState<PushNotification[]>([
    {
      id: '1',
      title: 'Job Update',
      body: 'Kitchen renovation at Smith residence is 75% complete',
      type: 'job',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      read: false,
      jobId: 'job-1'
    },
    {
      id: '2',
      title: 'Schedule Change',
      body: 'Tomorrow\'s appointment moved to 10:00 AM',
      type: 'schedule',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read: false
    },
    {
      id: '3',
      title: 'Daily Reminder',
      body: 'Don\'t forget to submit your timesheet for today',
      type: 'reminder',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      read: true
    }
  ]);

  useEffect(() => {
    // Check current notification permission
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }

    // Load settings from localStorage
    const savedSettings = localStorage.getItem('notificationSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  useEffect(() => {
    // Save settings to localStorage
    localStorage.setItem('notificationSettings', JSON.stringify(settings));
  }, [settings]);

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      toast({
        title: "Not Supported",
        description: "Push notifications are not supported in this browser.",
        variant: "destructive",
      });
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setPermission(permission);

      if (permission === 'granted') {
        setSettings(prev => ({ ...prev, enabled: true }));
        toast({
          title: "Notifications Enabled",
          description: "You'll now receive push notifications for job updates.",
        });

        // Send test notification
        new Notification('JobFlow Pro', {
          body: 'Push notifications are now enabled!',
          icon: '/favicon.ico',
          tag: 'test'
        });
      } else {
        toast({
          title: "Permission Denied",
          description: "Notifications have been blocked. You can enable them in browser settings.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to request notification permission.",
        variant: "destructive",
      });
    }
  };

  const sendTestNotification = () => {
    if (permission !== 'granted') {
      toast({
        title: "Permission Required",
        description: "Please enable notifications first.",
        variant: "destructive",
      });
      return;
    }

    const notification = new Notification('Test Notification', {
      body: 'This is a test push notification from JobFlow Pro',
      icon: '/favicon.ico',
      tag: 'test',
      badge: '/favicon.ico'
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };

    toast({
      title: "Test Sent",
      description: "Test notification has been sent.",
    });
  };

  const simulateJobNotification = () => {
    const newNotification: PushNotification = {
      id: Date.now().toString(),
      title: 'Job Status Update',
      body: 'Bathroom remodel at Johnson residence requires attention',
      type: 'job',
      timestamp: new Date().toISOString(),
      read: false,
      jobId: 'job-2'
    };

    setNotifications(prev => [newNotification, ...prev]);

    if (permission === 'granted' && settings.enabled && settings.jobUpdates) {
      new Notification(newNotification.title, {
        body: newNotification.body,
        icon: '/favicon.ico',
        tag: newNotification.id
      });
    }

    toast({
      title: "Job Notification",
      description: "Simulated job update notification.",
    });
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'job': return Wrench;
      case 'schedule': return Clock;
      case 'emergency': return AlertTriangle;
      case 'reminder': return Bell;
      case 'location': return MapPin;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'job': return 'text-blue-600';
      case 'schedule': return 'text-green-600';
      case 'emergency': return 'text-red-600';
      case 'reminder': return 'text-orange-600';
      case 'location': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Push Notifications</h2>
        <div className="flex items-center gap-2">
          {permission === 'granted' ? (
            <Bell className="h-5 w-5 text-green-600" />
          ) : (
            <BellOff className="h-5 w-5 text-red-600" />
          )}
          <Badge variant={permission === 'granted' ? "default" : "destructive"}>
            {permission === 'granted' ? 'Enabled' : 'Disabled'}
          </Badge>
        </div>
      </div>

      {/* Permission & Setup */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Setup</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {permission !== 'granted' && (
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Smartphone className="h-5 w-5 text-orange-600" />
                <h4 className="font-medium text-orange-800">Enable Notifications</h4>
              </div>
              <p className="text-sm text-orange-700 mb-3">
                Allow notifications to receive real-time updates about jobs, schedule changes, and important alerts.
              </p>
              <Button onClick={requestPermission}>
                <Bell className="h-4 w-4 mr-2" />
                Enable Notifications
              </Button>
            </div>
          )}

          {permission === 'granted' && (
            <div className="flex gap-2">
              <Button onClick={sendTestNotification} variant="outline">
                Send Test
              </Button>
              <Button onClick={simulateJobNotification} variant="outline">
                Simulate Job Update
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Notification Settings */}
      {permission === 'granted' && (
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Job Updates</Label>
                <div className="text-sm text-muted-foreground">Progress updates and status changes</div>
              </div>
              <Switch
                checked={settings.jobUpdates}
                onCheckedChange={(checked) => 
                  setSettings(prev => ({ ...prev, jobUpdates: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Schedule Changes</Label>
                <div className="text-sm text-muted-foreground">Appointment and calendar updates</div>
              </div>
              <Switch
                checked={settings.scheduleChanges}
                onCheckedChange={(checked) => 
                  setSettings(prev => ({ ...prev, scheduleChanges: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Emergency Alerts</Label>
                <div className="text-sm text-muted-foreground">Urgent safety and critical updates</div>
              </div>
              <Switch
                checked={settings.emergencyAlerts}
                onCheckedChange={(checked) => 
                  setSettings(prev => ({ ...prev, emergencyAlerts: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Daily Reminders</Label>
                <div className="text-sm text-muted-foreground">Timesheet and task reminders</div>
              </div>
              <Switch
                checked={settings.dailyReminders}
                onCheckedChange={(checked) => 
                  setSettings(prev => ({ ...prev, dailyReminders: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Location-Based</Label>
                <div className="text-sm text-muted-foreground">Notifications when arriving at job sites</div>
              </div>
              <Switch
                checked={settings.locationBased}
                onCheckedChange={(checked) => 
                  setSettings(prev => ({ ...prev, locationBased: checked }))
                }
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Recent Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive">{unreadCount} unread</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {notifications.map((notification) => {
              const IconComponent = getNotificationIcon(notification.type);
              return (
                <div 
                  key={notification.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    notification.read ? 'bg-gray-50' : 'bg-blue-50 border-blue-200'
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <IconComponent className={`h-5 w-5 mt-0.5 ${getNotificationColor(notification.type)}`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`font-medium ${!notification.read ? 'text-blue-900' : ''}`}>
                          {notification.title}
                        </h4>
                        <span className="text-xs text-muted-foreground">
                          {new Date(notification.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.body}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {notification.type}
                        </Badge>
                        {!notification.read && (
                          <Badge variant="secondary" className="text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
