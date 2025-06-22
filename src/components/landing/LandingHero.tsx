
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Star, ArrowRight } from "lucide-react";

export const LandingHero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-8">
          <Badge className="mb-4 bg-green-600/20 text-green-400 border-green-600/30">
            <Star className="h-3 w-3 mr-1" />
            Production Ready
          </Badge>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Enterprise
          <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Multi-Tenant SaaS
          </span>
        </h1>
        
        <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto">
          Complete business management platform with advanced client management, 
          workflow automation, and enterprise-grade multi-tenancy architecture.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button 
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => navigate('/auth')}
          >
            Start Free Trial
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          
          <Button 
            size="lg"
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-800"
            onClick={() => navigate('/developer')}
          >
            View Demo
          </Button>
          
          <Button 
            size="lg"
            variant="outline"
            className="border-purple-600 text-purple-400 hover:bg-purple-900/20"
            onClick={() => navigate('/legacy')}
          >
            Legacy System
          </Button>
        </div>
      </div>
    </section>
  );
};
