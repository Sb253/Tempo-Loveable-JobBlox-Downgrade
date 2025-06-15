import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Camera, Eye, Calendar, ArrowLeftRight, Download, Share2 } from "lucide-react";
import { PhotoUpload } from "./PhotoUpload";

interface PhotoEntry {
  id: string;
  jobId: string;
  jobName: string;
  type: 'before' | 'during' | 'after' | 'progress' | 'safety' | 'quality' | 'issue';
  imageUrl: string;
  description: string;
  timestamp: string;
  location: string;
  tags: string[];
}

interface UploadedPhoto {
  id: string;
  file: File;
  url: string;
  caption: string;
  category: string;
}

export const PhotoDocumentation = () => {
  const { toast } = useToast();
  const [photos, setPhotos] = useState<PhotoEntry[]>([
    {
      id: '1',
      jobId: 'job-1',
      jobName: 'Kitchen Renovation - Smith Residence',
      type: 'before',
      imageUrl: '/placeholder.svg',
      description: 'Original kitchen layout before renovation',
      timestamp: '2024-12-01 09:00',
      location: '123 Main St',
      tags: ['kitchen', 'before', 'layout']
    },
    {
      id: '2',
      jobId: 'job-1',
      jobName: 'Kitchen Renovation - Smith Residence',
      type: 'during',
      imageUrl: '/placeholder.svg',
      description: 'Demolition in progress',
      timestamp: '2024-12-05 14:30',
      location: '123 Main St',
      tags: ['kitchen', 'demolition', 'progress']
    },
    {
      id: '3',
      jobId: 'job-1',
      jobName: 'Kitchen Renovation - Smith Residence',
      type: 'after',
      imageUrl: '/placeholder.svg',
      description: 'Completed kitchen renovation',
      timestamp: '2024-12-15 16:00',
      location: '123 Main St',
      tags: ['kitchen', 'completed', 'final']
    }
  ]);

  const [selectedJob, setSelectedJob] = useState('job-1');
  const [comparisonMode, setComparisonMode] = useState(false);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'before': return 'bg-red-100 text-red-800';
      case 'during': 
      case 'progress': return 'bg-blue-100 text-blue-800';
      case 'after': return 'bg-green-100 text-green-800';
      case 'safety': return 'bg-orange-100 text-orange-800';
      case 'quality': return 'bg-purple-100 text-purple-800';
      case 'issue': return 'bg-coral-100 text-coral-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handlePhotoUpload = (uploadedPhoto: UploadedPhoto) => {
    const newPhoto: PhotoEntry = {
      id: uploadedPhoto.id,
      jobId: selectedJob,
      jobName: 'Kitchen Renovation - Smith Residence',
      type: uploadedPhoto.category as PhotoEntry['type'],
      imageUrl: uploadedPhoto.url,
      description: uploadedPhoto.caption,
      timestamp: new Date().toLocaleString('sv-SE', { timeZoneName: 'short' }).slice(0, 16),
      location: '123 Main St',
      tags: [uploadedPhoto.category, 'uploaded']
    };

    setPhotos(prev => [newPhoto, ...prev]);

    toast({
      title: "Photo Added",
      description: "Photo has been added to the project documentation.",
    });
  };

  const handleGenerateReport = () => {
    toast({
      title: "Report Generated",
      description: "Before/After comparison report has been created.",
    });
  };

  const jobPhotos = photos.filter(photo => photo.jobId === selectedJob);
  const beforePhotos = jobPhotos.filter(photo => photo.type === 'before');
  const afterPhotos = jobPhotos.filter(photo => photo.type === 'after');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Photo Documentation</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setComparisonMode(!comparisonMode)}>
            <ArrowLeftRight className="h-4 w-4 mr-2" />
            {comparisonMode ? 'Gallery View' : 'Compare View'}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="gallery" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="comparison">Before/After</TabsTrigger>
          <TabsTrigger value="upload">Upload</TabsTrigger>
        </TabsList>

        <TabsContent value="gallery" className="space-y-4">
          {/* Photo Categories */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-red-100 text-red-800">Before</Badge>
            <Badge variant="outline" className="bg-blue-100 text-blue-800">Progress</Badge>
            <Badge variant="outline" className="bg-green-100 text-green-800">After</Badge>
            <Badge variant="outline" className="bg-orange-100 text-orange-800">Safety</Badge>
            <Badge variant="outline" className="bg-purple-100 text-purple-800">Quality</Badge>
            <Badge variant="outline" className="bg-coral-100 text-coral-800">Issue</Badge>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map((photo) => (
              <Card key={photo.id}>
                <CardContent className="p-3">
                  <img 
                    src={photo.imageUrl} 
                    alt={photo.description}
                    className="w-full h-48 object-cover rounded mb-3"
                  />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <Badge className={getTypeColor(photo.type)}>
                        {photo.type}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <h3 className="font-medium text-sm">{photo.description}</h3>
                    <p className="text-xs text-muted-foreground">{photo.jobName}</p>
                    
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {photo.timestamp}
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {photo.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Before/After Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Before Photos */}
                <div>
                  <h3 className="font-semibold mb-3 text-red-700">Before</h3>
                  <div className="space-y-3">
                    {beforePhotos.map((photo) => (
                      <div key={photo.id} className="border rounded-lg overflow-hidden">
                        <img 
                          src={photo.imageUrl} 
                          alt={photo.description}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-3">
                          <p className="text-sm font-medium">{photo.description}</p>
                          <p className="text-xs text-muted-foreground">{photo.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* After Photos */}
                <div>
                  <h3 className="font-semibold mb-3 text-green-700">After</h3>
                  <div className="space-y-3">
                    {afterPhotos.map((photo) => (
                      <div key={photo.id} className="border rounded-lg overflow-hidden">
                        <img 
                          src={photo.imageUrl} 
                          alt={photo.description}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-3">
                          <p className="text-sm font-medium">{photo.description}</p>
                          <p className="text-xs text-muted-foreground">{photo.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <Button onClick={handleGenerateReport}>
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Comparison
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload New Photos</CardTitle>
            </CardHeader>
            <CardContent>
              <PhotoUpload 
                onUpload={handlePhotoUpload}
                maxFiles={10}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
