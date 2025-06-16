
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Zap } from "lucide-react";

interface CompanyData {
  name: string;
  logo: string | null;
}

interface SidebarHeaderProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const SidebarHeader = ({ collapsed, onToggleCollapse }: SidebarHeaderProps) => {
  const [companyData, setCompanyData] = useState<CompanyData>({
    name: 'JobBlox',
    logo: null
  });

  useEffect(() => {
    const savedCompanyData = localStorage.getItem('companySettings');
    if (savedCompanyData) {
      const data = JSON.parse(savedCompanyData);
      setCompanyData({
        name: data.companyName || data.name || 'JobBlox',
        logo: data.logo || null
      });
    }
  }, []);

  return (
    <div className="p-4 border-b border-slate-700 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
          {companyData.logo ? (
            <img src={companyData.logo} alt="Company Logo" className="w-6 h-6 object-contain" />
          ) : (
            <Zap className="h-5 w-5 text-white" />
          )}
        </div>
        {!collapsed && (
          <h1 className="text-lg font-bold text-white">{companyData.name}</h1>
        )}
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleCollapse}
        className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800"
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </Button>
    </div>
  );
};
