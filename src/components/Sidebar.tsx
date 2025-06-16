
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LucideIcon, Building2 } from "lucide-react";
import { CollapsedSidebar } from "./CollapsedSidebar";

interface SidebarSection {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  sections: SidebarSection[];
  isVisible?: boolean;
  isCollapsed?: boolean;
}

interface CompanyData {
  name: string;
  logo: string | null;
  displayInHeader: boolean;
  useCustomHeaderName: boolean;
  headerCompanyName: string;
}

export const Sidebar = ({ activeSection, onSectionChange, sections, isVisible = true, isCollapsed = false }: SidebarProps) => {
  const [companyData, setCompanyData] = useState<CompanyData>({
    name: 'JobBlox',
    logo: null,
    displayInHeader: true,
    useCustomHeaderName: false,
    headerCompanyName: 'JobBlox'
  });

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

    // Listen for company settings changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'companySettings' && e.newValue) {
        try {
          const data = JSON.parse(e.newValue);
          setCompanyData({
            name: data.name || data.companyName || 'JobBlox',
            logo: data.logo || null,
            displayInHeader: data.displayInHeader ?? true,
            useCustomHeaderName: data.useCustomHeaderName ?? false,
            headerCompanyName: data.headerCompanyName || 'JobBlox'
          });
        } catch (error) {
          console.error('Error parsing updated company settings:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (!isVisible) {
    return null;
  }

  if (isCollapsed) {
    return <CollapsedSidebar 
      activeSection={activeSection} 
      onSectionChange={onSectionChange} 
      sections={sections} 
    />;
  }

  const displayName = companyData.useCustomHeaderName 
    ? companyData.headerCompanyName 
    : companyData.name;

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border/40 z-40 transition-all duration-300">
      <div className="p-6">
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
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {displayName}
          </h1>
        </div>
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
              onClick={() => {
                console.log('Sidebar: Section clicked:', section.id);
                onSectionChange(section.id);
              }}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {section.label}
            </Button>
          );
        })}
      </nav>
    </div>
  );
};
