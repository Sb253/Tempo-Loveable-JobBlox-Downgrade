
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Building2, 
  Users, 
  BarChart3,
  Zap, 
  Shield, 
  Globe
} from "lucide-react";

export const LandingFeatures = () => {
  const features = [
    {
      icon: Building2,
      title: "Multi-Tenant Architecture",
      description: "Scalable SaaS platform supporting unlimited tenants with complete data isolation"
    },
    {
      icon: Users,
      title: "Client Management",
      description: "Comprehensive client relationship management with advanced analytics"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Real-time dashboards and reporting with predictive insights"
    },
    {
      icon: Zap,
      title: "Workflow Automation",
      description: "iPaaS integration platform with visual workflow builder"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with role-based access controls"
    },
    {
      icon: Globe,
      title: "API Integrations",
      description: "Connect with 100+ business applications and services"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Everything You Need to Scale
          </h2>
          <p className="text-xl text-slate-300">
            Powerful features designed for modern businesses
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-slate-800/60 border-slate-700 hover:border-slate-600 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
