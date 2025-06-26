import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  Zap,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export const MultiTenantAuth = () => {
  const navigate = useNavigate();
  const { login, bypassLogin, isDemoMode, enableDemoMode } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(loginData);
      if (success) {
        toast({
          title: "Login Successful",
          description: "Welcome back to JobBlox!",
        });
        navigate("/");
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    if (signupData.password.length < 8) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Mock signup process
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const success = await login({
        email: signupData.email,
        password: signupData.password,
      });

      if (success) {
        toast({
          title: "Account Created",
          description: "Your account has been created successfully!",
        });
        navigate("/");
      }
    } catch (error) {
      toast({
        title: "Signup Failed",
        description: "An error occurred during signup. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBypassLogin = () => {
    bypassLogin();
    navigate("/");
    toast({
      title: "Login Bypassed",
      description: "You have been logged in as a demo user.",
    });
  };

  const handleDemoMode = () => {
    enableDemoMode();
    navigate("/");
    toast({
      title: "Demo Mode Activated",
      description: "You're now using JobBlox in demo mode.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-slate-800/80 border-slate-700">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Building2 className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-white">JobBlox</h1>
            </div>
            <CardTitle className="text-white">Welcome</CardTitle>
            <p className="text-slate-400">
              Sign in to your account or create a new one
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="bg-orange-900/20 border border-orange-600/30 rounded-lg p-3">
              <Badge className="mb-2 bg-orange-600/20 text-orange-400 border-orange-600/30">
                Demo Available
              </Badge>
              <p className="text-orange-300 text-sm">
                Try JobBlox with demo data or bypass login for development.
              </p>
            </div>

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-slate-700">
                <TabsTrigger
                  value="login"
                  className="text-slate-300 data-[state=active]:text-white"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="text-slate-300 data-[state=active]:text-white"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-slate-300">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="login-email"
                        type="email"
                        value={loginData.email}
                        onChange={(e) =>
                          setLoginData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        placeholder="Enter your email"
                        className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-slate-300">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData((prev) => ({
                            ...prev,
                            password: e.target.value,
                          }))
                        }
                        placeholder="Enter your password"
                        className="pl-10 pr-10 bg-slate-700 border-slate-600 text-white placeholder-slate-400"
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

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name" className="text-slate-300">
                        Name
                      </Label>
                      <Input
                        id="signup-name"
                        value={signupData.name}
                        onChange={(e) =>
                          setSignupData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        placeholder="Your name"
                        className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="signup-company"
                        className="text-slate-300"
                      >
                        Company
                      </Label>
                      <Input
                        id="signup-company"
                        value={signupData.company}
                        onChange={(e) =>
                          setSignupData((prev) => ({
                            ...prev,
                            company: e.target.value,
                          }))
                        }
                        placeholder="Company name"
                        className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-slate-300">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="signup-email"
                        type="email"
                        value={signupData.email}
                        onChange={(e) =>
                          setSignupData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        placeholder="Enter your email"
                        className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-slate-300">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="signup-password"
                        type="password"
                        value={signupData.password}
                        onChange={(e) =>
                          setSignupData((prev) => ({
                            ...prev,
                            password: e.target.value,
                          }))
                        }
                        placeholder="Create password"
                        className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm" className="text-slate-300">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="signup-confirm"
                        type="password"
                        value={signupData.confirmPassword}
                        onChange={(e) =>
                          setSignupData((prev) => ({
                            ...prev,
                            confirmPassword: e.target.value,
                          }))
                        }
                        placeholder="Confirm password"
                        className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                    disabled={isLoading}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <Separator className="bg-slate-600" />

            <div className="space-y-2">
              <Button
                onClick={handleBypassLogin}
                variant="outline"
                className="w-full border-orange-600 text-orange-400 hover:bg-orange-900/20"
              >
                <Zap className="h-4 w-4 mr-2" />
                Bypass Login (Development)
              </Button>

              <Button
                onClick={handleDemoMode}
                variant="outline"
                className="w-full border-blue-600 text-blue-400 hover:bg-blue-900/20"
              >
                <Zap className="h-4 w-4 mr-2" />
                Try Demo Mode
              </Button>
            </div>

            <div className="text-center space-y-2">
              <p className="text-slate-400 text-sm">
                Demo credentials: demo@jobblox.com / any password
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-400 hover:text-white"
                  onClick={() => navigate("/welcome")}
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Landing
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-400 hover:text-white"
                  onClick={() => navigate("/developer")}
                >
                  Developer Access
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
