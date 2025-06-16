import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LucideIcon } from "lucide-react";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { SidebarSearch } from "./sidebar/SidebarSearch";
import { SidebarDashboard } from "./sidebar/SidebarDashboard";
import { SidebarMenuGroup } from "./sidebar/SidebarMenuGroup";

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

interface UnifiedSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  sections: SidebarSection[];
  isVisible?: boolean;
}

interface CompanyData {
  name: string;
  logo: string | null;
  displayInHeader: boolean;
  useCustomHeaderName: boolean;
  headerCompanyName: string;
}

export const UnifiedSidebar = ({ 
  activeSection, 
  onSectionChange, 
  sections, 
  isVisible = true 
}: UnifiedSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [openGroups, setOpenGroups] = useState<string[]>(['customers']);
  const [companyData, setCompanyData] = useState<CompanyData>({
    name: 'JobBlox',
    logo: null,
    displayInHeader: true,
    useCustomHeaderName: false,
    headerCompanyName: 'JobBlox'
  });

  // Load company data and sidebar state
  useEffect(() => {
    const savedCompanyData = localStorage.getItem('companySettings');
    if (savedCompanyData) {
      try {
        const data = JSON.parse(savedCompanyData);
        setCompanyData({
          name: data.name || data.companyName || 'JobBlox',
          logo: data.logo || null,
          displayInHeader: data.displayInHeader ?? true,
          useCustomHeaderName: data.useCustomHeaderName ?? false,
          headerCompanyName: data.headerCompanyName || 'JobBlox'
        });
      } catch (error) {
        console.error('Error parsing company settings:', error);
      }
    }

    const savedCollapsedState = localStorage.getItem('sidebarCollapsed');
    if (savedCollapsedState) {
      setIsCollapsed(JSON.parse(savedCollapsedState));
    }

    const savedOpenGroups = localStorage.getItem('sidebarOpenGroups');
    if (savedOpenGroups) {
      try {
        setOpenGroups(JSON.parse(savedOpenGroups));
      } catch (error) {
        console.error('Error parsing open groups:', error);
      }
    }
  }, []);

  // Save sidebar state changes and dispatch custom event
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(isCollapsed));
    window.dispatchEvent(new CustomEvent('sidebarToggle'));
  }, [isCollapsed]);

  useEffect(() => {
    localStorage.setItem('sidebarOpenGroups', JSON.stringify(openGroups));
  }, [openGroups]);

  // Define menu groups without dashboard group
  const menuGroups: MenuGroup[] = [
    {
      id: 'customers',
      label: 'Customer Management',
      icon: Users,
      sections: sections.filter(s => 
        ['customers', 'customer-form', 'pipeline', 'client-appointment', 'communication', 'reviews'].includes(s.id)
      )
    },
    {
      id: 'jobs',
      label: 'Job Operations',
      icon: Wrench,
      sections: sections.filter(s => 
        ['jobs', 'job-form', 'schedule', 'time-tracking', 'photos', 'safety', 'quality'].includes(s.id)
      )
    },
    {
      id: 'financial',
      label: 'Financial Management',
      icon: DollarSign,
      sections: sections.filter(s => 
        ['estimates', 'invoices', 'expenses', 'goals', 'tax-financial', 'financial-analytics', 'payment-integration', 'profit-analysis'].includes(s.id)
      )
    },
    {
      id: 'resources',
      label: 'Team & Resources',
      icon: Package,
      sections: sections.filter(s => 
        ['team-management', 'hr-features', 'subcontractor-management', 'materials-services', 'inventory', 'equipment', 'vehicles', 'advanced-inventory', 'employee-locations', 'radius-assignment'].includes(s.id)
      )
    },
    {
      id: 'ai',
      label: 'AI & Automation',
      icon: Brain,
      badge: 'New',
      sections: sections.filter(s => 
        ['ai-chat', 'smart-document-generator', 'predictive-analytics', 'ai-settings'].includes(s.id)
      )
    },
    {
      id: 'integrations',
      label: 'Integrations',
      icon: Database,
      sections: sections.filter(s => 
        ['quickbooks-integration', 'accounting-integration'].includes(s.id)
      )
    },
    {
      id: 'reports',
      label: 'Reports & Analytics',
      icon: BarChart3,
      sections: sections.filter(s => 
        ['reports', 'analytics', 'map-view', 'predictive-analytics', 'advanced-reporting'].includes(s.id)
      )
    },
    {
      id: 'communication',
      label: 'Communication',
      icon: MessageSquare,
      sections: sections.filter(s => 
        ['team-chat', 'notifications'].includes(s.id)
      )
    },
    {
      id: 'settings',
      label: 'Settings & Admin',
      icon: Settings,
      sections: sections.filter(s => 
        ['company-settings', 'back-office', 'mobile-settings', 'branch-management'].includes(s.id)
      )
    }
  ];

  // Filter sections based on search
  const filteredGroups = menuGroups.map(group => ({
    ...group,
    sections: group.sections.filter(section =>
      section.label.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(group => group.sections.length > 0);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleGroup = (groupId: string) => {
    setOpenGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleSectionClick = (sectionId: string) => {
    console.log('UnifiedSidebar: Section clicked:', sectionId);
    onSectionChange(sectionId);
  };

  // Auto-expand group containing active section
  useEffect(() => {
    const activeGroup = menuGroups.find(group => 
      group.sections.some(section => section.id === activeSection)
    );
    if (activeGroup && !openGroups.includes(activeGroup.id)) {
      setOpenGroups(prev => [...prev, activeGroup.id]);
    }
  }, [activeSection]);

  if (!isVisible) {
    return null;
  }

  return (
    <div 
      className={cn(
        "fixed left-0 top-0 h-full bg-card border-r border-border/40 z-40 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <SidebarHeader 
        companyData={companyData}
        isCollapsed={isCollapsed}
        onToggleCollapse={toggleCollapse}
      />

      <SidebarSearch 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        isCollapsed={isCollapsed}
      />

      <SidebarDashboard 
        activeSection={activeSection}
        onSectionClick={handleSectionClick}
        isCollapsed={isCollapsed}
      />

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
                onToggleGroup={toggleGroup}
                activeSection={activeSection}
                onSectionClick={handleSectionClick}
                isCollapsed={isCollapsed}
              />
            );
          })}
        </nav>
      </ScrollArea>
    </div>
  );
};
