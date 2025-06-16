import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, MapPin, Clock, Plus, Search, Mail, Lock, Eye, EyeOff, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { InvitationManager } from './auth/InvitationManager';
import { EmployeeProfile } from '../types/auth';

const mockTeamMembers: EmployeeProfile[] = [
  {
    id: '1',
    name: 'Mike Johnson',
    email: 'mike@company.com',
    phone: '(555) 123-4567',
    address: '123 Main St, New York, NY',
    coordinates: [-74.0060, 40.7128],
    skills: ['plumbing', 'electrical', 'general'],
    availability: 'available',
    workload: 45,
    role: 'manager',
    permissions: ['view_dashboard', 'manage_customers', 'manage_jobs', 'view_reports'],
    hasPassword: true,
    canChangePassword: true,
    lastLogin: '2024-01-15T10:30:00Z',
    invitationStatus: 'accepted'
  },
  {
    id: '2',
    name: 'Sarah Davis',
    email: 'sarah@company.com',
    phone: '(555) 234-5678',
    address: '456 Broadway, New York, NY',
    coordinates: [-73.9851, 40.7589],
    skills: ['roofing', 'carpentry', 'painting'],
    availability: 'available',
    workload: 30,
    role: 'employee',
    permissions: ['view_dashboard', 'manage_jobs'],
    hasPassword: true,
    canChangePassword: false,
    lastLogin: '2024-01-14T14:20:00Z',
    invitationStatus: 'accepted'
  },
  {
    id: '3',
    name: 'Tom Wilson',
    email: 'tom@company.com',
    phone: '(555) 345-6789',
    address: '789 Park Ave, New York, NY',
    coordinates: [-73.9934, 40.7505],
    skills: ['electrical', 'hvac'],
    availability: 'offline',
    workload: 0,
    role: 'employee',
    permissions: ['view_dashboard'],
    hasPassword: false,
    canChangePassword: true,
    invitationStatus: 'pending'
  }
];

export const TeamManagement = () => {
  const { toast } = useToast();
  const [teamMembers, setTeamMembers] = useState<EmployeeProfile[]>(mockTeamMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddMember, setShowAddMember] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState<EmployeeProfile | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    password: '',
    confirmPassword: '',
    canChangePassword: true,
    requirePasswordChange: false
  });
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    role: 'employee' as 'admin' | 'manager' | 'employee',
    skills: [] as string[],
    permissions: [] as string[],
    canChangePassword: true
  });

  const availableSkills = [
    'plumbing', 'electrical', 'roofing', 'carpentry', 'painting', 
    'hvac', 'general', 'maintenance', 'flooring', 'drywall'
  ];

  const availablePermissions = [
    'view_dashboard', 'manage_customers', 'manage_jobs', 'view_financials', 
    'manage_team', 'view_reports', 'manage_settings'
  ];

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'on-job': return 'bg-blue-100 text-blue-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInvitationStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handlePasswordManagement = (member: EmployeeProfile) => {
    setSelectedMember(member);
    setPasswordData({
      password: '',
      confirmPassword: '',
      canChangePassword: member.canChangePassword,
      requirePasswordChange: false
    });
    setShowPasswordDialog(true);
  };

  const handleSetPassword = () => {
    if (!selectedMember) return;

    if (passwordData.password !== passwordData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive"
      });
      return;
    }

    if (passwordData.password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive"
      });
      return;
    }

    // Update member password settings
    setTeamMembers(prev => prev.map(member => 
      member.id === selectedMember.id 
        ? { 
            ...member, 
            hasPassword: true, 
            canChangePassword: passwordData.canChangePassword,
            password: passwordData.password // In real app, this would be hashed
          }
        : member
    ));

    toast({
      title: "Password Set",
      description: `Password has been set for ${selectedMember.name}.`,
    });

    setShowPasswordDialog(false);
    setSelectedMember(null);
  };

  const handleAddMember = () => {
    if (!newMember.name || !newMember.email) {
      toast({
        title: "Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const member: EmployeeProfile = {
      id: Date.now().toString(),
      ...newMember,
      coordinates: [0, 0] as [number, number],
      availability: 'offline',
      workload: 0,
      hasPassword: false,
      lastLogin: undefined,
      invitationStatus: 'none'
    };

    setTeamMembers(prev => [...prev, member]);
    
    toast({
      title: "Team Member Added",
      description: `${newMember.name} has been added to the team.`,
    });

    setShowAddMember(false);
    setNewMember({
      name: '', email: '', phone: '', address: '', role: 'employee',
      skills: [], permissions: [], canChangePassword: true
    });
  };

  const toggleSkill = (skill: string) => {
    setNewMember(prev => ({
      ...prev,
      skills: prev.skills.includes(skill) 
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const togglePermission = (permission: string) => {
    setNewMember(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission) 
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Team Management</h2>
        <Button onClick={() => setShowAddMember(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Team Member
        </Button>
      </div>

      <Tabs defaultValue="members" className="space-y-4">
        <TabsList>
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="invitations">Invitations</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Team Members</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{teamMembers.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {teamMembers.filter(m => m.availability === 'available').length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">With Passwords</CardTitle>
                <Lock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {teamMembers.filter(m => m.hasPassword).length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Invites</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {teamMembers.filter(m => m.invitationStatus === 'pending').length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <Card>
            <CardHeader>
              <CardTitle>Team Search</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search team members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
          </Card>

          {/* Team Members Table */}
          <Card>
            <CardHeader>
              <CardTitle>Team Members & Access Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Invitation</TableHead>
                    <TableHead>Password</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground">{member.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          <Shield className="h-3 w-3 mr-1" />
                          {member.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(member.availability)}>
                          {member.availability}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getInvitationStatusColor(member.invitationStatus)}>
                          {member.invitationStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {member.hasPassword ? (
                            <Badge className="bg-green-100 text-green-800">
                              <Lock className="h-3 w-3 mr-1" />
                              Set
                            </Badge>
                          ) : (
                            <Badge variant="outline">
                              Not Set
                            </Badge>
                          )}
                          {member.canChangePassword && (
                            <Badge variant="secondary" className="text-xs">
                              Can Change
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {member.lastLogin ? new Date(member.lastLogin).toLocaleDateString() : 'Never'}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handlePasswordManagement(member)}
                          >
                            <Lock className="h-3 w-3 mr-1" />
                            Password
                          </Button>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invitations">
          <InvitationManager />
        </TabsContent>
      </Tabs>

      {/* Add Member Dialog */}
      {showAddMember && (
        <Dialog open={true} onOpenChange={setShowAddMember}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Team Member</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={(e) => { e.preventDefault(); handleAddMember(); }} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={newMember.name}
                  onChange={(e) => setNewMember(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newMember.email}
                  onChange={(e) => setNewMember(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="email@company.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={newMember.phone}
                  onChange={(e) => setNewMember(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={newMember.address}
                  onChange={(e) => setNewMember(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Enter address"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Select 
                  value={newMember.role} 
                  onValueChange={(value: 'admin' | 'manager' | 'employee') => 
                    setNewMember(prev => ({ ...prev, role: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="employee">Employee</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Skills</Label>
                <div className="grid grid-cols-2 gap-2">
                  {availableSkills.map(skill => (
                    <div key={skill} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={skill}
                        checked={newMember.skills.includes(skill)}
                        onChange={() => toggleSkill(skill)}
                        className="rounded"
                      />
                      <Label htmlFor={skill} className="text-sm capitalize">
                        {skill}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Permissions</Label>
                <div className="grid grid-cols-2 gap-2">
                  {availablePermissions.map(permission => (
                    <div key={permission} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={permission}
                        checked={newMember.permissions.includes(permission)}
                        onChange={() => togglePermission(permission)}
                        className="rounded"
                      />
                      <Label htmlFor={permission} className="text-sm capitalize">
                        {permission.replace('_', ' ')}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="canChangePassword"
                  checked={newMember.canChangePassword}
                  onChange={(e) => setNewMember(prev => ({ ...prev, canChangePassword: e.target.checked }))}
                  className="rounded"
                />
                <Label htmlFor="canChangePassword">Allow employee to change their own password</Label>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setShowAddMember(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Add Member
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Password Management Dialog */}
      {showPasswordDialog && selectedMember && (
        <Dialog open={true} onOpenChange={setShowPasswordDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Password Management - {selectedMember.name}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={passwordData.password}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Enter new password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  placeholder="Confirm new password"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="canChangePassword"
                  checked={passwordData.canChangePassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, canChangePassword: e.target.checked }))}
                  className="rounded"
                />
                <Label htmlFor="canChangePassword">Allow employee to change their password</Label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="requirePasswordChange"
                  checked={passwordData.requirePasswordChange}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, requirePasswordChange: e.target.checked }))}
                  className="rounded"
                />
                <Label htmlFor="requirePasswordChange">Require password change on next login</Label>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setShowPasswordDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSetPassword}>
                  Set Password
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
