
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface JobLocation {
  id: string;
  title: string;
  customer: string;
  address: string;
  coordinates: [number, number];
  status: 'scheduled' | 'in-progress' | 'completed';
}

interface MapViewProps {
  jobs: JobLocation[];
}

export const MapView = ({ jobs }: MapViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-74.006, 40.7128], // Default to NYC
        zoom: 10,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Add markers for each job
      jobs.forEach((job) => {
        const markerColor = getMarkerColor(job.status);
        
        const marker = new mapboxgl.Marker({ color: markerColor })
          .setLngLat(job.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(`
                <div class="p-2">
                  <h3 class="font-semibold">${job.title}</h3>
                  <p class="text-sm text-gray-600">${job.customer}</p>
                  <p class="text-sm">${job.address}</p>
                  <span class="inline-block px-2 py-1 text-xs rounded mt-1" style="background-color: ${markerColor}20; color: ${markerColor}">
                    ${job.status.replace('-', ' ')}
                  </span>
                </div>
              `)
          )
          .addTo(map.current!);
      });

      // Fit map to show all markers
      if (jobs.length > 0) {
        const bounds = new mapboxgl.LngLatBounds();
        jobs.forEach(job => bounds.extend(job.coordinates));
        map.current.fitBounds(bounds, { padding: 50 });
      }

      setIsMapInitialized(true);
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  };

  const getMarkerColor = (status: string) => {
    switch (status) {
      case 'scheduled': return '#3b82f6';
      case 'in-progress': return '#f59e0b';
      case 'completed': return '#10b981';
      default: return '#6b7280';
    }
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Job Locations
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!isMapInitialized && (
          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Mapbox Public Token
              </label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter your Mapbox public token"
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                />
                <Button onClick={initializeMap} disabled={!mapboxToken}>
                  Load Map
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Get your token from{' '}
                <a 
                  href="https://account.mapbox.com/access-tokens/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  mapbox.com
                </a>
              </p>
            </div>
          </div>
        )}
        
        <div 
          ref={mapContainer} 
          className="w-full h-96 rounded-lg border"
          style={{ display: isMapInitialized ? 'block' : 'none' }}
        />
        
        {!isMapInitialized && (
          <div className="w-full h-96 rounded-lg border bg-gray-100 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Enter your Mapbox token to view job locations</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
