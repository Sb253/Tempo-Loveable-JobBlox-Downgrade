import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Menu,
  Home,
  Users,
  Calendar,
  Settings,
  Bell,
  User,
  LogOut,
  Building2,
  Video,
  BarChart3,
  DollarSign,
  FileText,
  MapPin,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { ProtectedRoute } from "../auth/ProtectedRoute";

const ResponsiveLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const navigationItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: Users, label: "Members", path: "/members" },
    { icon: Video, label: "Meetings", path: "/meetings" },
    { icon: Bell, label: "Notifications", path: "/notifications" },
    { icon: User, label: "Profile", path: "/profile" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 p-6 border-b">
        <Building2 className="h-8 w-8 text-primary" />
        <h1 className="text-xl font-bold">JobBlox</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActivePath(item.path);
            return (
              <Button
                key={item.path}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start gap-3 ${isActive ? "bg-primary text-primary-foreground" : ""}`}
                onClick={() => handleNavigation(item.path)}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Button>
            );
          })}
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src="" alt={user?.name} />
            <AvatarFallback>
              {user?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("") || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{user?.name || "User"}</p>
            <p className="text-sm text-muted-foreground truncate">
              {user?.email}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline" className="text-xs">
            {user?.role || "User"}
          </Badge>
          <Badge
            variant="outline"
            className="text-xs bg-green-50 text-green-700 border-green-200"
          >
            Active
          </Badge>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        {/* Desktop Sidebar */}
        {!isMobile && (
          <div className="fixed inset-y-0 left-0 w-64 bg-card border-r">
            <SidebarContent />
          </div>
        )}

        {/* Mobile Header */}
        {isMobile && (
          <div className="sticky top-0 z-50 bg-background border-b px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sheet
                  open={isMobileMenuOpen}
                  onOpenChange={setIsMobileMenuOpen}
                >
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-64 p-0">
                    <SidebarContent />
                  </SheetContent>
                </Sheet>
                <div className="flex items-center gap-2">
                  <Building2 className="h-6 w-6 text-primary" />
                  <h1 className="text-lg font-bold">JobBlox</h1>
                </div>
              </div>
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt={user?.name} />
                <AvatarFallback className="text-sm">
                  {user?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("") || "U"}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className={`${!isMobile ? "ml-64" : ""}`}>
          <main className="min-h-screen">
            <Outlet />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ResponsiveLayout;
