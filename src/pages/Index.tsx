import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, Calendar, Briefcase, DollarSign } from "lucide-react";
import { CustomerList } from "@/components/CustomerList";
import { JobList } from "@/components/JobList";
import { ScheduleView } from "@/components/ScheduleView";
import { CustomerForm } from "@/components/CustomerForm";
import { JobForm } from "@/components/JobForm";
import { EstimateList } from "@/components/EstimateList";
import { InvoiceList } from "@/components/InvoiceList";
import { EnhancedScheduleView } from "@/components/EnhancedScheduleView";

const Index = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);

  const stats = [
    { title: "Total Customers", value: "156", icon: Users, color: "text-blue-600" },
    { title: "Active Jobs", value: "23", icon: Briefcase, color: "text-green-600" },
    { title: "Scheduled Today", value: "8", icon: Calendar, color: "text-orange-600" },
    { title: "Monthly Revenue", value: "$45,230", icon: DollarSign, color: "text-purple-600" }
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'customers':
        return <CustomerList />;
      case 'jobs':
        return <JobList />;
      case 'schedule':
        return <EnhancedScheduleView />;
      case 'estimates':
        return <EstimateList />;
      case 'invoices':
        return <InvoiceList />;
      default:
        return (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks to get you started</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                <Button onClick={() => setShowCustomerForm(true)} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Customer
                </Button>
                <Button onClick={() => setShowJobForm(true)} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Create Job
                </Button>
                <Button variant="outline" onClick={() => setActiveView('schedule')}>
                  <Calendar className="h-4 w-4 mr-2" />
                  View Schedule
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Customers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>John Smith</span>
                      <span className="text-sm text-muted-foreground">2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>ABC Construction</span>
                      <span className="text-sm text-muted-foreground">1 day ago</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Sarah Johnson</span>
                      <span className="text-sm text-muted-foreground">3 days ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Jobs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Kitchen Renovation</span>
                      <span className="text-sm text-muted-foreground">Tomorrow</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Bathroom Repair</span>
                      <span className="text-sm text-muted-foreground">Dec 18</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Deck Installation</span>
                      <span className="text-sm text-muted-foreground">Dec 20</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-semibold text-gray-900">Construction CRM</h1>
              <nav className="flex space-x-4">
                <Button
                  variant={activeView === 'dashboard' ? 'default' : 'ghost'}
                  onClick={() => setActiveView('dashboard')}
                >
                  Dashboard
                </Button>
                <Button
                  variant={activeView === 'customers' ? 'default' : 'ghost'}
                  onClick={() => setActiveView('customers')}
                >
                  Customers
                </Button>
                <Button
                  variant={activeView === 'jobs' ? 'default' : 'ghost'}
                  onClick={() => setActiveView('jobs')}
                >
                  Jobs
                </Button>
                <Button
                  variant={activeView === 'schedule' ? 'default' : 'ghost'}
                  onClick={() => setActiveView('schedule')}
                >
                  Schedule
                </Button>
                <Button
                  variant={activeView === 'estimates' ? 'default' : 'ghost'}
                  onClick={() => setActiveView('estimates')}
                >
                  Estimates
                </Button>
                <Button
                  variant={activeView === 'invoices' ? 'default' : 'ghost'}
                  onClick={() => setActiveView('invoices')}
                >
                  Invoices
                </Button>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      {/* Modals */}
      {showCustomerForm && (
        <CustomerForm onClose={() => setShowCustomerForm(false)} />
      )}
      {showJobForm && (
        <JobForm onClose={() => setShowJobForm(false)} />
      )}
    </div>
  );
};

export default Index;
