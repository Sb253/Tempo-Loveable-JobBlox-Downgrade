
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EmployeeProfile } from '../../types/auth';
import { useToast } from "@/hooks/use-toast";

interface EditMemberDialogProps {
  member: EmployeeProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (member: EmployeeProfile) => void;
}

const availableSkills = [
  'plumbing', 'electrical', 'roofing', 'carpentry', 'painting', 
  'hvac', 'general', 'maintenance', 'flooring', 'drywall'
];

const availablePermissions = [
  'view_dashboard', 'manage_customers', 'manage_jobs', 'view_financials', 
  'manage_team', 'view_reports', 'manage_settings'
];

export const EditMemberDialog = ({ member, isOpen, onClose, onSave }: EditMemberDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<EmployeeProfile | null>(null);

  useEffect(() => {
    if (member) {
      setFormData({ ...member });
    }
  }, [member]);

  if (!formData || !member) return null;

  const handleSave = () => {
    if (!formData.name || !formData.email) {
      toast({
        title: "Validation Error",
        description: "Name and email are required fields.",
        variant: "destructive"
      });
      return;
    }

    onSave(formData);
    toast({
      title: "Member Updated",
      description: `${formData.name} has been updated successfully.`,
    });
    onClose();
  };

  const toggleSkill = (skill: string) => {
    setFormData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        skills: prev.skills.includes(skill) 
          ? prev.skills.filter(s => s !== skill)
          : [...prev.skills, skill]
      };
    });
  };

  const togglePermission = (permission: string) => {
    setFormData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        permissions: prev.permissions.includes(permission) 
          ? prev.permissions.filter(p => p !== permission)
          : [...prev.permissions, permission]
      };
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Team Member - {member.name}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => prev ? { ...prev, name: e.target.value } : prev)}
                placeholder="Enter full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => prev ? { ...prev, email: e.target.value } : prev)}
                placeholder="email@company.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => prev ? { ...prev, phone: e.target.value } : prev)}
                placeholder="(555) 123-4567"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select 
                value={formData.role} 
                onValueChange={(value: 'admin' | 'manager' | 'employee') => 
                  setFormData(prev => prev ? { ...prev, role: value } : prev)
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData(prev => prev ? { ...prev, address: e.target.value } : prev)}
              placeholder="Enter address"
            />
          </div>

          <div className="space-y-2">
            <Label>Skills</Label>
            <div className="grid grid-cols-3 gap-2">
              {availableSkills.map(skill => (
                <div key={skill} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`skill-${skill}`}
                    checked={formData.skills.includes(skill)}
                    onChange={() => toggleSkill(skill)}
                    className="rounded"
                  />
                  <Label htmlFor={`skill-${skill}`} className="text-sm capitalize">
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
                    id={`perm-${permission}`}
                    checked={formData.permissions.includes(permission)}
                    onChange={() => togglePermission(permission)}
                    className="rounded"
                  />
                  <Label htmlFor={`perm-${permission}`} className="text-sm capitalize">
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
              checked={formData.canChangePassword}
              onChange={(e) => setFormData(prev => prev ? { ...prev, canChangePassword: e.target.checked } : prev)}
              className="rounded"
            />
            <Label htmlFor="canChangePassword">Allow employee to change their own password</Label>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
