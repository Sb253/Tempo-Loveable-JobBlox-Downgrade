import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Camera, Upload, MapPin, Clock, CheckSquare, AlertTriangle, FileText, Share2, Download } from "lucide-react";
import { PhotoUpload } from "./PhotoUpload";

interface UploadedPhoto {
  id: string;
  file: File;
  url: string;
  caption: string;
  category: string;
}

export const MobileJobDocumentation = () => {
  const { toast } = useToast();
  const [activeJob, setActiveJob] = useState('job-1');
  const [photos, setPhotos] = useState([
    {
      id: '1',
      url: '/placeholder.svg',
      caption: 'Site preparation completed',
      timestamp: '2024-12-15 09:30',
      location: '123 Main St',
      jobId: 'job-1',
      category: 'progress'
    },
    {
      id: '2',
      url: '/placeholder.svg',
      caption: 'Foundation work in progress',
      timestamp: '2024-12-15 14:15',
      location: '123 Main St',
      jobId: 'job-1',
      category: 'progress'
    },
    {
      id: '3',
      url: '/placeholder.svg',
      caption: 'Safety equipment check',
      timestamp: '2024-12-15 08:00',
      location: '123 Main St',
      jobId: 'job-1',
      category: 'safety'
    }
  ]);

  const [reports, setReports] = useState([
    {
      id: '1',
      title: 'Daily Progress Report',
      date: '2024-12-15',
      jobId: 'job-1',
      status: 'completed',
      summary: 'Foundation work progressing well. All safety protocols followed.',
      workCompleted: 'Site preparation, foundation excavation',
      nextSteps: 'Pour concrete foundation',
      issues: 'Minor delay due to weather',
      hoursWorked: 8,
      teamMembers: ['John Doe', 'Jane Smith', 'Mike Wilson']
    }
  ]);

  const jobs = [
    {
      id: 'job-1',
      name: 'Kitchen Renovation - Smith Residence',
      address: '123 Main St, Anytown',
      status: 'in-progress',
      startDate: '2024-12-01'
    }
  ];

  const currentJob = jobs.find(job => job.id === activeJob);

  const handlePhotoUpload = (uploadedPhoto: UploadedPhoto) => {
    const newPhoto = {
      id: uploadedPhoto.id,
      url: uploadedPhoto.url,
      caption: uploadedPhoto.caption,
      timestamp: new Date().toLocaleString('sv-SE', { timeZoneName: 'short' }).slice(0, 16),
      location: currentJob?.address || '123 Main St',
      jobId: activeJob,
      category: uploadedPhoto.category
    };

    setPhotos(prev => [newPhoto, ...prev]);

    toast({
      title: "Photo Uploaded",
      description: "Job site photo has been saved successfully.",
    });
  };

  const handleReportSubmit = () => {
    toast({
      title: "Report Submitted",
      description: "Daily progress report has been submitted.",
    });
  };

  const categories = [
    { id: 'progress', label: 'Progress', color: 'bg-blue-100 text-blue-800' },
    { id: 'safety', label: 'Safety', color: 'bg-red-100 text-red-800' },
    { id: 'quality', label: 'Quality', color: 'bg-green-100 text-green-800' },
    { id: 'issue', label: 'Issue', color: 'bg-orange-100 text-orange-800' },
    { id: 'completed', label: 'Completed', color: 'bg-purple-100 text-purple-800' },
    { id: 'before', label: 'Before', color: 'bg-red-100 text-red-800' },
    { id: 'after', label: 'After', color: 'bg-green-100 text-green-800' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Mobile Job Documentation</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Job Selection */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-blue-600" />
            <div className="flex-1">
              <h3 className="font-semibold">{currentJob?.name}</h3>
              <p className="text-sm text-muted-foreground">{currentJob?.address}</p>
            </div>
            <Badge variant="outline">{currentJob?.status}</Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="photos" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="checklist">Checklist</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="photos" className="space-y-4">
          {/* Photo Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Photos</CardTitle>
            </CardHeader>
            <CardContent>
              <PhotoUpload 
                onUpload={handlePhotoUpload}
                maxFiles={5}
              />
            </CardContent>
          </Card>

          {/* Photo Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge key={category.id} variant="outline" className={category.color}>
                {category.label}
              </Badge>
            ))}
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map((photo) => (
              <Card key={photo.id}>
                <CardContent className="p-3">
                  <img 
                    src={photo.url} 
                    alt={photo.caption}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                  <div className="space-y-2">
                    <p className="font-medium text-sm">{photo.caption}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {photo.timestamp}
                    </div>
                    <Badge 
                      variant="outline" 
                      className={categories.find(c => c.id === photo.category)?.color}
                    >
                      {photo.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          {/* Quick Report Form */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Progress Report</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="work-completed">Work Completed Today</Label>
                <Textarea 
                  id="work-completed"
                  placeholder="Describe the work completed today..."
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hours-worked">Hours Worked</Label>
                  <Input id="hours-worked" type="number" placeholder="8" />
                </div>
                <div>
                  <Label htmlFor="team-size">Team Size</Label>
                  <Input id="team-size" type="number" placeholder="3" />
                </div>
              </div>

              <div>
                <Label htmlFor="next-steps">Next Steps</Label>
                <Textarea 
                  id="next-steps"
                  placeholder="What needs to be done next..."
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="issues">Issues or Concerns</Label>
                <Textarea 
                  id="issues"
                  placeholder="Any issues encountered..."
                  rows={2}
                />
              </div>

              <Button onClick={handleReportSubmit} className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Submit Report
              </Button>
            </CardContent>
          </Card>

          {/* Previous Reports */}
          <div className="space-y-3">
            {reports.map((report) => (
              <Card key={report.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold">{report.title}</h3>
                    <Badge variant="outline">{report.status}</Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <p><strong>Date:</strong> {report.date}</p>
                    <p><strong>Hours:</strong> {report.hoursWorked}</p>
                    <p><strong>Team:</strong> {report.teamMembers.join(', ')}</p>
                    <p><strong>Summary:</strong> {report.summary}</p>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm">View Full</Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-3 w-3 mr-1" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="checklist" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Safety Checklist</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                'Safety equipment inspected',
                'Work area secured',
                'Tools and equipment checked',
                'Weather conditions assessed',
                'Team briefing completed',
                'Emergency contacts available'
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-2 border rounded">
                  <CheckSquare className="h-4 w-4 text-green-600" />
                  <span className="flex-1">{item}</span>
                  <Button variant="outline" size="sm">Complete</Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quality Control Checklist</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                'Materials meet specifications',
                'Work follows approved plans',
                'Measurements verified',
                'Quality standards maintained'
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-2 border rounded">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <span className="flex-1">{item}</span>
                  <Button variant="outline" size="sm">Check</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea 
                placeholder="Add a quick note about the job..."
                rows={4}
              />
              <Button className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Save Note
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-medium">Client requested change to cabinet color</p>
                  <span className="text-xs text-muted-foreground">2h ago</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Customer wants to switch from white to gray cabinets. Need to check availability and price difference.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-medium">Weather delay expected</p>
                  <span className="text-xs text-muted-foreground">Yesterday</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Rain forecast for tomorrow. May need to reschedule outdoor work.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
