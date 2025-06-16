
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
    const baseClasses = "border-border/40 backdrop-blur supports-[backdrop-filter]:bg-card/50";
    
    switch (style) {
      case 'gradient':
        return `${baseClasses} bg-gradient-to-br from-card to-card/50 border-2 border-primary/10`;
      case 'minimal':
        return `${baseClasses} bg-card/30 border border-border/20`;
      case 'bordered':
        return `${baseClasses} bg-card border-2 border-primary/20`;
      default:
        return `${baseClasses} bg-card/50`;
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
            "transition-all duration-300 hover:shadow-lg",
            snapshot.isDragging ? 'shadow-2xl' : ''
          )}>
            <CardHeader className="relative">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <div
                    {...provided.dragHandleProps}
                    className="cursor-grab hover:text-primary transition-colors"
                  >
                    <GripVertical className="h-4 w-4" />
                  </div>
                  {title}
                </CardTitle>
                
                {isHovered && (
                  <div className="flex items-center gap-1">
                    {onEdit && (
                      <Button variant="ghost" size="sm" onClick={onEdit}>
                        <Settings className="h-3 w-3" />
                      </Button>
                    )}
                    {onRemove && (
                      <Button variant="ghost" size="sm" onClick={onRemove}>
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {children}
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  );
};
