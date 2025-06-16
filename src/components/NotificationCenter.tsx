
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCircle, AlertTriangle, Info, X, Settings } from "lucide-react";

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionRequired?: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'warning',
    title: 'Equipment Maintenance Due',
    message: 'Scaffolding Set #SC-67890 requires maintenance by Dec 20, 2024',
    timestamp: '2024-12-16T10:30:00Z',
    read: false,
    actionRequired: true
  },
  {
    id: '2',
    type: 'success',
    title: 'Project Completed',
    message: 'Kitchen Renovation project has been marked as completed',
    timestamp: '2024-12-16T09:15:00Z',
    read: false
  },
  {
    id: '3',
    type: 'info',
    title: 'New Customer Inquiry',
    message: 'Sarah Wilson has submitted a request for bathroom renovation estimate',
    timestamp: '2024-12-16T08:45:00Z',
    read: true
  },
  {
    id: '4',
    type: 'error',
    title: 'Payment Overdue',
    message: 'Invoice #INV-2024-156 is 15 days overdue',
    timestamp: '2024-12-15T16:20:00Z',
    read: false,
    actionRequired: true
  },
  {
    id: '5',
    type: 'info',
    title: 'Safety Training Reminder',
    message: 'Monthly safety training scheduled for Dec 20, 2024',
    timestamp: '2024-12-15T14:00:00Z',
    read: true
  }
];

export const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread' | 'action-required'>('all');

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'error': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'info': return <Info className="h-5 w-5 text-blue-600" />;
      default: return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    switch (filter) {
      case 'unread': return !notif.read;
      case 'action-required': return notif.actionRequired;
      default: return true;
    }
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const actionRequiredCount = notifications.filter(n => n.actionRequired && !n.read).length;

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Notifications</h2>
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

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Bell className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{notifications.length}</p>
                <p className="text-sm text-muted-foreground">Total Notifications</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Bell className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{unreadCount}</p>
                <p className="text-sm text-muted-foreground">Unread</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{actionRequiredCount}</p>
                <p className="text-sm text-muted-foreground">Action Required</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{notifications.filter(n => n.read).length}</p>
                <p className="text-sm text-muted-foreground">Read</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2">
        <Button 
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
        >
          All ({notifications.length})
        </Button>
        <Button 
          variant={filter === 'unread' ? 'default' : 'outline'}
          onClick={() => setFilter('unread')}
        >
          Unread ({unreadCount})
        </Button>
        <Button 
          variant={filter === 'action-required' ? 'default' : 'outline'}
          onClick={() => setFilter('action-required')}
        >
          Action Required ({actionRequiredCount})
        </Button>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No notifications to show</p>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`transition-all hover:shadow-md ${!notification.read ? 'border-l-4 border-l-blue-500 bg-blue-50/30' : ''}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  {getIcon(notification.type)}
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-sm">{notification.title}</h3>
                          <Badge className={getTypeColor(notification.type)}>
                            {notification.type}
                          </Badge>
                          {notification.actionRequired && (
                            <Badge variant="destructive" className="text-xs">
                              Action Required
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">{formatTime(notification.timestamp)}</p>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="h-8 w-8 p-0"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => dismissNotification(notification.id)}
                          className="h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {notification.actionRequired && !notification.read && (
                      <div className="mt-3 flex gap-2">
                        <Button size="sm">Take Action</Button>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
