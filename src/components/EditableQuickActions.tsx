
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { 
  Calendar, 
  Users, 
  FileText, 
  Calculator, 
  CreditCard, 
  MapPin,
  Wrench,
  ClipboardList,
  UserPlus,
  Home,
  FileCheck,
  GripVertical,
  Plus,
  X
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useToast } from "@/hooks/use-toast";

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  enabled: boolean;
  order: number;
  category: 'client-intake' | 'general';
}

const defaultActions: QuickAction[] = [
  {
    id: 'consultation',
    title: 'Initial Consultation',
    description: 'Schedule first meeting',
    icon: Calendar,
    enabled: true,
    order: 0,
    category: 'client-intake'
  },
  {
    id: 'site-assessment',
    title: 'Site Assessment',
    description: 'Property evaluation',
    icon: Home,
    enabled: true,
    order: 1,
    category: 'client-intake'
  },
  {
    id: 'client-info',
    title: 'Client Information',
    description: 'Collect details',
    icon: UserPlus,
    enabled: true,
    order: 2,
    category: 'client-intake'
  },
  {
    id: 'project-proposal',
    title: 'Project Proposal',
    description: 'Create proposal',
    icon: FileCheck,
    enabled: true,
    order: 3,
    category: 'client-intake'
  },
  {
    id: 'schedule',
    title: 'Schedule Job',
    description: 'Book appointment',
    icon: Calendar,
    enabled: true,
    order: 4,
    category: 'general'
  },
  {
    id: 'customer',
    title: 'Add Customer',
    description: 'New client',
    icon: Users,
    enabled: true,
    order: 5,
    category: 'general'
  },
  {
    id: 'estimate',
    title: 'Create Estimate',
    description: 'Project quote',
    icon: Calculator,
    enabled: true,
    order: 6,
    category: 'general'
  },
  {
    id: 'invoice',
    title: 'Create Invoice',
    description: 'Bill services',
    icon: FileText,
    enabled: true,
    order: 7,
    category: 'general'
  },
  {
    id: 'payment',
    title: 'Process Payment',
    description: 'Accept payment',
    icon: CreditCard,
    enabled: true,
    order: 8,
    category: 'general'
  },
  {
    id: 'map',
    title: 'View Map',
    description: 'Job locations',
    icon: MapPin,
    enabled: true,
    order: 9,
    category: 'general'
  },
  {
    id: 'quote',
    title: 'Create Quote',
    description: 'Project proposal',
    icon: ClipboardList,
    enabled: true,
    order: 10,
    category: 'general'
  },
  {
    id: 'jobs',
    title: 'Manage Jobs',
    description: 'View projects',
    icon: Wrench,
    enabled: true,
    order: 11,
    category: 'general'
  }
];

export const EditableQuickActions = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [actions, setActions] = useState<QuickAction[]>(defaultActions);
  const [isEditing, setIsEditing] = useState(false);

  const getThemeGradients = () => {
    if (theme === 'dark') {
      return {
        clientIntake: 'from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800',
        general: 'from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800',
        cardBg: 'bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700/50',
        actionColors: [
          'from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800',
          'from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800',
          'from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800',
          'from-orange-600 to-red-700 hover:from-orange-700 hover:to-red-800',
          'from-teal-600 to-cyan-700 hover:from-teal-700 hover:to-cyan-800',
          'from-pink-600 to-rose-700 hover:from-pink-700 hover:to-rose-800',
          'from-indigo-600 to-blue-700 hover:from-indigo-700 hover:to-blue-800',
          'from-yellow-600 to-amber-700 hover:from-yellow-700 hover:to-amber-800'
        ]
      };
    } else {
      return {
        clientIntake: 'from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700',
        general: 'from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700',
        cardBg: 'bg-gradient-to-br from-white to-slate-50 border-slate-200/50',
        actionColors: [
          'from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700',
          'from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700',
          'from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700',
          'from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700',
          'from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700',
          'from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700',
          'from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700',
          'from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700'
        ]
      };
    }
  };

  const themeGradients = getThemeGradients();

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(actions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index
    }));

    setActions(updatedItems);
  };

  const toggleAction = (id: string) => {
    setActions(actions.map(action => 
      action.id === id ? { ...action, enabled: !action.enabled } : action
    ));
  };

  const clientIntakeActions = actions
    .filter(action => action.category === 'client-intake' && action.enabled)
    .sort((a, b) => a.order - b.order);

  const generalActions = actions
    .filter(action => action.category === 'general' && action.enabled)
    .sort((a, b) => a.order - b.order);

  const renderActionButton = (action: QuickAction, index: number, isDragging = false) => {
    const Icon = action.icon;
    const colorIndex = index % themeGradients.actionColors.length;
    const gradient = themeGradients.actionColors[colorIndex];

    return (
      <Button
        key={action.id}
        variant="outline"
        size="sm"
        className={`h-12 flex flex-col items-center justify-center gap-1 bg-gradient-to-r ${gradient} text-white border-0 hover:scale-105 transition-all duration-200 shadow-md text-xs ${isDragging ? 'opacity-50' : ''}`}
        onClick={() => {
          toast({
            title: `${action.title} Selected`,
            description: `Opening ${action.description.toLowerCase()}...`,
          });
        }}
      >
        <Icon className="h-3 w-3" />
        <div className="text-center leading-tight">
          <div className="font-medium text-[10px]">{action.title}</div>
          <div className="opacity-90 text-[9px]">{action.description}</div>
        </div>
      </Button>
    );
  };

  if (isEditing) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Edit Quick Actions</h3>
          <Button onClick={() => setIsEditing(false)} variant="outline" size="sm">
            Done Editing
          </Button>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="quick-actions">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                {actions.map((action, index) => (
                  <Draggable key={action.id} draggableId={action.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`flex items-center justify-between p-3 border rounded-lg ${
                          snapshot.isDragging ? 'bg-muted' : 'bg-card'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div {...provided.dragHandleProps}>
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div>
                            <span className="font-medium">{action.title}</span>
                            <p className="text-sm text-muted-foreground">{action.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={action.category === 'client-intake' ? 'default' : 'secondary'}>
                            {action.category}
                          </Badge>
                          <Button
                            variant={action.enabled ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleAction(action.id)}
                          >
                            {action.enabled ? 'Enabled' : 'Disabled'}
                          </Button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Quick Actions</h3>
        <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
          Edit Actions
        </Button>
      </div>

      <Card className={`border shadow-lg ${themeGradients.cardBg}`}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <UserPlus className="h-4 w-4 text-primary" />
            Client Intake
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {clientIntakeActions.map((action, index) => renderActionButton(action, index))}
          </div>
        </CardContent>
      </Card>

      <Card className={`border shadow-lg ${themeGradients.cardBg}`}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Wrench className="h-4 w-4 text-primary" />
            General Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {generalActions.map((action, index) => renderActionButton(action, index + clientIntakeActions.length))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
