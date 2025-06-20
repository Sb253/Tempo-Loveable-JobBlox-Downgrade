
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Building2, 
  Zap, 
  Shield, 
  Users, 
  Clock, 
  BarChart3,
  Globe,
  ArrowRight,
  CheckCircle,
  Star
} from "lucide-react";

export const LandingPage = () => {
  const navigate = useNavigate();

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

  const plans = [
    {
      name: "Trial",
      price: "Free",
      period: "14 days",
      description: "Perfect for testing all features",
      features: ["Up to 10 clients", "All premium features", "24/7 support", "No credit card required"],
      cta: "Start Free Trial",
      popular: false,
      action: () => navigate('/auth')
    },
    {
      name: "Professional",
      price: "$99",
      period: "per month",
      description: "For growing businesses",
      features: ["Unlimited clients", "Advanced analytics", "API integrations", "Priority support", "Custom branding"],
      cta: "Get Started",
      popular: true,
      action: () => navigate('/auth')
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "For large organizations",
      features: ["Everything in Pro", "Dedicated support", "Custom integrations", "SLA guarantee", "On-premise option"],
      cta: "Contact Sales",
      popular: false,
      action: () => navigate('/auth')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
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

      {/* Hero Section */}
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

      {/* Features Grid */}
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

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-slate-300">
              Flexible pricing that grows with your business
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative bg-slate-800/60 border-slate-700 hover:border-slate-600 transition-all duration-300 ${
                  plan.popular ? 'ring-2 ring-blue-600 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white">Most Popular</Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-white text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-slate-400 ml-2">/{plan.period}</span>
                  </div>
                  <p className="text-slate-400 mt-2">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-slate-300">
                        <CheckCircle className="h-5 w-5 text-green-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                    onClick={plan.action}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  );
};
