import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, DollarSign, Wrench, Settings, Clock, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DashboardCustomization } from "./DashboardCustomization";
import { NavigationToggle } from "./NavigationToggle";
import { ThemeToggle } from "./ThemeToggle";
import { QuickActions } from "./QuickActions";

interface DashboardWidget {
  id: string;
  title: string;
  enabled: boolean;
  order: number;
}

export const Dashboard = () => {
  const { toast } = useToast();
  const [userName, setUserName] = useState('John');
  const [timezone, setTimezone] = useState('America/New_York');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showTimezoneDialog, setShowTimezoneDialog] = useState(false);
  const [showCustomization, setShowCustomization] = useState(false);
  const [tempTimezone, setTempTimezone] = useState(timezone);
  const [currentLayout, setCurrentLayout] = useState<'sidebar' | 'menu'>(() => {
    return (localStorage.getItem('navigationLayout') as 'sidebar' | 'menu') || 'sidebar';
  });

  const [widgets, setWidgets] = useState<DashboardWidget[]>([
    { id: 'stats', title: 'Statistics Cards', enabled: true, order: 0 },
    { id: 'recent-jobs', title: 'Recent Jobs', enabled: true, order: 1 },
    { id: 'quick-actions', title: 'Quick Actions', enabled: true, order: 2 }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const timeInTimezone = new Date().toLocaleString("en-US", { 
      timeZone: timezone,
      hour12: false,
      hour: '2-digit'
    });
    const hour = parseInt(timeInTimezone);

    if (hour < 12) {
      return 'Good morning';
    } else if (hour < 17) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  };

  const getFormattedTime = () => {
    return new Date().toLocaleString("en-US", {
      timeZone: timezone,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleTimezoneUpdate = () => {
    setTimezone(tempTimezone);
    setShowTimezoneDialog(false);
    toast({
      title: "Timezone Updated",
      description: `Timezone has been set to ${tempTimezone}`,
    });
  };

  const handleLayoutChange = (layout: 'sidebar' | 'menu') => {
    setCurrentLayout(layout);
  };

  const getWidget = (id: string) => {
    switch (id) {
      case 'stats':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">{stat.trend}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        );
      
      case 'recent-jobs':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Recent Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <p className="font-medium">Kitchen Renovation</p>
                    <p className="text-sm text-muted-foreground">John Smith - Today 2:00 PM</p>
                  </div>
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">Scheduled</span>
                </div>
                <div className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <p className="font-medium">Bathroom Repair</p>
                    <p className="text-sm text-muted-foreground">ABC Construction - Tomorrow 9:00 AM</p>
                  </div>
                  <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">In Progress</span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      
      case 'quick-actions':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="w-full p-3 text-left border rounded hover:bg-muted">
                Schedule New Job
              </button>
              <button className="w-full p-3 text-left border rounded hover:bg-muted">
                Add New Customer
              </button>
              <button className="w-full p-3 text-left border rounded hover:bg-muted">
                Create Estimate
              </button>
            </CardContent>
          </Card>
        );
      
      default:
        return null;
    }
  };

  const enabledWidgets = widgets
    .filter(widget => widget.enabled)
    .sort((a, b) => a.order - b.order);

  const stats = [
    {
      title: "Total Jobs",
      value: "24",
      icon: Calendar,
      trend: "+12% from last month"
    },
    {
      title: "Active Customers",
      value: "156",
      icon: Users,
      trend: "+8% from last month"
    },
    {
      title: "Monthly Revenue",
      value: "$45,230",
      icon: DollarSign,
      trend: "+23% from last month"
    },
    {
      title: "Completed Jobs",
      value: "89",
      icon: Wrench,
      trend: "+15% from last month"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {getGreeting()}, {userName}!
          </h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{getFormattedTime()}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowTimezoneDialog(true)}
              className="ml-2"
            >
              <Settings className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <NavigationToggle 
            currentLayout={currentLayout} 
            onLayoutChange={handleLayoutChange} 
          />
          <ThemeToggle />
          <Button 
            variant="outline" 
            onClick={() => setShowCustomization(true)}
            className="flex items-center gap-2"
          >
            <Palette className="h-4 w-4" />
            Customize Dashboard
          </Button>
        </div>
      </div>
      
      <div className="space-y-6">
        {enabledWidgets.map((widget) => (
          <div key={widget.id}>
            {widget.id === 'stats' ? (
              getWidget(widget.id)
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {widget.id === 'recent-jobs' && enabledWidgets.find(w => w.id === 'quick-actions') ? (
                  <>
                    {getWidget('recent-jobs')}
                    {getWidget('quick-actions')}
                  </>
                ) : (
                  getWidget(widget.id)
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Timezone Settings Dialog */}
      {showTimezoneDialog && (
        <Dialog open={true} onOpenChange={setShowTimezoneDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Timezone Settings</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="timezone">Select Timezone</Label>
                <select
                  id="timezone"
                  value={tempTimezone}
                  onChange={(e) => setTempTimezone(e.target.value)}
                  className="w-full h-10 px-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <option value="America/New_York">Eastern Time (EST/EDT)</option>
                  <option value="America/Chicago">Central Time (CST/CDT)</option>
                  <option value="America/Denver">Mountain Time (MST/MDT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PST/PDT)</option>
                  <option value="America/Anchorage">Alaska Time (AKST/AKDT)</option>
                  <option value="Pacific/Honolulu">Hawaii Time (HST)</option>
                  <option value="UTC">UTC</option>
                  <option value="Europe/London">London (GMT/BST)</option>
                  <option value="Europe/Paris">Paris (CET/CEST)</option>
                  <option value="Asia/Tokyo">Tokyo (JST)</option>
                  <option value="Australia/Sydney">Sydney (AEDT/AEST)</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="username">Display Name</Label>
                <Input
                  id="username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setShowTimezoneDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleTimezoneUpdate}>
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Dashboard Customization Dialog */}
      <DashboardCustomization
        open={showCustomization}
        onOpenChange={setShowCustomization}
        widgets={widgets}
        onWidgetsChange={(newWidgets) => {
          setWidgets(newWidgets);
          toast({
            title: "Dashboard Updated",
            description: "Your dashboard layout has been saved.",
          });
        }}
      />
    </div>
  );
};
