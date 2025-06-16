
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Mail, Plus, Copy, Trash2, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { InvitationData } from '../../types/auth';

const availablePermissions = [
  'view_dashboard', 'manage_customers', 'manage_jobs', 'view_financials', 
  'manage_team', 'view_reports', 'manage_settings', 'manage_invitations'
];

export const InvitationManager = () => {
  const { toast } = useToast();
  const [invitations, setInvitations] = useState<InvitationData[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newInvitation, setNewInvitation] = useState({
    email: '',
    role: 'employee' as 'admin' | 'manager' | 'employee',
    permissions: [] as string[]
  });

  const generateInvitationToken = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  };

  const handleCreateInvitation = () => {
    if (!newInvitation.email || !newInvitation.role) {
      toast({
        title: "Invalid Data",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const invitation: InvitationData = {
      id: Date.now().toString(),
      email: newInvitation.email,
      role: newInvitation.role,
      permissions: newInvitation.permissions,
      token: generateInvitationToken(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
      status: 'pending',
      invitedBy: 'Current User', // Replace with actual user
      invitedAt: new Date().toISOString()
    };

    setInvitations(prev => [...prev, invitation]);

    // Save to localStorage for persistence
    const updatedInvitations = [...invitations, invitation];
    localStorage.setItem('invitations', JSON.stringify(updatedInvitations));

    toast({
      title: "Invitation Sent",
      description: `Invitation sent to ${newInvitation.email}`,
    });

    setNewInvitation({ email: '', role: 'employee', permissions: [] });
    setShowCreateDialog(false);
  };

  const copyInvitationLink = (token: string) => {
    const inviteLink = `${window.location.origin}/accept-invitation?token=${token}`;
    navigator.clipboard.writeText(inviteLink);
    toast({
      title: "Link Copied",
      description: "Invitation link copied to clipboard",
    });
  };

  const resendInvitation = (invitationId: string) => {
    setInvitations(prev => prev.map(inv => 
      inv.id === invitationId 
        ? { ...inv, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() }
        : inv
    ));
    
    toast({
      title: "Invitation Resent",
      description: "Invitation has been resent with a new expiration date",
    });
  };

  const deleteInvitation = (invitationId: string) => {
    setInvitations(prev => prev.filter(inv => inv.id !== invitationId));
    
    const updatedInvitations = invitations.filter(inv => inv.id !== invitationId);
    localStorage.setItem('invitations', JSON.stringify(updatedInvitations));
    
    toast({
      title: "Invitation Deleted",
      description: "Invitation has been removed",
      variant: "destructive"
    });
  };

  const togglePermission = (permission: string) => {
    setNewInvitation(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  const getStatusColor = (status: string, expiresAt: string) => {
    if (new Date(expiresAt) < new Date()) return 'bg-red-100 text-red-800';
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Employee Invitations</h3>
          <p className="text-sm text-muted-foreground">Invite team members to join the platform</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Send Invitation
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Pending & Active Invitations
          </CardTitle>
        </CardHeader>
        <CardContent>
          {invitations.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No invitations sent yet</p>
              <p className="text-sm">Click "Send Invitation" to get started</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Invited At</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invitations.map((invitation) => (
                  <TableRow key={invitation.id}>
                    <TableCell>{invitation.email}</TableCell>
                    <TableCell className="capitalize">{invitation.role}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(invitation.status, invitation.expiresAt)}>
                        {new Date(invitation.expiresAt) < new Date() ? 'Expired' : invitation.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(invitation.invitedAt).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(invitation.expiresAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyInvitationLink(invitation.token)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => resendInvitation(invitation.id)}
                        >
                          <RefreshCw className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteInvitation(invitation.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Create Invitation Dialog */}
      {showCreateDialog && (
        <Dialog open={true} onOpenChange={setShowCreateDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Send Employee Invitation</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newInvitation.email}
                    onChange={(e) => setNewInvitation(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="employee@company.com"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select 
                    value={newInvitation.role} 
                    onValueChange={(value: 'admin' | 'manager' | 'employee') => 
                      setNewInvitation(prev => ({ ...prev, role: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employee">Employee</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
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
                        checked={newInvitation.permissions.includes(permission)}
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
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateInvitation}>
                  Send Invitation
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
