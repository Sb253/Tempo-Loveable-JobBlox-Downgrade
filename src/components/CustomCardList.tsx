
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
import { 
  Plus, Edit, Trash2, Eye, EyeOff, BarChart3, Calendar, Users, DollarSign, 
  Clock, FileText, Settings, MapPin, Wrench, TrendingUp, Activity, 
  CreditCard, Package, AlertTriangle, CheckCircle, Target, Star, 
  MessageSquare, Camera, PieChart, Building, Phone, Mail
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DashboardCard {
  id: string;
  title: string;
  description: string;
  category: 'business' | 'financial' | 'operational' | 'analytics' | 'communication';
  enabled: boolean;
  size: 'small' | 'medium' | 'large' | 'full-width';
  order: number;
  icon: string;
  color: string;
  dataSource?: string;
  customContent?: string;
}

const availableCards = [
  // Business Cards
  { id: 'revenue-chart', title: 'Revenue Chart', description: 'Monthly revenue trends and forecasts', category: 'business', icon: 'TrendingUp', color: 'blue' },
  { id: 'job-pipeline', title: 'Job Pipeline', description: 'Jobs in different stages of completion', category: 'business', icon: 'BarChart3', color: 'green' },
  { id: 'customer-satisfaction', title: 'Customer Satisfaction', description: 'Average customer ratings and feedback', category: 'business', icon: 'Star', color: 'purple' },
  { id: 'lead-conversion', title: 'Lead Conversion', description: 'Lead to customer conversion rates', category: 'business', icon: 'Target', color: 'orange' },
  { id: 'business-growth', title: 'Business Growth', description: 'Year-over-year growth metrics', category: 'business', icon: 'TrendingUp', color: 'blue' },
  
  // Financial Cards
  { id: 'monthly-revenue', title: 'Monthly Revenue', description: 'Total revenue for current month', category: 'financial', icon: 'DollarSign', color: 'green' },
  { id: 'profit-margin', title: 'Profit Margin', description: 'Current profit margins and trends', category: 'financial', icon: 'PieChart', color: 'blue' },
  { id: 'outstanding-invoices', title: 'Outstanding Invoices', description: 'Unpaid invoices and aging', category: 'financial', icon: 'FileText', color: 'red' },
  { id: 'expenses-tracking', title: 'Expenses Tracking', description: 'Monthly expenses breakdown', category: 'financial', icon: 'CreditCard', color: 'orange' },
  { id: 'payment-status', title: 'Payment Status', description: 'Recent payments and pending amounts', category: 'financial', icon: 'CheckCircle', color: 'green' },
  
  // Operational Cards
  { id: 'active-jobs', title: 'Active Jobs', description: 'Currently active and scheduled jobs', category: 'operational', icon: 'Wrench', color: 'blue' },
  { id: 'team-schedule', title: 'Team Schedule', description: 'Today\'s team assignments', category: 'operational', icon: 'Calendar', color: 'purple' },
  { id: 'equipment-status', title: 'Equipment Status', description: 'Equipment availability and maintenance', category: 'operational', icon: 'Package', color: 'orange' },
  { id: 'job-locations', title: 'Job Locations', description: 'Map view of all job locations', category: 'operational', icon: 'MapPin', color: 'red' },
  { id: 'safety-alerts', title: 'Safety Alerts', description: 'Safety incidents and alerts', category: 'operational', icon: 'AlertTriangle', color: 'red' },
  { id: 'quality-metrics', title: 'Quality Metrics', description: 'Quality control and inspection results', category: 'operational', icon: 'CheckCircle', color: 'green' },
  
  // Analytics Cards
  { id: 'performance-analytics', title: 'Performance Analytics', description: 'Key performance indicators', category: 'analytics', icon: 'Activity', color: 'blue' },
  { id: 'time-tracking', title: 'Time Tracking', description: 'Employee time tracking and productivity', category: 'analytics', icon: 'Clock', color: 'purple' },
  { id: 'customer-analytics', title: 'Customer Analytics', description: 'Customer behavior and insights', category: 'analytics', icon: 'Users', color: 'green' },
  { id: 'job-completion-rate', title: 'Job Completion Rate', description: 'On-time completion statistics', category: 'analytics', icon: 'Target', color: 'blue' },
  { id: 'resource-utilization', title: 'Resource Utilization', description: 'Team and equipment utilization rates', category: 'analytics', icon: 'BarChart3', color: 'orange' },
  
  // Communication Cards
  { id: 'recent-messages', title: 'Recent Messages', description: 'Latest customer communications', category: 'communication', icon: 'MessageSquare', color: 'blue' },
  { id: 'customer-reviews', title: 'Customer Reviews', description: 'Recent customer reviews and ratings', category: 'communication', icon: 'Star', color: 'green' },
  { id: 'notifications', title: 'Notifications', description: 'System notifications and alerts', category: 'communication', icon: 'AlertTriangle', color: 'red' },
  { id: 'communication-log', title: 'Communication Log', description: 'All customer interactions history', category: 'communication', icon: 'Phone', color: 'purple' },
  { id: 'email-campaigns', title: 'Email Campaigns', description: 'Marketing email performance', category: 'communication', icon: 'Mail', color: 'blue' }
];

export const CustomCardList = () => {
  const { toast } = useToast();
  const [cards, setCards] = useState<DashboardCard[]>([
    {
      id: '1',
      title: 'Revenue Chart',
      description: 'Monthly revenue trends and forecasts',
      category: 'financial',
      enabled: true,
      size: 'large',
      order: 0,
      icon: 'TrendingUp',
      color: 'blue'
    },
    {
      id: '2',
      title: 'Active Jobs',
      description: 'Currently active and scheduled jobs',
      category: 'operational',
      enabled: true,
      size: 'medium',
      order: 1,
      icon: 'Wrench',
      color: 'green'
    }
  ]);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingCard, setEditingCard] = useState<DashboardCard | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [newCard, setNewCard] = useState<Partial<DashboardCard>>({
    title: '',
    description: '',
    category: 'business',
    enabled: true,
    size: 'medium',
    icon: 'BarChart3',
    color: 'blue'
  });

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'business', label: 'Business' },
    { value: 'financial', label: 'Financial' },
    { value: 'operational', label: 'Operational' },
    { value: 'analytics', label: 'Analytics' },
    { value: 'communication', label: 'Communication' }
  ];

  const colorOptions = [
    { value: 'blue', label: 'Blue', class: 'bg-blue-500' },
    { value: 'green', label: 'Green', class: 'bg-green-500' },
    { value: 'purple', label: 'Purple', class: 'bg-purple-500' },
    { value: 'orange', label: 'Orange', class: 'bg-orange-500' },
    { value: 'red', label: 'Red', class: 'bg-red-500' },
    { value: 'pink', label: 'Pink', class: 'bg-pink-500' }
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

    const card: DashboardCard = {
      id: Date.now().toString(),
      title: newCard.title,
      description: newCard.description || '',
      category: newCard.category as DashboardCard['category'],
      enabled: newCard.enabled ?? true,
      size: newCard.size as DashboardCard['size'],
      order: cards.length,
      icon: newCard.icon || 'BarChart3',
      color: newCard.color || 'blue',
      customContent: newCard.customContent
    };

    setCards([...cards, card]);
    setNewCard({
      title: '',
      description: '',
      category: 'business',
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

  const handleEditCard = (card: DashboardCard) => {
    setEditingCard(card);
    setNewCard(card);
    setShowAddDialog(true);
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

  const addPrebuiltCard = (cardTemplate: any) => {
    const card: DashboardCard = {
      id: Date.now().toString(),
      ...cardTemplate,
      enabled: true,
      size: 'medium' as const,
      order: cards.length
    };

    setCards([...cards, card]);
    toast({
      title: "Card Added",
      description: `${card.title} has been added to your dashboard`
    });
  };

  const filteredCards = cards.filter(card => 
    selectedCategory === 'all' || card.category === selectedCategory
  );

  const filteredAvailableCards = availableCards.filter(card =>
    selectedCategory === 'all' || card.category === selectedCategory
  );

  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, any> = {
      BarChart3, Calendar, Users, DollarSign, Clock, FileText, Settings,
      MapPin, Wrench, TrendingUp, Activity, CreditCard, Package,
      AlertTriangle, CheckCircle, Target, Star, MessageSquare, Camera,
      PieChart, Building, Phone, Mail
    };
    return iconMap[iconName] || BarChart3;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Dashboard Cards</h2>
          <p className="text-muted-foreground">Manage and configure your dashboard cards</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => setShowAddDialog(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Custom Card
          </Button>
        </div>
      </div>

      {/* Available Pre-built Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Available Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAvailableCards.map((cardTemplate) => {
            const IconComponent = getIconComponent(cardTemplate.icon);
            const colorClass = colorOptions.find(c => c.value === cardTemplate.color)?.class || 'bg-blue-500';
            
            return (
              <Card key={cardTemplate.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${colorClass} text-white`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div>
                        <CardTitle className="text-sm">{cardTemplate.title}</CardTitle>
                        <Badge variant="secondary" className="text-xs">
                          {cardTemplate.category}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => addPrebuiltCard(cardTemplate)}
                      className="h-8"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs text-muted-foreground">{cardTemplate.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Current Dashboard Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Current Dashboard Cards</h3>
        <div className="grid gap-4">
          {filteredCards.map((card) => {
            const IconComponent = getIconComponent(card.icon);
            const colorClass = colorOptions.find(c => c.value === card.color)?.class || 'bg-blue-500';
            
            return (
              <Card key={card.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${colorClass} text-white`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{card.title}</h3>
                        <p className="text-sm text-muted-foreground">{card.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary">{card.category}</Badge>
                          <Badge variant="outline">{card.size}</Badge>
                          {card.enabled ? (
                            <Badge className="bg-green-100 text-green-800">Active</Badge>
                          ) : (
                            <Badge variant="secondary">Disabled</Badge>
                          )}
                        </div>
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
      </div>

      {/* Add/Edit Card Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingCard ? 'Edit Card' : 'Add Custom Card'}
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
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={newCard.category}
                onValueChange={(value: DashboardCard['category']) => setNewCard({ ...newCard, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                  <SelectItem value="operational">Operational</SelectItem>
                  <SelectItem value="analytics">Analytics</SelectItem>
                  <SelectItem value="communication">Communication</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Size</Label>
              <Select
                value={newCard.size}
                onValueChange={(value: DashboardCard['size']) => setNewCard({ ...newCard, size: value })}
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
                category: 'business',
                enabled: true,
                size: 'medium',
                icon: 'BarChart3',
                color: 'blue'
              });
            }}>
              Cancel
            </Button>
            <Button onClick={handleAddCard}>
              {editingCard ? 'Update Card' : 'Add Card'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
