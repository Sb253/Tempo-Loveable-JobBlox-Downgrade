import React from "react";
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
  onToggleCollapse,
}) => {
  const displayName = companyData.useCustomHeaderName
    ? companyData.headerCompanyName
    : companyData.name;

  const handleToggleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleCollapse();
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-border/40">
      {!isCollapsed && <></>}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleToggleClick}
        className="h-8 w-8 flex-shrink-0"
        type="button"
      >
        {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
      </Button>
    </div>
  );
};
