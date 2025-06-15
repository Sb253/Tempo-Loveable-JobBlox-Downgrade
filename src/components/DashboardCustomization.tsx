import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { WidgetCustomization } from "./WidgetCustomization";
import { Palette, Layout, Grid3X3, Settings } from "lucide-react";

interface DashboardWidget {
  id: string;
  title: string;
  enabled: boolean;
  order: number;
  size?: 'small' | 'medium' | 'large' | 'full-width';
  refreshInterval?: number;
  style?: 'default' | 'gradient' | 'minimal' | 'bordered';
  color?: string;
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
  const [localTheme, setLocalTheme] = useState<DashboardTheme>(theme);

  // Convert widgets to the new format with defaults
  const enhancedWidgets = widgets.map(widget => ({
    ...widget,
    size: widget.size || 'medium' as const,
    refreshInterval: widget.refreshInterval || 30,
    style: widget.style || 'default' as const,
    color: widget.color || 'blue'
  }));

  const handleSave = () => {
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
      refreshInterval: 30,
      style: 'default' as const,
      color: 'blue'
    }));
    onWidgetsChange(defaultWidgets);
    setLocalTheme({ primaryColor: 'blue', backgroundColor: 'white', cardStyle: 'default' });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-background to-primary/5">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            <Palette className="h-5 w-5 text-primary" />
            Customize Dashboard
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="widgets" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-primary/10 to-primary/5">
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
            <WidgetCustomization 
              widgets={enhancedWidgets}
              onWidgetsChange={onWidgetsChange}
            />
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
          <Button variant="outline" onClick={resetToDefaults} className="border-primary/20">
            <Settings className="h-4 w-4 mr-2" />
            Reset to Defaults
          </Button>
          
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
