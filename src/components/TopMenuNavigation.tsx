
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Building2, Settings, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { LucideIcon } from "lucide-react";

interface SidebarSection {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface TopMenuNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  sections: SidebarSection[];
  onNavigationSettings: () => void;
  isVisible?: boolean;
}

interface CompanyData {
  name: string;
  logo: string | null;
}

export const TopMenuNavigation = ({ 
  activeSection, 
  onSectionChange, 
  sections, 
  onNavigationSettings,
  isVisible = true 
}: TopMenuNavigationProps) => {
  const [companyData, setCompanyData] = useState<CompanyData>({
    name: 'Construction CRM',
    logo: null
  });

  useEffect(() => {
    const savedCompanyData = localStorage.getItem('companySettings');
    if (savedCompanyData) {
      try {
        const data = JSON.parse(savedCompanyData);
        setCompanyData({
          name: data.name || 'Construction CRM',
          logo: data.logo || null
        });
      } catch (error) {
        console.error('Error parsing company data:', error);
      }
    }
  }, []);

  if (!isVisible) {
    return null;
  }

  // Group sections into logical categories with complete organization
  const menuGroups = {
    'Dashboard': sections.filter(s => ['dashboard', 'widgets', 'cards'].includes(s.id)),
    'Customer Management': sections.filter(s => ['customers', 'customer-form', 'pipeline', 'communication', 'reviews'].includes(s.id)),
    'Job Management': sections.filter(s => ['jobs', 'job-form', 'schedule', 'time-tracking', 'photos', 'safety', 'quality'].includes(s.id)),
    'Team & Resources': sections.filter(s => ['team-management', 'subcontractor-management', 'inventory', 'equipment', 'vehicles'].includes(s.id)),
    'Financial': sections.filter(s => ['estimates', 'invoices', 'expenses', 'goals'].includes(s.id)),
    'Reports & Analytics': sections.filter(s => ['reports', 'analytics', 'map-view'].includes(s.id)),
    'System': sections.filter(s => ['notifications', 'company-settings', 'settings'].includes(s.id))
  };

  return (
    <div className="fixed top-0 left-0 right-0 w-full border-b bg-background z-50">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Company Logo/Name */}
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

        {/* Navigation Menu */}
        <div className="flex items-center gap-2">
          {Object.entries(menuGroups).map(([groupName, groupSections]) => (
            groupSections.length > 0 && (
              <DropdownMenu key={groupName}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1 text-sm">
                    {groupName}
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="start" 
                  className="w-56 bg-background border border-border shadow-lg z-[9999]"
                  sideOffset={4}
                >
                  {groupSections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <DropdownMenuItem
                        key={section.id}
                        onClick={() => {
                          console.log('TopMenuNavigation: Section clicked:', section.id);
                          onSectionChange(section.id);
                        }}
                        className={`flex items-center gap-3 cursor-pointer px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground ${
                          activeSection === section.id ? 'bg-accent text-accent-foreground' : ''
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{section.label}</span>
                      </DropdownMenuItem>
                    );
                  })}
                  {groupName === 'System' && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={onNavigationSettings}
                        className="flex items-center gap-3 cursor-pointer px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                      >
                        <Settings className="h-4 w-4" />
                        <span>Navigation Settings</span>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )
          ))}
        </div>
      </div>
    </div>
  );
};
