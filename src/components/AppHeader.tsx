
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Building2, Settings } from "lucide-react";
import { useRolePermissions } from "@/hooks/useRolePermissions";

interface CompanyData {
  name: string;
  logo: string | null;
}

interface AppHeaderProps {
  onCompanySettingsClick: () => void;
}

export const AppHeader = ({ onCompanySettingsClick }: AppHeaderProps) => {
  const [companyData, setCompanyData] = useState<CompanyData>({
    name: 'Your Company',
    logo: null
  });
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

  return (
    <header className="bg-white border-b border-border shadow-sm z-30">
      <div className="flex items-center justify-end px-6 py-3">
        <div className="flex items-center gap-2">
          {companyData.logo ? (
            <img 
              src={companyData.logo} 
              alt="Company Logo" 
              className="h-8 w-8 object-contain flex-shrink-0"
            />
          ) : (
            <Building2 className="h-8 w-8 text-muted-foreground flex-shrink-0" />
          )}
          <span className="text-lg font-semibold text-foreground">{companyData.name}</span>
          {permissions.canManageCompany && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 ml-2"
              onClick={onCompanySettingsClick}
              title="Manage Company Settings"
            >
              <Settings className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
