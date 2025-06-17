
import React from 'react';
import { Button } from "@/components/ui/button";
import { Building2, Menu, X } from "lucide-react";

interface CompanyData {
  name: string;
  logo: string | null;
  displayInHeader: boolean;
  useCustomHeaderName: boolean;
  headerCompanyName: string;
}

interface SidebarHeaderProps {
  companyData: CompanyData;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  companyData,
  isCollapsed,
  onToggleCollapse
}) => {
  const displayName = companyData.useCustomHeaderName 
    ? companyData.headerCompanyName 
    : companyData.name;

  return (
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
          <h1 className="text-lg font-bold colorful-text truncate">
            {displayName}
          </h1>
        </div>
      )}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleCollapse}
        className="h-8 w-8 flex-shrink-0"
      >
        {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
      </Button>
    </div>
  );
};
