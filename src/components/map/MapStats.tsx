
import React from 'react';

interface Job {
  status: string;
  type: 'job' | 'appointment';
}

interface MapStatsProps {
  jobs: Job[];
}

export const MapStats: React.FC<MapStatsProps> = ({ jobs }) => {
  const jobStats = jobs.reduce((acc, job) => {
    if (job.type === 'job') {
      acc.jobs[job.status] = (acc.jobs[job.status] || 0) + 1;
    } else {
      acc.appointments[job.status] = (acc.appointments[job.status] || 0) + 1;
    }
    return acc;
  }, { jobs: {} as Record<string, number>, appointments: {} as Record<string, number> });

  return (
    <div className="grid grid-cols-2 gap-4 text-sm">
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
  );
};
