
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { LucideIcon, Building2, ChevronDown, ChevronRight } from "lucide-react";

interface SidebarSection {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface SidebarGroup {
  label: string;
  items: SidebarSection[];
  icon: LucideIcon;
  defaultOpen?: boolean;
}

interface MegaMenuSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  sections: SidebarSection[];
  isVisible?: boolean;
}

interface CompanyData {
  name: string;
  logo: string | null;
}

export const MegaMenuSidebar = ({ 
  activeSection, 
  onSectionChange, 
  sections, 
  isVisible = true 
}: MegaMenuSidebarProps) => {
  const [companyData, setCompanyData] = useState<CompanyData>({
    name: 'Construction CRM',
    logo: null
  });
  const [openGroups, setOpenGroups] = useState<string[]>([]);

  useEffect(() => {
    const savedCompanyData = localStorage.getItem('companySettings');
    if (savedCompanyData) {
      const data = JSON.parse(savedCompanyData);
      setCompanyData({
        name: data.name || 'Construction CRM',
        logo: data.logo || null
      });
    }
  }, []);

  // Group sections into logical categories
  const menuGroups: SidebarGroup[] = [
    {
      label: 'Dashboard',
      icon: Building2,
      defaultOpen: true,
      items: sections.filter(s => ['dashboard', 'widgets', 'cards'].includes(s.id))
    },
    {
      label: 'Customer Management',
      icon: sections.find(s => s.id === 'customers')?.icon || Building2,
      defaultOpen: false,
      items: sections.filter(s => 
        ['customers', 'customer-form', 'pipeline', 'client-appointment', 'communication', 'reviews'].includes(s.id)
      )
    },
    {
      label: 'Job Management',
      icon: sections.find(s => s.id === 'jobs')?.icon || Building2,
      defaultOpen: false,
      items: sections.filter(s => 
        ['jobs', 'job-form', 'schedule', 'time-tracking', 'photos', 'safety', 'quality'].includes(s.id)
      )
    },
    {
      label: 'Team & Resources',
      icon: sections.find(s => s.id === 'team-management')?.icon || Building2,
      defaultOpen: false,
      items: sections.filter(s => 
        ['team-management', 'subcontractor-management', 'inventory', 'equipment', 'vehicles', 'advanced-inventory'].includes(s.id)
      )
    },
    {
      label: 'Financial',
      icon: sections.find(s => s.id === 'invoices')?.icon || Building2,
      defaultOpen: false,
      items: sections.filter(s => 
        ['estimates', 'invoices', 'expenses', 'goals', 'financial-analytics', 'payment-integration', 'profit-analysis'].includes(s.id)
      )
    },
    {
      label: 'Reports & Analytics',
      icon: sections.find(s => s.id === 'reports')?.icon || Building2,
      defaultOpen: false,
      items: sections.filter(s => 
        ['reports', 'analytics', 'map-view', 'predictive-analytics', 'advanced-reporting'].includes(s.id)
      )
    },
    {
      label: 'Integrations',
      icon: sections.find(s => s.id === 'quickbooks-integration')?.icon || Building2,
      defaultOpen: false,
      items: sections.filter(s => 
        ['quickbooks-integration', 'accounting-integration'].includes(s.id)
      )
    },
    {
      label: 'Communication',
      icon: sections.find(s => s.id === 'team-chat')?.icon || Building2,
      defaultOpen: false,
      items: sections.filter(s => 
        ['team-chat', 'notifications'].includes(s.id)
      )
    },
    {
      label: 'System Settings',
      icon: sections.find(s => s.id === 'settings')?.icon || Building2,
      defaultOpen: false,
      items: sections.filter(s => 
        ['company-settings', 'settings', 'mobile-settings', 'branch-management'].includes(s.id)
      )
    }
  ];

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
    setOpenGroups(prev => 
      prev.includes(groupLabel) 
        ? prev.filter(g => g !== groupLabel)
        : [...prev, groupLabel]
    );
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed left-0 top-0 h-full w-80 bg-card border-r border-border z-40 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          {companyData.logo ? (
            <img 
              src={companyData.logo} 
              alt="Company Logo" 
              className="h-8 w-8 object-contain"
            />
          ) : (
            <Building2 className="h-8 w-8 text-primary" />
          )}
          <h1 className="text-xl font-bold text-primary">{companyData.name}</h1>
        </div>
      </div>
      
      {/* Navigation */}
      <ScrollArea className="flex-1 px-4 py-2">
        <div className="space-y-2">
          {menuGroups.map((group) => {
            if (group.items.length === 0) return null;
            
            const isOpen = openGroups.includes(group.label) || group.defaultOpen;
            const GroupIcon = group.icon;
            
            return (
              <Collapsible key={group.label} open={isOpen} onOpenChange={() => toggleGroup(group.label)}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-3 h-auto font-medium text-left hover:bg-accent"
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
                        variant={isActive ? "default" : "ghost"}
                        className={cn(
                          "w-full justify-start gap-3 text-sm h-9",
                          isActive && "bg-primary text-primary-foreground"
                        )}
                        onClick={() => {
                          console.log('MegaMenuSidebar: Section clicked:', section.id);
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
          })}
        </div>
      </ScrollArea>
    </div>
  );
};
