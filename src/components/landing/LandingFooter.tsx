
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Building2 } from "lucide-react";

export const LandingFooter = () => {
  const navigate = useNavigate();

  return (
    <footer className="border-t border-slate-800/50 bg-slate-900/80 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Building2 className="h-8 w-8 text-blue-400" />
          <h3 className="text-xl font-bold text-white">JobBlox SaaS</h3>
        </div>
        
        <p className="text-slate-400 mb-8">
          Enterprise-grade multi-tenant SaaS platform for modern businesses
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="outline" 
            className="border-slate-600 text-slate-300 hover:bg-slate-800"
            onClick={() => navigate('/developer')}
          >
            Developer Documentation
          </Button>
          <Button 
            variant="outline" 
            className="border-slate-600 text-slate-300 hover:bg-slate-800"
            onClick={() => navigate('/auth')}
          >
            API Access
          </Button>
        </div>
      </div>
    </footer>
  );
};
