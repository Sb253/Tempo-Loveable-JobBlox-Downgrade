
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Settings, BarChart3, PieChart, TrendingUp, Calendar, MapPin, Users } from "lucide-react";
import { DragDropPipeline, PipelineStage, PipelineItem } from "@/components/DragDropPipeline";
import { CustomBarChart, CustomPieChart, CustomLineChart } from "@/components/charts/ChartTypes";
import { RadiusOverrideManager } from "@/components/RadiusOverrideManager";
import { EmployeeAvailabilityTracker } from "@/components/EmployeeAvailabilityTracker";
import { useTheme } from "@/components/ThemeProvider";

export const Pipeline = () => {
  const { actualTheme } = useTheme();
  
  const [pipelineStages, setPipelineStages] = useState<PipelineStage[]>([
    {
      id: 'lead',
      title: 'Leads',
      color: actualTheme === 'dark' ? '#60a5fa' : '#3b82f6',
      items: [
        {
          id: '1',
          title: 'Kitchen Renovation',
          client: 'John Smith',
          value: 15000,
          priority: 'high',
          estimatedStart: '2024-01-15',
          assignedTo: 'Mike Johnson'
        }
      ]
    },
    {
      id: 'estimate',
      title: 'Estimates',
      color: actualTheme === 'dark' ? '#a78bfa' : '#8b5cf6',
      items: [
        {
          id: '2',
          title: 'Bathroom Remodel',
          client: 'Sarah Wilson',
          value: 8500,
          priority: 'medium',
          estimatedStart: '2024-01-20',
          assignedTo: 'Dave Brown'
        }
      ]
    },
    {
      id: 'approved',
      title: 'Approved',
      color: actualTheme === 'dark' ? '#34d399' : '#10b981',
      items: []
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      color: actualTheme === 'dark' ? '#fbbf24' : '#f59e0b',
      items: [
        {
          id: '3',
          title: 'Deck Construction',
          client: 'ABC Company',
          value: 12000,
          priority: 'high',
          estimatedStart: '2024-01-10',
          assignedTo: 'Tom Davis'
        }
      ]
    },
    {
      id: 'completed',
      title: 'Completed',
      color: actualTheme === 'dark' ? '#94a3b8' : '#6b7280',
      items: []
    }
  ]);

  const [selectedItem, setSelectedItem] = useState<PipelineItem | null>(null);
  const [showRadiusManager, setShowRadiusManager] = useState(false);

  // Sample data for charts with modern colors
  const pipelineValueData = pipelineStages.map(stage => ({
    stage: stage.title,
    value: stage.items.reduce((sum, item) => sum + item.value, 0),
    count: stage.items.length
  }));

  const priorityData = [
    { name: 'High', value: pipelineStages.flatMap(s => s.items).filter(i => i.priority === 'high').length },
    { name: 'Medium', value: pipelineStages.flatMap(s => s.items).filter(i => i.priority === 'medium').length },
    { name: 'Low', value: pipelineStages.flatMap(s => s.items).filter(i => i.priority === 'low').length }
  ];

  const monthlyTrendData = [
    { month: 'Jan', deals: 12, value: 125000 },
    { month: 'Feb', deals: 15, value: 150000 },
    { month: 'Mar', deals: 18, value: 180000 },
    { month: 'Apr', deals: 22, value: 220000 },
    { month: 'May', deals: 19, value: 195000 },
    { month: 'Jun', deals: 25, value: 250000 }
  ];

  const handleStagesChange = (newStages: PipelineStage[]) => {
    setPipelineStages(newStages);
  };

  const handleItemClick = (item: PipelineItem) => {
    setSelectedItem(item);
  };

  const handleAddItem = (stageId: string) => {
    console.log('Add item to stage:', stageId);
    // Implement add item logic
  };

  const handleEditStage = (stageId: string) => {
    console.log('Edit stage:', stageId);
    // Implement edit stage logic
  };

  const getTotalValue = () => {
    return pipelineStages.flatMap(stage => stage.items)
      .reduce((sum, item) => sum + item.value, 0);
  };

  const getTotalCount = () => {
    return pipelineStages.flatMap(stage => stage.items).length;
  };

  const stats = {
    total: getTotalCount(),
    totalValue: getTotalValue(),
    inProgress: pipelineStages.find(s => s.id === 'in-progress')?.items.length || 0,
    completed: pipelineStages.find(s => s.id === 'completed')?.items.length || 0
  };

  return (
    <div className="space-y-6 min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">Pipeline Management</h1>
        <div className="flex gap-2">
          <Button onClick={() => setShowRadiusManager(true)} variant="outline">
            <MapPin className="h-4 w-4 mr-2" />
            Radius Override
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Job
          </Button>
          <Button variant="outline" className="flex items-center gap-2 border-2 border-primary/20 hover:bg-primary/10">
            <Settings className="h-4 w-4" />
            Pipeline Settings
          </Button>
        </div>
      </div>

      {/* Pipeline Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-2 border-blue-500/20 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white shadow-lg">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">{stats.total}</p>
                <p className="text-sm text-muted-foreground font-medium">Total Deals</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-2 border-green-500/20 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl text-white shadow-lg">
                <BarChart3 className="h-6 w-6" />
              </div>
              <div>
                <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">${stats.totalValue.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground font-medium">Pipeline Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-2 border-orange-500/20 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl text-white shadow-lg">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">{stats.inProgress}</p>
                <p className="text-sm text-muted-foreground font-medium">Active Projects</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-2 border-purple-500/20 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl text-white shadow-lg">
                <PieChart className="h-6 w-6" />
              </div>
              <div>
                <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">{stats.completed}</p>
                <p className="text-sm text-muted-foreground font-medium">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="kanban" className="w-full">
        <TabsList className="bg-gradient-to-r from-muted/50 to-muted border-2 border-primary/20">
          <TabsTrigger value="kanban" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-white">Kanban Board</TabsTrigger>
          <TabsTrigger value="availability" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-white">Employee Availability</TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-white">Analytics</TabsTrigger>
          <TabsTrigger value="trends" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-white">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="kanban" className="space-y-6">
          <DragDropPipeline
            stages={pipelineStages}
            onStagesChange={handleStagesChange}
            onItemClick={handleItemClick}
            onAddItem={handleAddItem}
            onEditStage={handleEditStage}
          />

          {/* Item Details Modal/Panel */}
          {selectedItem && (
            <Card className="bg-gradient-to-br from-card/50 to-card border-2 border-primary/20 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-t-lg">
                <CardTitle className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Deal Details - {selectedItem.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-primary">Client</label>
                    <p className="text-sm">{selectedItem.client}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-primary">Value</label>
                    <p className="text-sm font-bold">${selectedItem.value.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-primary">Priority</label>
                    <Badge className={selectedItem.priority === 'high' ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' : 
                                   selectedItem.priority === 'medium' ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white' : 
                                   'bg-gradient-to-r from-green-500 to-green-600 text-white'}>
                      {selectedItem.priority}
                    </Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-primary">Assigned To</label>
                    <p className="text-sm">{selectedItem.assignedTo}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-gradient-to-r from-primary to-primary/80">Edit Deal</Button>
                  <Button size="sm" variant="outline" className="border-2 border-primary/20">Create Job</Button>
                  <Button size="sm" variant="outline" className="border-2 border-orange-500/20 text-orange-600 hover:bg-orange-50" onClick={() => setShowRadiusManager(true)}>
                    <MapPin className="h-3 w-3 mr-1" />
                    Set Radius Override
                  </Button>
                  <Button size="sm" variant="outline" className="border-2 border-primary/20" onClick={() => setSelectedItem(null)}>
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="availability" className="space-y-6">
          <EmployeeAvailabilityTracker />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CustomBarChart
              data={pipelineValueData}
              title="Pipeline Value by Stage"
              xDataKey="stage"
              yDataKey="value"
              color={actualTheme === 'dark' ? '#a78bfa' : '#8b5cf6'}
            />
            <CustomPieChart
              data={priorityData}
              title="Deals by Priority"
              dataKey="value"
              nameKey="name"
              colors={actualTheme === 'dark' ? ['#f87171', '#fbbf24', '#34d399'] : ['#ef4444', '#f59e0b', '#22c55e']}
            />
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CustomLineChart
              data={monthlyTrendData}
              title="Monthly Deal Count Trend"
              xDataKey="month"
              yDataKey="deals"
              color={actualTheme === 'dark' ? '#22d3ee' : '#06b6d4'}
            />
            <CustomLineChart
              data={monthlyTrendData}
              title="Monthly Revenue Trend"
              xDataKey="month"
              yDataKey="value"
              color={actualTheme === 'dark' ? '#34d399' : '#10b981'}
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* Radius Override Manager Dialog */}
      <Dialog open={showRadiusManager} onOpenChange={setShowRadiusManager}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Employee Radius Override Management
            </DialogTitle>
          </DialogHeader>
          <RadiusOverrideManager />
        </DialogContent>
      </Dialog>
    </div>
  );
};
