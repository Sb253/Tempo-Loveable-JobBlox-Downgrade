import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Plus, Settings } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapMarker } from './map/MapMarker';
import { MapLegend } from './map/MapLegend';
import { MapControls } from './map/MapControls';
import { MapBackground } from './map/MapBackground';

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
          <div ref={mapRef} className="w-full h-full relative">
            <MapBackground hasJobs={jobs.length > 0} editable={editable} />

            {jobs.map((job, index) => (
              <MapMarker
                key={job.id}
                job={job}
                index={index}
                onJobClick={setSelectedJob}
                getStatusColor={getStatusColor}
              />
            ))}

            <MapControls />
            <MapLegend />
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
