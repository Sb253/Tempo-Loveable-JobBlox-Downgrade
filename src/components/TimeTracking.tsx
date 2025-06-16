
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Square, Clock, Calendar, User } from "lucide-react";

interface TimeEntry {
  id: string;
  employee: string;
  job: string;
  startTime: string;
  endTime?: string;
  duration: number;
  description: string;
  status: 'active' | 'completed';
}

const mockTimeEntries: TimeEntry[] = [
  {
    id: '1',
    employee: 'John Smith',
    job: 'Kitchen Renovation',
    startTime: '2024-12-16T08:00:00',
    endTime: '2024-12-16T17:00:00',
    duration: 8,
    description: 'Cabinet installation',
    status: 'completed'
  },
  {
    id: '2',
    employee: 'Mike Johnson',
    job: 'Bathroom Repair',
    startTime: '2024-12-16T09:00:00',
    duration: 3.5,
    description: 'Plumbing work',
    status: 'active'
  }
];

export const TimeTracking = () => {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>(mockTimeEntries);
  const [activeTimer, setActiveTimer] = useState<string | null>('2');

  const startTimer = (entryId: string) => {
    setActiveTimer(entryId);
    setTimeEntries(prev => prev.map(entry => 
      entry.id === entryId 
        ? { ...entry, status: 'active' as const, startTime: new Date().toISOString() }
        : entry
    ));
  };

  const stopTimer = (entryId: string) => {
    setActiveTimer(null);
    setTimeEntries(prev => prev.map(entry => 
      entry.id === entryId 
        ? { 
            ...entry, 
            status: 'completed' as const, 
            endTime: new Date().toISOString(),
            duration: calculateDuration(entry.startTime, new Date().toISOString())
          }
        : entry
    ));
  };

  const calculateDuration = (start: string, end: string): number => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    return Math.round(((endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60)) * 10) / 10;
  };

  const formatTime = (hours: number): string => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  const totalHours = timeEntries.reduce((sum, entry) => sum + entry.duration, 0);
  const activeEntries = timeEntries.filter(entry => entry.status === 'active').length;

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Time Tracking</h2>
        <Button className="flex items-center gap-2">
          <Play className="h-4 w-4" />
          Start New Timer
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{formatTime(totalHours)}</p>
                <p className="text-sm text-muted-foreground">Total Hours</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Play className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{activeEntries}</p>
                <p className="text-sm text-muted-foreground">Active Timers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <User className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{new Set(timeEntries.map(e => e.employee)).size}</p>
                <p className="text-sm text-muted-foreground">Employees</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{timeEntries.length}</p>
                <p className="text-sm text-muted-foreground">Entries Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Start Timer */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Start</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input placeholder="Employee name" />
            <Input placeholder="Job/Project" />
            <Button className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              Start Timer
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Time Entries Table */}
      <Card>
        <CardHeader>
          <CardTitle>Time Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Job/Project</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {timeEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{entry.employee}</TableCell>
                  <TableCell>{entry.job}</TableCell>
                  <TableCell>
                    {new Date(entry.startTime).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatTime(entry.duration)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={entry.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {entry.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{entry.description}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {entry.status === 'active' ? (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => stopTimer(entry.id)}
                          className="flex items-center gap-1"
                        >
                          <Square className="h-3 w-3" />
                          Stop
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => startTimer(entry.id)}
                          className="flex items-center gap-1"
                        >
                          <Play className="h-3 w-3" />
                          Start
                        </Button>
                      )}
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
