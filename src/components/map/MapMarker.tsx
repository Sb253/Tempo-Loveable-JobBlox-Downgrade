
import { Job } from '../EditableRecentJobs';

interface MapMarkerProps {
  job: Job;
  index: number;
  onJobClick: (job: Job) => void;
  getStatusColor: (status: string) => string;
}

export const MapMarker = ({ job, index, onJobClick, getStatusColor }: MapMarkerProps) => {
  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
      style={{
        left: `${30 + index * 15}%`,
        top: `${40 + (index % 3) * 20}%`
      }}
      onClick={() => onJobClick(job)}
    >
      <div className={`w-4 h-4 rounded-full ${getStatusColor(job.status)} border-2 border-white shadow-lg group-hover:scale-125 transition-transform`}>
        <div className="absolute inset-0 rounded-full animate-ping bg-current opacity-20"></div>
      </div>
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-background/90 backdrop-blur-sm text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
        <div className="font-medium">{job.customer}</div>
        <div className="text-muted-foreground">{job.title}</div>
      </div>
    </div>
  );
};
