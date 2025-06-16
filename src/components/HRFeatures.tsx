
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Clock, Calendar, TrendingUp, UserCheck, Award, FileText, DollarSign } from "lucide-react";

export const HRFeatures = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">HR Features</h2>
        <p className="text-muted-foreground">Manage your workforce with comprehensive HR tools</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Employee Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Employee Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Complete employee profiles, contact information, and role management
            </p>
            <Button className="w-full">Manage Employees</Button>
          </CardContent>
        </Card>

        {/* Time & Attendance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Time & Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Track work hours, breaks, overtime, and attendance patterns
            </p>
            <Button className="w-full">View Timesheets</Button>
          </CardContent>
        </Card>

        {/* Leave Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Leave Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Handle vacation requests, sick leave, and time-off approvals
            </p>
            <Button className="w-full">Manage Leave</Button>
          </CardContent>
        </Card>

        {/* Performance Tracking */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Performance Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Monitor employee performance, goals, and review cycles
            </p>
            <Button className="w-full">View Performance</Button>
          </CardContent>
        </Card>

        {/* Certification Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Certifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Track licenses, certifications, and training requirements
            </p>
            <Button className="w-full">Manage Certs</Button>
          </CardContent>
        </Card>

        {/* Payroll Integration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Payroll Integration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Connect with payroll systems for seamless wage calculation
            </p>
            <Button className="w-full">Setup Payroll</Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Employees</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Today</p>
                <p className="text-2xl font-bold">18</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Leave</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Cert Expiring</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <Award className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
