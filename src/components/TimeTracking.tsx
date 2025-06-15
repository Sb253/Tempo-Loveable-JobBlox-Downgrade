
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Play, 
  Pause, 
  Square, 
  Clock, 
  Calendar, 
  User, 
  MapPin, 
  DollarSign,
  Plus,
  Edit,
  Trash2,
  Filter,
  Download
} from "lucide-react";

interface TimeEntry {
  id: string;
  jobId: string;
  jobTitle: string;
  customer: string;
  technician: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // in minutes
  description: string;
  isActive: boolean;
  billableRate: number;
  totalAmount: number;
  category: 'job' | 'appointment' | 'travel' | 'admin';
}

const mockTimeEntries: TimeEntry[] = [
  {
    id: '1',
    jobId: 'J001',
    jobTitle: 'Kitchen Renovation',
    customer: 'John Smith',
    technician: 'Mike Johnson',
    startTime: new Date('2024-12-15T09:00:00'),
    endTime: new Date('2024-12-15T12:30:00'),
    duration: 210,
    description: 'Cabinet installation and measurements',
    isActive: false,
    billableRate: 75,
    totalAmount: 262.5,
    category: 'job'
  },
  {
    id: '2',
    jobId: 'A001',
    jobTitle: 'Consultation Meeting',
    customer: 'Sarah Johnson',
    technician: 'Sarah Davis',
    startTime: new Date('2024-12-15T14:00:00'),
    endTime: new Date('2024-12-15T15:30:00'),
    duration: 90,
    description: 'Initial consultation and project discussion',
    isActive: false,
    billableRate: 85,
    totalAmount: 127.5,
    category: 'appointment'
  },
  {
    id: '3',
    jobId: 'J002',
    jobTitle: 'Bathroom Repair',
    customer: 'ABC Construction',
    technician: 'Tom Wilson',
    startTime: new Date(),
    duration: 45,
    description: 'Plumbing repairs in progress',
    isActive: true,
    billableRate: 80,
    totalAmount: 0,
    category: 'job'
  }
];

export const TimeTracking = () => {
  const { toast } = useToast();
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>(mockTimeEntries);
  const [activeTimer, setActiveTimer] = useState<string | null>('3');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterTechnician, setFilterTechnician] = useState<string>('all');

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const startTimer = (entryId: string) => {
    setTimeEntries(prev => prev.map(entry => {
      if (entry.id === entryId) {
        return {
          ...entry,
          isActive: true,
          startTime: new Date()
        };
      }
      return { ...entry, isActive: false };
    }));
    setActiveTimer(entryId);
    
    const entry = timeEntries.find(e => e.id === entryId);
    toast({
      title: "Timer Started",
      description: `Started tracking time for ${entry?.jobTitle}`,
    });
  };

  const pauseTimer = (entryId: string) => {
    setTimeEntries(prev => prev.map(entry => {
      if (entry.id === entryId && entry.isActive) {
        const now = new Date();
        const additionalTime = Math.floor((now.getTime() - entry.startTime.getTime()) / 1000 / 60);
        return {
          ...entry,
          isActive: false,
          endTime: now,
          duration: entry.duration + additionalTime,
          totalAmount: ((entry.duration + additionalTime) / 60) * entry.billableRate
        };
      }
      return entry;
    }));
    setActiveTimer(null);
    
    toast({
      title: "Timer Paused",
      description: "Time tracking has been paused",
    });
  };

  const stopTimer = (entryId: string) => {
    pauseTimer(entryId);
    toast({
      title: "Timer Stopped",
      description: "Time entry has been completed",
    });
  };

  const getActiveDuration = (entry: TimeEntry) => {
    if (!entry.isActive) return entry.duration;
    
    const elapsed = Math.floor((currentTime.getTime() - entry.startTime.getTime()) / 1000 / 60);
    return entry.duration + elapsed;
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getTotalHours = () => {
    return timeEntries.reduce((total, entry) => total + getActiveDuration(entry), 0);
  };

  const getTotalRevenue = () => {
    return timeEntries.reduce((total, entry) => {
      if (entry.isActive) {
        const currentDuration = getActiveDuration(entry);
        return total + ((currentDuration / 60) * entry.billableRate);
      }
      return total + entry.totalAmount;
    }, 0);
  };

  const filteredEntries = timeEntries.filter(entry => {
    const matchesCategory = filterCategory === 'all' || entry.category === filterCategory;
    const matchesTechnician = filterTechnician === 'all' || entry.technician === filterTechnician;
    return matchesCategory && matchesTechnician;
  });

  const uniqueTechnicians = [...new Set(timeEntries.map(entry => entry.technician))];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Time Tracking</h1>
          <p className="text-muted-foreground">Track time spent on jobs and appointments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setShowNewEntry(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Entry
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours Today</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatDuration(getTotalHours())}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Timers</CardTitle>
            <Play className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{timeEntries.filter(e => e.isActive).length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Today</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${getTotalRevenue().toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Entries</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{timeEntries.filter(e => !e.isActive).length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="job">Jobs</SelectItem>
                  <SelectItem value="appointment">Appointments</SelectItem>
                  <SelectItem value="travel">Travel</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Technician</Label>
              <Select value={filterTechnician} onValueChange={setFilterTechnician}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Technicians</SelectItem>
                  {uniqueTechnicians.map(tech => (
                    <SelectItem key={tech} value={tech}>{tech}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time Entries */}
      <Card>
        <CardHeader>
          <CardTitle>Time Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredEntries.map((entry) => (
              <div key={entry.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div>
                      <h3 className="font-semibold">{entry.jobTitle}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {entry.customer}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {entry.technician}
                        </span>
                        <Badge variant="outline" className="capitalize">
                          {entry.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {entry.isActive ? (
                      <>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          <Play className="h-3 w-3 mr-1" />
                          Active - {formatDuration(getActiveDuration(entry))}
                        </Badge>
                        <Button size="sm" variant="outline" onClick={() => pauseTimer(entry.id)}>
                          <Pause className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => stopTimer(entry.id)}>
                          <Square className="h-3 w-3" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Badge variant="outline">
                          {formatDuration(entry.duration)}
                        </Badge>
                        <Button size="sm" variant="outline" onClick={() => startTimer(entry.id)}>
                          <Play className="h-3 w-3" />
                        </Button>
                      </>
                    )}
                    <Button size="sm" variant="ghost">
                      <Edit className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Start Time:</span>
                    <p className="text-muted-foreground">
                      {entry.startTime.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium">Rate:</span>
                    <p className="text-muted-foreground">${entry.billableRate}/hour</p>
                  </div>
                  <div>
                    <span className="font-medium">Amount:</span>
                    <p className="text-muted-foreground font-semibold">
                      ${entry.isActive 
                        ? ((getActiveDuration(entry) / 60) * entry.billableRate).toFixed(2)
                        : entry.totalAmount.toFixed(2)
                      }
                    </p>
                  </div>
                </div>

                {entry.description && (
                  <div className="mt-3">
                    <span className="text-sm font-medium">Description:</span>
                    <p className="text-sm text-muted-foreground">{entry.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
