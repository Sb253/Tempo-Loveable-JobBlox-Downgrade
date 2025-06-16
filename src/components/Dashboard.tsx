import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuickActions } from "./QuickActions";
import { EditableRecentJobs } from "./EditableRecentJobs";
import { LocalTimeDisplay } from "./LocalTimeDisplay";
import { 
  TrendingUp, 
  Calendar, 
  Users, 
  DollarSign, 
  Clock,
  CheckCircle,
  AlertCircle,
  MapPin,
  Wrench,
  Phone
} from "lucide-react";

interface Stat {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface Activity {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const initialActivities: Activity[] = [
  {
    id: '1',
    title: 'Scheduled Site Visit',
    description: 'Visited the new construction site for initial assessment.',
    time: '30 mins ago',
    icon: Calendar,
    color: 'text-blue-500'
  },
  {
    id: '2',
    title: 'New Customer Added',
    description: 'Added Sarah Johnson as a new customer for the upcoming project.',
    time: '1 hour ago',
    icon: Users,
    color: 'text-green-500'
  },
  {
    id: '3',
    title: 'Invoice Sent',
    description: 'Sent invoice #1023 to John Smith for the completed renovation.',
    time: '2 hours ago',
    icon: DollarSign,
    color: 'text-orange-500'
  },
  {
    id: '4',
    title: 'Payment Received',
    description: 'Received payment of $2,500 from ABC Corp for project kickoff.',
    time: '4 hours ago',
    icon: CheckCircle,
    color: 'text-emerald-500'
  }
];

export const Dashboard = () => {
  const [stats] = useState([
    { title: 'Total Revenue', value: '$48,590', change: '+12%', icon: DollarSign, color: 'text-green-600' },
    { title: 'Active Jobs', value: '23', change: '+3', icon: Wrench, color: 'text-blue-600' },
    { title: 'New Customers', value: '12', change: '+8%', icon: Users, color: 'text-purple-600' },
    { title: 'Completion Rate', value: '94%', change: '+2%', icon: CheckCircle, color: 'text-emerald-600' }
  ]);

  const [recentActivities] = useState(initialActivities);

  return (
    <div className="space-y-6">
      {/* Header with Time */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-muted-foreground">Here's what's happening with your business today.</p>
        </div>
        <LocalTimeDisplay />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-border/40 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-sm ${stat.color}`}>{stat.change} from last month</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions - spans 2 columns */}
        <div className="lg:col-span-2">
          <QuickActions />
        </div>

        {/* Recent Activity */}
        <Card className="border-border/40 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <Icon className={`h-4 w-4 mt-1 ${activity.color}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Jobs & Locations - Full width */}
      <EditableRecentJobs />
    </div>
  );
};
