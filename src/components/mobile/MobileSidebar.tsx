
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Building2, Home } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface SidebarSection {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface MobileSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  sections: SidebarSection[];
  isOpen: boolean;
  onClose: () => void;
}

const quickAccessSections = [
  'jobs',
  'customers', 
  'schedule',
  'time-tracking',
  'photos',
  'team-management'
];

export const MobileSidebar = ({
  activeSection,
  onSectionChange,
  sections,
  isOpen,
  onClose
}: MobileSidebarProps) => {
  const quickSections = sections.filter(s => quickAccessSections.includes(s.id));
  const otherSections = sections.filter(s => !quickAccessSections.includes(s.id) && s.id !== 'home');

  const handleSectionClick = (sectionId: string) => {
    onSectionChange(sectionId);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="p-6 border-b">
          <div className="flex items-center gap-3">
            <Building2 className="h-8 w-8 text-primary" />
            <SheetTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              JobBlox
            </SheetTitle>
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1 px-4 py-6">
          {/* Home Button */}
          <div className="mb-6">
            <Button
              variant={activeSection === 'home' ? "default" : "ghost"}
              className="w-full justify-start gap-3 h-12"
              onClick={() => handleSectionClick('home')}
            >
              <Home className="h-5 w-5" />
              <span className="font-medium">Dashboard</span>
            </Button>
          </div>

          {/* Quick Access for Field Teams */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Quick Access
              </h3>
              <Badge variant="secondary" className="text-xs">
                Field Team
              </Badge>
            </div>
            <div className="space-y-2">
              {quickSections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                
                return (
                  <Button
                    key={section.id}
                    variant={isActive ? "default" : "ghost"}
                    className="w-full justify-start gap-3 h-11"
                    onClick={() => handleSectionClick(section.id)}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{section.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* All Other Features */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              All Features
            </h3>
            <div className="space-y-1">
              {otherSections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                
                return (
                  <Button
                    key={section.id}
                    variant={isActive ? "default" : "ghost"}
                    className="w-full justify-start gap-3 h-10 text-sm"
                    onClick={() => handleSectionClick(section.id)}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{section.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
