
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Clock, MapPin, Send, CheckCircle, Phone } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface CustomerNotification {
  id: string;
  jobId: string;
  customer: string;
  phone: string;
  technicianName: string;
  estimatedArrival: string;
  actualArrival?: string;
  status: 'scheduled' | 'en-route' | 'arrived' | 'completed';
  lastNotified?: string;
  notificationsSent: number;
}

export const OnMyWayNotifications = () => {
  const [notifications, setNotifications] = useState<CustomerNotification[]>([
    {
      id: '1',
      jobId: 'J001',
      customer: 'John Smith',
      phone: '+1 (555) 123-4567',
      technicianName: 'Mike Johnson',
      estimatedArrival: '2:30 PM',
      status: 'scheduled',
      notificationsSent: 0
    },
    {
      id: '2',
      jobId: 'J002',
      customer: 'Sarah Wilson',
      phone: '+1 (555) 987-6543',
      technicianName: 'Tom Davis',
      estimatedArrival: '3:15 PM',
      status: 'en-route',
      lastNotified: '10 minutes ago',
      notificationsSent: 1
    }
  ]);

  const [customMessage, setCustomMessage] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const messageTemplates = {
    'on-my-way': 'Hi {customer}, this is {technician} from {company}. I\'m on my way to your location for your {time} appointment. I should arrive around {eta}. Please text back if you have any questions!',
    'running-late': 'Hi {customer}, this is {technician}. I\'m running about {delay} minutes late for our {time} appointment. My new ETA is {eta}. Sorry for any inconvenience!',
    'arrived': 'Hi {customer}, I\'ve arrived at your location for your scheduled appointment. I\'ll be there shortly!',
    'completed': 'Hi {customer}, I\'ve completed the work at your location. Thank you for choosing our services! You should receive an invoice shortly.'
  };

  const handleSendNotification = (notificationId: string, messageType: string) => {
    const notification = notifications.find(n => n.id === notificationId);
    if (!notification) return;

    // Simulate sending notification
    setNotifications(prev => prev.map(n => 
      n.id === notificationId 
        ? { 
            ...n, 
            lastNotified: 'Just now',
            notificationsSent: n.notificationsSent + 1,
            status: messageType === 'on-my-way' ? 'en-route' : n.status
          }
        : n
    ));

    toast.success("Notification sent!", {
      description: `${messageType.replace('-', ' ')} message sent to ${notification.customer}`
    });
  };

  const handleStatusUpdate = (notificationId: string, newStatus: CustomerNotification['status']) => {
    setNotifications(prev => prev.map(n => 
      n.id === notificationId ? { ...n, status: newStatus } : n
    ));

    // Auto-send appropriate notification
    if (newStatus === 'arrived') {
      handleSendNotification(notificationId, 'arrived');
    } else if (newStatus === 'completed') {
      handleSendNotification(notificationId, 'completed');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'en-route': return 'bg-yellow-100 text-yellow-800';
      case 'arrived': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatMessage = (template: string, notification: CustomerNotification) => {
    return template
      .replace('{customer}', notification.customer)
      .replace('{technician}', notification.technicianName)
      .replace('{company}', 'Construction CRM')
      .replace('{time}', notification.estimatedArrival)
      .replace('{eta}', notification.estimatedArrival)
      .replace('{delay}', '15'); // Example delay
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">"On My Way" Customer Notifications</h2>
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-blue-500" />
          <span className="text-sm text-muted-foreground">
            {notifications.reduce((sum, n) => sum + n.notificationsSent, 0)} messages sent today
          </span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{notifications.filter(n => n.status === 'scheduled').length}</p>
                <p className="text-sm text-muted-foreground">Scheduled</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <MapPin className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">{notifications.filter(n => n.status === 'en-route').length}</p>
                <p className="text-sm text-muted-foreground">En Route</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{notifications.filter(n => n.status === 'arrived').length}</p>
                <p className="text-sm text-muted-foreground">Arrived</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">{notifications.reduce((sum, n) => sum + n.notificationsSent, 0)}</p>
                <p className="text-sm text-muted-foreground">Messages Sent</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Message Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Message Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a message template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="on-my-way">On My Way</SelectItem>
                <SelectItem value="running-late">Running Late</SelectItem>
                <SelectItem value="arrived">Arrived</SelectItem>
                <SelectItem value="completed">Job Completed</SelectItem>
              </SelectContent>
            </Select>

            {selectedTemplate && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Preview:</h4>
                <p className="text-sm">{messageTemplates[selectedTemplate as keyof typeof messageTemplates]}</p>
              </div>
            )}

            <Textarea
              placeholder="Or write a custom message..."
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Active Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Active Customer Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold">{notification.customer}</h3>
                    <p className="text-sm text-muted-foreground">Job ID: {notification.jobId}</p>
                    <p className="text-sm text-muted-foreground">{notification.phone}</p>
                  </div>
                  <Badge className={getStatusColor(notification.status)}>
                    {notification.status.replace('-', ' ')}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium">Technician: {notification.technicianName}</p>
                    <p className="text-sm text-muted-foreground">ETA: {notification.estimatedArrival}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Messages Sent: {notification.notificationsSent}</p>
                    {notification.lastNotified && (
                      <p className="text-sm text-muted-foreground">Last: {notification.lastNotified}</p>
                    )}
                  </div>
                  <div>
                    <Select onValueChange={(value) => handleStatusUpdate(notification.id, value as CustomerNotification['status'])}>
                      <SelectTrigger>
                        <SelectValue placeholder="Update Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="en-route">En Route</SelectItem>
                        <SelectItem value="arrived">Arrived</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <Button 
                    size="sm" 
                    onClick={() => handleSendNotification(notification.id, 'on-my-way')}
                    disabled={notification.status === 'completed'}
                  >
                    <Send className="h-3 w-3 mr-1" />
                    On My Way
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleSendNotification(notification.id, 'running-late')}
                    disabled={notification.status === 'completed'}
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    Running Late
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleSendNotification(notification.id, 'arrived')}
                    disabled={notification.status === 'completed'}
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Arrived
                  </Button>
                  <Button size="sm" variant="outline">
                    <Phone className="h-3 w-3 mr-1" />
                    Call
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
