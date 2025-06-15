
import React, { useEffect, useRef, useState } from 'react';
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

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export const MapView = ({ jobs }: MapViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [googleMapsApiKey, setGoogleMapsApiKey] = useState('');
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const [isApiLoaded, setIsApiLoaded] = useState(false);

  const loadGoogleMapsScript = () => {
    if (window.google) {
      setIsApiLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&callback=initMap`;
    script.async = true;
    script.defer = true;
    
    window.initMap = () => {
      setIsApiLoaded(true);
    };

    document.head.appendChild(script);
  };

  const initializeMap = () => {
    if (!mapContainer.current || !window.google || !isApiLoaded) return;

    try {
      const { google } = window;
      
      // Create map centered on NYC by default
      map.current = new google.maps.Map(mapContainer.current, {
        center: { lat: 40.7128, lng: -74.006 },
        zoom: 10,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
      });

      // Add markers for each job
      const bounds = new google.maps.LatLngBounds();
      
      jobs.forEach((job) => {
        const markerColor = getMarkerColor(job.status);
        
        const marker = new google.maps.Marker({
          position: { lat: job.coordinates[1], lng: job.coordinates[0] },
          map: map.current,
          title: job.title,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: markerColor,
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
          },
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="padding: 8px; max-width: 200px;">
              <h3 style="font-weight: bold; margin: 0 0 8px 0;">${job.title}</h3>
              <p style="margin: 4px 0; color: #666; font-size: 14px;">${job.customer}</p>
              <p style="margin: 4px 0; font-size: 14px;">${job.address}</p>
              <span style="display: inline-block; padding: 2px 8px; font-size: 12px; border-radius: 4px; background-color: ${markerColor}20; color: ${markerColor};">
                ${job.status.replace('-', ' ')}
              </span>
            </div>
          `,
        });

        marker.addListener('click', () => {
          infoWindow.open(map.current, marker);
        });

        bounds.extend({ lat: job.coordinates[1], lng: job.coordinates[0] });
      });

      // Fit map to show all markers
      if (jobs.length > 0) {
        map.current.fitBounds(bounds);
        
        // Ensure minimum zoom level
        const listener = google.maps.event.addListener(map.current, 'idle', () => {
          if (map.current.getZoom() > 15) map.current.setZoom(15);
          google.maps.event.removeListener(listener);
        });
      }

      setIsMapInitialized(true);
    } catch (error) {
      console.error('Error initializing Google Maps:', error);
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

  const handleLoadMap = () => {
    if (!googleMapsApiKey) return;
    loadGoogleMapsScript();
  };

  useEffect(() => {
    if (isApiLoaded) {
      initializeMap();
    }
  }, [isApiLoaded, jobs]);

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
                Google Maps API Key
              </label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter your Google Maps API key"
                  value={googleMapsApiKey}
                  onChange={(e) => setGoogleMapsApiKey(e.target.value)}
                />
                <Button onClick={handleLoadMap} disabled={!googleMapsApiKey}>
                  Load Map
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Get your API key from{' '}
                <a 
                  href="https://console.cloud.google.com/google/maps-apis" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Google Cloud Console
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
              <p>Enter your Google Maps API key to view job locations</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
