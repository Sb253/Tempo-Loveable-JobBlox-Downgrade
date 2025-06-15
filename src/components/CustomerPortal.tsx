
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, DollarSign, FileText, MessageSquare, Camera } from "lucide-react";

export const CustomerPortal = () => {
  const [selectedProject, setSelectedProject] = useState('project-1');

  const customerProjects = [
    {
      id: 'project-1',
      name: 'Kitchen Renovation',
      status: 'in-progress',
      progress: 65,
      startDate: '2024-12-01',
      estimatedCompletion: '2024-12-28',
      totalCost: '$15,000',
      updates: [
        { date: '2024-12-15', message: 'Cabinets installed successfully', type: 'progress' },
        { date: '2024-12-12', message: 'Electrical work completed', type: 'milestone' },
        { date: '2024-12-10', message: 'Demolition phase finished', type: 'milestone' }
      ],
      photos: [
        { id: '1', url: '/placeholder.svg', caption: 'Kitchen before renovation', date: '2024-12-01' },
        { id: '2', url: '/placeholder.svg', caption: 'Demolition in progress', date: '2024-12-05' },
        { id: '3', url: '/placeholder.svg', caption: 'New cabinets installed', date: '2024-12-15' }
      ]
    }
  ];

  const currentProject = customerProjects.find(p => p.id === selectedProject);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Customer Portal</h2>
        <Button variant="outline">
          <MessageSquare className="h-4 w-4 mr-2" />
          Contact Team
        </Button>
      </div>

      {currentProject && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Project Overview */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {currentProject.name}
                <Badge variant={currentProject.status === 'in-progress' ? 'default' : 'secondary'}>
                  {currentProject.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{currentProject.progress}%</span>
                </div>
                <Progress value={currentProject.progress} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Start Date</p>
                    <p className="font-medium">{new Date(currentProject.startDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Est. Completion</p>
                    <p className="font-medium">{new Date(currentProject.estimatedCompletion).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Investment</p>
                  <p className="font-semibold text-lg">{currentProject.totalCost}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                View Contract
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Camera className="h-4 w-4 mr-2" />
                Upload Photos
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Project Details */}
      <Tabs defaultValue="updates" className="w-full">
        <TabsList>
          <TabsTrigger value="updates">Updates</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="updates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentProject?.updates.map((update, index) => (
                  <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-b-0">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      update.type === 'milestone' ? 'bg-green-500' : 'bg-blue-500'
                    }`} />
                    <div>
                      <p className="font-medium">{update.message}</p>
                      <p className="text-sm text-muted-foreground">{new Date(update.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="photos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Photos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentProject?.photos.map((photo) => (
                  <div key={photo.id} className="space-y-2">
                    <img 
                      src={photo.url} 
                      alt={photo.caption}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <div>
                      <p className="font-medium text-sm">{photo.caption}</p>
                      <p className="text-xs text-muted-foreground">{new Date(photo.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Project Contract</span>
                  </div>
                  <Button variant="outline" size="sm">Download</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Building Permits</span>
                  </div>
                  <Button variant="outline" size="sm">Download</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Material Specifications</span>
                  </div>
                  <Button variant="outline" size="sm">Download</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
