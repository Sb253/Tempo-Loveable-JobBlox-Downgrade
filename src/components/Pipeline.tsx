
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Settings, BarChart3, PieChart, TrendingUp, Calendar } from "lucide-react";
import { DragDropPipeline, PipelineStage, PipelineItem } from "@/components/DragDropPipeline";
import { CustomBarChart, CustomPieChart, CustomLineChart } from "@/components/charts/ChartTypes";

export const Pipeline = () => {
  const [pipelineStages, setPipelineStages] = useState<PipelineStage[]>([
    {
      id: 'lead',
      title: 'Leads',
      color: '#6366f1',
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
      color: '#8b5cf6',
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
      color: '#10b981',
      items: []
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      color: '#f59e0b',
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
      color: '#6b7280',
      items: []
    }
  ]);

  const [selectedItem, setSelectedItem] = useState<PipelineItem | null>(null);

  // Sample data for charts
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Pipeline Management</h1>
        <div className="flex gap-2">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New Job
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Pipeline Settings
          </Button>
        </div>
      </div>

      {/* Pipeline Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{getTotalCount()}</p>
                <p className="text-sm text-muted-foreground">Total Deals</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">${getTotalValue().toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Pipeline Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{pipelineStages[3]?.items.length || 0}</p>
                <p className="text-sm text-muted-foreground">Active Projects</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{pipelineStages[4]?.items.length || 0}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="kanban" className="w-full">
        <TabsList>
          <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
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
            <Card>
              <CardHeader>
                <CardTitle>Deal Details - {selectedItem.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Client</label>
                    <p className="text-sm">{selectedItem.client}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Value</label>
                    <p className="text-sm">${selectedItem.value.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Priority</label>
                    <Badge className={selectedItem.priority === 'high' ? 'bg-red-100 text-red-800' : 
                                   selectedItem.priority === 'medium' ? 'bg-orange-100 text-orange-800' : 
                                   'bg-green-100 text-green-800'}>
                      {selectedItem.priority}
                    </Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Assigned To</label>
                    <p className="text-sm">{selectedItem.assignedTo}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm">Edit Deal</Button>
                  <Button size="sm" variant="outline">Create Job</Button>
                  <Button size="sm" variant="outline" onClick={() => setSelectedItem(null)}>
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CustomBarChart
              data={pipelineValueData}
              title="Pipeline Value by Stage"
              xDataKey="stage"
              yDataKey="value"
              color="#8b5cf6"
            />
            <CustomPieChart
              data={priorityData}
              title="Deals by Priority"
              dataKey="value"
              nameKey="name"
              colors={['#ef4444', '#f97316', '#22c55e']}
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
              color="#06b6d4"
            />
            <CustomLineChart
              data={monthlyTrendData}
              title="Monthly Revenue Trend"
              xDataKey="month"
              yDataKey="value"
              color="#10b981"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
