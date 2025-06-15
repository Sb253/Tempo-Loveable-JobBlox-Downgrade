
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Cloud, CloudRain, Sun, AlertTriangle, Calendar, Clock, MapPin } from "lucide-react";

interface WeatherAlert {
  id: string;
  type: 'severe' | 'warning' | 'watch';
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  affectedJobs: string[];
}

interface JobSchedule {
  id: string;
  name: string;
  location: string;
  scheduledDate: string;
  weatherSensitive: boolean;
  crew: string[];
  status: 'scheduled' | 'postponed' | 'confirmed';
}

export const WeatherAlerts = () => {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<WeatherAlert[]>([
    {
      id: '1',
      type: 'warning',
      title: 'Heavy Rain Warning',
      description: 'Heavy rainfall expected with accumulations of 2-4 inches',
      startTime: '2024-12-16 08:00',
      endTime: '2024-12-16 18:00',
      affectedJobs: ['job-1', 'job-3']
    },
    {
      id: '2',
      type: 'watch',
      title: 'High Wind Watch',
      description: 'Winds up to 35 mph possible this afternoon',
      startTime: '2024-12-16 14:00',
      endTime: '2024-12-16 20:00',
      affectedJobs: ['job-2']
    }
  ]);

  const [jobSchedules, setJobSchedules] = useState<JobSchedule[]>([
    {
      id: 'job-1',
      name: 'Roofing - Johnson Residence',
      location: '123 Oak Street',
      scheduledDate: '2024-12-16',
      weatherSensitive: true,
      crew: ['John Smith', 'Mike Wilson'],
      status: 'scheduled'
    },
    {
      id: 'job-2',
      name: 'Siding Installation - Davis Home',
      location: '456 Pine Avenue',
      scheduledDate: '2024-12-16',
      weatherSensitive: true,
      crew: ['Sarah Johnson'],
      status: 'scheduled'
    },
    {
      id: 'job-3',
      name: 'Foundation Work - Brown Property',
      location: '789 Maple Drive',
      scheduledDate: '2024-12-16',
      weatherSensitive: true,
      crew: ['Tom Anderson', 'Lisa Garcia'],
      status: 'scheduled'
    }
  ]);

  const [settings, setSettings] = useState({
    autoReschedule: true,
    rainThreshold: 0.5,
    windThreshold: 25,
    temperatureThreshold: 35,
    notifyTeam: true
  });

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'severe': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'watch': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'postponed': return 'bg-red-100 text-red-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handlePostponeJob = (jobId: string) => {
    setJobSchedules(prev => prev.map(job => 
      job.id === jobId ? { ...job, status: 'postponed' as const } : job
    ));
    
    toast({
      title: "Job Postponed",
      description: "The job has been postponed due to weather conditions.",
    });
  };

  const handleConfirmJob = (jobId: string) => {
    setJobSchedules(prev => prev.map(job => 
      job.id === jobId ? { ...job, status: 'confirmed' as const } : job
    ));
    
    toast({
      title: "Job Confirmed",
      description: "The job has been confirmed despite weather conditions.",
    });
  };

  const currentWeather = {
    temperature: 45,
    condition: 'cloudy',
    humidity: 75,
    windSpeed: 12,
    precipitation: 0.2
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return <Sun className="h-6 w-6 text-yellow-500" />;
      case 'rainy': return <CloudRain className="h-6 w-6 text-blue-500" />;
      default: return <Cloud className="h-6 w-6 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Weather Alerts & Scheduling</h2>
        <Button variant="outline">
          <AlertTriangle className="h-4 w-4 mr-2" />
          Alert Settings
        </Button>
      </div>

      {/* Current Weather */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {getWeatherIcon(currentWeather.condition)}
              <div>
                <h3 className="text-2xl font-bold">{currentWeather.temperature}°F</h3>
                <p className="text-muted-foreground">Partly Cloudy</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-sm text-muted-foreground">Humidity</p>
                <p className="font-semibold">{currentWeather.humidity}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Wind</p>
                <p className="font-semibold">{currentWeather.windSpeed} mph</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rain</p>
                <p className="font-semibold">{currentWeather.precipitation}"</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Alerts */}
      {alerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Active Weather Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className={`p-4 border rounded-lg ${getAlertColor(alert.type)}`}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{alert.title}</h3>
                  <Badge variant="outline" className={getAlertColor(alert.type)}>
                    {alert.type}
                  </Badge>
                </div>
                <p className="text-sm mb-3">{alert.description}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span>
                    <Clock className="h-3 w-3 inline mr-1" />
                    {alert.startTime} - {alert.endTime}
                  </span>
                  <span>
                    <MapPin className="h-3 w-3 inline mr-1" />
                    {alert.affectedJobs.length} jobs affected
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Weather-Sensitive Jobs */}
      <Card>
        <CardHeader>
          <CardTitle>Weather-Sensitive Jobs Today</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {jobSchedules.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">{job.name}</h3>
                    <p className="text-sm text-muted-foreground">{job.location}</p>
                    <p className="text-sm text-muted-foreground">
                      Crew: {job.crew.join(', ')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(job.status)}>
                    {job.status}
                  </Badge>
                  
                  {job.status === 'scheduled' && (
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handlePostponeJob(job.id)}
                      >
                        Postpone
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleConfirmJob(job.id)}
                      >
                        Confirm
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weather Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Weather Alert Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-reschedule">Auto-Reschedule Jobs</Label>
              <p className="text-sm text-muted-foreground">Automatically postpone weather-sensitive jobs</p>
            </div>
            <Switch
              id="auto-reschedule"
              checked={settings.autoReschedule}
              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoReschedule: checked }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="notify-team">Notify Team</Label>
              <p className="text-sm text-muted-foreground">Send weather alerts to team members</p>
            </div>
            <Switch
              id="notify-team"
              checked={settings.notifyTeam}
              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, notifyTeam: checked }))}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div>
              <Label>Rain Threshold (inches)</Label>
              <p className="text-2xl font-bold text-blue-600">{settings.rainThreshold}"</p>
            </div>
            <div>
              <Label>Wind Threshold (mph)</Label>
              <p className="text-2xl font-bold text-orange-600">{settings.windThreshold}</p>
            </div>
            <div>
              <Label>Temperature Threshold (°F)</Label>
              <p className="text-2xl font-bold text-red-600">{settings.temperatureThreshold}°</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
