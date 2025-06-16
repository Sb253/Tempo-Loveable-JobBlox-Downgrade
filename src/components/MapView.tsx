
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "./ThemeProvider";

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
  jobs: Job[];
  employees?: Employee[];
  showEmployeeLocations?: boolean;
}

export const MapView: React.FC<MapViewProps> = ({ jobs, employees = [], showEmployeeLocations = false }) => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [mapboxToken] = useState('pk.eyJ1Ijoic2NvdHRiOTcxIiwiYSI6ImNtYng0M2d2cTB2dXkybW9zOTJmdzg1MWQifQ.3rpXH4NfcWycCt58VAyGzg');

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
          return theme === 'dark' ? '#fbbf24' : '#f59e0b';
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
              zoom: 12,
              essential: true
            });
          }
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

    const center: [number, number] = userLocation || 
      (jobs.length > 0 ? [jobs[0].coordinates[0], jobs[0].coordinates[1]] : [-74.006, 40.7128]);

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: theme === 'dark' ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/light-v11',
      center: center,
      zoom: userLocation ? 12 : 10
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add user location marker if available
    if (userLocation) {
      const userMarker = document.createElement('div');
      userMarker.style.width = '20px';
      userMarker.style.height = '20px';
      userMarker.style.borderRadius = '50%';
      userMarker.style.backgroundColor = theme === 'dark' ? '#ef4444' : '#dc2626';
      userMarker.style.border = `3px solid ${theme === 'dark' ? '#1f2937' : 'white'}`;
      userMarker.style.boxShadow = theme === 'dark' ? '0 2px 4px rgba(0,0,0,0.5)' : '0 2px 4px rgba(0,0,0,0.3)';

      const userPopup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`<div style="padding: 8px; color: ${theme === 'dark' ? '#f3f4f6' : '#1f2937'};"><strong>Your Location</strong></div>`);

      new mapboxgl.Marker(userMarker)
        .setLngLat(userLocation)
        .setPopup(userPopup)
        .addTo(map.current);
    }

    // Add markers for employee locations if enabled
    if (showEmployeeLocations && employees.length > 0) {
      employees.forEach((employee) => {
        if (!map.current) return;

        const employeeMarker = document.createElement('div');
        employeeMarker.style.width = '20px';
        employeeMarker.style.height = '20px';
        employeeMarker.style.borderRadius = '50%';
        employeeMarker.style.backgroundColor = employee.color;
        employeeMarker.style.border = `3px solid ${theme === 'dark' ? '#1f2937' : 'white'}`;
        employeeMarker.style.boxShadow = theme === 'dark' ? '0 2px 4px rgba(0,0,0,0.5)' : '0 2px 4px rgba(0,0,0,0.3)';
        employeeMarker.style.cursor = 'pointer';

        if (employee.status === 'break') {
          employeeMarker.style.border = `3px solid ${theme === 'dark' ? '#fbbf24' : '#f59e0b'}`;
        } else if (employee.status === 'inactive') {
          employeeMarker.style.opacity = '0.5';
        }

        const employeePopupContent = `
          <div style="padding: 12px; max-width: 200px; color: ${theme === 'dark' ? '#f3f4f6' : '#1f2937'};">
            <h3 style="font-weight: bold; margin: 0 0 8px 0;">${employee.name}</h3>
            <span style="
              display: inline-block;
              padding: 4px 8px;
              font-size: 12px;
              border-radius: 6px;
              background-color: ${employee.color}20;
              color: ${employee.color};
              font-weight: 500;
              text-transform: capitalize;
            ">
              ${employee.status}
            </span>
          </div>
        `;

        const employeePopup = new mapboxgl.Popup({ offset: 25 }).setHTML(employeePopupContent);

        new mapboxgl.Marker(employeeMarker)
          .setLngLat(employee.coordinates)
          .setPopup(employeePopup)
          .addTo(map.current);
      });
    }

    // Add markers for each job and appointment
    jobs.forEach((job) => {
      if (!map.current) return;

      const markerEl = document.createElement('div');
      markerEl.style.width = '24px';
      markerEl.style.height = '24px';
      markerEl.style.borderRadius = job.type === 'appointment' ? '4px' : '50%';
      
      const markerColor = job.employeeColor || getMarkerColor(job.status, job.type);
      markerEl.style.backgroundColor = markerColor;
      markerEl.style.border = `3px solid ${theme === 'dark' ? '#1f2937' : 'white'}`;
      markerEl.style.boxShadow = theme === 'dark' ? '0 2px 4px rgba(0,0,0,0.5)' : '0 2px 4px rgba(0,0,0,0.3)';
      markerEl.style.cursor = 'pointer';

      if (job.type === 'appointment') {
        markerEl.style.clipPath = 'polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)';
      }

      const popupContent = `
        <div style="padding: 12px; max-width: 250px; color: ${theme === 'dark' ? '#f3f4f6' : '#1f2937'};">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <h3 style="font-weight: bold; margin: 0;">${job.title}</h3>
            <span style="
              display: inline-block;
              padding: 2px 6px;
              font-size: 10px;
              border-radius: 4px;
              background-color: ${job.type === 'appointment' ? '#8B5CF6' : '#3b82f6'};
              color: white;
              text-transform: uppercase;
              font-weight: 500;
            ">
              ${job.type}
            </span>
          </div>
          <p style="margin: 4px 0; color: ${theme === 'dark' ? '#d1d5db' : '#666'}; font-size: 14px;">${job.customer}</p>
          <p style="margin: 4px 0; font-size: 14px;">${job.address}</p>
          <p style="margin: 4px 0; font-size: 12px; color: ${theme === 'dark' ? '#d1d5db' : '#666'};">${job.time}</p>
          <span style="
            display: inline-block;
            padding: 4px 8px;
            font-size: 12px;
            border-radius: 6px;
            background-color: ${markerColor}20;
            color: ${markerColor};
            font-weight: 500;
            text-transform: capitalize;
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
  }, [jobs, userLocation, mapboxToken, theme]);

  const jobStats = jobs.reduce((acc, job) => {
    if (job.type === 'job') {
      acc.jobs[job.status] = (acc.jobs[job.status] || 0) + 1;
    } else {
      acc.appointments[job.status] = (acc.appointments[job.status] || 0) + 1;
    }
    return acc;
  }, { jobs: {} as Record<string, number>, appointments: {} as Record<string, number> });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Live Locations Map
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
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <span>Jobs</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-500" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)' }}></div>
            <span>Appointments</span>
          </div>
          {showEmployeeLocations && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span>Employees</span>
            </div>
          )}
          <div className="flex gap-4">
            <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950">Scheduled</Badge>
            <Badge variant="outline" className="bg-orange-50 dark:bg-orange-950">In Progress</Badge>
            <Badge variant="outline" className="bg-green-50 dark:bg-green-950">Completed</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full h-96 rounded-lg border overflow-hidden">
          <div ref={mapContainer} className="w-full h-full" />
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
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
      </CardContent>
    </Card>
  );
};
