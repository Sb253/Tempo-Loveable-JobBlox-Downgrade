
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
import { useTheme } from "@/components/ThemeProvider";

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
  const { actualTheme } = useTheme();

  const getPriorityColor = (priority: string) => {
    if (actualTheme === 'dark') {
      switch (priority) {
        case 'high': return 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg';
        case 'medium': return 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg';
        case 'low': return 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg';
        default: return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg';
      }
    } else {
      switch (priority) {
        case 'high': return 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg';
        case 'medium': return 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg';
        case 'low': return 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg';
        default: return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg';
      }
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {stages.map((stage) => (
          <Card key={stage.id} className="h-fit min-h-[500px] bg-gradient-to-br from-card/50 to-card border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-3" style={{ 
              background: `linear-gradient(135deg, ${stage.color}15 0%, ${stage.color}05 100%)`,
              borderRadius: '0.5rem 0.5rem 0 0'
            }}>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full shadow-md border-2 border-white" 
                    style={{ 
                      backgroundColor: stage.color,
                      boxShadow: `0 0 10px ${stage.color}40`
                    }}
                  />
                  <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                    {stage.title}
                  </span>
                  <Badge variant="secondary" className="bg-gradient-to-r from-primary/20 to-primary/10 text-primary font-bold border border-primary/20">
                    {stage.items.length}
                  </Badge>
                  {stage.limit && stage.items.length >= stage.limit && (
                    <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg">Full</Badge>
                  )}
                </CardTitle>
                <div className="flex items-center gap-1">
                  {onAddItem && (
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="hover:bg-primary/10 hover:text-primary transition-colors"
                      onClick={() => onAddItem(stage.id)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  )}
                  {onEditStage && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost" className="hover:bg-primary/10 hover:text-primary transition-colors">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-card border-2 border-primary/20 shadow-xl">
                        <DropdownMenuItem onClick={() => onEditStage(stage.id)} className="hover:bg-primary/10 hover:text-primary">
                          <Settings className="h-4 w-4 mr-2" />
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
                  className={`space-y-3 min-h-[400px] p-4 transition-all duration-200 ${
                    snapshot.isDraggingOver ? 'bg-primary/5 border-2 border-primary/30 border-dashed rounded-lg' : ''
                  }`}
                >
                  {stage.items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`p-4 cursor-pointer bg-gradient-to-br from-card to-card/50 border-2 border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all duration-200 ${
                            snapshot.isDragging ? 'rotate-1 shadow-2xl scale-105 border-primary/50' : ''
                          }`}
                          onClick={() => onItemClick?.(item)}
                          style={{
                            boxShadow: snapshot.isDragging ? `0 10px 30px ${stage.color}30` : undefined
                          }}
                        >
                          <div className="space-y-3">
                            <h4 className="font-bold text-sm bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">{item.title}</h4>
                            <p className="text-xs text-muted-foreground font-medium">{item.client}</p>
                            
                            <div className="flex items-center justify-between">
                              <Badge className={getPriorityColor(item.priority)}>
                                {item.priority}
                              </Badge>
                              <div className="flex items-center gap-1 bg-gradient-to-r from-green-500/10 to-green-600/10 px-2 py-1 rounded-full border border-green-500/20">
                                <DollarSign className="h-3 w-3 text-green-600" />
                                <span className="text-sm font-bold text-green-600">
                                  {item.value.toLocaleString()}
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-primary/5 px-2 py-1 rounded-md">
                              <Calendar className="h-3 w-3 text-primary" />
                              <span className="font-medium">{item.estimatedStart}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-primary/5 px-2 py-1 rounded-md">
                              <User className="h-3 w-3 text-primary" />
                              <span className="font-medium">{item.assignedTo}</span>
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
