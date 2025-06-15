
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Settings, MoreVertical, User, Calendar, DollarSign } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface PipelineItem {
  id: string;
  title: string;
  client: string;
  value: number;
  priority: 'low' | 'medium' | 'high';
  estimatedStart: string;
  assignedTo: string;
  description?: string;
}

export interface PipelineStage {
  id: string;
  title: string;
  items: PipelineItem[];
  color: string;
  limit?: number;
}

interface DragDropPipelineProps {
  stages: PipelineStage[];
  onStagesChange: (stages: PipelineStage[]) => void;
  onItemClick?: (item: PipelineItem) => void;
  onAddItem?: (stageId: string) => void;
  onEditStage?: (stageId: string) => void;
}

export const DragDropPipeline = ({ 
  stages, 
  onStagesChange, 
  onItemClick, 
  onAddItem, 
  onEditStage 
}: DragDropPipelineProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceStage = stages.find(stage => stage.id === source.droppableId);
    const destStage = stages.find(stage => stage.id === destination.droppableId);

    if (!sourceStage || !destStage) return;

    const draggedItem = sourceStage.items.find(item => item.id === draggableId);
    if (!draggedItem) return;

    // Create new stages array
    const newStages = stages.map(stage => {
      if (stage.id === source.droppableId) {
        // Remove item from source stage
        return {
          ...stage,
          items: stage.items.filter(item => item.id !== draggableId)
        };
      }
      if (stage.id === destination.droppableId) {
        // Add item to destination stage
        const newItems = [...stage.items];
        newItems.splice(destination.index, 0, draggedItem);
        return {
          ...stage,
          items: newItems
        };
      }
      return stage;
    });

    onStagesChange(newStages);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {stages.map((stage) => (
          <Card key={stage.id} className="h-fit min-h-[500px]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: stage.color }}
                  />
                  {stage.title}
                  <Badge variant="secondary">{stage.items.length}</Badge>
                  {stage.limit && stage.items.length >= stage.limit && (
                    <Badge variant="destructive">Full</Badge>
                  )}
                </CardTitle>
                <div className="flex items-center gap-1">
                  {onAddItem && (
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => onAddItem(stage.id)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  )}
                  {onEditStage && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost">
                          <MoreVertical className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => onEditStage(stage.id)}>
                          <Settings className="h-3 w-3 mr-2" />
                          Edit Stage
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
            </CardHeader>
            
            <Droppable droppableId={stage.id}>
              {(provided, snapshot) => (
                <CardContent
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`space-y-3 min-h-[400px] ${
                    snapshot.isDraggingOver ? 'bg-accent/50' : ''
                  }`}
                >
                  {stage.items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`p-3 cursor-pointer hover:shadow-md transition-shadow ${
                            snapshot.isDragging ? 'rotate-2 shadow-lg' : ''
                          }`}
                          onClick={() => onItemClick?.(item)}
                        >
                          <div className="space-y-2">
                            <h4 className="font-medium text-sm">{item.title}</h4>
                            <p className="text-xs text-muted-foreground">{item.client}</p>
                            
                            <div className="flex items-center justify-between">
                              <Badge className={getPriorityColor(item.priority)} variant="secondary">
                                {item.priority}
                              </Badge>
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-3 w-3" />
                                <span className="text-sm font-medium">
                                  {item.value.toLocaleString()}
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              {item.estimatedStart}
                            </div>
                            
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <User className="h-3 w-3" />
                              {item.assignedTo}
                            </div>
                          </div>
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </CardContent>
              )}
            </Droppable>
          </Card>
        ))}
      </div>
    </DragDropContext>
  );
};
