
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";

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
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [tokenInput, setTokenInput] = useState('');

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

  const initializeMap = (token: string) => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = token;

    // Default center (NYC) if no jobs
    const center: [number, number] = jobs.length > 0 
      ? [jobs[0].coordinates[0], jobs[0].coordinates[1]] 
      : [-74.006, 40.7128];

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: center,
      zoom: 10
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add markers for each job
    jobs.forEach((job) => {
      if (!map.current) return;

      // Create a custom marker element
      const markerEl = document.createElement('div');
      markerEl.style.width = '20px';
      markerEl.style.height = '20px';
      markerEl.style.borderRadius = '50%';
      markerEl.style.backgroundColor = getMarkerColor(job.status);
      markerEl.style.border = '3px solid white';
      markerEl.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
      markerEl.style.cursor = 'pointer';

      // Create popup content
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

  const handleTokenSubmit = () => {
    if (tokenInput.trim()) {
      setMapboxToken(tokenInput.trim());
    }
  };

  useEffect(() => {
    if (mapboxToken) {
      initializeMap(mapboxToken);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapboxToken, jobs]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Job Locations
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!mapboxToken ? (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Mapbox Token Required</h3>
              <p className="text-sm text-blue-700 mb-3">
                To display the map, please enter your Mapbox public token. You can get one from{' '}
                <a 
                  href="https://mapbox.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-900"
                >
                  mapbox.com
                </a>
              </p>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter your Mapbox public token"
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                  className="flex-1"
                />
                <button
                  onClick={handleTokenSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Load Map
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-96 rounded-lg border overflow-hidden">
            <div ref={mapContainer} className="w-full h-full" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
