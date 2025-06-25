import React, { useEffect, useRef, useState } from "react";
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
  status: "scheduled" | "in-progress" | "completed" | "cancelled";
  type: "job" | "appointment";
  time: string;
  assignedTo?: string;
  employeeColor?: string;
}

interface Employee {
  id: string;
  name: string;
  coordinates: [number, number];
  color: string;
  status: "active" | "break" | "inactive";
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
  height = "h-80",
}) => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null,
  );
  const [mapboxToken] = useState(
    "pk.eyJ1Ijoic2NvdHRiOTcxIiwiYSI6ImNtYng0M2d2cTB2dXkybW9zOTJmdzg1MWQifQ.3rpXH4NfcWycCt58VAyGzg",
  );

  const { addUserLocationMarker, addEmployeeMarkers, addJobMarkers } =
    useMapMarkers();

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
              essential: true,
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
          console.error("Error getting location:", error);
          if (!compact) {
            toast({
              title: "Location Error",
              description:
                "Could not get your current location. Using default location.",
            });
          }
          setUserLocation([-74.006, 40.7128]);
        },
      );
    } else {
      if (!compact) {
        toast({
          title: "Geolocation Not Supported",
          description:
            "Your browser doesn't support geolocation. Using default location.",
        });
      }
      setUserLocation([-74.006, 40.7128]);
    }
  };

  const initializeMap = () => {
    if (!mapContainer.current || map.current) return;

    // Map functionality temporarily disabled - requires mapbox-gl dependency
    console.log("Map would be initialized with:", {
      jobs: jobs.length,
      employees: employees.length,
    });

    // Create a placeholder div
    if (mapContainer.current) {
      mapContainer.current.innerHTML = `
        <div class="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div class="text-center p-4">
            <div class="text-gray-500 dark:text-gray-400 mb-2">
              <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">Map View</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">Map functionality temporarily disabled</p>
            <p class="text-xs text-gray-400 dark:text-gray-500 mt-2">${jobs.length} jobs • ${employees.length} employees</p>
          </div>
        </div>
      `;
    }
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
