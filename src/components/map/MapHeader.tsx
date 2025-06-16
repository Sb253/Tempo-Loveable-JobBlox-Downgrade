
import React from 'react';
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation } from "lucide-react";

interface MapHeaderProps {
  onLocationClick: () => void;
  showEmployeeLocations?: boolean;
}

export const MapHeader: React.FC<MapHeaderProps> = ({ 
  onLocationClick, 
  showEmployeeLocations = false 
}) => {
  return (
    <CardHeader className="pb-4">
      <div className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-lg">
          <MapPin className="h-5 w-5" />
          Live Locations Map
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={onLocationClick}
          className="flex items-center gap-2"
        >
          <Navigation className="h-4 w-4" />
          My Location
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-3 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span>Jobs</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-purple-500" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)' }}></div>
          <span>Appointments</span>
        </div>
        {showEmployeeLocations && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Employees</span>
          </div>
        )}
        <div className="flex gap-2">
          <Badge variant="outline" className="text-xs">Scheduled</Badge>
          <Badge variant="outline" className="text-xs">In Progress</Badge>
          <Badge variant="outline" className="text-xs">Completed</Badge>
          <Badge variant="outline" className="text-xs">Cancelled</Badge>
        </div>
      </div>
    </CardHeader>
  );
};
