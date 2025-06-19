
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Users, 
  Shield, 
  Zap, 
  Globe, 
  BarChart3,
  CheckCircle,
  ArrowRight,
  Star,
  Clock
} from "lucide-react";

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

export const LandingPage = ({ onNavigate }: LandingPageProps) => {
  const features = [
    {
      icon: Building2,
      title: "Multi-Tenant Architecture",
      description: "Isolated tenant environments with secure data separation"
    },
    {
      icon: Users,
      title: "Client Management",
      description: "Complete CRM with customer lifecycle management"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "SOC2 compliant with end-to-end encryption"
    },
    {
      icon: Zap,
      title: "Workflow Automation",
      description: "iPaaS integration platform with visual workflow builder"
    },
    {
      icon: Globe,
      title: "Global Scale",
      description: "Multi-region deployment with 99.9% uptime SLA"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Real-time insights and predictive analytics"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CTO, TechCorp",
      content: "This platform transformed our client management process. The multi-tenant architecture is exactly what we needed.",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Operations Director",
      content: "The automation capabilities saved us 40+ hours per week. ROI was visible within the first month.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <Badge className="mb-4 bg-blue-600/10 text-blue-400 border-blue-600/20">
              <Zap className="h-3 w-3 mr-1" />
              Next-Generation SaaS Platform
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Multi-Tenant
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Business Platform
              </span>
            </h1>
            
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Enterprise-grade multi-tenant SaaS platform with advanced client management, 
              workflow automation, and integrated business tools designed for scale.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                onClick={() => onNavigate('/trial-signup')}
              >
                <Clock className="h-5 w-5 mr-2" />
                Start 14-Day Free Trial
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-3"
                onClick={() => onNavigate('/tenant-login')}
              >
                <Building2 className="h-5 w-5 mr-2" />
                Tenant Login
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-purple-600 text-purple-400 hover:bg-purple-900/20 px-8 py-3"
                onClick={() => onNavigate('/admin-login')}
              >
                <Shield className="h-5 w-5 mr-2" />
                Admin Portal
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Powerful Features for Modern Businesses
            </h2>
            <p className="text-slate-400 text-lg">
              Everything you need to manage clients, automate workflows, and scale your business
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-slate-800/80 border-slate-700 hover:border-blue-600/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-600/10 rounded-lg">
                      <feature.icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <CardTitle className="text-white">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Trusted by Industry Leaders
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-slate-800/80 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-slate-300 mb-4">
                    "{testimonial.content}"
                  </blockquote>
                  <div>
                    <div className="font-medium text-white">{testimonial.name}</div>
                    <div className="text-slate-400 text-sm">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-slate-300 text-lg mb-8">
            Join thousands of businesses already using our platform to manage their operations
          </p>
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
            onClick={() => onNavigate('/trial-signup')}
          >
            Get Started Today
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-blue-400" />
              <span className="text-white font-semibold">JobBlox SaaS</span>
            </div>
            <p className="text-slate-400 text-sm">
              © 2024 JobBlox SaaS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
