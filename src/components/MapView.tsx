import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Plus, Settings, Navigation, Zap } from "lucide-react";
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
  priority?: 'high' | 'medium' | 'low';
}

interface NewJobForm {
  title: string;
  customer: string;
  address: string;
  status: 'scheduled' | 'in-progress' | 'completed';
  type: 'job' | 'appointment';
  time: string;
}

interface MapViewProps {
  jobs?: Job[];
  isCompact?: boolean;
  editable?: boolean;
  onJobsChange?: (jobs: Job[]) => void;
}

export const MapView = ({ jobs = [], isCompact = false, editable = false, onJobsChange }: MapViewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newJob, setNewJob] = useState<NewJobForm>({
    title: '',
    customer: '',
    address: '',
    status: 'scheduled',
    type: 'job',
    time: ''
  });

  // Mock map visualization with job markers
  const handleAddJob = () => {
    if (!newJob.title || !newJob.customer || !newJob.address || !onJobsChange) return;

    const job: Job = {
      id: Date.now().toString(),
      ...newJob,
      coordinates: [
        -74.006 + (Math.random() - 0.5) * 0.1,
        40.7128 + (Math.random() - 0.5) * 0.1
      ] as [number, number],
      time: newJob.time || new Date().toISOString()
    };

    onJobsChange([job, ...jobs]);
    setNewJob({
      title: '',
      customer: '',
      address: '',
      status: 'scheduled',
      type: 'job',
      time: ''
    });
    setShowAddDialog(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-500';
      case 'in-progress':
        return 'bg-orange-500';
      case 'completed':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card className={`border-border/40 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 ${isCompact ? 'h-full' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <MapPin className="h-4 w-4" />
            Live Locations Map
          </CardTitle>
          {editable && (
            <div className="flex gap-2">
              <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Location</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="map-title">Title</Label>
                        <Input
                          id="map-title"
                          value={newJob.title}
                          onChange={(e) => setNewJob(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="Kitchen Renovation"
                        />
                      </div>
                      <div>
                        <Label htmlFor="map-customer">Customer</Label>
                        <Input
                          id="map-customer"
                          value={newJob.customer}
                          onChange={(e) => setNewJob(prev => ({ ...prev, customer: e.target.value }))}
                          placeholder="John Smith"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="map-address">Address</Label>
                      <Input
                        id="map-address"
                        value={newJob.address}
                        onChange={(e) => setNewJob(prev => ({ ...prev, address: e.target.value }))}
                        placeholder="123 Main St, City, State"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="map-type">Type</Label>
                        <Select value={newJob.type} onValueChange={(value: 'job' | 'appointment') => setNewJob(prev => ({ ...prev, type: value }))}>
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
                        <Label htmlFor="map-status">Status</Label>
                        <Select value={newJob.status} onValueChange={(value: 'scheduled' | 'in-progress' | 'completed') => setNewJob(prev => ({ ...prev, status: value }))}>
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
                    <div>
                      <Label htmlFor="map-time">Date & Time</Label>
                      <Input
                        id="map-time"
                        type="datetime-local"
                        value={newJob.time ? new Date(newJob.time).toISOString().slice(0, 16) : ''}
                        onChange={(e) => setNewJob(prev => ({ ...prev, time: e.target.value ? new Date(e.target.value).toISOString() : '' }))}
                      />
                    </div>
                    <Button onClick={handleAddJob} className="w-full">
                      Add Location
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-3">
        <div className={`relative bg-muted/30 rounded-lg overflow-hidden border-2 border-dashed border-border/20 ${isCompact ? 'h-64' : 'h-96'}`}>
          {/* Map Container */}
          <div ref={mapRef} className="w-full h-full relative">
            {/* Mock Map Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 dark:from-blue-950 dark:via-green-950 dark:to-blue-900">
              {/* Grid Pattern */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `
                  linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }} />
            </div>

            {/* Job Markers */}
            {jobs.map((job, index) => (
              <div
                key={job.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{
                  left: `${30 + index * 15}%`,
                  top: `${40 + (index % 3) * 20}%`
                }}
                onClick={() => setSelectedJob(job)}
              >
                <div className={`w-4 h-4 rounded-full ${getStatusColor(job.status)} border-2 border-white shadow-lg group-hover:scale-125 transition-transform`}>
                  <div className="absolute inset-0 rounded-full animate-ping bg-current opacity-20"></div>
                </div>
                <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-background/90 backdrop-blur-sm text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  <div className="font-medium">{job.customer}</div>
                  <div className="text-muted-foreground">{job.title}</div>
                </div>
              </div>
            ))}

            {/* Map Controls */}
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
                <Plus className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
                <Navigation className="h-4 w-4" />
              </Button>
            </div>

            {/* Legend */}
            <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur-sm rounded-lg p-2 text-xs">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span>Scheduled</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <span>In Progress</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Completed</span>
                </div>
              </div>
            </div>

            {/* Center Message */}
            {jobs.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No job locations to display</p>
                  {editable && <p className="text-xs">Click "Add" to add locations</p>}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Selected Job Details */}
        {selectedJob && (
          <div className="mt-3 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-sm">{selectedJob.title}</h4>
              <Badge className={`text-xs ${getStatusColor(selectedJob.status)} text-white`}>
                {selectedJob.status.replace('-', ' ')}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mb-1">{selectedJob.customer}</p>
            <p className="text-xs text-muted-foreground">{selectedJob.address}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
