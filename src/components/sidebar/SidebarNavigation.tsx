
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarMenuGroup } from "./SidebarMenuGroup";
import { MenuGroup } from "./config/menuGroupsConfig";

interface SidebarNavigationProps {
  filteredGroups: MenuGroup[];
  openGroups: string[];
  activeSection: string;
  onToggleGroup: (groupId: string) => void;
  onSectionClick: (sectionId: string) => void;
  isCollapsed: boolean;
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  filteredGroups,
  openGroups,
  activeSection,
  onToggleGroup,
  onSectionClick,
  isCollapsed
}) => {
  return (
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
              onToggleGroup={onToggleGroup}
              activeSection={activeSection}
              onSectionClick={onSectionClick}
              isCollapsed={isCollapsed}
            />
          );
        })}
      </nav>
    </ScrollArea>
  );
};
