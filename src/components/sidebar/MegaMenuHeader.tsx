
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown, Zap } from "lucide-react";

interface CompanyData {
  name: string;
  logo: string | null;
}

interface MegaMenuHeaderProps {
  companyData: CompanyData;
  onToggleCollapse: () => void;
}

export const MegaMenuHeader = ({ companyData, onToggleCollapse }: MegaMenuHeaderProps) => {
  return (
    <div className="p-4 border-b border-slate-700 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
          <Zap className="h-5 w-5 text-white" />
        </div>
        <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {companyData.name}
        </h1>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleCollapse}
        className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800"
      >
        <ChevronDown className="h-4 w-4" />
      </Button>
    </div>
  );
};
