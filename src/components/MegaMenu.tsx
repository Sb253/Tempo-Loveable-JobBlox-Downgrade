
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  Receipt, 
  BarChart3, 
  Settings,
  ClipboardCheck,
  Menu,
  ChevronDown
} from "lucide-react";

interface MegaMenuProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export const MegaMenu = ({ activeView, setActiveView }: MegaMenuProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuSections = {
    dashboard: {
      label: "Dashboard",
      icon: LayoutDashboard,
      items: [
        { id: "dashboard", label: "Overview", description: "Main dashboard view" },
        { id: "reports", label: "Reports", description: "Analytics and reports" },
      ]
    },
    customers: {
      label: "Customers",
      icon: Users,
      items: [
        { id: "customers", label: "Customer List", description: "Manage all customers" },
        { id: "appointment", label: "Appointments", description: "Client appointments" },
      ]
    },
    projects: {
      label: "Projects",
      icon: Calendar,
      items: [
        { id: "jobs", label: "Jobs", description: "Manage construction jobs" },
        { id: "estimates", label: "Estimates", description: "Project estimates" },
        { id: "schedule", label: "Schedule", description: "Project scheduling" },
      ]
    },
    financial: {
      label: "Financial",
      icon: Receipt,
      items: [
        { id: "invoices", label: "Invoices", description: "Billing and invoices" },
        { id: "reports", label: "Financial Reports", description: "Financial analytics" },
      ]
    },
    settings: {
      label: "Settings",
      icon: Settings,
      items: [
        { id: "settings", label: "System Settings", description: "Configure application" },
      ]
    }
  };

  const isActive = (itemId: string) => activeView === itemId;

  return (
    <div className="border-b bg-white shadow-sm">
      <div className="flex h-16 items-center px-6">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-primary">ConstructCRM</h1>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex ml-8">
          <NavigationMenuList className="space-x-1">
            {Object.entries(menuSections).map(([key, section]) => {
              const Icon = section.icon;
              return (
                <NavigationMenuItem key={key}>
                  <NavigationMenuTrigger className="h-10 px-4 py-2">
                    <Icon className="h-4 w-4 mr-2" />
                    {section.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-6">
                      {section.items.map((item) => (
                        <NavigationMenuLink key={item.id} asChild>
                          <button
                            onClick={() => setActiveView(item.id)}
                            className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-left ${
                              isActive(item.id) ? 'bg-accent text-accent-foreground' : ''
                            }`}
                          >
                            <div className="text-sm font-medium leading-none">
                              {item.label}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {item.description}
                            </p>
                          </button>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Menu */}
        <div className="md:hidden ml-auto">
          <DropdownMenu open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white" align="end">
              {Object.entries(menuSections).map(([key, section]) => {
                const Icon = section.icon;
                return (
                  <div key={key}>
                    <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground flex items-center">
                      <Icon className="h-4 w-4 mr-2" />
                      {section.label}
                    </div>
                    {section.items.map((item) => (
                      <DropdownMenuItem
                        key={item.id}
                        onClick={() => {
                          setActiveView(item.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`ml-6 ${isActive(item.id) ? 'bg-accent' : ''}`}
                      >
                        {item.label}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                  </div>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
