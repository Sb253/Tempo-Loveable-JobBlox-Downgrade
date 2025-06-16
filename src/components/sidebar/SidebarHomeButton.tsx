
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Building2 } from "lucide-react";

interface SidebarHomeButtonProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  collapsed: boolean;
}

export const SidebarHomeButton = ({ activeSection, onSectionChange, collapsed }: SidebarHomeButtonProps) => {
  return (
    <div className="p-2">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-3 text-slate-300 hover:text-white hover:bg-slate-800",
          activeSection === 'home' && "bg-blue-600 text-white hover:bg-blue-700",
          collapsed && "justify-center px-2"
        )}
        onClick={() => onSectionChange('home')}
        title={collapsed ? "Home" : undefined}
      >
        <Building2 className="h-5 w-5" />
        {!collapsed && <span>Home</span>}
      </Button>
    </div>
  );
};
