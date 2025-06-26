import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  UserPlus,
  CheckCircle,
  Eye,
  EyeOff,
  Lock,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InvitationAcceptanceProps {
  token: string;
  onAcceptanceComplete: () => void;
}

export const InvitationAcceptance: React.FC<InvitationAcceptanceProps> = ({
  token,
  onAcceptanceComplete,
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Mock invitation data - in production, this would be fetched using the token
  const invitationData = {
    email: "newuser@company.com",
    role: "Employee",
    companyName: "Demo Construction Co.",
    invitedBy: "John Manager",
    expiresAt: "2024-02-15",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    if (formData.password.length < 8) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your full name.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Mock API call - in production, this would accept the invitation
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsAccepted(true);
      toast({
        title: "Welcome to the Team!",
        description: "Your account has been created successfully.",
      });

      // Redirect after a short delay
      setTimeout(() => {
        onAcceptanceComplete();
      }, 2000);
    } catch (error) {
      toast({
        title: "Acceptance Failed",
        description: "Failed to accept invitation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isAccepted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-800/80 border-slate-700">
          <CardHeader className="text-center">
            <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
            <CardTitle className="text-2xl text-white">
              Welcome Aboard!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-slate-300 mb-4">
              Your account has been created successfully. You'll be redirected
              to the login page shortly.
            </p>
            <div className="animate-pulse">
              <div className="h-2 bg-green-400 rounded-full"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800/80 border-slate-700">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Building2 className="h-8 w-8 text-primary" />
            <UserPlus className="h-8 w-8 text-green-400" />
          </div>
          <CardTitle className="text-2xl text-white">Join the Team</CardTitle>
          <p className="text-slate-300 mt-2">
            You've been invited to join {invitationData.companyName}
          </p>
        </CardHeader>
        <CardContent>
          {/* Invitation Details */}
          <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Email:</span>
                <span className="text-white">{invitationData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Role:</span>
                <Badge variant="outline" className="text-xs">
                  {invitationData.role}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Invited by:</span>
                <span className="text-white">{invitationData.invitedBy}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Expires:</span>
                <span className="text-white">{invitationData.expiresAt}</span>
              </div>
            </div>
          </div>

          {/* Acceptance Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-300">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  className="pl-10 pr-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 text-slate-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-slate-300">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }))
                  }
                  className="pl-10 pr-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 text-slate-400 hover:text-white"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Accept Invitation"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-slate-400">
              By accepting this invitation, you agree to the terms of service
              and privacy policy.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
