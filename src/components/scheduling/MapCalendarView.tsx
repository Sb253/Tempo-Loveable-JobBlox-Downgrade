
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Clock, User } from "lucide-react";
import { Job } from "@/components/SchedulingDashboard";

interface MapCalendarViewProps {
  jobs: Job[];
  onJobSelect: (job: Job) => void;
  jobTypeColors: Record<string, string>;
}

export const MapCalendarView = ({ jobs, onJobSelect, jobTypeColors }: MapCalendarViewProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [mapCenter] = useState<[number, number]>([-74.006, 40.7128]); // NYC default

  const filteredJobs = jobs.filter(job => 
    job.startDate === selectedDate && job.coordinates
  );

  const calculateDistance = (coord1: [number, number], coord2: [number, number]) => {
    const R = 3959; // Earth's radius in miles
    const dLat = (coord2[1] - coord1[1]) * Math.PI / 180;
    const dLon = (coord2[0] - coord1[0]) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(coord1[1] * Math.PI / 180) * Math.cos(coord2[1] * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const getOptimizedRoute = () => {
    if (filteredJobs.length === 0) return [];
    
    // Simple route optimization - nearest neighbor
    const jobs = [...filteredJobs];
    const route = [];
    let currentLocation = mapCenter;
    
    while (jobs.length > 0) {
      let nearestIndex = 0;
      let shortestDistance = Infinity;
      
      jobs.forEach((job, index) => {
        if (job.coordinates) {
          const distance = calculateDistance(currentLocation, job.coordinates);
          if (distance < shortestDistance) {
            shortestDistance = distance;
            nearestIndex = index;
          }
        }
      });
      
      const nearestJob = jobs.splice(nearestIndex, 1)[0];
      route.push(nearestJob);
      if (nearestJob.coordinates) {
        currentLocation = nearestJob.coordinates;
      }
    }
    
    return route;
  };

  const optimizedRoute = getOptimizedRoute();
  const totalDistance = optimizedRoute.reduce((total, job, index) => {
    if (index === 0) return total;
    const prevCoords = index === 1 ? mapCenter : optimizedRoute[index - 1].coordinates;
    if (prevCoords && job.coordinates) {
      return total + calculateDistance(prevCoords, job.coordinates);
    }
    return total;
  }, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Map View - Route Planning</h3>
        <div className="flex items-center gap-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border rounded-md"
          />
          <Badge variant="outline">
            {filteredJobs.length} jobs • {totalDistance.toFixed(1)} miles
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Route Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-[4/3] bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center space-y-2">
                <MapPin className="h-12 w-12 mx-auto text-muted-foreground" />
                <p className="text-muted-foreground">Interactive Map View</p>
                <p className="text-sm text-muted-foreground">
                  Shows job locations and optimized routes
                </p>
                {filteredJobs.map((job, index) => (
                  <div 
                    key={job.id}
                    className="absolute w-8 h-8 rounded-full text-white text-xs flex items-center justify-center font-bold"
                    style={{
                      backgroundColor: jobTypeColors[job.jobType].replace('bg-', '#'),
                      top: `${20 + index * 15}%`,
                      left: `${30 + index * 20}%`,
                    }}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Optimized Route */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="h-5 w-5" />
              Optimized Route
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {optimizedRoute.map((job, index) => (
                <div
                  key={job.id}
                  className="flex items-start gap-3 p-3 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                  onClick={() => onJobSelect(job)}
                >
                  <div 
                    className={`w-6 h-6 rounded-full text-white text-xs flex items-center justify-center font-bold ${jobTypeColors[job.jobType]}`}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm truncate">{job.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {job.jobType}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {job.customer}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {job.startTime} - {job.endTime || 'Open'}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {job.address}
                      </div>
                      {index > 0 && (
                        <div className="text-xs text-blue-600">
                          {calculateDistance(
                            index === 1 ? mapCenter : optimizedRoute[index - 1].coordinates!,
                            job.coordinates!
                          ).toFixed(1)} miles from previous
                        </div>
                      )}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Navigate
                  </Button>
                </div>
              ))}
            </div>
            
            {optimizedRoute.length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center text-sm">
                  <span>Total Distance:</span>
                  <span className="font-semibold">{totalDistance.toFixed(1)} miles</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Estimated Travel Time:</span>
                  <span className="font-semibold">{Math.round(totalDistance * 2)} minutes</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Route Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <Button className="flex-1">
              <Navigation className="h-4 w-4 mr-2" />
              Start Route Navigation
            </Button>
            <Button variant="outline">
              Export to GPS
            </Button>
            <Button variant="outline">
              Share Route
            </Button>
            <Button variant="outline">
              Print Route
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
