
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, User } from "lucide-react";

interface ScheduleItem {
  id: string;
  title: string;
  customer: string;
  time: string;
  duration: string;
  location: string;
  status: 'scheduled' | 'in-progress' | 'completed';
  technician: string;
}

const mockScheduleItems: ScheduleItem[] = [
  {
    id: '1',
    title: 'Kitchen Renovation - Site Visit',
    customer: 'John Smith',
    time: '09:00',
    duration: '2h',
    location: '123 Main St, Anytown',
    status: 'scheduled',
    technician: 'Mike Johnson'
  },
  {
    id: '2',
    title: 'Bathroom Repair',
    customer: 'ABC Construction Inc.',
    time: '11:30',
    duration: '4h',
    location: '456 Business Ave, City',
    status: 'in-progress',
    technician: 'Sarah Davis'
  },
  {
    id: '3',
    title: 'Deck Installation - Materials Delivery',
    customer: 'Sarah Johnson',
    time: '14:00',
    duration: '1h',
    location: '789 Oak Drive, Hometown',
    status: 'scheduled',
    technician: 'Tom Wilson'
  }
];

export const ScheduleView = () => {
  const [scheduleItems] = useState<ScheduleItem[]>(mockScheduleItems);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Schedule</h2>
        <div className="flex items-center gap-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border rounded-md"
          />
          <Button>Add Appointment</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Today's Schedule - {new Date(selectedDate).toLocaleDateString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduleItems.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {item.customer}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {item.time} ({item.duration})
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {item.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        Technician: {item.technician}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">View Details</Button>
                      {item.status === 'scheduled' && (
                        <Button variant="default" size="sm">Start Job</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Schedule Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Today's Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Jobs</span>
                  <span className="font-semibold">{scheduleItems.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Scheduled</span>
                  <span className="font-semibold text-blue-600">
                    {scheduleItems.filter(item => item.status === 'scheduled').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">In Progress</span>
                  <span className="font-semibold text-yellow-600">
                    {scheduleItems.filter(item => item.status === 'in-progress').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Completed</span>
                  <span className="font-semibold text-green-600">
                    {scheduleItems.filter(item => item.status === 'completed').length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Technicians</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Mike Johnson</span>
                  <Badge variant="outline">Available</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Sarah Davis</span>
                  <Badge className="bg-yellow-100 text-yellow-800">Busy</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Tom Wilson</span>
                  <Badge variant="outline">Available</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
