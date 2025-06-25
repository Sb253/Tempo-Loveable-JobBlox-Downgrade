import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { GripVertical, Eye, EyeOff, Settings2, Palette } from "lucide-react";

interface WidgetConfig {
  id: string;
  title: string;
  enabled: boolean;
  order: number;
  size: "small" | "medium" | "large" | "full-width";
  refreshInterval: number;
  style: "default" | "gradient" | "minimal" | "bordered";
  color: string;
}

interface WidgetCustomizationProps {
  widgets?: WidgetConfig[];
  onWidgetsChange?: (widgets: WidgetConfig[]) => void;
}

export const WidgetCustomization = ({
  widgets: propWidgets,
  onWidgetsChange,
}: WidgetCustomizationProps) => {
  // Local demo data if no widgets are provided
  const defaultWidgets: WidgetConfig[] = [
    {
      id: "1",
      title: "Statistics Cards",
      enabled: true,
      order: 0,
      size: "large",
      refreshInterval: 30,
      style: "gradient",
      color: "blue",
    },
    {
      id: "2",
      title: "Recent Jobs",
      enabled: true,
      order: 1,
      size: "full-width",
      refreshInterval: 60,
      style: "default",
      color: "green",
    },
    {
      id: "3",
      title: "Quick Actions",
      enabled: true,
      order: 2,
      size: "medium",
      refreshInterval: 120,
      style: "bordered",
      color: "purple",
    },
    {
      id: "4",
      title: "Revenue Chart",
      enabled: false,
      order: 3,
      size: "large",
      refreshInterval: 180,
      style: "minimal",
      color: "orange",
    },
    {
      id: "5",
      title: "Team Schedule",
      enabled: true,
      order: 4,
      size: "medium",
      refreshInterval: 45,
      style: "gradient",
      color: "red",
    },
    {
      id: "6",
      title: "Performance Metrics",
      enabled: false,
      order: 5,
      size: "small",
      refreshInterval: 90,
      style: "default",
      color: "pink",
    },
  ];

  const [localWidgets, setLocalWidgets] = useState<WidgetConfig[]>(
    propWidgets || defaultWidgets,
  );

  useEffect(() => {
    if (propWidgets) {
      setLocalWidgets(propWidgets);
    }
  }, [propWidgets]);

  const handleDragEnd = (result: any) => {
    // Drag and drop functionality temporarily disabled
    console.log("Drag and drop would reorder widgets");
  };

  const updateWidget = (id: string, updates: Partial<WidgetConfig>) => {
    const updated = localWidgets.map((widget) =>
      widget.id === id ? { ...widget, ...updates } : widget,
    );
    setLocalWidgets(updated);
    if (onWidgetsChange) {
      onWidgetsChange(updated);
    }
  };

  const colorOptions = [
    { value: "blue", label: "Blue", class: "bg-blue-500" },
    { value: "green", label: "Green", class: "bg-green-500" },
    { value: "purple", label: "Purple", class: "bg-purple-500" },
    { value: "orange", label: "Orange", class: "bg-orange-500" },
    { value: "red", label: "Red", class: "bg-red-500" },
    { value: "pink", label: "Pink", class: "bg-pink-500" },
    { value: "indigo", label: "Indigo", class: "bg-indigo-500" },
    { value: "cyan", label: "Cyan", class: "bg-cyan-500" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-medium">Widget Configuration</Label>
        <p className="text-sm text-muted-foreground mb-4">
          Customize your dashboard widgets appearance and behavior
        </p>
      </div>

      <div className="space-y-3">
        {localWidgets
          .sort((a, b) => a.order - b.order)
          .map((widget, index) => (
            <Card
              key={widget.id}
              className="transition-all duration-200 shadow-sm hover:shadow-md bg-gradient-to-br from-card to-card/50 border-2 border-primary/10"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-4">
                  {/* Drag handle and title */}
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="cursor-not-allowed text-gray-400 transition-colors">
                      <GripVertical className="h-5 w-5" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{widget.title}</span>
                      <Badge
                        variant="secondary"
                        className={`bg-${widget.color}-100 text-${widget.color}-700 border-${widget.color}-200`}
                      >
                        {widget.size}
                      </Badge>
                    </div>
                  </div>

                  {/* Widget controls */}
                  <div className="flex items-center space-x-4">
                    {/* Size selector */}
                    <div className="flex items-center space-x-2">
                      <Label className="text-xs">Size:</Label>
                      <Select
                        value={widget.size}
                        onValueChange={(
                          value: "small" | "medium" | "large" | "full-width",
                        ) => updateWidget(widget.id, { size: value })}
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

                    {/* Style selector */}
                    <div className="flex items-center space-x-2">
                      <Label className="text-xs">Style:</Label>
                      <Select
                        value={widget.style}
                        onValueChange={(
                          value:
                            | "default"
                            | "gradient"
                            | "minimal"
                            | "bordered",
                        ) => updateWidget(widget.id, { style: value })}
                      >
                        <SelectTrigger className="w-24 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Default</SelectItem>
                          <SelectItem value="gradient">Gradient</SelectItem>
                          <SelectItem value="minimal">Minimal</SelectItem>
                          <SelectItem value="bordered">Bordered</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Color selector */}
                    <div className="flex items-center space-x-2">
                      <Label className="text-xs">Color:</Label>
                      <Select
                        value={widget.color}
                        onValueChange={(value: string) =>
                          updateWidget(widget.id, { color: value })
                        }
                      >
                        <SelectTrigger className="w-20 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {colorOptions.map((color) => (
                            <SelectItem key={color.value} value={color.value}>
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-3 h-3 rounded-full ${color.class}`}
                                ></div>
                                <span className="text-xs">{color.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Refresh interval */}
                    <div className="flex items-center space-x-2">
                      <Label className="text-xs">Refresh (s):</Label>
                      <Input
                        type="number"
                        value={widget.refreshInterval}
                        onChange={(e) =>
                          updateWidget(widget.id, {
                            refreshInterval: parseInt(e.target.value),
                          })
                        }
                        className="w-16 h-8"
                        min="5"
                        max="300"
                      />
                    </div>

                    {/* Visibility toggle */}
                    <div className="flex items-center space-x-2">
                      {widget.enabled ? (
                        <Eye className="h-4 w-4 text-green-600" />
                      ) : (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      )}
                      <Switch
                        checked={widget.enabled}
                        onCheckedChange={(checked) =>
                          updateWidget(widget.id, { enabled: checked })
                        }
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};
