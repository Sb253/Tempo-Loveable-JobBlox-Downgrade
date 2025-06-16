import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { 
  LucideIcon, 
  Building2, 
  ChevronDown, 
  ChevronRight, 
  Menu, 
  X, 
  Search,
  Home,
  Users,
  Wrench,
  DollarSign,
  Package,
  Brain,
  Settings,
  BarChart3,
  MessageSquare,
  Calendar,
  Clock,
  Shield,
  CheckCircle,
  CreditCard,
  TrendingUp,
  FileText,
  Map,
  UserCheck,
  Calculator,
  Database
} from "lucide-react";

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

  const displayName = companyData.useCustomHeaderName 
    ? companyData.headerCompanyName 
    : companyData.name;

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
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/40">
        {!isCollapsed && (
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {companyData.logo ? (
              <img 
                src={companyData.logo} 
                alt="Company Logo" 
                className="h-8 w-8 object-contain flex-shrink-0"
              />
            ) : (
              <Building2 className="h-8 w-8 text-primary flex-shrink-0" />
            )}
            <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate">
              {displayName}
            </h1>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleCollapse}
          className="h-8 w-8 flex-shrink-0"
        >
          {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      {/* Search */}
      {!isCollapsed && (
        <div className="p-4 border-b border-border/40">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search menu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
        </div>
      )}

      {/* Home Button */}
      <div className="p-2 border-b border-border/40">
        <Button
          variant={activeSection === 'home' ? "default" : "ghost"}
          size={isCollapsed ? "icon" : "default"}
          className={cn(
            "w-full",
            isCollapsed ? "h-12 px-0" : "justify-start gap-3 h-10",
            activeSection === 'home' && "bg-primary text-primary-foreground"
          )}
          onClick={() => handleSectionClick('home')}
          title={isCollapsed ? "Home" : undefined}
        >
          <Home className="h-5 w-5" />
          {!isCollapsed && <span>Home</span>}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-2 py-4">
        <nav className="space-y-2">
          {filteredGroups.map((group) => {
            if (group.sections.length === 0) return null;
            
            const isOpen = openGroups.includes(group.id) || group.defaultOpen;
            const GroupIcon = group.icon;
            const hasActiveSection = group.sections.some(section => section.id === activeSection);

            if (isCollapsed) {
              // Collapsed state - show only icons with tooltips
              return (
                <div key={group.id} className="relative group">
                  <Button
                    variant={hasActiveSection ? "default" : "ghost"}
                    size="icon"
                    className={cn(
                      "w-12 h-12 mx-auto relative",
                      hasActiveSection && "bg-primary text-primary-foreground"
                    )}
                    onClick={() => {
                      // If group has only one section, navigate directly
                      if (group.sections.length === 1) {
                        handleSectionClick(group.sections[0].id);
                      } else {
                        setIsCollapsed(false);
                        toggleGroup(group.id);
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
              <Collapsible key={group.id} open={isOpen} onOpenChange={() => toggleGroup(group.id)}>
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
                        onClick={() => handleSectionClick(section.id)}
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
        </nav>
      </ScrollArea>
    </div>
  );
};
