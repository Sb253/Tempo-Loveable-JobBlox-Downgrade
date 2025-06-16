
import { MapPin } from "lucide-react";

interface MapBackgroundProps {
  hasJobs: boolean;
  editable: boolean;
}

export const MapBackground = ({ hasJobs, editable }: MapBackgroundProps) => {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 dark:from-blue-950 dark:via-green-950 dark:to-blue-900">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px'
      }} />
      
      {/* Center Message */}
      {!hasJobs && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No job locations to display</p>
            {editable && <p className="text-xs">Click "Add" to add locations</p>}
          </div>
        </div>
      )}
    </div>
  );
};
