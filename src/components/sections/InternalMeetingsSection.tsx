
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Plus, Video, MapPin } from "lucide-react";

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  attendees: string[];
  location: string;
  type: 'in-person' | 'virtual';
  status: 'scheduled' | 'completed' | 'cancelled';
}

export const InternalMeetingsSection = () => {
  const [meetings] = useState<Meeting[]>([
    {
      id: '1',
      title: 'Weekly Team Standup',
      date: '2024-06-25',
      time: '09:00',
      duration: '30 min',
      attendees: ['John Doe', 'Jane Smith', 'Mike Johnson'],
      location: 'Conference Room A',
      type: 'in-person',
      status: 'scheduled'
    },
    {
      id: '2',
      title: 'Project Planning Session',
      date: '2024-06-26',
      time: '14:00',
      duration: '60 min',
      attendees: ['Sarah Wilson', 'Tom Brown', 'Lisa Davis'],
      location: 'Virtual - Zoom',
      type: 'virtual',
      status: 'scheduled'
    },
    {
      id: '3',
      title: 'Monthly Review',
      date: '2024-06-20',
      time: '10:00',
      duration: '90 min',
      attendees: ['All Team', 'Management'],
      location: 'Main Hall',
      type: 'in-person',
      status: 'completed'
    }
  ]);

  const [newMeeting, setNewMeeting] = useState({
    title: '',
    date: '',
    time: '',
    duration: '',
    location: ''
  });

  const upcomingMeetings = meetings.filter(m => m.status === 'scheduled');
  const completedMeetings = meetings.filter(m => m.status === 'completed');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateMeeting = () => {
    console.log('Creating meeting:', newMeeting);
    // Here you would implement the meeting creation logic
    setNewMeeting({
      title: '',
      date: '',
      time: '',
      duration: '',
      location: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calendar className="h-6 w-6 text-blue-600" />
          <div>
            <h2 className="text-xl font-semibold">Internal Meetings</h2>
            <p className="text-sm text-muted-foreground">
              Manage team meetings and schedules
            </p>
          </div>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Schedule Meeting
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{upcomingMeetings.length}</p>
              <p className="text-sm text-muted-foreground">Upcoming</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{completedMeetings.length}</p>
              <p className="text-sm text-muted-foreground">Completed This Month</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {meetings.filter(m => m.type === 'virtual').length}
              </p>
              <p className="text-sm text-muted-foreground">Virtual Meetings</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create New Meeting */}
      <Card>
        <CardHeader>
          <CardTitle>Schedule New Meeting</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Meeting Title</Label>
              <Input
                id="title"
                placeholder="Enter meeting title"
                value={newMeeting.title}
                onChange={(e) => setNewMeeting(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={newMeeting.date}
                onChange={(e) => setNewMeeting(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={newMeeting.time}
                onChange={(e) => setNewMeeting(prev => ({ ...prev, time: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                placeholder="e.g., 30 min, 1 hour"
                value={newMeeting.duration}
                onChange={(e) => setNewMeeting(prev => ({ ...prev, duration: e.target.value }))}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Conference room or virtual link"
              value={newMeeting.location}
              onChange={(e) => setNewMeeting(prev => ({ ...prev, location: e.target.value }))}
            />
          </div>
          <Button onClick={handleCreateMeeting} className="w-full">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Meeting
          </Button>
        </CardContent>
      </Card>

      {/* Meetings List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Meetings */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Meetings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingMeetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className="border rounded-lg p-4 hover:bg-gray-50"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium">{meeting.title}</h3>
                    <Badge className={getStatusColor(meeting.status)}>
                      {meeting.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{meeting.date}</span>
                      <Clock className="h-4 w-4 ml-2" />
                      <span>{meeting.time} ({meeting.duration})</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {meeting.type === 'virtual' ? (
                        <Video className="h-4 w-4" />
                      ) : (
                        <MapPin className="h-4 w-4" />
                      )}
                      <span>{meeting.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{meeting.attendees.join(', ')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Meetings */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Meetings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {completedMeetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className="border rounded-lg p-4 opacity-75"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium">{meeting.title}</h3>
                    <Badge className={getStatusColor(meeting.status)}>
                      {meeting.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{meeting.date}</span>
                      <Clock className="h-4 w-4 ml-2" />
                      <span>{meeting.time} ({meeting.duration})</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{meeting.attendees.join(', ')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
