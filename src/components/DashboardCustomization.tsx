
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
  id: string;
  name: string;
  primaryColor: string;
  backgroundColor: string;
  cardStyle: 'default' | 'minimal' | 'bordered' | 'shadow' | 'gradient';
  accentColor: string;
  textColor: string;
  description: string;
}

interface DashboardCustomizationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  widgets: DashboardWidget[];
  onWidgetsChange: (widgets: DashboardWidget[]) => void;
  theme?: DashboardTheme;
  onThemeChange?: (theme: DashboardTheme) => void;
}

const availableThemes: DashboardTheme[] = [
  {
    id: 'professional',
    name: 'Professional Blue',
    primaryColor: 'blue',
    backgroundColor: 'white',
    cardStyle: 'shadow',
    accentColor: 'blue-600',
    textColor: 'gray-900',
    description: 'Clean and professional look with blue accents'
  },
  {
    id: 'nature',
    name: 'Nature Green',
    primaryColor: 'green',
    backgroundColor: 'green-50',
    cardStyle: 'bordered',
    accentColor: 'green-600',
    textColor: 'green-900',
    description: 'Calming green theme inspired by nature'
  },
  {
    id: 'sunset',
    name: 'Sunset Orange',
    primaryColor: 'orange',
    backgroundColor: 'orange-50',
    cardStyle: 'gradient',
    accentColor: 'orange-600',
    textColor: 'orange-900',
    description: 'Warm and energetic orange sunset theme'
  },
  {
    id: 'royal',
    name: 'Royal Purple',
    primaryColor: 'purple',
    backgroundColor: 'purple-50',
    cardStyle: 'minimal',
    accentColor: 'purple-600',
    textColor: 'purple-900',
    description: 'Elegant purple theme with royal sophistication'
  },
  {
    id: 'dark',
    name: 'Dark Mode',
    primaryColor: 'gray',
    backgroundColor: 'gray-900',
    cardStyle: 'bordered',
    accentColor: 'gray-400',
    textColor: 'gray-100',
    description: 'Sleek dark theme for reduced eye strain'
  }
];

export const DashboardCustomization = ({ 
  open, 
  onOpenChange, 
  widgets, 
  onWidgetsChange,
  theme = availableThemes[0],
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
    setLocalTheme(availableThemes[0]);
  };

  const selectTheme = (themeId: string) => {
    const selectedTheme = availableThemes.find(t => t.id === themeId);
    if (selectedTheme) {
      setLocalTheme(selectedTheme);
    }
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
          <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-primary/10 to-primary/5">
            <TabsTrigger value="widgets" className="flex items-center gap-2">
              <Grid3X3 className="h-4 w-4" />
              Widgets
            </TabsTrigger>
            <TabsTrigger value="layout" className="flex items-center gap-2">
              <Layout className="h-4 w-4" />
              Layout
            </TabsTrigger>
            <TabsTrigger value="themes" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Themes
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Advanced
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

          <TabsContent value="themes" className="space-y-4">
            <div>
              <Label className="text-base font-medium">Dashboard Themes</Label>
              <p className="text-sm text-muted-foreground mb-4">
                Choose from our pre-designed themes or customize your own
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableThemes.map((themeOption) => (
                <Card 
                  key={themeOption.id} 
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    localTheme.id === themeOption.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => selectTheme(themeOption.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">{themeOption.name}</CardTitle>
                      {localTheme.id === themeOption.id && (
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex gap-2">
                      <div className={`w-6 h-6 rounded bg-${themeOption.primaryColor}-500`}></div>
                      <div className={`w-6 h-6 rounded bg-${themeOption.accentColor.replace('-600', '-400')}`}></div>
                      <div className={`w-6 h-6 rounded ${
                        themeOption.backgroundColor === 'white' ? 'bg-white border' : 
                        themeOption.backgroundColor === 'gray-900' ? 'bg-gray-900' :
                        `bg-${themeOption.backgroundColor}`
                      }`}></div>
                    </div>
                    <p className="text-xs text-muted-foreground">{themeOption.description}</p>
                    <div className="text-xs">
                      <span className="font-medium">Style: </span>
                      <span className="capitalize">{themeOption.cardStyle}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-4 mt-6">
              <Label className="text-base font-medium">Custom Theme Options</Label>
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
                          <SelectItem value="gray-50">Light Gray</SelectItem>
                          <SelectItem value="gray-900">Dark</SelectItem>
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
                      onValueChange={(value: 'default' | 'minimal' | 'bordered' | 'shadow' | 'gradient') => 
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
                        <SelectItem value="gradient">Gradient</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <div>
              <Label className="text-base font-medium">Advanced Settings</Label>
              <p className="text-sm text-muted-foreground mb-4">
                Advanced customization options for power users
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Enable animations</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Lazy load widgets</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Cache data locally</Label>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Accessibility</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">High contrast mode</Label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Reduce motion</Label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Large text mode</Label>
                    <Switch />
                  </div>
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
