
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { EmployeeProfile } from '../../types/auth';

interface PasswordManagementDialogProps {
  isOpen: boolean;
  member: EmployeeProfile | null;
  onClose: () => void;
  onSetPassword: (memberId: string, passwordData: any) => void;
}

export const PasswordManagementDialog = ({ 
  isOpen, 
  member, 
  onClose, 
  onSetPassword 
}: PasswordManagementDialogProps) => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    password: '',
    confirmPassword: '',
    canChangePassword: true,
    requirePasswordChange: false
  });

  const handleSetPassword = () => {
    if (!member) return;

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

    onSetPassword(member.id, passwordData);

    toast({
      title: "Password Set",
      description: `Password has been set for ${member.name}.`,
    });

    onClose();
    setPasswordData({
      password: '',
      confirmPassword: '',
      canChangePassword: true,
      requirePasswordChange: false
    });
  };

  if (!member) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Password Management - {member.name}</DialogTitle>
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
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSetPassword}>
              Set Password
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
