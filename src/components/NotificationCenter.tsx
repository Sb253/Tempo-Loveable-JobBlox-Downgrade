
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Clock, AlertCircle, CheckCircle, Settings, Users, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  type: 'appointment' | 'payment' | 'team' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'appointment',
    title: 'Upcoming Appointment',
    message: 'Kitchen renovation appointment with John Smith in 30 minutes',
    timestamp: '30 min',
    read: false,
    priority: 'high'
  },
  {
    id: '2',
    type: 'payment',
    title: 'Payment Received',
    message: 'Payment of $2,450 received from ABC Construction',
    timestamp: '1 hour',
    read: false,
    priority: 'medium'
  },
  {
    id: '3',
    type: 'team',
    title: 'Team Member Update',
    message: 'Mike Johnson has arrived at job site',
    timestamp: '2 hours',
    read: true,
    priority: 'low'
  },
  {
    id: '4',
    type: 'system',
    title: 'Estimate Approved',
    message: 'Estimate #EST-001 has been approved by Sarah Johnson',
    timestamp: '3 hours',
    read: true,
    priority: 'medium'
  }
];

export const NotificationCenter = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    appointmentReminders: true,
    paymentAlerts: true,
    teamUpdates: true
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'appointment': return Calendar;
      case 'payment': return CheckCircle;
      case 'team': return Users;
      case 'system': return AlertCircle;
      default: return Bell;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
    toast({
      title: "All notifications marked as read",
      description: "Your notification center has been cleared.",
    });
  };

  const updateSetting = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Settings Updated",
      description: `${key} has been ${value ? 'enabled' : 'disabled'}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold">Notification Center</h2>
          {unreadCount > 0 && (
            <Badge className="bg-red-100 text-red-800">
              {unreadCount} unread
            </Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={markAllAsRead}>
            Mark All Read
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Delivery Methods</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email">Email Notifications</Label>
                  <Switch
                    id="email"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sms">SMS Notifications</Label>
                  <Switch
                    id="sms"
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => updateSetting('smsNotifications', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="push">Push Notifications</Label>
                  <Switch
                    id="push"
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => updateSetting('pushNotifications', checked)}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Notification Types</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="appointments">Appointment Reminders</Label>
                  <Switch
                    id="appointments"
                    checked={settings.appointmentReminders}
                    onCheckedChange={(checked) => updateSetting('appointmentReminders', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="payments">Payment Alerts</Label>
                  <Switch
                    id="payments"
                    checked={settings.paymentAlerts}
                    onCheckedChange={(checked) => updateSetting('paymentAlerts', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="team">Team Updates</Label>
                  <Switch
                    id="team"
                    checked={settings.teamUpdates}
                    onCheckedChange={(checked) => updateSetting('teamUpdates', checked)}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Recent Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => {
              const IconComponent = getNotificationIcon(notification.type);
              return (
                <div
                  key={notification.id}
                  className={`flex items-start gap-4 p-4 rounded-lg border ${
                    notification.read ? 'bg-gray-50' : 'bg-blue-50 border-blue-200'
                  }`}
                >
                  <div className="flex-shrink-0">
                    <IconComponent className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-sm">{notification.title}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Badge className={getPriorityColor(notification.priority)}>
                          {notification.priority}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {notification.timestamp}
                        </div>
                      </div>
                    </div>
                  </div>
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markAsRead(notification.id)}
                    >
                      Mark Read
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
