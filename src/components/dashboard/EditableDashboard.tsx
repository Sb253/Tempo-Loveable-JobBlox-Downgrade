
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { DraggableWidget } from "./DraggableWidget";
import { WidgetCustomization } from "../WidgetCustomization";
import { LocalTimeDisplay } from "../LocalTimeDisplay";
import { 
  TrendingUp, 
  Calendar, 
  Users, 
  DollarSign, 
  Clock,
  CheckCircle,
  AlertCircle,
  MapPin,
  Wrench,
  Phone,
  Settings,
  Plus
} from "lucide-react";

interface WidgetConfig {
  id: string;
  title: string;
  enabled: boolean;
  order: number;
  size: 'small' | 'medium' | 'large' | 'full-width';
  refreshInterval: number;
  style: 'default' | 'gradient' | 'minimal' | 'bordered';
  color: string;
  type: 'stats' | 'activity' | 'actions' | 'jobs' | 'chart';
}

const defaultWidgets: WidgetConfig[] = [
  {
    id: 'stats-cards',
    title: 'Statistics Overview',
    enabled: true,
    order: 0,
    size: 'full-width',
    refreshInterval: 30,
    style: 'gradient',
    color: 'blue',
    type: 'stats'
  },
  {
    id: 'quick-actions',
    title: 'Quick Actions',
    enabled: true,
    order: 1,
    size: 'large',
    refreshInterval: 60,
    style: 'gradient',
    color: 'purple',
    type: 'actions'
  },
  {
    id: 'recent-activity',
    title: 'Recent Activity',
    enabled: true,
    order: 2,
    size: 'medium',
    refreshInterval: 45,
    style: 'gradient',
    color: 'green',
    type: 'activity'
  },
  {
    id: 'recent-jobs',
    title: 'Recent Jobs',
    enabled: true,
    order: 3,
    size: 'full-width',
    refreshInterval: 120,
    style: 'gradient',
    color: 'orange',
    type: 'jobs'
  }
];

export const EditableDashboard = () => {
  const [widgets, setWidgets] = useState<WidgetConfig[]>(defaultWidgets);
  const [showCustomization, setShowCustomization] = useState(false);

  const stats = [
    { title: 'Total Revenue', value: '$48,590', change: '+12%', icon: DollarSign, color: 'text-green-600' },
    { title: 'Active Jobs', value: '23', change: '+3', icon: Wrench, color: 'text-blue-600' },
    { title: 'New Customers', value: '12', change: '+8%', icon: Users, color: 'text-purple-600' },
    { title: 'Completion Rate', value: '94%', change: '+2%', icon: CheckCircle, color: 'text-emerald-600' }
  ];

  const recentActivities = [
    {
      id: '1',
      title: 'Scheduled Site Visit',
      description: 'Visited the new construction site for initial assessment.',
      time: '30 mins ago',
      icon: Calendar,
      color: 'text-blue-500'
    },
    {
      id: '2',
      title: 'New Customer Added',
      description: 'Added Sarah Johnson as a new customer for the upcoming project.',
      time: '1 hour ago',
      icon: Users,
      color: 'text-green-500'
    },
    {
      id: '3',
      title: 'Invoice Sent',
      description: 'Sent invoice #1023 to John Smith for the completed renovation.',
      time: '2 hours ago',
      icon: DollarSign,
      color: 'text-orange-500'
    },
    {
      id: '4',
      title: 'Payment Received',
      description: 'Received payment of $2,500 from ABC Corp for project kickoff.',
      time: '4 hours ago',
      icon: CheckCircle,
      color: 'text-emerald-500'
    }
  ];

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(widgets.filter(w => w.enabled));
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedWidgets = items.map((item, index) => ({
      ...item,
      order: index
    }));

    const disabledWidgets = widgets.filter(w => !w.enabled);
    setWidgets([...updatedWidgets, ...disabledWidgets]);
  };

  const renderWidgetContent = (widget: WidgetConfig) => {
    switch (widget.type) {
      case 'stats':
        return (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="p-4 rounded-lg bg-gradient-to-br from-white/20 to-white/10 border border-white/20 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className={`text-sm ${stat.color}`}>{stat.change} from last month</p>
                    </div>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </div>
              );
            })}
          </div>
        );

      case 'actions':
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Button className="h-20 flex flex-col gap-2 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-0">
              <Users className="h-6 w-6" />
              <span>Add Customer</span>
            </Button>
            <Button className="h-20 flex flex-col gap-2 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 border-0">
              <Wrench className="h-6 w-6" />
              <span>New Job</span>
            </Button>
            <Button className="h-20 flex flex-col gap-2 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 border-0">
              <DollarSign className="h-6 w-6" />
              <span>Create Invoice</span>
            </Button>
          </div>
        );

      case 'activity':
        return (
          <div className="space-y-3">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-muted/60 to-muted/40 backdrop-blur-sm border border-white/10">
                  <Icon className={`h-4 w-4 mt-1 ${activity.color}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        );

      case 'jobs':
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Recent Jobs</h3>
              <Badge variant="secondary" className="bg-gradient-to-r from-primary/20 to-primary/10">Today</Badge>
            </div>
            <div className="grid gap-3">
              {[
                { name: 'Kitchen Renovation', customer: 'John Smith', status: 'In Progress', time: '2:00 PM' },
                { name: 'Bathroom Repair', customer: 'ABC Construction', status: 'Scheduled', time: 'Tomorrow 9:00 AM' },
                { name: 'Deck Installation', customer: 'Sarah Johnson', status: 'Completed', time: 'Yesterday' }
              ].map((job, index) => (
                <div key={index} className="p-3 rounded-lg bg-gradient-to-r from-card/60 to-card/40 border border-border/30 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{job.name}</p>
                      <p className="text-sm text-muted-foreground">{job.customer}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={job.status === 'Completed' ? 'default' : 'outline'} className={job.status === 'Completed' ? 'bg-gradient-to-r from-green-500 to-green-600' : ''}>
                        {job.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{job.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return <div>Widget content</div>;
    }
  };

  const enabledWidgets = widgets.filter(w => w.enabled).sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6 p-6">
      {/* Header with Time and Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-muted-foreground">Here's what's happening with your business today.</p>
        </div>
        <div className="flex items-center gap-4">
          <LocalTimeDisplay />
          <Button 
            variant="outline" 
            onClick={() => setShowCustomization(!showCustomization)}
            className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 hover:from-primary/20 hover:to-primary/10"
          >
            <Settings className="h-4 w-4 mr-2" />
            Customize
          </Button>
        </div>
      </div>

      {/* Widget Customization Panel */}
      {showCustomization && (
        <Card className="border-border/40 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border-primary/10">
          <CardHeader>
            <CardTitle className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Dashboard Customization</CardTitle>
          </CardHeader>
          <CardContent>
            <WidgetCustomization 
              widgets={widgets}
              onWidgetsChange={setWidgets}
            />
          </CardContent>
        </Card>
      )}

      {/* Draggable Dashboard Grid */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="dashboard-widgets">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-1 md:grid-cols-4 gap-6"
            >
              {enabledWidgets.map((widget, index) => (
                <DraggableWidget
                  key={widget.id}
                  id={widget.id}
                  index={index}
                  title={widget.title}
                  size={widget.size}
                  style={widget.style}
                  color={widget.color}
                  onEdit={() => setShowCustomization(true)}
                >
                  {renderWidgetContent(widget)}
                </DraggableWidget>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
