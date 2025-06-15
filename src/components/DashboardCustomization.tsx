
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { GripVertical, Eye, EyeOff, Palette, Layout, Grid3X3, Settings } from "lucide-react";

interface DashboardWidget {
  id: string;
  title: string;
  enabled: boolean;
  order: number;
  size?: 'small' | 'medium' | 'large' | 'full-width';
  refreshInterval?: number;
}

interface DashboardTheme {
  primaryColor: string;
  backgroundColor: string;
  cardStyle: 'default' | 'minimal' | 'bordered' | 'shadow';
}

interface DashboardCustomizationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  widgets: DashboardWidget[];
  onWidgetsChange: (widgets: DashboardWidget[]) => void;
  theme?: DashboardTheme;
  onThemeChange?: (theme: DashboardTheme) => void;
}

export const DashboardCustomization = ({ 
  open, 
  onOpenChange, 
  widgets, 
  onWidgetsChange,
  theme = { primaryColor: 'blue', backgroundColor: 'white', cardStyle: 'default' },
  onThemeChange
}: DashboardCustomizationProps) => {
  const [localWidgets, setLocalWidgets] = useState<DashboardWidget[]>(widgets);
  const [localTheme, setLocalTheme] = useState<DashboardTheme>(theme);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(localWidgets);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index
    }));

    setLocalWidgets(updatedItems);
  };

  const toggleWidget = (id: string) => {
    setLocalWidgets(prev => 
      prev.map(widget => 
        widget.id === id 
          ? { ...widget, enabled: !widget.enabled }
          : widget
      )
    );
  };

  const updateWidgetSize = (id: string, size: 'small' | 'medium' | 'large' | 'full-width') => {
    setLocalWidgets(prev => 
      prev.map(widget => 
        widget.id === id 
          ? { ...widget, size }
          : widget
      )
    );
  };

  const updateRefreshInterval = (id: string, interval: number) => {
    setLocalWidgets(prev => 
      prev.map(widget => 
        widget.id === id 
          ? { ...widget, refreshInterval: interval }
          : widget
      )
    );
  };

  const handleSave = () => {
    onWidgetsChange(localWidgets);
    if (onThemeChange) {
      onThemeChange(localTheme);
      localStorage.setItem('dashboardTheme', JSON.stringify(localTheme));
    }
    onOpenChange(false);
  };

  const resetToDefaults = () => {
    const defaultWidgets = widgets.map((widget, index) => ({
      ...widget,
      enabled: true,
      order: index,
      size: 'medium' as const,
      refreshInterval: 30
    }));
    setLocalWidgets(defaultWidgets);
    setLocalTheme({ primaryColor: 'blue', backgroundColor: 'white', cardStyle: 'default' });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Customize Dashboard
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="widgets" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="widgets" className="flex items-center gap-2">
              <Grid3X3 className="h-4 w-4" />
              Widgets
            </TabsTrigger>
            <TabsTrigger value="layout" className="flex items-center gap-2">
              <Layout className="h-4 w-4" />
              Layout
            </TabsTrigger>
            <TabsTrigger value="theme" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Theme
            </TabsTrigger>
          </TabsList>

          <TabsContent value="widgets" className="space-y-4">
            <div>
              <Label className="text-base font-medium">Dashboard Widgets</Label>
              <p className="text-sm text-muted-foreground mb-4">
                Drag to reorder, toggle visibility, and configure widget settings
              </p>
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="widgets">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                    {localWidgets
                      .sort((a, b) => a.order - b.order)
                      .map((widget, index) => (
                      <Draggable key={widget.id} draggableId={widget.id} index={index}>
                        {(provided, snapshot) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`transition-shadow ${
                              snapshot.isDragging ? 'shadow-lg' : ''
                            }`}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div
                                    {...provided.dragHandleProps}
                                    className="cursor-grab hover:text-primary"
                                  >
                                    <GripVertical className="h-5 w-5" />
                                  </div>
                                  <span className="font-medium">{widget.title}</span>
                                </div>
                                
                                <div className="flex items-center space-x-4">
                                  <div className="flex items-center space-x-2">
                                    <Label className="text-xs">Size:</Label>
                                    <Select
                                      value={widget.size || 'medium'}
                                      onValueChange={(value: 'small' | 'medium' | 'large' | 'full-width') => 
                                        updateWidgetSize(widget.id, value)
                                      }
                                    >
                                      <SelectTrigger className="w-24 h-8">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="small">Small</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="large">Large</SelectItem>
                                        <SelectItem value="full-width">Full</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  
                                  <div className="flex items-center space-x-2">
                                    <Label className="text-xs">Refresh (s):</Label>
                                    <Input
                                      type="number"
                                      value={widget.refreshInterval || 30}
                                      onChange={(e) => updateRefreshInterval(widget.id, parseInt(e.target.value))}
                                      className="w-16 h-8"
                                      min="5"
                                      max="300"
                                    />
                                  </div>

                                  <div className="flex items-center space-x-2">
                                    {widget.enabled ? (
                                      <Eye className="h-4 w-4 text-green-600" />
                                    ) : (
                                      <EyeOff className="h-4 w-4 text-gray-400" />
                                    )}
                                    <Switch
                                      checked={widget.enabled}
                                      onCheckedChange={() => toggleWidget(widget.id)}
                                    />
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </TabsContent>

          <TabsContent value="layout" className="space-y-4">
            <div>
              <Label className="text-base font-medium">Layout Settings</Label>
              <p className="text-sm text-muted-foreground mb-4">
                Configure how widgets are displayed on your dashboard
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Grid Layout</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Auto-fit columns</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Equal height rows</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Compact spacing</Label>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Widget Behavior</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Auto-refresh data</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Loading animations</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Hover effects</Label>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="theme" className="space-y-4">
            <div>
              <Label className="text-base font-medium">Theme Customization</Label>
              <p className="text-sm text-muted-foreground mb-4">
                Personalize the appearance of your dashboard
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Colors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-sm">Primary Color</Label>
                    <Select
                      value={localTheme.primaryColor}
                      onValueChange={(value) => setLocalTheme(prev => ({ ...prev, primaryColor: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blue">Blue</SelectItem>
                        <SelectItem value="green">Green</SelectItem>
                        <SelectItem value="purple">Purple</SelectItem>
                        <SelectItem value="orange">Orange</SelectItem>
                        <SelectItem value="red">Red</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="text-sm">Background</Label>
                    <Select
                      value={localTheme.backgroundColor}
                      onValueChange={(value) => setLocalTheme(prev => ({ ...prev, backgroundColor: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="white">Light</SelectItem>
                        <SelectItem value="gray">Gray</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Card Style</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select
                    value={localTheme.cardStyle}
                    onValueChange={(value: 'default' | 'minimal' | 'bordered' | 'shadow') => 
                      setLocalTheme(prev => ({ ...prev, cardStyle: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                      <SelectItem value="bordered">Bordered</SelectItem>
                      <SelectItem value="shadow">Shadow</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={resetToDefaults}>
            <Settings className="h-4 w-4 mr-2" />
            Reset to Defaults
          </Button>
          
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
