
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface AddMemberDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMember: (member: any) => void;
}

const availableSkills = [
  'plumbing', 'electrical', 'roofing', 'carpentry', 'painting', 
  'hvac', 'general', 'maintenance', 'flooring', 'drywall'
];

const availablePermissions = [
  'view_dashboard', 'manage_customers', 'manage_jobs', 'view_financials', 
  'manage_team', 'view_reports', 'manage_settings'
];

export const AddMemberDialog = ({ isOpen, onClose, onAddMember }: AddMemberDialogProps) => {
  const { toast } = useToast();
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

  const handleAddMember = () => {
    if (!newMember.name || !newMember.email) {
      toast({
        title: "Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    onAddMember(newMember);
    
    toast({
      title: "Team Member Added",
      description: `${newMember.name} has been added to the team.`,
    });

    onClose();
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
    <Dialog open={isOpen} onOpenChange={onClose}>
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
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Add Member
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
