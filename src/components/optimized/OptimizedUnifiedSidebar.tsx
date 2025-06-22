
import React, { useEffect, memo, useMemo, useCallback } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LucideIcon } from "lucide-react";
import { SidebarHeader } from "../sidebar/SidebarHeader";
import { SidebarSearch } from "../sidebar/SidebarSearch";
import { SidebarDashboard } from "../sidebar/SidebarDashboard";
import { SidebarMenuGroup } from "../sidebar/SidebarMenuGroup";
import { usePerformanceMonitor } from "../../utils/performanceUtils";
import { createOptimizedMenuGroups, SidebarSection } from "./OptimizedSidebarConfig";
import { useOptimizedSidebarState } from "./OptimizedSidebarState";

interface OptimizedUnifiedSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  sections: SidebarSection[];
  isVisible?: boolean;
}

export const OptimizedUnifiedSidebar = memo(({ 
  activeSection, 
  onSectionChange, 
  sections, 
  isVisible = true 
}: OptimizedUnifiedSidebarProps) => {
  usePerformanceMonitor('OptimizedUnifiedSidebar');
  
  const {
    isCollapsed,
    searchTerm,
    openGroups,
    companyData,
    toggleCollapse,
    toggleGroup,
    handleSearchChange,
    setOpenGroups
  } = useOptimizedSidebarState();

  // Memoize menu groups to prevent recalculation on every render
  const menuGroups = useMemo(() => createOptimizedMenuGroups(sections), [sections]);

  // Memoize filtered groups for search performance
  const filteredGroups = useMemo(() => 
    menuGroups.map(group => ({
      ...group,
      sections: group.sections.filter(section =>
        section.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(group => group.sections.length > 0),
    [menuGroups, searchTerm]
  );

  // Use useCallback for event handlers to prevent child re-renders
  const handleSectionClick = useCallback((sectionId: string) => {
    console.log('OptimizedUnifiedSidebar: Section clicked:', sectionId);
    onSectionChange(sectionId);
  }, [onSectionChange]);

  // Auto-expand group containing active section
  useEffect(() => {
    const activeGroup = menuGroups.find(group => 
      group.sections.some(section => section.id === activeSection)
    );
    if (activeGroup && !openGroups.includes(activeGroup.id)) {
      setOpenGroups(prev => [...prev, activeGroup.id]);
    }
  }, [activeSection, menuGroups, openGroups, setOpenGroups]);

  if (!isVisible) {
    return null;
  }

  return (
    <div 
      className={cn(
        "fixed left-0 top-0 h-full bg-card border-r border-border/40 z-40 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <SidebarHeader 
        companyData={companyData}
        isCollapsed={isCollapsed}
        onToggleCollapse={toggleCollapse}
      />

      <SidebarSearch 
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        isCollapsed={isCollapsed}
      />

      <SidebarDashboard 
        activeSection={activeSection}
        onSectionClick={handleSectionClick}
        isCollapsed={isCollapsed}
      />

      <ScrollArea className="flex-1 px-2 py-4">
        <nav className="space-y-2">
          {filteredGroups.map((group) => {
            if (group.sections.length === 0) return null;
            
            const isOpen = openGroups.includes(group.id) || group.defaultOpen;

            return (
              <SidebarMenuGroup
                key={group.id}
                group={group}
                isOpen={isOpen}
                onToggleGroup={toggleGroup}
                activeSection={activeSection}
                onSectionClick={handleSectionClick}
                isCollapsed={isCollapsed}
              />
            );
          })}
        </nav>
      </ScrollArea>
    </div>
  );
});

OptimizedUnifiedSidebar.displayName = 'OptimizedUnifiedSidebar';
