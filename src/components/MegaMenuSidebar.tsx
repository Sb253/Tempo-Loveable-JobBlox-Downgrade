
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { LucideIcon, Building2, ChevronDown, ChevronRight, Menu, X, Zap } from "lucide-react";
import { CollapsedSidebar } from "./CollapsedSidebar";

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
    name: 'JobBlox',
    logo: null
  });
  const [openGroups, setOpenGroups] = useState<string[]>([]);

  useEffect(() => {
    const savedCompanyData = localStorage.getItem('companySettings');
    if (savedCompanyData) {
      const data = JSON.parse(savedCompanyData);
      setCompanyData({
        name: data.name || 'JobBlox',
        logo: data.logo || null
      });
    }
  }, []);

  // If collapsed, render the CollapsedSidebar component
  if (collapsed) {
    return (
      <CollapsedSidebar 
        activeSection={activeSection}
        onSectionChange={onSectionChange}
        sections={sections}
      />
    );
  }

  // Group sections into logical categories
  const menuGroups: SidebarGroup[] = [
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
        ['team-management', 'hr-features', 'subcontractor-management', 'materials-services', 'inventory', 'equipment', 'vehicles', 'advanced-inventory', 'employee-locations', 'radius-assignment'].includes(s.id)
      )
    },
    {
      label: 'Financial',
      icon: sections.find(s => s.id === 'invoices')?.icon || Building2,
      defaultOpen: false,
      items: sections.filter(s => 
        ['estimates', 'invoices', 'expenses', 'goals', 'tax-financial', 'financial-analytics', 'payment-integration', 'profit-analysis'].includes(s.id)
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
      label: 'AI Features',
      icon: sections.find(s => s.id === 'ai-chat')?.icon || Building2,
      defaultOpen: false,
      items: sections.filter(s => 
        ['ai-chat', 'smart-document-generator', 'predictive-analytics', 'ai-settings'].includes(s.id)
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
        ['company-settings', 'back-office', 'mobile-settings', 'branch-management'].includes(s.id)
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

  const handleToggleCollapse = () => {
    if (onToggleCollapse) {
      onToggleCollapse(!collapsed);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-slate-900 border-r border-slate-700 z-40 flex flex-col transition-all duration-300">
      {/* Header */}
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{companyData.name}</h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggleCollapse}
          className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>

      {/* Home Button */}
      <div className="p-2">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3 text-slate-300 hover:text-white hover:bg-slate-800",
            activeSection === 'home' && "bg-blue-600 text-white hover:bg-blue-700"
          )}
          onClick={() => onSectionChange('home')}
        >
          <Building2 className="h-5 w-5" />
          <span>Home</span>
        </Button>
      </div>
      
      {/* Navigation */}
      <ScrollArea className="flex-1 px-2">
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
