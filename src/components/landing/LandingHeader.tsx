
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Building2, Zap } from "lucide-react";

export const LandingHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="relative z-50 border-b border-slate-800/50 bg-slate-900/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Building2 className="h-8 w-8 text-blue-400" />
            <h1 className="text-xl font-bold text-white">JobBlox SaaS</h1>
            <Badge className="bg-blue-600/20 text-blue-400 border-blue-600/30">
              <Zap className="h-3 w-3 mr-1" />
              Multi-Tenant
            </Badge>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              className="text-slate-300 hover:text-white"
              onClick={() => navigate('/developer')}
            >
              Developer Access
            </Button>
            <Button 
              onClick={() => navigate('/auth')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
