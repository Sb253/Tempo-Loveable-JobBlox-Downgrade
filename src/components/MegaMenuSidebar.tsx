import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { LucideIcon, Building2, ChevronDown, ChevronRight, Menu, X, Hammer, Settings } from "lucide-react";
import { useRolePermissions } from "@/hooks/useRolePermissions";

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
  collapsed?: boolean;
  onToggleCollapse?: (collapsed: boolean) => void;
}

interface CompanyData {
  name: string;
  logo: string | null;
}

export const MegaMenuSidebar = ({ 
  activeSection, 
  onSectionChange, 
  sections, 
  isVisible = true,
  collapsed = false,
  onToggleCollapse
}: MegaMenuSidebarProps) => {
  const [companyData, setCompanyData] = useState<CompanyData>({
    name: 'Your Company',
    logo: null
  });
  const [openGroups, setOpenGroups] = useState<string[]>([]);
  const { permissions } = useRolePermissions();

  useEffect(() => {
    const savedCompanyData = localStorage.getItem('companySettings');
    if (savedCompanyData) {
      const data = JSON.parse(savedCompanyData);
      setCompanyData({
        name: data.companyName || 'Your Company',
        logo: data.logo || null
      });
    }
  }, []);

  // Group sections into logical categories
  const menuGroups: SidebarGroup[] = [
    {
      label: 'Customer Management',
      icon: sections.find(s => s.id === 'customers')?.icon || Building2,
      defaultOpen: false,
      items: sections.filter(s => 
        ['customers', 'customer-form', 'pipeline', 'client-appointment', 'communication', 'reviews'].includes(s.id)
      ).map(item => item.id === 'customer-form' ? { ...item, label: 'Customer Intake' } : item)
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
        ['team-management', 'subcontractor-management', 'inventory', 'equipment', 'vehicles', 'advanced-inventory', 'employee-locations', 'radius-assignment'].includes(s.id)
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

  // Get dashboard section separately
  const dashboardSection = sections.find(s => s.id === 'dashboard');

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

  const handleSectionClick = (sectionId: string) => {
    console.log('MegaMenuSidebar: Section clicked:', sectionId);
    onSectionChange(sectionId);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-card border-r border-border z-40 flex flex-col transition-all duration-300",
      collapsed ? "w-20" : "w-80"
    )}>
      {/* Fixed App Header */}
      <div className="p-4 md:p-6 border-b border-border">
        <div className="flex items-center gap-3 mb-3">
          <Hammer className="h-6 w-6 md:h-8 md:w-8 text-orange-600" />
          {!collapsed && (
            <h1 className="text-lg md:text-xl font-bold text-orange-600">Build Connect</h1>
          )}
        </div>
        
        {/* User Company Info - Only visible when not collapsed */}
        {!collapsed && (
          <div className="flex items-center justify-between bg-muted/50 rounded-lg p-3">
            <div className="flex items-center gap-2 min-w-0">
              {companyData.logo ? (
                <img 
                  src={companyData.logo} 
                  alt="Company Logo" 
                  className="h-5 w-5 object-contain flex-shrink-0"
                />
              ) : (
                <Building2 className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              )}
              <span className="text-sm font-medium text-muted-foreground truncate">{companyData.name}</span>
            </div>
            {permissions.canManageCompany && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => handleSectionClick('company-settings')}
                title="Manage Company Settings"
              >
                <Settings className="h-3 w-3" />
              </Button>
            )}
          </div>
        )}
        
        {/* Collapse Toggle */}
        <div className="flex justify-end mt-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleCollapse}
            className="h-6 w-6 md:h-8 md:w-8"
          >
            {collapsed ? <Menu className="h-3 w-3 md:h-4 md:w-4" /> : <X className="h-3 w-3 md:h-4 md:w-4" />}
          </Button>
        </div>
      </div>
      
      {/* Navigation */}
      <ScrollArea className="flex-1 px-2 md:px-4 py-2">
        <div className="space-y-2">
          {/* Dashboard Home Link */}
          {dashboardSection && (
            <div className="mb-4">
              {collapsed ? (
                <div className="flex justify-center py-2">
                  <Button
                    variant={activeSection === 'dashboard' ? "default" : "ghost"}
                    size="icon"
                    className="h-8 w-8 md:h-10 md:w-10"
                    title={dashboardSection.label}
                    onClick={() => handleSectionClick(dashboardSection.id)}
                  >
                    <dashboardSection.icon className="h-4 w-4 md:h-5 md:w-5" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant={activeSection === 'dashboard' ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 text-xs md:text-sm h-8 md:h-10",
                    activeSection === 'dashboard' && "bg-primary text-primary-foreground"
                  )}
                  onClick={() => handleSectionClick(dashboardSection.id)}
                >
                  <dashboardSection.icon className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                  <span className="truncate">{dashboardSection.label}</span>
                </Button>
              )}
            </div>
          )}

          {/* Menu Groups */}
          {menuGroups.map((group) => {
            if (group.items.length === 0) return null;
            
            const isOpen = (!collapsed && openGroups.includes(group.label)) || group.defaultOpen;
            const GroupIcon = group.icon;
            
            if (collapsed) {
              const hasActiveItem = group.items.some(item => item.id === activeSection);
              if (!hasActiveItem) return null;
              
              const activeItem = group.items.find(item => item.id === activeSection);
              if (!activeItem) return null;
              
              const ActiveIcon = activeItem.icon;
              return (
                <div key={group.label} className="flex justify-center py-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 md:h-10 md:w-10 bg-primary text-primary-foreground"
                    title={activeItem.label}
                  >
                    <ActiveIcon className="h-4 w-4 md:h-5 md:w-5" />
                  </Button>
                </div>
              );
            }
            
            return (
              <Collapsible key={group.label} open={isOpen} onOpenChange={() => toggleGroup(group.label)}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-2 md:p-3 h-auto font-medium text-left hover:bg-accent text-xs md:text-sm"
                  >
                    <div className="flex items-center gap-2 md:gap-3 min-w-0">
                      <GroupIcon className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                      <span className="truncate">{group.label}</span>
                    </div>
                    {isOpen ? (
                      <ChevronDown className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                    ) : (
                      <ChevronRight className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="ml-2 md:ml-4 mt-1 space-y-1">
                  {group.items.map((section) => {
                    const Icon = section.icon;
                    const isActive = activeSection === section.id;
                    
                    return (
                      <Button
                        key={section.id}
                        variant={isActive ? "default" : "ghost"}
                        className={cn(
                          "w-full justify-start gap-2 md:gap-3 text-xs md:text-sm h-7 md:h-9",
                          isActive && "bg-primary text-primary-foreground"
                        )}
                        onClick={() => handleSectionClick(section.id)}
                      >
                        <Icon className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                        <span className="truncate">{section.label}</span>
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
