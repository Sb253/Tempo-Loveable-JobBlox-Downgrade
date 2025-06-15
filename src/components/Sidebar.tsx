
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
}

interface CompanyData {
  name: string;
  logo: string | null;
}

export const Sidebar = ({ activeSection, onSectionChange, sections, isVisible = true }: SidebarProps) => {
  const [companyData, setCompanyData] = useState<CompanyData>({
    name: 'Construction CRM',
    logo: null
  });

  useEffect(() => {
    console.log('Sidebar: isVisible changed to:', isVisible);
    const savedCompanyData = localStorage.getItem('companySettings');
    if (savedCompanyData) {
      const data = JSON.parse(savedCompanyData);
      setCompanyData({
        name: data.name || 'Construction CRM',
        logo: data.logo || null
      });
    }
  }, [isVisible]);

  if (!isVisible) {
    console.log('Sidebar: Not visible, returning null');
    return null;
  }

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-40">
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
          <h1 className="text-2xl font-bold text-primary">{companyData.name}</h1>
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
              <Icon className="h-5 w-5" />
              {section.label}
            </Button>
          );
        })}
      </nav>
    </div>
  );
};
