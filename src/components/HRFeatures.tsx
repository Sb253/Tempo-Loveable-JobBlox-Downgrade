
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserCog, Users, Calendar, FileText, DollarSign, Clock, Award, AlertTriangle } from "lucide-react";

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  salary: number;
  hireDate: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'on-leave';
}

export const HRFeatures = () => {
  const [employees] = useState<Employee[]>([
    {
      id: '1',
      name: 'John Smith',
      position: 'Project Manager',
      department: 'Operations',
      salary: 75000,
      hireDate: '2023-01-15',
      email: 'john.smith@company.com',
      phone: '(555) 123-4567',
      status: 'active'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      position: 'Site Supervisor',
      department: 'Field Operations',
      salary: 65000,
      hireDate: '2022-08-20',
      email: 'sarah.johnson@company.com',
      phone: '(555) 234-5678',
      status: 'active'
    },
    {
      id: '3',
      name: 'Mike Wilson',
      position: 'Equipment Operator',
      department: 'Field Operations',
      salary: 45000,
      hireDate: '2023-03-10',
      email: 'mike.wilson@company.com',
      phone: '(555) 345-6789',
      status: 'on-leave'
    }
  ]);

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', label: 'Active' },
      inactive: { color: 'bg-red-100 text-red-800', label: 'Inactive' },
      'on-leave': { color: 'bg-yellow-100 text-yellow-800', label: 'On Leave' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">HR Features</h1>
          <p className="text-muted-foreground">Manage employee records, payroll, and HR processes</p>
        </div>
        <Button>
          <UserCog className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </div>

      <Tabs defaultValue="employees" className="space-y-4">
        <TabsList>
          <TabsTrigger value="employees">Employee Directory</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
        </TabsList>

        <TabsContent value="employees" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Employee Directory
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {employees.map((employee) => (
                  <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-medium">{employee.name}</h3>
                        <p className="text-sm text-muted-foreground">{employee.position}</p>
                        <p className="text-sm text-muted-foreground">{employee.department}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {getStatusBadge(employee.status)}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedEmployee(employee)}>
                            View Profile
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Employee Profile</DialogTitle>
                          </DialogHeader>
                          {selectedEmployee && (
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Full Name</Label>
                                  <Input value={selectedEmployee.name} readOnly />
                                </div>
                                <div>
                                  <Label>Position</Label>
                                  <Input value={selectedEmployee.position} readOnly />
                                </div>
                                <div>
                                  <Label>Department</Label>
                                  <Input value={selectedEmployee.department} readOnly />
                                </div>
                                <div>
                                  <Label>Email</Label>
                                  <Input value={selectedEmployee.email} readOnly />
                                </div>
                                <div>
                                  <Label>Phone</Label>
                                  <Input value={selectedEmployee.phone} readOnly />
                                </div>
                                <div>
                                  <Label>Hire Date</Label>
                                  <Input value={selectedEmployee.hireDate} readOnly />
                                </div>
                                <div>
                                  <Label>Salary</Label>
                                  <Input value={`$${selectedEmployee.salary.toLocaleString()}`} readOnly />
                                </div>
                                <div>
                                  <Label>Status</Label>
                                  <div className="pt-2">
                                    {getStatusBadge(selectedEmployee.status)}
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2 pt-4">
                                <Button>Edit Profile</Button>
                                <Button variant="outline">View Documents</Button>
                                <Button variant="outline">Performance History</Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payroll" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Payroll</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$185,000</div>
                <p className="text-xs text-muted-foreground">Monthly total</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Employees</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">Full-time staff</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overtime Hours</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Attendance Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Attendance tracking system will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Performance Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Performance review and evaluation system will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benefits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Benefits Administration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Employee benefits management system will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
