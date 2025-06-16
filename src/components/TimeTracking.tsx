
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { businessDataManager, type TimeEntry } from '../utils/businessDataManager';
import { Play, Pause, StopCircle, Clock, Plus, MapPin, User } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export const TimeTracking = () => {
  const { toast } = useToast();
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [activeTimer, setActiveTimer] = useState<string | null>(null);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newEntry, setNewEntry] = useState({
    employeeId: '',
    jobId: '',
    description: '',
    startTime: new Date().toISOString().slice(0, 16)
  });

  const employees = businessDataManager.getAllEmployees();
  const jobs = businessDataManager.getAllJobs();

  useEffect(() => {
    loadTimeEntries();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeTimer) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeTimer]);

  const loadTimeEntries = () => {
    const data = businessDataManager.getAllTimeEntries();
    setTimeEntries(data);
    
    // Check for active timers
    const activeEntry = data.find(entry => entry.status === 'in-progress');
    if (activeEntry) {
      setActiveTimer(activeEntry.id);
      const startTime = new Date(activeEntry.startTime).getTime();
      const now = new Date().getTime();
      const elapsed = Math.floor((now - startTime) / 1000);
      setTimerSeconds(elapsed);
    }
  };

  const startTimer = () => {
    if (!newEntry.employeeId) {
      toast({
        title: "Validation Error",
        description: "Please select an employee",
        variant: "destructive"
      });
      return;
    }

    const selectedEmployee = employees.find(emp => emp.id === newEntry.employeeId);
    const selectedJob = jobs.find(job => job.id === newEntry.jobId);

    const timeEntry = businessDataManager.createTimeEntry({
      employeeId: newEntry.employeeId,
      employeeName: selectedEmployee?.name || 'Unknown Employee',
      jobId: newEntry.jobId || undefined,
      jobTitle: selectedJob?.title || undefined,
      startTime: new Date().toISOString(),
      breakTime: 0,
      totalHours: 0,
      description: newEntry.description,
      status: 'in-progress'
    });

    setActiveTimer(timeEntry.id);
    setTimerSeconds(0);
    setShowCreateDialog(false);
    loadTimeEntries();

    toast({
      title: "Timer Started",
      description: `Timer started for ${selectedEmployee?.name}`
    });
  };

  const stopTimer = (entryId: string) => {
    const entry = timeEntries.find(t => t.id === entryId);
    if (!entry) return;

    const endTime = new Date().toISOString();
    const startTime = new Date(entry.startTime).getTime();
    const endTimeMs = new Date(endTime).getTime();
    const totalHours = (endTimeMs - startTime - (entry.breakTime * 60 * 1000)) / (1000 * 60 * 60);

    const updatedEntry = {
      ...entry,
      endTime,
      totalHours: Math.round(totalHours * 100) / 100,
      status: 'completed' as const
    };

    businessDataManager.saveTimeEntry(updatedEntry);
    setActiveTimer(null);
    setTimerSeconds(0);
    loadTimeEntries();

    toast({
      title: "Timer Stopped",
      description: `Logged ${totalHours.toFixed(2)} hours`
    });
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDuration = (hours: number) => {
    if (hours < 1) {
      return `${Math.round(hours * 60)}m`;
    }
    return `${hours.toFixed(1)}h`;
  };

  const todayEntries = timeEntries.filter(entry => 
    new Date(entry.startTime).toDateString() === new Date().toDateString()
  );

  const totalHoursToday = todayEntries.reduce((sum, entry) => sum + entry.totalHours, 0);
  const activeEntries = timeEntries.filter(entry => entry.status === 'in-progress').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Time Tracking</h2>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button disabled={!!activeTimer}>
              <Play className="h-4 w-4 mr-2" />
              Start Timer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Start Time Tracking</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="employee">Employee *</Label>
                <Select value={newEntry.employeeId} onValueChange={(value) => setNewEntry(prev => ({ ...prev, employeeId: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map(emp => (
                      <SelectItem key={emp.id} value={emp.id}>{emp.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="job">Job (Optional)</Label>
                <Select value={newEntry.jobId} onValueChange={(value) => setNewEntry(prev => ({ ...prev, jobId: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select job" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">No specific job</SelectItem>
                    {jobs.map(job => (
                      <SelectItem key={job.id} value={job.id}>{job.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newEntry.description}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="What work is being performed?"
                  rows={2}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={startTimer}>
                  <Play className="h-4 w-4 mr-2" />
                  Start Timer
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHoursToday.toFixed(1)}h</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Timers</CardTitle>
            <Play className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeEntries}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Timer</CardTitle>
            <StopCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {activeTimer ? formatTime(timerSeconds) : '--:--:--'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Timer Display */}
      {activeTimer && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold">Timer Active</span>
                </div>
                <div className="text-3xl font-mono font-bold text-green-700">
                  {formatTime(timerSeconds)}
                </div>
              </div>
              <Button 
                variant="destructive" 
                onClick={() => activeTimer && stopTimer(activeTimer)}
                size="lg"
              >
                <StopCircle className="h-4 w-4 mr-2" />
                Stop Timer
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Time Entries List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Time Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {timeEntries.slice(0, 10).map((entry) => (
              <div key={entry.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold">{entry.employeeName}</span>
                      </div>
                      
                      <Badge variant={entry.status === 'in-progress' ? 'default' : 'secondary'}>
                        {entry.status === 'in-progress' ? (
                          <>
                            <Play className="h-3 w-3 mr-1" />
                            Active
                          </>
                        ) : (
                          <>
                            <Clock className="h-3 w-3 mr-1" />
                            {formatDuration(entry.totalHours)}
                          </>
                        )}
                      </Badge>

                      {entry.jobTitle && (
                        <Badge variant="outline">{entry.jobTitle}</Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                      <div>
                        <span className="font-medium">Started:</span> {new Date(entry.startTime).toLocaleString()}
                      </div>
                      {entry.endTime && (
                        <div>
                          <span className="font-medium">Ended:</span> {new Date(entry.endTime).toLocaleString()}
                        </div>
                      )}
                      <div>
                        <span className="font-medium">Duration:</span> 
                        {entry.status === 'in-progress' ? (
                          <span className="text-green-600 font-bold ml-1">
                            {entry.id === activeTimer ? formatTime(timerSeconds) : 'Active'}
                          </span>
                        ) : (
                          <span className="ml-1">{formatDuration(entry.totalHours)}</span>
                        )}
                      </div>
                    </div>
                    
                    {entry.description && (
                      <p className="text-sm text-muted-foreground mt-2">{entry.description}</p>
                    )}
                  </div>

                  {entry.status === 'in-progress' && entry.id !== activeTimer && (
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => stopTimer(entry.id)}
                    >
                      <StopCircle className="h-4 w-4 mr-1" />
                      Stop
                    </Button>
                  )}
                </div>
              </div>
            ))}

            {timeEntries.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No time entries found. Start tracking time to see entries here.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
