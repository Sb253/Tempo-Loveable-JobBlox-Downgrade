
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  Briefcase, 
  FileText, 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  AlertCircle,
  CheckCircle,
  Plus,
  Activity
} from "lucide-react";
import { EnhancedCustomerForm } from "./forms/EnhancedCustomerForm";
import { EnhancedJobForm } from "./forms/EnhancedJobForm";
import { EnhancedInvoiceForm } from "./forms/EnhancedInvoiceForm";
import { businessDataManager, Customer, Job, Invoice } from "../utils/businessDataManager";

export const EnhancedBusinessDashboard = () => {
  const { toast } = useToast();
  const [activeDialog, setActiveDialog] = useState<'customer' | 'job' | 'invoice' | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [metrics, setMetrics] = useState<any>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setCustomers(businessDataManager.getAllCustomers());
    setJobs(businessDataManager.getAllJobs());
    setInvoices(businessDataManager.getAllInvoices());
    setMetrics(businessDataManager.getBusinessMetrics());
  };

  const handleSaveCustomer = (customerData: Customer) => {
    if (editingItem) {
      businessDataManager.updateCustomer(editingItem.id, customerData);
    } else {
      businessDataManager.createCustomer(customerData);
    }
    
    loadData();
    setActiveDialog(null);
    setEditingItem(null);
    
    toast({
      title: "Success",
      description: `Customer ${editingItem ? 'updated' : 'created'} successfully`,
    });
  };

  const handleSaveJob = (jobData: Job) => {
    if (editingItem) {
      businessDataManager.updateJob(editingItem.id, jobData);
    } else {
      businessDataManager.createJob(jobData);
    }
    
    loadData();
    setActiveDialog(null);
    setEditingItem(null);
    
    toast({
      title: "Success",
      description: `Job ${editingItem ? 'updated' : 'created'} successfully`,
    });
  };

  const handleSaveInvoice = (invoiceData: Invoice) => {
    if (editingItem) {
      businessDataManager.updateInvoice(editingItem.id, invoiceData);
    } else {
      businessDataManager.createInvoice(invoiceData);
    }
    
    loadData();
    setActiveDialog(null);
    setEditingItem(null);
    
    toast({
      title: "Success",
      description: `Invoice ${editingItem ? 'updated' : 'created'} successfully`,
    });
  };

  const openEditDialog = (type: 'customer' | 'job' | 'invoice', item?: any) => {
    setEditingItem(item || null);
    setActiveDialog(type);
  };

  const getStatusBadge = (status: string, type: 'customer' | 'job' | 'invoice') => {
    const colors = {
      customer: {
        active: 'default',
        inactive: 'secondary',
        potential: 'outline'
      },
      job: {
        draft: 'outline',
        scheduled: 'secondary',
        'in-progress': 'default',
        'on-hold': 'destructive',
        completed: 'default',
        cancelled: 'destructive'
      },
      invoice: {
        draft: 'outline',
        sent: 'secondary',
        paid: 'default',
        overdue: 'destructive',
        cancelled: 'destructive'
      }
    };

    return (
      <Badge variant={colors[type][status as keyof typeof colors[typeof type]] as any}>
        {status}
      </Badge>
    );
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent':
      case 'high':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <Activity className="h-4 w-4 text-yellow-500" />;
      case 'low':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Business Dashboard</h1>
        <div className="flex gap-2">
          <Button onClick={() => openEditDialog('customer')} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Customer
          </Button>
          <Button onClick={() => openEditDialog('job')} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Job
          </Button>
          <Button onClick={() => openEditDialog('invoice')} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Invoice
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalCustomers || 0}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.activeCustomers || 0} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeJobs || 0}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.completedJobs || 0} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(metrics.totalRevenue || 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              ${(metrics.pendingRevenue || 0).toLocaleString()} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Job Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(metrics.averageJobValue || 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.totalJobs || 0} total jobs
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Data Tables */}
      <Tabs defaultValue="customers" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
        </TabsList>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Customers ({customers.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customers.map((customer) => (
                  <div key={customer.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium">{customer.name}</h3>
                        {getStatusBadge(customer.status, 'customer')}
                        <Badge variant="outline">{customer.customerType}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {customer.email} • {customer.phone}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {customer.address}, {customer.city}, {customer.state}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">${customer.totalRevenue.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Total Revenue</div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                        onClick={() => openEditDialog('customer', customer)}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Jobs ({jobs.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {jobs.map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        {getPriorityIcon(job.priority)}
                        <h3 className="font-medium">{job.title}</h3>
                        {getStatusBadge(job.status, 'job')}
                        <Badge variant="outline">{job.jobType}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Customer: {job.customerName}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {job.address}, {job.city}, {job.state}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3 inline mr-1" />
                        {job.startDate} - {job.endDate}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">${job.estimatedCost.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Estimated Cost</div>
                      <div className="text-xs text-muted-foreground">
                        {job.actualHours}h / {job.estimatedHours}h
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                        onClick={() => openEditDialog('job', job)}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Invoices ({invoices.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium">{invoice.invoiceNumber}</h3>
                        {getStatusBadge(invoice.status, 'invoice')}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Customer: {invoice.customerName}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3 inline mr-1" />
                        Issue: {invoice.issueDate} • Due: {invoice.dueDate}
                      </div>
                      {invoice.jobId && (
                        <div className="text-sm text-muted-foreground">
                          Related Job: {jobs.find(j => j.id === invoice.jobId)?.title}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-medium">${invoice.total.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">
                        {invoice.status === 'paid' ? 'Paid' : 'Outstanding'}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                        onClick={() => openEditDialog('invoice', invoice)}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog Forms */}
      <Dialog open={activeDialog === 'customer'} onOpenChange={() => setActiveDialog(null)}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Edit Customer' : 'New Customer'}
            </DialogTitle>
          </DialogHeader>
          <EnhancedCustomerForm
            customer={editingItem}
            onSave={handleSaveCustomer}
            onCancel={() => setActiveDialog(null)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={activeDialog === 'job'} onOpenChange={() => setActiveDialog(null)}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Edit Job' : 'New Job'}
            </DialogTitle>
          </DialogHeader>
          <EnhancedJobForm
            job={editingItem}
            onSave={handleSaveJob}
            onCancel={() => setActiveDialog(null)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={activeDialog === 'invoice'} onOpenChange={() => setActiveDialog(null)}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Edit Invoice' : 'New Invoice'}
            </DialogTitle>
          </DialogHeader>
          <EnhancedInvoiceForm
            invoice={editingItem}
            onSave={handleSaveInvoice}
            onCancel={() => setActiveDialog(null)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
