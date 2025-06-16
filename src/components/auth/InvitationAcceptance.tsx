
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, CheckCircle, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { InvitationData } from '../../types/auth';

interface InvitationAcceptanceProps {
  token: string;
  onAcceptanceComplete: () => void;
}

export const InvitationAcceptance = ({ token, onAcceptanceComplete }: InvitationAcceptanceProps) => {
  const { toast } = useToast();
  const [invitation, setInvitation] = useState<InvitationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    // Load invitation data from localStorage
    const invitations = JSON.parse(localStorage.getItem('invitations') || '[]');
    const foundInvitation = invitations.find((inv: InvitationData) => inv.token === token);
    
    if (foundInvitation) {
      if (new Date(foundInvitation.expiresAt) < new Date()) {
        toast({
          title: "Invitation Expired",
          description: "This invitation has expired. Please contact your administrator.",
          variant: "destructive"
        });
      } else if (foundInvitation.status === 'accepted') {
        toast({
          title: "Already Accepted",
          description: "This invitation has already been accepted.",
          variant: "destructive"
        });
      } else {
        setInvitation(foundInvitation);
      }
    } else {
      toast({
        title: "Invalid Invitation",
        description: "This invitation link is invalid or has been removed.",
        variant: "destructive"
      });
    }
    
    setLoading(false);
  }, [token]);

  const validateForm = () => {
    const newErrors: any = {};
    
    if (!formData.name) {
      newErrors.name = 'Full name is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAcceptInvitation = async () => {
    if (!invitation || !validateForm()) return;
    
    setAccepting(true);
    
    try {
      // Create employee record
      const newEmployee = {
        id: Date.now().toString(),
        name: formData.name,
        email: invitation.email,
        phone: '',
        address: '',
        coordinates: [0, 0],
        skills: [],
        availability: 'offline',
        workload: 0,
        role: invitation.role,
        permissions: invitation.permissions,
        hasPassword: true,
        canChangePassword: true,
        password: formData.password, // In real app, this would be hashed
        invitationStatus: 'accepted',
        createdAt: new Date().toISOString()
      };

      // Save employee to localStorage
      const employees = JSON.parse(localStorage.getItem('employees') || '[]');
      employees.push(newEmployee);
      localStorage.setItem('employees', JSON.stringify(employees));

      // Update invitation status
      const invitations = JSON.parse(localStorage.getItem('invitations') || '[]');
      const updatedInvitations = invitations.map((inv: InvitationData) =>
        inv.token === token
          ? { ...inv, status: 'accepted', acceptedAt: new Date().toISOString() }
          : inv
      );
      localStorage.setItem('invitations', JSON.stringify(updatedInvitations));

      toast({
        title: "Welcome to JobBlox!",
        description: "Your account has been created successfully. You can now log in.",
      });

      onAcceptanceComplete();
    } catch (error) {
      console.error('Error accepting invitation:', error);
      toast({
        title: "Error",
        description: "An error occurred while setting up your account.",
        variant: "destructive"
      });
    } finally {
      setAccepting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading invitation...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!invitation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Building2 className="h-12 w-12 text-destructive mx-auto mb-4" />
            <CardTitle className="text-xl">Invalid Invitation</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              This invitation link is invalid, expired, or has already been used.
            </p>
            <Button onClick={() => window.location.href = '/'}>
              Return to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-bold">Complete Your Registration</CardTitle>
          <p className="text-muted-foreground">
            You've been invited to join JobBlox as a {invitation.role}
          </p>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-lg border">
              <p className="text-sm">
                <strong>Email:</strong> {invitation.email}
              </p>
              <p className="text-sm">
                <strong>Role:</strong> {invitation.role}
              </p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleAcceptInvitation(); }} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Create Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Create a strong password"
                    className={errors.password ? 'border-red-500' : ''}
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
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  placeholder="Confirm your password"
                  className={errors.confirmPassword ? 'border-red-500' : ''}
                />
                {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={accepting}
              >
                {accepting ? 'Setting up account...' : 'Complete Registration'}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
