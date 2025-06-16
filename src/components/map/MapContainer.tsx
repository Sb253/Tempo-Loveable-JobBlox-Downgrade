
import React, { useRef } from 'react';

interface MapContainerProps {
  height: string;
  compact?: boolean;
  children?: React.ReactNode;
}

export const MapContainer: React.FC<MapContainerProps> = ({ 
  height, 
  compact = false, 
  children 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);

  if (compact) {
    return (
      <div className={`w-full ${height} rounded-lg border overflow-hidden`}>
        <div ref={mapContainer} className="w-full h-full">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${height} rounded-lg border overflow-hidden mb-4`}>
      <div ref={mapContainer} className="w-full h-full">
        {children}
      </div>
    </div>
  );
};
