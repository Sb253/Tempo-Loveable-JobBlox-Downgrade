import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuickActions } from "./QuickActions";
import { FinancialSummaryCard } from "./FinancialSummaryCard";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Users, 
  Briefcase, 
  DollarSign, 
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  Star,
  MapPin,
  Navigation,
  User
} from "lucide-react";

interface DashboardProps {
  onSectionChange?: (section: string) => void;
}

export const Dashboard = ({ onSectionChange }: DashboardProps) => {
  const stats = [
    {
      title: "Active Jobs",
      value: "12",
      change: "+2 from last week",
      trend: "up",
      icon: Briefcase,
      color: "text-blue-600"
    },
    {
      title: "Total Customers",
      value: "89",
      change: "+5 new this month",
      trend: "up",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Revenue (MTD)",
      value: "$45,230",
      change: "+12% from last month",
      trend: "up",
      icon: DollarSign,
      color: "text-emerald-600"
    },
    {
      title: "Appointments Today",
      value: "6",
      change: "2 confirmed, 4 pending",
      trend: "neutral",
      icon: Calendar,
      color: "text-purple-600"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: "job_completed",
      title: "Kitchen renovation completed",
      customer: "Sarah Johnson",
      time: "2 hours ago",
      status: "completed",
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      id: 2,
      type: "appointment_scheduled",
      title: "New appointment scheduled",
      customer: "Mike Davis",
      time: "4 hours ago",
      status: "scheduled",
      icon: Calendar,
      color: "text-blue-600"
    },
    {
      id: 3,
      type: "payment_received",
      title: "Payment received - $2,500",
      customer: "ABC Construction",
      time: "6 hours ago",
      status: "paid",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      id: 4,
      type: "issue_reported",
      title: "Equipment maintenance needed",
      customer: "Internal",
      time: "1 day ago",
      status: "urgent",
      icon: AlertTriangle,
      color: "text-red-600"
    },
    {
      id: 5,
      type: "review_received",
      title: "5-star review received",
      customer: "Jennifer Lee",
      time: "2 days ago",
      status: "positive",
      icon: Star,
      color: "text-yellow-600"
    }
  ];

  const upcomingJobs = [
    {
      id: 1,
      title: "Bathroom Remodel",
      customer: "John Smith",
      time: "9:00 AM",
      location: "123 Main St",
      status: "confirmed",
      employee: "Mike Johnson",
      coordinates: [-74.006, 40.7128] as [number, number]
    },
    {
      id: 2,
      title: "Kitchen Installation",
      customer: "Mary Wilson",
      time: "1:00 PM",
      location: "456 Oak Ave",
      status: "pending",
      employee: "Sarah Davis",
      coordinates: [-74.0, 40.72] as [number, number]
    },
    {
      id: 3,
      title: "Home Inspection",
      customer: "Robert Brown",
      time: "3:30 PM",
      location: "789 Pine Rd",
      status: "confirmed",
      employee: "Tom Wilson",
      coordinates: [-73.99, 40.71] as [number, number]
    }
  ];

  const employeeSchedules = [
    {
      id: 1,
      name: "Mike Johnson",
      position: "Lead Technician",
      status: "active",
      currentLocation: "123 Main St",
      nextJob: "Bathroom Remodel - 9:00 AM",
      coordinates: [-74.006, 40.7128] as [number, number]
    },
    {
      id: 2,
      name: "Sarah Davis",
      position: "Project Manager",
      status: "driving",
      currentLocation: "En route to 456 Oak Ave",
      nextJob: "Kitchen Installation - 1:00 PM",
      coordinates: [-74.0, 40.72] as [number, number]
    },
    {
      id: 3,
      name: "Tom Wilson",
      position: "Electrician",
      status: "break",
      currentLocation: "Office",
      nextJob: "Home Inspection - 3:30 PM",
      coordinates: [-73.99, 40.71] as [number, number]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': 
      case 'active': 
        return 'bg-green-100 text-green-800';
      case 'pending': 
        return 'bg-yellow-100 text-yellow-800';
      case 'driving': 
        return 'bg-blue-100 text-blue-800';
      case 'break': 
        return 'bg-orange-100 text-orange-800';
      default: 
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.change}
                </p>
                {stat.trend === "up" && (
                  <div className="absolute top-2 right-2">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Financial Summary */}
      <FinancialSummaryCard />

      {/* Quick Actions */}
      <QuickActions 
        onSectionChange={onSectionChange}
        onScheduleJob={() => onSectionChange?.('schedule')}
        onAddCustomer={() => onSectionChange?.('customer-form')}
        onCreateEstimate={() => onSectionChange?.('estimates')}
        onCreateInvoice={() => onSectionChange?.('invoices')}
        onProcessPayment={() => onSectionChange?.('payment-integration')}
        onViewMap={() => onSectionChange?.('map-view')}
        onCreateQuote={() => onSectionChange?.('estimates')}
        onManageJobs={() => onSectionChange?.('jobs')}
        onInitialConsultation={() => onSectionChange?.('client-appointment')}
        onSiteAssessment={() => onSectionChange?.('client-appointment')}
        onClientInformation={() => onSectionChange?.('customer-form')}
        onProjectProposal={() => onSectionChange?.('estimates')}
      />

      {/* Map Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Live Map - Jobs & Employee Locations
            </div>
            <div className="flex gap-2">
              <Badge variant="outline">
                {upcomingJobs.length} jobs
              </Badge>
              <Badge variant="outline">
                {employeeSchedules.filter(emp => emp.status === 'active').length} active employees
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Map Placeholder */}
            <div className="w-full h-64 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 rounded-lg flex items-center justify-center border-2 border-dashed border-border relative overflow-hidden">
              <div className="text-center space-y-2">
                <MapPin className="h-12 w-12 mx-auto text-muted-foreground" />
                <p className="text-muted-foreground">Interactive Map View</p>
                <p className="text-sm text-muted-foreground">
                  Showing job locations and employee positions
                </p>
              </div>
              
              {/* Mock job markers */}
              {upcomingJobs.map((job, index) => (
                <div 
                  key={job.id}
                  className="absolute w-6 h-6 bg-blue-500 rounded-full text-white text-xs flex items-center justify-center font-bold shadow-lg animate-pulse"
                  style={{
                    top: `${20 + index * 20}%`,
                    left: `${25 + index * 25}%`,
                  }}
                  title={job.title}
                >
                  J
                </div>
              ))}
              
              {/* Mock employee markers */}
              {employeeSchedules.map((employee, index) => (
                <div 
                  key={employee.id}
                  className={`absolute w-6 h-6 rounded-full text-white text-xs flex items-center justify-center font-bold shadow-lg ${
                    employee.status === 'active' ? 'bg-green-500' : 
                    employee.status === 'driving' ? 'bg-orange-500' : 'bg-gray-500'
                  }`}
                  style={{
                    top: `${30 + index * 15}%`,
                    right: `${20 + index * 20}%`,
                  }}
                  title={employee.name}
                >
                  E
                </div>
              ))}
            </div>
            
            {/* Map Controls */}
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Jobs</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Active Employees</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span>En Route</span>
                </div>
              </div>
              <button 
                onClick={() => onSectionChange?.('map-view')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
              >
                <Navigation className="h-4 w-4" />
                View Full Map
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity and Enhanced Schedule Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className={`p-2 rounded-full bg-muted ${activity.color}`}>
                      <Icon className="h-3 w-3" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.customer}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <Badge variant={
                      activity.status === 'completed' ? 'default' :
                      activity.status === 'urgent' ? 'destructive' :
                      activity.status === 'positive' ? 'secondary' : 'outline'
                    }>
                      {activity.status}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="jobs" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="jobs">Jobs Schedule</TabsTrigger>
                <TabsTrigger value="employees">Employee Schedule</TabsTrigger>
              </TabsList>
              
              <TabsContent value="jobs" className="space-y-4 mt-4">
                {upcomingJobs.map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">{job.title}</p>
                      <p className="text-sm text-muted-foreground">{job.customer}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <User className="h-3 w-3" />
                        {job.employee}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{job.time}</p>
                      <Badge variant={job.status === 'confirmed' ? 'default' : 'outline'}>
                        {job.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="employees" className="space-y-4 mt-4">
                {employeeSchedules.map((employee) => (
                  <div key={employee.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">{employee.name}</p>
                      <p className="text-sm text-muted-foreground">{employee.position}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {employee.currentLocation}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {employee.nextJob}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(employee.status)}>
                        {employee.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
