
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Settings } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface Job {
  id: string;
  title: string;
  customer: string;
  address: string;
  coordinates: [number, number];
  status: 'scheduled' | 'in-progress' | 'completed';
}

interface MapViewProps {
  jobs: Job[];
}

export const MapView: React.FC<MapViewProps> = ({ jobs }) => {
  const { toast } = useToast();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [mapboxToken, setMapboxToken] = useState('pk.eyJ1Ijoic2NvdHRiOTcxIiwiYSI6ImNtYng0M2d2cTB2dXkybW9zOTJmdzg1MWQifQ.3rpXH4NfcWycCt58VAyGzg');

  const getMarkerColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return '#3b82f6';
      case 'in-progress':
        return '#f59e0b';
      case 'completed':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([longitude, latitude]);
          toast({
            title: "Location Found",
            description: "Map centered on your current location.",
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          toast({
            title: "Location Error",
            description: "Could not get your current location. Using default location.",
          });
          // Default to NYC if location fails
          setUserLocation([-74.006, 40.7128]);
        }
      );
    } else {
      toast({
        title: "Geolocation Not Supported",
        description: "Your browser doesn't support geolocation. Using default location.",
      });
      setUserLocation([-74.006, 40.7128]);
    }
  };

  const initializeMap = () => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = mapboxToken;

    // Use user location or default center
    const center: [number, number] = userLocation || 
      (jobs.length > 0 ? [jobs[0].coordinates[0], jobs[0].coordinates[1]] : [-74.006, 40.7128]);

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: center,
      zoom: userLocation ? 12 : 10
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add user location marker if available
    if (userLocation) {
      const userMarker = document.createElement('div');
      userMarker.style.width = '20px';
      userMarker.style.height = '20px';
      userMarker.style.borderRadius = '50%';
      userMarker.style.backgroundColor = '#ef4444';
      userMarker.style.border = '3px solid white';
      userMarker.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';

      const userPopup = new mapboxgl.Popup({ offset: 25 })
        .setHTML('<div style="padding: 8px;"><strong>Your Location</strong></div>');

      new mapboxgl.Marker(userMarker)
        .setLngLat(userLocation)
        .setPopup(userPopup)
        .addTo(map.current);
    }

    // Add markers for each job
    jobs.forEach((job) => {
      if (!map.current) return;

      const markerEl = document.createElement('div');
      markerEl.style.width = '20px';
      markerEl.style.height = '20px';
      markerEl.style.borderRadius = '50%';
      markerEl.style.backgroundColor = getMarkerColor(job.status);
      markerEl.style.border = '3px solid white';
      markerEl.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
      markerEl.style.cursor = 'pointer';

      const popupContent = `
        <div style="padding: 8px; max-width: 200px;">
          <h3 style="font-weight: bold; margin: 0 0 8px 0;">${job.title}</h3>
          <p style="margin: 4px 0; color: #666; font-size: 14px;">${job.customer}</p>
          <p style="margin: 4px 0; font-size: 14px;">${job.address}</p>
          <span style="
            display: inline-block;
            padding: 2px 8px;
            font-size: 12px;
            border-radius: 4px;
            background-color: ${getMarkerColor(job.status)}20;
            color: ${getMarkerColor(job.status)};
          ">
            ${job.status.replace('-', ' ')}
          </span>
        </div>
      `;

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(popupContent);

      new mapboxgl.Marker(markerEl)
        .setLngLat([job.coordinates[0], job.coordinates[1]])
        .setPopup(popup)
        .addTo(map.current);
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
  }, [jobs, userLocation, mapboxToken]);

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Job Locations
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={getCurrentLocation}
                className="flex items-center gap-2"
              >
                <Navigation className="h-4 w-4" />
                My Location
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettings(true)}
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="w-full h-96 rounded-lg border overflow-hidden">
            <div ref={mapContainer} className="w-full h-full" />
          </div>
        </CardContent>
      </Card>

      {/* Map Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Map Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="mapbox-token">Mapbox Access Token</Label>
              <Input
                id="mapbox-token"
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                placeholder="Enter your Mapbox public token"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Get your token from{" "}
                <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600">
                  mapbox.com
                </a>
              </p>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowSettings(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                setShowSettings(false);
                toast({
                  title: "Settings Updated",
                  description: "Map settings have been updated.",
                });
              }}>
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
