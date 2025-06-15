
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, User } from "lucide-react";

interface JobLocation {
  id: string;
  title: string;
  customer: string;
  address: string;
  coordinates: [number, number];
  status: 'scheduled' | 'in-progress' | 'completed';
  time: string;
  technician?: string;
}

interface JobLocationsListProps {
  jobs: JobLocation[];
}

export const JobLocationsList = ({ jobs }: JobLocationsListProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white';
      case 'in-progress':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white';
      case 'completed':
        return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      default:
        return 'bg-gradient-to-r from-gray-500 to-slate-500 text-white';
    }
  };

  return (
    <Card className="colorful-card shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 colorful-text">
          <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
            <MapPin className="h-5 w-5 text-white" />
          </div>
          Job Locations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {jobs.map((job) => (
            <div key={job.id} className="flex items-start justify-between p-4 border rounded-lg bg-gradient-to-r from-white to-blue-50 dark:from-gray-800 dark:to-blue-950 hover:shadow-md transition-all duration-200 transform hover:scale-102">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">{job.title}</h4>
                  <Badge className={`${getStatusColor(job.status)} border-0`}>
                    {job.status.replace('-', ' ')}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{job.customer}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <div className="p-1 rounded bg-gradient-to-r from-pink-500 to-rose-500">
                      <MapPin className="h-3 w-3 text-white" />
                    </div>
                    {job.address}
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="p-1 rounded bg-gradient-to-r from-cyan-500 to-blue-500">
                      <Clock className="h-3 w-3 text-white" />
                    </div>
                    {job.time}
                  </div>
                  {job.technician && (
                    <div className="flex items-center gap-1">
                      <div className="p-1 rounded bg-gradient-to-r from-emerald-500 to-green-500">
                        <User className="h-3 w-3 text-white" />
                      </div>
                      {job.technician}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
