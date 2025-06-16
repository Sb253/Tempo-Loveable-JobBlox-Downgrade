
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { 
  Calendar, Users, FileText, Calculator, CreditCard, MapPin, Phone, Mail, 
  Wrench, ClipboardList, UserPlus, Home, Camera, FileCheck, 
  GripVertical, Plus, Trash2, Edit, Settings, ArrowRight
} from "lucide-react";

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  enabled: boolean;
}

const availableIcons = {
  Calendar, Users, FileText, Calculator, CreditCard, MapPin, Phone, Mail,
  Wrench, ClipboardList, UserPlus, Home, Camera, FileCheck, Plus, Settings
};

const colorOptions = [
  'from-blue-500 to-blue-600',
  'from-green-500 to-green-600', 
  'from-purple-500 to-purple-600',
  'from-orange-500 to-orange-600',
  'from-red-500 to-red-600',
  'from-indigo-500 to-indigo-600',
  'from-pink-500 to-pink-600',
  'from-cyan-500 to-cyan-600'
];

export const EditableQuickActions = () => {
  const [actions, setActions] = useState<QuickAction[]>([
    { id: '1', title: 'Schedule Job', description: 'Book appointment', icon: 'Calendar', color: 'from-blue-500 to-blue-600', enabled: true },
    { id: '2', title: 'Add Customer', description: 'New client', icon: 'Users', color: 'from-green-500 to-green-600', enabled: true },
    { id: '3', title: 'Create Estimate', description: 'Project quote', icon: 'Calculator', color: 'from-purple-500 to-purple-600', enabled: true },
    { id: '4', title: 'Create Invoice', description: 'Bill services', icon: 'FileText', color: 'from-orange-500 to-orange-600', enabled: true },
    { id: '5', title: 'Process Payment', description: 'Accept payment', icon: 'CreditCard', color: 'from-red-500 to-red-600', enabled: true },
    { id: '6', title: 'View Map', description: 'Job locations', icon: 'MapPin', color: 'from-indigo-500 to-indigo-600', enabled: true }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingAction, setEditingAction] = useState<QuickAction | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(actions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setActions(items);
  };

  const enabledActions = actions.filter(action => action.enabled);

  const addNewAction = (newAction: Omit<QuickAction, 'id'>) => {
    const id = Date.now().toString();
    setActions([...actions, { ...newAction, id }]);
    setShowAddDialog(false);
  };

  const updateAction = (id: string, updates: Partial<QuickAction>) => {
    setActions(actions.map(action => 
      action.id === id ? { ...action, ...updates } : action
    ));
  };

  const deleteAction = (id: string) => {
    setActions(actions.filter(action => action.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Quick Actions</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddDialog(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Action
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            {isEditing ? 'Done' : 'Edit'}
          </Button>
        </div>
      </div>

      <Card className="shadow-lg bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowRight className="h-5 w-5 text-blue-500" />
            Quick Actions
            <Badge variant="outline">{enabledActions.length} Active</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="actions">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                    {actions.map((action, index) => (
                      <Draggable key={action.id} draggableId={action.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="flex items-center gap-3 p-3 border rounded-lg bg-card"
                          >
                            <div {...provided.dragHandleProps}>
                              <GripVertical className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{action.title}</div>
                              <div className="text-sm text-muted-foreground">{action.description}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={action.enabled}
                                onChange={(e) => updateAction(action.id, { enabled: e.target.checked })}
                                className="rounded"
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => deleteAction(action.id)}
                              >
                                <Trash2 className="h-3 w-3" />
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
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {enabledActions.map((action) => {
                const IconComponent = availableIcons[action.icon as keyof typeof availableIcons];
                return (
                  <button 
                    key={action.id}
                    className={`p-3 text-left rounded-lg bg-gradient-to-r ${action.color} text-white font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex flex-col items-center gap-2 text-center`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <div>
                      <div className="text-xs font-semibold">{action.title}</div>
                      <div className="text-xs opacity-90">{action.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {showAddDialog && (
        <Dialog open={true} onOpenChange={setShowAddDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Quick Action</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              addNewAction({
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                icon: formData.get('icon') as string,
                color: formData.get('color') as string,
                enabled: true
              });
            }}>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input name="title" required />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Input name="description" required />
                </div>
                <div>
                  <label className="text-sm font-medium">Icon</label>
                  <select name="icon" className="w-full p-2 border rounded">
                    {Object.keys(availableIcons).map(iconName => (
                      <option key={iconName} value={iconName}>{iconName}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Color</label>
                  <select name="color" className="w-full p-2 border rounded">
                    {colorOptions.map(color => (
                      <option key={color} value={color}>{color}</option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setShowAddDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Action</Button>
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
