import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, Calendar, Briefcase, DollarSign, TrendingUp, Receipt, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { CustomerList } from "@/components/CustomerList";
import { JobList } from "@/components/JobList";
import { ScheduleView } from "@/components/ScheduleView";
import { CustomerForm } from "@/components/CustomerForm";
import { JobForm } from "@/components/JobForm";
import { EstimateList } from "@/components/EstimateList";
import { InvoiceList } from "@/components/InvoiceList";
import { EnhancedScheduleView } from "@/components/EnhancedScheduleView";
import { ExpenseList } from "@/components/ExpenseList";
import { PaymentProcessing } from "@/components/PaymentProcessing";
import { ReportsView } from "@/components/ReportsView";
import { TeamManagement } from "@/components/TeamManagement";
import { NotificationCenter } from "@/components/NotificationCenter";
import { ReviewManagement } from "@/components/ReviewManagement";
import { MarketingTools } from "@/components/MarketingTools";
import { QuickBooksIntegration } from "@/components/QuickBooksIntegration";
import { AdvancedAnalytics } from "@/components/AdvancedAnalytics";
import { MobileOptimizations } from "@/components/MobileOptimizations";
import { APIIntegrations } from "@/components/APIIntegrations";
import { AdvancedReporting } from "@/components/AdvancedReporting";
import { WorkflowAutomation } from "@/components/WorkflowAutomation";
import { DocumentManagement } from "@/components/DocumentManagement";
import { ResourceAllocation } from "@/components/ResourceAllocation";
import { GanttChart } from "@/components/GanttChart";
import { MapView } from "@/components/MapView";
import { CustomerPortal } from "@/components/CustomerPortal";
import { OnlineBooking } from "@/components/OnlineBooking";
import { AutomatedFollowUp } from "@/components/AutomatedFollowUp";
import { MobileJobDocumentation } from "@/components/MobileJobDocumentation";

const Index = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);

  const stats = [
    { title: "Total Customers", value: "156", icon: Users, color: "text-blue-600" },
    { title: "Active Jobs", value: "23", icon: Briefcase, color: "text-green-600" },
    { title: "Scheduled Today", value: "8", icon: Calendar, color: "text-orange-600" },
    { title: "Monthly Revenue", value: "$67,230", icon: DollarSign, color: "text-purple-600" }
  ];

  // Mock job locations for the dashboard map
  const dashboardJobLocations = [
    {
      id: '1',
      title: 'Kitchen Renovation',
      customer: 'John Smith',
      address: '123 Main St, Anytown',
      coordinates: [-74.006, 40.7128] as [number, number],
      status: 'scheduled' as const
    },
    {
      id: '2',
      title: 'Bathroom Repair',
      customer: 'ABC Construction Inc.',
      address: '456 Business Ave, City',
      coordinates: [-74.0, 40.72] as [number, number],
      status: 'in-progress' as const
    },
    {
      id: '3',
      title: 'Deck Installation',
      customer: 'Sarah Johnson',
      address: '789 Oak Drive, Hometown',
      coordinates: [-73.99, 40.71] as [number, number],
      status: 'scheduled' as const
    }
  ];

  const menuItems = [
    { label: 'Dashboard', value: 'dashboard' },
    { label: 'Customers', value: 'customers' },
    { label: 'Jobs', value: 'jobs' },
    { label: 'Schedule', value: 'schedule' },
    { label: 'Estimates', value: 'estimates' },
    { label: 'Invoices', value: 'invoices' },
    { label: 'Expenses', value: 'expenses' },
    { label: 'Payments', value: 'payments' },
    { label: 'Team', value: 'team' },
    { label: 'Notifications', value: 'notifications' },
    { label: 'Reviews', value: 'reviews' },
    { label: 'Marketing', value: 'marketing' },
    { label: 'Reports', value: 'reports' },
    { label: 'QuickBooks', value: 'quickbooks' },
    { label: 'Analytics', value: 'analytics' },
    { label: 'Mobile', value: 'mobile' },
    { label: 'Integrations', value: 'integrations' },
    { label: 'Advanced Reports', value: 'advanced-reports' },
    { label: 'Workflows', value: 'workflows' },
    { label: 'Documents', value: 'documents' },
    { label: 'Resources', value: 'resources' },
    { label: 'Project Timeline', value: 'timeline' },
    { label: 'Customer Portal', value: 'customer-portal' },
    { label: 'Online Booking', value: 'online-booking' },
    { label: 'Follow-up Automation', value: 'follow-up' },
    { label: 'Mobile Documentation', value: 'mobile-docs' },
  ];

  const getCurrentLabel = () => {
    const current = menuItems.find(item => item.value === activeView);
    return current ? current.label : 'Dashboard';
  };

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
      case 'expenses':
        return <ExpenseList />;
      case 'payments':
        return <PaymentProcessing />;
      case 'reports':
        return <ReportsView />;
      case 'team':
        return <TeamManagement />;
      case 'notifications':
        return <NotificationCenter />;
      case 'reviews':
        return <ReviewManagement />;
      case 'marketing':
        return <MarketingTools />;
      case 'quickbooks':
        return <QuickBooksIntegration />;
      case 'analytics':
        return <AdvancedAnalytics />;
      case 'mobile':
        return <MobileOptimizations />;
      case 'integrations':
        return <APIIntegrations />;
      case 'advanced-reports':
        return <AdvancedReporting />;
      case 'workflows':
        return <WorkflowAutomation />;
      case 'documents':
        return <DocumentManagement />;
      case 'resources':
        return <ResourceAllocation />;
      case 'timeline':
        return <GanttChart />;
      case 'customer-portal':
        return <CustomerPortal />;
      case 'online-booking':
        return <OnlineBooking />;
      case 'follow-up':
        return <AutomatedFollowUp />;
      case 'mobile-docs':
        return <MobileJobDocumentation />;
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
                <Button variant="outline" onClick={() => setActiveView('payments')}>
                  <DollarSign className="h-4 w-4 mr-2" />
                  Process Payment
                </Button>
              </CardContent>
            </Card>

            {/* Schedule Map */}
            <MapView jobs={dashboardJobLocations} />

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
                  <CardTitle>Financial Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        Revenue This Month
                      </span>
                      <span className="font-semibold text-green-600">$67,230</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Receipt className="h-4 w-4 text-blue-600" />
                        Pending Invoices
                      </span>
                      <span className="font-semibold">$15,450</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-purple-600" />
                        Monthly Expenses
                      </span>
                      <span className="font-semibold">$38,120</span>
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Menu className="h-4 w-4" />
                    {getCurrentLabel()}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start">
                  {menuItems.map((item, index) => (
                    <div key={item.value}>
                      <DropdownMenuItem
                        onClick={() => setActiveView(item.value)}
                        className={activeView === item.value ? "bg-accent" : ""}
                      >
                        {item.label}
                      </DropdownMenuItem>
                      {(index === 0 || index === 7 || index === 12 || index === 21) && <DropdownMenuSeparator />}
                    </div>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
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
