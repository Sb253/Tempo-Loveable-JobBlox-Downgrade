import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, Calendar, DollarSign, FileText, Plus, Edit, Phone, Mail, MapPin, Star, MessageSquare, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WageStructure {
  hourlyRate?: number;
  salary?: number;
  commission?: number;
  combinationType?: 'hourly_commission' | 'salary_commission' | 'hourly_salary' | 'all_three';
}

interface Subcontractor {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  specialties: string[];
  rating: number;
  status: 'active' | 'inactive' | 'pending';
  address: string;
  insurance: boolean;
  license: string;
  wageStructure: WageStructure;
  notificationPreferences: {
    email: boolean;
    sms: boolean;
    scheduling: boolean;
    jobAssignments: boolean;
    workOrderUpdates: boolean;
  };
}

interface WorkOrder {
  id: string;
  jobTitle: string;
  subcontractorId: string;
  description: string;
  startDate: string;
  endDate: string;
  amount: number;
  status: 'pending' | 'approved' | 'in-progress' | 'completed' | 'cancelled';
  paymentStatus: 'unpaid' | 'partial' | 'paid';
}

interface ChangeOrder {
  id: string;
  workOrderId: string;
  description: string;
  originalAmount: number;
  changeAmount: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedDate: string;
}

export const SubcontractorManagement = () => {
  const { toast } = useToast();
  const [showSubcontractorDialog, setShowSubcontractorDialog] = useState(false);
  const [showWorkOrderDialog, setShowWorkOrderDialog] = useState(false);
  const [showChangeOrderDialog, setShowChangeOrderDialog] = useState(false);
  const [showNotificationDialog, setShowNotificationDialog] = useState(false);
  const [editingSubcontractor, setEditingSubcontractor] = useState<Subcontractor | null>(null);

  const [subcontractors, setSubcontractors] = useState<Subcontractor[]>([
    {
      id: '1',
      name: 'Mike Rodriguez',
      company: 'Rodriguez Plumbing',
      email: 'mike@rodriguezplumbing.com',
      phone: '(555) 123-4567',
      specialties: ['Plumbing', 'Water Heaters'],
      rating: 4.8,
      status: 'active',
      address: '123 Main St, City, State',
      insurance: true,
      license: 'PL-12345',
      wageStructure: { hourlyRate: 75, commission: 10 },
      notificationPreferences: {
        email: true,
        sms: true,
        scheduling: true,
        jobAssignments: true,
        workOrderUpdates: true
      }
    },
    {
      id: '2',
      name: 'Sarah Electric Co',
      company: 'Sarah Electric Co',
      email: 'contact@sarahelectric.com',
      phone: '(555) 987-6543',
      specialties: ['Electrical', 'Solar'],
      rating: 4.9,
      status: 'active',
      address: '456 Oak Ave, City, State',
      insurance: true,
      license: 'EL-67890',
      wageStructure: { hourlyRate: 85 },
      notificationPreferences: {
        email: true,
        sms: false,
        scheduling: true,
        jobAssignments: true,
        workOrderUpdates: false
      }
    },
    {
      id: '3',
      name: 'Tom Carpentry',
      company: 'Expert Carpentry',
      email: 'tom@expertcarpentry.com',
      phone: '(555) 456-7890',
      specialties: ['Carpentry', 'Framing'],
      rating: 4.6,
      status: 'active',
      address: '789 Pine St, City, State',
      insurance: true,
      license: 'CA-11111',
      wageStructure: { commission: 15 },
      notificationPreferences: {
        email: true,
        sms: true,
        scheduling: true,
        jobAssignments: true,
        workOrderUpdates: true
      }
    }
  ]);

  const [workOrders] = useState<WorkOrder[]>([
    {
      id: 'WO-001',
      jobTitle: 'Kitchen Renovation - Plumbing',
      subcontractorId: '1',
      description: 'Install new plumbing fixtures and water lines for kitchen renovation',
      startDate: '2024-01-15',
      endDate: '2024-01-18',
      amount: 2500,
      status: 'in-progress',
      paymentStatus: 'unpaid'
    },
    {
      id: 'WO-002',
      jobTitle: 'Office Building - Electrical',
      subcontractorId: '2',
      description: 'Electrical wiring for new office space',
      startDate: '2024-01-20',
      endDate: '2024-01-25',
      amount: 4200,
      status: 'approved',
      paymentStatus: 'unpaid'
    },
    {
      id: 'WO-003',
      jobTitle: 'Deck Construction - Framing',
      subcontractorId: '3',
      description: 'Frame construction for outdoor deck',
      startDate: '2024-01-10',
      endDate: '2024-01-12',
      amount: 1800,
      status: 'completed',
      paymentStatus: 'paid'
    }
  ]);

  const [changeOrders] = useState<ChangeOrder[]>([
    {
      id: 'CO-001',
      workOrderId: 'WO-001',
      description: 'Additional water line for dishwasher',
      originalAmount: 2500,
      changeAmount: 350,
      reason: 'Client requested additional connection',
      status: 'pending',
      requestedDate: '2024-01-16'
    },
    {
      id: 'CO-002',
      workOrderId: 'WO-002',
      description: 'Extra outlets in conference room',
      originalAmount: 4200,
      changeAmount: 280,
      reason: 'Design change requested',
      status: 'approved',
      requestedDate: '2024-01-21'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-purple-100 text-purple-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'paid': return 'bg-green-100 text-green-800';
      case 'unpaid': return 'bg-red-100 text-red-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-muted-foreground">{rating}</span>
      </div>
    );
  };

  const formatWageDisplay = (wage: WageStructure) => {
    const parts = [];
    if (wage.hourlyRate) parts.push(`$${wage.hourlyRate}/hr`);
    if (wage.salary) parts.push(`$${wage.salary.toLocaleString()}/yr`);
    if (wage.commission) parts.push(`${wage.commission}% commission`);
    return parts.join(' + ') || 'Not set';
  };

  const handleSendNotification = (subcontractorId: string, type: string) => {
    const subcontractor = subcontractors.find(s => s.id === subcontractorId);
    if (!subcontractor) return;

    // Simulate sending notification based on preferences
    const notifications = [];
    if (subcontractor.notificationPreferences.email) notifications.push('email');
    if (subcontractor.notificationPreferences.sms) notifications.push('SMS');

    toast({
      title: "Notification Sent",
      description: `${type} notification sent to ${subcontractor.name} via ${notifications.join(' and ')}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Subcontractor Management</h1>
        <div className="flex gap-2">
          <Button 
            onClick={() => setShowNotificationDialog(true)} 
            variant="outline"
            className="flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Send Notifications
          </Button>
          <Button onClick={() => setShowSubcontractorDialog(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Subcontractor
          </Button>
        </div>
      </div>

      <Tabs defaultValue="subcontractors" className="w-full">
        <TabsList>
          <TabsTrigger value="subcontractors">Subcontractors</TabsTrigger>
          <TabsTrigger value="work-orders">Work Orders</TabsTrigger>
          <TabsTrigger value="change-orders">Change Orders</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="subcontractors">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subcontractors.map((sub) => (
              <Card key={sub.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{sub.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{sub.company}</p>
                    </div>
                    <Badge className={getStatusColor(sub.status)}>
                      {sub.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {sub.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {sub.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {sub.address}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-1">Specialties</p>
                    <div className="flex flex-wrap gap-1">
                      {sub.specialties.map((specialty) => (
                        <Badge key={specialty} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-1">Wage Structure</p>
                    <p className="text-xs text-muted-foreground">{formatWageDisplay(sub.wageStructure)}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-muted-foreground">License: {sub.license}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {sub.notificationPreferences.email && <Mail className="h-3 w-3 text-blue-500" />}
                        {sub.notificationPreferences.sms && <MessageSquare className="h-3 w-3 text-green-500" />}
                      </div>
                    </div>
                    {renderStars(sub.rating)}
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => {
                        setEditingSubcontractor(sub);
                        setShowSubcontractorDialog(true);
                      }}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1" 
                      onClick={() => setShowWorkOrderDialog(true)}
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      Work Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="work-orders">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Work Orders</h2>
              <Button onClick={() => setShowWorkOrderDialog(true)} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Work Order
              </Button>
            </div>

            <div className="space-y-3">
              {workOrders.map((order) => {
                const subcontractor = subcontractors.find(s => s.id === order.subcontractorId);
                return (
                  <Card key={order.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h4 className="font-medium">{order.jobTitle}</h4>
                            <Badge className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                            <Badge className={getStatusColor(order.paymentStatus)}>
                              {order.paymentStatus}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{order.description}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {subcontractor?.name}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {order.startDate} - {order.endDate}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              ${order.amount.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleSendNotification(order.subcontractorId, 'Work Order Update')}
                          >
                            <Bell className="h-4 w-4 mr-1" />
                            Notify
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => setShowChangeOrderDialog(true)}>
                            Change Order
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="change-orders">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Change Orders</h2>
              <Button onClick={() => setShowChangeOrderDialog(true)} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Change Order
              </Button>
            </div>

            <div className="space-y-3">
              {changeOrders.map((changeOrder) => {
                const workOrder = workOrders.find(wo => wo.id === changeOrder.workOrderId);
                const subcontractor = subcontractors.find(s => s.id === workOrder?.subcontractorId);
                return (
                  <Card key={changeOrder.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h4 className="font-medium">Change Order #{changeOrder.id}</h4>
                            <Badge className={getStatusColor(changeOrder.status)}>
                              {changeOrder.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Work Order: {workOrder?.jobTitle} | Subcontractor: {subcontractor?.name}
                          </p>
                          <p className="text-sm">{changeOrder.description}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <span>Original: ${changeOrder.originalAmount.toLocaleString()}</span>
                            <span className="text-green-600">
                              Change: +${changeOrder.changeAmount.toLocaleString()}
                            </span>
                            <span className="font-medium">
                              New Total: ${(changeOrder.originalAmount + changeOrder.changeAmount).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Requested: {changeOrder.requestedDate} | Reason: {changeOrder.reason}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          {changeOrder.status === 'pending' && (
                            <>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-green-600"
                                onClick={() => {
                                  if (subcontractor) {
                                    handleSendNotification(subcontractor.id, 'Change Order Approved');
                                  }
                                }}
                              >
                                Approve
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600">
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Notification Management</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Bulk Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    onClick={() => toast({
                      title: "Schedule Update Sent",
                      description: "All active subcontractors have been notified of schedule changes.",
                    })}
                    className="flex items-center gap-2"
                  >
                    <Calendar className="h-4 w-4" />
                    Schedule Updates
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => toast({
                      title: "Job Assignments Sent",
                      description: "New job assignments have been sent to relevant subcontractors.",
                    })}
                    className="flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    Job Assignments
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => toast({
                      title: "Payment Reminders Sent",
                      description: "Payment status updates sent to all subcontractors.",
                    })}
                    className="flex items-center gap-2"
                  >
                    <DollarSign className="h-4 w-4" />
                    Payment Updates
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Individual Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {subcontractors.map((sub) => (
                    <div key={sub.id} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <h4 className="font-medium">{sub.name}</h4>
                        <p className="text-sm text-muted-foreground">{sub.company}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {sub.notificationPreferences.email && (
                            <Badge variant="outline" className="text-xs">
                              <Mail className="h-3 w-3 mr-1" />
                              Email
                            </Badge>
                          )}
                          {sub.notificationPreferences.sms && (
                            <Badge variant="outline" className="text-xs">
                              <MessageSquare className="h-3 w-3 mr-1" />
                              SMS
                            </Badge>
                          )}
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setEditingSubcontractor(sub);
                            setShowSubcontractorDialog(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payment Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Payment tracking and processing for subcontractors coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Subcontractor Dialog */}
      {showSubcontractorDialog && (
        <Dialog open={true} onOpenChange={setShowSubcontractorDialog}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingSubcontractor ? 'Edit Subcontractor' : 'Add New Subcontractor'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Contact Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Full name" 
                    defaultValue={editingSubcontractor?.name || ''}
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company Name</Label>
                  <Input 
                    id="company" 
                    placeholder="Company name" 
                    defaultValue={editingSubcontractor?.company || ''}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="email@company.com" 
                    defaultValue={editingSubcontractor?.email || ''}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone" 
                    placeholder="(555) 123-4567" 
                    defaultValue={editingSubcontractor?.phone || ''}
                  />
                </div>
                <div>
                  <Label htmlFor="license">License Number</Label>
                  <Input 
                    id="license" 
                    placeholder="License #" 
                    defaultValue={editingSubcontractor?.license || ''}
                  />
                </div>
                <div>
                  <Label htmlFor="specialties">Specialties</Label>
                  <Input 
                    id="specialties" 
                    placeholder="Plumbing, Electrical, etc." 
                    defaultValue={editingSubcontractor?.specialties.join(', ') || ''}
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address" 
                    placeholder="Street address" 
                    defaultValue={editingSubcontractor?.address || ''}
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-4">Wage Structure</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="wage-type">Wage Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select wage type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly Rate</SelectItem>
                        <SelectItem value="commission">Commission Only</SelectItem>
                        <SelectItem value="hourly_commission">Hourly + Commission</SelectItem>
                        <SelectItem value="project">Project Based</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="hourly-rate">Hourly Rate ($)</Label>
                    <Input 
                      id="hourly-rate" 
                      type="number" 
                      placeholder="75" 
                      defaultValue={editingSubcontractor?.wageStructure.hourlyRate || ''}
                    />
                  </div>
                  <div>
                    <Label htmlFor="commission-rate">Commission Rate (%)</Label>
                    <Input 
                      id="commission-rate" 
                      type="number" 
                      placeholder="10" 
                      defaultValue={editingSubcontractor?.wageStructure.commission || ''}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="email-notif" 
                      defaultChecked={editingSubcontractor?.notificationPreferences.email}
                    />
                    <Label htmlFor="email-notif">Email Notifications</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="sms-notif" 
                      defaultChecked={editingSubcontractor?.notificationPreferences.sms}
                    />
                    <Label htmlFor="sms-notif">SMS Notifications</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="schedule-notif" 
                      defaultChecked={editingSubcontractor?.notificationPreferences.scheduling}
                    />
                    <Label htmlFor="schedule-notif">Scheduling Updates</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="job-assignment-notif" 
                      defaultChecked={editingSubcontractor?.notificationPreferences.jobAssignments}
                    />
                    <Label htmlFor="job-assignment-notif">Job Assignments</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="work-order-notif" 
                      defaultChecked={editingSubcontractor?.notificationPreferences.workOrderUpdates}
                    />
                    <Label htmlFor="work-order-notif">Work Order Updates</Label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => {
                setShowSubcontractorDialog(false);
                setEditingSubcontractor(null);
              }}>
                Cancel
              </Button>
              <Button onClick={() => {
                setShowSubcontractorDialog(false);
                setEditingSubcontractor(null);
                toast({
                  title: editingSubcontractor ? "Subcontractor Updated" : "Subcontractor Added",
                  description: `Subcontractor has been ${editingSubcontractor ? 'updated' : 'added'} successfully.`,
                });
              }}>
                {editingSubcontractor ? 'Update' : 'Add'} Subcontractor
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Work Order Dialog */}
      {showWorkOrderDialog && (
        <Dialog open={true} onOpenChange={setShowWorkOrderDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Work Order</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="job-title">Job Title</Label>
                  <Input id="job-title" placeholder="Job title" />
                </div>
                <div>
                  <Label htmlFor="subcontractor">Subcontractor</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subcontractor" />
                    </SelectTrigger>
                    <SelectContent>
                      {subcontractors.map((sub) => (
                        <SelectItem key={sub.id} value={sub.id}>
                          {sub.name} - {sub.company}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input id="start-date" type="date" />
                </div>
                <div>
                  <Label htmlFor="end-date">End Date</Label>
                  <Input id="end-date" type="date" />
                </div>
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" type="number" placeholder="2500" />
                </div>
                <div>
                  <Label>Send Notification</Label>
                  <div className="flex gap-2 mt-1">
                    <Checkbox id="notify-email" />
                    <Label htmlFor="notify-email" className="text-sm">Email</Label>
                    <Checkbox id="notify-sms" />
                    <Label htmlFor="notify-sms" className="text-sm">SMS</Label>
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Work order description..." />
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setShowWorkOrderDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                setShowWorkOrderDialog(false);
                toast({
                  title: "Work Order Created",
                  description: "Work order has been created and notifications sent.",
                });
              }}>
                Create Work Order
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Notification Dialog */}
      {showNotificationDialog && (
        <Dialog open={true} onOpenChange={setShowNotificationDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Send Bulk Notification</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="notification-type">Notification Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select notification type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="schedule">Schedule Update</SelectItem>
                    <SelectItem value="assignment">Job Assignment</SelectItem>
                    <SelectItem value="payment">Payment Update</SelectItem>
                    <SelectItem value="general">General Announcement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Enter your message..." 
                  rows={4}
                />
              </div>
              <div>
                <Label>Send Via</Label>
                <div className="flex gap-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="bulk-email" defaultChecked />
                    <Label htmlFor="bulk-email">Email</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="bulk-sms" />
                    <Label htmlFor="bulk-sms">SMS</Label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setShowNotificationDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                setShowNotificationDialog(false);
                toast({
                  title: "Notifications Sent",
                  description: "Bulk notification has been sent to all active subcontractors.",
                });
              }}>
                Send Notification
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
