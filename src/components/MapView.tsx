import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Edit, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "./ThemeProvider";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Job {
  id: string;
  title: string;
  customer: string;
  address: string;
  coordinates: [number, number];
  status: 'scheduled' | 'in-progress' | 'completed';
  type: 'job' | 'appointment';
  time: string;
  assignedTo?: string;
  employeeColor?: string;
}

interface Employee {
  id: string;
  name: string;
  coordinates: [number, number];
  color: string;
  status: 'active' | 'break' | 'inactive';
}

interface MapViewProps {
  jobs?: Job[];
  employees?: Employee[];
  showEmployeeLocations?: boolean;
  isCompact?: boolean;
  editable?: boolean;
  onJobsChange?: (jobs: Job[]) => void;
}

export const MapView: React.FC<MapViewProps> = ({ 
  jobs = [], 
  employees = [], 
  showEmployeeLocations = false,
  isCompact = false,
  editable = false,
  onJobsChange
}) => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [mapboxToken] = useState('pk.eyJ1Ijoic2NvdHRiOTcxIiwiYSI6ImNtYng0M2d2cTB2dXkybW9zOTJmdzg1MWQifQ.3rpXH4NfcWycCt58VAyGzg');
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [newJob, setNewJob] = useState({
    title: '',
    customer: '',
    address: '',
    status: 'scheduled' as const,
    type: 'job' as const,
    time: ''
  });

  const getMarkerColor = (status: string, type: string) => {
    if (type === 'appointment') {
      switch (status) {
        case 'scheduled':
          return '#8B5CF6';
        case 'in-progress':
          return '#EC4899';
        case 'completed':
          return '#059669';
        default:
          return '#6b7280';
      }
    } else {
      switch (status) {
        case 'scheduled':
          return theme === 'dark' ? '#60a5fa' : '#3b82f6';
        case 'in-progress':
          return theme === 'dark' ? '#fb923c' : '#f97316';
        case 'completed':
          return theme === 'dark' ? '#34d399' : '#10b981';
        default:
          return theme === 'dark' ? '#9ca3af' : '#6b7280';
      }
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([longitude, latitude]);
          if (map.current) {
            map.current.flyTo({
              center: [longitude, latitude],
              zoom: isCompact ? 10 : 12,
              essential: true
            });
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          setUserLocation([-74.006, 40.7128]);
        }
      );
    } else {
      setUserLocation([-74.006, 40.7128]);
    }
  };

  const initializeMap = () => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = mapboxToken;

    const center: [number, number] = userLocation || 
      (jobs.length > 0 ? [jobs[0].coordinates[0], jobs[0].coordinates[1]] : [-74.006, 40.7128]);

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: theme === 'dark' ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/light-v11',
      center: center,
      zoom: isCompact ? 9 : (userLocation ? 12 : 10)
    });

    if (!isCompact) {
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    }

    // Add user location marker if available
    if (userLocation) {
      const userMarker = document.createElement('div');
      userMarker.style.width = '16px';
      userMarker.style.height = '16px';
      userMarker.style.borderRadius = '50%';
      userMarker.style.backgroundColor = theme === 'dark' ? '#ef4444' : '#dc2626';
      userMarker.style.border = `2px solid ${theme === 'dark' ? '#1f2937' : 'white'}`;
      userMarker.style.boxShadow = theme === 'dark' ? '0 2px 4px rgba(0,0,0,0.5)' : '0 2px 4px rgba(0,0,0,0.3)';

      new mapboxgl.Marker(userMarker)
        .setLngLat(userLocation)
        .addTo(map.current);
    }

    // Add markers for jobs
    jobs.forEach((job) => {
      if (!map.current) return;

      const markerEl = document.createElement('div');
      markerEl.style.width = isCompact ? '16px' : '20px';
      markerEl.style.height = isCompact ? '16px' : '20px';
      markerEl.style.borderRadius = job.type === 'appointment' ? '4px' : '50%';
      
      const markerColor = job.employeeColor || getMarkerColor(job.status, job.type);
      markerEl.style.backgroundColor = markerColor;
      markerEl.style.border = `2px solid ${theme === 'dark' ? '#1f2937' : 'white'}`;
      markerEl.style.boxShadow = theme === 'dark' ? '0 2px 4px rgba(0,0,0,0.5)' : '0 2px 4px rgba(0,0,0,0.3)';
      markerEl.style.cursor = 'pointer';

      if (!isCompact) {
        const popupContent = `
          <div style="padding: 8px; max-width: 200px; color: ${theme === 'dark' ? '#f3f4f6' : '#1f2937'};">
            <h3 style="font-weight: bold; margin: 0 0 4px 0; font-size: 14px;">${job.title}</h3>
            <p style="margin: 2px 0; color: ${theme === 'dark' ? '#d1d5db' : '#666'}; font-size: 12px;">${job.customer}</p>
            <p style="margin: 2px 0; font-size: 12px;">${job.address}</p>
          </div>
        `;

        const popup = new mapboxgl.Popup({ offset: 15 }).setHTML(popupContent);
        new mapboxgl.Marker(markerEl)
          .setLngLat([job.coordinates[0], job.coordinates[1]])
          .setPopup(popup)
          .addTo(map.current);
      } else {
        new mapboxgl.Marker(markerEl)
          .setLngLat([job.coordinates[0], job.coordinates[1]])
          .addTo(map.current);
      }
    });
  };

  const handleAddJob = async () => {
    if (!newJob.title || !newJob.customer || !newJob.address) return;

    // Mock geocoding - in real app, use Mapbox Geocoding API
    const mockCoordinates: [number, number] = [
      -74.006 + (Math.random() - 0.5) * 0.1,
      40.7128 + (Math.random() - 0.5) * 0.1
    ];

    const job: Job = {
      id: Date.now().toString(),
      ...newJob,
      coordinates: mockCoordinates,
      time: newJob.time || new Date().toISOString()
    };

    if (onJobsChange) {
      onJobsChange([...jobs, job]);
    }

    setNewJob({
      title: '',
      customer: '',
      address: '',
      status: 'scheduled',
      type: 'job',
      time: ''
    });
    setShowEditDialog(false);
    
    toast({
      title: "Job Added",
      description: "New job has been added to the map.",
    });
  };

  const handleRemoveJob = (jobId: string) => {
    if (onJobsChange) {
      onJobsChange(jobs.filter(job => job.id !== jobId));
    }
    
    toast({
      title: "Job Removed",
      description: "Job has been removed from the map.",
    });
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (userLocation) {
      initializeMap();
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [jobs, userLocation, mapboxToken, theme, isCompact]);

  const jobStats = jobs.reduce((acc, job) => {
    if (job.type === 'job') {
      acc.jobs[job.status] = (acc.jobs[job.status] || 0) + 1;
    } else {
      acc.appointments[job.status] = (acc.appointments[job.status] || 0) + 1;
    }
    return acc;
  }, { jobs: {} as Record<string, number>, appointments: {} as Record<string, number> });

  return (
    <div className="w-full">
      <Card className="w-full">
        <CardHeader className={isCompact ? "pb-2" : "pb-4"}>
          <div className="flex items-center justify-between">
            <CardTitle className={`flex items-center gap-2 ${isCompact ? 'text-base' : 'text-lg'}`}>
              <MapPin className="h-4 w-4" />
              {isCompact ? 'Locations' : 'Live Locations Map'}
            </CardTitle>
            <div className="flex gap-2">
              {editable && (
                <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Job/Location</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            value={newJob.title}
                            onChange={(e) => setNewJob(prev => ({ ...prev, title: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="customer">Customer</Label>
                          <Input
                            id="customer"
                            value={newJob.customer}
                            onChange={(e) => setNewJob(prev => ({ ...prev, customer: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          value={newJob.address}
                          onChange={(e) => setNewJob(prev => ({ ...prev, address: e.target.value }))}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="type">Type</Label>
                          <Select value={newJob.type} onValueChange={(value) => setNewJob(prev => ({ ...prev, type: value as 'job' | 'appointment' }))}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="job">Job</SelectItem>
                              <SelectItem value="appointment">Appointment</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="status">Status</Label>
                          <Select value={newJob.status} onValueChange={(value) => setNewJob(prev => ({ ...prev, status: value as 'scheduled' | 'in-progress' | 'completed' }))}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="scheduled">Scheduled</SelectItem>
                              <SelectItem value="in-progress">In Progress</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <Button onClick={handleAddJob} className="w-full">
                        Add Job
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
              {!isCompact && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={getCurrentLocation}
                  className="flex items-center gap-2"
                >
                  <Navigation className="h-4 w-4" />
                  My Location
                </Button>
              )}
            </div>
          </div>
          
          {!isCompact && (
            <div className="flex flex-wrap gap-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>Jobs</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)' }}></div>
                <span>Appointments</span>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-xs">Scheduled</Badge>
                <Badge variant="outline" className="text-xs">In Progress</Badge>
                <Badge variant="outline" className="text-xs">Completed</Badge>
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent className={isCompact ? "p-3" : "p-4"}>
          <div className={`w-full ${isCompact ? 'h-48' : 'h-80'} rounded-lg border overflow-hidden mb-4`}>
            <div ref={mapContainer} className="w-full h-full" />
          </div>
          
          {editable && jobs.length > 0 && (
            <div className="space-y-2 mb-4">
              <h4 className="font-medium text-sm">Current Jobs & Locations</h4>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {jobs.map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{job.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{job.customer} • {job.address}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveJob(job.id)}
                      className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {!isCompact && (
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">Jobs</h4>
                <div className="space-y-1">
                  {Object.entries(jobStats.jobs).map(([status, count]) => (
                    <div key={status} className="flex justify-between">
                      <span className="capitalize">{status.replace('-', ' ')}:</span>
                      <span className="font-medium">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Appointments</h4>
                <div className="space-y-1">
                  {Object.entries(jobStats.appointments).map(([status, count]) => (
                    <div key={status} className="flex justify-between">
                      <span className="capitalize">{status.replace('-', ' ')}:</span>
                      <span className="font-medium">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
