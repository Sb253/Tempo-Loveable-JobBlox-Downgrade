
import React from 'react';
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarDashboardProps {
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
  isCollapsed: boolean;
}

export const SidebarDashboard: React.FC<SidebarDashboardProps> = ({
  activeSection,
  onSectionClick,
  isCollapsed
}) => {
  return (
    <div className="p-2 border-b border-border/40">
      <Button
        variant={activeSection === 'home' ? "default" : "ghost"}
        size={isCollapsed ? "icon" : "default"}
        className={cn(
          "w-full",
          isCollapsed ? "h-12 px-0" : "justify-start gap-3 h-10",
          activeSection === 'home' && "bg-primary text-primary-foreground"
        )}
        onClick={() => onSectionClick('home')}
        title={isCollapsed ? "Dashboard" : undefined}
      >
        <Home className="h-5 w-5" />
        {!isCollapsed && <span>Dashboard</span>}
      </Button>
    </div>
  );
};
