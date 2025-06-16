import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "./ThemeProvider";
import { MapHeader } from "./map/MapHeader";
import { MapStats } from "./map/MapStats";
import { MapContainer } from "./map/MapContainer";
import { useMapMarkers } from "./map/MapMarkers";

interface Job {
  id: string;
  title: string;
  customer: string;
  address: string;
  coordinates: [number, number];
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
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
  jobs: Job[];
  employees?: Employee[];
  showEmployeeLocations?: boolean;
  compact?: boolean;
  height?: string;
}

export const MapView: React.FC<MapViewProps> = ({ 
  jobs, 
  employees = [], 
  showEmployeeLocations = false, 
  compact = false,
  height = "h-80"
}) => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [mapboxToken] = useState('pk.eyJ1Ijoic2NvdHRiOTcxIiwiYSI6ImNtYng0M2d2cTB2dXkybW9zOTJmdzg1MWQifQ.3rpXH4NfcWycCt58VAyGzg');
  
  const { addUserLocationMarker, addEmployeeMarkers, addJobMarkers } = useMapMarkers();

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([longitude, latitude]);
          if (map.current) {
            map.current.flyTo({
              center: [longitude, latitude],
              zoom: 12,
              essential: true
            });
          }
          if (!compact) {
            toast({
              title: "Location Found",
              description: "Map centered on your current location.",
            });
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          if (!compact) {
            toast({
              title: "Location Error",
              description: "Could not get your current location. Using default location.",
            });
          }
          setUserLocation([-74.006, 40.7128]);
        }
      );
    } else {
      if (!compact) {
        toast({
          title: "Geolocation Not Supported",
          description: "Your browser doesn't support geolocation. Using default location.",
        });
      }
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
      zoom: compact ? 10 : (userLocation ? 12 : 10)
    });

    if (!compact) {
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    }

    // Add markers using the refactored functions
    if (userLocation) {
      addUserLocationMarker(map.current, userLocation, theme);
    }

    if (showEmployeeLocations && employees.length > 0) {
      addEmployeeMarkers(map.current, employees, theme);
    }

    addJobMarkers(map.current, jobs, theme, compact);
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
  }, [jobs, userLocation, mapboxToken, theme]);

  if (compact) {
    return (
      <MapContainer height={height} compact={true}>
        <div ref={mapContainer} className="w-full h-full" />
      </MapContainer>
    );
  }

  return (
    <div className="w-full max-w-full">
      <Card className="w-full">
        <MapHeader 
          onLocationClick={getCurrentLocation}
          showEmployeeLocations={showEmployeeLocations}
        />
        <CardContent className="p-4">
          <MapContainer height={height} compact={false}>
            <div ref={mapContainer} className="w-full h-full" />
          </MapContainer>
          
          <MapStats jobs={jobs} />
        </CardContent>
      </Card>
    </div>
  );
};
