
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LucideIcon } from "lucide-react";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { SidebarHomeButton } from "./sidebar/SidebarHomeButton";
import { SidebarCollapsedGroup } from "./sidebar/SidebarCollapsedGroup";
import { SidebarExpandedGroup } from "./sidebar/SidebarExpandedGroup";
import { createMenuGroups } from "./sidebar/menuGroups";

interface SidebarSection {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface MegaMenuSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  sections: SidebarSection[];
  isVisible?: boolean;
  collapsed?: boolean;
  onToggleCollapse?: (collapsed: boolean) => void;
}

export const MegaMenuSidebar = ({ 
  activeSection, 
  onSectionChange, 
  sections, 
  isVisible = true,
  collapsed = false,
  onToggleCollapse
}: MegaMenuSidebarProps) => {
  const [openGroups, setOpenGroups] = useState<string[]>([]);

  const menuGroups = createMenuGroups(sections);

  // Initialize open groups based on active section
  useEffect(() => {
    const activeGroup = menuGroups.find(group => 
      group.items.some(item => item.id === activeSection)
    );
    if (activeGroup && !openGroups.includes(activeGroup.label)) {
      setOpenGroups(prev => [...prev, activeGroup.label]);
    }
  }, [activeSection]);

  const toggleGroup = (groupLabel: string) => {
    if (!collapsed) {
      setOpenGroups(prev => 
        prev.includes(groupLabel) 
          ? prev.filter(g => g !== groupLabel)
          : [...prev, groupLabel]
      );
    }
  };

  const handleToggleCollapse = () => {
    if (onToggleCollapse) {
      onToggleCollapse(!collapsed);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={cn(
      "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-slate-900 border-r border-slate-700 z-40 flex flex-col transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <SidebarHeader 
        collapsed={collapsed} 
        onToggleCollapse={handleToggleCollapse} 
      />

      <SidebarHomeButton 
        activeSection={activeSection}
        onSectionChange={onSectionChange}
        collapsed={collapsed}
      />
      
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-2">
          {menuGroups.map((group) => {
            if (group.items.length === 0) return null;
            
            const isOpen = (!collapsed && openGroups.includes(group.label)) || group.defaultOpen;
            const hasActiveItem = group.items.some(item => item.id === activeSection);
            
            if (collapsed) {
              return (
                <SidebarCollapsedGroup
                  key={group.label}
                  group={group}
                  hasActiveItem={hasActiveItem}
                  activeSection={activeSection}
                  onSectionChange={onSectionChange}
                />
              );
            }
            
            return (
              <SidebarExpandedGroup
                key={group.label}
                group={group}
                isOpen={isOpen}
                onToggleGroup={toggleGroup}
                activeSection={activeSection}
                onSectionChange={onSectionChange}
              />
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};
