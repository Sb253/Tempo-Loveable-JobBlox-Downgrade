import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const DashboardPage = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: "Active Jobs",
      value: "24",
      icon: Calendar,
      trend: "+12% from last month",
      color: "text-blue-600",
    },
    {
      title: "Total Customers",
      value: "156",
      icon: Users,
      trend: "+8% from last month",
      color: "text-green-600",
    },
    {
      title: "Monthly Revenue",
      value: "$45,230",
      icon: DollarSign,
      trend: "+15% from last month",
      color: "text-purple-600",
    },
    {
      title: "Completion Rate",
      value: "94%",
      icon: CheckCircle,
      trend: "+2% from last month",
      color: "text-emerald-600",
    },
  ];

  const recentJobs = [
    {
      id: 1,
      title: "Kitchen Renovation",
      customer: "John Smith",
      status: "in-progress",
      dueDate: "2024-02-15",
      value: "$12,500",
    },
    {
      id: 2,
      title: "Bathroom Remodel",
      customer: "Sarah Johnson",
      status: "scheduled",
      dueDate: "2024-02-20",
      value: "$8,750",
    },
    {
      id: 3,
      title: "Deck Construction",
      customer: "Mike Wilson",
      status: "completed",
      dueDate: "2024-02-10",
      value: "$15,200",
    },
  ];

  const upcomingTasks = [
    {
      id: 1,
      task: "Site inspection at 123 Main St",
      time: "9:00 AM",
      priority: "high",
    },
    {
      id: 2,
      task: "Client meeting with ABC Corp",
      time: "2:00 PM",
      priority: "medium",
    },
    {
      id: 3,
      task: "Material delivery coordination",
      time: "4:30 PM",
      priority: "low",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "scheduled":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Building2 className="h-8 w-8 text-primary" />
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {user?.name || "User"}! Here's what's happening today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            <CheckCircle className="h-3 w-3 mr-1" />
            All Systems Operational
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.trend}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Jobs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recent Jobs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <h4 className="font-medium">{job.title}</h4>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {job.customer}
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Due: {job.dueDate}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(job.status)}>
                      {job.status}
                    </Badge>
                    <p className="text-sm font-medium mt-1">{job.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button className="w-full" variant="outline">
                View All Jobs
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Today's Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Today's Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <h4 className="font-medium">{task.task}</h4>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {task.time}
                    </p>
                  </div>
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button className="w-full" variant="outline">
                View All Tasks
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col gap-2">
              <Users className="h-6 w-6" />
              <span className="text-sm">Add Customer</span>
            </Button>
            <Button className="h-20 flex flex-col gap-2" variant="outline">
              <Calendar className="h-6 w-6" />
              <span className="text-sm">Schedule Job</span>
            </Button>
            <Button className="h-20 flex flex-col gap-2" variant="outline">
              <DollarSign className="h-6 w-6" />
              <span className="text-sm">Create Invoice</span>
            </Button>
            <Button className="h-20 flex flex-col gap-2" variant="outline">
              <TrendingUp className="h-6 w-6" />
              <span className="text-sm">View Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
