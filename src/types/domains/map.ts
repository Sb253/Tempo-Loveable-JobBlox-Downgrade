
export interface MapJob {
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

export interface MapEmployee {
  id: string;
  name: string;
  coordinates: [number, number];
  color: string;
  status: 'active' | 'break' | 'inactive';
}

export interface MapViewProps {
  jobs: MapJob[];
  employees?: MapEmployee[];
  showEmployeeLocations?: boolean;
  compact?: boolean;
  height?: string;
}
