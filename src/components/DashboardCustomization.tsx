
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { GripVertical, Eye, EyeOff } from "lucide-react";

interface DashboardWidget {
  id: string;
  title: string;
  enabled: boolean;
  order: number;
}

interface DashboardCustomizationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  widgets: DashboardWidget[];
  onWidgetsChange: (widgets: DashboardWidget[]) => void;
}

export const DashboardCustomization = ({ 
  open, 
  onOpenChange, 
  widgets, 
  onWidgetsChange 
}: DashboardCustomizationProps) => {
  const [localWidgets, setLocalWidgets] = useState<DashboardWidget[]>(widgets);

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

  const handleSave = () => {
    onWidgetsChange(localWidgets);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Customize Dashboard</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label className="text-base font-medium">Dashboard Widgets</Label>
            <p className="text-sm text-muted-foreground mb-4">
              Drag to reorder and toggle visibility of dashboard sections
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

          <div className="flex justify-end space-x-2 pt-4">
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
