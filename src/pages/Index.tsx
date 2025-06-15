
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Building, Users, FileText, Calendar, Settings, DollarSign, User } from "lucide-react";
import { Link } from "react-router-dom";

// Import components
import { Dashboard } from "@/components/Dashboard";
import { CustomerForm } from "@/components/CustomerForm";
import { CustomerList } from "@/components/CustomerList";
import { JobForm } from "@/components/JobForm";
import { JobList } from "@/components/JobList";
import { EstimateForm } from "@/components/EstimateForm";
import { EstimateList } from "@/components/EstimateList";
import { InvoiceForm } from "@/components/InvoiceForm";
import { InvoiceList } from "@/components/InvoiceList";
import { ScheduleView } from "@/components/ScheduleView";
import { ReportsView } from "@/components/ReportsView";
import { SettingsDashboard } from "@/components/SettingsDashboard";
import { CompanyInfoSettings } from "@/components/CompanyInfoSettings";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);
  const [showEstimateForm, setShowEstimateForm] = useState(false);
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Building className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">JobFlow Pro</h1>
              <Badge variant="secondary">Admin Dashboard</Badge>
            </div>
            <Link to="/members">
              <Button variant="outline">
                <User className="h-4 w-4 mr-2" />
                Customer Portal
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-8 w-full">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Customers
            </TabsTrigger>
            <TabsTrigger value="jobs" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Jobs
            </TabsTrigger>
            <TabsTrigger value="estimates" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Estimates
            </TabsTrigger>
            <TabsTrigger value="invoices" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Invoices
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Schedule
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>

          <TabsContent value="customers">
            <Card>
              <CardHeader>
                <CardTitle>Customer Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="list" className="w-full">
                  <TabsList>
                    <TabsTrigger value="list">Customer List</TabsTrigger>
                    <TabsTrigger value="add" onClick={() => setShowCustomerForm(true)}>Add Customer</TabsTrigger>
                  </TabsList>
                  <TabsContent value="list">
                    <CustomerList />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jobs">
            <Card>
              <CardHeader>
                <CardTitle>Job Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="list" className="w-full">
                  <TabsList>
                    <TabsTrigger value="list">Job List</TabsTrigger>
                    <TabsTrigger value="add" onClick={() => setShowJobForm(true)}>Add Job</TabsTrigger>
                  </TabsList>
                  <TabsContent value="list">
                    <JobList />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="estimates">
            <Card>
              <CardHeader>
                <CardTitle>Estimate Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="list" className="w-full">
                  <TabsList>
                    <TabsTrigger value="list">Estimate List</TabsTrigger>
                    <TabsTrigger value="add" onClick={() => setShowEstimateForm(true)}>Create Estimate</TabsTrigger>
                  </TabsList>
                  <TabsContent value="list">
                    <EstimateList />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invoices">
            <Card>
              <CardHeader>
                <CardTitle>Invoice Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="list" className="w-full">
                  <TabsList>
                    <TabsTrigger value="list">Invoice List</TabsTrigger>
                    <TabsTrigger value="add" onClick={() => setShowInvoiceForm(true)}>Create Invoice</TabsTrigger>
                  </TabsList>
                  <TabsContent value="list">
                    <InvoiceList />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <ScheduleView />
          </TabsContent>

          <TabsContent value="reports">
            <ReportsView />
          </TabsContent>

          <TabsContent value="settings">
            <Tabs defaultValue="general" className="w-full">
              <TabsList>
                <TabsTrigger value="general">General Settings</TabsTrigger>
                <TabsTrigger value="company">Company Info</TabsTrigger>
              </TabsList>
              <TabsContent value="general">
                <SettingsDashboard />
              </TabsContent>
              <TabsContent value="company">
                <CompanyInfoSettings />
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </main>

      {/* Form Dialogs */}
      {showCustomerForm && (
        <CustomerForm onClose={() => setShowCustomerForm(false)} />
      )}
      {showJobForm && (
        <JobForm onClose={() => setShowJobForm(false)} />
      )}
      {showEstimateForm && (
        <EstimateForm onClose={() => setShowEstimateForm(false)} />
      )}
      {showInvoiceForm && (
        <InvoiceForm onClose={() => setShowInvoiceForm(false)} />
      )}
    </div>
  );
};

export default Index;
