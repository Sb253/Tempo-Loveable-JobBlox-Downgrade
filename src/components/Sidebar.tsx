
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  Receipt, 
  BarChart3, 
  Settings,
  ClipboardCheck,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export const Sidebar = ({ activeView, setActiveView }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "appointment", label: "Appointment", icon: ClipboardCheck },
    { id: "customers", label: "Customers", icon: Users },
    { id: "jobs", label: "Jobs", icon: Calendar },
    { id: "estimates", label: "Estimates", icon: FileText },
    { id: "invoices", label: "Invoices", icon: Receipt },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "reports", label: "Reports", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className={`bg-white shadow-lg transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          {!isCollapsed && <h2 className="text-xl font-bold text-primary">ConstructCRM</h2>}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeView === item.id ? "default" : "ghost"}
                className={`w-full justify-start ${isCollapsed ? 'px-2' : 'px-4'}`}
                onClick={() => setActiveView(item.id)}
              >
                <Icon className="h-4 w-4" />
                {!isCollapsed && <span className="ml-2">{item.label}</span>}
              </Button>
            );
          })}
        </nav>
      </ScrollArea>
    </div>
  );
};
