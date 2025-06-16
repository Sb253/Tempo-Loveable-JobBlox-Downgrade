
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LucideIcon, Building2 } from "lucide-react";

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
}

export const Sidebar = ({ activeSection, onSectionChange, sections, isVisible = true, isCollapsed = false }: SidebarProps) => {
  const [companyData, setCompanyData] = useState<CompanyData>({
    name: 'JobBlox',
    logo: null
  });

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

  if (!isVisible) {
    return null;
  }

  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-card border-r border-border/40 z-40 transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
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
          {!isCollapsed && (
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {companyData.name}
            </h1>
          )}
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
                activeSection === section.id && "bg-primary text-primary-foreground",
                isCollapsed && "px-3"
              )}
              onClick={() => {
                console.log('Sidebar: Section clicked:', section.id);
                onSectionChange(section.id);
              }}
              title={isCollapsed ? section.label : undefined}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && section.label}
            </Button>
          );
        })}
      </nav>
    </div>
  );
};
