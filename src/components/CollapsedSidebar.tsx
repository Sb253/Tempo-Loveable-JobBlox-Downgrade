
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  LucideIcon, 
  Building2, 
  Home,
  Users,
  Calendar,
  FileText,
  Settings,
  BarChart3,
  MapPin,
  CreditCard,
  Wrench,
  Brain,
  MessageSquare,
  Bell
} from "lucide-react";
import { useCompanySettings } from "@/hooks/useCompanySettings";

interface SidebarSection {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface CollapsedSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  sections: SidebarSection[];
}

const sectionCategories = {
  'Core': ['dashboard', 'jobs', 'customers', 'calendar'],
  'Business': ['estimates', 'invoices', 'payments', 'map-view'],
  'Management': ['team', 'reports', 'analytics'],
  'Settings': ['company-settings', 'ai-settings', 'back-office-settings'],
  'Communication': ['notifications', 'internal-meetings', 'ai-chat']
};

const getCategoryIcon = (category: string): LucideIcon => {
  switch (category) {
    case 'Core':
      return Home;
    case 'Business':
      return CreditCard;
    case 'Management':
      return BarChart3;
    case 'Settings':
      return Settings;
    case 'Communication':
      return MessageSquare;
    default:
      return Home;
  }
};

const getCategoryForSection = (sectionId: string): string | null => {
  for (const [category, sectionIds] of Object.entries(sectionCategories)) {
    if (sectionIds.includes(sectionId)) {
      return category;
    }
  }
  return null;
};

export const CollapsedSidebar = ({ activeSection, onSectionChange, sections }: CollapsedSidebarProps) => {
  const companySettings = useCompanySettings();
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const groupedSections = Object.entries(sectionCategories).reduce((acc, [category, sectionIds]) => {
    const categorySections = sections.filter(section => sectionIds.includes(section.id));
    if (categorySections.length > 0) {
      acc[category] = categorySections;
    }
    return acc;
  }, {} as Record<string, SidebarSection[]>);

  const activeCategory = getCategoryForSection(activeSection);

  return (
    <div className="fixed left-0 top-0 h-full w-16 bg-card border-r border-border/40 z-40 flex flex-col">
      {/* Company Logo/Icon */}
      <div className="p-3 border-b border-border/40">
        <div className="flex items-center justify-center">
          {companySettings.logo ? (
            <img 
              src={companySettings.logo} 
              alt="Company Logo" 
              className="h-8 w-8 object-contain"
            />
          ) : (
            <Building2 className="h-8 w-8 text-primary" />
          )}
        </div>
      </div>
      
      {/* Navigation Categories */}
      <nav className="flex-1 py-4 space-y-2">
        {Object.entries(groupedSections).map(([category, categorySections]) => {
          const CategoryIcon = getCategoryIcon(category);
          const isActiveCategory = activeCategory === category;
          const hasActiveSection = categorySections.some(section => section.id === activeSection);

          return (
            <div key={category} className="px-2">
              <DropdownMenu 
                open={openCategory === category} 
                onOpenChange={(open) => setOpenCategory(open ? category : null)}
              >
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={isActiveCategory ? "default" : "ghost"}
                    size="icon"
                    className={cn(
                      "w-12 h-12 relative",
                      isActiveCategory && "bg-primary text-primary-foreground",
                      hasActiveSection && !isActiveCategory && "bg-muted"
                    )}
                    title={category}
                  >
                    <CategoryIcon className="h-5 w-5" />
                    {hasActiveSection && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-background" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  side="right" 
                  align="start"
                  className="w-56 ml-2 bg-background border border-border shadow-lg z-[9999]"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="flex items-center gap-2">
                    <CategoryIcon className="h-4 w-4" />
                    {category}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {categorySections.map((section) => {
                    const Icon = section.icon;
                    const isActive = section.id === activeSection;
                    
                    return (
                      <DropdownMenuItem
                        key={section.id}
                        onClick={() => {
                          console.log('CollapsedSidebar: Section clicked:', section.id);
                          onSectionChange(section.id);
                          setOpenCategory(null);
                        }}
                        className={cn(
                          "flex items-center gap-3 cursor-pointer",
                          isActive && "bg-primary text-primary-foreground"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{section.label}</span>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        })}
      </nav>

      {/* Notification Indicator */}
      <div className="p-2 border-t border-border/40">
        <Button variant="ghost" size="icon" className="w-12 h-12 relative" title="Notifications">
          <Bell className="h-5 w-5" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-background" />
        </Button>
      </div>
    </div>
  );
};
