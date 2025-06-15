
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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

  const createCustomIcon = (status: string) => {
    const color = getMarkerColor(status);
    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          background-color: ${color};
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        "></div>
      `,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
  };

  // Default center (NYC) if no jobs
  const center: [number, number] = jobs.length > 0 
    ? [jobs[0].coordinates[1], jobs[0].coordinates[0]] 
    : [40.7128, -74.006];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Job Locations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-96 rounded-lg border overflow-hidden">
          <MapContainer
            center={center}
            zoom={10}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {jobs.map((job) => (
              <Marker
                key={job.id}
                position={[job.coordinates[1], job.coordinates[0]]}
                icon={createCustomIcon(job.status)}
              >
                <Popup>
                  <div style={{ padding: '8px', maxWidth: '200px' }}>
                    <h3 style={{ fontWeight: 'bold', margin: '0 0 8px 0' }}>
                      {job.title}
                    </h3>
                    <p style={{ margin: '4px 0', color: '#666', fontSize: '14px' }}>
                      {job.customer}
                    </p>
                    <p style={{ margin: '4px 0', fontSize: '14px' }}>
                      {job.address}
                    </p>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '2px 8px',
                        fontSize: '12px',
                        borderRadius: '4px',
                        backgroundColor: `${getMarkerColor(job.status)}20`,
                        color: getMarkerColor(job.status),
                      }}
                    >
                      {job.status.replace('-', ' ')}
                    </span>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
};
