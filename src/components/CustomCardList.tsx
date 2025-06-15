
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Eye, EyeOff, BarChart3, Calendar, Users, DollarSign, Clock, FileText, TrendingUp, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CustomCard {
  id: string;
  title: string;
  description: string;
  type: 'metric' | 'chart' | 'list' | 'status' | 'progress' | 'summary';
  enabled: boolean;
  size: 'small' | 'medium' | 'large' | 'full-width';
  order: number;
  icon: string;
  color: string;
  value?: string;
  trend?: string;
  dataSource?: string;
}

export const CustomCardList = () => {
  const { toast } = useToast();
  const [cards, setCards] = useState<CustomCard[]>([
    {
      id: '1',
      title: 'Revenue This Month',
      description: 'Total revenue generated this month',
      type: 'metric',
      enabled: true,
      size: 'medium',
      order: 0,
      icon: 'DollarSign',
      color: 'green',
      value: '$45,230',
      trend: '+23% from last month'
    },
    {
      id: '2',
      title: 'Active Jobs',
      description: 'Number of jobs currently in progress',
      type: 'status',
      enabled: true,
      size: 'medium',
      order: 1,
      icon: 'Activity',
      color: 'blue',
      value: '12',
      trend: '+8% from last week'
    },
    {
      id: '3',
      title: 'Customer Growth',
      description: 'Monthly customer acquisition chart',
      type: 'chart',
      enabled: false,
      size: 'large',
      order: 2,
      icon: 'TrendingUp',
      color: 'purple'
    }
  ]);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingCard, setEditingCard] = useState<CustomCard | null>(null);
  const [newCard, setNewCard] = useState<Partial<CustomCard>>({
    title: '',
    description: '',
    type: 'metric',
    enabled: true,
    size: 'medium',
    icon: 'BarChart3',
    color: 'blue'
  });

  const cardTypes = [
    { value: 'metric', label: 'Metric Card', icon: DollarSign },
    { value: 'chart', label: 'Chart Card', icon: BarChart3 },
    { value: 'list', label: 'List Card', icon: FileText },
    { value: 'status', label: 'Status Card', icon: Activity },
    { value: 'progress', label: 'Progress Card', icon: TrendingUp },
    { value: 'summary', label: 'Summary Card', icon: Clock }
  ];

  const iconOptions = [
    { value: 'BarChart3', label: 'Bar Chart', icon: BarChart3 },
    { value: 'Calendar', label: 'Calendar', icon: Calendar },
    { value: 'Users', label: 'Users', icon: Users },
    { value: 'DollarSign', label: 'Dollar Sign', icon: DollarSign },
    { value: 'Clock', label: 'Clock', icon: Clock },
    { value: 'FileText', label: 'File Text', icon: FileText },
    { value: 'TrendingUp', label: 'Trending Up', icon: TrendingUp },
    { value: 'Activity', label: 'Activity', icon: Activity }
  ];

  const colorOptions = [
    { value: 'blue', label: 'Blue', class: 'bg-blue-500' },
    { value: 'green', label: 'Green', class: 'bg-green-500' },
    { value: 'purple', label: 'Purple', class: 'bg-purple-500' },
    { value: 'orange', label: 'Orange', class: 'bg-orange-500' },
    { value: 'red', label: 'Red', class: 'bg-red-500' },
    { value: 'pink', label: 'Pink', class: 'bg-pink-500' },
    { value: 'indigo', label: 'Indigo', class: 'bg-indigo-500' },
    { value: 'cyan', label: 'Cyan', class: 'bg-cyan-500' }
  ];

  const sizeOptions = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
    { value: 'full-width', label: 'Full Width' }
  ];

  const handleAddCard = () => {
    if (!newCard.title) {
      toast({
        title: "Error",
        description: "Please enter a card title",
        variant: "destructive"
      });
      return;
    }

    const card: CustomCard = {
      id: Date.now().toString(),
      title: newCard.title,
      description: newCard.description || '',
      type: newCard.type as CustomCard['type'],
      enabled: newCard.enabled ?? true,
      size: newCard.size as CustomCard['size'],
      order: cards.length,
      icon: newCard.icon || 'BarChart3',
      color: newCard.color || 'blue',
      value: newCard.value,
      trend: newCard.trend
    };

    setCards([...cards, card]);
    setNewCard({
      title: '',
      description: '',
      type: 'metric',
      enabled: true,
      size: 'medium',
      icon: 'BarChart3',
      color: 'blue'
    });
    setShowAddDialog(false);
    
    toast({
      title: "Card Added",
      description: `${card.title} has been added to your dashboard`
    });
  };

  const handleEditCard = (card: CustomCard) => {
    setEditingCard(card);
    setNewCard(card);
    setShowAddDialog(true);
  };

  const handleUpdateCard = () => {
    if (!editingCard || !newCard.title) return;

    const updatedCards = cards.map(c => 
      c.id === editingCard.id ? { ...c, ...newCard } : c
    );
    
    setCards(updatedCards);
    setEditingCard(null);
    setShowAddDialog(false);
    setNewCard({
      title: '',
      description: '',
      type: 'metric',
      enabled: true,
      size: 'medium',
      icon: 'BarChart3',
      color: 'blue'
    });

    toast({
      title: "Card Updated",
      description: "Card has been updated successfully"
    });
  };

  const handleDeleteCard = (id: string) => {
    setCards(cards.filter(c => c.id !== id));
    toast({
      title: "Card Deleted",
      description: "Card has been removed from your dashboard"
    });
  };

  const toggleCardEnabled = (id: string) => {
    setCards(cards.map(c => 
      c.id === id ? { ...c, enabled: !c.enabled } : c
    ));
  };

  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, any> = {
      BarChart3, Calendar, Users, DollarSign, Clock, FileText, TrendingUp, Activity
    };
    return iconMap[iconName] || BarChart3;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Custom Dashboard Cards</h2>
          <p className="text-muted-foreground">Create and manage your dashboard cards</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Card
        </Button>
      </div>

      <div className="grid gap-4">
        {cards.map((card) => {
          const IconComponent = getIconComponent(card.icon);
          const colorClass = colorOptions.find(c => c.value === card.color)?.class || 'bg-blue-500';
          
          return (
            <Card key={card.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${colorClass} text-white`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{card.title}</h3>
                      <p className="text-sm text-muted-foreground">{card.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary">{card.type}</Badge>
                        <Badge variant="outline">{card.size}</Badge>
                        {card.enabled ? (
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        ) : (
                          <Badge variant="secondary">Disabled</Badge>
                        )}
                      </div>
                      {card.value && (
                        <div className="mt-2">
                          <span className="text-2xl font-bold">{card.value}</span>
                          {card.trend && (
                            <span className="text-sm text-muted-foreground ml-2">{card.trend}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleCardEnabled(card.id)}
                    >
                      {card.enabled ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEditCard(card)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteCard(card.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Add/Edit Card Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingCard ? 'Edit Card' : 'Add New Card'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Card Title</Label>
              <Input
                id="title"
                value={newCard.title || ''}
                onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
                placeholder="Enter card title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newCard.description || ''}
                onChange={(e) => setNewCard({ ...newCard, description: e.target.value })}
                placeholder="Enter card description"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Card Type</Label>
                <Select
                  value={newCard.type}
                  onValueChange={(value: CustomCard['type']) => setNewCard({ ...newCard, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cardTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <type.icon className="h-4 w-4" />
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Size</Label>
                <Select
                  value={newCard.size}
                  onValueChange={(value: CustomCard['size']) => setNewCard({ ...newCard, size: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sizeOptions.map((size) => (
                      <SelectItem key={size.value} value={size.value}>
                        {size.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Icon</Label>
                <Select
                  value={newCard.icon}
                  onValueChange={(value) => setNewCard({ ...newCard, icon: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((icon) => (
                      <SelectItem key={icon.value} value={icon.value}>
                        <div className="flex items-center gap-2">
                          <icon.icon className="h-4 w-4" />
                          {icon.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Color</Label>
                <Select
                  value={newCard.color}
                  onValueChange={(value) => setNewCard({ ...newCard, color: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {colorOptions.map((color) => (
                      <SelectItem key={color.value} value={color.value}>
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded ${color.class}`} />
                          {color.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {(newCard.type === 'metric' || newCard.type === 'status') && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="value">Value</Label>
                  <Input
                    id="value"
                    value={newCard.value || ''}
                    onChange={(e) => setNewCard({ ...newCard, value: e.target.value })}
                    placeholder="e.g., $45,230 or 12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="trend">Trend</Label>
                  <Input
                    id="trend"
                    value={newCard.trend || ''}
                    onChange={(e) => setNewCard({ ...newCard, trend: e.target.value })}
                    placeholder="e.g., +23% from last month"
                  />
                </div>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Switch
                checked={newCard.enabled}
                onCheckedChange={(checked) => setNewCard({ ...newCard, enabled: checked })}
              />
              <Label>Enable card</Label>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => {
              setShowAddDialog(false);
              setEditingCard(null);
              setNewCard({
                title: '',
                description: '',
                type: 'metric',
                enabled: true,
                size: 'medium',
                icon: 'BarChart3',
                color: 'blue'
              });
            }}>
              Cancel
            </Button>
            <Button onClick={editingCard ? handleUpdateCard : handleAddCard}>
              {editingCard ? 'Update Card' : 'Add Card'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
