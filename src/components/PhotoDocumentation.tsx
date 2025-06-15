
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Camera, Eye, Calendar, ArrowLeftRight, Download, Share2, Search, Filter, Grid, List } from "lucide-react";
import { PhotoUpload } from "./PhotoUpload";
import { CameraCapture } from "./CameraCapture";

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
      type: 'progress',
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
    },
    {
      id: '4',
      jobId: 'job-1',
      jobName: 'Kitchen Renovation - Smith Residence',
      type: 'safety',
      imageUrl: '/placeholder.svg',
      description: 'Safety equipment properly stored',
      timestamp: '2024-12-10 11:00',
      location: '123 Main St',
      tags: ['safety', 'equipment', 'storage']
    },
    {
      id: '5',
      jobId: 'job-1',
      jobName: 'Kitchen Renovation - Smith Residence',
      type: 'quality',
      imageUrl: '/placeholder.svg',
      description: 'Quality check on cabinet installation',
      timestamp: '2024-12-12 15:30',
      location: '123 Main St',
      tags: ['quality', 'cabinets', 'installation']
    }
  ]);

  const [selectedJob, setSelectedJob] = useState('job-1');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'before': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'during': 
      case 'progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'after': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'safety': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'quality': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'issue': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
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

  const handleCameraCapture = (capturedPhoto: any) => {
    const newPhoto: PhotoEntry = {
      id: capturedPhoto.id,
      jobId: selectedJob,
      jobName: 'Kitchen Renovation - Smith Residence',
      type: capturedPhoto.category as PhotoEntry['type'],
      imageUrl: capturedPhoto.url,
      description: capturedPhoto.caption,
      timestamp: new Date().toLocaleString('sv-SE', { timeZoneName: 'short' }).slice(0, 16),
      location: capturedPhoto.location || '123 Main St',
      tags: [capturedPhoto.category, 'camera']
    };

    setPhotos(prev => [newPhoto, ...prev]);

    toast({
      title: "Photo Captured",
      description: "Photo has been captured and saved to documentation.",
    });
  };

  const handleGenerateReport = () => {
    toast({
      title: "Report Generated",
      description: "Before/After comparison report has been created.",
    });
  };

  const filteredPhotos = photos.filter(photo => {
    const matchesJob = photo.jobId === selectedJob;
    const matchesFilter = filterType === 'all' || photo.type === filterType;
    const matchesSearch = photo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photo.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesJob && matchesFilter && matchesSearch;
  });

  const jobPhotos = photos.filter(photo => photo.jobId === selectedJob);
  const beforePhotos = jobPhotos.filter(photo => photo.type === 'before');
  const afterPhotos = jobPhotos.filter(photo => photo.type === 'after');
  const progressPhotos = jobPhotos.filter(photo => photo.type === 'progress');

  const photoStats = {
    total: filteredPhotos.length,
    before: beforePhotos.length,
    progress: progressPhotos.length,
    after: afterPhotos.length,
    today: filteredPhotos.filter(p => p.timestamp.includes(new Date().toISOString().split('T')[0])).length
  };

  const categories = ['all', 'before', 'progress', 'after', 'safety', 'quality', 'issue'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Photo Documentation</h1>
          <p className="text-muted-foreground">Capture, organize, and manage job site photos</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
            {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
          </Button>
          <Button variant="outline" onClick={handleGenerateReport}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Photos</CardTitle>
            <Camera className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{photoStats.total}</div>
            <p className="text-xs text-muted-foreground">In current project</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Before</CardTitle>
            <div className="w-3 h-3 rounded-full bg-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{photoStats.before}</div>
            <p className="text-xs text-muted-foreground">Starting conditions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <div className="w-3 h-3 rounded-full bg-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{photoStats.progress}</div>
            <p className="text-xs text-muted-foreground">Work in progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{photoStats.after}</div>
            <p className="text-xs text-muted-foreground">Final results</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{photoStats.today}</div>
            <p className="text-xs text-muted-foreground">Photos captured</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="gallery" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="comparison">Before/After</TabsTrigger>
          <TabsTrigger value="capture">Camera</TabsTrigger>
          <TabsTrigger value="upload">Upload</TabsTrigger>
        </TabsList>

        <TabsContent value="gallery" className="space-y-4">
          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={filterType === category ? "default" : "outline"}
                  className={`cursor-pointer capitalize ${
                    filterType === category ? '' : 'hover:bg-accent'
                  }`}
                  onClick={() => setFilterType(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
            
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search photos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          {/* Photo Grid/List */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredPhotos.map((photo) => (
                <Card key={photo.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src={photo.imageUrl} 
                      alt={photo.description}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className={getTypeColor(photo.type)}>
                        {photo.type}
                      </Badge>
                    </div>
                    <div className="absolute bottom-2 right-2">
                      <Button variant="secondary" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <CardContent className="p-3">
                    <h3 className="font-medium text-sm mb-1 line-clamp-2">{photo.description}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{photo.jobName}</p>
                    
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <Calendar className="h-3 w-3" />
                      {photo.timestamp}
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {photo.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {photo.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{photo.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredPhotos.map((photo) => (
                <Card key={photo.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <img 
                        src={photo.imageUrl} 
                        alt={photo.description}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">{photo.description}</h3>
                            <p className="text-sm text-muted-foreground">{photo.jobName}</p>
                            <p className="text-xs text-muted-foreground">{photo.timestamp}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getTypeColor(photo.type)}>
                              {photo.type}
                            </Badge>
                            <Button variant="outline" size="sm">
                              <Eye className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredPhotos.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">No photos found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or add some photos to get started.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowLeftRight className="h-5 w-5" />
                Before/After Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Before Photos */}
                <div>
                  <h3 className="font-semibold mb-3 text-red-700 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    Before ({beforePhotos.length})
                  </h3>
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
                    {beforePhotos.length === 0 && (
                      <div className="text-center p-8 border-2 border-dashed rounded-lg">
                        <Camera className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">No before photos yet</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* After Photos */}
                <div>
                  <h3 className="font-semibold mb-3 text-green-700 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    After ({afterPhotos.length})
                  </h3>
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
                    {afterPhotos.length === 0 && (
                      <div className="text-center p-8 border-2 border-dashed rounded-lg">
                        <Camera className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">No after photos yet</p>
                      </div>
                    )}
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

        <TabsContent value="capture" className="space-y-4">
          <CameraCapture 
            onPhotoCapture={handleCameraCapture}
            categories={['before', 'progress', 'after', 'safety', 'quality', 'issue']}
          />
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload Photos</CardTitle>
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
