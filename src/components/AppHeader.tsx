
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Building2, Settings, Sun, Moon } from "lucide-react";
import { useRolePermissions } from "@/hooks/useRolePermissions";
import { useTheme } from "./ThemeProvider";

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
  const { theme, setTheme } = useTheme();

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

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="w-full px-6 py-3 flex items-center justify-between">
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
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-8 w-8"
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};
