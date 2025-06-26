import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Users,
  CreditCard,
  TrendingUp,
  Calendar,
  DollarSign,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

interface TenantDashboardProps {
  tenant: {
    id: string;
    name: string;
    plan: string;
    status: string;
    clientCount: number;
    subscriptionEnd: string;
    trialEnd?: string;
  };
}

export const TenantDashboard = ({ tenant }: TenantDashboardProps) => {
  const stats = [
    {
      title: "Active Clients",
      value: tenant.clientCount.toString(),
      icon: Users,
      trend: "+12% from last month",
      color: "text-blue-600",
    },
    {
      title: "Monthly Revenue",
      value: "$12,450",
      icon: DollarSign,
      trend: "+8% from last month",
      color: "text-green-600",
    },
    {
      title: "Active Projects",
      value: "24",
      icon: Calendar,
      trend: "+15% from last month",
      color: "text-purple-600",
    },
    {
      title: "Success Rate",
      value: "94%",
      icon: TrendingUp,
      trend: "+2% from last month",
      color: "text-emerald-600",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "trial":
        return "bg-yellow-100 text-yellow-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Building2 className="h-8 w-8 text-primary" />
            {tenant.name}
          </h1>
          <p className="text-muted-foreground mt-1">
            Multi-tenant dashboard for your business
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={getStatusColor(tenant.status)}>
            {tenant.status}
          </Badge>
          <Badge variant="outline">{tenant.plan} plan</Badge>
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
        {/* Subscription Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Subscription Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Current Plan</span>
              <Badge variant="outline">{tenant.plan}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Status</span>
              <Badge className={getStatusColor(tenant.status)}>
                {tenant.status}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Renewal Date</span>
              <span className="text-sm">{tenant.subscriptionEnd}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Client Limit</span>
              <span className="text-sm">{tenant.clientCount}/50</span>
            </div>
            <Button className="w-full">Manage Subscription</Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: "New client onboarded",
                  time: "2 hours ago",
                  status: "success",
                },
                {
                  action: "Payment processed",
                  time: "4 hours ago",
                  status: "success",
                },
                {
                  action: "Subscription renewed",
                  time: "1 day ago",
                  status: "success",
                },
                {
                  action: "Client limit warning",
                  time: "2 days ago",
                  status: "warning",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle
                      className={`h-4 w-4 ${
                        activity.status === "success"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    />
                    <span className="text-sm font-medium">
                      {activity.action}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
              ))}
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
              <span className="text-sm">Add Client</span>
            </Button>
            <Button className="h-20 flex flex-col gap-2" variant="outline">
              <Calendar className="h-6 w-6" />
              <span className="text-sm">Schedule Meeting</span>
            </Button>
            <Button className="h-20 flex flex-col gap-2" variant="outline">
              <CreditCard className="h-6 w-6" />
              <span className="text-sm">Billing</span>
            </Button>
            <Button className="h-20 flex flex-col gap-2" variant="outline">
              <TrendingUp className="h-6 w-6" />
              <span className="text-sm">Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
