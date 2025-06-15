
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface SidebarSection {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  sections: SidebarSection[];
}

export const Sidebar = ({ activeSection, onSectionChange, sections }: SidebarProps) => {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary">Construction CRM</h1>
      </div>
      
      <nav className="px-4 space-y-2">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Button
              key={section.id}
              variant={activeSection === section.id ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3",
                activeSection === section.id && "bg-primary text-primary-foreground"
              )}
              onClick={() => onSectionChange(section.id)}
            >
              <Icon className="h-5 w-5" />
              {section.label}
            </Button>
          );
        })}
      </nav>
    </div>
  );
};
