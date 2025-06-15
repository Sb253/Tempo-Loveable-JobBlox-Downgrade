import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuickActions } from "./QuickActions";
import { FinancialSummaryCard } from "./FinancialSummaryCard";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Users, 
  Briefcase, 
  DollarSign, 
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  Star
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
      status: "confirmed"
    },
    {
      id: 2,
      title: "Kitchen Installation",
      customer: "Mary Wilson",
      time: "1:00 PM",
      location: "456 Oak Ave",
      status: "pending"
    },
    {
      id: 3,
      title: "Home Inspection",
      customer: "Robert Brown",
      time: "3:30 PM",
      location: "789 Pine Rd",
      status: "confirmed"
    }
  ];

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

      {/* Activity and Jobs Grid */}
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

        {/* Today's Jobs */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">{job.title}</p>
                    <p className="text-sm text-muted-foreground">{job.customer}</p>
                    <p className="text-xs text-muted-foreground">{job.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{job.time}</p>
                    <Badge variant={job.status === 'confirmed' ? 'default' : 'outline'}>
                      {job.status}
                    </Badge>
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
