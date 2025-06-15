
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Shield, User, Settings, Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Permission {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  isDefault?: boolean;
}

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

export const AccessControl = () => {
  const { toast } = useToast();
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const [showEmployeeDialog, setShowEmployeeDialog] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  const [permissions] = useState<Permission[]>([
    { id: 'view_dashboard', name: 'View Dashboard', description: 'Access main dashboard', enabled: true },
    { id: 'manage_jobs', name: 'Manage Jobs', description: 'Create, edit, and delete jobs', enabled: true },
    { id: 'manage_customers', name: 'Manage Customers', description: 'Add and edit customer information', enabled: true },
    { id: 'view_reports', name: 'View Reports', description: 'Access financial and analytics reports', enabled: true },
    { id: 'manage_employees', name: 'Manage Employees', description: 'Add, edit, and remove employees', enabled: false },
    { id: 'manage_settings', name: 'System Settings', description: 'Access system configuration', enabled: false },
    { id: 'manage_payments', name: 'Payment Processing', description: 'Process payments and refunds', enabled: true },
    { id: 'view_financials', name: 'Financial Data', description: 'View profit margins and costs', enabled: false },
    { id: 'manage_subcontractors', name: 'Subcontractor Management', description: 'Manage subcontractor relationships', enabled: false }
  ]);

  const [roles, setRoles] = useState<Role[]>([
    {
      id: 'owner',
      name: 'Owner/Admin',
      description: 'Full system access',
      permissions: permissions.map(p => p.id),
      isDefault: true
    },
    {
      id: 'manager',
      name: 'Project Manager',
      description: 'Manage jobs and customers',
      permissions: ['view_dashboard', 'manage_jobs', 'manage_customers', 'view_reports', 'manage_payments']
    },
    {
      id: 'employee',
      name: 'Employee',
      description: 'Basic job access',
      permissions: ['view_dashboard', 'manage_jobs']
    },
    {
      id: 'accountant',
      name: 'Accountant',
      description: 'Financial access only',
      permissions: ['view_dashboard', 'view_reports', 'view_financials', 'manage_payments']
    }
  ]);

  const [employees, setEmployees] = useState<Employee[]>([
    { id: '1', name: 'John Smith', email: 'john@company.com', role: 'owner', status: 'active' },
    { id: '2', name: 'Mike Johnson', email: 'mike@company.com', role: 'manager', status: 'active' },
    { id: '3', name: 'Sarah Davis', email: 'sarah@company.com', role: 'employee', status: 'active' },
    { id: '4', name: 'Tom Wilson', email: 'tom@company.com', role: 'accountant', status: 'active' }
  ]);

  const handleCreateRole = () => {
    setEditingRole(null);
    setShowRoleDialog(true);
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    setShowRoleDialog(true);
  };

  const handleSaveRole = () => {
    setShowRoleDialog(false);
    toast({
      title: "Role Saved",
      description: "Access role has been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Access Control</h1>
      </div>

      <Tabs defaultValue="roles" className="w-full">
        <TabsList>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="employees">Employee Access</TabsTrigger>
          <TabsTrigger value="audit">Access Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="roles">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Access Roles</h2>
              <Button onClick={handleCreateRole} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Role
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roles.map((role) => (
                <Card key={role.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Shield className="h-5 w-5" />
                          {role.name}
                          {role.isDefault && <Badge variant="secondary">Default</Badge>}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{role.description}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditRole(role)}
                        disabled={role.isDefault}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Permissions ({role.permissions.length})</p>
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.slice(0, 3).map((permId) => {
                          const perm = permissions.find(p => p.id === permId);
                          return perm ? (
                            <Badge key={permId} variant="outline" className="text-xs">
                              {perm.name}
                            </Badge>
                          ) : null;
                        })}
                        {role.permissions.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{role.permissions.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="employees">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Employee Access</h2>
              <Button onClick={() => setShowEmployeeDialog(true)} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Employee
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {employees.map((employee, index) => (
                    <div
                      key={employee.id}
                      className={`flex items-center justify-between p-4 ${
                        index !== employees.length - 1 ? 'border-b' : ''
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{employee.name}</h4>
                          <p className="text-sm text-muted-foreground">{employee.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <Badge variant="outline">
                          {roles.find(r => r.id === employee.role)?.name || employee.role}
                        </Badge>
                        <Badge className={employee.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {employee.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <CardTitle>Access Audit Log</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Access logs and security audit trail coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Role Dialog */}
      {showRoleDialog && (
        <Dialog open={true} onOpenChange={setShowRoleDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingRole ? 'Edit Role' : 'Create New Role'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="role-name">Role Name</Label>
                  <Input
                    id="role-name"
                    placeholder="Enter role name"
                    defaultValue={editingRole?.name || ''}
                  />
                </div>
                <div>
                  <Label htmlFor="role-desc">Description</Label>
                  <Input
                    id="role-desc"
                    placeholder="Role description"
                    defaultValue={editingRole?.description || ''}
                  />
                </div>
              </div>

              <div>
                <Label className="text-base font-medium">Permissions</Label>
                <div className="grid grid-cols-1 gap-3 mt-2">
                  {permissions.map((permission) => (
                    <div key={permission.id} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <h4 className="font-medium">{permission.name}</h4>
                        <p className="text-sm text-muted-foreground">{permission.description}</p>
                      </div>
                      <Switch
                        defaultChecked={editingRole?.permissions.includes(permission.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setShowRoleDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveRole}>
                  {editingRole ? 'Update Role' : 'Create Role'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
