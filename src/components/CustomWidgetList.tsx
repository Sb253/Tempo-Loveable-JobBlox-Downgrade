
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash2, Eye, EyeOff, BarChart3, Calendar, Users, DollarSign, Clock, FileText, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CustomWidget {
  id: string;
  title: string;
  type: 'chart' | 'stat' | 'list' | 'calendar' | 'metric';
  enabled: boolean;
  size: 'small' | 'medium' | 'large' | 'full-width';
  order: number;
  icon: string;
  color: string;
  dataSource?: string;
}

export const CustomWidgetList = () => {
  const { toast } = useToast();
  const [widgets, setWidgets] = useState<CustomWidget[]>([
    {
      id: '1',
      title: 'Revenue Chart',
      type: 'chart',
      enabled: true,
      size: 'large',
      order: 0,
      icon: 'BarChart3',
      color: 'blue',
      dataSource: 'financial'
    },
    {
      id: '2',
      title: 'Active Jobs',
      type: 'stat',
      enabled: true,
      size: 'medium',
      order: 1,
      icon: 'Calendar',
      color: 'green'
    },
    {
      id: '3',
      title: 'Customer List',
      type: 'list',
      enabled: false,
      size: 'full-width',
      order: 2,
      icon: 'Users',
      color: 'purple'
    }
  ]);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingWidget, setEditingWidget] = useState<CustomWidget | null>(null);
  const [newWidget, setNewWidget] = useState<Partial<CustomWidget>>({
    title: '',
    type: 'stat',
    enabled: true,
    size: 'medium',
    icon: 'BarChart3',
    color: 'blue'
  });

  const widgetTypes = [
    { value: 'chart', label: 'Chart', icon: BarChart3 },
    { value: 'stat', label: 'Statistic', icon: DollarSign },
    { value: 'list', label: 'List', icon: FileText },
    { value: 'calendar', label: 'Calendar', icon: Calendar },
    { value: 'metric', label: 'Metric', icon: Clock }
  ];

  const iconOptions = [
    { value: 'BarChart3', label: 'Bar Chart', icon: BarChart3 },
    { value: 'Calendar', label: 'Calendar', icon: Calendar },
    { value: 'Users', label: 'Users', icon: Users },
    { value: 'DollarSign', label: 'Dollar Sign', icon: DollarSign },
    { value: 'Clock', label: 'Clock', icon: Clock },
    { value: 'FileText', label: 'File Text', icon: FileText }
  ];

  const colorOptions = [
    { value: 'blue', label: 'Blue', class: 'bg-blue-500' },
    { value: 'green', label: 'Green', class: 'bg-green-500' },
    { value: 'purple', label: 'Purple', class: 'bg-purple-500' },
    { value: 'orange', label: 'Orange', class: 'bg-orange-500' },
    { value: 'red', label: 'Red', class: 'bg-red-500' },
    { value: 'pink', label: 'Pink', class: 'bg-pink-500' }
  ];

  const sizeOptions = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
    { value: 'full-width', label: 'Full Width' }
  ];

  const handleAddWidget = () => {
    if (!newWidget.title) {
      toast({
        title: "Error",
        description: "Please enter a widget title",
        variant: "destructive"
      });
      return;
    }

    const widget: CustomWidget = {
      id: Date.now().toString(),
      title: newWidget.title,
      type: newWidget.type as CustomWidget['type'],
      enabled: newWidget.enabled ?? true,
      size: newWidget.size as CustomWidget['size'],
      order: widgets.length,
      icon: newWidget.icon || 'BarChart3',
      color: newWidget.color || 'blue'
    };

    setWidgets([...widgets, widget]);
    setNewWidget({
      title: '',
      type: 'stat',
      enabled: true,
      size: 'medium',
      icon: 'BarChart3',
      color: 'blue'
    });
    setShowAddDialog(false);
    
    toast({
      title: "Widget Added",
      description: `${widget.title} has been added to your dashboard`
    });
  };

  const handleEditWidget = (widget: CustomWidget) => {
    setEditingWidget(widget);
    setNewWidget(widget);
    setShowAddDialog(true);
  };

  const handleUpdateWidget = () => {
    if (!editingWidget || !newWidget.title) return;

    const updatedWidgets = widgets.map(w => 
      w.id === editingWidget.id ? { ...w, ...newWidget } : w
    );
    
    setWidgets(updatedWidgets);
    setEditingWidget(null);
    setShowAddDialog(false);
    setNewWidget({
      title: '',
      type: 'stat',
      enabled: true,
      size: 'medium',
      icon: 'BarChart3',
      color: 'blue'
    });

    toast({
      title: "Widget Updated",
      description: "Widget has been updated successfully"
    });
  };

  const handleDeleteWidget = (id: string) => {
    setWidgets(widgets.filter(w => w.id !== id));
    toast({
      title: "Widget Deleted",
      description: "Widget has been removed from your dashboard"
    });
  };

  const toggleWidgetEnabled = (id: string) => {
    setWidgets(widgets.map(w => 
      w.id === id ? { ...w, enabled: !w.enabled } : w
    ));
  };

  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, any> = {
      BarChart3, Calendar, Users, DollarSign, Clock, FileText
    };
    return iconMap[iconName] || BarChart3;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Custom Dashboard Widgets</h2>
          <p className="text-muted-foreground">Manage and configure your dashboard widgets</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Widget
        </Button>
      </div>

      <div className="grid gap-4">
        {widgets.map((widget) => {
          const IconComponent = getIconComponent(widget.icon);
          const colorClass = colorOptions.find(c => c.value === widget.color)?.class || 'bg-blue-500';
          
          return (
            <Card key={widget.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${colorClass} text-white`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{widget.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="secondary">{widget.type}</Badge>
                        <Badge variant="outline">{widget.size}</Badge>
                        {widget.enabled ? (
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        ) : (
                          <Badge variant="secondary">Disabled</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleWidgetEnabled(widget.id)}
                    >
                      {widget.enabled ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEditWidget(widget)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteWidget(widget.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Add/Edit Widget Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingWidget ? 'Edit Widget' : 'Add New Widget'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Widget Title</Label>
              <Input
                id="title"
                value={newWidget.title || ''}
                onChange={(e) => setNewWidget({ ...newWidget, title: e.target.value })}
                placeholder="Enter widget title"
              />
            </div>

            <div className="space-y-2">
              <Label>Widget Type</Label>
              <Select
                value={newWidget.type}
                onValueChange={(value: CustomWidget['type']) => setNewWidget({ ...newWidget, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {widgetTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <type.icon className="h-4 w-4" />
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Size</Label>
              <Select
                value={newWidget.size}
                onValueChange={(value: CustomWidget['size']) => setNewWidget({ ...newWidget, size: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sizeOptions.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Icon</Label>
              <Select
                value={newWidget.icon}
                onValueChange={(value) => setNewWidget({ ...newWidget, icon: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((icon) => (
                    <SelectItem key={icon.value} value={icon.value}>
                      <div className="flex items-center gap-2">
                        <icon.icon className="h-4 w-4" />
                        {icon.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Color</Label>
              <Select
                value={newWidget.color}
                onValueChange={(value) => setNewWidget({ ...newWidget, color: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map((color) => (
                    <SelectItem key={color.value} value={color.value}>
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded ${color.class}`} />
                        {color.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={newWidget.enabled}
                onCheckedChange={(checked) => setNewWidget({ ...newWidget, enabled: checked })}
              />
              <Label>Enable widget</Label>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => {
              setShowAddDialog(false);
              setEditingWidget(null);
              setNewWidget({
                title: '',
                type: 'stat',
                enabled: true,
                size: 'medium',
                icon: 'BarChart3',
                color: 'blue'
              });
            }}>
              Cancel
            </Button>
            <Button onClick={editingWidget ? handleUpdateWidget : handleAddWidget}>
              {editingWidget ? 'Update Widget' : 'Add Widget'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
