
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Users, 
  Briefcase, 
  MessageSquare, 
  Star,
  Truck
} from "lucide-react";

export const MainNavigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/members", label: "Members", icon: Users },
    { path: "/jobs", label: "Jobs", icon: Briefcase },
    { path: "/communication", label: "Communication", icon: MessageSquare },
    { path: "/reviews", label: "Reviews", icon: Star },
    { path: "/vehicles", label: "Vehicles", icon: Truck },
  ];

  return (
    <nav className="flex gap-2 p-4 bg-background border-b">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        
        return (
          <Link key={item.path} to={item.path}>
            <Button 
              variant={isActive ? "default" : "outline"}
              className="flex items-center gap-2"
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Button>
          </Link>
        );
      })}
    </nav>
  );
};
