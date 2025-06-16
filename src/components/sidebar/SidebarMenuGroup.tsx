
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarSection {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface MenuGroup {
  id: string;
  label: string;
  icon: LucideIcon;
  sections: SidebarSection[];
  badge?: string;
  defaultOpen?: boolean;
}

interface SidebarMenuGroupProps {
  group: MenuGroup;
  isOpen: boolean;
  onToggleGroup: (groupId: string) => void;
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
  isCollapsed: boolean;
}

export const SidebarMenuGroup: React.FC<SidebarMenuGroupProps> = ({
  group,
  isOpen,
  onToggleGroup,
  activeSection,
  onSectionClick,
  isCollapsed
}) => {
  const GroupIcon = group.icon;
  const hasActiveSection = group.sections.some(section => section.id === activeSection);

  if (isCollapsed) {
    return (
      <div className="relative group">
        <Button
          variant={hasActiveSection ? "default" : "ghost"}
          size="icon"
          className={cn(
            "w-12 h-12 mx-auto relative",
            hasActiveSection && "bg-primary text-primary-foreground"
          )}
          onClick={() => {
            if (group.sections.length === 1) {
              onSectionClick(group.sections[0].id);
            } else {
              // Expand sidebar and group when collapsed
              onToggleGroup(group.id);
            }
          }}
          title={group.label}
        >
          <GroupIcon className="h-5 w-5" />
          {hasActiveSection && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-background" />
          )}
          {group.badge && (
            <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 text-xs">
              {group.badge}
            </Badge>
          )}
        </Button>
      </div>
    );
  }

  return (
    <Collapsible open={isOpen} onOpenChange={() => onToggleGroup(group.id)}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-between p-3 h-auto font-medium text-left hover:bg-accent"
        >
          <div className="flex items-center gap-3">
            <GroupIcon className="h-4 w-4" />
            <span className="flex-1">{group.label}</span>
            {group.badge && (
              <Badge variant="secondary" className="h-5 text-xs">
                {group.badge}
              </Badge>
            )}
          </div>
          {isOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </CollapsibleTrigger>
      
      <CollapsibleContent className="ml-4 mt-1 space-y-1">
        {group.sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          
          return (
            <Button
              key={section.id}
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 text-sm h-9 hover:bg-accent",
                isActive && "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
              onClick={() => onSectionClick(section.id)}
            >
              <Icon className="h-4 w-4" />
              {section.label}
            </Button>
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
};
