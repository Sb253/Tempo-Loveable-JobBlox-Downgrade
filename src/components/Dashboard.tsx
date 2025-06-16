import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, DollarSign, Wrench, Settings, Clock, Palette, MapPin, UserCheck, Building2, Plus, ArrowRight, Edit, GripVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DashboardCustomization } from "./DashboardCustomization";
import { ThemeToggle } from "./ThemeToggle";
import { EditableQuickActions } from "./EditableQuickActions";
import { MapView } from "./MapView";
import { JobLocationsList } from "./JobLocationsList";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface DashboardWidget {
  id: string;
  title: string;
  enabled: boolean;
  order: number;
}

// Sample data with employee colors
const employees = [
  { id: '1', name: 'Mike Johnson', color: '#3B82F6' }, // blue
  { id: '2', name: 'Sarah Davis', color: '#10B981' }, // green
  { id: '3', name: 'Tom Wilson', color: '#F59E0B' }, // amber
  { id: '4', name: 'Lisa Chen', color: '#8B5CF6' }, // purple
];

const recentJobs = [
  {
    id: '1',
    title: 'Kitchen Renovation',
    customer: 'John Smith',
    address: '123 Main St, Anytown, USA',
    coordinates: [-74.006, 40.7128] as [number, number],
    status: 'scheduled' as const,
    type: 'job' as const,
    time: 'Today 2:00 PM',
    assignedTo: '1',
    employeeColor: '#3B82F6'
  },
  {
    id: '2',
    title: 'Bathroom Repair',
    customer: 'ABC Construction',
    address: '456 Business Ave, City, USA',
    coordinates: [-74.0, 40.72] as [number, number],
    status: 'in-progress' as const,
    type: 'job' as const,
    time: 'Tomorrow 9:00 AM',
    assignedTo: '2',
    employeeColor: '#10B981'
  },
  {
    id: '3',
    title: 'Consultation Appointment',
    customer: 'Sarah Johnson',
    address: '789 Oak Street, Downtown',
    coordinates: [-74.01, 40.71] as [number, number],
    status: 'scheduled' as const,
    type: 'appointment' as const,
    time: 'Friday 3:00 PM',
    assignedTo: '3',
    employeeColor: '#F59E0B'
  },
  {
    id: '4',
    title: 'Follow-up Meeting',
    customer: 'Mike Wilson',
    address: '321 Pine Ave, Uptown',
    coordinates: [-73.99, 40.73] as [number, number],
    status: 'completed' as const,
    type: 'appointment' as const,
    time: 'Yesterday 1:00 PM',
    assignedTo: '4',
    employeeColor: '#8B5CF6'
  }
];

// Employee locations
const employeeLocations = [
  { id: '1', name: 'Mike Johnson', coordinates: [-74.005, 40.7138] as [number, number], color: '#3B82F6', status: 'active' as const },
  { id: '2', name: 'Sarah Davis', coordinates: [-73.998, 40.7158] as [number, number], color: '#10B981', status: 'active' as const },
  { id: '3', name: 'Tom Wilson', coordinates: [-74.008, 40.7108] as [number, number], color: '#F59E0B', status: 'break' as const },
  { id: '4', name: 'Lisa Chen', coordinates: [-74.012, 40.7088] as [number, number], color: '#8B5CF6', status: 'active' as const },
];

export const Dashboard = () => {
  const { toast } = useToast();
  const [userName, setUserName] = useState('John');
  const [timezone, setTimezone] = useState('America/New_York');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showTimezoneDialog, setShowTimezoneDialog] = useState(false);
  const [showCustomization, setShowCustomization] = useState(false);
  const [tempTimezone, setTempTimezone] = useState(timezone);
  const [isEditingDashboard, setIsEditingDashboard] = useState(false);

  const [widgets, setWidgets] = useState<DashboardWidget[]>([
    { id: 'stats', title: 'Key Statistics', enabled: true, order: 0 },
    { id: 'calendar', title: 'Calendar & Appointments', enabled: true, order: 1 },
    { id: 'customer-management', title: 'Customer Management', enabled: true, order: 2 },
    { id: 'recent-jobs', title: 'Recent Jobs & Locations', enabled: true, order: 3 },
    { id: 'quick-actions', title: 'Quick Actions', enabled: true, order: 4 }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

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

  const handleDragEnd = (result: any) => {
    if (!result.destination || result.source.droppableId !== 'dashboard-widgets') return;

    const items = Array.from(widgets);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index
    }));

    setWidgets(updatedItems);
  };

  const toggleWidget = (id: string) => {
    setWidgets(widgets.map(widget => 
      widget.id === id ? { ...widget, enabled: !widget.enabled } : widget
    ));
  };

  const getWidget = (id: string) => {
    switch (id) {
      case 'stats':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-semibold">Key Statistics</Label>
              <Badge variant="outline">Live Data</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                const gradientColors = [
                  'from-purple-500 to-pink-500',
                  'from-blue-500 to-cyan-500', 
                  'from-green-500 to-emerald-500',
                  'from-indigo-500 to-purple-500'
                ];
                return (
                  <Card key={index} className="relative overflow-hidden border-0 shadow-lg">
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradientColors[index]} opacity-10`}></div>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                      <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${gradientColors[index]}`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-muted-foreground">{stat.trend}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );

      case 'calendar':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-semibold">Calendar & Appointments</Label>
              <Badge variant="outline">Today</Badge>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    Today's Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentJobs.filter(job => job.time.includes('Today')).map((job) => (
                      <div key={job.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: job.employeeColor }}
                          ></div>
                          <div>
                            <p className="font-medium">{job.title}</p>
                            <p className="text-sm text-muted-foreground">{job.customer}</p>
                          </div>
                        </div>
                        <span className="text-sm font-medium">{job.time.split(' ').slice(-2).join(' ')}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-green-500" />
                    Upcoming Appointments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentJobs.filter(job => job.type === 'appointment' && !job.time.includes('Yesterday')).map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: appointment.employeeColor }}
                          ></div>
                          <div>
                            <p className="font-medium">{appointment.title}</p>
                            <p className="text-sm text-muted-foreground">{appointment.customer}</p>
                          </div>
                        </div>
                        <span className="text-sm font-medium">{appointment.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'customer-management':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-semibold">Customer Management</Label>
              <Badge variant="outline">Active</Badge>
            </div>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-purple-500" />
                  Customer Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">156</div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">Total Customers</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">23</div>
                    <div className="text-sm text-green-700 dark:text-green-300">New This Month</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">12</div>
                    <div className="text-sm text-purple-700 dark:text-purple-300">Pending Follow-up</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Customer
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Users className="h-4 w-4 mr-2" />
                    View All
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case 'recent-jobs':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-semibold">Recent Jobs & Locations</Label>
              <Badge variant="outline">Live Map</Badge>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Wrench className="h-5 w-5 text-blue-500" />
                      Recent Jobs
                    </CardTitle>
                    <Badge variant="secondary">{recentJobs.length} Active</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentJobs.map((job) => {
                      const statusColors = {
                        'scheduled': 'from-blue-500 to-indigo-500',
                        'in-progress': 'from-indigo-500 to-purple-500',
                        'completed': 'from-green-500 to-emerald-500'
                      };
                      return (
                        <div key={job.id} className="flex justify-between items-center p-3 border rounded-lg bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: job.employeeColor }}
                            ></div>
                            <div>
                              <p className="font-medium">{job.title}</p>
                              <p className="text-sm text-muted-foreground">{job.customer} - {job.time}</p>
                            </div>
                          </div>
                          <span className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${statusColors[job.status]} text-white font-medium`}>
                            {job.status === 'scheduled' ? 'Scheduled' : job.status === 'in-progress' ? 'In Progress' : 'Completed'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Live Locations Map
                </Label>
                <Card className="h-64">
                  <CardContent className="p-2">
                    <MapView 
                      jobs={recentJobs} 
                      employees={employeeLocations}
                      showEmployeeLocations={true}
                    />
                  </CardContent>
                </Card>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span>Jobs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span>Appointments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span>Employees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                    <span>Active</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">Employee Status</Label>
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {employeeLocations.map((employee) => (
                        <div key={employee.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: employee.color }}
                            ></div>
                            <span className="text-sm font-medium">{employee.name}</span>
                          </div>
                          <Badge 
                            variant={employee.status === 'active' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {employee.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );
      
      case 'quick-actions':
        return <EditableQuickActions />;
      
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
    <div className="min-h-screen">
      <div className="p-6 space-y-6">
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
            <ThemeToggle />
            <Button 
              variant="outline" 
              onClick={() => setIsEditingDashboard(!isEditingDashboard)}
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              {isEditingDashboard ? 'Done Editing' : 'Edit Dashboard'}
            </Button>
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
        
        {isEditingDashboard ? (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="dashboard-widgets">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-6">
                  {widgets.map((widget, index) => (
                    <Draggable 
                      key={widget.id} 
                      draggableId={widget.id} 
                      index={index}
                      isDragDisabled={widget.id === 'stats'}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`border-2 border-dashed rounded-lg p-4 ${
                            snapshot.isDragging ? 'border-primary bg-muted' : 'border-muted'
                          } ${widget.id === 'stats' ? 'opacity-50' : ''}`}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              {widget.id !== 'stats' && (
                                <div {...provided.dragHandleProps}>
                                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                                </div>
                              )}
                              <span className="font-medium">{widget.title}</span>
                              {widget.id === 'stats' && (
                                <Badge variant="secondary">Static</Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={widget.enabled}
                                onChange={() => toggleWidget(widget.id)}
                                className="rounded"
                                disabled={widget.id === 'stats'}
                              />
                              <span className="text-sm text-muted-foreground">
                                {widget.enabled ? 'Visible' : 'Hidden'}
                              </span>
                            </div>
                          </div>
                          {widget.enabled && getWidget(widget.id)}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <div className="space-y-6">
            {enabledWidgets.map((widget) => (
              <div key={widget.id}>
                {getWidget(widget.id)}
              </div>
            ))}
          </div>
        )}

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
    </div>
  );
};
