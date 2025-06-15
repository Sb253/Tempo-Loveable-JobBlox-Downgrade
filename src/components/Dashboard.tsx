
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, DollarSign, Wrench } from "lucide-react";

export const Dashboard = () => {
  const stats = [
    {
      title: "Total Jobs",
      value: "24",
      icon: Calendar,
      trend: "+12% from last month"
    },
    {
      title: "Active Customers",
      value: "156",
      icon: Users,
      trend: "+8% from last month"
    },
    {
      title: "Monthly Revenue",
      value: "$45,230",
      icon: DollarSign,
      trend: "+23% from last month"
    },
    {
      title: "Completed Jobs",
      value: "89",
      icon: Wrench,
      trend: "+15% from last month"
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
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
        <Card>
          <CardHeader>
            <CardTitle>Recent Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 border rounded">
                <div>
                  <p className="font-medium">Kitchen Renovation</p>
                  <p className="text-sm text-muted-foreground">John Smith - Today 2:00 PM</p>
                </div>
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">Scheduled</span>
              </div>
              <div className="flex justify-between items-center p-3 border rounded">
                <div>
                  <p className="font-medium">Bathroom Repair</p>
                  <p className="text-sm text-muted-foreground">ABC Construction - Tomorrow 9:00 AM</p>
                </div>
                <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">In Progress</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full p-3 text-left border rounded hover:bg-muted">
              Schedule New Job
            </button>
            <button className="w-full p-3 text-left border rounded hover:bg-muted">
              Add New Customer
            </button>
            <button className="w-full p-3 text-left border rounded hover:bg-muted">
              Create Estimate
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
