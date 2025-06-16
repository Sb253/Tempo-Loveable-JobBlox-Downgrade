
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SidebarSection {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface SidebarCollapsedGroupProps {
  group: {
    label: string;
    items: SidebarSection[];
    icon: LucideIcon;
  };
  hasActiveItem: boolean;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const SidebarCollapsedGroup = ({ 
  group, 
  hasActiveItem, 
  activeSection, 
  onSectionChange 
}: SidebarCollapsedGroupProps) => {
  const GroupIcon = group.icon;
  
  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "w-full h-10 text-slate-400 hover:text-white hover:bg-slate-800 group relative",
          hasActiveItem && "bg-blue-600 text-white hover:bg-blue-700"
        )}
        title={group.label}
      >
        <GroupIcon className="h-4 w-4" />
        
        <div className="absolute left-full top-0 ml-2 hidden group-hover:block z-50">
          <div className="bg-slate-800 border border-slate-600 rounded-lg shadow-lg py-2 min-w-48">
            <div className="px-3 py-1 text-xs font-medium text-slate-300 border-b border-slate-600 mb-1">
              {group.label}
            </div>
            {group.items.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              
              return (
                <button
                  key={section.id}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 text-sm text-left text-slate-300 hover:text-white hover:bg-slate-700",
                    isActive && "bg-blue-600 text-white"
                  )}
                  onClick={() => {
                    console.log('SidebarCollapsedGroup: Section clicked:', section.id);
                    onSectionChange(section.id);
                  }}
                >
                  <Icon className="h-4 w-4" />
                  {section.label}
                </button>
              );
            })}
          </div>
        </div>
      </Button>
    </div>
  );
};
