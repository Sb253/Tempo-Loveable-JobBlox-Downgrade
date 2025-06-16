
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Draggable } from 'react-beautiful-dnd';
import { GripVertical, Settings, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DraggableWidgetProps {
  id: string;
  index: number;
  title: string;
  children: React.ReactNode;
  size: 'small' | 'medium' | 'large' | 'full-width';
  style: 'default' | 'gradient' | 'minimal' | 'bordered';
  color: string;
  onEdit?: () => void;
  onRemove?: () => void;
  className?: string;
}

export const DraggableWidget = ({
  id,
  index,
  title,
  children,
  size,
  style,
  color,
  onEdit,
  onRemove,
  className
}: DraggableWidgetProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'col-span-1 md:col-span-1';
      case 'medium':
        return 'col-span-1 md:col-span-2';
      case 'large':
        return 'col-span-1 md:col-span-3';
      case 'full-width':
        return 'col-span-1 md:col-span-4';
      default:
        return 'col-span-1 md:col-span-2';
    }
  };

  const getStyleClasses = () => {
    const baseClasses = "border-border/40 backdrop-blur-sm supports-[backdrop-filter]:bg-card/50";
    
    switch (style) {
      case 'gradient':
        return `${baseClasses} bg-gradient-to-br from-card/80 to-card/60 border-2 border-primary/20 shadow-lg`;
      case 'minimal':
        return `${baseClasses} bg-card/40 border border-border/30`;
      case 'bordered':
        return `${baseClasses} bg-card/70 border-2 border-primary/30`;
      default:
        return `${baseClasses} bg-card/60 border border-border/20`;
    }
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={cn(
            getSizeClasses(),
            className,
            snapshot.isDragging ? 'rotate-2 scale-105 z-50' : ''
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Card className={cn(
            getStyleClasses(),
            "transition-all duration-300 hover:shadow-xl hover:border-primary/30",
            snapshot.isDragging ? 'shadow-2xl ring-2 ring-primary/50' : ''
          )}>
            <CardHeader className="relative pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <div
                    {...provided.dragHandleProps}
                    className="cursor-grab hover:text-primary transition-colors active:cursor-grabbing"
                  >
                    <GripVertical className="h-4 w-4" />
                  </div>
                  <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                    {title}
                  </span>
                </CardTitle>
                
                {(isHovered || snapshot.isDragging) && (
                  <div className="flex items-center gap-1 opacity-100 transition-opacity">
                    {onEdit && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={onEdit}
                        className="h-8 w-8 p-0 hover:bg-primary/20"
                      >
                        <Settings className="h-3 w-3" />
                      </Button>
                    )}
                    {onRemove && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={onRemove}
                        className="h-8 w-8 p-0 hover:bg-destructive/20 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {children}
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  );
};
