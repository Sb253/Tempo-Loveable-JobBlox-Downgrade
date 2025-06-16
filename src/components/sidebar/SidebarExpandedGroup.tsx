
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";

interface SidebarSection {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface SidebarExpandedGroupProps {
  group: {
    label: string;
    items: SidebarSection[];
    icon: LucideIcon;
  };
  isOpen: boolean;
  onToggleGroup: (groupLabel: string) => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const SidebarExpandedGroup = ({ 
  group, 
  isOpen, 
  onToggleGroup, 
  activeSection, 
  onSectionChange 
}: SidebarExpandedGroupProps) => {
  const GroupIcon = group.icon;
  
  return (
    <Collapsible open={isOpen} onOpenChange={() => onToggleGroup(group.label)}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-between p-3 h-auto font-medium text-left text-slate-300 hover:text-white hover:bg-slate-800"
        >
          <div className="flex items-center gap-3">
            <GroupIcon className="h-4 w-4" />
            <span>{group.label}</span>
          </div>
          {isOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </CollapsibleTrigger>
      
      <CollapsibleContent className="ml-4 mt-1 space-y-1">
        {group.items.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          
          return (
            <Button
              key={section.id}
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 text-sm h-9 text-slate-400 hover:text-white hover:bg-slate-800",
                isActive && "bg-blue-600 text-white hover:bg-blue-700"
              )}
              onClick={() => {
                console.log('SidebarExpandedGroup: Section clicked:', section.id);
                onSectionChange(section.id);
              }}
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
