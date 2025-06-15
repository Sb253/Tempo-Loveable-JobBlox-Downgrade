
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Play, Pause, Square, Timer, CalendarDays } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TimeEntry {
  id: string;
  employee: string;
  job: string;
  startTime: string;
  endTime?: string;
  duration: number;
  status: 'active' | 'paused' | 'completed';
  date: string;
}

const mockTimeEntries: TimeEntry[] = [
  {
    id: '1',
    employee: 'Mike Johnson',
    job: 'Kitchen Renovation',
    startTime: '08:00 AM',
    endTime: '12:00 PM',
    duration: 240,
    status: 'completed',
    date: '2024-01-15'
  },
  {
    id: '2',
    employee: 'Sarah Davis',
    job: 'Bathroom Repair',
    startTime: '09:30 AM',
    duration: 90,
    status: 'active',
    date: '2024-01-15'
  },
  {
    id: '3',
    employee: 'Tom Wilson',
    job: 'Deck Installation',
    startTime: '10:15 AM',
    endTime: '11:45 AM',
    duration: 90,
    status: 'paused',
    date: '2024-01-15'
  }
];

export const TimeTracking = () => {
  const { toast } = useToast();
  const [timeEntries] = useState<TimeEntry[]>(mockTimeEntries);
  const [selectedEmployee, setSelectedEmployee] = useState('all');
  const [selectedDate, setSelectedDate] = useState('today');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const handleTimeAction = (action: string, entryId: string) => {
    console.log(`${action} time tracking for entry ${entryId}`);
    toast({
      title: "Time Tracking Updated",
      description: `Time tracking ${action}ed successfully.`,
    });
  };

  const totalHoursToday = timeEntries
    .filter(entry => entry.date === '2024-01-15')
    .reduce((total, entry) => total + entry.duration, 0);

  const activeEmployees = timeEntries.filter(entry => entry.status === 'active').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Employee Time Tracking</h2>
        <Button className="flex items-center gap-2">
          <Play className="h-4 w-4" />
          Start New Timer
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours Today</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatDuration(totalHoursToday)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Timers</CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeEmployees}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Daily Hours</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.5h</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overtime Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5h</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Time Entries</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select employee" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Employees</SelectItem>
              <SelectItem value="mike">Mike Johnson</SelectItem>
              <SelectItem value="sarah">Sarah Davis</SelectItem>
              <SelectItem value="tom">Tom Wilson</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedDate} onValueChange={setSelectedDate}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
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
                <TableHead>Job</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>End Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {timeEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{entry.employee}</TableCell>
                  <TableCell>{entry.job}</TableCell>
                  <TableCell>{entry.startTime}</TableCell>
                  <TableCell>{entry.endTime || 'In Progress'}</TableCell>
                  <TableCell>{formatDuration(entry.duration)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(entry.status)}>
                      {entry.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {entry.status === 'active' && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleTimeAction('pause', entry.id)}
                          >
                            <Pause className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleTimeAction('stop', entry.id)}
                          >
                            <Square className="h-3 w-3" />
                          </Button>
                        </>
                      )}
                      {entry.status === 'paused' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleTimeAction('resume', entry.id)}
                        >
                          <Play className="h-3 w-3" />
                        </Button>
                      )}
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
