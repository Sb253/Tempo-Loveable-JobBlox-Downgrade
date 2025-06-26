import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Building2, Eye, EyeOff, Zap, Mail, Lock } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { LoginCredentials } from "../../types/auth";
import { useToast } from "@/hooks/use-toast";

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export const LoginPage = ({ onLoginSuccess }: LoginPageProps) => {
  const { login, isLoading, isDemoMode, enableDemoMode, bypassLogin } =
    useAuth();
  const { toast } = useToast();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<LoginCredentials>>({});

  const validateForm = () => {
    const newErrors: Partial<LoginCredentials> = {};

    if (!credentials.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!credentials.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const success = await login(credentials);
      if (success) {
        toast({
          title: "Login Successful",
          description: "Welcome back to JobBlox!",
        });
        onLoginSuccess();
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDemoLogin = () => {
    if (!isDemoMode) {
      enableDemoMode();
    }
    onLoginSuccess();
    toast({
      title: "Demo Mode Activated",
      description: "You're now using JobBlox in demo mode.",
    });
  };

  const handleBypassLogin = () => {
    bypassLogin();
    onLoginSuccess();
    toast({
      title: "Login Bypassed",
      description: "You have been logged in as a demo user.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Building2 className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">JobBlox Login</CardTitle>
          <p className="text-muted-foreground">Sign in to your account</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={credentials.email}
                  onChange={(e) =>
                    setCredentials((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  placeholder="your.email@company.com"
                  className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  placeholder="Enter your password"
                  className={`pl-10 pr-10 ${errors.password ? "border-red-500" : ""}`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center gap-2"
              onClick={handleDemoLogin}
            >
              <Zap className="h-4 w-4" />
              Demo Access (No Login Required)
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center gap-2 border-orange-500 text-orange-600 hover:bg-orange-50"
              onClick={handleBypassLogin}
            >
              <Zap className="h-4 w-4" />
              Bypass Login (Development)
            </Button>
          </div>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>
              Need an account? Contact your administrator for an invitation.
            </p>
            {isDemoMode && (
              <p className="mt-2 text-blue-600 font-medium">Demo Mode Active</p>
            )}
            <p className="mt-2 text-xs text-gray-500">
              Demo credentials: demo@jobblox.com / any password
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
